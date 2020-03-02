import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import Queries from "../../graphql/queries";
import { Box, Text } from "grommet";
import { FormTrash } from "grommet-icons";

const { FETCH_ACCOUNT } = Queries;
function AccountCard({ apikey, id }) {
  const [hover, sethover] = useState(false);
  const { loading, data, error } = useQuery(FETCH_ACCOUNT, {
    variables: {
      apikey
    }
  });
  if (error) return <h3>Error</h3>;
  if (loading) return null;
  let { account } = data;
  console.log(account);
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
          color={hover ? "status-error" : "status-disabled"}
        />
      </div>
    </Box>
  );
}
function Accounts({ apikeys }) {
  return apikeys.map((apikey, id) => {
    return <AccountCard key={id} apikey={apikey} id={id} />;
  });
}

export default Accounts;
