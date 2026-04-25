import { getEvent } from "@/lib/api/event.api";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { RegisterButton } from "../components/RegisterButton";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  let event;
  try {
    const res = await getEvent(eventId);
    event = res.data;
  } catch {
    notFound();
  }

  if (!event) notFound();

  let formattedDate = event.eventDate;
  try {
    formattedDate = format(parseISO(event.eventDate), "EEEE, MMMM d, yyyy");
  } catch {
    // keep original
  }

  const registrations = event.EventDonors ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="mx-auto max-w-4xl px-4 pt-6">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to events
        </Link>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 flex flex-col gap-5">
        {/* Hero card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {/* Cover image */}
          <div className="relative h-64 w-full bg-surface-2 sm:h-72">
            {event.eventCoverPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={event.eventCoverPhoto}
                alt={event.eventTitle}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-linear-to-br from-primary/5 to-primary/15">
                <CalendarDays className="h-20 w-20 text-primary/20" />
              </div>
            )}

            {/* Gradient fade */}
            <div className="absolute inset-0 bg-linear-to-t from-card/70 via-transparent to-transparent" />

            {/* Status badge */}
            <div className="absolute top-4 right-4">
              {event.isComplete ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
                  Completed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
                  Upcoming
                </span>
              )}
            </div>
          </div>

          {/* Title + CTA */}
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-foreground sm:text-2xl leading-snug">
                {event.eventTitle}
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                {formattedDate}
              </p>
            </div>

            {!event.isComplete && (
              <div className="shrink-0 w-full sm:w-44">
                <RegisterButton
                  eventId={event.id}
                  registrations={registrations}
                />
              </div>
            )}
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { label: "Date", value: formattedDate, icon: CalendarDays },
            { label: "Time", value: event.eventTime, icon: Clock },
            { label: "Location", value: event.eventLocation, icon: MapPin },
            { label: "Contact", value: event.contactNumber, icon: Phone },
            {
              label: "Registered",
              value: `${registrations.length} donors`,
              icon: Users,
              highlight: true,
            },
          ].map(({ label, value, icon: Icon, highlight }) => (
            <div
              key={label}
              className={`flex flex-col gap-1.5 rounded-xl border p-4 ${highlight ? "border-primary/20 bg-primary/5" : "border-border bg-surface"}`}
            >
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-primary" />
                {label}
              </div>
              <p
                className={`text-sm font-semibold truncate ${highlight ? "text-primary" : "text-foreground"}`}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Attendees */}
        {registrations.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8">
                <Users className="h-4 w-4 text-primary" />
              </span>
              <h2 className="text-sm font-semibold text-foreground">
                Registered Attendees
              </h2>
              <span className="ml-auto inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary/10 px-2 text-xs font-semibold text-primary">
                {registrations.length}
              </span>
            </div>

            <Separator className="mb-4" />

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {registrations.map((reg) => {
                const initials = reg.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <div
                    key={reg.userId}
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5"
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage
                        src={reg.user.profilePicture}
                        alt={reg.user.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {reg.user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {reg.user.bloodType.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
