import type { Metadata } from "next";
import { AppGate } from "@/components/app-gate";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  title: "Workspace",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppGate>{children}</AppGate>;
}
