import React, { useState } from "react";
import Search from "../components/SearchDropdown";
import { useQuery } from "@apollo/react-hooks";
import Queries from "../graphql/queries";
import {
  Box,
  Heading,
  Select,
  TextInput,
  Text,
  Collapsible,
  Button,
} from "grommet";
import { Spinner } from "../components";
import { FormFieldLabel } from "../components/FormFieldLabel";
import { Document, MapLocation } from "grommet-icons";

const { FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES } = Queries;

export default function BasicInfo({ apikey, form, setForm }) {
  const [open, setOpen] = useState(true);
  let { title, location, category, subcategory, type } = form;
  const { loading, data, error } = useQuery(
    FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES,
    {
      variables: {
        apikey,
      },
    }
  );
  if (loading)
    return (
      <Box height="100vh" justify="center" align="center">
        <Spinner />
      </Box>
    );
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
    <Box pad="medium" width="100vw" justify="between" flex>
      <Button plain onClick={() => setOpen(!open)}>
        <Heading
          color={
            open
              ? "neutral-2"
              : {
                  dark: "light-1",
                  light: "dark-1",
                }
          }
          level="2"
        >
          {open ? "-" : "+"}{" "}
          <Document
            color={
              open
                ? "neutral-2"
                : {
                    dark: "light-1",
                    light: "dark-1",
                  }
            }
            size="medium"
          />{" "}
          Basic Info
        </Heading>
      </Button>
      <Collapsible open={open}>
        <Box margin="small">
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
                onChange={({ option }) =>
                  setForm({ ...form, category: option })
                }
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
        <Heading level="2">
          <MapLocation /> Locations
        </Heading>
        <Box margin="small">
          <FormFieldLabel label="Venue" margin="small" required>
            <Select
              value={location}
              onChange={({ option }) => setForm({ ...form, location: option })}
              options={["Venue", "Online Event", "To Be Announced"]}
            />
          </FormFieldLabel>
          {location === "Venue" ? (
            <FormFieldLabel margin="small">
              <Search />
            </FormFieldLabel>
          ) : null}
        </Box>
      </Collapsible>
    </Box>
  );
}
