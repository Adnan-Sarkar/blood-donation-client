import React from "react";
import { Box } from "@mui/material";
import { TComponentProps } from "@/types";

const ServiceBox = ({children}: TComponentProps) => {
  return (
    <Box
      sx={{
        background: "#FAF9F6",
        width: "300px",
        height: "200px",
        borderRadius: "5px",
        padding: "10px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        },
    }}
    >
      {
        children
      }
    </Box>
  );
};

export default ServiceBox;