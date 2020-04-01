import React, { useState } from "react";
import { Box, Form, Heading, Calendar } from "grommet";
import Tabs from "./tabs";
import BasicInfo from "./BasicInfo";
function EventForm() {
  const [dateList, setdateList] = useState([]);
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
      console.log("hello");
    } else {
      nArray.splice(index, 1);
    }
    console.log(nArray);
    setdateList(nArray);
  }
  return (
    <Box background="light-1" style={{ height: "100%", alignItems: "center" }}>
      <Form style={{ minWidth: "100%" }}>
        <Tabs>
          <Box label="Basic Info">
            <BasicInfo />
          </Box>
          <Box label="Schedule">
            <Box
              margin="medium"
              pad="medium"
              background="light-5"
              elevation="medium"
            >
              <Heading level="4">Schedule</Heading>
              <Calendar
                bounds={bounds}
                daysOfWeek
                size="medium"
                date={new Date().toISOString()}
                dates={dateList}
                onSelect={handleDayClick}
              />
            </Box>
            <Box
              margin="medium"
              pad="medium"
              background="light-5"
              elevation="medium"
            >
              empty
            </Box>
          </Box>
        </Tabs>
      </Form>
    </Box>
  );
}

export default EventForm;
