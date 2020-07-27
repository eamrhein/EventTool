import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries"
import Accounts from "../../components/AccountList";
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
const { PUSH_API_KEY, SELECT_KEY } = Mutations;
const { FETCH_USER } = Queries

//  To Display formik Error messages
function FormErrors({ errors }) {
  let errorList = Object.keys(errors).map((key, idx) => (
    <Text size="small" color="red" key={idx}>
      * {key} - {errors[key]}
    </Text>
  ));
  return Object.keys(errors).length > 0 ? (
    <Box
      margin={{ left: "large", right: "large", bottom: "small" }}
      pad="medium"
      border={{ color: "red", size: "small" }}
    >
      <Text size="small" color="red">
        This form has errors in the following fields:
      </Text>
      <Box margin={{ left: "large" }}>{errorList}</Box>
    </Box>
  ) : null;
}

const AddKeyForm = ({ id, open }) => {
  let [apikey, setApiKey] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [pushApi] = useMutation(PUSH_API_KEY, {
    onError: (err) => {
      const message = err.message.split(":")[1];
      setErrorMessage(<Text size="small">{message}</Text>);
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    },
  });
  const [selectKey] = useMutation(SELECT_KEY, {
    onError: (err) => {
      console.log(err.message);
    },
    update(cache, { data: { selectKey } }) {
      let data = cache.readQuery({
        query: FETCH_USER,
        variables: { userId: id },
      });
      cache.writeQuery({
        query: FETCH_USER,
        variables: { userId: id },
        data: {
          user: {
            ...data.user,
            apikeys: [...data.user.apikeys, selectKey.selectedKey],
            selectedKey: selectKey.selectedKey,
          },
        },
      });
    },
  });
  return (
    <Collapsible open={open || false}>
      <Box margin="small">
        <FormField error={errorMessage} label="API Key">
          <TextInput
            onChange={(e) => {
              setApiKey(e.target.value)
            }}
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
                id,
                apikey,
              },
            });
            selectKey({
              variables: {
                userId: id,
                key: apikey 

              }
            })
            setApiKey("");
          }}
          color="neutral-2"
          label="Submit"
        />
      </Box>
    </Collapsible>
  );
};

function AccountManager({
  user,
  selectedKey,
  isSubmitting,
  errors,
  resetForm,
  success,
  emptyAccount,
}) {
  const [open, setOpen] = useState(true);
  const [addApi, setAddApi] = useState(emptyAccount || false);
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
            border={{ size: "small" }}
            size="medium"
            onClick={() => setAddApi(!addApi)}
          >
            {addApi ? <Subtract size="small" /> : <Add size="small" />}
            <Text size="small">Edit</Text>
          </Box>
        </Box>
      </Box>

      <Collapsible background="purple" open={open}>
        <Accounts
          resetForm={resetForm}
          user={user}
          selectedKey={selectedKey}
        />
        <AddKeyForm id={user.id} open={addApi} />
        <FormErrors errors={errors} />
        {success ? <Text>{success}</Text> : null}
        {emptyAccount ? null : (
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
        )}
      </Collapsible>
    </Box>
  );
}

export default AccountManager;
