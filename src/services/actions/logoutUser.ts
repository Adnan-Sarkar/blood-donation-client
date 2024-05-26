import { removeUserInfo } from "@/services/auth.services";
import deleteCookies from "@/services/actions/deleteCookies";
import { authKey } from "@/constant/authKey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logoutUser = (router: AppRouterInstance) => {
  removeUserInfo();
  deleteCookies([authKey, "refreshToken"]);
  router.push("/login");
  router.refresh();
}