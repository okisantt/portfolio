import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const heroSora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hero",
  display: "swap",
});

const SITE_NAME = "Isaac Santana Muniz";
const SITE_DESC = "Portfólio.";
const SITE_URL = "https://santt.dev"; // troque

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Portfólio`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESC,

  // ✅ Favicon usando o seu "S"
  icons: {
    icon: [{ url: "/avatar-logo-isaac.png", type: "image/png" }],
    shortcut: [{ url: "/avatar-logo-isaac.png", type: "image/png" }],
    apple: [{ url: "/avatar-logo-isaac.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`is-splashing ${display.variable} ${heroSora.variable}`}
    >
      <body>
        <Header />

        <main className="page-shell">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
