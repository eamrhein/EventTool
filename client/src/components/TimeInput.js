import React from "react";
import { MaskedInput } from "grommet";
import { FormFieldLabel } from "./FormFieldLabel";

export const TimeInput = (props) => {
  let { label, required, error, ...rest } = props;
  return (
    <FormFieldLabel error={error} label={label} required={required}>
      <MaskedInput
        mask={[
          {
            length: [1, 2],
            regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
            placeholder: "Hour",
          },
          { fixed: ":" },
          {
            length: 2,
            options: ["00", "15", "30", "45"],
            regexp: /^[0-5][0-9]$|^[0-9]$/,
            placeholder: "Min",
          },
          { fixed: " " },
          {
            length: 2,
            options: ["AM", "PM"],
            regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
            placeholder: "AM/PM",
          },
        ]}
        {...rest}
      />
    </FormFieldLabel>
  );
};
