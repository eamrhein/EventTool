import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  TextInput,
  Button,
  DataTable,
  MaskedInput,
} from "grommet";
import { Ticket, Trash, Currency } from "grommet-icons";
import { FormFieldLabel } from "../../../Custom/FormFieldLabel";

const Tickets = ({ form, setForm, screenSize }) => {
  const [selected, setSelected] = useState("paid");
  const [hover, setHover] = useState(false);
  const [ticket, setTicket] = useState({
    name: "General Admission",
    quantity: 100,
    price: "$0.00",
    num: 0,
  });

  const handleClick = (e) => {
    setTicket({ ...ticket, num: ticket.num + 1 });
    setForm({ ...form, tickets: [...form.tickets, ticket] });
  };
  return (
    <Box justify="center" pad="small" width="100vw">
      <Heading level="2" margin="medium">
        <Ticket /> Tickets
      </Heading>
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
                      background: "rgba(0, 96, 168, 0.2)",
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
                      background: "rgba(0, 96, 168, 0.2)",
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
              onChange={(e) => setTicket({ ...ticket, price: e.target.value })}
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
          {form.tickets.length > 0 ? (
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
                    render: (datum) => (
                      <Button
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={() => {
                          setForm({
                            ...form,
                            tickets: form.tickets.filter(
                              (ticket) => ticket.num !== datum.num
                            ),
                          });
                        }}
                        icon={<Trash color={hover ? "brand" : null} />}
                      />
                    ),
                  },
                ]}
                data={form.tickets}
              />
            </Box>
          ) : (
            <Box height="100%" align="center" justify="center">
              <Text>Add Ticket</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Tickets;
