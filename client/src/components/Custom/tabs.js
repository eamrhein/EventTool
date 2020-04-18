import React, { useState } from "react";
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

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label)
  const onClickTabItem = (tab) => {
    setActiveTab(tab)
  };
  return (
    <Box margin="xsmall">
      <Box pad="small" gap="small" direction="row" justify="around">
        {children.map((child) => {
          const { label } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </Box>
      <Box>
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </Box>
    </Box>
  );
};

export default Tabs;
