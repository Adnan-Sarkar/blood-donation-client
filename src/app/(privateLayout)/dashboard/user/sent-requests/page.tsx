"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Avatar, Box, Button, Chip, Pagination, Stack } from "@mui/material";
import { useGetMyBloodRequestsQuery } from "@/redux/api/donorApi";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { TDonationSentRequest } from "@/types";
import RequestDetailsModal from "@/app/(privateLayout)/dashboard/user/sent-requests/components/RequestDetailsModal";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { generateBloodTypeInShort } from "@/utils/generateBloodTypeInShort";
import { useGetUserReviewQuery } from "@/redux/api/reviewApi";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import RatingModal from "@/components/Rating/RatingModal";

const SentBloodRequestsPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = React.useState(false);
  const [requestInfo, setRequestInfo] = React.useState<TDonationSentRequest>();
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);

  const query: Record<string, any> = {
    page,
    limit
  };

  const {data, isLoading} = useGetMyBloodRequestsQuery(query);
  const {data: myReview} = useGetUserReviewQuery({});

  let requestsData;
  if (data?.data && !isLoading) {
    requestsData = data?.data.map((request: TDonationSentRequest, index: number) => {
      return {
        ...request,
        name: request.donor.name,
        bloodType: request.donor.bloodType,
        rowSerial: (index + 1)
      }
    });
  }

  let pageCount: number = 1;
  if (data?.meta?.total) {
    pageCount = Math.ceil(data?.meta?.total / limit);
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRequestDetails = (request: TDonationSentRequest) => {
    setIsModalOpen(true);
    setRequestInfo(request);
  }

  const columns: GridColDef[] = [
    { field: 'rowSerial', headerName: 'Serial',},
    {
      field: 'profilePicture',
      headerName: 'Donor Profile',
      flex: 1,
      cellClassName: "flex items-center justify-center",
      renderCell: ({row}) => {
        return (
          <Avatar
            alt="profile"
            src={row?.donor?.profilePicture}
            sx={{ width: 70, height: 70 }}
            variant="rounded"
          />
        );
      },
    },
    { field: 'name', headerName: 'Donor Name', flex: 1 },
    {
      field: 'bloodType',
      headerName: 'Blood Group',
      flex: 1,
      renderCell: ({row}) => {
        return (
          <Box>
            {generateBloodTypeInShort(row?.bloodType)}
          </Box>
        );
      },
    },
    { field: 'dateOfDonation', headerName: 'Donation Date', flex: 1 },
    { field: 'timeOfDonation', headerName: 'Donation Time', flex: 1 },
    {
      field: 'requestStatus',
      headerName: 'Status',
      flex: 1,
      cellClassName: "flex items-center justify-center",
      renderCell: ({row}) => {
        if (row?.requestStatus === "PENDING") {
          return (
            <Chip icon={<HourglassTopOutlinedIcon fontSize={"small"} />} variant={"outlined"} label={row?.requestStatus} color="warning" />
          );
        }
        else if (row?.requestStatus === "APPROVED") {
          return (
            <Chip icon={<CheckCircleOutlineOutlinedIcon fontSize={"small"} /> } variant={"outlined"} label={row?.requestStatus} color="success" />
          );
        }
        else {
          return (
            <Chip icon={<CancelOutlinedIcon fontSize={"small"} />} variant={"outlined"} label={row?.requestStatus} color="error" />
          );
        }
      },
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 2,
      headerAlign: "center",
      align: "center",
      cellClassName: "flex items-center justify-center",
      renderCell: ({row}) => {
        return (
          <Stack direction={"row"} spacing={1}>
            <Button onClick={() => handleRequestDetails(row)}>
              <VisibilityOutlinedIcon />
              <Box mx={0.5}></Box>
              Details
            </Button>
            {
              (row?.iscompleted && row?.requestStatus === "APPROVED") &&
              (!myReview?.id &&
                <Button onClick={() => setIsRatingModalOpen(true)}>
                  <GradeOutlinedIcon />
                  <Box mx={0.5}></Box>
                  Rating
                </Button>)
            }
          </Stack>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {
        <RequestDetailsModal open={isModalOpen} setOpen={setIsModalOpen} requestInfo={requestInfo as TDonationSentRequest}/>
      }
      {
        <RatingModal open={isRatingModalOpen} setOpen={setIsRatingModalOpen} />
      }
      <DataGrid
        rowHeight={100}
        rows={isLoading ? [] : requestsData || []}
        columns={columns}
        hideFooterPagination={true}
        loading={isLoading}
        autoHeight={true}
        rowSelection={false}
        slots={{
          footer: () => {
            return <Box
              sx={
                {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2
                }
              }
            ><Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color={"primary"}/>
            </Box>
          }
        }}
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: ' none'
          },
        }}
      />
    </Box>
  );
};

export default SentBloodRequestsPage;