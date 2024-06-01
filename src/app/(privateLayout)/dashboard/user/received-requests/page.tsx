"use client";

import React from "react";
import { TDonationReceivedRequest } from "@/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Avatar, Box, Button, Chip, Pagination } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useGetMyReceivedRequestsQuery, useUpdateReceivedRequestMutation } from "@/redux/api/donorApi";
import ReceivedRequestDetailsModal
  from "@/app/(privateLayout)/dashboard/user/received-requests/components/ReceivedRequestDetailsModal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import toast from "react-hot-toast";

const ReceivedBloodRequestsPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [requestInfo, setRequestInfo] = React.useState<TDonationReceivedRequest>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);

  const query: Record<string, any> = {
    page,
    limit
  };

  const {data, isLoading} = useGetMyReceivedRequestsQuery(query);
  const [updateReceivedRequestStatus] = useUpdateReceivedRequestMutation();

  let receivedRequestsData;
  if (data?.data && !isLoading) {
    receivedRequestsData = data?.data.map((request: TDonationReceivedRequest, index: number) => {
      return {
        ...request,
        name: request.requester.name,
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

  const handleReceivedRequestDetails = (request: TDonationReceivedRequest) => {
    setIsModalOpen(true);
    setRequestInfo(request);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = async (status: string, id: string) => {
    const toastId = toast.loading("Changing Status...", {
      id: "toastId"
    })
    try {
      const res = await updateReceivedRequestStatus({
        id,
        status
      });
      console.log(res);
      toast.success("Status Changed successfully", {
        id: toastId
      });
    }
    catch (error: any) {
      console.log(error);
    }
    finally {
    handleClose();
    }
  }

  const open = Boolean(anchorEl);

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
            src={row?.requester?.profilePicture}
            sx={{ width: 70, height: 70 }}
            variant="rounded"
          />
        );
      },
    },
    { field: 'name', headerName: 'Donor Name', flex: 1 },
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
      field: 'changeStatus',
      headerName: 'Change Status',
      flex: 1,
      cellClassName: "flex items-center justify-center",
      renderCell: ({row}) => {
        return (
          <Box>
            <Button
              variant={"outlined"}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Change Status
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button"
              }}
            >
              <MenuItem onClick={() => handleChangeStatus("APPROVED", row.id)}>APPROVED</MenuItem>
              <MenuItem onClick={() => handleChangeStatus("REJECTED", row.id)}>REJECTED</MenuItem>
            </Menu>
          </Box>
        )
      }
    },
    {
      field: "action",
      headerName: "View Details",
      flex: 1,
      cellClassName: "flex items-center justify-center",
      renderCell: ({ row }) => {
        return (
          <Button onClick={() => handleReceivedRequestDetails(row)}>
            <VisibilityOutlinedIcon />
            <Box mx={0.5}></Box>
            Details
          </Button>
        );
      }
    }
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {
        <ReceivedRequestDetailsModal open={isModalOpen} setOpen={setIsModalOpen}
                                     receivedRequestInfo={requestInfo as TDonationReceivedRequest} />
      }
      <DataGrid
        rowHeight={100}
        rows={isLoading ? [] : receivedRequestsData || []}
        columns={columns}
        hideFooterPagination={true}
        loading={isLoading}
        getRowId={(row) => row.id}
        autoHeight={true}
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
      />
    </Box>
  );
};

export default ReceivedBloodRequestsPage;