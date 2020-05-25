import React from "react";
import { useQuery } from "react-apollo";
import Queries from "./graphql/queries";
import styled from "styled-components";
import moment from "moment";
import {
  Anchor,
  Heading,
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "grommet";

let { FETCH_USER } = Queries;
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
    pollInterval: 500,
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
                Created
              </TableCell>
              <TableCell scope="col" border="bottom">
                Eventbrite URLs
              </TableCell>
              <TableCell scope="col" border="bottom">
                Publish
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
                  <TableCell>
                    {moment(job.date).format("MM/DD/YYYY h:mm A")}
                  </TableCell>
                  <TableCell>
                    <Box>
                      {job.data.locations.map((location, id) => (
                        <Anchor target="_blank" href={job.urls[id]} key={id}>
                          {location.name}
                        </Anchor>
                      ))}
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
