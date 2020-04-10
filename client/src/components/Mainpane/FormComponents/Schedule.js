import React, { useState } from "react";
import { Calendar, Box, RadioButton, Select, Text, FormField } from "grommet";

export default function Schedule({ form, setForm, apikey, ...props }) {
  const [dateList, setDateList] = useState([]);
  let today = new Date();
  let year = today.getFullYear();
  let day = today.getDate();
  let month = today.getMonth();
  let bounds = [
    today.toISOString(),
    new Date(year + 5, month, day).toISOString()
  ];
  function handleDayClick(day) {
    let nArray = dateList;
    const index = nArray.findIndex(item => item === day);
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
      <Box margin="small" gap="small">
        <RadioButton
          name="single"
          label="Single Occurance - Happens once and can last multiple days"
          checked={!form.series}
          onChange={event => setForm({ ...form, series: false })}
          {...props}
        />
        <RadioButton
          label="Recuring Events - Repeats or occurs more than once"
          name="series"
          checked={form.series}
          onChange={event => setForm({ ...form, series: true })}
          {...props}
        />
      </Box>
      <Box>
        {!form.series ? (
          <Box direction="row">
            <Calendar
              bounds={bounds}
              size="medium"
              dates={dateList}
              onSelect={handleDayClick}
              range
            />
            <Box>
              <Text>Start Time:</Text>
              <Select value="1" options={["1"]} />
              <Text>End Time:</Text>
              <Select value="1" options={["1"]} />
            </Box>
          </Box>
        ) : (
          <Box direction="row">
            <Calendar
              bounds={bounds}
              size="medium"
              dates={dateList}
              onSelect={handleDayClick}
            />
            <Box>
              <Text>Start Time:</Text>
              <Select value="1" options={["1"]} />
              <Text>End Time:</Text>
              <Select value="1" options={["1"]} />
              <Text>Occurance</Text>
              <Select value="1" options={["1"]} />
              <Box>After X events</Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
