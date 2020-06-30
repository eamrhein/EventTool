import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Box, Heading, Button, Collapsible } from "grommet";
import { Book } from "grommet-icons";
import { FormFieldLabel } from "../../components/FormFieldLabel";
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
          <FormFieldLabel  label="Description" errors={errors.description}>
            <ReactQuill
              style={{height: "40em"}}
              valid={!errors.description}
              theme="snow"
              placeholder="format your description however you like, including large text etc"
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
