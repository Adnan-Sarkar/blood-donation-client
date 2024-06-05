import { createSlice } from "@reduxjs/toolkit";

type TSearchSliceState = {
  searchDonors: string;
};

const initialState: TSearchSliceState = {
  searchDonors: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchDonors: (state, action) => {
      state.searchDonors = action.payload;
    },
    removeSearchDonors: (state) => {
      state.searchDonors = "";
    },
  },
});

export const { setSearchDonors, removeSearchDonors } = searchSlice.actions;
export default searchSlice.reducer;