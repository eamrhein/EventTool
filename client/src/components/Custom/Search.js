import React, { useRef, useState, useEffect, createContext } from "react";
import { FormClose } from "grommet-icons";
import { Box, Button, CheckBox, Select, Text } from "grommet";
import { FormFieldLabel } from "./FormFieldLabel";
const SearchInputContext = createContext({});
//#TODO
// CREATE GRAPHQL QUERY to GRAB ALL account venus.

const allContentPartners = [
  {
    name: "Location 1",
    id: "32131232",
  },
  {
    name: "Location 2",
    id: "32131232",
  },
  {
    name: "Location 3",
    id: "32131242",
  },
  {
    name: "Location 4",
    id: "32131252",
  },
  {
    name: "Location 5",
    id: "32131262",
  },
  {
    name: "Location 6",
    id: "32131272",
  },
  {
    name: "Location 6",
    id: "32131272",
  },
  {
    name: "Location 6",
    id: "32131272",
  },
  {
    name: "Location 6",
    id: "32131272",
  },
  {
    name: "Location 6",
    id: "32131272",
  },
  {
    name: "Location 6",
    id: "32131272",
  },
];

const Search = () => {
  const [selectedContentPartners, setSelectedContentPartners] = useState([]);
  const [contentPartners, setContentPartners] = useState(allContentPartners);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectRef = useRef();

  const clearContentPartners = () => {
    setSelectedContentPartners([]);
  };

  useEffect(() => {
    const filterContentPartners = allContentPartners.filter(
      (s) => s.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
    );

    setTimeout(() => {
      setSearching(false);
      setContentPartners(filterContentPartners);
    }, 500);
  }, [searching, searchQuery]);

  const renderOption = ({ name }) => (
    <Box direction="row" align="center" pad="small" flex={false}>
      <CheckBox
        tabIndex="-1"
        checked={selectedContentPartners.some(
          (partner) => partner.name === name
        )}
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
        <Text size="small">{selectedContentPartners.length}</Text>
      </Box>
      <Box flex>
        <Text size="small" truncate>
          {selectedContentPartners.map(({ name }) => name).join(", ")}
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
    const newSelectedPartners = [...selectedContentPartners];
    const seasonIndex = newSelectedPartners
      .map(({ name }) => name)
      .indexOf(option.name);
    if (seasonIndex >= 0) {
      newSelectedPartners.splice(seasonIndex, 1);
    } else {
      newSelectedPartners.push(option);
    }
    const selectedPartnerNames = newSelectedPartners.map(({ name }) => name);
    const sortedContentPartners = [...allContentPartners].sort(
      sortContentPartners(selectedPartnerNames)
    );
    setSelectedContentPartners(newSelectedPartners);
    setContentPartners(sortedContentPartners);
  };

  return (
    <SearchInputContext.Provider>
      <FormFieldLabel>
        <Select
          ref={selectRef}
          closeOnChange={false}
          placeholder="Select Content Partners"
          searchPlaceholder="Search Content Partners"
          emptySearchMessage="No partners found"
          multiple
          value={
            selectedContentPartners.length ? renderContentPartners() : undefined
          }
          selected={selectedContentPartners.map((option) =>
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

export default Search;
