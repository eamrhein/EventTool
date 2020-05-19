import React, { useEffect, useState } from "react";
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
        Status of Recently Submitted Events
      </Heading>
      <Box width="100%">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Date
              </TableCell>
              <TableCell scope="col" border="bottom">
                Status
              </TableCell>
              <TableCell scope="col" border="bottom">
                urls
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.user.jobs.map((job, index) => {
              let date = new Date(job.schedule);
              return (
                <TableRow key={index}>
                  <TableCell>
                    {moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  </TableCell>
                  <TableCell>{job.status}</TableCell>
                  <TableCell>
                    {job.urls.map((url, id) => (
                      <Box key={id}>
                        <Anchor href={url}>Event</Anchor>
                      </Box>
                    ))}
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
