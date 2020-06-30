import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import moment from "moment";
import { Box, Heading, Paragraph, Text, Button } from "grommet";
import { Ascend } from "grommet-icons";
import { Formik, Form } from "formik";
import AccountManager from "./AccountManager";
import BasicInfo from "./BasicInfo";
import Schedule from "./Schedule";
import Description from "./Description";
import Tickets from "./Tickets";
import { useMutation } from "@apollo/react-hooks";
import { defaultFormState, validationShape } from "../../util/form_defaults";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";

const { SUBMIT_FORM } = Mutations;
const { FETCH_USER } = Queries;

const top = () => {
  setTimeout(function () {
    console.log("test");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 200);
};

function EventForm({ user, responsive, defaultKey }) {
  const [success, setSuccess] = useState(false);
  const [yPos, setYpos] = useState(0);
  useEffect(() => {
    const listener = (e) => setYpos(window.scrollY);
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);
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
    onCompleted: () => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    },
  });
  let dateObj = new Date(Date.now()).toISOString();
  let date = moment(dateObj).add(2, "minutes").toISOString();
  if (user.apikeys && user.apikeys.length > 0) {
    return (
      <Box pad="medium" overflow="auto">
        <Formik
          initialValues={defaultFormState}
          validateOnChange={false}
          validationSchema={validation}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
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
              {success ? (
                <Box pad="small" border={{ size: "small", color: "status-ok" }}>
                  <Text size="small" color="status-ok">
                    Event Submitted Successfully
                  </Text>
                </Box>
              ) : null}
              <AccountManager
                user={user}
                errors={errors}
                selectedKey={selectedKey}
                setSelectedKey={setSelectedKey}
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
        {yPos > 100 ? (
          <Box
            style={{ position: "fixed", top: "95%", left: "95%" }}
            direction="row"
            justify="end"
          >
            <Button
              color="accent-3"
              plain
              icon={<Ascend />}
              onClick={() => top()}
            />
          </Box>
        ) : null}
      </Box>
    );
  }
  return (
    <Box
      height="100vh"
      border={{
        color: "brand",
        size: "medium",
      }}
      overflow="auto"
      pad="medium"
      align="center"
      justify="center"
    >
      <AccountManager
        user={user}
        errors={[]}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        emptyAccount
      />
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
