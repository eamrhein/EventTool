import React from "react";
import AuthRoute from "../util/route_util";
import Login from "./Login";
import EventTool from "./EventTool";
import { Grommet, Box } from "grommet";
import { css } from "styled-components";

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
    <Grommet theme={theme} >
      <Box
        tag="main"
        direction="column"
        align="center"
        justify="start"
        background="light-1"
        elevation="low"
        height="100vh"
        {...props}
      >
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/" component={EventTool} routeType="protected" />
      </Box>
    </Grommet>
  );
}

export default App;
