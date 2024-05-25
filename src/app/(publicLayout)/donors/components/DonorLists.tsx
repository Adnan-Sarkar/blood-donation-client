import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { TUser } from "@/types";
import DonorCard from "@/app/(publicLayout)/donors/components/DonorCard";

type TProps = {
  donorList: TUser[]
}

const DonorLists = ({donorList}: TProps) => {
  return (
    <>
      <Stack direction={"row"} alignItems={"Center"} justifyContent={"center"} my={3}>
        <Typography variant={"h5"} fontWeight={500}>{"Total donors found 82"}</Typography>
      </Stack>
      <Grid container spacing={2}>
        {
          donorList && donorList.map((donor: TUser) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={donor.id}>
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