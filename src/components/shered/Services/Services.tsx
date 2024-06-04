"use client";

import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import ServiceBox from "@/components/ui/ServiceBox";
import Image from "next/image";
import assets from "@/assets";
import { useTheme } from "@mui/material/styles";

const Services = () => {
  const theme = useTheme();

  return (
    <section style={{padding: "50px 0", background: "#f5f6fa"}}>
      <Container>
        <Stack direction={{xs: "column", md: "row"}} justifyContent={"center"} alignItems={"center"} gap={3} sx={{py: 5}}>
          <ServiceBox>
            <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}  gap={3}>
              <Image src={assets.images.requestToDonate} alt={"icon"} priority width={70} height={70}/>
              <Typography variant={"h6"} fontWeight={600} color={theme.palette.primary.main}>
                Request To Donate
              </Typography>
            </Stack>
          </ServiceBox>
          <ServiceBox>
            <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}  gap={3}>
              <Image src={assets.images.bloodBank} alt={"icon"} priority width={70} height={70}/>
              <Typography variant={"h6"} fontWeight={600} color={theme.palette.primary.main}>
                Find Donors
              </Typography>
            </Stack>
          </ServiceBox>
          <ServiceBox>
            <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}  gap={3}>
              <Image src={assets.images.donateBlood} alt={"icon"} priority width={70} height={70}/>
              <Typography variant={"h6"} fontWeight={600} color={theme.palette.primary.main}>
                Donate Blood
              </Typography>
            </Stack>
          </ServiceBox>
        </Stack>
      </Container>
    </section>
  );
};

export default Services;