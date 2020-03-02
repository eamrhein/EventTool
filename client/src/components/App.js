import React from "react";
import AuthRoute from "../util/route_util";
import Login from "./Login";
import EventTool from "./EventTool";
import { Grommet, Box, ResponsiveContext } from "grommet";
import { css, ThemeProvider } from "styled-components";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    },
    colors: {
      icon: {
        extend: css`
          color: red;
        `
      }
    }
  },
  icon: {
    extend: css`
      &:hover {
        cursor: "pointer";
        font-weight: "bolder";
      }
    `
  }
};

function App(props) {
  return (
    <Grommet theme={theme} full>
      <Box
        tag="main"
        direction="column"
        align="center"
        justify="start"
        background="light-1"
        elevation="low"
        style={{ zIndex: "1" }}
        {...props}
      >
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/" component={EventTool} routeType="protected" />
      </Box>
    </Grommet>
  );
}

export default App;
