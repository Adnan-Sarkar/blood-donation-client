"use client";

import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import { useTheme } from "@mui/material/styles";

const DonationTips = () => {
  const theme = useTheme();
  return (
    <section style={{margin: "50px 0"}}>
      <Container>
        <Typography variant={"h3"} fontWeight={600} my={4} color={theme.palette.primary.main}>Blood Donation Tips</Typography>
        <Stack direction={"column"} gap={8}>
          {/*Tip 1*/}
          <Stack alignItems={"center"} direction={{xs: "column-reverse", md: "row"}}>
            <Stack direction={"column"} alignItems={{xs: "center", md: "start"}} width={"100%"} spacing={2}>
              <Box width={{xs: "100%", md: "60%"}}>
                <Typography variant={"h5"} fontWeight={600} color={theme.palette.primary.main} my={2}>
                  1. Stay Hydrated
                </Typography>
                <Typography component={"p"}>
                  Drink plenty of water before and after your donation. Staying well-hydrated helps maintain your blood pressure and makes the donation process smoother.
                </Typography>
              </Box>
            </Stack>
            <Stack direction={"row"} justifyContent={{xs: "center", md: "start"}}>
              <Image src={assets.images.donationTip1} alt={"tips"} width={250} height={250} priority />
            </Stack>
          </Stack>

          {/*Tip 2*/}
          <Stack alignItems={"center"} direction={{xs: "column", md: "row"}} justifyContent={{xs: "center", md: "space-between"}}>
            <Stack direction={"row"} justifyContent={{xs: "center", md: "start"}}>
              <Image src={assets.images.donationTip2} alt={"tips"} width={250} height={250} priority />
            </Stack>
            <Stack direction={"column"} alignItems={{xs: "center", md: "end"}} width={"100%"} spacing={2}>
              <Box width={{xs: "100%", md: "60%"}}>
                <Typography variant={"h5"} fontWeight={600} color={theme.palette.primary.main} my={2}>
                  2. Eat a Healthy Meal
                </Typography>
                <Typography component={"p"}>
                  Have a balanced meal before donating. Avoid fatty foods as they can affect the tests done on your blood.
                </Typography>
              </Box>
            </Stack>
          </Stack>

          {/*Tip 3*/}
          <Stack alignItems={"center"} direction={{xs: "column-reverse", md: "row"}}>
            <Stack direction={"column"} alignItems={{xs: "center", md: "start"}} width={"100%"} spacing={2}>
              <Box width={{xs: "100%", md: "60%"}}>
                <Typography variant={"h5"} fontWeight={600} color={theme.palette.primary.main} my={2}>
                  3. Get Plenty of Rest
                </Typography>
                <Typography component={"p"}>
                  Ensure you have a good night&apos;s sleep before your donation day. Being well-rested can make you feel more comfortable during and after the donation.
                </Typography>
              </Box>
            </Stack>
            <Stack direction={"row"} justifyContent={{xs: "center", md: "start"}}>
              <Image src={assets.images.donationTip3} alt={"tips"} width={250} height={250} priority />
            </Stack>
          </Stack>

          {/*Tip 4*/}
          <Stack alignItems={"center"} direction={{xs: "column", md: "row"}} justifyContent={{xs: "center", md: "space-between"}}>
            <Stack direction={"row"} justifyContent={{xs: "center", md: "start"}}>
              <Image src={assets.images.donationTip4} alt={"tips"} width={250} height={250} priority />
            </Stack>
            <Stack direction={"column"} alignItems={{xs: "center", md: "end"}} width={"100%"} spacing={2}>
              <Box width={{xs: "100%", md: "60%"}}>
                <Typography variant={"h5"} fontWeight={600} color={theme.palette.primary.main} my={2}>
                  4. Avoid Heavy Exercise
                </Typography>
                <Typography component={"p"}>
                  Refrain from strenuous physical activities before and after donating. Give your body some time to recover.
                </Typography>
              </Box>
            </Stack>
          </Stack>

          {/*Tip 5*/}
          <Stack alignItems={"center"} direction={{xs: "column-reverse", md: "row"}}>
            <Stack direction={"column"} alignItems={{xs: "center", md: "start"}} width={"100%"} spacing={2}>
              <Box width={{xs: "100%", md: "60%"}}>
                <Typography variant={"h5"} fontWeight={600} color={theme.palette.primary.main} my={2}>
                  5. Iron-Rich Foods
                </Typography>
                <Typography component={"p"}>
                  Include iron-rich foods in your diet in the weeks leading up to your donation. Foods like spinach, red meat, and legumes can help maintain healthy iron levels.
                </Typography>
              </Box>
            </Stack>
            <Stack direction={"row"} justifyContent={{xs: "center", md: "start"}}>
              <Image src={assets.images.donationTip5} alt={"tips"} width={250} height={250} priority />
            </Stack>
          </Stack>

          {/*Tip 6*/}
          <Stack direction={{xs: "column", md: "row"}} justifyContent={{xs: "center", md: "space-between"}} alignItems={"center"}>
            <Stack direction={"row"} justifyContent={{xs: "center", md: "start"}}>
              <Image src={assets.images.donationTip6} alt={"tips"} width={250} height={250} priority />
            </Stack>
            <Stack direction={"column"} alignItems={{xs: "center", md: "end"}} width={"100%"} spacing={2}>
              <Box width={{xs: "100%", md: "60%"}}>
                <Typography variant={"h5"} fontWeight={600} color={theme.palette.primary.main} my={2}>
                  6. Stay Relaxed
                </Typography>
                <Typography component={"p"}>
                  Try to stay calm and relaxed. Take deep breaths if you feel anxious. The staff at the donation center are there to assist you and make the process as comfortable as possible.
                </Typography>
              </Box>
            </Stack>
          </Stack>

          {/*Tip 7*/}
          <Stack direction={{xs: "column-reverse", md: "row"}} alignItems={"center"}>
            <Stack direction={"column"} alignItems={{xs: "center", md: "start"}} spacing={2} width={"100%"}>
              <Box width={{xs: "100%", md: "60%"}}>
                <Typography variant={"h5"} fontWeight={600} color={theme.palette.primary.main} my={2}>
                  7. Follow Post-Donation Care
                </Typography>
                <Typography component={"p"}>
                  After donating, follow the care instructions provided by the donation center. Typically, this includes resting for a short period and having a snack and drink to replenish your energy.
                </Typography>
              </Box>
            </Stack>
            <Stack direction={"row"} justifyContent={{xs: "center", md: "start"}}>
              <Image src={assets.images.donationTip7} alt={"tips"} width={250} height={250} priority />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </section>
  );
};

export default DonationTips;