import React from "react";
import { Box, Text } from "grommet";

const Tab = ({ label, onClick, activeTab }) => {
  let className = "tab-item";
  let active = false;
  if (activeTab === label) {
    className += "active";
    active = true;
  }
  return (
    <Box pad="xsmall" className={className} onClick={() => onClick(label)}>
      <Text
        style={
          active
            ? {
                borderBottom: "3px solid #7D4CDB",
              }
            : null
        }
        truncate
        weight={active ? "bold" : "normal"}
      >
        {label}
      </Text>
    </Box>
  );
};

const Tabs = ({ children, form, setForm }) => {
  let { active_tab } = form;
  const onClickTabItem = (tab) => {
    setForm({ ...form, active_tab: tab });
  };
  return (
    <Box margin="xsmall">
      <Box pad="small" gap="small" direction="row" justify="around">
        {children.map((child) => {
          const { label } = child.props;
          return (
            <Tab
              activeTab={active_tab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </Box>
      <Box>
        {children.map((child) => {
          if (child.props.label !== active_tab) return undefined;
          return child.props.children;
        })}
      </Box>
    </Box>
  );
};

export default Tabs;
