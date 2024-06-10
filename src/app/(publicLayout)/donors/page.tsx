"use client";

import React from "react";
import { Box, Container, Pagination } from "@mui/material";
import DonorsSearch from "@/app/(publicLayout)/donors/components/DonorsSearch";
import DonorLists from "@/app/(publicLayout)/donors/components/DonorLists";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types";
import { getUserInfo } from "@/services/auth.services";

const DonorsPage = () => {
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(12);
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
  const query: Record<string, any> = {
    page,
    limit
  };


  const {data} = useGetAllDonorsQuery({
    searchTerm: searchDonors || "",
    ...filterObj,
    ...query
  });

  let pageCount: number = 1;
  if (data?.meta?.total) {
    pageCount = Math.ceil(data?.meta?.total / limit);
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  console.log(data?.data);


  return (
    <Container>
      <Box mb={6}>
        <DonorsSearch />
        <Box my={12}></Box>
        <DonorLists donorList={data?.data?.filter((donor: TUser) => (donor.id !== userInfo?.id))} />
        <Box
          my={5}
          sx={
            {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2
            }
          }
        ><Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color={"primary"}/>
        </Box>
      </Box>
    </Container>
  );
};

export default DonorsPage;