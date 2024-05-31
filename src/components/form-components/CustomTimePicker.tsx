import React from "react";
import { SxProps } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type CustomTimePickerProps = {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
};

const CustomTimePicker = ({
                            name,
                            size,
                            label,
                            required,
                            fullWidth = true,
                            sx,
                          }: CustomTimePickerProps) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors?.[name];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label={label}
            timezone="system"
            ampm={true}
            {...field}
            value={value || Date.now()}
            onChange={(time) => onChange(time)}
            slotProps={{
              textField: {
                required: required,
                size: size,
                sx: {
                  ...sx,
                },
                variant: "outlined",
                fullWidth: fullWidth,
                error: !!isError,
                helperText: isError
                  ? (formState.errors[name]?.message as string)
                  : "",
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default CustomTimePicker;