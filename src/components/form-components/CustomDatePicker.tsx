import React from "react";
import { SxProps } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type CustomDatePickerProps = {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
};

const CustomDatePicker = ({
                            name,
                            size,
                            label,
                            required,
                            fullWidth = true,
                            sx
                          }: CustomDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label={label}
            timezone="system"
            disablePast={true}
            {...field}
            value={value || Date.now()}
            onChange={(date) => onChange(date)}
            slotProps={{
              textField: {
                required: required,
                size: size,
                sx: {
                  ...sx
                },
                variant: "outlined",
                fullWidth: fullWidth
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default CustomDatePicker;