import React, { useState } from "react";
import AuthRoute from "./util/route_util";
import { Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import HeaderPanel from "./header/Header";
import EventTool from "./eventtool/EventTool";
import { grommet, Grommet, Box, ResponsiveContext } from "grommet";
import { deepMerge } from "grommet/utils";

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
      "neutral-2": "#C95286",
      "neutral-3": "#47AE6A",
      focus: "none",
    },
  },
});

function App(props) {
  const [pending, setPending] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  window.setDarkMode = setDarkMode;
  return (
    <Grommet theme={theme} themeMode={darkMode ? "dark" : "light"}>
      <ResponsiveContext.Consumer>
        {(responsive) => {
          return (
            <Box
              height={{ max: "100vh" }}
              style={{ transition: "0.25s ease-out" }}
              background={{ light: "light-3", dark: "dark-1" }}
              overflow="auto"
            >
              <HeaderPanel
                responsive={responsive}
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
                <Switch>
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
                  <Redirect to="/" />
                </Switch>
              </Box>
            </Box>
          );
        }}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
