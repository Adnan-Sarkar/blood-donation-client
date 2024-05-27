"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { CircularProgress, Typography } from "@mui/material";
import { useLoggedInUserQuery } from "@/redux/api/userApi";
import assets from "@/assets";
import Link from "next/link";
import { logoutUser } from "@/services/actions/logoutUser";
import { useRouter } from "next/navigation";

const ProfileAvatar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {data, isLoading} = useLoggedInUserQuery("");
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser(router);
  }

  if (isLoading) {
    return <CircularProgress />
  }


  return (
    <>
    <Tooltip title="Profile">
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'profile' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 50, height: 50 }} src={data?.profilePicture || assets.images.avatar}/>
      </IconButton>
    </Tooltip>
  <Menu
    anchorEl={anchorEl}
    id="profile"
    open={open}
    onClose={handleClose}
    onClick={handleClose}
    transformOrigin={{ horizontal: 'center', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
  >
    <Link href={`/dashboard/${(data?.role as string).toLowerCase()}/profile`} onClick={handleClose}>
      <MenuItem>
        <Typography fontWeight={500}>
          Profile
        </Typography>
      </MenuItem>
    </Link>
    <Link href={`/dashboard/${(data?.role as string).toLowerCase()}`} onClick={handleClose}>
      <MenuItem>
        <Typography fontWeight={500}>
          Dashboard
        </Typography>
      </MenuItem>
    </Link>
    {
      data?.role === "USER" &&
        <Link href={`/dashboard/${(data?.role as string).toLowerCase()}/sent-requests`} onClick={handleClose}>
          <MenuItem>
            <Typography fontWeight={500}>
              My Sent Requests
            </Typography>
          </MenuItem>
        </Link>
    }
    {
      data?.role === "USER" &&
      <Link href={`/dashboard/${(data?.role as string).toLowerCase()}/received-requests`} onClick={handleClose}>
        <MenuItem>
            <Typography fontWeight={500}>
              Received Requests
            </Typography>
        </MenuItem>
      </Link>
    }
    <Divider />
    <MenuItem onClick={handleLogout}>
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  </Menu>
    </>
  );
};

export default ProfileAvatar;