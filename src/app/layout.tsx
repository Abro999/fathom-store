import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ui/Toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fathomgoods.example"),
  title: {
    default: "DropEra — Objects worth finding",
    template: "%s | DropEra",
  },
  description:
    "DropEra is a curated store for tech, home, fashion and everyday-carry objects worth finding — tested and sourced by people who actually use them.",
  openGraph: {
    title: "DropEra — Objects worth finding",
    description: "A curated, cross-category store for objects worth finding.",
    type: "website",
    siteName: "DropEra",
  },
  twitter: {
    card: "summary_large_image",
    title: "DropEra — Objects worth finding",
    description: "A curated, cross-category store for objects worth finding.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DropEra",
              url: "https://www.fathomgoods.example",
              logo: "https://www.fathomgoods.example/logo.png",
            }),
          }}
        />
        <ToastProvider>
          <CartProvider>
            <Header />
            <main className="pb-16 md:pb-0">{children}</main>
            <Footer />
            <CartDrawer />
            <MobileTabBar />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
