"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type TProps = {
  name: string;
  label: string;
  max?: number;
};

export function CustomRatingInput({ name, label, max = 5 }: TProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <StarRating value={field.value ?? 0} onChange={field.onChange} max={max} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function StarRating({
  value,
  onChange,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  max: number;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus-visible:outline-none"
          aria-label={`Rate ${star} out of ${max}`}
        >
          <Star
            className={cn(
              "h-6 w-6 transition-colors",
              (hover || value) >= star
                ? "fill-warning text-warning"
                : "text-border"
            )}
          />
        </button>
      ))}
    </div>
  );
}

export default CustomRatingInput;
