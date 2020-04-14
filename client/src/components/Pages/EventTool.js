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
    transform: translateX(2%);
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
    transition: 0.25s ease-out;
  }
  .gone {
    opacity: 0;
  }
`;
const { FETCH_USER_ID } = Queries;

function EventTool({ sidePanel, pending, ...props }) {
  const { data, error } = useQuery(FETCH_USER_ID);
  if (error) return <h3>Error: {error.message}</h3>;
  return (
    <Box height={{ min: "92vh" }} direction="column">
      <MainBox
        style={{ position: "relative" }}
        height="100vh"
        direction="row"
        justify="start"
        align="start"
      >
        <Box elevation="small" className={sidePanel ? "open" : "closed"}>
          <SidePanel id={data.userId} history={props.history} />
        </Box>
        <Box
          style={{
            transform: "translateX(-50%)",
            position: "absolute",
            zIndex: "1",
            top: "15%",
            left: "50%",
          }}
          pad="small"
          background={{ dark: "dark-6", light: "light-6" }}
          elevation="small"
          className={pending ? "here" : "gone"}
        >
          <Pending />
        </Box>
        <Box height="100%" width="100%" direction="column">
          <EventForm userId={data.userId} />
        </Box>
      </MainBox>
    </Box>
  );
}

export default EventTool;
