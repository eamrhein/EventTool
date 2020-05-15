import React, { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import Queries from "./graphql/queries";
import styled from "styled-components";
import moment from "moment";
import {
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
  position: absolute;
  height: 100%;
  .table {
    width: 100%;
    z-index: 1;
  }
  .shown {
    opacity: 1;
    pointer-events: all;
    transition: opacity 0.5s ease 0.2s;
  }
  .hidden {
    transition: opacity 0.5s ease 0.2s;
    opacity: 0;
  }
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
    <MainBox>
      <Box
        pad="medium"
        background={{ light: "light-2", dark: "dark-1" }}
        border={{ size: "small" }}
        elevation="medium"
        className={pending ? "table shown" : "table hidden"}
        align="center"
      >
        <Heading level="4" textAlign="center">
          Status of Recently Submitted Events
        </Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Date
              </TableCell>
              <TableCell scope="col" border="bottom">
                Status
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
