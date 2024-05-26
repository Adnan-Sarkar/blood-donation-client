import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { Stack } from "@mui/material";
import { generateDrawerItems } from "@/utils/generateDrawerItems";
import { getUserInfo } from "@/services/auth.services";
import { TDrawerItem, TUserRole } from "@/types";
import DashboardDrawerItem from "@/components/dashboard/DashboardDrawerItem";

const DashboardDrawerItems = () => {
  const {role} = getUserInfo();

  return (
    <div>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} my={1}>
        <Link href={"/"}>
          <Image src={assets.images.logo} alt={"Blood Bank"} width={200} height={50} priority={true} />
        </Link>
      </Stack>
      <Divider />
      <List>
        {
          generateDrawerItems((role.toUpperCase()) as TUserRole)?.map((item: TDrawerItem) => {
            return <DashboardDrawerItem item={item} key={item.title} />
          })
        }
      </List>
    </div>
  );
};

export default DashboardDrawerItems;