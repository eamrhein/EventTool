import React, { useRef, useEffect } from "react";
import { Box, Form, FormField, TextInput, Button, Text } from "grommet";
import { Mail } from "grommet-icons";

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  action,
  demo,
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (demo) {
      console.log("hello");
      let i = 0;
      let string = "demo@demo.com123456";
      const int = setInterval(() => {
        if (i <= 13) {
          setEmail(string.slice(0, i));
        } else if (i < string.length && i > 13) {
          setPassword(string.slice(13, i + 1));
        } else {
          inputRef.current.click();
          clearInterval(int);
        }
        i++;
        return () => {
          clearInterval(int);
        };
      }, 100);
    }
  }, [setEmail, setPassword, demo]);
  return (
    <Form
      align="start"
      onSubmit={(e) => {
        e.preventDefault();
        action({
          variables: {
            email,
            password,
          },
        });
      }}
    >
      <FormField info="Email Address">
        <TextInput
          icon={<Mail />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
        />
      </FormField>
      <FormField info="Password">
        <TextInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </FormField>
      <Box style={{ color: "Red" }} align="center" height="20px">
        <Text
          style={{ fontStyle: "italic", fontFamily: "Fira Sans" }}
          size="large"
        >
          {error}
        </Text>
      </Box>
      <Box>
        <Button
          ref={inputRef}
          pad="large"
          alignSelf="end"
          type="submit"
          primary
          label="Submit"
        />
      </Box>
    </Form>
  );
};
