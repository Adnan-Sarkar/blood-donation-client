"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Droplets,
  Menu,
  Moon,
  Sun,
  ChevronDown,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/auth-context";
import { logoutUser } from "@/services/actions/logoutUser";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/donors", label: "Donors" },
  { href: "/about-us", label: "About" },
  { href: "/events", label: "Events" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearToken } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    clearToken();
    await logoutUser();
    router.push("/login");
  };

  const dashboardHref =
    user?.role === "SUPER_ADMIN"
      ? "/dashboard/super_admin"
      : user?.role === "ADMIN"
        ? "/dashboard/admin"
        : "/dashboard/user";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/0",
      )}
    >
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* ── Left: desktop logo ── */}
        <div className="flex items-center">
          {/* Desktop logo */}
          <Link href="/" className="hidden md:flex shrink-0 items-center gap-2">
            <Droplets className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight">
              Life<span className="text-primary">Flow</span>
            </span>
          </Link>
        </div>

        {/* ── Mobile: logo absolutely centered ── */}
        <Link
          href="/"
          className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
        >
          <Droplets className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">
            Life<span className="text-primary">Flow</span>
          </span>
        </Link>

        {/* ── Desktop: nav links (flex-1 centered) ── */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Right: theme toggle + desktop auth ── */}
        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <SheetContent
              side="right"
              className="flex flex-col w-full sm:w-80 p-0"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation menu</SheetTitle>
              </SheetHeader>

              {/* Sheet header — centered logo + greeting */}
              <div className="flex flex-col items-center gap-3 px-6 pt-8 pb-6 border-b border-border">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Droplets className="h-7 w-7 text-primary" />
                </div>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-bold tracking-tight"
                >
                  Life<span className="text-primary">Flow</span>
                </Link>
                {user && (
                  <p className="text-sm text-muted-foreground -mt-1">
                    Hello,{" "}
                    <span className="font-semibold text-foreground">
                      {user.name.split(" ")[0]}
                    </span>
                  </p>
                )}
              </div>

              {/* Sheet nav links — centered */}
              <nav className="flex flex-col items-center gap-1.5 flex-1 px-5 py-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "w-full text-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
                      pathname === link.href
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Sheet action buttons */}
              <div className="px-5 pb-8 pt-5 border-t border-border flex flex-col gap-3">
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full h-11 gap-2.5 text-sm font-medium"
                      onClick={() => {
                        setMobileOpen(false);
                        router.push(dashboardHref);
                      }}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      My Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full h-11 gap-2.5 text-sm font-medium text-destructive hover:text-destructive hover:bg-destructive/10 border border-destructive/20"
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full h-11 text-sm font-medium"
                      render={
                        <Link
                          href="/login"
                          onClick={() => setMobileOpen(false)}
                        />
                      }
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full h-11 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary-hover"
                      render={
                        <Link
                          href="/registration"
                          onClick={() => setMobileOpen(false)}
                        />
                      }
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 font-medium"
                    />
                  }
                >
                  {user.name.split(" ")[0]}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => router.push(dashboardHref)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer"
                    variant="destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  render={<Link href="/login" />}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary-hover"
                  render={<Link href="/registration" />}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
