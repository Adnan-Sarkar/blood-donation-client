"use client";

import React from "react";
import { TComponentProps } from "@/types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import DashboardDrawer from "@/components/dashboard/DashboardDrawer";
import DashboardAppbar from "@/components/dashboard/DashboardAppbar";

const drawerWidth = 280;

const Dashboard = ({children}: TComponentProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DashboardAppbar drawerWidth={drawerWidth}  handleDrawerToggle={handleDrawerToggle} />
      <DashboardDrawer drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerClose={handleDrawerClose} handleDrawerTransitionEnd={handleDrawerTransitionEnd} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default Dashboard;