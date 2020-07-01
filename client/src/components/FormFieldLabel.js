import React from "react";
import { FormField, Box, Text } from "grommet";


// Modification of Grommet Formfield label to clearly show when data 
// Is required
export const FormFieldLabel = props => {
  const { required, label, ...rest } = props;
  return (
    <FormField
      label={
        required ? (
          <Box direction="row">
            <Text>{label}</Text>
            <Text color="status-critical">*</Text>
          </Box>
        ) : (
          label
        )
      }
      required={required}
      {...rest}
    ></FormField>
  );
};
