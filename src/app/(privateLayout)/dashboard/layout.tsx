import React from "react";
import { TComponentProps } from "@/types";
import Dashboard from "@/components/dashboard/Dashboard";

const Layout = ({children}: TComponentProps) => {
  return (
    <Dashboard>
      {children}
    </Dashboard>
  );
};

export default Layout;