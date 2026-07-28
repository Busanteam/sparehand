export type WorkspaceRole = "admin" | "estimator" | "office";

export type WorkspaceUser = {
  id: string;
  name: string;
  role: WorkspaceRole;
  /** Demo-only PIN (not production security). */
  pin: string;
};

export type WorkspaceSession = {
  userId: string;
  name: string;
  role: WorkspaceRole;
  signedInAt: string;
};

export const demoUsers: WorkspaceUser[] = [
  { id: "u-admin", name: "Alex Admin", role: "admin", pin: "1111" },
  { id: "u-estimator", name: "Sam Estimator", role: "estimator", pin: "2222" },
  { id: "u-office", name: "Jamie Office", role: "office", pin: "3333" },
];

const KEY = "sparehand_session_v1";

export function loadSession(): WorkspaceSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as WorkspaceSession;
  } catch {
    return null;
  }
}

export function saveSession(session: WorkspaceSession) {
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(KEY);
}

export function signInWithPin(pin: string): WorkspaceSession | null {
  const user = demoUsers.find((u) => u.pin === pin);
  if (!user) return null;
  const session: WorkspaceSession = {
    userId: user.id,
    name: user.name,
    role: user.role,
    signedInAt: new Date().toISOString(),
  };
  saveSession(session);
  return session;
}

/** Route access for the demo role model. */
export function canAccessPath(role: WorkspaceRole, pathname: string): boolean {
  if (role === "admin") return true;
  if (role === "estimator") {
    return !pathname.startsWith("/app/settings");
  }
  // office: inbox / meetings / documents / clients / quotes view — not rates/trades/settings
  if (pathname.startsWith("/app/rates")) return false;
  if (pathname.startsWith("/app/trades")) return false;
  if (pathname.startsWith("/app/settings")) return false;
  return true;
}

export function canEditRates(role: WorkspaceRole): boolean {
  return role === "admin" || role === "estimator";
}

export function canManageCompany(role: WorkspaceRole): boolean {
  return role === "admin";
}
