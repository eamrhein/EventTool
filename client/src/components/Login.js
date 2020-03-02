import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Mutations from "../graphql/mutations";
import { Box, Form, FormField, TextInput, Button, Heading } from "grommet";

const { LOGIN_USER } = Mutations;

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN_USER, {
    onCompleted: data => {
      const { token, id } = data.login;
      localStorage.setItem("auth-token", token);
      localStorage.setItem("userId", id);
      props.history.push("/");
    },
    onError: err => {
      const message = err.message.split(":")[1];
      setError(message);
    },
    update: (client, data) => {
      updateCache(client, data);
    }
  });
  function updateCache(client, { data }) {
    client.writeData({
      data: {
        isLoggedIn: data.login.loggedIn,
        userId: data.login.id
      }
    });
  }

  return (
    <>
      <Heading>Event Tool</Heading>
      <Box
        align="center"
        background="light-1"
        pad="small"
        elevation="medium"
        width="450px"
        border={{ size: "small" }}
      >
        <Box>
          <Heading level="2">Login</Heading>
        </Box>
        <Form
          align="end"
          onSubmit={e => {
            e.preventDefault();
            login({
              variables: {
                email,
                password
              }
            });
          }}
        >
          <FormField label="Email Address" align="start">
            <TextInput
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@example.com"
            />
          </FormField>
          <FormField label="Password" align="start">
            <TextInput
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </FormField>
          <Button
            margin={{ left: "auto" }}
            type="submit"
            primary
            label="Submit"
          />
          <Box
            style={{ color: "Red" }}
            align="center"
            height="20px"
            pad="large"
          >
            {error}
          </Box>
        </Form>
      </Box>
    </>
  );
};

export default Login;
