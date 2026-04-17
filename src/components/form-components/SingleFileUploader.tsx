"use client";

import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

type TProps = {
  value?: string;
  onChange: (url: string) => void;
  onUpload: (file: File) => Promise<string>;
  accept?: string;
  className?: string;
  previewShape?: "circle" | "square";
};

export function SingleFileUploader({
  value,
  onChange,
  onUpload,
  accept = "image/*",
  className,
  previewShape = "circle",
}: TProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-4 transition-colors hover:border-primary",
        className
      )}
      onClick={() => inputRef.current?.click()}
    >
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="upload preview"
            className={cn(
              "h-24 w-24 object-cover",
              previewShape === "circle" ? "rounded-full" : "rounded-lg"
            )}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
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
            {uploading ? "Uploading…" : "Click to upload"}
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
          setUploading(true);
          try {
            const url = await onUpload(file);
            onChange(url);
          } finally {
            setUploading(false);
          }
        }}
      />
    </div>
  );
}

export default SingleFileUploader;
