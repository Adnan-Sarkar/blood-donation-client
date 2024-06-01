import React from "react";
import { useTheme } from "@mui/material/styles";
import CustomFullScreenModal from "@/components/modal/CustomFullScreenModal";
import { Container, Grid, Stack } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Divider from "@mui/material/Divider";
import ProfileInfoBox from "@/components/ui/ProfileInfoBox";
import { generateBloodTypeInShort } from "@/utils/generateBloodTypeInShort";
import { TDonationReceivedRequest } from "@/types";


type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  receivedRequestInfo: TDonationReceivedRequest
};

const ReceivedRequestDetailsModal = ({open, setOpen, receivedRequestInfo}: TProps) => {
  const theme = useTheme();

  return (
    <CustomFullScreenModal title={"Blood Donation Request Details"} open={open} setOpen={setOpen}>
      <Container>
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item xs={12} md={4} justifyContent={"start"} alignItems={"center"}>
            <Stack direction={"column"} alignItems={"start"} justifyContent={"center"} spacing={4} my={3}>
              <Image
                src={receivedRequestInfo?.requester?.profilePicture || assets.images.avatar}
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
                <Divider textAlign="left">Donation Information</Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={receivedRequestInfo?.hospitalName} label={"Hospital Name"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={receivedRequestInfo?.hospitalAddress} label={"Hospital Address"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={receivedRequestInfo?.dateOfDonation} label={"Donation Date"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={receivedRequestInfo?.timeOfDonation} label={"Donation Time"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={receivedRequestInfo?.requestStatus} label={"Status"} fontWeight={600} color={theme.palette.secondary.main} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={receivedRequestInfo?.reason} label={"Reason"} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={12} my={2}>
            <Divider textAlign="center">Requester Information</Divider>
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoBox  info={receivedRequestInfo?.requester?.name} label={"Name"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoBox  info={generateBloodTypeInShort(receivedRequestInfo?.requester?.bloodType)} label={"Blood Group"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoBox  info={(receivedRequestInfo?.requester?.gender as string)?.charAt(0)?.toUpperCase() + (receivedRequestInfo?.requester?.gender as string)?.slice(1)?.toLowerCase()} label={"Gender"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoBox  info={receivedRequestInfo?.requester?.contactNumber} label={"Contact Number"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoBox  info={receivedRequestInfo?.requester?.email} label={"Email"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoBox  info={receivedRequestInfo?.requester?.location} label={"Requester Location"} />
          </Grid>
        </Grid>
      </Container>
    </CustomFullScreenModal>
  );
};

export default ReceivedRequestDetailsModal;