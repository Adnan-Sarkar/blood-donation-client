"use client";

import React from "react";
import { Button, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import CustomForm from "@/components/form-components/CustomForm";
import { FieldValues } from "react-hook-form";
import CustomInputField from "@/components/form-components/CustomInputField";
import CustomDatePicker from "@/components/form-components/CustomDatePicker";
import Link from "next/link";
import CustomTimePicker from "@/components/form-components/CustomTimePicker";
import { useLoggedInUserQuery } from "@/redux/api/userApi";

type TPops = {
  params: {
    donorId: string
  }
}

const DonationRequestPage = ({params}: TPops) => {
  const {data, isLoading} = useLoggedInUserQuery({});

  const handleRequestDonation = (values: FieldValues) => {

  }

  if (isLoading) {
    return <CircularProgress />
  }

  const defaultValues = {
    hospitalName: "",
    phoneNumber: data?.contactNumber || "",
    hospitalAddress: "",
    bloodGroup: "",
    reason: ""
  }

  return (
    <Container>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} my={4}>
        <Typography variant={"h5"} fontWeight={500} my={4}>Blood Donation Request Form</Typography>
      </Stack>
      <CustomForm onSubmit={handleRequestDonation} defaultValues={defaultValues}>
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item xs={12} md={6}>
            <CustomInputField name={"hospitalName"} label={"Hospital Name"} fullWidth={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomDatePicker name={"dateOfDonation"} label={"Date of Donation"} size={"small"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomInputField name={"phoneNumber"} label={"Contact Number"} fullWidth={true} disabled={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTimePicker name={"timeOfDonation"} label={"Time of Donation"} size={"small"} />
          </Grid>
          <Grid item xs={12}>
            <CustomInputField name={"hospitalAddress"} label={"Hospital Address"} fullWidth={true} />
          </Grid>
          <Grid item xs={12}>
            <CustomInputField name={"reason"} label={"Donation Reason"} fullWidth={true} />
          </Grid>

          <Grid item xs={12} mt={2} mb={4}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
              <Link href={`/donor-details/${params.donorId}/donation-request`}>
                <Button size={"large"}>Send Request</Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </CustomForm>
    </Container>
  );
};

export default DonationRequestPage;