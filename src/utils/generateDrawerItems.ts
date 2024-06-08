import { TDrawerItem, TUserRole } from "@/types";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";

export const generateDrawerItems = (role: TUserRole): TDrawerItem[] => {
  const roleMenus: TDrawerItem[] = [];

  const defaultMenus = [
    {
      title: "Change Password",
      path: `change-password`,
      icon: KeyRoundedIcon,
    },
  ];

  switch (role) {
    case "ADMIN":
      roleMenus.push(
        {
          title: "Profile",
          path: `${role.toLowerCase()}/profile`,
          icon: AccountBoxIcon,
        },
        {
          title: "Manage Users",
          path: `${role.toLowerCase()}/manage-users`,
          icon: AccountBoxIcon,
        },
      );
      break;
    case "SUPER_ADMIN":
      roleMenus.push(
        {
          title: "Profile",
          path: `${role.toLowerCase()}/profile`,
          icon: AccountBoxIcon,
        },
        {
          title: "Manage Users",
          path: `${role.toLowerCase()}/manage-users`,
          icon: AccountBoxIcon,
        }
      );
      break;
    case "USER":
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role.toLowerCase()}`,
          icon: DashboardOutlinedIcon,
        },
        {
          title: "Profile",
          path: `${role.toLowerCase()}/profile`,
          icon: AccountBoxIcon,
        },
        {
          title: "Sent Blood Requests",
          path: `${role.toLowerCase()}/sent-requests`,
          icon: SendRoundedIcon,
        },
        {
          title: "Received Blood Requests",
          path: `${role.toLowerCase()}/received-requests`,
          icon: MessageOutlinedIcon,
        },
      );
      break;
    default:
      break;
  }

  roleMenus.push(...defaultMenus)

  return roleMenus
}