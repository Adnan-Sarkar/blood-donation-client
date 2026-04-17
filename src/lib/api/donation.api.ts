import { apiFetch } from "@/lib/api/fetcher";
import { TDonationSentRequest, TDonationReceivedRequest } from "@/types";

export type TCreateDonationRequestBody = {
  donorId: string;
  phoneNumber: string;
  dateOfDonation: string;
  timeOfDonation: string;
  hospitalName: string;
  hospitalAddress: string;
  reason: string;
};

export type TRequestListParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export async function createDonationRequest(
  data: TCreateDonationRequestBody,
  token: string,
) {
  return apiFetch<TDonationSentRequest>("/donation-request", {
    method: "POST",
    token,
    body: data,
    cache: "no-store",
  });
}

export async function getMyDonationRequests(
  params: TRequestListParams = {},
  token: string,
) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) query.set(k, String(v));
  });
  const qs = query.toString() ? `?${query}` : "";
  return apiFetch<TDonationSentRequest[]>(
    `/donation-request/my-donation-requests${qs}`,
    { token, cache: "no-store" },
  );
}

export async function getMyDonorRequests(
  params: TRequestListParams = {},
  token: string,
) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) query.set(k, String(v));
  });
  const qs = query.toString() ? `?${query}` : "";
  return apiFetch<TDonationReceivedRequest[]>(
    `/donation-request/my-donor-requests${qs}`,
    { token, cache: "no-store" },
  );
}

export async function getAllDonationRequests(
  params: TRequestListParams = {},
  token: string,
) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) query.set(k, String(v));
  });
  const qs = query.toString() ? `?${query}` : "";
  return apiFetch<TDonationReceivedRequest[]>(`/donation-request${qs}`, {
    token,
    cache: "no-store",
  });
}

export async function updateRequestStatus(
  requestId: string,
  status: "APPROVED" | "REJECTED",
  token: string,
) {
  return apiFetch<TDonationReceivedRequest>(`/donation-request/${requestId}`, {
    method: "PUT",
    token,
    body: { status },
    cache: "no-store",
  });
}

export async function completeRequest(requestId: string, token: string) {
  return apiFetch<null>(`/donation-request/complete/${requestId}`, {
    method: "PUT",
    token,
    cache: "no-store",
  });
}

export async function checkDonationRequest(
  donorId: string,
  requesterId: string,
  token: string,
) {
  return apiFetch<boolean>(
    `/donation-request/check-donation-request?donorId=${donorId}&requesterId=${requesterId}`,
    { token, cache: "no-store" },
  );
}

export async function getDonationRequestStatus(
  donorId: string,
  requesterId: string,
  token: string,
) {
  return apiFetch<string | null>(
    `/donation-request/donation-request-status?donorId=${donorId}&requesterId=${requesterId}`,
    { token, cache: "no-store" },
  );
}
