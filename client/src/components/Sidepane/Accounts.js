import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import { Box, Text } from "grommet";
import { FormTrash } from "grommet-icons";
const { DELETE_API_KEY } = Mutations;
const { FETCH_ACCOUNT, FETCH_USER } = Queries;
function AccountCard({ apikey, id, userId }) {
  const [hover, sethover] = useState(false);
  const [deleteAPI] = useMutation(DELETE_API_KEY, {
    onError: err => {
      const message = err.message.split(":")[1];
      console.log(message);
    },
    update(client, { data: { deleteAPIkey } }) {
      let data = client.readQuery({
        query: FETCH_USER,
        variables: { userId }
      });
      client.writeQuery({
        query: FETCH_USER,
        variables: { userId },
        data: {
          user: {
            ...data.user,
            apikeys: deleteAPIkey.apikeys
          }
        }
      });
    }
  });
  const { loading, data, error } = useQuery(FETCH_ACCOUNT, {
    variables: {
      apikey
    }
  });
  if (error) return <h3>Error</h3>;
  if (loading) return null;
  let { account } = data;
  return (
    <Box
      key={id}
      direction="row"
      margin="xsmall"
      justify="between"
      background="light-2"
      elevation="medium"
      flex="grow"
      height="80px"
    >
      <Box background="light-2" pad="xsmall" margin="xsmall" direction="column">
        <Text size="xsmall">
          <Text size="xsmall" weight="bold">
            Account Name:
          </Text>{" "}
          {account.name}
        </Text>
        <Text size="xsmall">
          <Text size="xsmall" weight="bold">
            Email:
          </Text>{" "}
          {account.email}
        </Text>
        <Text size="xsmall">
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
          onClick={e => {
            e.preventDefault();
            deleteAPI({
              variables: {
                id: userId,
                apikey
              }
            });
          }}
          color={hover ? "status-error" : "status-disabled"}
        />
      </div>
    </Box>
  );
}
function Accounts({ user }) {
  return user.apikeys.map((apikey, id) => {
    return <AccountCard key={id} apikey={apikey} userId={user.id} id={id} />;
  });
}

export default Accounts;
