import Link from "next/link";
import { Users } from "lucide-react";
import { getDonors } from "@/lib/api/donor.api";
import { DonorCard } from "./DonorCard";
import { Button } from "@/components/ui/button";
import { TBloodTypes } from "@/types/common-types";

type DonorListsProps = {
  searchTerm?: string;
  bloodType?: string;
  availability?: string;
  page?: number;
};

const PAGE_SIZE = 9;

export async function DonorLists({
  searchTerm,
  bloodType,
  availability,
  page = 1,
}: DonorListsProps) {
  let donors: Awaited<ReturnType<typeof getDonors>>["data"] = [];
  let meta: { total: number; page: number; limit: number } | undefined;

  try {
    const availBool =
      availability === "true"
        ? true
        : availability === "false"
          ? false
          : undefined;

    const res = await getDonors({
      searchTerm: searchTerm || undefined,
      bloodType: (bloodType as TBloodTypes) || undefined,
      availability: availBool,
      page,
      limit: PAGE_SIZE,
    });
    donors = res.data ?? [];
    meta = res.meta;
  } catch {
    donors = [];
  }

  const totalPages = meta ? Math.ceil(meta.total / PAGE_SIZE) : 1;

  if (donors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface">
          <Users className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-foreground">No donors found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search term.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Results count */}
      {meta && (
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{donors.length}</span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{meta.total}</span>{" "}
          donors
        </p>
      )}

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {donors.map((donor) => (
          <DonorCard key={donor.id} donor={donor} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          {page > 1 && (
            <Button
              variant="outline"
              size="sm"
              render={
                <Link
                  href={buildPageHref({ page: page - 1, searchTerm, bloodType, availability })}
                />
              }
            >
              Previous
            </Button>
          )}

          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>

          {page < totalPages && (
            <Button
              variant="outline"
              size="sm"
              render={
                <Link
                  href={buildPageHref({ page: page + 1, searchTerm, bloodType, availability })}
                />
              }
            >
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function buildPageHref({
  page,
  searchTerm,
  bloodType,
  availability,
}: {
  page: number;
  searchTerm?: string;
  bloodType?: string;
  availability?: string;
}) {
  const params = new URLSearchParams();
  if (searchTerm) params.set("searchTerm", searchTerm);
  if (bloodType) params.set("bloodType", bloodType);
  if (availability) params.set("availability", availability);
  params.set("page", String(page));
  return `/donors?${params.toString()}`;
}
