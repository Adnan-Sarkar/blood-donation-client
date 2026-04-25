"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/auth-context";
import { registerForEvent } from "@/lib/api/event.api";

type Props = {
  eventId: string;
  registrations: { userId: string }[];
};

export function RegisterButton({ eventId, registrations }: Props) {
  const { accessToken, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setRegistered(registrations.some((r) => r.userId === user.id));
    }
  }, [user?.id, registrations]);

  const handleRegister = async () => {
    if (!accessToken) {
      router.push("/login");
      return;
    }
    setLoading(true);
    try {
      await registerForEvent(eventId, accessToken);
      toast.success("You're registered! See you at the event.");
      setRegistered(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="flex h-9 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-3 text-xs font-semibold text-primary-foreground">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
        <span>You&apos;re registered!</span>
      </div>
    );
  }

  return (
    <Button
      size="sm"
      onClick={handleRegister}
      disabled={loading}
      className="w-full gap-1.5 h-9 rounded-xl text-xs font-semibold"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Registering…
        </>
      ) : !accessToken ? (
        <>
          <LogIn className="h-4 w-4" />
          Sign in to Register
        </>
      ) : (
        "Register Now →"
      )}
    </Button>
  );
}
