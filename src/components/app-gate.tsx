"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/components/auth-provider";
import { canAccessPath } from "@/lib/storage/workspace-auth";

export function AppGate({ children }: { children: React.ReactNode }) {
  const { session, ready, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    if (role && !canAccessPath(role, pathname)) {
      router.replace("/app");
    }
  }, [ready, session, role, pathname, router]);

  if (!ready || !session) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm text-[var(--muted)]">
        …
      </div>
    );
  }

  if (role && !canAccessPath(role, pathname)) {
    return null;
  }

  return <AppShell>{children}</AppShell>;
}
