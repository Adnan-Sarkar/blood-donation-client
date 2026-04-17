import Link from "next/link";
import { Droplets, Globe, Mail, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/donors", label: "Find Donors" },
  { href: "/events", label: "Events" },
  { href: "/about-us", label: "About Us" },
  { href: "/registration", label: "Become a Donor" },
];

const SOCIAL_LINKS = [
  { href: "#", label: "Website", icon: Globe },
  { href: "mailto:support@lifeflow.org", label: "Email", icon: Mail },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex w-fit items-center gap-2">
              <Droplets className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold tracking-tight">
                Life<span className="text-primary">Flow</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed opacity-70">
              Connecting blood donors with those in need. Every donation saves
              a life. Join our community and make a difference today.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 opacity-70 transition-all hover:border-primary hover:opacity-100 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-60">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex text-sm opacity-70 transition-all hover:opacity-100 hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-60">
              Our Mission
            </h3>
            <p className="text-sm leading-relaxed opacity-70">
              We believe that blood donation should be simple, safe, and
              accessible to everyone. Our platform empowers donors and
              recipients to connect with ease.
            </p>
            <div className="flex items-center gap-2 pt-1 text-sm opacity-70">
              <Heart className="h-4 w-4 shrink-0 text-primary" />
              <span>Available 24/7 for emergency requests</span>
            </div>
            <a
              href="mailto:support@lifeflow.org"
              className="w-fit text-sm opacity-70 transition-opacity hover:opacity-100 hover:text-primary"
            >
              support@lifeflow.org
            </a>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row">
          <p className="text-xs opacity-50">
            &copy; {new Date().getFullYear()} LifeFlow. All rights reserved.
          </p>
          <p className="text-xs opacity-50">
            Built to save lives, one donation at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
