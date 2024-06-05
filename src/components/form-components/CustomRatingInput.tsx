import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Rating } from "@mui/material";

type TProps = {
  name: string;
  size?: "small" | "medium" | "large";
};

const CustomRatingInput = ({name, size = "small"}: TProps) => {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={4}
      render={({field: { onChange, value, ...field }}) => {
        return (
          <Rating
            {...field}
            size={size}
            value={value}
            name="simple-controlled"
            precision={0.5}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
          />
        )
      }}
    />
  );
};

export default CustomRatingInput;