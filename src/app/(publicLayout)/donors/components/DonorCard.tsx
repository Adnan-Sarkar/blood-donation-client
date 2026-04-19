import Link from "next/link";
import { MapPin, Droplets } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { TUser } from "@/types";

const BLOOD_TYPE_LABELS: Record<string, string> = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A−",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B−",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB−",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O−",
};

export function DonorCard({ donor }: { donor: TUser }) {
  const initials = donor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const label = BLOOD_TYPE_LABELS[donor.bloodType] ?? donor.bloodType;

  return (
    <Link
      href={`/donor-details/${donor.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* ── Hero band ── */}
      <div className="relative h-28 overflow-hidden bg-primary/[0.05]">
        {/* Giant blood-type watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 -top-4 select-none font-black text-9xl leading-none tracking-tighter text-primary/[0.07] transition-all duration-500 group-hover:text-primary/[0.15]"
        >
          {label}
        </span>

        {/* Concentric circle accents */}
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full border border-primary/[0.07]" />
        <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full border border-primary/[0.10]" />

        {/* Availability pill — top-left */}
        <div
          className={cn(
            "absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
            donor.availability
              ? "bg-success/10 text-success"
              : "bg-muted/80 text-muted-foreground/60",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              donor.availability ? "bg-success" : "bg-muted-foreground/30",
            )}
          />
          {donor.availability ? "Available" : "Unavailable"}
        </div>
      </div>

      {/* ── Bridge: avatar overlaps hero, badge floats right ── */}
      <div className="-mt-7 flex items-end justify-between px-5">
        <Avatar className="h-14 w-14 ring-2 ring-background shadow-lg">
          <AvatarImage src={donor.profilePicture} alt={donor.name} />
          <AvatarFallback className="bg-primary/10 text-sm font-bold text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="mb-1 flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 shadow-sm shadow-primary/20 transition-all duration-200 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-primary/30">
          <Droplets className="h-3.5 w-3.5 text-primary-foreground/80" />
          <span className="text-sm font-bold text-primary-foreground">
            {label}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        {/* Name */}
        <p className="mb-1 truncate text-[15px] font-semibold leading-tight text-foreground">
          {donor.name}
        </p>

        {/* Location */}
        <div className="mb-4 flex min-h-4 items-center gap-1.5 text-xs text-muted-foreground">
          {donor.location && (
            <>
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{donor.location}</span>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="flex h-9 w-full items-center justify-center rounded-xl border border-border text-sm font-medium text-muted-foreground transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          View Profile
        </div>
      </div>
    </Link>
  );
}
