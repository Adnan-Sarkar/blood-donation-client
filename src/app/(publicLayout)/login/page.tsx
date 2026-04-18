"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Droplets, Heart, Users, Shield } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/lib/auth/auth-context";
import { loginUser } from "@/services/actions/loginUser";
import type { TJWTPayload } from "@/types";

const loginSchema = z.object({
  email: z.email({ error: "Enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const BRAND_STATS = [
  { icon: Users, value: "10K+", label: "Active Donors" },
  { icon: Heart, value: "50K+", label: "Lives Saved" },
  { icon: Shield, value: "100%", label: "Verified Platform" },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await loginUser(data);

      if (!res?.success) {
        toast.error(
          res?.message ?? "Login failed. Please check your credentials.",
        );
        return;
      }

      if (res?.data?.status === "BLOCKED") {
        toast.error("Your account has been blocked. Please contact support.");
        return;
      }

      const token: string | undefined = res.data?.token;
      if (token) {
        setToken(token);
        const { role } = jwtDecode<TJWTPayload>(token);
        const dest =
          role === "ADMIN"
            ? "/dashboard/admin"
            : role === "SUPER_ADMIN"
              ? "/dashboard/super_admin"
              : "/dashboard/user";
        toast.success("Welcome back!");
        router.push(dest);
      } else {
        toast.success("Welcome back!");
        router.push("/");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* Login form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-2">
            <Droplets className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">
              Life<span className="text-primary">Flow</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your account to find donors or manage your requests.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  autoComplete="current-password"
                  className="pr-10"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-1 w-full bg-primary text-primary-foreground hover:bg-primary-hover"
              disabled={isLoading}
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/registration"
              className="font-medium text-primary hover:underline"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>

      {/* Right side stats */}
      <div className="hidden flex-col justify-center bg-primary px-12 py-16 text-primary-foreground lg:flex lg:w-[42%]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Droplets className="h-12 w-12 opacity-80" />
            <blockquote className="text-2xl font-bold leading-snug">
              &ldquo;The gift of blood is the gift of life. There is no greater
              gift one human being can give another.&rdquo;
            </blockquote>
            <p className="text-sm opacity-70">— World Health Organization</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {BRAND_STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col gap-1 rounded-xl bg-primary-foreground/10 p-4"
              >
                <Icon className="h-5 w-5 opacity-70" />
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs opacity-70">{label}</p>
              </div>
            ))}
          </div>

          <p className="text-sm leading-relaxed opacity-70">
            Join thousands of donors who are already making a difference. Your
            single donation can save up to three lives.
          </p>
        </div>
      </div>
    </div>
  );
}
