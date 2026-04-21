"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Heart,
  Building2,
  MapPin,
  Phone,
  Calendar,
  Clock,
  FileText,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth/auth-context";
import { createDonationRequest } from "@/lib/api/donation.api";
import {
  donationRequestValidationSchema,
  TDonationRequestForm,
} from "./donationRequestValidationSchema";

export default function DonationRequestPage() {
  const { donorId } = useParams<{ donorId: string }>();
  const { accessToken, user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TDonationRequestForm>({
    resolver: zodResolver(donationRequestValidationSchema),
  });

  if (!accessToken || !user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Heart className="h-7 w-7 text-primary" />
        </div>
        <div>
          <p className="text-base font-semibold text-foreground">
            Login required
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            You need to be logged in to send a donation request.
          </p>
        </div>
        <Link href="/login">
          <Button>Log in</Button>
        </Link>
      </div>
    );
  }

  const onSubmit = async (data: TDonationRequestForm) => {
    setIsSubmitting(true);
    try {
      await createDonationRequest(
        {
          donorId,
          phoneNumber: data.phoneNumber,
          hospitalName: data.hospitalName,
          hospitalAddress: data.hospitalAddress,
          reason: data.reason,
          dateOfDonation: data.dateOfDonation ?? "",
          timeOfDonation: data.timeOfDonation ?? "",
        },
        accessToken,
      );
      toast.success("Donation request sent successfully!");
      router.push("/dashboard/user/sent-requests");
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send request",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Back link */}
      <Link
        href={`/donor-details/${donorId}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to donor profile
      </Link>

      {/* Page header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
          <Heart className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Request Donation
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Fill in the details below to send a blood donation request.
          </p>
        </div>
      </div>

      <Card className="border-border">
        <CardContent className="p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Contact Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  id="phoneNumber"
                  placeholder="10–15 digit number"
                  className="pl-9"
                  aria-invalid={!!errors.phoneNumber}
                  {...register("phoneNumber")}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-xs text-destructive">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <Separator />

            {/* Hospital name */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="hospitalName" className="text-sm font-medium">
                Hospital Name
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  id="hospitalName"
                  placeholder="Name of the hospital"
                  className="pl-9"
                  aria-invalid={!!errors.hospitalName}
                  {...register("hospitalName")}
                />
              </div>
              {errors.hospitalName && (
                <p className="text-xs text-destructive">
                  {errors.hospitalName.message}
                </p>
              )}
            </div>

            {/* Hospital address */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="hospitalAddress" className="text-sm font-medium">
                Hospital Address
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  id="hospitalAddress"
                  placeholder="Full hospital address"
                  className="pl-9"
                  aria-invalid={!!errors.hospitalAddress}
                  {...register("hospitalAddress")}
                />
              </div>
              {errors.hospitalAddress && (
                <p className="text-xs text-destructive">
                  {errors.hospitalAddress.message}
                </p>
              )}
            </div>

            <Separator />

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="dateOfDonation" className="text-sm font-medium">
                  Date of Donation
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="dateOfDonation"
                    type="date"
                    className="pl-9"
                    {...register("dateOfDonation")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="timeOfDonation" className="text-sm font-medium">
                  Time of Donation
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="timeOfDonation"
                    type="time"
                    className="pl-9"
                    {...register("timeOfDonation")}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Reason */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reason" className="text-sm font-medium">
                Reason for Request
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Textarea
                  id="reason"
                  placeholder="Briefly describe why you need a blood donation…"
                  className="pl-9 min-h-[100px] resize-none"
                  aria-invalid={!!errors.reason}
                  {...register("reason")}
                />
              </div>
              {errors.reason && (
                <p className="text-xs text-destructive">
                  {errors.reason.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4" />
                    Send Request
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
