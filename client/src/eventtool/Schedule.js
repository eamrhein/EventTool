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
  form,
  setForm,
  apikey,
  screenSize,
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
    if (dates[0].length === 2) {
      setFieldValue("start", {
        ...values.start,
        date: dates[0][0],
      });
      setFieldValue("end", {
        ...values.end,
        date: dates[0][1],
      });
    }
  };
  const handleTime = (e, time) => {
    if (time === "start") {
      setFieldValue("start", {
        ...values.start,
        time: e.target.value,
      });
    }
    if (time === "end") {
      setFieldValue("end", {
        ...values.start,
        time: e.target.value,
      });
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
              <Calendar
                bounds={bounds}
                size="medium"
                onSelect={handleDate}
                range
              />
              <Box pad="small" justify="center">
                <TimeInput
                  label="Start Time:"
                  value={values.start.time}
                  onChange={(e) => handleTime(e, "start")}
                  required
                />
                <TimeInput
                  label="End Time:"
                  value={values.end.time}
                  onChange={(e) => handleTime(e, "end")}
                  required
                />
              </Box>
            </Box>
          ) : (
            <Box
              justify="center"
              margin="small"
              direction={screenSize === "small" ? "column" : "row"}
            >
              <Calendar bounds={bounds} size="medium" range />
              <Box pad="small" justify="center">
                <TimeInput
                  label="Start Time:"
                  value={values.start.time}
                  onChange={(e) => handleTime(e, "start")}
                  required
                />
                <TimeInput
                  label="End Time:"
                  value={values.end.time}
                  onChange={(e) => handleTime(e, "end")}
                  required
                />
                <FormFieldLabel label="Occurs:">
                  <Select
                    value={values.recurrence.occurs}
                    options={["Daily", "Weekly", "Monthly"]}
                    onChange={({ option }) =>
                      setFieldValue("recurrence", {
                        ...values.recurrence,
                        occurs: option,
                      })
                    }
                  />
                </FormFieldLabel>
                <FormFieldLabel
                  info={
                    `Event repeats ` +
                    values.recurrence.times +
                    (values.recurrence.times > 1 ? " times." : " time.")
                  }
                >
                  <TextInput
                    value={values.recurrence.times}
                    onChange={(e) =>
                      setFieldValue("recurrence", {
                        ...values.recurrence,
                        times: e.target.value,
                      })
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
