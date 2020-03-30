import React, { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import SidePane from "./Sidepane/SidePane";
import EventForm from "./Mainpane/EventForm";
import Queries from "../graphql/queries";
import styled from "styled-components";
import { Box, Heading, Header, Stack, Text } from "grommet";
import { FaCalendar } from "react-icons/fa";
import { IoMdArrowDropdownCircle, IoMdLogOut } from "react-icons/io";
let Arrow = styled(IoMdArrowDropdownCircle)`
  &.arrow {
    transition: all 0.4s ease;
  }
  &.up {
    transform: rotateZ(-180deg);
  }
`;
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
      <Header background="light-1" width="100vw" pad="small">
        <Box direction="row" align="center">
          <Stack
            style={{ cursor: "pointer", justifyContent: "flex-start" }}
            onClick={() => setSidePane(!sidePane)}
            anchor="bottom-left"
          >
            <Heading color="brand" level="2">
              <FaCalendar />
            </Heading>
            <Box background="light-6" round>
              <Arrow size="16pt" className={sidePane ? "arrow" : "arrow up"} />
            </Box>
          </Stack>
          <Heading margin="xsmall" level="2" color="brand">
            Event Tool
          </Heading>
        </Box>
        <Heading level="3" onClick={logout} style={{ cursor: "pointer" }}>
          Logout <IoMdLogOut size="16pt" />
        </Heading>
      </Header>
      <MainBox height="100vh" direction="row" justify="start" align="start">
        <Box className={sidePane ? "visible" : "hidden"}>
          <SidePane id={data.userId} history={props.history} />
        </Box>
        <Box height="100%" width="100%" direction="column">
          <EventForm />
        </Box>
      </MainBox>
    </Box>
  );
}

export default EventTool;
