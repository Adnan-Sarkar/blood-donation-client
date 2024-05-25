"use client";

import React from "react";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


type TProps = {
  setContent: React.Dispatch<React.SetStateAction<string>>
}

const DonorsSearch = ({setContent}: TProps) => {
  const [searchContent, setSearchContent] = React.useState<string>("");

  const handleSearch = () => {
    setContent(searchContent);
  }

  return (
    <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
      <Grid item xs={12}>
        <Stack direction={"row"} alignItems={"Center"} justifyContent={"center"} my={3}>
          <Typography variant={"h5"} fontWeight={500}>Search Blood Donors</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={9}>
        <TextField onChange={(e) => setSearchContent(e.target.value)} size={"small"} fullWidth={true} variant={"outlined"} type={"text"} placeholder={"Search Blood Donors"} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button onClick={handleSearch} fullWidth={true} size={"medium"}><SearchOutlinedIcon /> Search Donors</Button>
      </Grid>
    </Grid>
  );
};

export default DonorsSearch;