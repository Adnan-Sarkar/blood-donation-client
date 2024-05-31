"use client";

import React from "react";
import { Button, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import CustomForm from "@/components/form-components/CustomForm";
import { FieldValues } from "react-hook-form";
import CustomInputField from "@/components/form-components/CustomInputField";
import CustomDatePicker from "@/components/form-components/CustomDatePicker";
import CustomTimePicker from "@/components/form-components/CustomTimePicker";
import { useLoggedInUserQuery } from "@/redux/api/userApi";
import dayjs from "dayjs";
import dateFormatter from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  donationRequestValidationSchema
} from "@/app/(privateLayout)/donor-details/[donorId]/donation-request/donationRequestValidationSchema";
import toast from "react-hot-toast";
import { useCreateDonationRequestMutation } from "@/redux/api/donorApi";
import { useRouter } from "next/navigation";

type TPops = {
  params: {
    donorId: string
  }
}

const DonationRequestPage = ({params}: TPops) => {
  const {data, isLoading} = useLoggedInUserQuery({});
  const [sendDonationRequest, {isLoading: isDonationRequesting}] = useCreateDonationRequestMutation();
  const router = useRouter();

  const handleRequestDonation = async (values: FieldValues) => {
    const { hospitalName, phoneNumber, hospitalAddress, dateOfDonation, timeOfDonation, reason } = values;

    const donationRequest = {
      donorId: params.donorId,
      requesterId: data?.id,
      hospitalName,
      phoneNumber,
      hospitalAddress,
      dateOfDonation: dateFormatter(dateOfDonation),
      timeOfDonation: timeFormatter(timeOfDonation),
      reason
    }

    const toastId = toast.loading("Requesting...", {
      id: "toastId"
    })

    try {
      const res = await sendDonationRequest(donationRequest).unwrap();
      if (res && res?.id) {
        toast.success("Blood Donation Request Sent Successfully", {id: toastId});
        router.push("/donors");
      }
    }
    catch (error: any) {
      toast.error(error.message, {id: toastId});
    }
  }

  if (isLoading) {
    return <CircularProgress />
  }

  const defaultValues = {
    hospitalName: "",
    phoneNumber: data?.contactNumber || "",
    hospitalAddress: "",
    dateOfDonation: dayjs().format('YYYY-MM-DD'),
    timeOfDonation: dayjs(new Date().toDateString()),
    reason: ""
  }

  return (
    <Container>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} my={4}>
        <Typography variant={"h5"} fontWeight={500} my={4}>Blood Donation Request Form</Typography>
      </Stack>
      <CustomForm onSubmit={handleRequestDonation} defaultValues={defaultValues} resolver={zodResolver(donationRequestValidationSchema)}>
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item xs={12} md={6}>
            <CustomInputField name={"hospitalName"} label={"Hospital Name"} fullWidth={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomDatePicker name={"dateOfDonation"} label={"Donation Date"} size={"small"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomInputField name={"phoneNumber"} label={"Contact Number"} fullWidth={true} disabled={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTimePicker name={"timeOfDonation"} label={"Donation Time"} size={"small"} />
          </Grid>
          <Grid item xs={12}>
            <CustomInputField name={"hospitalAddress"} label={"Hospital Address"} fullWidth={true} />
          </Grid>
          <Grid item xs={12}>
            <CustomInputField name={"reason"} label={"Donation Reason"} fullWidth={true} />
          </Grid>

          <Grid item xs={12} mt={2} mb={4}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
              <Button size={"large"} type={"submit"} disabled={isDonationRequesting}>Send Request</Button>
            </Stack>
          </Grid>
        </Grid>
      </CustomForm>
    </Container>
  );
};

export default DonationRequestPage;