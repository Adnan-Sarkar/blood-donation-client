import { SxProps } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

type CustomInputFieldProps = {
  name: string;
  label: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  variant?: "outlined" | "filled" | "standard";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps;
};

const CustomInputField = ({name, label, type, size = "small", fullWidth = true, variant = "outlined", placeholder, required, sx, disabled=false}: CustomInputFieldProps) => {
  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({field, fieldState: {error}}) => {
                  return (
                    <TextField
                      variant={variant}
                      label={label}
                      type={type}
                      size={size}
                      fullWidth={fullWidth}
                      placeholder={placeholder}
                      required={required}
                      {...field}
                      sx={{...sx}}
                      error={!!error?.message}
                      helperText={error?.message}
                      disabled={disabled}
                    />
                  );
                }}
    />
  );
};

export default CustomInputField;