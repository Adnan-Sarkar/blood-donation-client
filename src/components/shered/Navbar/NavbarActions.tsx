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
  const user = useAppSelector((state) => state.user);
  const token = useAppSelector((state) => state.token);

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
      (userInfo && userInfo?.token) ? <ProfileAvatar /> : <Link href={"/login"}><Button>Login</Button></Link>
    }
    </>
  );
};

export default NavbarActions;