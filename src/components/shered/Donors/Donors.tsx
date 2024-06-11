"use client";

import React from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TUser } from "@/types";
import DonorCard from "@/app/(publicLayout)/donors/components/DonorCard";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.services";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";

const Donors = () => {
  const theme = useTheme();
  const userInfo = getUserInfo();
  const excludeMe = userInfo?.id ? {excludeMe: userInfo?.id} : {};

  const {data} = useGetAllDonorsQuery({
    availability: true,
    limit: 12,
    ...excludeMe
  });

  return (
    <section style={{padding: "50px 0", background: "#f5f6fa"}}>
      <Container>
        <Stack direction={"column"} mb={{ xs: 4, md: 8 }}>
          <Typography variant={"h3"} fontWeight={600} color={theme.palette.primary.main}>Blood Donors</Typography>
        </Stack>
        <Box>
          <Grid container spacing={2}>
            {
              data?.data && data?.data?.
              filter((donor: TUser) => (donor.id !== userInfo?.id)).
              map((donor: TUser) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={donor.id}>
                    <DonorCard donorInfo={donor} />
                  </Grid>
                )
              })
            }
          </Grid>
        </Box>
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} mt={{xs: 4, md: 8}}>
          <Link href={"/donors"}>
            <Button size={"large"}>Get More Donors</Button>
          </Link>
        </Stack>
      </Container>
    </section>
  );
};

export default Donors;