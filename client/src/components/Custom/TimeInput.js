import React from "react";
import { MaskedInput } from "grommet";
import { FormFieldLabel } from "./FormFieldLabel";

export const TimeInput = (props) => {
  let { label, required, ...rest } = props;
  return (
    <FormFieldLabel label={label} required={required}>
      <MaskedInput
        mask={[
          {
            length: [1, 2],
            options: Array.from({ length: 12 }, (v, k) => k + 1),
            regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
            placeholder: "hh",
          },
          { fixed: ":" },
          {
            length: 2,
            options: ["00", "15", "30", "45"],
            regexp: /^[0-5][0-9]$|^[0-9]$/,
            placeholder: "mm",
          },
          { fixed: " " },
          {
            length: 2,
            options: ["AM", "PM"],
            regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
            placeholder: "ap",
          },
        ]}
        {...rest}
      />
    </FormFieldLabel>
  );
};
