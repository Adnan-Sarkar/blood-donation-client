"use client";

import React from "react";
import { TDonationSentRequest } from "@/types/review-types";
import { Box, Rating, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";

type TProps = {
  reviewData: TDonationSentRequest
}


const ReviewCard = ({reviewData}: TProps) => {
  const theme = useTheme();

  return (
    <Box width={"100%"}>
      <Box
        sx={{
          border: "1px solid #34495e",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} gap={3}>
          <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} gap={3}>
            <Rating size={"large"} value={Number(reviewData?.rating)} readOnly={true} />
            <Typography
              variant={"h6"}
              fontWeight={600}
              color={theme.palette.primary.main}
              textAlign={"center"}
            >
              &quot;{reviewData?.comment}&quot;
            </Typography>
          </Stack>
          <Stack direction={{xs: "column", md: "row"}} gap={2} justifyContent={"center"} alignItems={"center"}>
            <Avatar src={reviewData?.user?.profilePicture} />
            <Typography fontWeight={600}>{reviewData?.user?.name}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ReviewCard;