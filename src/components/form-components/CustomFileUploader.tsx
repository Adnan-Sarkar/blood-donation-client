import React from "react";
import { SxProps } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import { Button, Input } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
  fullWidth?: boolean;
};

const CustomFileUploader = ({ name, label, sx, fullWidth = false }: TProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => (
        <Button
          fullWidth={fullWidth}
          sx={{ ...sx }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          {label || "Upload file"}
          <Input
            {...field}
            type={name}
            value={value?.fileName}
            onChange={(e) =>
              onChange((e?.target as HTMLInputElement)?.files?.[0])
            }
            style={{ display: "none" }}
          />
        </Button>
      )}
    />
  );
};

export default CustomFileUploader;