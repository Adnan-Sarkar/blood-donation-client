import { apiFetch } from "@/lib/api/fetcher";

export type TEvent = {
  id: string;
  eventTitle: string;
  eventLocation: string;
  eventDate: string;
  eventTime: string;
  contactNumber: string;
  eventCoverPhoto: string;
  isComplete: boolean;
  createdAt: string;
};

export type TCreateEventBody = {
  eventTitle: string;
  eventLocation: string;
  eventDate: string;
  eventTime: string;
  contactNumber: string;
  eventCoverPhoto?: string;
  isComplete?: boolean;
};

export async function getAllEvents() {
  return apiFetch<TEvent[]>("/event", { revalidate: 300 });
}

export async function getEvent(eventId: string) {
  return apiFetch<TEvent>(`/event/${eventId}`, { revalidate: 300 });
}

export async function createEvent(data: TCreateEventBody, token: string) {
  return apiFetch<TEvent>("/event", {
    method: "POST",
    token,
    body: data,
    cache: "no-store",
  });
}

export async function registerForEvent(eventId: string, token: string) {
  return apiFetch<{ eventId: string; userId: string }>(
    `/event/event-registration/${eventId}`,
    { method: "POST", token, cache: "no-store" }
  );
}

export async function updateEvent(
  eventId: string,
  data: Partial<TCreateEventBody>,
  token: string
) {
  return apiFetch<null>(`/event/event-registration/${eventId}`, {
    method: "PATCH",
    token,
    body: data,
    cache: "no-store",
  });
}
