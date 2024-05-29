import { TUserRole } from "@/types/common-types";

export type TJWTPayload = {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
  iat: number;
  exp: number;
};