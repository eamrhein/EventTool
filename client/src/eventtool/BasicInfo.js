import React, { useState, useEffect, useMemo } from "react";
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
  let categories = data.categories.map(({ name, id }) => {
    return { name, id };
  });
  let subcategories = data.subcategories
    .filter((obj) => obj.parent === values.category.name)
    .map(({ name, id }) => {
      return { name, id };
    });
  let types = data.types.map(({ name, id }) => {
    return { name, id };
  });
  let orgData = data.account.organizations;
  let orgs = useMemo(() => {
    return orgData.map(({ name, id }) => {
      return { name, id };
    });
  }, [orgData]);
  useEffect(() => {
    setFieldValue("organization", orgs[0]);
  }, [orgs, setFieldValue]);

  if (loading)
    return (
      <Box height="100vh" justify="center" align="center">
        <Spinner />
      </Box>
    );
  if (error) {
    return <Box>{error.message}</Box>;
  }
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
        <Box id="basic" margin="small">
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
            <FormFieldLabel error={errors.type} label="Type">
              <Select
                placeholder="Type"
                value={values.type}
                labelKey="name"
                valueKey={{ key: "id" }}
                onChange={({ option }) => setFieldValue("type", option)}
                options={types}
              />
            </FormFieldLabel>
            <FormFieldLabel error={errors.category} label="Category">
              <Select
                placeholder="Music"
                labelKey="name"
                valueKey={{ key: "id" }}
                value={values.category}
                onChange={({ option }) => setFieldValue("category", option)}
                options={categories}
              />
            </FormFieldLabel>
            {subcategories.length > 1 ? (
              <FormFieldLabel error={errors.subcategory} label="Subcategory">
                <Select
                  value={values.subcategory}
                  labelKey="name"
                  valueKey={{ key: "id" }}
                  onChange={({ option }) =>
                    setFieldValue("subcategory", option)
                  }
                  options={subcategories}
                />
              </FormFieldLabel>
            ) : null}
          </Box>
          <FormFieldLabel label="Organizer" margin="small">
            <Select
              labelKey="name"
              valueKey={{ key: "id" }}
              value={values.organization}
              options={orgs}
              onChange={({ option }) => setFieldValue("organization", option)}
            />
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
            <Search
              apikey={apikey}
              orgId={values.organization.id}
              label="Location"
              margin="small"
              error={errors.locations}
              values={values}
              setFieldValue={setFieldValue}
            />
          ) : null}
        </Box>
      </Collapsible>
    </Box>
  );
}
