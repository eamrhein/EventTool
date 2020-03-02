import React from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import SidePane from "./Sidepane/SidePane";
import Queries from "../graphql/queries";
import { Box, Heading, Button, Header } from "grommet";

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

  const { data, error } = useQuery(FETCH_USER_ID);
  if (error) return <h3>Error: {error.message}</h3>;
  return (
    <Box height={{ min: "100vh" }} direction="column">
      <Header
        background="brand"
        width="100vw"
        margin="none"
        height="10vh"
        pad={{ left: "20px", right: "20px" }}
      >
        <Heading level="3">Event Tool</Heading>
        <Button onClick={logout}>Logout</Button>
      </Header>
      <Box
        border={{
          color: "border",
          style: "solid",
          side: "top",
          size: "medium"
        }}
        direction="row"
        justify="start"
        align="start"
      >
        <SidePane id={data.userId} history={props.history} />
        <Box background="light-3" direction="column">
          Content
        </Box>
      </Box>
    </Box>
  );
}

export default EventTool;
