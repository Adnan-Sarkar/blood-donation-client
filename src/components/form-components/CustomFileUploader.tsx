"use client";

import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

type TProps = {
  name: string;
  label: string;
  accept?: string;
  onUpload?: (file: File) => Promise<string>;
  className?: string;
};

export function CustomFileUploader({ name, label, accept = "image/*", onUpload, className }: TProps) {
  const { control } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-primary",
                className
              )}
              onClick={() => inputRef.current?.click()}
            >
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="preview" className="h-24 w-24 rounded-full object-cover" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreview(null);
                      field.onChange("");
                    }}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted" />
                  <p className="text-sm text-muted">
                    {uploading ? "Uploading…" : "Click to upload or drag & drop"}
                  </p>
                </>
              )}
              <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const objectUrl = URL.createObjectURL(file);
                  setPreview(objectUrl);
                  if (onUpload) {
                    setUploading(true);
                    try {
                      const url = await onUpload(file);
                      field.onChange(url);
                    } finally {
                      setUploading(false);
                    }
                  }
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomFileUploader;
