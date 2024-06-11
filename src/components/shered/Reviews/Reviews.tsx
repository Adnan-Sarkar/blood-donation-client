"use client";

import React from "react";
import { Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import Slider from "react-slick";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { useTheme } from "@mui/material/styles";
import ReviewCard from "@/components/shered/Reviews/ReviewCard";
import { TDonationSentRequest } from "@/types/review-types";


const Reviews = () => {
  const theme = useTheme();
  const {data: reviews, isLoading} = useGetAllReviewsQuery({});

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rows: 1
  };

  return (
    <section  style={{padding: "50px 0"}}>
      <Container>
        <Stack direction={"column"} mb={6}>
          <Typography variant={"h3"} fontWeight={600} color={theme.palette.primary.main}>Feedback From Our Heroes</Typography>
        </Stack>
        {
          isLoading ? <CircularProgress size={"large"} /> :
            <Box py={4}>
              <Slider {...settings}>
                {
                  reviews && reviews.map((review: TDonationSentRequest) => {
                    return (
                      <ReviewCard key={review?.id} reviewData={review} />
                    )
                  })
                }
              </Slider>
            </Box>
        }
      </Container>
    </section>
  )
  };

  export default Reviews;