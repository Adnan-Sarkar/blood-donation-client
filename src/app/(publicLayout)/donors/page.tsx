"use client";

import React from "react";
import { Box, Container } from "@mui/material";
import DonorsSearch from "@/app/(publicLayout)/donors/components/DonorsSearch";
import DonorLists from "@/app/(publicLayout)/donors/components/DonorLists";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types";
import { getUserInfo } from "@/services/auth.services";

const DonorsPage = () => {
  const userInfo = getUserInfo();
  const searchDonors = useAppSelector((state) => state.search.searchDonors);
  const filterDonors = useAppSelector((state) => state.filter.filterDonors);

  let filterObj = {};
  if (filterDonors.bloodType && filterDonors.availability) {
    filterObj = {
      bloodType: filterDonors.bloodType,
      availability: filterDonors.availability === "Available"
    }
  }
  else if (filterDonors.availability) {
    filterObj = {
      availability: filterDonors.availability === "Available"
    }
  }
  else if (filterDonors.bloodType) {
    filterObj = {
      bloodType: filterDonors.bloodType
    }
  }

  console.log({ filterDonors });

  const {data} = useGetAllDonorsQuery({
    searchTerm: searchDonors || "",
    ...filterObj
  });


  return (
    <Container>
      <Box mb={6}>
        <DonorsSearch />
        <Box my={12}></Box>
        <DonorLists donorList={data?.filter((donor: TUser) => (donor.id !== userInfo?.id))} />
      </Box>
    </Container>
  );
};

export default DonorsPage;