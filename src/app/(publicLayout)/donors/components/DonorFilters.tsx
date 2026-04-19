"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const BLOOD_TYPES = [
  { value: "A_POSITIVE", label: "A+" },
  { value: "A_NEGATIVE", label: "A−" },
  { value: "B_POSITIVE", label: "B+" },
  { value: "B_NEGATIVE", label: "B−" },
  { value: "AB_POSITIVE", label: "AB+" },
  { value: "AB_NEGATIVE", label: "AB−" },
  { value: "O_POSITIVE", label: "O+" },
  { value: "O_NEGATIVE", label: "O−" },
];

export function DonorFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const selectedBloodType = searchParams.get("bloodType") ?? "";
  const availability = searchParams.get("availability");
  const search = searchParams.get("searchTerm") ?? "";

  const [inputValue, setInputValue] = useState(search);

  // Sync when URL changes externally (e.g. "Clear all filters")
  useEffect(() => {
    setInputValue(search);
  }, [search]);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      params.delete("page");
      startTransition(() => {
        router.push(`/donors?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const hasFilters =
    selectedBloodType !== "" || availability !== null || search !== "";

  const clearAll = () => {
    startTransition(() => {
      router.push("/donors");
    });
  };

  return (
    <aside className="flex flex-col gap-6">
      {/* Search */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Search
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Name, location..."
            className="pl-9"
            value={inputValue}
            onChange={(e) => {
              const val = e.target.value;
              setInputValue(val);
              updateParams({ searchTerm: val || null });
            }}
          />
        </div>
      </div>

      <Separator />

      {/* Blood type */}
      <div className="flex flex-col gap-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Blood Type
        </Label>
        <div className="grid grid-cols-4 gap-2">
          {BLOOD_TYPES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() =>
                updateParams({
                  bloodType: selectedBloodType === value ? null : value,
                })
              }
              className={cn(
                "flex h-9 items-center justify-center rounded-lg border text-xs font-semibold transition-all",
                selectedBloodType === value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary hover:text-primary"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div className="flex flex-col gap-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Availability
        </Label>
        <div className="flex flex-col gap-2">
          {[
            { value: "true", label: "Available now" },
            { value: "false", label: "Unavailable" },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() =>
                updateParams({
                  availability: availability === value ? null : value,
                })
              }
              className={cn(
                "flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-all",
                availability === value
                  ? "border-primary bg-primary/5 text-primary font-medium"
                  : "border-border hover:border-primary/50"
              )}
            >
              {label}
              {availability === value && (
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary"
                >
                  Active
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <>
          <Separator />
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            Clear all filters
          </Button>
        </>
      )}
    </aside>
  );
}
