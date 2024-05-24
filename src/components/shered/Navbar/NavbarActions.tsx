import React from "react";
import { getUserInfo } from "@/services/auth.services";
import ProfileAvatar from "@/components/shered/ProfileAvatar/ProfileAvatar";
import Link from "next/link";
import { Button } from "@mui/material";

const NavbarActions = () => {
  const userInfo = getUserInfo();

  return (
    <>
    {
      (userInfo && userInfo.id) ? <ProfileAvatar /> : <Button><Link href={"/login"}>Login</Link></Button>
    }
    </>
  );
};

export default NavbarActions;