import React from "react";
import { TComponentProps } from "@/types";
import Navbar from "@/components/shered/Navbar/Navbar";

const Layout = ({children}: TComponentProps) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default Layout;