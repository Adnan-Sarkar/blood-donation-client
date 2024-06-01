import { TBloodTypes, TGender, TRequestStatus, TUserRole, TUserStatus } from "@/types/common-types";

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

export type TDonationSentRequest = {
  id: string;
  donorId: string;
  requesterId: string;
  phoneNumber: string;
  dateOfDonation: string;
  timeOfDonation: string;
  hospitalName: string;
  hospitalAddress: string;
  reason: string;
  requestStatus: TRequestStatus;
  donor: TUser
};

export type TDonationReceivedRequest = {
  id: string;
  donorId: string;
  requesterId: string;
  phoneNumber: string;
  dateOfDonation: string;
  timeOfDonation: string;
  hospitalName: string;
  hospitalAddress: string;
  reason: string;
  requestStatus: TRequestStatus;
  requester: TUser
};