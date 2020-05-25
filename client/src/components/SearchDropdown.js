import React, { useRef, useState, useEffect, createContext } from "react";
import { FormClose } from "grommet-icons";
import { Box, Button, CheckBox, Select, Text } from "grommet";
import { FormFieldLabel } from "./FormFieldLabel";
const SearchInputContext = createContext({});

const SearchDropdown = ({ venues, setFieldValue, values, ...props }) => {
  const [locations, setLocations] = useState(venues);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selectRef = useRef();

  const clearLocations = () => {
    setFieldValue("locations", []);
  };

  useEffect(() => {
    setLocations(venues);
  }, [venues]);

  useEffect(() => {
    const filterLocations = venues.filter(
      (s) => s.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
    );

    setTimeout(() => {
      setSearching(false);
      setLocations(filterLocations);
    }, 500);
  }, [searching, searchQuery, venues]);

  const renderOption = ({ id, name }) => (
    <Box direction="row" align="center" pad="small" flex={false}>
      <CheckBox
        tabIndex="-1"
        checked={values.locations.some((partner) => partner.id === id)}
        label={<Text size="small">{name}</Text>}
        onChange={() => {}}
      />
    </Box>
  );

  const renderLocations = () => (
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
          clearLocations();
          selectRef.current.focus();
        }}
      >
        <Box background="accent-4" round="full">
          <FormClose style={{ width: "12px", height: "12px" }} />
        </Box>
      </Button>
    </Box>
  );

  const sortLocations = (selectedLocationName) => {
    return (p1, p2) => {
      const p1Exists = selectedLocationName.includes(p1.id);
      const p2Exists = selectedLocationName.includes(p2.id);

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
    const newSelectedLocation = [...values.locations];
    const seasonIndex = newSelectedLocation
      .map(({ id }) => id)
      .indexOf(option.id);
    if (seasonIndex >= 0) {
      newSelectedLocation.splice(seasonIndex, 1);
    } else {
      newSelectedLocation.push(option);
    }
    const selectedLocation = newSelectedLocation.map(({ name }) => name);
    const sortedLocation = [...venues].sort(sortLocations(selectedLocation));
    setFieldValue("locations", newSelectedLocation);
    setLocations(sortedLocation);
  };
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
          replace={false}
          valueKey="id"
          labelKey="name"
          value={values.locations.length ? renderLocations() : []}
          options={locations}
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
