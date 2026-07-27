import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { I18nProvider } from "@/components/i18n-provider";
import { ThemeProvider } from "@/components/theme-provider";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sparehand.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SpareHand — Office help for SMEs short on staff",
    template: "%s · SpareHand",
  },
  description:
    "Inbox triage, meeting notes, receipt capture and tax-aware quote drafts for small businesses stretching limited headcount.",
  applicationName: "SpareHand",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "SpareHand",
    title: "SpareHand — Office help for SMEs short on staff",
    description:
      "AI drafts for enquiries, meetings, receipts and quotes. Built as a working sample of an internal office system.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "SpareHand — Office help for SMEs short on staff",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpareHand — Office help for SMEs short on staff",
    description:
      "AI drafts for enquiries, meetings, receipts and quotes. Review before you send.",
    images: ["/og.jpg"],
  },
};

const themeInitScript = `
(() => {
  try {
    const key = "sparehand_theme";
    const stored = localStorage.getItem(key);
    const theme = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    const dark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${display.variable} ${body.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full bg-[var(--bg)] antialiased">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
