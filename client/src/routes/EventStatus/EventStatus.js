import React, { useState } from "react";
import { useMutation } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
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
  RangeInput,
  Calendar,
} from "grommet";
import { FormDown, Add, Subtract } from "grommet-icons";
let { FETCH_USER } = Queries;
let { PUBLISH_EVENT, DELETE_EVENT } = Mutations;
const CalenderButton = ({ date, setDate, confirmed, setConfirmed, locked }) => {
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
          <Calendar bounds={bounds} date={date} onSelect={onSelect} />
        }
        disabled={confirmed || locked}
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
const EventTableRow = ({ user, job, index, setErr }) => {
  const [date, setDate] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const [value, setValue] = React.useState(5);
  const [isAddDisabled, setIsAddDisabled] = React.useState(false);
  const [isSubtractDisabled, setIsSubtractDisabled] = React.useState(true);

  const onChange = (event) => setValue(event.target.value);
  const [publishEvent] = useMutation(PUBLISH_EVENT, {
    errorPolicy: "all",
    refetchQueries: [
      {
        query: FETCH_USER,
        variables: {
          userId: user.id,
        },
      },
    ],
    onError: ({ graphQLErrors, networkError }) => {
      let errArr = [];
      if (graphQLErrors) {
        errArr = errArr.concat(
          graphQLErrors.map((err, i) => <Text key={i}>{err.message}</Text>)
        );
      }
      if (networkError) {
        errArr = errArr.concat([
          <Text color="Red" key={99}>
            {networkError.message}
          </Text>,
        ]);
      }
      console.log(errArr);
      setErr(errArr);
    },
    onCompleted: () => {
      setErr([
        <Text key={98} color="green">
          Success
        </Text>,
      ]);
    },
  });
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    errorPolicy: "all",
    refetchQueries: [
      {
        query: FETCH_USER,
        variables: {
          userId: user.id,
        },
      },
    ],
    onError: ({ graphQLErrors, networkError }) => {
      let errArr = [];
      if (graphQLErrors) {
        errArr = errArr.concat(
          graphQLErrors.map((err, i) => <Text key={i}>{err.message}</Text>)
        );
      }
      if (networkError) {
        errArr = errArr.concat([
          <Text color="Red" key={99}>
            {networkError.message}
          </Text>,
        ]);
      }
      console.log(errArr);
      setErr(errArr);
    },
    onCompleted: () => {
      setErr([
        <Text key={98} color="green">
          Success
        </Text>,
      ]);
    },
  });
  const handlePublish = (e, job) => {
    e.preventDefault();
    publishEvent({
      variables: {
        id: job.id,
        eventids: job.eventbriteIds,
        key: job.key,
        dateStr: date,
        interval: value,
      },
    });
  };
  let handleDelete = (e, eJob) => {
    e.preventDefault(console.log(eJob));
    deleteEvent({
      variables: {
        id: eJob.id,
        apikey: eJob.key,
      },
    });
  };
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
        <CalenderButton
          locked={job.locked}
          date={date}
          setDate={setDate}
          confirmed={confirmed}
          setConfirmed={setConfirmed}
        />
      </TableCell>
      <TableCell>
        <Text>{job.status}</Text>
      </TableCell>
      <TableCell>
        <Box direction="row" align="center" pad="small" gap="medium">
          <Text>{value < 10 ? "0" + value: value}</Text>
          <Text>minutes</Text>
          <Button
            plain={false}
            disabled={isSubtractDisabled}
            icon={<Subtract size="small" color="neutral-2" />}
            onChange={() => {
              if (value > 9) {
                setIsAddDisabled(false);
              } else setIsSubtractDisabled(true)
            }}
            onClick={() => {
              if (value > 9) {
                setIsAddDisabled(false);
                setValue(value - 5);
              } else setIsSubtractDisabled(true);
            }}
          />
          <Box align="center" width="xsmall">
            <RangeInput
              min={5}
              max={60}
              step={5}
              value={value}
              onChange={onChange}
              size="xsmall"
            />
          </Box>
          <Button
            plain={false}
            disabled={isAddDisabled}
            icon={<Add size="small" color="neutral-2" />}
            onClick={() => {
              if (value < 60) {
                setIsSubtractDisabled(false);
                setValue(value + 5);
              } else setIsAddDisabled(true);
            }}
          />
        </Box>
      </TableCell>
      <TableCell>
        <Box direction="row">
          <Button
            disabled={!date || !confirmed || job.locked}
            type="button"
            size="small"
            label="Schedule"
            onClick={(e) => {
              handlePublish(e, job);
            }}
          />
          <Button
            onClick={(e) => handleDelete(e, job)}
            size="small"
            label="Delete"
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};
const EventStatus = ({ user }) => {
  const [err, setErr] = useState([]);
  let { jobs } = user;
  jobs = jobs.map((job) => {
    return {
      id: job.id,
      created: new Date(job.schedule),
      data: JSON.parse(job.data),
      eventbriteIds: job.eventbriteIds,
      urls: job.urls,
      status: job.status,
      key: user.selectedKey,
      locked: job.locked,
    };
  });
  return (
    <Box pad="medium" align="center" width="100vw">
      <Heading level="3">Created Events</Heading>
      {err}
      <Box pad="large" width="100%">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom" align="center">
                <Text>Title</Text>
              </TableCell>
              <TableCell scope="col" border="bottom" align="center">
                <Text>Location</Text>
              </TableCell>
              <TableCell scope="col" border="bottom" align="center">
                <Text>Date</Text>
              </TableCell>
              <TableCell scope="col" border="bottom" align="center">
                <Text>Status</Text>
              </TableCell>
              <TableCell scope="col" border="bottom" align="center">
                <Text align="center">Batch Interval</Text>
              </TableCell>
              <TableCell scope="col" border="bottom" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job, index) => {
              return (
                <EventTableRow
                  job={job}
                  user={user}
                  key={index}
                  setErr={setErr}
                />
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default EventStatus;
