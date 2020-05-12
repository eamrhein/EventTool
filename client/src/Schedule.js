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
  @keyframes fadeIn {
    0% {
      transition: ease-in;
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transition: ease-out;
    }
    100% {
      opacity: 0;
    }
  }
`;
const Pending = ({ user, pending }) => {
  const [render, setRender] = useState(pending);
  useEffect(() => {
    if (pending) setRender(true);
  }, [pending]);

  const onAnimationEnd = () => {
    if (!pending) setRender(false);
  };
  const { data, error, loading } = useQuery(FETCH_USER, {
    variables: {
      userId: user.id,
    },
    pollInterval: 500,
  });

  if (error) {
    return (
      <Box>
        <Heading color="red">{error.message}</Heading>
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
    render && (
      <MainBox
        width="93vw"
        pad="medium"
        style={{
          animation: `${pending ? "fadeIn" : "fadeOut"} 1s`,
        }}
        onAnimationEnd={onAnimationEnd}
      >
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
      </MainBox>
    )
  );
};

export default Pending;
