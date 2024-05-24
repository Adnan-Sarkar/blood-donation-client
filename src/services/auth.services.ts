import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constant/authKey";
import { decodedToken } from "@/utils/jwtHelpers";


export const storeUserInfo = (token: string) => {
  return setToLocalStorage(authKey, token);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);

  if (authToken) {
    const decodedData: any = decodedToken(authToken);

    return {
      ...decodedData,
      role: decodedData?.role.toLowerCase(),
    };
  }
};

export const removeUserInfo = () => {
  return removeFromLocalStorage(authKey);
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;

};
