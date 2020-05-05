import React, { useEffect, useRef } from "react";
import { Box, Form, FormField, TextInput, Button } from "grommet";
import { Mail } from "grommet-icons";
const DemoLogin = ({ email, setEmail, password, setPassword, login, error }) => {
  const inputRef = useRef(null);
  useEffect(() => {
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
    }, 200);
  }, [setEmail, setPassword]);

  return (
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
        ref={inputRef}
        margin={{ left: "auto" }}
        type="submit"
        primary
        label="Submit"
      />
      <Box style={{ color: "Red" }} align="center" height="20px" pad="large">
        {error}
      </Box>
    </Form>
  );
};
export default DemoLogin;
