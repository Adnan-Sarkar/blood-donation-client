"use client";

import React from "react";
import { Box, Container } from "@mui/material";
import DonorsSearch from "@/app/(publicLayout)/donors/components/DonorsSearch";
import DonorLists from "@/app/(publicLayout)/donors/components/DonorLists";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";

const DonorsPage = () => {
  const [searchContent, setSearchContent] = React.useState<string>("");
  const {data} = useGetAllDonorsQuery({});

  return (
    <Container>
      <DonorsSearch setContent={setSearchContent} />
      <Box my={12}></Box>
      <DonorLists donorList={data} />
    </Container>
  );
};

export default DonorsPage;