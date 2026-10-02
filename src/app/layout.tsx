import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const description =
  "Computer Engineer building web and mobile apps that real people depend on — from the database to the screen.";

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: {
    default: "Sean Marcus V. Tomas — Full-Stack & Mobile Developer",
    template: "%s — Sean Marcus V. Tomas",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Sean Marcus V. Tomas",
    title: "Sean Marcus V. Tomas — Full-Stack & Mobile Developer",
    description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes sets the theme class on <html> before React hydrates.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <a
            href="#main"
            className="sr-only z-[60] rounded-chip bg-primary-solid px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <SiteHeader />
          {/* Bottom padding keeps content clear of the phone tab bar. */}
          <div id="top" className="flex flex-1 flex-col pb-20 lg:pb-0">
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
