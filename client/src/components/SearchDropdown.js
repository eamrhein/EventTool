import React, { useRef, useState, useEffect, createContext } from "react";
import { FormClose } from "grommet-icons";
import { Box, Button, CheckBox, Select, Text } from "grommet";
import { FormFieldLabel } from "./FormFieldLabel";
import test from "./locations.json";
const SearchInputContext = createContext({});

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
    if (p1.City.toLowerCase() < p2.City.toLowerCase()) {
      return -1;
    }
    return 1;
  };
};

const SearchDropdown = ({ venues, setFieldValue, values, ...props }) => {
  const [locations, setLocations] = useState(test.sort(sortLocations("")));
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selectRef = useRef();
  const clearLocations = () => {
    setFieldValue("locations", []);
  };

  let timerId = useRef();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const filterLocations = test.filter(
        (s) => s.City.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
      );

      timerId.current = setTimeout(() => {
        setSearching(false);
        setLocations(filterLocations);
      }, 500);
    }
    return () => {
      clearTimeout(timerId.current);
      mounted = false;
    };
  }, [searching, searchQuery, test]);

  const renderOption = ({ City }) => (
    <Box direction="row" align="center" pad="small" flex={false}>
      <CheckBox
        tabIndex="-1"
        checked={values.locations.some((partner) => partner.City === City)}
        label={<Text size="small">{City}</Text>}
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
          {values.locations.map(({ City }) => City).join(", ")}
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
  const handleChange = (option) => {
    const newSelectedLocation = [...values.locations];
    const seasonIndex = newSelectedLocation
      .map(({ City }) => City)
      .indexOf(option.City);
    if (seasonIndex >= 0) {
      newSelectedLocation.splice(seasonIndex, 1);
    } else {
      newSelectedLocation.push(option);
    }
    const selectedLocation = newSelectedLocation.map(({ City }) => City);
    const sortedLocation = [...test].sort(sortLocations(selectedLocation));
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
          valueKey="City"
          labelKey="City"
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
