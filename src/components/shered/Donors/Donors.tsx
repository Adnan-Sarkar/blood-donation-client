"use client";

import React from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import { TUser } from "@/types";
import DonorCard from "@/app/(publicLayout)/donors/components/DonorCard";
import Link from "next/link";

const Donors = () => {
  const {data} = useGetAllDonorsQuery({
    availability: true,
    limit: 12
  });

  const theme = useTheme();
  return (
    <section style={{padding: "50px 0", background: "#f5f6fa"}}>
      <Container>
        <Stack direction={"column"} mb={{ xs: 4, md: 8 }}>
          <Typography variant={"h3"} fontWeight={600} color={theme.palette.primary.main}>Blood Donors</Typography>
        </Stack>
        <Box>
          <Grid container spacing={2}>
            {
              data && data.
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