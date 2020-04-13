import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Queries from "../../../../graphql/queries";
import { Box, Heading, Select, TextInput, Text } from "grommet";
import { FormFieldLabel } from "../../../Custom/FormFieldLabel";
import { FaWpforms, FaRegMap, FaSearch } from "react-icons/fa";

const { FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES } = Queries;

export default function BasicInfo({ apikey, form, setForm }) {
  let { title, location, category, subcategory, type } = form;
  const { loading, data, error } = useQuery(
    FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES,
    {
      variables: {
        apikey,
      },
    }
  );
  if (loading) return <Box width="100vw">...loading</Box>;
  if (error) {
    console.log(error);
    return null;
  }
  let categories = data.categories.map(({ name }) => name);
  let subcategories = data.subcategories
    .filter((obj) => obj.parent === category)
    .map(({ name }) => name);
  let types = data.types.map(({ name }) => name);
  let orgs = data.account.organizations.map(({ name, id }) => {
    return name;
  });
  return (
    <Box pad="small" width="100vw">
      <Heading color={{ light: "light-6", dark: "dark-6" }} level="2">
        <FaWpforms style={{ verticalAlign: "bottom" }} />
        <Text color={{ light: "dark-1", dark: "light-1" }} size="xlarge">
          {" "}
          Basic Info
        </Text>
      </Heading>
      <Box
        margin={{
          left: "large",
          top: "small",
          right: "small",
          bottom: "small",
        }}
      >
        <FormFieldLabel
          margin="small"
          required
          info={
            <Box align="end">
              <Text size="small">{title.length} / 70</Text>
            </Box>
          }
          label="Event Title"
        >
          <TextInput
            maxLength="70"
            margin="small"
            value={title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Be clear and descriptive"
          />
        </FormFieldLabel>
        <Box margin="small" gap="small" direction="row">
          <FormFieldLabel label="Type">
            <Select
              placeholder="Conference"
              value={type}
              onChange={({ option }) => setForm({ ...form, type: option })}
              options={types}
            />
          </FormFieldLabel>
          <FormFieldLabel label="Category">
            <Select
              placeholder="Music"
              value={category}
              onChange={({ option }) => setForm({ ...form, category: option })}
              options={categories}
            />
          </FormFieldLabel>
          {subcategories.length > 1 ? (
            <FormFieldLabel label="Subcategory">
              <Select
                value={subcategory}
                onChange={({ option }) =>
                  setForm({ ...form, subcategory: option })
                }
                options={subcategories}
              />
            </FormFieldLabel>
          ) : null}
        </Box>
        <FormFieldLabel label="Organizer" margin="small">
          <Select value={orgs[0]} options={orgs} />
        </FormFieldLabel>
      </Box>
      <Heading color={{ light: "light-6", dark: "dark-6" }} level="2">
        <FaRegMap style={{ verticalAlign: "bottom" }} />
        <Text color={{ light: "dark-1", dark: "light-1" }} size="xlarge">
          {" "}
          Locations
        </Text>
      </Heading>
      <Box
        margin={{
          left: "large",
          top: "small",
          right: "small",
          bottom: "small",
        }}
      >
        <FormFieldLabel label="Venue" margin="small" required>
          <Select
            value={location}
            onChange={({ option }) => setForm({ ...form, location: option })}
            options={["Venue", "Online Event", "To Be Announced"]}
          />
        </FormFieldLabel>
        {location === "Venue" ? (
          <FormFieldLabel margin="small">
            <TextInput
              icon={<FaSearch />}
              placeholder="Search for a venue or address."
            />
          </FormFieldLabel>
        ) : null}
      </Box>
    </Box>
  );
}
