import React, { useState } from "react";
import { Box } from "grommet";
import { useQuery } from "@apollo/react-hooks";
import Queries from "../../../graphql/queries";
import SidePanel from "../../Layout/Side/SidePanel";
import Tabs from "../../Custom/tabs";
import BasicInfo from "./FormComponents/BasicInfo";
import Schedule from "./FormComponents/Schedule";
import Description from "./FormComponents/Description";
import Tickets from "./FormComponents/Tickets";

const { FETCH_USER } = Queries;

let defaultFormState = {
  active_tab: "Basic Info",
  title: "",
  location: "Venue",
  category: "Category",
  subcategory: "subcategory",
  type: "Type",
  start: {
    date: new Date().toISOString(),
    time: "",
  },
  end: {
    date: new Date().toISOString(),
    time: "",
  },
  series: false,
  recurrence: {
    times: 1,
    occurs: "Daily",
  },
};
function EventForm({ userId, responsive, ...props }) {
  const [form, setForm] = useState(defaultFormState);
  console.log(form)
  const { loading, data, error } = useQuery(FETCH_USER, {
    variables: {
      userId,
    },
  });
  if (loading) return <Box width="100vw">...loading</Box>;
  if (error) {
    console.log(error);
    return null;
  }
  let { user } = data;
  let { apikeys } = user;
  let key = apikeys[0];
  if (form.active_tab === "Accounts" && responsive !== "small") {
    setForm({ ...form, active_tab: "Basic Info" });
  }

  return responsive === "small" ? (
    <Box value={form}>
      <Tabs form={form} setForm={setForm}>
        <Box label="Accounts">
          <Box height="100%" width="100%">
            <SidePanel id={userId} history={props.history} />
          </Box>
        </Box>
        <Box label="Basic Info">
          <BasicInfo form={form} setForm={setForm} apikey={key} />
        </Box>
        <Box label="Schedule">
          <Schedule form={form} setForm={setForm} apikey={key} />
        </Box>
        <Box label="Description">
          <Description form={form} setForm={setForm} apikey={key} />
        </Box>
        <Box label="Tickets">
          <Tickets />
        </Box>
      </Tabs>
    </Box>
  ) : (
    <Box value={form}>
      <Tabs form={form} setForm={setForm}>
        <Box label="Basic Info">
          <BasicInfo form={form} setForm={setForm} apikey={key} />
        </Box>
        <Box label="Schedule">
          <Schedule form={form} setForm={setForm} apikey={key} />
        </Box>
        <Box label="Description">
          <Description form={form} setForm={setForm} apikey={key} />
        </Box>
        <Box label="Tickets">
          <Tickets />
        </Box>
      </Tabs>
    </Box>
  );
}

export default EventForm;
