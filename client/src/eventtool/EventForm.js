import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import moment from "moment";
import styled from "styled-components";
import { Box, Heading, Paragraph } from "grommet";
import { Formik, Form } from "formik";
import AccountManager from "./AccountManager";
import BasicInfo from "./BasicInfo";
import Schedule from "./Schedule";
import Description from "./Description";
import Tickets from "./Tickets";
import { useMutation } from "@apollo/react-hooks";
import { defaultFormState, validationShape } from "../util/form_defaults";
import Mutations from "../graphql/mutations";
import Queries from "../graphql/queries";

const { SUBMIT_FORM } = Mutations;
const { FETCH_USER } = Queries;

function EventForm({ user, responsive, history, defaultKey }) {
  let validation = Yup.object().shape(validationShape);
  const [selectedKey, setSelectedKey] = useState(defaultKey);
  const [submitForm] = useMutation(SUBMIT_FORM, {
    onError: (err) => {
      console.log(err);
    },
    update(client, { data: { scheduleEvent } }) {
      client.writeQuery({
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
  let dateObj = new Date(Date.now()).toISOString();
  let date = moment(dateObj).add(2, "minutes").toISOString();
  if (user.apikeys && user.apikeys.length > 0) {
    return (
      <Box pad="medium">
        <Formik
          initialValues={defaultFormState}
          validateOnChange={false}
          validationSchema={validation}
          onSubmit={(values, { setSubmitting }) => {
            console.log(selectedKey);
            submitForm({
              variables: {
                id: user.id,
                date: date,
                data: JSON.stringify(values),
                key: selectedKey,
              },
            });
            setSubmitting();
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <AccountManager
                user={user}
                errors={errors}
                selectedKey={selectedKey}
                setSelectedKey={setSelectedKey}
                history={history}
                isSubmitting={isSubmitting}
              />
              <BasicInfo
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                apikey={selectedKey}
                errors={errors}
              />
              <Schedule
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                screenSize={responsive}
                apikey={selectedKey}
                errors={errors}
              />
              <Description
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                apikey={selectedKey}
                errors={errors}
              />
              <Tickets
                values={values}
                setFieldValue={setFieldValue}
                screenSize={responsive}
                errors={errors}
              />
            </Form>
          )}
        </Formik>
      </Box>
    );
  }
  return (
    <Box
      border={{
        color: "brand",
        size: "medium",
      }}
      pad="medium"
      align="center"
      justify="center"
    >
      <Heading
        style={{ fontFamily: "Fira Sans", fontWeight: "900" }}
        margin="small"
      >
        Welcome to Event Tool
      </Heading>
      <Box width="70%" margin="medium" align="start">
        <Heading margin="small" level="3">
          How to use this application:
        </Heading>
        <Paragraph margin="small">
          In order to use this application you need to:
        </Paragraph>
        <Box margin={{ left: "large" }}>
          <Paragraph>1. Login to an Eventbrite account</Paragraph>
          <Paragraph>2. Go to Account Settings</Paragraph>
          <Paragraph>3. Click the Developer Links Section</Paragraph>
          <Paragraph>
            4. Click the create api key button and fill out the nessesary data
          </Paragraph>
          <Paragraph>
            5. Copy the "Private Token" and paste into the eventbrite accounts
            form above{" "}
          </Paragraph>
        </Box>
      </Box>
    </Box>
  );
}

export default EventForm;
