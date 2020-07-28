import React, { Suspense } from "react";
import HeaderPanel from "./header/Header";
import { grommet, Grommet, Box, ResponsiveContext } from "grommet";
import { deepMerge } from "grommet/utils";
import { useQuery } from "react-apollo";
import Queries from "./graphql/queries";
import Login from './routes/Login/Login'
import EventTool from './routes/Form/EventTool'
// const Login = React.lazy(() => import("./routes/Login/Login"));
// const EventTool = React.lazy(() => import("./routes/Form/EventTool"));
const { IS_LOGGED_IN } = Queries;

const theme = deepMerge(grommet, {
  defaultMode: "dark",
  global: {
    font: {
      family: "Noto Sans",
    },
    colors: {
      brand: "#f05537",
      "accent-1": "#73a580",
      "accent-2": "#F48668",
      "accent-3": "#c5c392",
      "neutral-1": "#EEA960",
      "neutral-2": "#3659e3",
      "neutral-3": "#47AE6A",
      inactive: "#6f7287",
      focus: "none",
    },
  },
});

function App(props) {
  let { data, error, loading } = useQuery(IS_LOGGED_IN);
  if (error) {
    return <p>{error.message} Error in App component</p>;
  }
  if (loading) {
    return <p>Loading</p>;
  }
  let { isLoggedIn } = data;

  return (
    <Grommet theme={theme} themeMode="light">
      <ResponsiveContext.Consumer>
        {(responsive) => {
          return (
            <Box
              height="100vh"
              style={{ transition: "0.25s ease-out" }}
              background={{ light: "light-3", dark: "dark-1" }}
            >
              <HeaderPanel
                responsive={responsive}
                isLoggedIn={isLoggedIn}
              />
              <Box
                tag="main"
                direction="column"
                align="center"
                justify="start"
                {...props}
              >
                {!isLoggedIn ? (
                  <Suspense
                    fallback={
                      <Box
                        height="100vh"
                        background={{ light: "light-3", dark: "dark-1" }}
                      >
                        Loading...
                      </Box>
                    }
                  >
                    <Login responsive={responsive} />
                  </Suspense>
                ) : (
                  <Suspense
                    fallback={
                      <Box
                        height="100vh"
                        background={{ light: "light-3", dark: "dark-1" }}
                      >
                        Loading...
                      </Box>
                    }
                  >
                    <EventTool responsive={responsive} />
                  </Suspense>
                )}
              </Box>
            </Box>
          );
        }}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
