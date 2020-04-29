import React from "react";
import moment from "moment";
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "grommet";
const Pending = ({ user }) => {
  let { jobs } = user;
  return (
    <Box pad="large">
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
    </Box>
  );
};

export default Pending;
