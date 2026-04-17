import { apiFetch } from "@/lib/api/fetcher";

export type TReview = {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: {
    name: string;
    profilePicture: string;
    bloodType: string;
  };
};

export async function getAllReviews(limit?: number) {
  const qs = limit ? `?limit=${limit}` : "";
  return apiFetch<TReview[]>(`/review/all-reviews${qs}`, {
    revalidate: 3600,
  });
}

export async function getMyReview(token: string) {
  return apiFetch<TReview | null>("/review", { token, cache: "no-store" });
}

export async function createReview(
  data: { rating: number; comment: string },
  token: string
) {
  return apiFetch<TReview>("/review", {
    method: "POST",
    token,
    body: data,
    cache: "no-store",
  });
}
