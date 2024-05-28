export const uploadFileIntoCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "blood-donation");
  formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string);

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL as string, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result?.secure_url;
  }
  catch (error: any) {
    return error;
  }
}