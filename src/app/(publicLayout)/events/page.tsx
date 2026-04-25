import {
  CalendarDays,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  Users,
} from "lucide-react";
import { getAllEvents, TEvent } from "@/lib/api/event.api";
import { format, parseISO } from "date-fns";
import Link from "next/link";

// ─── Event Card ────────────────────────────────────────────────────

function EventCard({ event }: { event: TEvent }) {
  let formattedDate = event.eventDate;
  try {
    formattedDate = format(parseISO(event.eventDate), "MMM d, yyyy");
  } catch {}

  return (
    <Link
      href={`/events/${event.id}`}
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Cover Image */}
      <div className="relative h-40 w-full overflow-hidden bg-surface-2 shrink-0">
        {event.eventCoverPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.eventCoverPhoto}
            alt={event.eventTitle}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-linear-to-br from-primary/5 to-primary/15">
            <CalendarDays className="h-14 w-14 text-primary/30" />
          </div>
        )}

        {/* Gradient fade to card */}
        <div className="absolute inset-0 bg-linear-to-t from-card/80 via-card/10 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          {event.isComplete ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              Completed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
              Upcoming
            </span>
          )}
        </div>

        {/* Date chip */}
        <div className="absolute bottom-3 left-3">
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-card/90 px-2.5 py-1.5 backdrop-blur-sm shadow-sm border border-border/50">
            <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="text-xs font-semibold text-foreground">
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-sm font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {event.eventTitle}
        </h3>

        <div className="flex flex-col gap-1.5">
          <MetaRow
            icon={<Clock className="h-3 w-3" />}
            label={event.eventTime}
          />
          <MetaRow
            icon={<MapPin className="h-3 w-3" />}
            label={event.eventLocation}
          />
          <MetaRow
            icon={<Phone className="h-3 w-3" />}
            label={event.contactNumber}
          />
        </div>

        <div className="mt-auto pt-1">
          <div className="h-px bg-border mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>{event._count?.EventDonors ?? 0} registered</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-primary">
              <span>
                {event.isComplete ? "View details" : "View & Register"}
              </span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function MetaRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary">
        {icon}
      </span>
      <span className="text-xs text-muted-foreground truncate">{label}</span>
    </div>
  );
}

// Empty State

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/8">
        <CalendarDays className="h-7 w-7 text-primary/60" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-semibold text-foreground">No events yet</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Check back soon for upcoming blood donation drives.
        </p>
      </div>
    </div>
  );
}

// Section Header

function SectionHeader({
  title,
  count,
  muted,
}: {
  title: string;
  count: number;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h2
        className={`text-lg font-bold ${muted ? "text-muted-foreground" : "text-foreground"}`}
      >
        {title}
      </h2>
      <span
        className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-semibold ${muted ? "bg-surface-2 text-muted-foreground" : "bg-primary/10 text-primary"}`}
      >
        {count}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

export default async function EventsPage() {
  let events: TEvent[] = [];

  try {
    const res = await getAllEvents();
    events = res.data ?? [];
  } catch {
    events = [];
  }

  const upcoming = events.filter((e) => !e.isComplete);
  const completed = events.filter((e) => e.isComplete);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Blood Donation Events
        </h1>
        <p className="mt-2 text-base text-muted-foreground max-w-xl">
          Join a donation drive near you. Every pint saves up to three lives.
        </p>
      </div>

      {events.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-10">
          {upcoming.length > 0 && (
            <section>
              <SectionHeader title="Upcoming Events" count={upcoming.length} />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {completed.length > 0 && (
            <section>
              <SectionHeader
                title="Past Events"
                count={completed.length}
                muted
              />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 opacity-65">
                {completed.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
