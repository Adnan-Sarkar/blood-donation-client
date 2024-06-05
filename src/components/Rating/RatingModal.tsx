import React from "react";
import CustomModal from "@/components/modal/CustomModal";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomForm from "@/components/form-components/CustomForm";
import { FieldValues } from "react-hook-form";
import CustomRatingInput from "@/components/form-components/CustomRatingInput";
import CustomInputField from "@/components/form-components/CustomInputField";
import toast from "react-hot-toast";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RatingModal = ({open, setOpen}: TProps) => {

  const [createReview] = useCreateReviewMutation();

  const handleRating = async (values: FieldValues) => {
    console.log(values);
    const toastId = toast.loading("Submitting...", {
      id: "submitting",
    });
    try {
      const res = await createReview({
        rating: values.rating,
        comment: values.comment
      }).unwrap();
      console.log(res);
      toast.success("Submitted successfully", {
        id: toastId,
      });
    }
    catch (error: any) {
      toast.error(error.message, {
        id: toastId,
      });
    }

    setOpen(false);
  };

  return (
    <CustomModal title={"Give a Rating"} open={open} setOpen={setOpen} >
      <Box width={{xs: "300px", md: "500px"}}>
        <Stack direction={"row"} justifyContent={"center"}>
          <Typography component={"p"}>Share any additional thoughts or feedback about your experience.</Typography>
        </Stack>
        <CustomForm onSubmit={handleRating} >
          <Stack direction={"row"} justifyContent={"center"} my={4}>
            <CustomRatingInput name={"rating"} size={"large"} />
          </Stack>
          <Stack direction={"row"} justifyContent={"center"} my={2}>
            <CustomInputField name={"comment"} label={"Comment"} />
          </Stack>
          <Button type={"submit"} fullWidth={true}>Submit</Button>
        </CustomForm>
      </Box>
    </CustomModal>
  );
};

export default RatingModal;