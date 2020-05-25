import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { Box, Heading, Header, CheckBox, Button, Menu } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";

const HeaderPanel = ({ isLoggedIn, responsive, pending, setPending }) => {
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
    <Header>
      <Menu
        alignSelf="center"
        dropProps={{ align: { top: "bottom", left: "left" } }}
        icon={<MenuIcon />}
        pad="small"
        items={
          isLoggedIn
            ? [
                {
                  label: (
                    <CheckBox
                      background={{
                        light: "light-2",
                        dark: "dark-2",
                      }}
                      checked={pending}
                      label="Scheduled Events"
                    />
                  ),
                  onClick: () => setPending(!pending),
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
    <Header>
      {isLoggedIn ? (
        <>
          <Box pad="medium" direction="row" align="center">
            <Heading
              level="1"
              color="brand"
              style={{ userSelect: "none", fontFamily: "Playball" }}
            >
              Event Tool
            </Heading>
          </Box>
          <Box direction="row" gap="small">
            <Box gap="small" margin="medium" direction="row">
              <Button
                onClick={() => {
                  setPending(!pending);
                }}
                style={{
                  fontFamily: "Fira Sans",
                  textDecoration: pending ? "underline" : "none",
                }}
              >
                Created Events
              </Button>
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
