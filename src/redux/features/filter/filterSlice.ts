import { createSlice } from "@reduxjs/toolkit";

type TFilterSliceState = {
  filterDonors: {
    bloodType: string;
    availability: string;
  };
};

const initialState: TFilterSliceState = {
  filterDonors: {
    bloodType: "",
    availability: ""
  }
};

const filterSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setFilterDonors: (state, action) => {
      state.filterDonors.bloodType = action.payload.bloodType;
      state.filterDonors.availability = action.payload.availability;
    },
    removeFilterDonors: (state) => {
      state.filterDonors.bloodType = "";
      state.filterDonors.availability = "";
    },
  },
});

export const { setFilterDonors, removeFilterDonors } = filterSlice.actions;
export default filterSlice.reducer;