import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import styled from "styled-components";

import {
  Anchor,
  Heading,
  Box,
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  DropButton,
  Text,
  Calendar,
} from "grommet";
import { FormDown } from "grommet-icons";
let { FETCH_USER } = Queries;
let { PUBLISH_EVENT } = Mutations

let MainBox = styled(Box)`
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  min-width: 100;
  max-height: 70%;
  left: 2.5%;
  right: 2.5%;
  z-index: 1;
  opacity: ${(props) => (props.shown ? 1 : 0)};
  pointer-events: ${(props) => (props.shown ? "all" : "none")};
  transition: opacity 0.5s ease 0.2s;
`;

// Form to show status
const CalenderButton = ({ date, setDate, confirmed, setConfirmed }) => {
  const [open, setOpen] = useState();
  const onSelect = (selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
  };
  const onButtonPress = () => {
    setConfirmed(!confirmed);
  };
  let today = new Date();
  let year = today.getFullYear();
  let day = today.getDate();
  let month = today.getMonth();
  let bounds = [
    today.toISOString(),
    new Date(year + 5, month, day).toISOString(),
  ];
  return (
    <Box direction="row">
      <DropButton
        open={!confirmed && open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        dropContent={
          <Calendar bound={bounds} date={date} onSelect={onSelect} />
        }
        disabled={confirmed}
      >
        <Box direction="row" gap="medium" align="center" pad="small">
          <Text>
            {date
              ? new Date(date).toLocaleDateString()
              : "Select date to publish event"}
          </Text>
          <FormDown color="brand" />
        </Box>
      </DropButton>
      {date ? (
        <Button
          primary
          color={confirmed ? "accent-1 " : "accent-2"}
          label={confirmed ? "change" : "confirm"}
          onClick={onButtonPress}
        />
      ) : null}
    </Box>
  );
};
const EventTableRow = ({user, job, index, setErr}) => {
  const [date, setDate] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const [publishEvent] = useMutation(PUBLISH_EVENT, {
    errorPolicy: 'all',
    onError: ({ graphQLErrors, networkError }) => {
      let errArr = [];
      if(graphQLErrors){
      errArr = errArr.concat(graphQLErrors.map((err, i) => <Text key={i}>{err.message}</Text>))
      }
      if(networkError){
        errArr = errArr.concat([<Text key={99}>{networkError.message}</Text>])
      }
      console.log(errArr)
      setErr(errArr)
    },
    update(cache) {
      let data = cache.readQuery({
        query: FETCH_USER,
        variables: { userId: user.id },
      });
    }
  });
  const handlePublish = (e, job) => {
    e.preventDefault();
    publishEvent({
      variables: {
        id: job.id,
        eventids: job.eventbriteIds,
        key: job.key,
        dateStr: date,
        interval: 5
      }
    })
  }
  return (
    <TableRow key={index}>
    <TableCell>{job.data.title}</TableCell>
    <TableCell>
      <Box>
        {job.data.locations.map((location, id) => (
          <Anchor target="_blank" href={job.urls[id]} key={id}>
            {location.City}
          </Anchor>
        ))}
      </Box>
    </TableCell>
    <TableCell>
      <CalenderButton date={date} setDate={setDate} confirmed={confirmed} setConfirmed={setConfirmed} />
    </TableCell>
    <TableCell>
      <Text>{job.status}</Text>
    </TableCell>
    <TableCell>
      <Box direction="row">
        <Button disabled={!date || !confirmed} type="button" size="small" label="Schedule" onClick={(e) => {
          handlePublish(e, job)
        }} />
        <Button size="small" label="Delete" />
      </Box>
    </TableCell>
  </TableRow>
  )
}
const EventStatus = ({ user, pending }) => {
  const [err, setErr] = useState([])
  const { data, error, loading } = useQuery(FETCH_USER, {
    variables: {
      userId: user.id,
    },
  });
  let jobs = data.user.jobs.map((job) => {
    return {
      id: job.id,
      created: new Date(job.schedule),
      data: JSON.parse(job.data),
      eventbriteIds: job.eventbriteIds,
      urls: job.urls,
      status: job.status,
      key: user.apikeys[0],
    };
  });
  if (error) {
    return (
      <Box>
        <Heading margin="small" color="red">
          {error.message}
        </Heading>
      </Box>
    );
  }
  if (loading) {
    return (
      <Box>
        <Heading color="green">Loading</Heading>
      </Box>
    );
  }
  return (
    <MainBox
      overflow="scroll"
      pad="medium"
      background={{ light: "light-2", dark: "dark-1" }}
      border={{ size: "small" }}
      elevation="medium"
      shown={pending}
      align="center"
    >
      <Heading level="4" textAlign="center">
        Created Events
      </Heading>
      {err}
      <Box width="100%">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                <Text>Title</Text>
              </TableCell>
              <TableCell scope="col" border="bottom">
                <Text>Location</Text>
              </TableCell>
              <TableCell scope="col" border="bottom">
                <Text>Date</Text>
              </TableCell>
              <TableCell scope="col" border="bottom">
                <Text>Status</Text>
              </TableCell>
              <TableCell scope="col" border="bottom" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job, index) => {
              return (
                <EventTableRow job={job} user={user} index={index} setErr={setErr} />
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </MainBox>
  );
};

export default EventStatus;
