"use client";

import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomForm from "@/components/form-components/CustomForm";
import { FieldValues } from "react-hook-form";
import CustomInputField from "@/components/form-components/CustomInputField";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setSearchDonors } from "@/redux/features/search/searchSlice";

const HeroSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const searchDonorsHandler = (values: FieldValues) => {
    dispatch(setSearchDonors(values.search));
    router.push("/donors");
  }

  const defaultValues = {
    searchTerm: ""
  }

  return (
    <section style={{padding: "50px 0", background: "#f5f6fa"}}>
      <Container>
        <Stack direction={"column"} justifyContent={"center"} alignItems={"start"} sx={{py: 5}}>

          <Typography variant={"h1"} fontWeight={500} color={theme.palette.primary.main} fontSize={{xs: "30px", sm: "35px", md: "50px"}} sx={{textTransform: "capitalize"}}>Donate <span style={{fontWeight: "800", color: theme.palette.secondary.main}}>blood</span> today</Typography>
          <Typography mt={0.5} mb={2} fontWeight={500} color={theme.palette.primary.main} variant={"h1"} fontSize={{xs: "30px", sm: "35px", md: "50px"}} sx={{textTransform: "capitalize"}}>to become someone&lsquo;s <span style={{fontWeight: "800", color: theme.palette.secondary.main}}>lifeline</span></Typography>

          <Typography component={"p"} color={theme.palette.primary.main}>Every donation can save up to three lives. Join our community of lifesavers and make a difference today. Your contribution is vital in providing essential blood to those in need. Donate now and be the hero someone is waiting for.</Typography>

          <Box mt={4} width={{xs: "100%", md: "50%"}}>
            <CustomForm onSubmit={searchDonorsHandler} defaultValues={defaultValues}>
              <Stack direction={"row"} alignItems={"center"} spacing={0.5} gap={0.5}>
                <CustomInputField name={"search"} label={"Search Donors"} fullWidth={true} size={"small"} />
                <Button size={"large"} type={"submit"}>Search</Button>
              </Stack>
            </CustomForm>
          </Box>
        </Stack>
      </Container>
    </section>
  );
};

export default HeroSection;