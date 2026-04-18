import { Heart, Users, Globe, Shield } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const STATS = [
  { value: "10,000+", label: "Registered Donors" },
  { value: "50,000+", label: "Lives Saved" },
  { value: "200+", label: "Cities Covered" },
  { value: "99.9%", label: "Platform Uptime" },
];

const VALUES = [
  {
    icon: Heart,
    title: "Compassion First",
    description:
      "Every feature we build is driven by the impact it has on real lives. Blood donation is personal — we treat it that way.",
  },
  {
    icon: Shield,
    title: "Safety & Trust",
    description:
      "Donor profiles are verified. All connections are transparent. You always know who you're donating to and why.",
  },
  {
    icon: Globe,
    title: "Accessible to All",
    description:
      "We designed LifeFlow to be fast on low-bandwidth connections and accessible to users of all abilities.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description:
      "Our platform is shaped by feedback from donors and patients alike. You are part of the team that saves lives.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Is LifeFlow free to use?",
    answer:
      "Yes. LifeFlow is completely free for both donors and patients. There are no hidden fees or premium tiers.",
  },
  {
    question: "How do I know if a donor is safe?",
    answer:
      "All donors self-certify their eligibility. We display last donation date and availability status. We recommend always going through an accredited hospital or donation centre.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "Whole blood donors can donate every 56 days (8 weeks). Platelet donors can donate more frequently. Our platform automatically tracks your last donation date.",
  },
  {
    question: "Can I donate if I have a medical condition?",
    answer:
      "Eligibility depends on the condition. We always recommend consulting your doctor before donating. The donation centre will also screen you on the day.",
  },
  {
    question: "How does the blood request process work?",
    answer:
      "Find a donor by blood type and location, then send a donation request. The donor receives a notification and can accept or decline. Once accepted, you coordinate the hospital details directly.",
  },
];

const AboutUs = () => {
  return (
    <>
      {/* Mission Hero */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  About LifeFlow
                </p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                  Built to connect donors with lives that depend on them
                </h1>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                LifeFlow was founded with a single purpose: make blood donation
                simple, fast, and reliable. We bridge the gap between willing
                donors and urgent patients — cutting through bureaucracy and
                putting life-saving connections first.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Our platform serves thousands of donors and patients across the
                country. We partner with hospitals and donation centres to
                ensure every drop reaches the right person at the right time.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-6"
                >
                  <span className="text-3xl font-extrabold text-primary">
                    {value}
                  </span>
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Values
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              What drives us every day
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>

          <Accordion className="mt-12 w-full">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="first:border-t"
              >
                <AccordionTrigger className="py-5 hover:no-underline">
                  <div className="flex items-start gap-5 pr-2">
                    <span className="mt-0.5 w-5 shrink-0 text-[11px] font-extrabold tabular-nums leading-none text-primary/40">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold leading-snug text-foreground">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-10 text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
