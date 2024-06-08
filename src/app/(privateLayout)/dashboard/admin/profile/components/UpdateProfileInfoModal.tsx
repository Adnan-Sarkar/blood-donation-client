import React from "react";
import CustomFullScreenModal from "@/components/modal/CustomFullScreenModal";
import CustomForm from "@/components/form-components/CustomForm";
import { FieldValues } from "react-hook-form";
import { Button, Grid, Stack } from "@mui/material";
import CustomInputField from "@/components/form-components/CustomInputField";
import { TUser } from "@/types";
import CustomSelect from "@/components/form-components/CustomSelect";
import CustomDatePicker from "@/components/form-components/CustomDatePicker";
import { useUpdateUserInfoMutation } from "@/redux/api/userApi";
import toast from "react-hot-toast";
import dateFormatter from "@/utils/dateFormatter";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: TUser
};

const UpdateProfileInfoModal = ({open, setOpen, userInfo}: TProps) => {
  const [updateUserInfo, {isLoading: isUpdatingUserInfo}] = useUpdateUserInfoMutation();

  const handleUpdateProfileInfo = async (values: FieldValues) => {
    if (values?.userProfile?.lastDonationDate) {
      values.userProfile.lastDonationDate = dateFormatter(values.userProfile.lastDonationDate);
    }
    if (values?.userProfile?.age) {
      values.userProfile.age = Number(values.userProfile.age);
    }
    if (values?.user?.availability) {
      values.user.availability = values.user.availability === "True";
    }

    const toastId = toast.loading("Uploading...", {
      id: "uploading",
    });
    try {
      const res = await updateUserInfo(values).unwrap();

      if (res?.success && res?.statusCode === 200) {
        toast.success("Profile Information Updated Successfully", {
          id: toastId,
        });
      }
      else {
        throw new Error("Something went wrong! Please try again later.");
      }
    }
    catch (error: any) {
      toast.error(error.message, {
        id: toastId,
      });
    }

    setOpen(false);
  }

  const defaultValues = {
    user: {
      contactNumber: userInfo.contactNumber,
      location: userInfo.location,
      availability: userInfo.availability.toString().charAt(0).toUpperCase() + userInfo.availability.toString().slice(1),
    },
    userProfile: {
      age: userInfo.userProfile.age,
      bio: userInfo.userProfile.bio,
      lastDonationDate: userInfo.userProfile.lastDonationDate
    }
  }

  return (
    <CustomFullScreenModal title={"Update Profile Information"} open={open} setOpen={setOpen}>
      <CustomForm onSubmit={handleUpdateProfileInfo} defaultValues={defaultValues}>
        <Grid container spacing={{sm: 1, md: 2, lg: 4}}>
          <Grid item xs={12} md={6}>
            <CustomInputField name="userProfile.age" label="Age" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomInputField name="userProfile.bio" label="Bio" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomInputField name="user.contactNumber" label="Contact Number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomInputField name="user.location" label="Location" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomDatePicker name={"userProfile.lastDonationDate"} label={"Last Donation Date"} disablePast={false} size={"small"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomSelect name={"user.availability"} items={["True", "False"]} label={"Available"} />
          </Grid>
          <Grid item xs={12}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
              <Button type={"submit"} sx={{width: "290px"}} disabled={isUpdatingUserInfo}>Update Information</Button>
            </Stack>
          </Grid>
        </Grid>
      </CustomForm>
    </CustomFullScreenModal>
  );
};

export default UpdateProfileInfoModal;