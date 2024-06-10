import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
import { refreshTokenKey } from "@/constant/refreshTokenKey";

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

  const result = await res.json();
  cookies().set(refreshTokenKey, result?.refreshToken);

  return result?.result;
};
