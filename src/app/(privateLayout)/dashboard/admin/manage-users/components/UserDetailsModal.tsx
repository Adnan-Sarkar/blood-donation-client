"use client";

import React from "react";
import { TUser } from "@/types";
import { useTheme } from "@mui/material/styles";
import { Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Divider from "@mui/material/Divider";
import ProfileInfoBox from "@/components/ui/ProfileInfoBox";
import { generateBloodTypeInShort } from "@/utils/generateBloodTypeInShort";
import CustomFullScreenModal from "@/components/modal/CustomFullScreenModal";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: TUser
};

const UserDetailsModal = ({open, setOpen, userInfo}: TProps) => {
  const theme = useTheme();
  return (
    <CustomFullScreenModal title={"User Details Information"} open={open} setOpen={setOpen}>
      <Container>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} my={4}>
          <Typography variant={"h5"} fontWeight={500}>Donor Details</Typography>
        </Stack>
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item xs={12} md={3} justifyContent={"center"} alignItems={"center"}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} my={3}>
              <Image
                src={userInfo?.profilePicture || assets.images.avatar}
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
                <ProfileInfoBox  info={userInfo?.name} label={"Name"} />
              </Grid>
              <Grid item xs={12} md={6} my={1}>
                <ProfileInfoBox  info={generateBloodTypeInShort(userInfo?.bloodType)} label={"Blood Group"} />
              </Grid>
              <Grid item xs={12} md={6} my={1}>
                <ProfileInfoBox  info={userInfo?.availability ? "Available" : "Not Available"} label={"Availability"} fontWeight={600} color={theme.palette.secondary.main} />
              </Grid>
              <Grid item xs={12} md={6} my={1}>
                <ProfileInfoBox  info={userInfo?.userProfile?.age === 0 ? "Not Given" : String(userInfo?.userProfile?.age)} label={"Age"} />
              </Grid>
              <Grid item xs={12} md={6} my={1}>
                <ProfileInfoBox  info={(userInfo?.gender as string)?.charAt(0).toUpperCase() + (userInfo?.gender as string)?.slice(1).toLowerCase()} label={"Gender"} />
              </Grid>
              <Grid item xs={12} md={6} my={1}>
                <ProfileInfoBox  info={(userInfo?.userProfile?.lastDonationDate as string)?.length === 0 ? "Not Given" : userInfo?.userProfile?.lastDonationDate} label={"last Donation Date"} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={12} my={1}>
            <ProfileInfoBox  info={(userInfo?.userProfile?.bio as string)?.length === 0 ? "Not Given" : userInfo?.userProfile?.bio} label={"Bio"} />
          </Grid>
          <Grid item xs={12} my={2}>
            <Divider textAlign="center">Contact Information</Divider>
          </Grid>
          <Grid item xs={12} md={6} my={1}>
            <ProfileInfoBox  info={userInfo?.email} label={"Email"} />
          </Grid>
          <Grid item xs={12} md={6} my={1}>
            <ProfileInfoBox  info={(userInfo?.contactNumber as string)?.length === 0 ? "Not Given" : userInfo?.contactNumber} label={"Contact Number"} />
          </Grid>
          <Grid item xs={12} my={1}>
            <ProfileInfoBox  info={userInfo?.location} label={"Location"} />
          </Grid>
        </Grid>
      </Container>
    </CustomFullScreenModal>
  );
};

export default UserDetailsModal;