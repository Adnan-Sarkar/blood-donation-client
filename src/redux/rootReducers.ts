import baseApi from "@/redux/api/baseApi";
import userReducer from "@/redux/features/user/userSlice";
import tokenReducer from "@/redux/features/user/tokenSlice";
// @ts-ignore
import storage from "redux-persist/lib/storage";
import { authKey } from "@/constant/authKey";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: authKey,
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, tokenReducer);

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducer,
  token: persistedAuthReducer,
}