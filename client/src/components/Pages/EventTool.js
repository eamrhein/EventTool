import React from "react";
import { useQuery } from "@apollo/react-hooks";
import SidePanel from "../Layout/Side/SidePanel";
import Pending from "../Layout/Side/Pending";
import EventForm from "../Layout/Main/EventForm";
import Queries from "../../graphql/queries";
import styled from "styled-components";
import { Box } from "grommet";

let MainBox = styled(Box)`
  .open {
    opacity: 1;
    height: 98%;
    width: 400px;
    transition: 0.25s ease-out;
  }
  .closed {
    opacity: 0;
    transition: 0.2s ease-in;
    width: 0;
    height: 98%;
    transform: translateX(-130%);
  }
  .here {
    opacity: 1;
    transition: opacity 0.5s ease-out;
  }
  .gone {
    pointer-events: none;
    opacity: 0;
  }
`;
const { FETCH_USER_ID } = Queries;

function EventTool({ responsive, pending, ...props }) {
  const { data, error } = useQuery(FETCH_USER_ID);
  if (error) return <h3>Error: {error.message}</h3>;
  return (
    <Box height={{ min: "92vh" }} direction="column">
      <MainBox height="100vh" direction="row" justify="start" align="start">
        <Box className={responsive !== "small" ? "open" : "closed"}>
          <SidePanel id={data.userId} history={props.history} />
        </Box>
        <Box style={{ position: "relative" }} direction="row">
          <Box className={pending ? "gone" : "here"}>
            <EventForm responsive={responsive} userId={data.userId} />
          </Box>
          <Box
            height="100%"
            width="100%"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            className={pending ? "here" : "gone"}
          >
            <Pending />
          </Box>
        </Box>
      </MainBox>
    </Box>
  );
}

export default EventTool;
