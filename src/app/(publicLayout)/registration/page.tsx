"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  Droplets,
  CheckCircle2,
  Upload,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { registerUser } from "@/services/actions/registerUser";
import { uploadFileIntoCloudinary } from "@/services/actions/uploadFileIntoCloudinary";
import { BloodGroups } from "@/constant/bloodGroups";
import { Gender } from "@/constant/gender";

const BLOOD_TYPE_LABELS: Record<string, string> = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A−",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B−",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB−",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O−",
};

const step1Schema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ error: "Enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const step2Schema = z.object({
  bloodType: z.enum(BloodGroups as [string, ...string[]], {
    error: "Select a blood type",
  }),
  gender: z.enum(Gender as [string, ...string[]], {
    error: "Select a gender",
  }),
  location: z.string().min(1, { message: "Location is required" }),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

type FormData = Step1Data & Step2Data & { profilePicture?: string };

const STEPS = ["Account", "Medical Profile", "Photo (Optional)"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((label, idx) => (
        <div key={label} className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all",
              idx < current
                ? "bg-primary text-primary-foreground"
                : idx === current
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : "bg-surface text-muted-foreground border border-border",
            )}
          >
            {idx < current ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
          </div>
          <span
            className={cn(
              "hidden text-xs font-medium sm:block",
              idx === current ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {label}
          </span>
          {idx < STEPS.length - 1 && (
            <div
              className={cn(
                "h-px w-8 sm:w-12 transition-colors",
                idx < current ? "bg-primary" : "bg-border",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function RegistrationPage() {
  const [step, setStep] = useState(0);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: step1Data ?? undefined,
  });

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: step2Data ?? undefined,
  });

  const handleStep1 = async (data: Step1Data) => {
    setStep1Data(data);
    setStep(1);
  };

  const handleStep2 = async (data: Step2Data) => {
    setStep2Data(data);
    setStep(2);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    try {
      const url = await uploadFileIntoCloudinary(file);
      if (url) {
        setProfilePicture(url);
      } else {
        toast.error("Photo upload failed. You can skip this step.");
      }
    } catch {
      toast.error("Photo upload failed. You can skip this step.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!step1Data || !step2Data) return;
    setSubmitting(true);

    const payload: FormData = {
      ...step1Data,
      ...step2Data,
      ...(profilePicture ? { profilePicture } : {}),
    };

    const { confirmPassword: _unused, ...registrationPayload } = payload;
    void _unused;

    try {
      const res = await registerUser(registrationPayload);

      if (!res?.success) {
        toast.error(res?.message ?? "Registration failed. Please try again.");
        setStep(0);
        return;
      }

      toast.success("Account created! Please sign in.");
      router.push("/login");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-start justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <Droplets className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">
              Life<span className="text-primary">Flow</span>
            </span>
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Create your account
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Join the community and start saving lives.
            </p>
          </div>
          <StepIndicator current={step} />
        </div>

        {/* Step 1 — Account credentials */}
        {step === 0 && (
          <form
            onSubmit={form1.handleSubmit(handleStep1)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...form1.register("name")}
                aria-invalid={!!form1.formState.errors.name}
              />
              {form1.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {form1.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reg-email">Email address</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...form1.register("email")}
                aria-invalid={!!form1.formState.errors.email}
              />
              {form1.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {form1.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reg-password">Password</Label>
              <div className="relative">
                <Input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="pr-10"
                  {...form1.register("password")}
                  aria-invalid={!!form1.formState.errors.password}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide" : "Show"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {form1.formState.errors.password && (
                <p className="text-xs text-destructive">
                  {form1.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  className="pr-10"
                  {...form1.register("confirmPassword")}
                  aria-invalid={!!form1.formState.errors.confirmPassword}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Hide" : "Show"}
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {form1.formState.errors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {form1.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-1 w-full bg-primary text-primary-foreground hover:bg-primary-hover gap-2"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        )}

        {/* Step 2 — Medical profile */}
        {step === 1 && (
          <form
            onSubmit={form2.handleSubmit(handleStep2)}
            className="flex flex-col gap-6"
          >
            {/* Blood type visual selector */}
            <div className="flex flex-col gap-2">
              <Label>Blood type</Label>
              <div className="grid grid-cols-4 gap-2">
                {BloodGroups.map((type) => {
                  const selected = form2.watch("bloodType") === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        form2.setValue("bloodType", type, {
                          shouldValidate: true,
                        })
                      }
                      className={cn(
                        "flex h-12 items-center justify-center rounded-xl border text-sm font-bold transition-all",
                        selected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border hover:border-primary hover:text-primary",
                      )}
                    >
                      {BLOOD_TYPE_LABELS[type] ?? type}
                    </button>
                  );
                })}
              </div>
              {form2.formState.errors.bloodType && (
                <p className="text-xs text-destructive">
                  {form2.formState.errors.bloodType.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2">
              <Label>Gender</Label>
              <div className="grid grid-cols-2 gap-2">
                {Gender.map((g) => {
                  const selected = form2.watch("gender") === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() =>
                        form2.setValue("gender", g, { shouldValidate: true })
                      }
                      className={cn(
                        "flex h-11 items-center justify-center rounded-xl border text-sm font-medium transition-all",
                        selected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border hover:border-primary hover:text-primary",
                      )}
                    >
                      {g === "MALE" ? "Male" : "Female"}
                    </button>
                  );
                })}
              </div>
              {form2.formState.errors.gender && (
                <p className="text-xs text-destructive">
                  {form2.formState.errors.gender.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Dhaka, Bangladesh"
                {...form2.register("location")}
                aria-invalid={!!form2.formState.errors.location}
              />
              {form2.formState.errors.location && (
                <p className="text-xs text-destructive">
                  {form2.formState.errors.location.message}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => setStep(0)}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary-hover gap-2"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        )}

        {/* Step 3 — Profile photo */}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label>Profile photo</Label>
              <p className="text-sm text-muted-foreground">
                Add a photo to help donors and patients recognise you. This step
                is optional.
              </p>

              {/* Upload area */}
              {previewUrl ? (
                <div className="relative mt-2 flex flex-col items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="h-32 w-32 rounded-full object-cover border-4 border-primary/20"
                  />
                  {uploading && (
                    <p className="text-xs text-muted-foreground animate-pulse">
                      Uploading…
                    </p>
                  )}
                  {!uploading && profilePicture && (
                    <p className="flex items-center gap-1.5 text-xs text-success">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Photo uploaded
                    </p>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-muted-foreground"
                    onClick={() => {
                      setPreviewUrl(null);
                      setProfilePicture(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              ) : (
                <label className="mt-2 flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border p-8 transition-colors hover:border-primary hover:bg-surface">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      Click to upload a photo
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP — max 5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => setStep(1)}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="button"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary-hover"
                onClick={handleSubmit}
                disabled={submitting || uploading}
              >
                {submitting ? "Creating account…" : "Create Account"}
              </Button>
            </div>

            <button
              type="button"
              className="text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleSubmit}
              disabled={submitting}
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
