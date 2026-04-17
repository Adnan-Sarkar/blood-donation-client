import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BLOOD_TYPES = [
  "A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−",
];

const BLOOD_TYPE_QUERY: Record<string, string> = {
  "A+": "A_POSITIVE",
  "A−": "A_NEGATIVE",
  "B+": "B_POSITIVE",
  "B−": "B_NEGATIVE",
  "AB+": "AB_POSITIVE",
  "AB−": "AB_NEGATIVE",
  "O+": "O_POSITIVE",
  "O−": "O_NEGATIVE",
};

const EmergencyCTA = () => {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Icon + heading */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10">
              <AlertTriangle className="h-7 w-7 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
              Emergency? Find Blood Now
            </h2>
            <p className="max-w-xl text-base text-primary-foreground/80">
              Select the blood type you need and we&apos;ll show you available
              donors immediately.
            </p>
          </div>

          {/* Blood type selector */}
          <div className="flex flex-wrap justify-center gap-3">
            {BLOOD_TYPES.map((type) => (
              <Link
                key={type}
                href={`/donors?bloodType=${BLOOD_TYPE_QUERY[type]}`}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 text-sm font-bold text-primary-foreground transition-all hover:scale-105 hover:bg-primary-foreground hover:text-primary"
              >
                {type}
              </Link>
            ))}
          </div>

          {/* CTA button */}
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 font-semibold"
            render={<Link href="/donors" />}
          >
            Browse All Donors
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EmergencyCTA;
