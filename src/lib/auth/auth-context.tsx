"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { TJWTPayload } from "@/types";

type TAuthState = {
  user: TJWTPayload | null;
  accessToken: string | null;
};

type TAuthContext = TAuthState & {
  setToken: (token: string) => void;
  clearToken: () => void;
};

const AuthContext = createContext<TAuthContext | null>(null);

export function useAuth(): TAuthContext {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function AuthContextProvider({
  children,
  initialToken,
}: {
  children: React.ReactNode;
  initialToken?: string | null;
}) {
  const [state, setState] = useState<TAuthState>(() => {
    if (initialToken) {
      try {
        const user = jwtDecode<TJWTPayload>(initialToken);
        const isValid = user.exp && Date.now() < user.exp * 1000;
        if (isValid) return { user, accessToken: initialToken };
      } catch {
        // invalid token — start fresh
      }
    }
    return { user: null, accessToken: null };
  });

  const setToken = useCallback((token: string) => {
    try {
      const user = jwtDecode<TJWTPayload>(token);
      setState({ user, accessToken: token });
    } catch {
      setState({ user: null, accessToken: null });
    }
  }, []);

  const clearToken = useCallback(() => {
    setState({ user: null, accessToken: null });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
}
