"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  SendHorizonal,
  InboxIcon,
  User,
  KeyRound,
  LogOut,
  Droplets,
  ClipboardList,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/auth-context";
import { logoutUser } from "@/services/actions/logoutUser";
import { TUserRole } from "@/types/common-types";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const USER_NAV: NavItem[] = [
  { href: "/dashboard/user", label: "Overview", icon: LayoutDashboard },
  {
    href: "/dashboard/user/sent-requests",
    label: "Sent Requests",
    icon: SendHorizonal,
  },
  {
    href: "/dashboard/user/received-requests",
    label: "Received Requests",
    icon: InboxIcon,
  },
  { href: "/dashboard/user/profile", label: "My Profile", icon: User },
  {
    href: "/dashboard/change-password",
    label: "Change Password",
    icon: KeyRound,
  },
];

const ADMIN_NAV: NavItem[] = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  {
    href: "/dashboard/admin/manage-users",
    label: "Manage Users",
    icon: Users,
  },
  {
    href: "/dashboard/admin/donation-requests",
    label: "Donation Requests",
    icon: ClipboardList,
  },
  { href: "/dashboard/admin/profile", label: "My Profile", icon: User },
  {
    href: "/dashboard/change-password",
    label: "Change Password",
    icon: KeyRound,
  },
];

const SUPER_ADMIN_NAV: NavItem[] = [
  {
    href: "/dashboard/super_admin",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/super_admin/manage-users",
    label: "Manage Users",
    icon: Users,
  },
  {
    href: "/dashboard/super_admin/donation-requests",
    label: "Donation Requests",
    icon: ClipboardList,
  },
  {
    href: "/dashboard/change-password",
    label: "Change Password",
    icon: KeyRound,
  },
];

function getNavItems(role: TUserRole): NavItem[] {
  switch (role) {
    case "ADMIN":
      return ADMIN_NAV;
    case "SUPER_ADMIN":
      return SUPER_ADMIN_NAV;
    default:
      return USER_NAV;
  }
}

function getRoleBadgeLabel(role: TUserRole): string {
  switch (role) {
    case "SUPER_ADMIN":
      return "Super Admin";
    case "ADMIN":
      return "Admin";
    default:
      return "Donor";
  }
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearToken } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const navItems = user ? getNavItems(user.role) : USER_NAV;

  const handleLogout = async () => {
    clearToken();
    await logoutUser();
    router.push("/login");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <Sidebar collapsible="icon">
      {/* Header — Logo */}
      <SidebarHeader className="border-b border-border pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" />}
              tooltip="Home"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Droplets className="h-4 w-4" />
              </div>
              <span className="font-bold text-base tracking-tight">
                Life<span className="text-primary">Flow</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Nav items */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive =
                item.href === pathname ||
                (item.href !== "/dashboard/user" &&
                  item.href !== "/dashboard/admin" &&
                  item.href !== "/dashboard/super_admin" &&
                  pathname.startsWith(item.href));
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={isActive}
                    tooltip={item.label}
                    className={cn(isActive && "text-primary font-medium")}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer — User info + Logout */}
      <SidebarFooter className="border-t border-border pt-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex items-center gap-3 px-2 py-1.5",
                isCollapsed && "justify-center"
              )}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">
                    {user?.name ?? "Loading…"}
                  </span>
                  {user?.role && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0 w-fit mt-0.5"
                    >
                      {getRoleBadgeLabel(user.role)}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Logout"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
