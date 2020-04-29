import React, { useState } from "react";
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

const { FETCH_USER_ID, FETCH_USER } = Queries;
function EventTool({ responsive, pending, ...props }) {
  const {
    data: { userId },
    error: idError,
    loading: idLoading,
  } = useQuery(FETCH_USER_ID);

  const { data: userData, error: userError, loading: userLoading } = useQuery(
    FETCH_USER,
    {
      variables: {
        userId: userId,
      },
    }
  );

  const [selectedKey, setSelectedKey] = useState("");
  if (idError || userError)
    return <h3>Error: {idError.message || userError.message}</h3>;
  if (idLoading || userLoading) return <h1>Test Message</h1>;
  let { user } = userData;
  return (
    <Box direction="column">
      <MainBox direction="row" justify="start" align="start">
        <Box className={responsive !== "large" ? "closed" : "open"}>
          <SidePanel
            user={user}
            history={props.history}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
          />
        </Box>
        <Box style={{ position: "relative" }} direction="row">
          <Box className={pending ? "gone" : "here"}>
            <EventForm
              responsive={responsive}
              user={user}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
            />
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
