import React, { useState, useEffect } from "react";
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

const { FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES, FETCH_VENUES } = Queries;

export default function BasicInfo({
  apikey,
  values,
  handleChange,
  setFieldValue,
  errors,
}) {
  const [open, setOpen] = useState(true);
  const [subcategoriesList, setSubcategoriesList] = useState([]);
  const [venueList, setVenueList] = useState([]);
  const {
    loading,
    data: {
      account: { organizations } = {},
      categories,
      subcategories,
      types,
    } = {},
    error,
  } = useQuery(FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES, {
    variables: {
      apikey,
    },
  });

  useEffect(() => {
    let mounted = true;
    if (mounted && subcategories) {
      setSubcategoriesList(
        subcategories
          .filter((obj) => obj.parent === values.category.name)
          .map(({ name, id }) => {
            return {
              name,
              id,
            };
          })
      );
    }
    return () => {
      mounted = false;
    };
  }, [subcategories, values.category.name]);
  
  useEffect(() => {
    let mounted = true;
    if (mounted && organizations) {
      setFieldValue("organization", organizations[0]);
    }
    return () => {
      mounted = false;
    };
  }, [organizations, setFieldValue]);

  const {
    load: venueLoad,
    data: { venues } = {},
    error: venueError,
  } = useQuery(FETCH_VENUES, {
    variables: { apikey, orgId: values.organization.id },
  });
  useEffect(() => {
    let mounted = true;
    if (mounted && venues) {
      setVenueList(venues.filter((obj) => obj["name"] && obj["id"]));
    }

    return () => {
      mounted = false;
    };
  }, [venues]);
  if (loading)
    return (
      <Box height="100vh" justify="center" align="center">
        <Spinner />
      </Box>
    );
  if (error || venueError) {
    return <Box>{error.message}</Box>;
  }

  if (loading || venueLoad)
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
                  options={subcategoriesList}
                />
              </FormFieldLabel>
            ) : null}
          </Box>
          <FormFieldLabel label="Organizer" margin="small">
            <Select
              labelKey="name"
              valueKey={{ key: "id" }}
              value={values.organization}
              options={organizations}
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
          {values.locationType === "Venue" && venues ? (
            <Search
              apikey={apikey}
              venues={venueList}
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
