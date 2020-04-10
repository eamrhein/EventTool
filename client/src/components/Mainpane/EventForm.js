import React, { useState } from "react";
import { Box, Form } from "grommet";
import { useQuery } from "@apollo/react-hooks";
import Queries from "../../graphql/queries";
import Tabs from "./tabs";
import BasicInfo from "./FormComponents/BasicInfo";
import Schedule from "./FormComponents/Schedule";
import Description from "./FormComponents/Description";

const { FETCH_USER } = Queries;

let defaultFormState = {
  title: "",
  location: "Venue",
  category: "Category",
  subcategory: "subcategory",
  type: "Type",
  start: new Date().toISOString(),
  end: new Date().toISOString(),
  series: false
};
function EventForm({ userId }) {
  const [form, setForm] = useState(defaultFormState);
  const { loading, data, error } = useQuery(FETCH_USER, {
    variables: {
      userId
    }
  });
  if (loading) return "...";
  if (error) {
    console.log(error);
    return null;
  }
  let { user } = data;
  let { apikeys } = user;
  let key = apikeys[0];
  console.log(form);
  return (
    <Form
      value={form}
      background="light-1"
      style={{ height: "100%", alignItems: "center" }}
    >
      <Tabs>
        <Box label="Basic Info">
          <BasicInfo form={form} setForm={setForm} apikey={key} />
        </Box>
        <Box label="Schedule">
          <Schedule form={form} setForm={setForm} apikey={key} />
        </Box>
        <Box label="Description">
          <Description form={form} setForm={setForm} apikey={key} />
        </Box>
      </Tabs>
    </Form>
  );
}

export default EventForm;
