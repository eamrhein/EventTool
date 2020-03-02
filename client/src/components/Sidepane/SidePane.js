import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import Accounts from "./Accounts";
import {
  Box,
  Button,
  Form,
  FormField,
  TextInput,
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
  let [apikey, setApiKey] = useState("");
  const [pushApi] = useMutation(PUSH_API_KEY, {
    onError: err => {
      const message = err.message.split(":")[1];
      console.log(err.message);
    },
    update(cache, { data: { pushApikey } }) {
      let newUser = data.user;
      newUser.apikeys = pushApikey.apikeys;
      cache.writeQuery({
        query: FETCH_USER,
        data: { user: newUser }
      });
    }
  });
  if (error) return <h3>Error {error.message}</h3>;
  if (loading) return null;
  return (
    <Box
      width="300px"
      height="89.6vh"
      pad="4px"
      background="light-6"
      pad="small"
      align="start"
      flex="shrink"
    >
      <Box height={{ max: "65.6vh" }} width="100%" overflow="auto">
        <Accounts apikeys={data.user.apikeys} />
      </Box>
      <Box>
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
            round="small"
            elevation="medium"
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
                <FormField label="API Key" align="start">
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
