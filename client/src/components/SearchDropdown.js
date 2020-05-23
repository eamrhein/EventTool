import React, { useRef, useState, useEffect, createContext } from "react";
import { FormClose } from "grommet-icons";
import { Box, Button, CheckBox, Select, Text } from "grommet";
import { FormFieldLabel } from "./FormFieldLabel";
import { useQuery } from "@apollo/react-hooks";
import Queries from "../graphql/queries";
const SearchInputContext = createContext({});
const { FETCH_VENUES } = Queries;

const SearchDropdown = ({ apikey, orgId, setFieldValue, values, ...props }) => {
  const { load, data, error } = useQuery(FETCH_VENUES, {
    variables: {
      apikey,
      orgId,
    },
  });
  let { venues } = data || [];
  let safeVenus = venues.filter((obj) => obj["name"] && obj["id"]);
  const [contentPartners, setContentPartners] = useState(safeVenus);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selectRef = useRef();

  const clearContentPartners = () => {
    setFieldValue("locations", []);
  };

  useEffect(() => {
    const filterContentPartners = safeVenus.filter((s) => {
      let { name } = s;
      if (name) {
        return name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0;
      }
      return null;
    });
    setTimeout(() => {
      setSearching(false);
      setContentPartners(filterContentPartners);
    }, 500);
  }, [searching, searchQuery, safeVenus]);

  const renderOption = ({ name }) => (
    <Box direction="row" align="center" pad="small" flex={false}>
      <CheckBox
        tabIndex="-1"
        checked={values.locations.some((partner) => partner.name === name)}
        label={<Text size="small">{name}</Text>}
        onChange={() => {}}
      />
    </Box>
  );

  const renderContentPartners = () => (
    <Box
      direction="row"
      gap="xsmall"
      pad={{ left: "small", vertical: "small" }}
      align="center"
      flex
    >
      <Box
        background="brand"
        round="medium"
        align="center"
        justify="center"
        pad={{ horizontal: "xsmall" }}
        style={{ minWidth: "21px" }}
      >
        <Text size="small">{values.locations.length}</Text>
      </Box>
      <Box flex>
        <Text size="small" truncate>
          {values.locations.map(({ name }) => name).join(", ")}
        </Text>
      </Box>
      <Button
        href="#"
        onFocus={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          clearContentPartners();
          selectRef.current.focus();
        }}
      >
        <Box background="accent-4" round="full">
          <FormClose style={{ width: "12px", height: "12px" }} />
        </Box>
      </Button>
    </Box>
  );

  const sortContentPartners = (selectedPartnerNames) => {
    return (p1, p2) => {
      const p1Exists = selectedPartnerNames.includes(p1.name);
      const p2Exists = selectedPartnerNames.includes(p2.name);

      if (!p1Exists && p2Exists) {
        return 1;
      }
      if (p1Exists && !p2Exists) {
        return -1;
      }
      if (p1.name.toLowerCase() < p2.name.toLowerCase()) {
        return -1;
      }
      return 1;
    };
  };

  const handleChange = (option) => {
    console.log(option);
    const newSelectedPartners = [...values.locations];
    const seasonIndex = newSelectedPartners
      .map(({ id }) => id)
      .indexOf(option.id);
    if (seasonIndex >= 0) {
      newSelectedPartners.splice(seasonIndex, 1);
    } else {
      newSelectedPartners.push(option);
    }
    const selectedPartnerNames = newSelectedPartners.map(({ id }) => id);
    const sortedContentPartners = [...safeVenus].sort(
      sortContentPartners(selectedPartnerNames)
    );
    setFieldValue("locations", newSelectedPartners);
    setContentPartners(sortedContentPartners);
  };
  if (load) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }
  return (
    <SearchInputContext.Provider>
      <FormFieldLabel {...props}>
        <Select
          ref={selectRef}
          closeOnChange={false}
          placeholder="Select a location"
          searchPlaceholder="Search for Location"
          emptySearchMessage="No locations found, please add some locations"
          multiple
          value={values.locations.length ? renderContentPartners() : undefined}
          selected={values.locations.map((option) =>
            contentPartners.indexOf(option)
          )}
          options={contentPartners}
          onChange={({ option }) => handleChange(option)}
          onSearch={(query) => {
            setSearching(true);
            setSearchQuery(query);
          }}
        >
          {renderOption}
        </Select>
      </FormFieldLabel>
    </SearchInputContext.Provider>
  );
};

export default SearchDropdown;
