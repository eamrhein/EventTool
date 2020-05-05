import React, { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import { Box, Heading, Paragraph } from "grommet";
import AccountManager from "./AccountManager";
import BasicInfo from "./BasicInfo";
import Schedule from "./Schedule";
import Description from "./Description";
import Tickets from "./Tickets";
import { useMutation } from "@apollo/react-hooks";
import Mutations from "../graphql/mutations";
import Queries from "../graphql/queries";

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

let MainBox = styled(Box)`
  @keyframes fadeIn {
    0% {
      transition: ease-in;
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transition: ease-out;
    }
    100% {
      opacity: 0;
    }
  }
`;

function EventForm({ user, responsive, history, pending, defaultKey }) {
  const [form, setForm] = useState(defaultFormState);
  const [selectedKey, setSelectedKey] = useState(defaultKey);
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
  const [render, setRender] = useState(true);
  useEffect(() => {
    if (!pending) setRender(true);
  }, [pending]);

  const onAnimationEnd = () => {
    if (pending) setRender(false);
  };
  return (
    render && (
      <MainBox
        onAnimationEnd={onAnimationEnd}
        style={{ animation: `${pending ? "fadeOut" : "fadeIn"} 1s` }}
        value={form}
        pad="medium"
      >
        <AccountManager
          user={user}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
          history={history}
        />
        {user.apikeys && user.apikeys.length > 0 ? (
          <>
            <BasicInfo form={form} setForm={setForm} apikey={selectedKey} />
            <Schedule
              screenSize={responsive}
              form={form}
              setForm={setForm}
              apikey={selectedKey}
            />
            <Description form={form} setForm={setForm} apikey={selectedKey} />
            <Tickets screenSize={responsive} form={form} setForm={setForm} />
          </>
        ) : (
          <Box width={{ min: "100%" }} pad="large" justify="center">
            <Heading textAlign="center" margin="small" level="1">
              Welcome to Event Tool
            </Heading>
            <Heading fill margin="small" level="3">
              How to use this application:
            </Heading>
            <Paragraph fill margin="small">
              In order to use this application you need to add the secret keys
              from the accounts you want to use.
            </Paragraph>
          </Box>
        )}
      </MainBox>
    )
  );
}

export default EventForm;