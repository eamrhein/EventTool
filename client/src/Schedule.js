import React, { useState } from "react";
import { useQuery } from "react-apollo";
import Queries from "./graphql/queries";
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
  Select,
  DropButton,
  Text,
  Calendar,
} from "grommet";
import { FormDown } from "grommet-icons";
let { FETCH_USER } = Queries;
const CalenderButton = () => {
  const [date, setDate] = useState();
  const [open, setOpen] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const onSelect = (selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
  };
  const onButtonPress = () => {
    setConfirmed(true);
  };
  return (
    <Box direction="row">
      <DropButton
        open={!confirmed && open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        dropContent={
          <Calendar disabled={confirmed} date={date} onSelect={onSelect} />
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
          disabled={confirmed}
          color={confirmed ? "accent-1" : "accent-2"}
          label="confirm"
          onClick={onButtonPress}
        />
      ) : null}
    </Box>
  );
};
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
const Pending = ({ user, pending }) => {
  const { data, error, loading } = useQuery(FETCH_USER, {
    variables: {
      userId: user.id,
    },
  });
  let jobs = data.user.jobs.map((job) => {
    return {
      created: new Date(job.schedule),
      data: JSON.parse(job.data),
      urls: job.urls,
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
  console.log(jobs);
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
      <Box width="100%">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Title
              </TableCell>
              <TableCell scope="col" border="bottom">
                Location
              </TableCell>
              <TableCell scope="col" border="bottom"></TableCell>
              <TableCell scope="col" border="bottom">
                Interval
              </TableCell>
              <TableCell scope="col" border="bottom">
                Delete
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job, index) => {
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
                    <CalenderButton />
                  </TableCell>
                  <TableCell>
                    <Select
                      placeholder="how often to publish events"
                      options={[
                        "Every 1 Minute",
                        "Every 5 minutes",
                        "Every 30 minute",
                      ]}
                    />
                  </TableCell>
                  <TableCell>
                    <Box direction="row">
                      <Button size="small" label="Schedule" />
                      <Button size="small" label="Delete" />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </MainBox>
  );
};

export default Pending;
