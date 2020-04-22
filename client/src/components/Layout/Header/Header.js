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
    <Header background="brand">
      <Menu
        alignSelf="center"
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
                  onClick: () => setMode(!mode),
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
    <Header background="brand">
      <Box pad="small" direction="row" align="center">
        <Heading level="1" style={{ userSelect: "none" }}>
          Event Tool <Tools size="2.5rem" />
        </Heading>
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
                label="Logout"
                onClick={logout}
              />
            </Box>
          </>
        ) : null}
      </Box>
    </Header>
  );
};

export default HeaderPanel;
