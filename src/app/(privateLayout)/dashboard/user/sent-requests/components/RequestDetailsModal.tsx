import React from "react";
import { TDonationSentRequest } from "@/types";
import CustomFullScreenModal from "@/components/modal/CustomFullScreenModal";
import { Container, Grid, Stack } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Divider from "@mui/material/Divider";
import ProfileInfoBox from "@/components/ui/ProfileInfoBox";
import { generateBloodTypeInShort } from "@/utils/generateBloodTypeInShort";
import { useTheme } from "@mui/material/styles";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  requestInfo: TDonationSentRequest
};

const RequestDetailsModal = ({open, setOpen, requestInfo}: TProps) => {
  const theme = useTheme();

  return (
    <CustomFullScreenModal title={"Blood Donation Request Details"} open={open} setOpen={setOpen}>
      <Container>
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item xs={12} md={4} justifyContent={"start"} alignItems={"center"}>
            <Stack direction={"column"} alignItems={"start"} justifyContent={"center"} spacing={4} my={3}>
              <Image
                src={requestInfo?.donor?.profilePicture || assets.images.avatar}
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
                <ProfileInfoBox  info={requestInfo?.hospitalName} label={"Hospital Name"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={requestInfo?.hospitalAddress} label={"Hospital Address"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={requestInfo?.dateOfDonation} label={"Donation Date"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={requestInfo?.timeOfDonation} label={"Donation Time"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={requestInfo?.requestStatus} label={"Status"} fontWeight={600} color={theme.palette.secondary.main} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={requestInfo?.reason} label={"Reason"} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={12} my={2}>
            <Divider textAlign="center">Donor Information</Divider>
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoBox  info={requestInfo?.donor?.name} label={"Name"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoBox  info={generateBloodTypeInShort(requestInfo?.donor?.bloodType)} label={"Blood Group"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoBox  info={(requestInfo?.donor?.gender as string)?.charAt(0)?.toUpperCase() + (requestInfo?.donor?.gender as string)?.slice(1)?.toLowerCase()} label={"Gender"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoBox  info={requestInfo?.donor?.availability ? "Available" : "Not Available"} label={"Availability"} />
          </Grid>
          {
            requestInfo?.requestStatus === "APPROVED" &&
            <>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={requestInfo?.donor?.contactNumber} label={"Contact Number"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={requestInfo?.donor?.email} label={"Email"} />
              </Grid>
              <Grid item xs={12}>
                <ProfileInfoBox  info={requestInfo?.donor?.location} label={"Location"} />
              </Grid>
            </>
          }
        </Grid>
      </Container>
    </CustomFullScreenModal>
  );
};

export default RequestDetailsModal;