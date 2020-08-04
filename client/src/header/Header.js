import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { Box, Heading, Header, Button, Menu, Text } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";

const HeaderPanel = ({ isLoggedIn, responsive }) => {
  const eventClient = useApolloClient();
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    localStorage.removeItem("userId");
    eventClient.writeData({
      data: {
        isLoggedIn: false,
        userId: null,
      },
    });
  };

  return responsive === "small" ? (
    <Header height="5vh">
      <Menu
        alignSelf="center"
        dropProps={{ align: { top: "bottom", left: "left" } }}
        icon={<MenuIcon />}
        pad="small"
        items={
          isLoggedIn
            ? [
                {
                  label: <Link to="/status">Status</Link>,
                },
                {
                  label: "Logout",
                  onClick: (e) => logout(e),
                },
              ]
            : []
        }
      />
    </Header>
  ) : (
    <Header height="10vh">
      {isLoggedIn ? (
        <>
          <Box pad="medium" direction="row" align="center">
            <Link style={{ textDecoration: "none" }} to="/">
              <Heading
                level="1"
                color="brand"
                style={{
                  userSelect: "none",
                  fontFamily: "Playball",
                }}
              >
                Eventbrite Tool
              </Heading>
            </Link>
          </Box>
          <Box direction="row" gap="small">
            <Box gap="small" margin="medium" direction="row">
              <Link style={{ textDecoration: "none" }} to="/status">
                <Text color="dark-1">Status</Text>
              </Link>
            </Box>
            <Box gap="small" margin="medium" direction="row">
              <Button
                style={{
                  fontFamily: "Fira Sans",
                }}
                weight="bold"
                plain
                label="Logout"
                onClick={logout}
              />
            </Box>
          </Box>
        </>
      ) : null}
    </Header>
  );
};

export default HeaderPanel;
