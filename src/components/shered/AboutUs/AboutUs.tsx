"use client";

import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AboutUs = () => {
  const theme = useTheme();

  return (
    <section style={{margin: "50px 0"}}>
      <Container>
        <Stack direction={"column"} mb={3}>
          <Typography variant={"h3"} fontWeight={600} color={theme.palette.primary.main}>About Us</Typography>
        </Stack>
        <Stack direction={"column"}>
          <Typography component={"p"}>
            Welcome to Blood Donation, your trusted platform dedicated to saving lives through blood donations. Our mission is to connect generous donors with those in need, making the process of giving and receiving blood as seamless and impactful as possible.
          </Typography>

          <Typography variant={"h5"} fontWeight={600} color={theme.palette.primary.main} my={2}>
            Our Purpose
          </Typography>
          <Typography component={"p"}>
            We believe that everyone has the power to save lives. By facilitating easy and efficient blood donations, we aim to ensure that no one has to suffer due to a lack of available blood. Our platform is designed to make the donation process simple, accessible, and rewarding for everyone involved.
          </Typography>

          <Typography variant={"h5"} fontWeight={600} color={theme.palette.primary.main} my={2}>
            Our Mission
          </Typography>
          <Typography component={"p"}>
            Our mission is to create a community of heroes who are committed to making a difference. We strive to raise awareness about the importance of blood donation, increase the number of active donors, and support healthcare providers in their lifesaving work. Together, we can ensure a stable and sufficient blood supply for hospitals and clinics everywhere.
          </Typography>
        </Stack>
      </Container>
    </section>
  );
};

export default AboutUs;