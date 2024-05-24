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

const ProfileAvatar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {data, isLoading} = useLoggedInUserQuery("");


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


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
        {
          isLoading ? <CircularProgress /> :
        <Avatar sx={{ width: 50, height: 50 }} src={data?.profilePicture || assets.images.avatar}/>
        }
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
    <MenuItem onClick={handleClose}>
      <Typography fontWeight={500}>
      Profile
      </Typography>
    </MenuItem>
    <MenuItem onClick={handleClose}>
      <Typography fontWeight={500}>
      Dashboard
      </Typography>
    </MenuItem>
    <MenuItem onClick={handleClose}>
      <Typography fontWeight={500}>
      My Donation Requests
      </Typography>
    </MenuItem>
    <Divider />
    <MenuItem onClick={handleClose}>
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