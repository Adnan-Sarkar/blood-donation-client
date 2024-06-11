"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import CustomForm from "@/components/form-components/CustomForm";
import CustomInputField from "@/components/form-components/CustomInputField";
import { FieldValues } from "react-hook-form";
import CustomSelect from "@/components/form-components/CustomSelect";
import { BloodGroups } from "@/constant/bloodGroups";
import { Gender } from "@/constant/gender";
import { registrationValidationSchema } from "@/app/(publicLayout)/registration/registrationValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/actions/registerUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";


const RegistrationPage = () => {
  const router = useRouter();
  const handleRegistration = async (data: FieldValues) => {
    const toastId = toast.loading("Please wait...", {
      id: "registration",
    });
    try {
      const res = await registerUser(data);
      if (res.success && res.statusCode === 201) {
        toast.success("Registration Successful", { id: toastId });
        router.push("/login");
      }
      else {
        toast.error(res.message, { id: toastId });
      }
    }
    catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

    return (
        <Container>
          <Box my={{xs: 5, md: 6}} p={6} sx={{
            background: "#FAF9F6",
            borderRadius: 3,
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          }}>
            <Box display={"flex"} justifyContent={"center"} pb={3}>
              <Typography  variant={"h4"}>Registration</Typography>
            </Box>
            <Stack direction={{xs: "column", md: "row"}} spacing={{xs: 2, md: 3}} >
              <CustomForm onSubmit={handleRegistration} resolver={zodResolver(registrationValidationSchema)}>
                <Grid container spacing={2} >
                  <Grid item xs={12} md={6}>
                    <CustomInputField name="name" label="Name" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomInputField name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomInputField name="password" label="Password" type={"password"} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSelect name={"gender"} items={Gender} label={"Gender"}/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomInputField name="location" label="Location" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSelect name={"bloodType"} items={BloodGroups} label={"Blood Group"}/>
                  </Grid>
                  <Grid item xs={12} md={12} justifyContent={"center"}>
                    <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                      <Button type={"submit"} color={"secondary"} size={"large"} sx={{width: "300px"}}>Registration</Button>
                      <Typography mt={2} component={"p"} fontWeight={400}>Do you have an account? <Link href={"/login"}><Typography component={"span"} fontWeight={500} color={"secondary"}>login</Typography></Link></Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CustomForm>
            </Stack>
          </Box>
        </Container>
    );
};

export default RegistrationPage;