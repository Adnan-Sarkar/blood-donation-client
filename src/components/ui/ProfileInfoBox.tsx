import React from "react";
import { Box, Typography } from "@mui/material";

type TProps = {
  info: string;
  label: string;
  fontWeight?: number;
  color?: string;
};


const ProfileInfoBox = ({info, label, fontWeight, color}: TProps) => {
  return (
    <Box sx={{
      background: "#FAF9F6",
      borderRadius: 3,
      boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      p: 2
    }}>
      <Typography component={"span"} fontWeight={400}>{label}</Typography>
      <Typography variant={"h6"} fontWeight={fontWeight ? fontWeight : 500} color={color}>{info}</Typography>
    </Box>
  );
};

export default ProfileInfoBox;