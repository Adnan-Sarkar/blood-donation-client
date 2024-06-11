"use client";

import React from "react";
import { Box, Button, CircularProgress, Container, Grid, Stack } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Divider from "@mui/material/Divider";
import ProfileInfoBox from "@/components/ui/ProfileInfoBox";
import { generateBloodTypeInShort } from "@/utils/generateBloodTypeInShort";
import { useLoggedInUserQuery } from "@/redux/api/userApi";
import { useTheme } from "@mui/material/styles";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import Link from "next/link";
import UpdateProfilePicture from "@/app/(privateLayout)/dashboard/user/profile/components/UpdateProfilePicture";
import UpdateProfileInfoModal from "@/app/(privateLayout)/dashboard/user/profile/components/UpdateProfileInfoModal";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const {data, isLoading} = useLoggedInUserQuery({});
  const theme = useTheme();

  const handleOpenModal = () => {
    setIsModalOpen(true)
  };

  if (isLoading) {
    return <Container>
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <CircularProgress size={"3rem"} />
      </Stack>
    </Container>
  }

  return (
    <Container>
      <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid item xs={12} md={4} justifyContent={"start"} alignItems={"center"}>
          <Stack direction={"column"} alignItems={"start"} justifyContent={"center"} spacing={4} my={3}>
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
            <Stack direction={"column"} alignItems={"start"} justifyContent={"center"} spacing={2}>
              <UpdateProfilePicture />
              <Button sx={{width: "300px"}} onClick={() => handleOpenModal()}><EditNoteRoundedIcon/> <Box mx={0.5}></Box> Update Profile Info</Button>
              {
                isModalOpen && <UpdateProfileInfoModal open={isModalOpen} setOpen={setIsModalOpen} userInfo={data} />
              }
              <Link href={`/dashboard/change-password`}>
                <Button sx={{width: "300px"}}><KeyRoundedIcon/> <Box mx={0.5}></Box> Change Password</Button>
              </Link>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item xs={12}>
              <Divider textAlign="left">Personal Information</Divider>
            </Grid>
            <Grid item xs={12} md={6}>
              <ProfileInfoBox  info={data?.name} label={"Name"} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProfileInfoBox  info={generateBloodTypeInShort(data?.bloodType)} label={"Blood Group"} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProfileInfoBox  info={data?.availability ? "Available" : "Not Available"} label={"Availability"} fontWeight={600} color={theme.palette.secondary.main} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProfileInfoBox  info={data?.userProfile?.age === 0 ? "Not Given" : data?.userProfile?.age} label={"Age"} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProfileInfoBox  info={(data?.gender as string)?.charAt(0)?.toUpperCase() + (data?.gender as string)?.slice(1)?.toLowerCase()} label={"Gender"} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProfileInfoBox  info={(data?.userProfile?.lastDonationDate as string)?.length === 0 ? "Not Given" : data?.userProfile?.lastDonationDate} label={"last Donation Date"} />
            </Grid>
            <Grid item xs={12}>
              <ProfileInfoBox  info={(data?.userProfile?.bio as string)?.length === 0 ? "Not Given" : data?.userProfile?.bio} label={"Bio"} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={0.5}>
        <Grid item xs={12} my={2}>
          <Divider textAlign="center">Contact Information</Divider>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileInfoBox  info={data?.email} label={"Email"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileInfoBox  info={(data?.contactNumber as string)?.length === 0 ? "Not Given" : data?.contactNumber} label={"Contact Number"} />
        </Grid>
        <Grid item xs={12}>
          <ProfileInfoBox  info={data?.location} label={"Location"} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;