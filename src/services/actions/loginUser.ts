import { FieldValues } from "react-hook-form";
import setRefreshToken from "@/services/actions/setRefreshToken";

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

  const response = await res.json();
  if (response?.data?.result?.status !== "BLOCKED") {
    setRefreshToken(response?.data?.refreshToken);
    return response;
  }
  else {
    return response;
  }


};
