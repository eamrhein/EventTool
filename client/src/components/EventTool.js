import React, { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { Switch } from "react-router-dom";
import Queries from "../graphql/queries";
import { WaveSpinner } from "react-spinners-kit";
import {
  Box,
  Heading,
  Button,
  Header,
  Text,
  Form,
  FormField,
  TextInput,
  Accordion,
  AccordionPanel,
  Select
} from "grommet";

const { FETCH_USER_ID, FETCH_USER } = Queries;
function Account({ account }) {
  let options = account.organizations.map(org => org.name);
  const [value, setValue] = React.useState(options[0]);
  return (
    <Box
      key={account.id}
      direction="column"
      pad="xsmall"
      margin="xsmall"
      elevation="medium"
      background="light-3"
    >
      <Text size="small">Account: {account.email}</Text>
      <Text size="small">API KEY:{account.apikey}</Text>
      <Text size="small">Organizations:</Text>
      <Select
        margin="xsmall"
        size="xsmall"
        dropHeight="xsmall"
        value={value}
        onChange={({ option }) => setValue(option)}
        options={options}
      />
    </Box>
  );
}

function User({ id }) {
  const { loading, data, error } = useQuery(FETCH_USER, {
    variables: {
      userId: id
    }
  });
  if (error) return <h3>Error</h3>;
  if (loading)
    return (
      <Box
        direction="column"
        width="100%"
        align="center"
        justify="center"
        pad="medium"
        margin="small"
        elevation="medium"
      >
        <Text color="brand">
          <WaveSpinner size={50} color="#7D4CDB" />
        </Text>
      </Box>
    );
  return (
    <>
      {data.user.accounts.map(account => {
        return <Account account={account} />;
      })}
      <Accordion alignSelf="center" margin={{ top: "30px", bottom: "30px" }}>
        <AccordionPanel
          margin="small"
          elevation="medium"
          background="brand"
          label="Add Account"
        >
          <Box pad="small">
            <Form>
              <FormField label="API Key" align="start">
                <TextInput placeholder="2HFXXX2G...." />
              </FormField>
              <Button
                margin={{ left: "auto" }}
                type="submit"
                primary
                label="Submit"
              />
            </Form>
          </Box>
        </AccordionPanel>
      </Accordion>
    </>
  );
}

function EventTool(props) {
  const eventClient = useApolloClient();
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    localStorage.removeItem("userId");
    eventClient.writeData({
      data: {
        isLoggedIn: false,
        userId: null
      }
    });
    props.history.push("/");
  };
  const { loading, data, error } = useQuery(FETCH_USER_ID);
  if (error) return <h3>Error: {error.message}</h3>;
  if (loading) return <WaveSpinner size={15} color="#686769" />;
  return (
    <>
      <Header
        background="brand"
        width="100%"
        margin="none"
        elevation="small"
        pad={{ left: "20px", right: "20px" }}
        border={{ bottom: "small" }}
      >
        <Heading level="3">Event Tool</Heading>
        <Button onClick={logout}>Logout</Button>
      </Header>
      <Box
        background="light-6"
        direction="row"
        width="100%"
        align="start"
        pad="small"
        // overflow={{ horizontal: "auto", vertical: "hidden" }}
      >
        <User id={data.userId} />
      </Box>
      <Box
        background="light-3"
        direction="row"
        width="100%"
        height="29900px"
        align="start"
        pad="small"
        basis="large"
      >
        Content
      </Box>
    </>
  );
}

export default EventTool;
