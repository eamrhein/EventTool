import React, { useState } from "react";
import AuthRoute from "../util/route_util";
import Login from "./Pages/Login";
import HeaderPanel from "./Layout/Header/Header";
import EventTool from "./Pages/EventTool";
import { grommet, Grommet, Box, ResponsiveContext } from "grommet";
import { deepMerge } from "grommet/utils";

const theme = deepMerge(grommet, {
  defaultMode: "light",
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
    colors: {
      brand: "#0060A8",
      "accent-1": "#00a89d",
      "accent-2": "#a8005f",
      "accent-3": "#b0e0dc",
      "accent-4": "#dbf500",
      focus: "none",
    },
  },
});

function App(props) {
  const [pending, setPending] = useState(false);
  const [mode, setMode] = useState(false);
  return (
    <Grommet theme={theme} themeMode={mode ? "dark" : "light"}>
      <ResponsiveContext.Consumer>
        {(responsive) => {
          return (
            <Box
              style={{ transition: "0.25s ease-out" }}
              background={{ light: "light-1", dark: "dark-1" }}
              overflow="auto"
              height="100vh"
            >
              <HeaderPanel
                responsive={responsive}
                mode={mode}
                setMode={setMode}
                pending={pending}
                setPending={setPending}
              />
              <Box
                tag="main"
                direction="column"
                align="center"
                justify="start"
                {...props}
              >
                <AuthRoute
                  exact
                  responsive={responsive}
                  path="/login"
                  component={Login}
                  routeType="auth"
                />
                <AuthRoute
                  exact
                  path="/"
                  responsive={responsive}
                  component={EventTool}
                  pending={pending}
                  routeType="protected"
                />
              </Box>
            </Box>
          );
        }}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
