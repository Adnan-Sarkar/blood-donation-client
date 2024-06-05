import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { TUser } from "@/types";
import DonorCard from "@/app/(publicLayout)/donors/components/DonorCard";
import { getUserInfo } from "@/services/auth.services";

type TProps = {
  donorList: TUser[]
}

const DonorLists = ({donorList}: TProps) => {
  const userInfo = getUserInfo();
  return (
    <>
      <Stack direction={"row"} alignItems={"Center"} justifyContent={"center"} mt={3} mb={5}>
        <Typography variant={"h5"} fontWeight={500}>Total Donors Found {donorList?.length >= 0 ? donorList?.length : 0}</Typography>
      </Stack>
      <Grid container spacing={2}>
        {
          donorList && donorList.
          filter((donor: TUser) => (donor.id !== userInfo?.id)).
          map((donor: TUser) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={donor.id}>
                <DonorCard donorInfo={donor} />
              </Grid>
            )
          })
        }
      </Grid>
    </>
  );
};

export default DonorLists;