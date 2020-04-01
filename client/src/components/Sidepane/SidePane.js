import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import Accounts from "./AccountList";
import {
  Box,
  Button,
  Form,
  FormField,
  TextInput,
  Text,
  Accordion,
  AccordionPanel
} from "grommet";

const { FETCH_USER } = Queries;
const { PUSH_API_KEY } = Mutations;

function SidePane(props) {
  let { id } = props;
  const { loading, data, error } = useQuery(FETCH_USER, {
    variables: {
      userId: id
    }
  });
  const [errorMessage, setErrorMessage] = useState(null);
  let [apikey, setApiKey] = useState("");
  const [pushApi] = useMutation(PUSH_API_KEY, {
    onError: err => {
      const message = err.message.split(":")[1];
      setErrorMessage(<Text size="small">{message}</Text>);
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    },
    update(client, { data: { pushAPIkey } }) {
      client.writeQuery({
        query: FETCH_USER,
        variables: { userId: id },
        data: {
          user: {
            ...data.user,
            apikeys: pushAPIkey.apikeys
          }
        }
      });
    }
  });
  if (error) return <h3>Error {error.message}</h3>;
  if (loading) return null;
  return (
    <Box
      height="100%"
      background="light-1"
      pad="small"
      align="start"
      flex="shrink"
    >
      <Box height={{ max: "65.6vh" }} width="100%" overflow="auto">
        <Accounts user={data.user} />
      </Box>
      <Box height="20vh">
        <Accordion alignSelf="center">
          <AccordionPanel
            height="30px"
            pad="small"
            margin={{
              top: "small",
              bottom: "small",
              left: "15px",
              right: "15px"
            }}
            background="brand"
            label="Add Account"
          >
            <Box margin="medium">
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  pushApi({
                    variables: {
                      id: data.user.id,
                      apikey
                    }
                  });
                  setApiKey("");
                }}
              >
                <FormField error={errorMessage} label="API Key" align="start">
                  <TextInput
                    onChange={e => setApiKey(e.target.value)}
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
