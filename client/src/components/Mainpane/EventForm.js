import React, { useState } from "react";
import { Box, Form, FormField, Heading, Calendar } from "grommet";
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
    <Box
      background="light-1"
      pad="medium"
      style={{ height: "100%", alignItems: "center" }}
    >
      <Heading level="2" margin="medium">
        Event Creator
      </Heading>
      {/* Basic Info */}
      <Form style={{ minWidth: "100%" }}>
        <Box
          margin="medium"
          pad="medium"
          background="light-5"
          elevation="medium"
        >
          <Heading level="3">Details</Heading>
          <FormField name="title" label="Title" />
          <FormField name="Description" label="Description" />
        </Box>
        <Box
          margin="medium"
          pad="medium"
          background="light-5"
          elevation="medium"
        >
          <Heading level="4">Locations</Heading>
          <FormField name="city" label="City" />
          <FormField name="state" label="state" />
          <FormField name="state" label="zip" />
        </Box>
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
          <Heading level="4">Schedule</Heading>
          <FormField name="city" label="City" />
          <FormField name="state" label="state" />
          <FormField name="state" label="zip" />
        </Box>
      </Form>
    </Box>
  );
}

export default EventForm;
