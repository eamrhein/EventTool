import React, { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import SidePane from "./Sidepane/SidePane";
import Queries from "../graphql/queries";
import styled from "styled-components";
import { Box, Heading, Header } from "grommet";
let MainBox = styled(Box)`
  .visible {
    opacity: 1;
    height: 100%;
    width: 400px;
    transform: translateX(0);
    transition: 0.25s ease-out;
  }
  .hidden {
    opacity: 0;
    transition: 0.2s ease-in;
    width: 0;
    height: 100%;
    transform: translateX(-130%);
  }
  .hidden > div > * {
    display: none;
  }
`;
const { FETCH_USER_ID } = Queries;

function EventTool(props) {
  const eventClient = useApolloClient();

  // Logout removing data from local store and updating cache
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    localStorage.removeItem("userId");
    eventClient.writeData({
      data: {
        isLoggedIn: false,
        userId: null
      }
    });
    props.history.push("/");
  };
  const [sidePane, setSidePane] = useState(true);
  const { data, error } = useQuery(FETCH_USER_ID);
  if (error) return <h3>Error: {error.message}</h3>;
  return (
    <Box height={{ min: "100vh" }} direction="column">
      <Header background="brand" width="100vw" justify="center">
        <Heading level="1">EventTool</Heading>
      </Header>
      <Header justify="between" width="100vw" background="brand">
        <Heading
          margin={{ left: "small" }}
          level="5"
          style={
            sidePane
              ? { textDecoration: "underline", cursor: "pointer" }
              : { cursor: "pointer" }
          }
          onClick={() => setSidePane(!sidePane)}
        >
          Accounts
        </Heading>
        <Heading margin={{ right: "xlarge" }} level="6" onClick={logout}>
          Logout
        </Heading>
      </Header>
      <MainBox
        border={{
          color: "border",
          style: "solid",
          side: "top",
          size: "medium"
        }}
        height="100vh"
        direction="row"
        justify="start"
        align="start"
      >
        <Box className={sidePane ? "visible" : "hidden"}>
          <SidePane id={data.userId} history={props.history} />
        </Box>
        <Box height="100%" width="100%" background="brand" direction="column">
          Content
        </Box>
      </MainBox>
    </Box>
  );
}

export default EventTool;
