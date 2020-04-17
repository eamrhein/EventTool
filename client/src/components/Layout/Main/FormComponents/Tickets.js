import React, { useState } from "react";
import { Box, Heading, Text, TextInput, Button } from "grommet";
import { Ticket } from "grommet-icons";
import { FormFieldLabel } from "../../../Custom/FormFieldLabel";

const Tickets = ({ responsive, ...props }) => {
  const [selected, setSelected] = useState("paid");
  return (
    <Box pad="small" width="100vw">
      <Heading level="2">
        <Ticket /> Tickets
      </Heading>
      <Box
        margin={{
          left: "large",
          top: "small",
          right: "small",
          bottom: "small",
        }}
        gap="medium"
        direction="row"
      >
        <Box pad="small" width="50%" background="accent-2">
          Ticket List
        </Box>
        <Box width="50%">
          <Box gap="medium" justify="center" pad="small" direction="row">
            <Box
              focusIndicator={false}
              as="button"
              pad="medium"
              border={
                selected === "paid"
                  ? { size: "small", color: "brand" }
                  : { size: "small" }
              }
              background={{ light: "light-2", dark: "dark-1" }}
              style={
                selected === "paid"
                  ? {
                      userSelect: "none",
                      background: "rgba(125, 76, 219, 0.2)",
                    }
                  : { userSelect: "none" }
              }
              onClick={() => setSelected("paid")}
            >
              <Text>Paid</Text>
            </Box>
            <Box
              focusIndicator={false}
              as="button"
              border={
                selected === "free"
                  ? { size: "small", color: "brand" }
                  : { size: "small" }
              }
              background={{ light: "light-2", dark: "dark-1" }}
              style={
                selected === "free"
                  ? {
                      userSelect: "none",
                      background: "rgba(125, 76, 219, 0.2)",
                    }
                  : { userSelect: "none" }
              }
              pad="medium"
              onClick={() => setSelected("free")}
            >
              <Text>Free</Text>
            </Box>
          </Box>
          <FormFieldLabel label="Name" required>
            <TextInput />
          </FormFieldLabel>
          <FormFieldLabel label="Quantity" required>
            <TextInput />
          </FormFieldLabel>
          <FormFieldLabel
            label="Price"
            disabled={selected === "free"}
            required={selected === "paid"}
          >
            <TextInput disabled={selected === "free"} />
          </FormFieldLabel>
          <Box>
            <Button size="medium" label="Create Ticket" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Tickets;
