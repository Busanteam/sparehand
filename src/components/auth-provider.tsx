"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearSession,
  loadSession,
  signInWithPin,
  type WorkspaceRole,
  type WorkspaceSession,
} from "@/lib/storage/workspace-auth";

type AuthContextValue = {
  session: WorkspaceSession | null;
  ready: boolean;
  signIn: (pin: string) => boolean;
  signOut: () => void;
  role: WorkspaceRole | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<WorkspaceSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(loadSession());
    setReady(true);
  }, []);

  const signIn = useCallback((pin: string) => {
    const next = signInWithPin(pin.trim());
    if (!next) return false;
    setSession(next);
    return true;
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      ready,
      signIn,
      signOut,
      role: session?.role ?? null,
    }),
    [session, ready, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth requires AuthProvider");
  return ctx;
}
