import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import Queries from "../../../graphql/queries";
import {
  Box,
  Heading,
  Header,
  CheckBox,
  Button,
  ResponsiveContext,
  Menu,
} from "grommet";
import { Logout, Tools, Menu as MenuIcon } from "grommet-icons";
const { IS_LOGGED_IN } = Queries;

const HeaderPanel = ({
  sidePanel,
  setSidePanel,
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

  return (
    <Header
      height="8vh"
      background={{ light: "light-2", dark: "dark-1" }}
      style={{ transition: "0.25s ease-out" }}
      width="100vw"
      pad="small"
    >
      <Box direction="row" align="center">
        <Heading
          margin="xsmall"
          level="1"
          color="brand"
          style={{ userSelect: "none" }}
        >
          Event Tool
        </Heading>
        <Tools color="brand" size="large" />
      </Box>
      <ResponsiveContext.Consumer>
        {(responsive) =>
          responsive === "small" ? (
            <>
              <Button margin="none" primary color="accent-1" label="Submit" />
              <Menu
                dropProps={{ align: { top: "bottom", left: "left" } }}
                icon={<MenuIcon />}
                pad="small"
                items={
                  data.isLoggedIn
                    ? [
                        {
                          label: <CheckBox checked={mode} label="Dark Mode" />,
                          onClick: () => setMode(!mode),
                        },
                        {
                          label: (
                            <CheckBox checked={sidePanel} label="Options" />
                          ),
                          onClick: () => setSidePanel(!sidePanel),
                        },
                        {
                          label: "Logout",
                          onClick: (e) => logout(e),
                        },
                      ]
                    : []
                }
              />
            </>
          ) : (
            <Box direction="row" gap="small">
              <CheckBox
                label="Dark Mode"
                checked={mode}
                onChange={() => setMode(!mode)}
                toggle
              />
              {data.isLoggedIn ? (
                <>
                  <CheckBox
                    label="Options"
                    checked={sidePanel}
                    onClick={() => {
                      setPending(false);
                      setSidePanel(!sidePanel);
                    }}
                    toggle
                  />
                  <CheckBox
                    label="Pending"
                    checked={pending}
                    onClick={() => {
                      setPending(!pending);
                      setSidePanel(false);
                    }}
                    toggle
                  />
                  <Box gap="small" margin="medium" direction="row">
                    <Button primary color="accent-1" label="Submit" />
                    <Button
                      icon={<Logout />}
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
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};

export default HeaderPanel;
