import React, { useState } from "react";
import {
  Calendar,
  Box,
  RadioButton,
  Select,
  Text,
  Heading,
  TextInput,
} from "grommet";
import { FormFieldLabel } from "../../../Custom/FormFieldLabel";
import { TimeInput } from "../../../Custom/TimeInput";
import { FaCalendar } from "react-icons/fa";
export default function Schedule({ form, setForm, apikey, ...props }) {
  const [dateList, setDateList] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [count, setCount] = useState(1);
  let today = new Date();
  let year = today.getFullYear();
  let day = today.getDate();
  let month = today.getMonth();
  let bounds = [
    today.toISOString(),
    new Date(year + 5, month, day).toISOString(),
  ];
  function handleDayClick(day) {
    let nArray = dateList;
    const index = nArray.findIndex((item) => item === day);
    if (index === -1) {
      nArray.push(day);
    } else {
      nArray.splice(index, 1);
    }
    console.log(dateList);
    setDateList(nArray);
  }
  return (
    <Box pad="small" width="100vw">
      <Heading color="status-unknown" level="2">
        <FaCalendar style={{ verticalAlign: "bottom" }} />
        <Text color={{ light: "dark-1", dark: "light-2" }} size="xlarge">
          {" "}
          Schedule
        </Text>
      </Heading>
      <Box
        margin={{
          left: "large",
          top: "small",
          right: "small",
          bottom: "small",
        }}
      >
        <FormFieldLabel
          pad={true}
          help={
            <Box
              pad="medium"
              margin="small"
              background={{ light: "light-4", dark: "dark-4" }}
            >
              <RadioButton
                name="single"
                label={
                  <Box margin="xxsmall">
                    <Text size="small">
                      <Text size="small" weight="bold">
                        Single occurrence
                      </Text>{" "}
                      - happens once and can last multiple days
                    </Text>
                  </Box>
                }
                checked={!form.series}
                onChange={(event) => setForm({ ...form, series: false })}
                {...props}
              />
              <RadioButton
                label={
                  <Box margin="xxsmall">
                    <Text size="small">
                      <Text size="small" weight="bold">
                        Recurring events
                      </Text>{" "}
                      - repeats or occurs more than once
                    </Text>
                  </Box>
                }
                name="series"
                checked={form.series}
                onChange={(event) => setForm({ ...form, series: true })}
                {...props}
              />{" "}
            </Box>
          }
        >
          {!form.series ? (
            <Box justify="around" margin="small" direction="row">
              <Calendar
                bounds={bounds}
                size="medium"
                dates={dateList}
                onSelect={handleDayClick}
                range
              />
              <Box pad="small" justify="center">
                <TimeInput
                  label="Start Time:"
                  value={start}
                  onChange={(event) => setStart(event.target.value)}
                  required
                />
                <TimeInput
                  label="End Time:"
                  value={end}
                  onChange={(event) => setEnd(event.target.value)}
                  required
                />
              </Box>
            </Box>
          ) : (
            <Box justify="center" margin="small" direction="row">
              <Calendar
                bounds={bounds}
                size="medium"
                dates={dateList}
                onSelect={handleDayClick}
                range
              />
              <Box pad="small" justify="center">
                <TimeInput
                  label="Start Time:"
                  value={start}
                  onChange={(event) => setStart(event.target.value)}
                  required
                />
                <TimeInput
                  label="End Time:"
                  value={end}
                  onChange={(event) => setEnd(event.target.value)}
                  required
                />
                <FormFieldLabel label="Occurs:">
                  <Select
                    value="Daily"
                    options={["Daily", "Weekly", "Monthly"]}
                  />
                </FormFieldLabel>
                <FormFieldLabel
                  info={
                    `Event repeats ` +
                    count +
                    (count > 1 ? " times." : " time.")
                  }
                >
                  <TextInput
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                  />
                </FormFieldLabel>
              </Box>
            </Box>
          )}
        </FormFieldLabel>
      </Box>
    </Box>
  );
}
