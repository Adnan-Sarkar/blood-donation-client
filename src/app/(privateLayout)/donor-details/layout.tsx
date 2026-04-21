import React from "react";
import { TComponentProps } from "@/types";
import Navbar from "@/components/shared/Navbar/Navbar";

const Layout = ({children}: TComponentProps) => {
  return (
    <>
      <Navbar />
      <div className="pt-16">{children}</div>
    </>
  );
};

export default Layout;