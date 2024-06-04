"use client";

import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import Divider from "@mui/material/Divider";

const Footer = () => {
  const theme = useTheme();

  return (
    <footer style={{background: theme.palette.primary.main, padding: "20px 0"}}>
      <Container>
        <Stack direction={{sx: "column", md: "row"}} justifyContent={{xs: "center", md: "space-between"}} alignItems={"center"} sx={{py: 5}} spacing={3}>
          <Link href={"/"}>
            <Image src={assets.images.logoWhite} alt={"logo"} width={200} height={200} priority/>
          </Link>
          <Stack direction={"row"} justifyContent={{ xs: "center", md: "end" }}
                 alignItems={"center"} spacing={3} mt={{xs: 2, md: 0}}>
            <a href={"https://www.facebook.com/"} target={"_blank"}>
              <Image src={assets.images.facebook} alt={"facebook"} width={30} height={30} priority />
            </a>
            <a href={"https://www.instagram.com/"} target={"_blank"}>
              <Image src={assets.images.instagram} alt={"instagram"} width={30} height={30} priority />
            </a>
            <a href={"https://www.x.com/"} target={"_blank"}>
              <Image src={assets.images.x} alt={"x"} width={30} height={30} priority />
            </a>
            <a href={"https://www.threads.com/"} target={"_blank"}>
              <Image src={assets.images.threads} alt={"threads"} width={30} height={30} priority />
            </a>
          </Stack>
        </Stack>

        <Divider sx={{ background: "#636e72" }}  />

        <Stack direction={{sx: "column", md: "row"}} justifyContent={{xs: "center", md: "space-between"}} alignItems={"center"} sx={{py: 5}} spacing={3} gap={3}>
          <Typography color={"#fff"}>Contact Us</Typography>
          <Typography color={"#fff"}>Services</Typography>
          <Typography color={"#fff"}>About Us</Typography>
          <Typography color={"#fff"}>Help</Typography>
          <Typography color={"#fff"}>FAQ</Typography>
          <Typography color={"#fff"}>Terms of Use</Typography>
          <Typography color={"#fff"}>Privacy Policy</Typography>
        </Stack>

        <Divider sx={{ background: "#636e72" }}  />

        <Stack  sx={{pt: 3}}>
          <Typography color={"#fff"} textAlign={"center"} fontSize={12}>Copyright &copy; {new Date().getFullYear()} Blood Bank. All rights reserved.</Typography>
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;