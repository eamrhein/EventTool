import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import Queries from "../graphql/queries";
import Mutations from "../graphql/mutations";
import Accounts from "../components/AccountList";
import {
  Box,
  Button,
  Form,
  FormField,
  TextInput,
  Text,
  Collapsible,
  Heading,
} from "grommet";

const { FETCH_USER } = Queries;
const { PUSH_API_KEY } = Mutations;

function AccountManager({ user, selectedKey, setSelectedKey }) {
  let { apikeys } = user;
  const [open, setOpen] = useState(true);
  const [addApi, setAddApi] = useState(false);
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
    <Box pad="medium" width="100vw" justify="between" flex>
      <Button plain onClick={() => setOpen(!open)}>
        <Heading
          color={
            open
              ? "brand"
              : {
                  dark: "light-1",
                  light: "dark-1",
                }
          }
          level="3"
        >
          Eventbrite Accounts
        </Heading>
      </Button>
      <Collapsible open={open}>
        <Accounts
          user={user}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
        />
        <Collapsible open={addApi}>
          <Box margin="small">
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
              <FormField error={errorMessage} label="API Key">
                <TextInput
                  onChange={(e) => setApiKey(e.target.value)}
                  value={apikey}
                  placeholder="2HFXXX2G...."
                />
              </FormField>
              <Button type="submit" color="neutral-2" label="Submit" a />
            </Form>
          </Box>
        </Collapsible>
        <Box align="end">
          <Button
            label="add account"
            size="medium"
            color="neutral-2"
            onClick={() => setAddApi(!addApi)}
          />
        </Box>
      </Collapsible>
    </Box>
  );
}

export default AccountManager;
