import React, { useState } from "react";
import { Box, Heading, Select, TextInput, Text } from "grommet";
import { FaWpforms, FaRegMap, FaSearch } from "react-icons/fa";
import { Search } from "grommet-icons";
export default function BasicInfo(props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Venue")
  return (
    <Box margin="small" pad="small">
      <Heading level="2">
        <FaWpforms style={{ verticalAlign: "bottom" }} /> Basic Info
      </Heading>
      <Box margin="small">
        <Heading level="4">Title</Heading>
        <TextInput
          margin="small"
          name="title"
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Be clear and descriptive"
        />
        <Box align="end">
          <Text size="small">{title.length} / 70</Text>
        </Box>
      </Box>
      <Box gap="small" margin="small" direction="row">
        <Select placeholder="Type" options={["1"]} />
        <Select placeholder="Category" options={["1"]} />
      </Box>
      <Select margin="small" placeholder="Organizations" options={["1"]} />
      <Heading level="2">
        <FaRegMap style={{ verticalAlign: "bottom" }} /> Location
      </Heading>
      <Box gap="small" margin="small">
        <Select value={location} onChange={({ option }) => setLocation(option)} options={["Venue", "Online Event", "To Be Announced"]} />
        <Box>
          <TextInput
            icon={<FaSearch />}
            placeholder="Search for a venue or address."
          />
        </Box>
      </Box>
    </Box>
  );
}
