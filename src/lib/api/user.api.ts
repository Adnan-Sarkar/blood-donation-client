import { apiFetch } from "@/lib/api/fetcher";
import { TUser } from "@/types";
import { TMeta } from "@/types";

export type TUpdateProfileBody = {
  user?: {
    contactNumber?: string;
    location?: string;
    profilePicture?: string;
    availability?: boolean;
  };
  userProfile?: {
    age?: number;
    bio?: string;
    lastDonationDate?: string;
  };
};

export type TUserListParams = {
  searchTerm?: string;
  bloodType?: string;
  availability?: boolean;
  page?: number;
  limit?: number;
};

export async function getMyProfile(token: string) {
  return apiFetch<TUser>("/my-profile", { token, cache: "no-store" });
}

export async function updateMyProfile(data: TUpdateProfileBody, token: string) {
  return apiFetch<null>("/my-profile", {
    method: "PUT",
    token,
    body: data,
    cache: "no-store",
  });
}

export async function getAllUsers(params: TUserListParams = {}, token: string) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") query.set(k, String(v));
  });
  const qs = query.toString() ? `?${query}` : "";
  return apiFetch<TUser[]>(`/users${qs}`, { token, cache: "no-store" });
}

export async function updateUserStatus(
  userId: string,
  status: "ACTIVE" | "INACTIVE" | "BLOCKED",
  token: string
) {
  return apiFetch<null>(`/users/${userId}`, {
    method: "PUT",
    token,
    body: { status },
    cache: "no-store",
  });
}

export async function changePassword(
  data: { oldPassword: string; newPassword: string },
  token: string
) {
  return apiFetch<null>("/auth/change-password", {
    method: "POST",
    token,
    body: data,
    cache: "no-store",
  });
}
