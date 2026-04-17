"use client";

import React, { useEffect } from "react";
import { AuthContextProvider, useAuth } from "@/lib/auth/auth-context";
import { getNewAccessToken } from "@/services/actions/getNewAccessToken";

function TokenRehydrator() {
  const { setToken } = useAuth();

  useEffect(() => {
    getNewAccessToken().then((token) => {
      if (token) setToken(token);
    });
  }, [setToken]);

  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <TokenRehydrator />
      {children}
    </AuthContextProvider>
  );
}
