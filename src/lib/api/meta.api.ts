import { apiFetch } from "@/lib/api/fetcher";

export type TUserMeta = {
  totalRequestsSent: number;
  totalGettingRequests: number;
  totalDonationCompleted: number;
};

export type TAdminMeta = {
  totalUsers: number;
  totalAvailableActiveUsers: number;
  totalMaleUsers: number;
  totalCompletedRequests: number;
};

export async function getUserMeta(token: string) {
  return apiFetch<TUserMeta>("/meta-data", { token, cache: "no-store" });
}

export async function getAdminMeta(token: string) {
  return apiFetch<TAdminMeta>("/meta-data/admin", {
    token,
    cache: "no-store",
  });
}
