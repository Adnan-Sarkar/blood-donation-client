"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import CustomForm from "@/components/form-components/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInputField from "@/components/form-components/CustomInputField";
import { FieldValues } from "react-hook-form";
import Link from "next/link";
import { loginValidationSchema } from "@/app/(publicLayout)/login/loginValidationSchema";
import toast from "react-hot-toast";
import { loginUser } from "@/services/actions/loginUser";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.services";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/user/userSlice";


const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = async(values: FieldValues) => {
    const toastId = toast.loading("Logging in...", {
      id: "login",
    });

    try {
      const res = await loginUser(values);
      if (res.success && res.statusCode === 200) {
        if (res?.data?.status === "BLOCKED") {
          throw new Error("Your Account is blocked! Please contact admin");
        }

        toast.success("Login Successful", {
          id: toastId,
        });
        storeUserInfo(res?.data?.result?.token);
        dispatch(setUser({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          token: res.data.token
        }))
        router.push("/");
      } else {
        toast.error(res.message, {
          id: toastId,
        });
      }
    }
    catch (error: any) {
      toast.error(error.message, {
        id: toastId,
      });
    }
  };


  return (
    <Container>
      <Box my={{xs: 5, md: 13}} p={6} sx={{
        background: "#FAF9F6",
        borderRadius: 3,
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      }}>
        <Box display={"flex"} justifyContent={"center"} pb={3}>
          <Typography  variant={"h4"}>Login</Typography>
        </Box>
        <Stack direction={{xs: "column", md: "row"}} spacing={{xs: 2, md: 3}} justifyContent={"center"} >
          <CustomForm onSubmit={handleLogin} resolver={zodResolver(loginValidationSchema)}>
            <Grid container spacing={2} >
              <Grid item xs={12} md={6}>
                <CustomInputField name="email" label="Email" />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputField name="password" label="Password" type={"password"} />
              </Grid>
              <Grid item xs={12} md={12} justifyContent={"center"}>
                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                  <Button type={"submit"} color={"secondary"} size={"large"} sx={{width: "300px"}}>Login</Button>
                  <Typography mt={2} component={"p"} fontWeight={400}>Don&apos;t you have an account? <Link href={"/registration"}><Typography component={"span"} fontWeight={500} color={"secondary"}>Registration</Typography></Link></Typography>
                </Stack>
              </Grid>
            </Grid>
          </CustomForm>
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginPage;