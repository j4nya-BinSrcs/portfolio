import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/site.config";
import BackgroundGrid from "@/components/background-grid";
import CursorGlow from "@/components/cursor-glow";
import WelcomeScreen from "@/components/welcome-screen";
import { BootProvider } from "@/components/boot-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// The typeface used across the whole site. Exposing it as a CSS variable
// (--font-montserrat) lets Tailwind's theme and our base styles share it.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: [...siteConfig.seoKeywords],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    type: "website",
    url: siteConfig.siteUrl,
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-bg text-tx">
        {/* BootProvider gates the entrance animation; ThemeProvider manages the
            accent palette. The decorative layers (grid, cursor glow, welcome
            screen) sit above the page content. */}
        <BootProvider>
          <ThemeProvider>
            <BackgroundGrid />
            <CursorGlow />
            <WelcomeScreen />
            {children}
          </ThemeProvider>
        </BootProvider>

        {/* Vercel analytics + Core Web Vitals (speed insights). These render
            invisible scripts and only report once the site is deployed on
            Vercel; locally they're inert. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
