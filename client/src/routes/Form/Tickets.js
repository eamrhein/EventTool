import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  TextInput,
  Button,
  DataTable,
  MaskedInput,
  Collapsible,
} from "grommet";
import { Ticket, FormTrash, Currency } from "grommet-icons";
import { FormFieldLabel } from "../../components/FormFieldLabel";

const Tickets = ({ screenSize, values, setFieldValue }) => {
  const [selected, setSelected] = useState("paid");
  const [open, setOpen] = useState(false);
  const [ticket, setTicket] = useState({
    name: "General Admission",
    quantity: 100,
    price: "$0.00",
    num: 0,
  });

  const handleClick = (e) => {
    setTicket({ ...ticket, num: ticket.num + 1 });
    setFieldValue("tickets", [...values.tickets, ticket]);
  };
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
          <Ticket
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
          Tickets
        </Heading>
      </Button>
      <Collapsible open={open}>
        <Box
          gap="medium"
          justify="center"
          direction={screenSize === "small" ? "column" : "row"}
        >
          <Box pad="small" width={screenSize === "small" ? "100%" : "50%"}>
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
                        background: "rgba(240, 85, 55, 0.2)",
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
                onClick={() => {
                  setTicket({ ...ticket, price: "$0.00" });
                  setSelected("free");
                }}
                background={{ light: "light-2", dark: "dark-1" }}
                style={
                  selected === "free"
                    ? {
                        userSelect: "none",
                        background: "rgba(240, 85, 55, 0.2)",
                      }
                    : { userSelect: "none" }
                }
                pad="medium"
              >
                <Text>Free</Text>
              </Box>
            </Box>
            <FormFieldLabel label="Name" required>
              <TextInput
                value={ticket.name === "General Admission" ? "" : ticket.name}
                placeholder={ticket.name}
                onChange={(e) =>
                  setTicket({
                    ...ticket,
                    name: e.target.value,
                  })
                }
              />
            </FormFieldLabel>
            <FormFieldLabel label="Quantity" required>
              <MaskedInput
                value={ticket.quantity}
                mask={[
                  {
                    length: [1, 6],
                    regexp: /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/,
                  },
                ]}
                onChange={(e) =>
                  setTicket({
                    ...ticket,
                    quantity: e.target.value,
                  })
                }
              />
            </FormFieldLabel>
            <FormFieldLabel
              label="Price"
              required={selected === "paid"}
              disabled={selected === "free"}
              style={{ position: "relative" }}
            >
              <MaskedInput
                icon={<Currency />}
                onBlur={() => {
                  if (ticket.price.split(".").length < 2) {
                    setTicket({ ...ticket, price: ticket.price + ".00" });
                  }
                }}
                mask={[
                  { fixed: "$" },
                  {
                    length: [1, 5],
                    regexp: /^\d{1,5}$/,
                  },
                  { fixed: "." },
                  {
                    length: [2],
                    regexp: /^[0-9]/,
                    placeholder: "00",
                  },
                ]}
                placeholder={ticket.price === "$0.00" ? "Free" : null}
                value={ticket.price === "$0.00" ? "" : ticket.price}
                disabled={selected === "free"}
                onChange={(e) =>
                  setTicket({ ...ticket, price: e.target.value })
                }
              />
            </FormFieldLabel>
            <Box alignSelf="center" width="30%">
              <Button
                primary
                onClick={handleClick}
                size="medium"
                label="Create Ticket"
              />
            </Box>
          </Box>
          <Box pad="small" width={screenSize === "small" ? "100%" : "50%"}>
            {values.tickets.length > 0 ? (
              <Box width="100%" align="center">
                <DataTable
                  primaryKey="num"
                  columns={[
                    {
                      property: "name",
                      header: <Text>Name</Text>,
                    },
                    { property: "quantity", header: <Text>Qty</Text> },
                    {
                      property: "price",
                      header: <Text>Price</Text>,
                      render: (datum) => {
                        if (datum.price === "$0.00") {
                          return "Free";
                        } else {
                          return datum.price;
                        }
                      },
                    },
                    {
                      property: "num",
                      render: (datum) => {
                        return (
                          <Box round="full" overflow="hidden">
                            <Button
                              size="small"
                              hoverIndicator="accent-1"
                              onClick={() => {
                                setFieldValue(
                                  "tickets",
                                  values.tickets.filter(
                                    (ticket) => ticket.num !== datum.num
                                  )
                                );
                              }}
                              icon={<FormTrash />}
                            />
                          </Box>
                        );
                      },
                    },
                  ]}
                  data={values.tickets}
                />
              </Box>
            ) : (
              <Box height="100%" align="center" justify="center">
                <Text>Add Ticket</Text>
              </Box>
            )}
          </Box>
        </Box>
      </Collapsible>
    </Box>
  );
};

export default Tickets;
