import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How SpareHand’s public portfolio sample handles contact form data and browser-local demo storage.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
