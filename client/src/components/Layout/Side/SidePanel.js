import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import Queries from "../../../graphql/queries";
import Mutations from "../../../graphql/mutations";
import Accounts from "../../Custom/AccountList";
import {
  Box,
  Button,
  Form,
  FormField,
  TextInput,
  Text,
  Accordion,
  AccordionPanel,
  Heading,
} from "grommet";

const { FETCH_USER } = Queries;
const { PUSH_API_KEY } = Mutations;

function SidePane({ user, selectedKey, setSelectedKey }) {
  let { apikeys } = user;

  useEffect(() => {
    setSelectedKey(apikeys[0]);
  }, [apikeys, setSelectedKey]);

  const [errorMessage, setErrorMessage] = useState(null);
  let [apikey, setApiKey] = useState("");
  const [pushApi] = useMutation(PUSH_API_KEY, {
    onError: (err) => {
      const message = err.message.split(":")[1];
      setErrorMessage(<Text size="small">{message}</Text>);
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    },
    update(client, { data: { pushAPIkey } }) {
      client.writeQuery({
        query: FETCH_USER,
        variables: { userId: user.id },
        data: {
          user: {
            ...user,
            apikeys: pushAPIkey.apikeys,
          },
        },
      });
    },
  });
  return (
    <Box pad="small" align="start">
      <Box height={{ max: "65.6vh" }} width="100%" overflow="auto">
        <Box
          margin={{
            top: "small",
            bottom: "small",
            left: "15px",
            right: "15px",
          }}
          pad="xsmall"
          background="brand"
        >
          <Heading level="4">Select Account</Heading>
        </Box>
        <Accounts
          user={user}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
        />
        <Accordion alignSelf="center" width="100%">
          <AccordionPanel
            height="30px"
            pad="small"
            margin={{
              top: "small",
              bottom: "small",
              left: "15px",
              right: "15px",
            }}
            background="brand"
            label="Add Account"
          >
            <Box margin="medium" wo>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  pushApi({
                    variables: {
                      id: user.id,
                      apikey,
                    },
                  });
                  setApiKey("");
                }}
              >
                <FormField error={errorMessage} label="API Key" align="start">
                  <TextInput
                    onChange={(e) => setApiKey(e.target.value)}
                    value={apikey}
                    placeholder="2HFXXX2G...."
                  />
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
      </Box>
    </Box>
  );
}

export default SidePane;
