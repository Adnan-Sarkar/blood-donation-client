const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export type TApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: { total: number; page: number; limit: number };
};

type FetchOptions = {
  token?: string | null;
  cache?: RequestCache;
  revalidate?: number;
  body?: unknown;
  method?: string;
};

export async function apiFetch<T>(
  path: string,
  { token, cache, revalidate, body, method = "GET" }: FetchOptions = {}
): Promise<TApiResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    // No "Bearer" prefix — backend contract
    headers["Authorization"] = token;
  }

  const nextOptions: { cache?: RequestCache; next?: { revalidate: number } } =
    {};
  if (revalidate !== undefined) {
    nextOptions.next = { revalidate };
  } else if (cache) {
    nextOptions.cache = cache;
  } else {
    nextOptions.cache = "no-store";
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    credentials: "include",
    ...(body !== undefined && { body: JSON.stringify(body) }),
    ...nextOptions,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<TApiResponse<T>>;
}
