import { TBloodTypes, TGender, TUserRole, TUserStatus } from "@/types/common-types";

export type TUserProfile = {
  id: string;
  userId: string;
  bio: string;
  age: number;
  lastDonationDate: string;
};

export type TUser = {
  id:                  string;
  name:                string;
  email:               string;
  password:            string;
  gender:              TGender;
  bloodType:           TBloodTypes;
  role:                TUserRole;
  location:            string
  profilePicture:      string;
  availability:        boolean;
  contactNumber:       string;
  userProfile:         TUserProfile;
  status: TUserStatus;
};