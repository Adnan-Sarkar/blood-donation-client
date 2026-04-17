"use client";

import { usePathname } from "next/navigation";
import { Moon, Sun, PanelLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { NotificationBell } from "@/components/dashboard/NotificationBell";

const BREADCRUMB_MAP: Record<string, string> = {
  "/dashboard/user": "Overview",
  "/dashboard/user/sent-requests": "Sent Requests",
  "/dashboard/user/received-requests": "Received Requests",
  "/dashboard/user/profile": "My Profile",
  "/dashboard/admin": "Overview",
  "/dashboard/admin/manage-users": "Manage Users",
  "/dashboard/admin/donation-requests": "Donation Requests",
  "/dashboard/admin/profile": "My Profile",
  "/dashboard/super_admin": "Overview",
  "/dashboard/super_admin/manage-users": "Manage Users",
  "/dashboard/super_admin/donation-requests": "Donation Requests",
  "/dashboard/change-password": "Change Password",
};

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

export function DashboardTopbar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const pageTitle = BREADCRUMB_MAP[pathname] ?? "Dashboard";

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        className="h-8 w-8"
      >
        <PanelLeft className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="h-4" />
      <h1 className="text-sm font-semibold text-foreground">{pageTitle}</h1>
      <div className="ml-auto flex items-center gap-1">
        <NotificationBell />
        <ThemeToggle />
      </div>
    </header>
  );
}
