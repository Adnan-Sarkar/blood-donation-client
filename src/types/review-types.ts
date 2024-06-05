import { TUser } from "@/types/user-types";

export type TDonationSentRequest = {
  id: string;
  userId: string;
  rating: string;
  comment: string;
  user: TUser
};