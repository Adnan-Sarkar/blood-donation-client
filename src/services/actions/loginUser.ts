import {FieldValues} from "react-hook-form";
import setAccessToken from "@/services/actions/setAccessToken";

export const loginUser = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include"
    }
  );

  const userInfo = await res.json();

  setAccessToken(userInfo?.data?.accessToken);

  return userInfo;
};
