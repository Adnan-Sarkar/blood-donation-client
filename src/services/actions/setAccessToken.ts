"use server"

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import { authKey } from "@/constant/authKey";

type TOptions = {
  redirect: string;
}

const setAccessToken = (token: string, option?: TOptions) => {
  cookies().set(authKey, token);

  if (option?.redirect) {
    redirect(option?.redirect);
  }
}

export default setAccessToken;