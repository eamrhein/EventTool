import React, { useState } from "react";
import AuthRoute from "../util/route_util";
import Login from "./Pages/Login";
import HeaderPanel from "./Layout/Header/Header";
import EventTool from "./Pages/EventTool";
import { grommet, Grommet, Box } from "grommet";
import { deepMerge } from "grommet/utils";

const theme = deepMerge(grommet, {
  defaultMode: "light",
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
});

function App(props) {
  const [sidePanel, setSidePanel] = useState(false);
  const [pending, setPending] = useState(false);
  const [mode, setMode] = useState(false);
  return (
    <Grommet theme={theme} themeMode={mode ? "dark" : "light"}>
      <HeaderPanel
        mode={mode}
        setMode={setMode}
        sidePanel={sidePanel}
        setSidePanel={setSidePanel}
        pending={pending}
        setPending={setPending}
      />
      <Box
        background={{ light: "light-2", dark: "dark-1" }}
        style={{ transition: "0.25s ease-out" }}
        tag="main"
        direction="column"
        align="center"
        justify="start"
        height="92vh"
        {...props}
      >
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute
          exact
          path="/"
          component={EventTool}
          pending={pending}
          sidePanel={sidePanel}
          routeType="protected"
        />
      </Box>
    </Grommet>
  );
}

export default App;
