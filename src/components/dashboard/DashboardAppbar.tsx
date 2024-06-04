import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Button, CircularProgress, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import assets from "@/assets";
import { logoutUser } from "@/services/actions/logoutUser";
import { useRouter } from "next/navigation";
import { useLoggedInUserQuery } from "@/redux/api/userApi";
import { removeUser } from "@/redux/features/user/userSlice";
import { removeToken } from "@/redux/features/user/tokenSlice";
import { useAppDispatch } from "@/redux/hooks";

type TProps = {
  drawerWidth: number;
  handleDrawerToggle: () => void
}

const DashboardAppbar = ({ drawerWidth, handleDrawerToggle }: TProps) => {
  const router = useRouter();
  const {data, isLoading} = useLoggedInUserQuery("");
  const dispatch = useAppDispatch();


  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(removeToken());
    logoutUser(router);
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        p: 0
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{ width: "100%" }}>
          <Typography variant="h6" noWrap component="div">
            Welcome, {data?.name}
          </Typography>
          <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={3}>
            {
              isLoading ? <CircularProgress /> :
                <Avatar src={data?.profilePicture || assets.images.avatar} />
            }
            <Button color={"error"} onClick={handleLogout}>Logout</Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardAppbar;