"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Avatar, Box, Button, Chip, Pagination, Stack } from "@mui/material";
import { useGetAllUsersQuery, useUpdateUserStatusMutation } from "@/redux/api/userApi";
import { TUser } from "@/types";
import { generateBloodTypeInShort } from "@/utils/generateBloodTypeInShort";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserDetailsModal from "@/app/(privateLayout)/dashboard/admin/manage-users/components/UserDetailsModal";
import toast from "react-hot-toast";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const ManageUsersPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [userDetailsInfo, setUserDetailsInfo] = React.useState<TUser>();
  const [page, setPage] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentUserId, setCurrentUserId] = React.useState<string | null>(null);
  const [limit] = React.useState(10);


  const query: Record<string, any> = {
    page,
    limit
  };

  const {data, isLoading} = useGetAllUsersQuery(query);
  const [changeUserStatus] = useUpdateUserStatusMutation();

  let userData;
  if (data?.length > 0 && !isLoading) {
    userData = data?.map((request: TUser, index: number) => {
      return {
        ...request,
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

  const handleUserDetails = (userInfo: TUser) => {
    setUserDetailsInfo(userInfo);
    setIsModalOpen(true);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentUserId(null);
  };

  const handleChangeUserStatus = async (status: string) => {
    const toastId = toast.loading("Changing Status...", {
      id: "toastId"
    });

    try {
      const res = await changeUserStatus({
        id: currentUserId,
        status
      });
      toast.success("User status changed successfully", {
        id: toastId
      });
    }
    catch (error: any) {
      toast.error(error.message, {
        id: toastId
      })
    }
    handleClose();
  }

  const open = Boolean(anchorEl);

  const manageUsersColumns: GridColDef[] = [
    { field: 'rowSerial', headerName: 'Serial', maxWidth: 50},
    {
      field: 'profilePicture',
      headerName: 'Picture',

      minWidth: 70,
      cellClassName: "flex items-center justify-center",
      renderCell: ({row}) => {
        return (
          <Avatar
            alt="profile"
            src={row?.profilePicture}
            sx={{ width: 70, height: 70 }}
            variant="rounded"
          />
        );
      },
    },
    { field: 'name', headerName: 'Name',  minWidth: 150 },
    {
      field: 'bloodType',
      headerName: 'Blood Group',

      renderCell: ({row}) => {
        return (
          <Box>
            {generateBloodTypeInShort(row?.bloodType)}
          </Box>
        );
      },
    },
    {
      field: 'email', headerName: 'Email',  minWidth: 200
    },
    {
      field: 'contactNumber', headerName: 'Contact Number',  minWidth: 150
    },
    {
      field: 'location', headerName: 'Location',  minWidth: 150
    },
    {
      field: 'gender', headerName: 'Gender',  minWidth: 50
    },
    {
      field: 'availability', headerName: 'Availability',  minWidth: 50
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      renderCell: ({row}) => {
        if (row?.status === "INACTIVE") {
          return (
            <Chip icon={<HourglassTopOutlinedIcon fontSize={"small"} />} variant={"outlined"} label={row?.status} color="warning" />
          );
        }
        else if (row?.status === "ACTIVE") {
          return (
            <Chip icon={<CheckCircleOutlineOutlinedIcon fontSize={"small"} /> } variant={"outlined"} label={row?.status} color="success" />
          );
        }
        else {
          return (
            <Chip icon={<CancelOutlinedIcon fontSize={"small"} />} variant={"outlined"} label={row?.status} color="error" />
          );
        }
      },
    },
    {
      field: 'userProfile?.age',
      headerName: 'Age',

      renderCell: ({row}) => {
        return (
          <Box>
            {row?.userProfile?.age}
          </Box>
        );
      },
    },
    {
      field: 'userProfile?.lastDonationDate',
      headerName: 'Last Donation Date',

      renderCell: ({row}) => {
        return (
          <Box>
            {row?.userProfile?.lastDonationDate}
          </Box>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Actions',

      minWidth: 350,
      headerAlign: "center",
      align: "center",
      cellClassName: "flex items-center justify-center",
      renderCell: ({row}) => {
        return (
          <Stack direction={"row"} spacing={1}>
            <Button onClick={() => handleUserDetails(row)}>
              <VisibilityOutlinedIcon />
              <Box mx={0.5}></Box>
              Details
            </Button>
            <>
              <Button
                variant={"outlined"}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(event) => handleClick(event, row.id)}
                disabled={row.iscompleted}
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
                <MenuItem onClick={() => handleChangeUserStatus("ACTIVE")}>ACTIVE</MenuItem>
                <MenuItem onClick={() => handleChangeUserStatus("INACTIVE")}>INACTIVE</MenuItem>
                <MenuItem onClick={() => handleChangeUserStatus("BLOCKED")}>BLOCKED</MenuItem>
              </Menu>
            </>
          </Stack>
        );
      },
    },
  ];


  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {
        <UserDetailsModal open={isModalOpen} setOpen={setIsModalOpen} userInfo={userDetailsInfo as TUser} />
      }
      <DataGrid
        rowHeight={100}
        rows={isLoading ? [] : userData || []}
        columns={manageUsersColumns}
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
                  my: 2
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

export default ManageUsersPage;