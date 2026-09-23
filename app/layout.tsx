import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";

import site from "@/lib/site.json";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Toaster } from "@/registry/lantern/ui/sonner";

import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

const favicon =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f5a665" stroke-width="1.6" stroke-linejoin="round"><rect width="24" height="24" rx="5" fill="#111614" stroke="none"/><path d="m12 3.5 8.5 8.5-8.5 8.5L3.5 12ZM12 8l4 4-4 4-4-4Z"/></svg>`,
  );

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: components in the Lantern style`, template: `%s | ${site.name}` },
  description: site.description,
  icons: { icon: favicon },
  openGraph: { title: site.name, description: site.description, url: site.url, type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-svh flex-col overflow-x-hidden">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
