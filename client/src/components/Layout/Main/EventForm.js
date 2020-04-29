import React, { useState, useEffect } from "react";
import moment from "moment";
import { Box, Tabs, Tab } from "grommet";
import SidePanel from "../../Layout/Side/SidePanel";
import BasicInfo from "./FormComponents/BasicInfo";
import Schedule from "./FormComponents/Schedule";
import Description from "./FormComponents/Description";
import Tickets from "./FormComponents/Tickets";
import { useMutation } from "@apollo/react-hooks";
import Mutations from "../../../graphql/mutations";
import Queries from "../../../graphql/queries";

const { SUBMIT_FORM } = Mutations;
const { FETCH_USER } = Queries;
let defaultFormState = {
  active_tab: "Basic Info",
  title: "",
  location: "Venue",
  category: "Category",
  subcategory: "subcategory",
  type: "Type",
  summary: "",
  description: "",
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
  tickets: [],
};

function EventForm({ user, selectedKey, setSelectedKey, responsive, history }) {
  const [form, setForm] = useState(defaultFormState);
  const [index, setIndex] = useState();
  const onActive = (nextIndex) => setIndex(nextIndex);
  const [submitForm] = useMutation(SUBMIT_FORM, {
    onError: (err) => {
      console.log(err);
    },
    update(client, { data: { scheduleEvent } }) {
      let updateUser = client.writeQuery({
        query: FETCH_USER,
        variables: { userId: user.id },
        data: {
          user: {
            ...scheduleEvent,
          },
        },
        fetchPolicy: "no-cache",
      });
    },
  });
  let date = moment(new Date()).add("10", "seconds").toISOString();
  useEffect(() => {
    submitForm({
      variables: {
        id: user.id,
        date,
        data: JSON.stringify(form),
      },
    });
  }, []);
  if (form.active_tab === "Accounts" && responsive === "large") {
    setForm({ ...form, active_tab: "Basic Info" });
  }

  return responsive !== "large" ? (
    <Box value={form}>
      <Tabs
        margin="small"
        activeIndex={index}
        onActive={onActive}
        defaultTab="Accounts"
      >
        <Tab title="Accounts">
          <SidePanel
            user={user}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            history={history}
          />
        </Tab>
        <Tab title="Basic Info" pad="large">
          <BasicInfo form={form} setForm={setForm} apikey={selectedKey} />
        </Tab>
        <Tab title="Schedule">
          <Schedule
            screenSize={responsive}
            form={form}
            setForm={setForm}
            apikey={selectedKey}
          />
        </Tab>
        <Tab title="Description">
          <Description form={form} setForm={setForm} apikey={selectedKey} />
        </Tab>
        <Tab title="Tickets">
          <Tickets screenSize={responsive} form={form} setForm={setForm} />
        </Tab>
      </Tabs>
    </Box>
  ) : (
    <Box value={form}>
      <Tabs
        activeIndex={index}
        onActive={onActive}
        defaultTab="Accounts"
        screenSize={responsive}
        margin="small"
      >
        <Tab title="Basic Info">
          <BasicInfo form={form} setForm={setForm} apikey={selectedKey} />
        </Tab>
        <Tab title="Schedule">
          <Schedule
            screenSize={responsive}
            form={form}
            setForm={setForm}
            apikey={selectedKey}
          />
        </Tab>
        <Tab title="Description">
          <Description form={form} setForm={setForm} apikey={selectedKey} />
        </Tab>
        <Tab title="Tickets">
          <Tickets screenSize={responsive} form={form} setForm={setForm} />
        </Tab>
      </Tabs>
    </Box>
  );
}

export default EventForm;
