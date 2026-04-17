"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomRatingInput } from "@/components/form-components/CustomRatingInput";
import { CustomInputField } from "@/components/form-components/CustomInputField";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { createReview } from "@/lib/api/review.api";
import { useAuth } from "@/lib/auth/auth-context";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, { error: "Comment is required" }).max(1000),
});

type TProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function RatingModal({ open, onClose, onSuccess }: TProps) {
  const { accessToken } = useAuth();

  const methods = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "" },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
    if (!accessToken) return;
    try {
      await createReview(values, accessToken);
      toast.success("Review submitted!");
      methods.reset();
      onClose();
      onSuccess?.();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to submit review");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CustomRatingInput name="rating" label="Rating" />
            <CustomInputField name="comment" label="Comment" placeholder="Share your experience..." />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting…" : "Submit Review"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default RatingModal;
