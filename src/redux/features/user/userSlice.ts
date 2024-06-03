import { TUserRole } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { authKey } from "@/constant/authKey";
import { getUserInfo } from "@/services/auth.services";

type TUserSliceState = {
  id: string;
  name: string;
  email: string;
  role: TUserRole | "";
  token: string;
};

const initialState: TUserSliceState = {
  id: "",
  name: "",
  email: "",
  role: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    getUserInfoFromLocalStorage: (state) => {
      const token = localStorage.getItem(authKey);
      if (token) {
        const userInfo = getUserInfo();
        if (userInfo?.id) {
          state.id = userInfo?.id;
          state.name = userInfo?.name;
          state.email = userInfo?.email;
          state.role = userInfo?.role;
          state.token = token;
        }
      }
    },
    removeUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.role = "";
      state.token = "";
    },
  },
});
export const {setUser,
  removeUser,
  getUserInfoFromLocalStorage} = userSlice.actions;
export default userSlice.reducer