import { apiFetch } from "@/lib/api/fetcher";
import { TUser } from "@/types";
import { TMeta } from "@/types";

export type TDonorListParams = {
  searchTerm?: string;
  bloodType?: string;
  availability?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  excludeMe?: string;
};

export async function getDonors(params: TDonorListParams = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") query.set(k, String(v));
  });
  const qs = query.toString() ? `?${query}` : "";
  return apiFetch<TUser[]>(`/donor-list${qs}`, { revalidate: 60 });
}

export async function getDonorDetails(donorId: string) {
  return apiFetch<TUser>(`/donor-details/${donorId}`, { revalidate: 300 });
}
