import Link from "next/link";
import { CalendarDays, MapPin, Phone, ArrowRight } from "lucide-react";
import { getAllEvents, TEvent } from "@/lib/api/event.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format, parseISO } from "date-fns";

function EventCard({ event }: { event: TEvent }) {
  let formattedDate = event.eventDate;
  try {
    formattedDate = format(parseISO(event.eventDate), "MMM d, yyyy");
  } catch {
    // keep original
  }

  return (
    <Card className="group overflow-hidden border-border transition-shadow hover:shadow-md">
      {event.eventCoverPhoto && (
        <div className="h-44 w-full overflow-hidden bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.eventCoverPhoto}
            alt={event.eventTitle}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardContent className="p-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground leading-snug line-clamp-2">
              {event.eventTitle}
            </h3>
            {event.isComplete && (
              <Badge variant="secondary" className="shrink-0 text-xs">
                Completed
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              <span>
                {formattedDate} · {event.eventTime}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{event.eventLocation}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span>{event.contactNumber}</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full mt-1 group-hover:border-primary group-hover:text-primary transition-colors"
            render={<Link href={`/events/${event.id}`} />}
          >
            View Event
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const EventsSection = async () => {
  let events: TEvent[] = [];

  try {
    const res = await getAllEvents();
    const allEvents = res.data ?? [];
    events = allEvents.filter((e) => !e.isComplete).slice(0, 3);
  } catch {
    events = [];
  }

  if (events.length === 0) return null;

  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Upcoming Events
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Donation drives near you
            </h2>
          </div>
          <Button
            variant="ghost"
            className="gap-2 text-primary shrink-0"
            render={<Link href="/events" />}
          >
            View all events
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
