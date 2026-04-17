import Link from "next/link";
import { MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { getDonors } from "@/lib/api/donor.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
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

function DonorCard({ donor }: { donor: TUser }) {
  const initials = donor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="group overflow-hidden border-border transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={donor.profilePicture} alt={donor.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            {donor.availability && (
              <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-background">
                <span className="h-2.5 w-2.5 rounded-full bg-success" />
              </span>
            )}
          </div>

          {/* Name + Blood type */}
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold text-foreground">{donor.name}</p>
            <Badge
              variant="secondary"
              className="mx-auto bg-primary/10 text-primary border-primary/20 font-bold text-sm px-3"
            >
              {BLOOD_TYPE_LABELS[donor.bloodType] ?? donor.bloodType}
            </Badge>
          </div>

          {/* Location */}
          {donor.location && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate max-w-[140px]">{donor.location}</span>
            </div>
          )}

          {/* Availability */}
          <div className="flex items-center gap-1.5 text-xs">
            <CheckCircle2
              className={`h-3.5 w-3.5 ${donor.availability ? "text-success" : "text-muted-foreground"}`}
            />
            <span
              className={
                donor.availability ? "text-success" : "text-muted-foreground"
              }
            >
              {donor.availability ? "Available to donate" : "Unavailable"}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full mt-1 group-hover:border-primary group-hover:text-primary transition-colors"
            render={<Link href={`/donor-details/${donor.id}`} />}
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const Donors = async () => {
  let donors: TUser[] = [];

  try {
    const res = await getDonors({ limit: 3, availability: true });
    donors = res.data ?? [];
  } catch {
    donors = [];
  }

  if (donors.length === 0) return null;

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Donor Spotlight
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Available donors near you
            </h2>
          </div>
          <Button
            variant="ghost"
            className="gap-2 text-primary shrink-0"
            render={<Link href="/donors" />}
          >
            View all donors
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {donors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Donors;
