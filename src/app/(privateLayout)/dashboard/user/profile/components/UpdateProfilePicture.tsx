import React from "react";
import SingleFileUploader from "@/components/form-components/SingleFileUploader";
import toast from "react-hot-toast";
import { uploadFileIntoCloudinary } from "@/services/actions/uploadFileIntoCloudinary";
import { useUpdateUserInfoMutation } from "@/redux/api/userApi";

const UpdateProfilePicture = () => {
  const [updateUserInfo, {isLoading: isUpdatingUserInfo}] = useUpdateUserInfoMutation();
  
  const handleUploadProfilePicture = async (file: File) => {
    const toastId = toast.loading("Uploading...", {
      id: "uploading",
    });
    try {
      const imageUrl = await uploadFileIntoCloudinary(file);
      const res = await updateUserInfo({
        user: {
          profilePicture: imageUrl
        }
      }).unwrap();

      if (res?.success && res?.statusCode === 200) {
        toast.success("Profile Picture Updated Successfully", {
          id: toastId,
        });
      }
      else {
        throw new Error("Something went wrong");
      }
    }
    catch (error: any) {
      toast.error(error.message, {
        id: toastId,
      });
    }
  }

  return (
    <SingleFileUploader onFileUpload={handleUploadProfilePicture} sx={{width: "300px"}} label={"Upload Profile Picture"} disabled={isUpdatingUserInfo} />
  );
};

export default UpdateProfilePicture;