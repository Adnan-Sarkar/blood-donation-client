"use client";

import React, { useEffect } from "react";
import ProfileAvatar from "@/components/shered/ProfileAvatar/ProfileAvatar";
import Link from "next/link";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserInfoFromLocalStorage } from "@/redux/features/user/userSlice";

const NavbarActions = () => {
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state);

  useEffect(() => {
    if (token) {
      dispatch(getUserInfoFromLocalStorage());
      if (user?.id) {
        setUserInfo(user);
      }
      else {
        setUserInfo(null);
      }
    }
  }, [user, token, dispatch]);

  return (
    <>
    {
      (userInfo && userInfo?.token) ? <ProfileAvatar /> : <Button><Link href={"/login"}>Login</Link></Button>
    }
    </>
  );
};

export default NavbarActions;