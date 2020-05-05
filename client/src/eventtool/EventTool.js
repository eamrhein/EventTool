import React from "react";
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
  if (idError || userError) return <h3>Error: {idError || userError}</h3>;
  if (idLoading || userLoading)
    return (
      <Box height="100vh" justify="center" align="center">
        <Spinner />
      </Box>
    );
  let { user } = userData;
  let defaultKey = user.apikeys[0];
  return (
    <Box direction="row" justify="start" align="start" height="100vh">
      <Box>
        <Schedule user={user} pending={pending} />
        <EventForm
          pending={pending}
          responsive={responsive}
          user={user}
          defaultKey={defaultKey}
        />
      </Box>
    </Box>
  );
}

export default EventTool;
