import React, { useState } from "react";
import Schedule from "../Schedule";
import { useQuery } from "@apollo/react-hooks";
import EventForm from "./EventForm";
import Queries from "../graphql/queries";
import { Box } from "grommet";
import { Spinner } from "../components";

const { FETCH_USER_ID, FETCH_USER } = Queries;
function EventTool({ responsive, pending }) {
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
      fetchPolicy: "no-cache",
    }
  );

  const [selectedKey, setSelectedKey] = useState("");
  if (idError || userError)
    return <h3>Error: {idError.message || userError.message}</h3>;
  if (idLoading || userLoading)
    return (
      <Box height="100vh" justify="center" align="center">
        <Spinner />
      </Box>
    );
  let { user } = userData;
  return (
    <Box direction="column">
      <Box direction="row" justify="start" align="start">
        <Box>
          <Schedule user={user} pending={pending} />
          <EventForm
            pending={pending}
            responsive={responsive}
            user={user}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default EventTool;
