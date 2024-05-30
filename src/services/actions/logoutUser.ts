import { removeUserInfo } from "@/services/auth.services";
import deleteCookies from "@/services/actions/deleteCookies";
import { authKey } from "@/constant/authKey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { refreshTokenKey } from "@/constant/refreshTokenKey";

export const logoutUser = (router: AppRouterInstance) => {
  removeUserInfo();
  deleteCookies([authKey, refreshTokenKey]);
  router.push("/login");
  router.refresh();
}