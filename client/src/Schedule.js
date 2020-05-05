import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "grommet";

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
  let { jobs } = user;
  const [render, setRender] = useState(pending);
  useEffect(() => {
    if (pending) setRender(true);
  }, [pending]);

  const onAnimationEnd = () => {
    if (!pending) setRender(false);
  };

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
            {jobs.map((job) => {
              let date = new Date(job.schedule);
              return (
                <TableRow>
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
