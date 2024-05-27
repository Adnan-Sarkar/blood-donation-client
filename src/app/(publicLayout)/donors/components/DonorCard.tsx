import React from "react";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import Image from "next/image";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import assets from "@/assets";
import { TUser } from "@/types";
import { generateBloodTypeInShort } from "@/utils/generateBloodTypeInShort";
import Link from "next/link";

type TProps = {
  donorInfo: TUser
}

const DonorCard = ({donorInfo}: TProps) => {
  return (
    <>

    <Card sx={{
      maxWidth: 310,
      padding: 1,
      position: "relative"
    }}>
      <Box
        sx={{
          p: "10px 20px",
          borderRadius: 2,
          border: "1px solid #34495e",
          fontWeight: '700',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: "1",
        }}
      >
        {
          donorInfo.status === "ACTIVE" ? "Available" : "Not Available"
        }
      </Box>
      <Stack direction={"row"} alignItems={"Center"} justifyContent={"center"} my={1} pt={3}>
        <Image src={donorInfo?.profilePicture || assets.images.avatar} alt={"lol"} width={200} height={200} priority style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          objectFit: "cover",
        }} />
      </Stack>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
          {donorInfo.name}
        </Typography>
        <Stack direction={"row"} alignItems={"Center"} justifyContent={"center"} spacing={2}>
          <Box>
            <LocationOnOutlinedIcon/> <Typography component="span">{donorInfo.location}</Typography>
          </Box>
          <Box>
            <BloodtypeOutlinedIcon/> <Typography component="span">{generateBloodTypeInShort(donorInfo.bloodType)}</Typography>
          </Box>
        </Stack>
      </CardContent>
      <Stack direction={"row"} alignItems={"Center"} justifyContent={"center"} my={1}>
        <Link href={`/donor-details/${donorInfo.id}`} >
          <Button size="small">Donor Details</Button>
        </Link>
      </Stack>
    </Card>
    </>
  );
};

export default DonorCard;