export type ClientRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  siteAddress: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

const KEY = "sparehand_clients_v1";

export function loadClients(): ClientRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ClientRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveClients(clients: ClientRecord[]) {
  localStorage.setItem(KEY, JSON.stringify(clients));
}

export function upsertClient(
  clients: ClientRecord[],
  input: Omit<ClientRecord, "id" | "createdAt" | "updatedAt"> & {
    id?: string;
  },
): ClientRecord[] {
  const now = new Date().toISOString();
  if (input.id) {
    return clients.map((c) =>
      c.id === input.id
        ? {
            ...c,
            name: input.name,
            email: input.email,
            phone: input.phone,
            siteAddress: input.siteAddress,
            notes: input.notes,
            updatedAt: now,
          }
        : c,
    );
  }
  const next: ClientRecord = {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    phone: input.phone,
    siteAddress: input.siteAddress,
    notes: input.notes,
    createdAt: now,
    updatedAt: now,
  };
  return [next, ...clients];
}

export function deleteClient(clients: ClientRecord[], id: string): ClientRecord[] {
  return clients.filter((c) => c.id !== id);
}
