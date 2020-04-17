import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import Queries from "../../../graphql/queries";
import { Box, Heading, Header, CheckBox, Button, Menu, Text } from "grommet";
import { Logout, Tools, Menu as MenuIcon } from "grommet-icons";
const { IS_LOGGED_IN } = Queries;

const HeaderPanel = ({
  responsive,
  pending,
  setPending,
  mode,
  setMode,
  ...props
}) => {
  const { data, error } = useQuery(IS_LOGGED_IN);
  const eventClient = useApolloClient();
  if (error) return <h3>Error: {error.message}</h3>;
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
    <Header
      height="8vh"
      background={{ light: "light-2", dark: "dark-1" }}
      style={{ transition: "0.25s ease-out" }}
      width="100vw"
      pad="medium"
    >
      <Box direction="row" align="center">
        <Heading
          margin="medium"
          level="1"
          color="brand"
          style={{ userSelect: "none" }}
        >
          Event Tool
        </Heading>
        <Tools color="brand" size="medium" />
      </Box>
      <Menu
        dropProps={{ align: { top: "bottom", left: "left" } }}
        icon={<MenuIcon />}
        pad="small"
        items={
          data.isLoggedIn
            ? [
                {
                  label: (
                    <CheckBox
                      background={{
                        light: "light-2",
                        dark: "dark-2",
                      }}
                      checked={mode}
                      label="Dark Mode"
                    />
                  ),
                },
                {
                  label: (
                    <CheckBox
                      background={{
                        light: "light-2",
                        dark: "dark-2",
                      }}
                      checked={pending}
                      label="Show Upcoming"
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
    <Header
      height="8vh"
      background={{ light: "light-2", dark: "dark-1" }}
      style={{ transition: "0.25s ease-out" }}
      width="100vw"
      pad="medium"
    >
      <Box direction="row" align="center">
        <Heading
          margin="xsmall"
          level="2"
          color="brand"
          style={{ userSelect: "none" }}
        >
          Event Tool
        </Heading>
        <Tools color="brand" size="medium" />
      </Box>
      <Box direction="row" gap="small">
        <CheckBox
          label={
            <Text weight="bold" size="small">
              Dark Theme
            </Text>
          }
          checked={mode}
          onChange={() => setMode(!mode)}
          reverse
        />
        {data.isLoggedIn ? (
          <>
            <CheckBox
              label={
                <Text weight="bold" size="small">
                  Show Upcoming
                </Text>
              }
              checked={pending}
              onClick={() => {
                setPending(!pending);
              }}
              reverse
            />
            <Box gap="small" margin="medium" direction="row">
              <Button
                icon={<Logout size="medium" />}
                color={{ light: "brand", dark: "brand" }}
                primary
                label="Logout"
                onClick={logout}
                style={{ cursor: "pointer" }}
              />
            </Box>
          </>
        ) : null}
      </Box>
    </Header>
  );
};

export default HeaderPanel;
