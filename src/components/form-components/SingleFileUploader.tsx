import React, { ReactElement } from "react";
import { SxProps } from "@mui/system";
import { Button, Input, SvgIconProps } from "@mui/material";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";

interface IFileUploadButton {
  label?: string;
  accept?: string;
  sx?: SxProps;
  icon?: ReactElement<SvgIconProps>;
  variant?: "contained" | "text";
  onFileUpload: (file: File) => void;
}

const SingleFileUploader = ({
                              label,
                              accept,
                              sx,
                              icon,
                              variant = "contained",
                              onFileUpload,
                            }: IFileUploadButton) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant={variant}
      tabIndex={-1}
      startIcon={icon ? icon : <FileUploadRoundedIcon/>}
      sx={{...sx}}
    >
      {label || "Upload file"}
      <Input
        type="file"
        inputProps={{accept: accept}}
        style={{display: "none"}}
        onChange={(e) => {
          const fileInput = e.target as HTMLInputElement;
          const file = fileInput.files?.[0];
          if (file) {
            onFileUpload(file);
          }
        }}
      />
    </Button>
  );
};

export default SingleFileUploader;