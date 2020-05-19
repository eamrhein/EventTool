import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Box, TextArea, Heading, Text, Button, Collapsible } from "grommet";
import { Book } from "grommet-icons";
import { FormFieldLabel } from "../components/FormFieldLabel";
import "react-quill/dist/quill.snow.css";

const Description = ({ values, setFieldValue, handleChange, errors }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box pad="medium" width="100vw">
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
          <Book
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
          Event Description
        </Heading>
      </Button>
      <Collapsible open={open}>
        <Box margin="small">
          <FormFieldLabel
            errors={errors.summary}
            info={
              <Box align="end">
                <Text size="small">{values.summary.length} / 140</Text>
              </Box>
            }
            label="Summary"
          >
            <TextArea
              name="summary"
              value={values.summary}
              onChange={handleChange}
              placeholder="Write a short event summary to get attendees excited"
              resize={false}
            />
          </FormFieldLabel>
        </Box>
        <Box margin="small">
          <FormFieldLabel label="Description" errors={errors.description}>
            <ReactQuill
              valid={!errors.description}
              theme="snow"
              placeholder="format your description however you like"
              value={values.description}
              onChange={(value) => setFieldValue("description", value)}
            />
          </FormFieldLabel>
        </Box>
      </Collapsible>
    </Box>
  );
};

export default Description;
