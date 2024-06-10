"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refreshTokenKey } from "@/constant/refreshTokenKey";

type TOptions = {
  redirect: string;
}

const setRefreshToken = (token: string, option?: TOptions) => {
  cookies().set(refreshTokenKey, token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 1000 * 60 * 60 * 24,
  });

  if (option?.redirect) {
    redirect(option?.redirect);
  }
}

export default setRefreshToken;