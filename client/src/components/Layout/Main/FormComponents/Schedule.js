import React from "react";
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
import { Calendar as CalendarIcon } from "grommet-icons";
export default function Schedule({ form, setForm, apikey, ...props }) {
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
      setForm({
        ...form,
        start: {
          ...form.start,
          date: dates[0][0],
        },
        end: {
          ...form.end,
          date: dates[0][1],
        },
      });
    }
  };
  const handleTime = (e, time) => {
    if (time === "start") {
      setForm({
        ...form,
        start: {
          ...form.start,
          time: e.target.value,
        },
      });
    }
    if (time === "end") {
      setForm({
        ...form,
        end: {
          ...form.end,
          time: e.target.value,
        },
      });
    }
  };
  console.log(form);
  return (
    <Box pad="small" width="100vw">
      <Heading level="2">
        <CalendarIcon /> Schedule
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
                onSelect={handleDate}
                range
              />
              <Box pad="small" justify="center">
                <TimeInput
                  label="Start Time:"
                  value={form.start.time}
                  onChange={(e) => handleTime(e, "start")}
                  required
                />
                <TimeInput
                  label="End Time:"
                  value={form.end.time}
                  onChange={(e) => handleTime(e, "end")}
                  required
                />
              </Box>
            </Box>
          ) : (
            <Box justify="center" margin="small" direction="row">
              <Calendar bounds={bounds} size="medium" range />
              <Box pad="small" justify="center">
                <TimeInput
                  label="Start Time:"
                  value={form.start.time}
                  onChange={(e) => handleTime(e, "start")}
                  required
                />
                <TimeInput
                  label="End Time:"
                  value={form.end.time}
                  onChange={(e) => handleTime(e, "end")}
                  required
                />
                <FormFieldLabel label="Occurs:">
                  <Select
                    value={form.recurrence.occurs}
                    options={["Daily", "Weekly", "Monthly"]}
                    onChange={({ option }) =>
                      setForm({
                        ...form,
                        recurrence: {
                          ...form.recurrence,
                          occurs: option,
                        },
                      })
                    }
                  />
                </FormFieldLabel>
                <FormFieldLabel
                  info={
                    `Event repeats ` +
                    form.recurrence.times +
                    (form.recurrence.times > 1 ? " times." : " time.")
                  }
                >
                  <TextInput
                    value={form.recurrence.times}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        recurrence: {
                          ...form.recurrence,
                          times: e.target.value,
                        },
                      })
                    }
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
