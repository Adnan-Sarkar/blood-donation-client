import { UserPlus, Search, Heart } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: UserPlus,
    title: "Register as a Donor",
    description:
      "Create your account in minutes. Enter your blood type, location, and availability. Your profile helps patients find you when they need you most.",
  },
  {
    step: "02",
    icon: Search,
    title: "Find a Match",
    description:
      "Search donors by blood type and area. Our real-time availability system shows only active donors so you can act fast in an emergency.",
  },
  {
    step: "03",
    icon: Heart,
    title: "Donate & Save a Life",
    description:
      "Connect with the requester, confirm the hospital and date, and donate. After each donation, your profile updates automatically.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Simple steps to save a life
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Getting started takes less than 5 minutes. Here's how the process
            works from registration to donation.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {STEPS.map(({ step, icon: Icon, title, description }, idx) => (
            <div key={step} className="relative flex flex-col gap-4">
              {/* Connector line — hidden on last item */}
              {idx < STEPS.length - 1 && (
                <div
                  className="absolute left-1/2 top-8 hidden h-px w-full -translate-y-1/2 bg-border sm:block"
                  aria-hidden="true"
                />
              )}

              {/* Icon circle */}
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary/20 bg-background shadow-sm mx-auto sm:mx-0">
                <Icon className="h-7 w-7 text-primary" />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {idx + 1}
                </span>
              </div>

              <div className="flex flex-col gap-2 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
