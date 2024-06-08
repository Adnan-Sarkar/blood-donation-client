"use client";

import React from "react";
import {
  useCheckDonationRequestQuery,
  useGetDonationRequestStatusQuery,
  useGetDonorDetailsQuery
} from "@/redux/api/donorApi";
import { Alert, Button, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import assets from "@/assets";
import { generateBloodTypeInShort } from "@/utils/generateBloodTypeInShort";
import ProfileInfoBox from "@/components/ui/ProfileInfoBox";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.services";

type TPops = {
  params: {
    donorId: string
  }
}

const DonorDetailsPage = ({params}: TPops) => {
  const userInfo = getUserInfo();
  const {data: isDonationRequestSend} = useCheckDonationRequestQuery({
    donorId: params.donorId,
    requesterId: userInfo?.id
  });
  const {data: donationRequestStatus} = useGetDonationRequestStatusQuery({
    donorId: params.donorId,
    requesterId: userInfo?.id
  });

  const {data, isLoading} = useGetDonorDetailsQuery(params.donorId);
  const theme = useTheme();

  let bottomAction;
  if (isDonationRequestSend !== undefined) {
    if (isDonationRequestSend) {
      bottomAction = <Alert severity="success">You already sent request to the donor. Please wait for response.</Alert>
    }
    else {
      bottomAction = <Link href={`/donor-details/${params.donorId}/donation-request`}>
        <Button size={"large"}>Request Blood Donation</Button>
      </Link>
    }
  }
  else {
    bottomAction = <Link href={`/donor-details/${params.donorId}/donation-request`}>
      <Button size={"large"}>Request Blood Donation</Button>
    </Link>
  }

  if (isLoading) {
    return <Container>
      <CircularProgress />
    </Container>
  }

  return (
    <Container>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} my={4}>
        <Typography variant={"h5"} fontWeight={500}>Donor Details</Typography>
      </Stack>
      <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid item xs={12} md={3} justifyContent={"center"} alignItems={"center"}>
          <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} my={3}>
            <Image
              src={data?.profilePicture || assets.images.avatar}
              alt={"Profile Picture"}
              width={300}
              height={300}
              priority
              style={{
                border: `1px solid ${theme.palette.primary.main}`,
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item xs={12}>
              <Divider textAlign="left">Personal Information</Divider>
            </Grid>
            <Grid item xs={12} md={6} my={1}>
              <ProfileInfoBox  info={data?.name} label={"Name"} />
            </Grid>
            <Grid item xs={12} md={6} my={1}>
              <ProfileInfoBox  info={generateBloodTypeInShort(data?.bloodType)} label={"Blood Group"} />
            </Grid>
            <Grid item xs={12} md={6} my={1}>
              <ProfileInfoBox  info={data?.availability ? "Available" : "Not Available"} label={"Availability"} fontWeight={600} color={theme.palette.secondary.main} />
            </Grid>
            <Grid item xs={12} md={6} my={1}>
              <ProfileInfoBox  info={data?.userProfile?.age === 0 ? "Not Given" : data?.userProfile?.age} label={"Age"} />
            </Grid>
            <Grid item xs={12} md={6} my={1}>
              <ProfileInfoBox  info={(data?.gender as string)?.charAt(0).toUpperCase() + (data?.gender as string)?.slice(1).toLowerCase()} label={"Gender"} />
            </Grid>
            <Grid item xs={12} md={6} my={1}>
              <ProfileInfoBox  info={(data?.userProfile?.lastDonationDate as string)?.length === 0 ? "Not Given" : data?.userProfile?.lastDonationDate} label={"last Donation Date"} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={0.5}>
        <Grid item xs={12} my={1}>
          <ProfileInfoBox  info={(data?.userProfile?.bio as string)?.length === 0 ? "Not Given" : data?.userProfile?.bio} label={"Bio"} />
        </Grid>
        <Grid item xs={12} my={2}>
          <Divider textAlign="center">Contact Information</Divider>
        </Grid>
        {
          donationRequestStatus === "APPROVED" &&
          <>
            <Grid item xs={12} md={6} my={1}>
              <ProfileInfoBox  info={data?.email} label={"Email"} />
            </Grid>
            <Grid item xs={12} md={6} my={1}>
              <ProfileInfoBox  info={(data?.contactNumber as string)?.length === 0 ? "Not Given" : data?.contactNumber} label={"Contact Number"} />
            </Grid>
          </>
        }
        <Grid item xs={12} my={1}>
          <ProfileInfoBox  info={data?.location} label={"Location"} />
        </Grid>

        <Grid item xs={12} mt={2} mb={4}>
          <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
            {
              bottomAction
            }
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DonorDetailsPage;