"use client";

import React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CustomForm from "@/components/form-components/CustomForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeSearchDonors, setSearchDonors } from "@/redux/features/search/searchSlice";
import { FieldValues, useForm } from "react-hook-form";
import CustomInputField from "@/components/form-components/CustomInputField";
import { BloodGroups } from "@/constant/bloodGroups";
import CustomSelect from "@/components/form-components/CustomSelect";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { removeFilterDonors, setFilterDonors } from "@/redux/features/filter/filterSlice";


const DonorsSearch = () => {
  const searchDonors = useAppSelector((state) => state.search.searchDonors);
  const filterDonors = useAppSelector((state) => state.filter.filterDonors);
  const dispatch = useAppDispatch();

  console.log(filterDonors);

  const { reset: resetSearchForm } = useForm({
    defaultValues: {
      search: searchDonors || ""
    }
  });

  const { reset: resetFilterForm } = useForm({
    defaultValues: {
      filteredBloodGroup: filterDonors?.bloodType || "",
      filteredAvailability: filterDonors?.availability || ""
    }
  });

  const handleSearch = (values: FieldValues) => {
    dispatch(setSearchDonors(values.search));
    resetSearchForm({ search: "" });
  };

  const handleFilter = (values: FieldValues) => {
    dispatch(setFilterDonors({
      bloodType: values.filteredBloodGroup,
      availability: values.filteredAvailability === undefined ? "" : values.filteredAvailability
    }));
  };

  const handleRemoveFilter = () => {
    dispatch(removeFilterDonors());
    dispatch(removeSearchDonors());
    resetFilterForm({
      filteredBloodGroup: "",
      filteredAvailability: ""
    });
    resetSearchForm({
      search: ""
    });
  };


  return (
    <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
      <Grid item xs={12}>
        <Stack direction={"row"} alignItems={"Center"} justifyContent={"center"} my={3}>
          <Typography variant={"h5"} fontWeight={500}>Search Blood Donors</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <CustomForm onSubmit={handleSearch} defaultValues={{ search: searchDonors || "" }}>
          <Grid container xs={12}>
            <Grid item xs={12} sm={9}>
              <CustomInputField name={"search"} label={"Search Donors"} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button fullWidth={true} size={"medium"} type={"submit"}><SearchOutlinedIcon /> Search Donors</Button>
            </Grid>
          </Grid>
        </CustomForm>
        <CustomForm onSubmit={handleFilter} defaultValues={{
          filteredBloodGroup: filterDonors?.bloodType || "",
          filteredAvailability: filterDonors?.availability || ""
        }}>
          <Grid container xs={12}>
            <Grid item xs={12} md={6} lg={3} my={4}>
              <CustomSelect name={"filteredBloodGroup"} items={BloodGroups} label={"Filter by Blood Group"} />
            </Grid>
            <Grid item xs={12} md={6} lg={3} my={4} mx={1}>
              <CustomSelect name={"filteredAvailability"} items={["Available", "Not Available"]} label={"Filter by Availability"} />
            </Grid>
            <Grid item xs={12} md={6} lg={2} my={4} mx={1}>
              <Button fullWidth={true} type={"submit"}><FilterAltOutlinedIcon /> Apply Filter</Button>
            </Grid>
            <Grid item xs={12} md={6} lg={2} my={4}>
              <Button fullWidth={true} onClick={handleRemoveFilter}><FilterAltOutlinedIcon /> Remove Filter</Button>
            </Grid>
          </Grid>
        </CustomForm>
      </Grid>
    </Grid>
  );
};

export default DonorsSearch;