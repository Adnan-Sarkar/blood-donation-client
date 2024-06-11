"use client";

import React from "react";
import { Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useGetMetaDataQuery } from "@/redux/api/metaApi";

const UserDashboardPage = () => {
  const {data, isLoading} = useGetMetaDataQuery({});

  if (isLoading) {
    return <Container>
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <CircularProgress size={"large"} />
      </Stack>
    </Container>
  }

  return (
    <Container>
      <Box>
        <Divider textAlign={"center"} sx={{mt: 3, mb: 4}}>
          Donation Information
        </Divider>
        <Stack direction={{xs: "column", md: "row"}} justifyContent={"center"} alignItems={"center"} spacing={4}>
          <Box p={3} sx={{background: "#FAF9F6", width: "290px", height: "150px", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"}} flex={"true"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
            <Typography fontWeight={700} mb={2}>
              Requests Sent
            </Typography>
            <Divider />
            <Typography fontSize={30} fontWeight={700} mt={2} >
              {
                data?.totalRequestsSent
              }
            </Typography>
          </Box>

          <Box p={3} sx={{background: "#FAF9F6", width: "290px", height: "150px", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"}} flex={"true"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
            <Typography fontWeight={700} mb={2}>
              Requests Received
            </Typography>
            <Divider />
            <Typography fontSize={30} fontWeight={700} mt={2} >
              {
                data?.totalGettingRequests
              }
            </Typography>
          </Box>

          <Box p={3} sx={{background: "#FAF9F6", width: "290px", height: "150px", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"}} flex={"true"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
            <Typography fontWeight={700} mb={2}>
              Donation Completed
            </Typography>
            <Divider />
            <Typography fontSize={30} fontWeight={700} mt={2} >
              {
                data?.totalDonationCompleted
              }
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default UserDashboardPage;