import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import Mutations from "./graphql/mutations";
import { Box, Heading, Tabs, Tab } from "grommet";
import { LoginForm } from "./components";


//Lam
const { LOGIN_USER, REGISTER_USER } = Mutations;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [tabColors, setTabColors] = useState(["brand", "plain", "plain"]);
  const [index, setIndex] = React.useState(0);
  const onActive = (nextIndex) => {
    let nArray = [...tabColors];
    nArray[index] = "plain";
    nArray[nextIndex] = "brand";
    setTabColors([...nArray]);
    setIndex(nextIndex);
  };
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
    <Box width="100vw" height="100vh" align="center" justify="center">
      <Heading
        level="1"
        size="large"
        color="brand"
        style={{ userSelect: "none", fontFamily: "Playball" }}
      >
        Event Tool
      </Heading>
      <Tabs activeIndex={index} onActive={onActive} pad="small" width="70vw">
        <Tab
          title={
            <Heading color={tabColors[0]} level="3" weight="bold">
              Login
            </Heading>
          }
          pad="small"
        >
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            action={login}
          />
        </Tab>
        <Tab
          title={
            <Heading color={tabColors[1]} level="3" weight="bold">
              Register
            </Heading>
          }
        >
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            action={register}
          />
        </Tab>
        <Tab
          title={
            <Heading color={tabColors[2]} level="3" weight="bold">
              Demo
            </Heading>
          }
          align="center"
          pad="small"
        >
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            action={login}
            demo
          />
        </Tab>
      </Tabs>
    </Box>
  );
};

export default Login;
