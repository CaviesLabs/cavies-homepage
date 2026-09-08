import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/dm-serif-display/400-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cavies.xyz"),
  title: {
    default: "Cavies Studio — Product design & frontend engineering",
    template: "%s — Cavies Studio",
  },
  description:
    "A design engineering studio for ambitious startups. We design product interfaces, build the frontend, and integrate it into your application.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Cavies Studio",
    title: "Cavies Studio — Exceptional interfaces for ambitious products",
    description:
      "Product design, frontend engineering, and integration. One team from the first interaction to the final implementation.",
  },
  twitter: {
    card: "summary",
    title: "Cavies Studio",
    description: "Exceptional interfaces for ambitious products.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
