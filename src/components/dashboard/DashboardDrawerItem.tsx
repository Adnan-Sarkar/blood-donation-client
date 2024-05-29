import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { TDrawerItem } from "@/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

type TProps = { item: TDrawerItem }

const DashboardDrawerItem = ({item}: TProps) => {
  const pathName = usePathname();
  const linkPath = `/dashboard/${item.path}`;
  const theme = useTheme()

  return (
    <Link href={linkPath}>
      <ListItem
        key={item.title}
        disablePadding
        sx={{
          borderLeft: "5px solid transparent",
          "& span": { color: "primary.main", fontWeight: 400, fontSize: 16 },
          mb: 2,
          ...(pathName === linkPath ? {
            borderLeft: `5px solid ${theme.palette.secondary.main}`,
            "& svg": { color: `${theme.palette.secondary.main}` },
            "& span": { color: `${theme.palette.secondary.main}`},
          } : {})
        }}>
        <ListItemButton>
          <ListItemIcon>
            {item.icon && <item.icon />}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default DashboardDrawerItem;