import React, { useState } from "react";
import {
  Calendar,
  Box,
  RadioButton,
  Select,
  Text,
  Heading,
  TextInput,
  Collapsible,
  Button,
} from "grommet";
import { FormFieldLabel } from "../components/";
import { TimeInput } from "../components/";
import { Calendar as CalendarIcon } from "grommet-icons";

export default function Schedule({
  values,
  onChange,
  setFieldValue,
  apikey,
  screenSize,
  errors,
  ...props
}) {
  const [open, setOpen] = useState(false);
  let today = new Date();
  let year = today.getFullYear();
  let day = today.getDate();
  let month = today.getMonth();
  let bounds = [
    today.toISOString(),
    new Date(year + 5, month, day).toISOString(),
  ];

  const handleDate = (dates) => {
    if (typeof dates === "string") {
      setFieldValue("start_date", dates[0][0]);
      setFieldValue("end_date", "");
    }
    if (typeof dates === "object") {
      setFieldValue("start_date", dates[0][0]);
      setFieldValue("end_date", dates[0][1]);
    }
  };
  const handleTime = (e, time) => {
    if (time === "start") {
      setFieldValue("start_time", e.target.value);
    }
    if (time === "end") {
      setFieldValue("end_time", e.target.value);
    }
  };
  return (
    <Box pad="medium" width="100vw" fill>
      <Button plain onClick={() => setOpen(!open)}>
        <Heading
          color={
            open
              ? "neutral-2"
              : {
                  dark: "light-1",
                  light: "dark-1",
                }
          }
          level="2"
        >
          {open ? "-" : "+"}{" "}
          <CalendarIcon
            size="medium"
            color={
              open
                ? "neutral-2"
                : {
                    dark: "light-1",
                    light: "dark-1",
                  }
            }
          />{" "}
          Schedule
        </Heading>
      </Button>
      <Collapsible open={open}>
        <FormFieldLabel
          pad={true}
          help={
            <Box
              id="schedule"
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
                checked={!values.series}
                onChange={() => setFieldValue("series", false)}
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
                checked={values.series}
                onChange={() => setFieldValue("series", true)}
                {...props}
              />{" "}
            </Box>
          }
        >
          {!values.series ? (
            <Box
              justify="around"
              margin="small"
              direction={screenSize === "small" ? "column" : "row"}
            >
              <FormFieldLabel
                label="Select an event date"
                error={errors.start_date}
              >
                <Calendar
                  bounds={bounds}
                  size="medium"
                  onSelect={handleDate}
                  range
                />
              </FormFieldLabel>
              <Box pad="small" justify="center">
                <TimeInput
                  error={errors.start_time}
                  label="Start Time:"
                  value={values.start_time}
                  onChange={(e) => handleTime(e, "start")}
                  required
                />
                <TimeInput
                  error={errors.end_time}
                  label="End Time:"
                  value={values.end_time}
                  onChange={(e) => handleTime(e, "end")}
                  required
                />
              </Box>
            </Box>
          ) : (
            <Box
              id="schedule"
              justify="center"
              margin="small"
              direction={screenSize === "small" ? "column" : "row"}
            >
              <FormFieldLabel
                label="Select an event date"
                error={errors.start_date}
              >
                <Calendar bounds={bounds} size="medium" range />
              </FormFieldLabel>

              <Box pad="small" justify="center">
                <TimeInput
                  error={errors.start_time}
                  label="Start Time:"
                  value={values.start_time}
                  onChange={(e) => handleTime(e, "start")}
                  required
                />
                <TimeInput
                  error={errors.end_time}
                  label="End Time:"
                  value={values.end_time}
                  onChange={(e) => handleTime(e, "end")}
                  required
                />
                <FormFieldLabel label="Occurs:">
                  <Select
                    value={values.occurs}
                    options={["Daily", "Weekly", "Monthly"]}
                    onChange={({ option }) => setFieldValue("occurs", option)}
                  />
                </FormFieldLabel>
                <FormFieldLabel
                  info={
                    `Event repeats ` +
                    values.times +
                    (values.times > 1 ? " times." : " time.")
                  }
                >
                  <TextInput
                    value={values.times}
                    onChange={(e) =>
                      setFieldValue("recurrence", e.target.value)
                    }
                  />
                </FormFieldLabel>
              </Box>
            </Box>
          )}
        </FormFieldLabel>
      </Collapsible>
    </Box>
  );
}
