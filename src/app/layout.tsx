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
    default: "SpareHand — Office help for Australian SMEs",
    template: "%s · SpareHand",
  },
  description:
    "Inbox triage, meeting notes, receipt capture and GST quote drafts for Australian SMEs stretching limited headcount.",
  applicationName: "SpareHand",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "SpareHand",
    title: "SpareHand — Office help for SMEs short on staff",
    description:
      "AI drafts for enquiries, meetings, receipts and GST quotes. Built for Australian small businesses.",
    images: [
      {
        url: "/og.png",
        width: 1376,
        height: 768,
        alt: "SpareHand — Office help for SMEs short on staff",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpareHand — Office help for Australian SMEs",
    description:
      "AI drafts for enquiries, meetings, receipts and GST quotes. Review before you send.",
    images: ["/og.png"],
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
      <body className="min-h-full antialiased">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
