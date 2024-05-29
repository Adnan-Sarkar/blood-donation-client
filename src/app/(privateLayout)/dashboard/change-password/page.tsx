"use client";

import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import CustomForm from "@/components/form-components/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInputField from "@/components/form-components/CustomInputField";
import { FieldValues } from "react-hook-form";
import {
  changePasswordValidationSchema
} from "@/app/(privateLayout)/dashboard/change-password/changePasswordValidationSchema";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "@/redux/api/userApi";

const ChangePasswordPage = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChangePassword = async (values: FieldValues) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Confirm password do not match");
      return;
    }

    if (values.newPassword === values.oldPassword) {
      toast.error("New password cannot be same as old password");
      return;
    }

    const toastId = toast.loading("Changing password...", {
      id: "change-password",
    });

    try {
      const res = await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();

      if (res?.success && res?.statusCode === 200) {
        toast.success("Password changed successfully", {
          id: toastId,
        });
      } else {
        toast.error(res?.message, {
          id: toastId,
        });
      }
    }
    catch (error: any) {
      toast.error(error.data, {
        id: toastId,
      });
    }
  }

  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  return (
    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} sx={{ width: "100%", height: "100%" }}>
      <Box p={{xs: 1, sm: 2, md: 6}} sx={{
        background: "#FAF9F6",
        borderRadius: 3,
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      }}>
        <Box display={"flex"} justifyContent={"center"} pb={3}>
          <Typography  variant={"h4"}>Change Password</Typography>
        </Box>
        <Stack direction={{xs: "column", md: "row"}} spacing={{xs: 1, sm: 2, md: 3}} justifyContent={"center"} >
          <CustomForm onSubmit={handleChangePassword} resolver={zodResolver(changePasswordValidationSchema)} defaultValues={defaultValues}>
            <Grid container spacing={2} >
              <Grid item xs={12} md={12}>
                <CustomInputField name="oldPassword" label="Old Password" type={"password"} />
              </Grid>
              <Grid item xs={12} md={12}>
                <CustomInputField name="newPassword" label="New Password" type={"password"} />
              </Grid>
              <Grid item xs={12} md={12}>
                <CustomInputField name="confirmPassword" label="Confirm New Password" type={"password"} />
              </Grid>
              <Grid item xs={12} md={12} justifyContent={"center"}>
                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                  <Button type={"submit"} color={"secondary"} size={"large"} sx={{width: "290px"}} disabled={isLoading}>Change Password</Button>
                </Stack>
              </Grid>
            </Grid>
          </CustomForm>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ChangePasswordPage;