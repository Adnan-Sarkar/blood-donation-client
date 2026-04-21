import { getDonorDetails } from "@/lib/api/donor.api";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Droplets,
  Calendar,
  User,
  Heart,
  ArrowLeft,
  Clock,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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

export default async function DonorDetailsPage({
  params,
}: {
  params: Promise<{ donorId: string }>;
}) {
  const { donorId } = await params;

  let donor;
  try {
    const res = await getDonorDetails(donorId);
    donor = res.data;
  } catch {
    notFound();
  }

  if (!donor) notFound();

  const initials = donor.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const bloodLabel = BLOOD_TYPE_LABELS[donor.bloodType] ?? donor.bloodType;

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="mx-auto max-w-4xl px-4 pt-6">
        <Link
          href="/donors"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to donors
        </Link>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 flex flex-col gap-5">
        {/* Hero card */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-background">
          {/* Banner */}
          <div className="relative h-36 bg-primary/5 overflow-hidden">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-6 select-none font-black text-[10rem] leading-none tracking-tighter text-primary/[0.07]"
            >
              {bloodLabel}
            </span>
            <div className="absolute -bottom-14 -left-14 h-44 w-44 rounded-full border border-primary/[0.07]" />
            <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full border border-primary/10" />

            {/* Availability pill */}
            <div
              className={cn(
                "absolute left-5 top-5 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
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
              {donor.availability
                ? "Available to donate"
                : "Currently unavailable"}
            </div>
          </div>

          {/* Avatar bridge */}
          <div className="-mt-9 flex items-end justify-between px-6">
            <Avatar className="h-[72px] w-[72px] ring-4 ring-background shadow-lg">
              <AvatarImage
                src={donor.profilePicture}
                alt={donor.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="mb-1 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 shadow-sm shadow-primary/20">
              <Droplets className="h-4 w-4 text-primary-foreground/80" />
              <span className="text-base font-bold text-primary-foreground">
                {bloodLabel}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 pb-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {donor.name}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                  {donor.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {donor.location}
                    </span>
                  )}
                  {donor.gender && (
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 shrink-0" />
                      {donor.gender.charAt(0) +
                        donor.gender.slice(1).toLowerCase()}
                    </span>
                  )}
                  {donor.userProfile?.age && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      {donor.userProfile.age} years old
                    </span>
                  )}
                </div>
              </div>

              {donor.availability && (
                <Button
                  render={<Link href={`/donor-details/${donorId}/donation-request`} />}
                  className="gap-2 shrink-0"
                >
                  <Heart className="h-4 w-4" />
                  Request Donation
                </Button>
              )}
            </div>

            {donor.userProfile?.bio && (
              <>
                <Separator className="my-4" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {donor.userProfile.bio}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Blood Type",
              value: bloodLabel,
              icon: Droplets,
              highlight: true,
            },
            {
              label: "Location",
              value: donor.location || "—",
              icon: MapPin,
              highlight: false,
            },
            {
              label: "Last Donation",
              value: donor.userProfile?.lastDonationDate || "—",
              icon: Calendar,
              highlight: false,
            },
            {
              label: "Contact",
              value: donor.contactNumber || "—",
              icon: Phone,
              highlight: false,
            },
          ].map(({ label, value, icon: Icon, highlight }) => (
            <div
              key={label}
              className={cn(
                "flex flex-col gap-1.5 rounded-xl border border-border p-4",
                highlight ? "bg-primary/5 border-primary/20" : "bg-surface",
              )}
            >
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon
                  className={cn("h-3.5 w-3.5", highlight ? "text-primary" : "")}
                />
                {label}
              </div>
              <p
                className={cn(
                  "text-sm font-semibold truncate",
                  highlight ? "text-primary" : "text-foreground",
                )}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Unavailable notice */}
        {!donor.availability && (
          <div className="rounded-xl border border-border bg-surface px-5 py-4 text-center">
            <p className="text-sm font-medium text-foreground">
              This donor is currently unavailable
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Check back later or{" "}
              <Link href="/donors" className="text-primary hover:underline">
                browse other donors
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
