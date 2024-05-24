"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import dynamic from "next/dynamic";


const Navbar = () => {
  const NavbarActions = dynamic(() => import("./NavbarActions"), { ssr: false });

  return (
    <Container>
      <Stack direction={{xs: "column", md: "row"}} alignItems={"center"} justifyContent={{xs: "center", md: "space-between"}} my={2}>
        <Box>
          <Link href={"/"}>
            <Image src={assets.images.logo} alt={"Blood Bank"} width={304} height={72} priority={true} />
          </Link>
        </Box>
          <Stack direction={{xs: "column", md: "row"}} spacing={{xs: 2, md: 3}} alignItems={"center"}>
            <Link href={"/"}>
              <Typography fontWeight={500}>
                Home
              </Typography>
            </Link>
            <Link href={"/donors"}>
              <Typography fontWeight={500}>
                Donors
              </Typography>
            </Link>
            <Link href={"/about-us"}>
              <Typography fontWeight={500}>
                About Us
              </Typography>
            </Link>
          </Stack>
        <Stack direction={{xs: "column", md: "row"}} alignItems={"center"} justifyContent={{xs: "center", md: "space-between"}} spacing={3}>
          <NavbarActions />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;