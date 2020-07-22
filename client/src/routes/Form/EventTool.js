import React from "react";
import { Route, Switch } from "react-router-dom";
import Schedule from "../EventStatus/EventStatus";
import { useQuery } from "@apollo/react-hooks";
import EventForm from "./EventForm";
import Queries from "../../graphql/queries";
import { Box } from "grommet";
import { Spinner } from "../../components/Spinner";

// Upper level component to hold both Event Status and Event Form Components
const { FETCH_USER_ID, FETCH_USER } = Queries;
function EventTool({ responsive }) {
  const {
    data: { userId },
    error: idError,
    loading: idLoading,
  } = useQuery(FETCH_USER_ID);

  const { data: userData, error: userError, loading: userLoading } = useQuery(
    FETCH_USER,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        userId: userId,
      },
    }
  );
  if (idError || userError)
    return idError ? (
      <h3>Error: {idError.message}</h3>
    ) : (
      <h3>{userError.message}</h3>
    );
  if (idLoading || userLoading)
    return (
      <Box height="100vh" justify="center" align="center">
        <Spinner />
      </Box>
    );
  let { user } = userData;
  let defaultKey = user.apikeys[0];
  return (
    <Box direction="row" justify="start" align="start" height="90vh">
        <Switch>
          <Route exact path="/status">
            <Schedule user={user} />
          </Route>
          <Route path="/">
            <EventForm
              responsive={responsive}
              user={user}
              defaultKey={defaultKey}
            />
          </Route>
        </Switch>
    </Box>
  );
}

export default EventTool;
