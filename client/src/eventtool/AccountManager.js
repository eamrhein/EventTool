import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import Queries from "../graphql/queries";
import Mutations from "../graphql/mutations";
import Accounts from "../components/AccountList";
import {
  Box,
  Button,
  FormField,
  TextInput,
  Text,
  Collapsible,
  Heading,
} from "grommet";
import { Add, Subtract } from "grommet-icons";
const { FETCH_USER } = Queries;
const { PUSH_API_KEY } = Mutations;

function AccountManager({ user, selectedKey, setSelectedKey, isSubmitting }) {
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
    update(cache, { data: { pushAPIkey } }) {
      let data = cache.readQuery({
        query: FETCH_USER,
        variables: { userId: user.id },
      });
      console.log(data);
      cache.writeQuery({
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
        <Button plain onClick={() => setOpen(!open)}>
          Eventbrite Accounts
        </Button>
      </Heading>
      <Box margin={{ right: "small" }} direction="row" justify="end">
        <Box justify="center">
          <Box
            direction="row"
            align="center"
            gap="small"
            label="Account"
            as="button"
            type="button"
            border={{ color: "neutral-3", size: "small" }}
            size="medium"
            onClick={() => setAddApi(!addApi)}
          >
            {addApi ? (
              <Subtract size="small" color="neutral-3" />
            ) : (
              <Add size="small" color="neutral-3" />
            )}
            <Text size="small" color="neutral-3">
              Edit
            </Text>
          </Box>
        </Box>
      </Box>
      <Collapsible open={open}>
        <Accounts
          user={user}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
        />
        <Collapsible open={addApi}>
          <Box margin="small">
            <FormField error={errorMessage} label="API Key">
              <TextInput
                onChange={(e) => setApiKey(e.target.value)}
                value={apikey}
                placeholder="2HFXXX2G...."
              />
            </FormField>
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                pushApi({
                  variables: {
                    id: user.id,
                    apikey,
                  },
                });
                setApiKey("");
              }}
              color="neutral-2"
              label="Submit"
            />
          </Box>
        </Collapsible>
        <Box align="end">
          <Box direction="row" gap="small">
            <Button
              label="Submit"
              type="submit"
              primary
              size="large"
              color="brand"
              disabled={isSubmitting}
            />
          </Box>
        </Box>
      </Collapsible>
    </Box>
  );
}

export default AccountManager;
