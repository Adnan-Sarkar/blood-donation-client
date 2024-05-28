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
  disablePast?: boolean;
};

const CustomDatePicker = ({
                            name,
                            size,
                            label,
                            required,
                            fullWidth = true,
                            sx,
                            disablePast = true
                          }: CustomDatePickerProps) => {
  const { control, getValues } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={getValues(name) || dayjs(new Date(), 'YYYY-MM-DD')}
      render={({ field: { onChange, value, ...field } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label={label}
            timezone="system"
            disablePast={disablePast}
            {...field}
            value={value ? dayjs(value, 'YYYY-MM-DD') : null}
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