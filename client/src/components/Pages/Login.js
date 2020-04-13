import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/react-hooks";
import Mutations from "../../graphql/mutations";
import { Box, Form, FormField, TextInput, Button, Heading } from "grommet";
import Tabs from "../Custom/tabs";
import Demo from "../Custom/demoLogin";
import { Mail } from "grommet-icons";

const { LOGIN_USER, REGISTER_USER } = Mutations;

const Login = (props) => {
  const demoLogin = "demo@demo.com";
  const demoPass = "123456";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const { token, id } = data.login;
      localStorage.setItem("auth-token", token);
      localStorage.setItem("userId", id);
      props.history.push("/");
    },
    onError: (err) => {
      const message = err.message.split(":")[1];
      setError(message);
    },
    update: (client, data) => {
      updateCache(client, data);
    },
  });

  const [register] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      login({ variables: { email, password } });
    },
    onError: (err) => {
      const message = err.message.split(":")[1];
      setError(message + "hello");
    },
  });

  function updateCache(client, { data }) {
    client.writeData({
      data: {
        isLoggedIn: data.login.loggedIn,
        userId: data.login.id,
      },
    });
  }

  return (
    <Box width="100%" height="100%" align="center">
      <Heading>Event Tool</Heading>
      <Tabs>
        <Box label="Login" align="center" pad="small">
          <Form
            align="end"
            onSubmit={(e) => {
              e.preventDefault();
              login({
                variables: {
                  email,
                  password,
                },
              });
            }}
          >
            <FormField info="Email Address" align="start">
              <TextInput
                icon={<Mail />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
              />
            </FormField>
            <FormField info="Password" align="start">
              <TextInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        <Box label="Register">
          <Form
            align="end"
            onSubmit={(e) => {
              e.preventDefault();
              register({
                variables: {
                  email,
                  password,
                },
              });
            }}
          >
            <FormField info="Email Address" align="start">
              <TextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
              />
            </FormField>
            <FormField info="Password" align="start">
              <TextInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        <Box label="Demo" align="center" pad="small">
          <Demo
            error={error}
            login={login}
            password={password}
            setPassword={setPassword}
            email={email}
            setEmail={setEmail}
          />
        </Box>
      </Tabs>
    </Box>
  );
};

export default Login;
