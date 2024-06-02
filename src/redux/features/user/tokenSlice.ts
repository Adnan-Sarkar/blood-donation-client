import { createSlice } from "@reduxjs/toolkit";

type TTokenSliceState = {
  token: string;
};

const initialState: TTokenSliceState = {
  token: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;