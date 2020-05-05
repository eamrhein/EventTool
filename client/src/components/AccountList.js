import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Queries from "../graphql/queries";
import Mutations from "../graphql/mutations";
import { Box, Text, Grid } from "grommet";
import { FormTrash } from "grommet-icons";
const { DELETE_API_KEY } = Mutations;
const { FETCH_ACCOUNT, FETCH_USER } = Queries;

function AccountCard({ apikey, id, userId, selectedKey, setSelectedKey }) {
  const [hover, sethover] = useState(false);
  const [deleteAPI] = useMutation(DELETE_API_KEY, {
    onError: (err) => {
      const message = err.message.split(":")[1];
      console.log(message);
    },
    update(client, { data: { deleteAPIkey } }) {
      let data = client.readQuery({
        query: FETCH_USER,
        variables: { userId },
      });
      client.writeQuery({
        query: FETCH_USER,
        variables: { userId },
        data: {
          user: {
            ...data.user,
            apikeys: deleteAPIkey.apikeys,
          },
        },
      });
    },
  });
  const { loading, data, error } = useQuery(FETCH_ACCOUNT, {
    variables: {
      apikey,
    },
  });
  if (error)
    return (
      <h3 style={{ color: "red", fontWeight: "bolder" }}>
        {error.message.split(":")[1]}
      </h3>
    );
  if (loading) return null;
  let { account } = data;
  return (
    <Box
      focusIndicator={false}
      width="100vw"
      key={id}
      direction="row"
      border={
        apikey === selectedKey
          ? {
              color: "brand",
              size: "small",
            }
          : {
              size: "small",
            }
      }
      background={{ light: "light-2", dark: "dark-1" }}
      as="button"
      style={{ cursor: "pointer" }}
      onClick={() => setSelectedKey(apikey)}
    >
      <Box pad="xsmall" direction="column">
        <Text size="xsmall" truncate>
          <Text size="xsmall" weight="bold">
            Account Name:
          </Text>{" "}
          {account.name}
        </Text>
        <Text size="xsmall" truncate>
          <Text size="xsmall" weight="bold">
            Email:
          </Text>{" "}
          {account.email}
        </Text>
        <Text size="xsmall" truncate>
          <Text size="xsmall" weight="bold">
            API_KEY:
          </Text>{" "}
          {account.apikey}
        </Text>
      </Box>
      <div style={{ width: "25px", padding: "3px" }}>
        <FormTrash
          onMouseEnter={() => sethover(true)}
          onMouseLeave={() => sethover(false)}
          onClick={(e) => {
            e.preventDefault();
            deleteAPI({
              variables: {
                id: userId,
                apikey,
              },
            });
          }}
          color={hover ? "status-error" : "status-disabled"}
        />
      </div>
    </Box>
  );
}

function AccountList({ user, selectedKey, setSelectedKey }) {
  if (user.apikeys.length > 0) {
    return (
      <Grid
        columns={{
          count: user.apikeys.length % 4,
          size: "xsmall",
        }}
        margin="small"
        gap="small"
      >
        {user.apikeys.map((apikey, id) => (
          <AccountCard
            key={id}
            apikey={apikey}
            userId={user.id}
            id={id}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
          />
        ))}
      </Grid>
    );
  } else {
    return (
      <Box width="100vw">
        <Box margin="medium">
          <Text pad="small">
            Please add the secret keys from the accounts you want to post with.
          </Text>
        </Box>
      </Box>
    );
  }
}

export default AccountList;
