import Link from "next/link";
import { ArrowRight, Heart, Users, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const STATS = [
  { value: "10K+", label: "Active Donors", icon: Users },
  { value: "50K+", label: "Lives Saved", icon: Heart },
  { value: "8", label: "Blood Types", icon: Droplets },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle background accent */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-24 right-0 h-[480px] w-[480px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            <Badge
              variant="secondary"
              className="w-fit gap-1.5 px-3 py-1 text-xs font-medium"
            >
              <Heart className="h-3 w-3 text-primary" />
              Every drop counts
            </Badge>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Donate Blood.{" "}
              <span className="text-primary">Save a Life</span>{" "}
              Today.
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Join thousands of donors across the country. Find a donor in your
              area, request blood in an emergency, or register to become a
              lifesaver — all in minutes.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-hover gap-2"
                render={<Link href="/donors" />}
              >
                Find a Donor
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/registration" />}
              >
                Become a Donor
              </Button>
            </div>

            {/* Inline stats */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-border">
              {STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-2xl font-bold text-foreground">
                      {value}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Main card */}
              <div className="rounded-2xl border border-border bg-surface p-8 shadow-xl">
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Droplets className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      Need Blood Urgently?
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Search by blood type and location to find the nearest
                      available donor right now.
                    </p>
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary-hover"
                    size="lg"
                    render={<Link href="/donors" />}
                  >
                    Search Donors Now
                  </Button>
                </div>
              </div>

              {/* Floating badge — top left */}
              <div className="absolute -left-4 top-6 rounded-xl border border-border bg-background px-4 py-2 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-medium">Donors Online</span>
                </div>
              </div>

              {/* Floating badge — bottom right */}
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-border bg-background px-4 py-2 shadow-md">
                <p className="text-xs font-medium text-muted-foreground">
                  Response in
                </p>
                <p className="text-base font-bold text-foreground">
                  {"< 30 min"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
