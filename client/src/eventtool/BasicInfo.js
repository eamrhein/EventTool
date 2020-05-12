import React, { useState } from "react";
import { FastField } from "formik";
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

export default function BasicInfo({
  apikey,
  values,
  handleChange,
  setFieldValue,
  errors,
}) {
  const [open, setOpen] = useState(true);
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
    .filter((obj) => obj.parent === values.category)
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
            info={
              <Box align="end">
                <Text size="small">{values.title.length} / 70</Text>
              </Box>
            }
            error={errors.title}
            label="Event Title"
          >
            <TextInput
              name="title"
              margin="small"
              value={values.title}
              onChange={handleChange}
              placeholder="Be clear and descriptive"
            />
          </FormFieldLabel>
          <Box margin="small" gap="small" direction="row">
            <FormFieldLabel label="Type">
              <Select
                placeholder="Type"
                value={values.type}
                onChange={({ option }) => setFieldValue("type", option)}
                options={types}
              />
            </FormFieldLabel>
            <FormFieldLabel label="Category">
              <Select
                placeholder="Music"
                value={values.category}
                onChange={({ option }) => setFieldValue("category", option)}
                options={categories}
              />
            </FormFieldLabel>
            {subcategories.length > 1 ? (
              <FormFieldLabel label="Subcategory">
                <Select
                  value={values.subcategory}
                  onChange={({ option }) =>
                    setFieldValue("subcategory", option)
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
          <FormFieldLabel label="Venue" margin="small">
            <Select
              multiple={false}
              value={values.locationType || ""}
              placeholder="Venue"
              options={["Venue", "Online Event", "To Be Announced"]}
              onChange={({ option }) => setFieldValue("locationType", option)}
            />
          </FormFieldLabel>
          {values.locationType === "Venue" ? (
            <FormFieldLabel margin="small">
              <Search values={values} setFieldValue={setFieldValue} />
            </FormFieldLabel>
          ) : null}
        </Box>
      </Collapsible>
    </Box>
  );
}
