import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { I18nProvider } from "@/components/i18n-provider";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SpareHand — AU SME office automation",
  description:
    "Inbox triage, meeting notes, document OCR and GST quote drafts for Australian SMEs stretching limited headcount.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
