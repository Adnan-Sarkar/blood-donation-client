import { Star } from "lucide-react";
import { getAllReviews, TReview } from "@/lib/api/review.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "text-warning fill-warning" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: TReview }) {
  const name = review.user?.name ?? "Anonymous";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex w-[300px] shrink-0 flex-col gap-4 rounded-xl border border-border bg-background p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage src={review.user?.profilePicture} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-foreground">{name}</p>
          {review.user?.bloodType && (
            <p className="text-xs text-muted-foreground">
              Blood type: {review.user.bloodType.replace("_", " ").replace("POSITIVE", "+").replace("NEGATIVE", "−")}
            </p>
          )}
        </div>
      </div>
      <StarRating rating={review.rating} />
      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
        &ldquo;{review.comment}&rdquo;
      </p>
    </div>
  );
}

const Reviews = async () => {
  let reviews: TReview[] = [];

  try {
    const res = await getAllReviews(12);
    reviews = res.data ?? [];
  } catch {
    reviews = [];
  }

  if (reviews.length === 0) return null;

  // Duplicate for seamless marquee loop
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section className="bg-background py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            What our community says
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Real stories from donors and recipients who have used LifeFlow.
          </p>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative mt-12">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div
          className="flex gap-5 animate-marquee"
          style={{
            width: "max-content",
          }}
        >
          {marqueeItems.map((review, idx) => (
            <ReviewCard key={`${review.id}-${idx}`} review={review} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Reviews;
