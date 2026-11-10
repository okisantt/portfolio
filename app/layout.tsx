import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TransitionProvider from "@/components/transition/TransitionProvider";
import { SITE } from "@/lib/data";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Runs before the first paint: decides whether the opening sequence plays, so
// the home page never flashes its final state first. Plays once per session,
// only on the home page, and never for people who asked for reduced motion.
const introBootstrap = `(function(){try{var d=document.documentElement;if(location.pathname==="/"&&!location.hash&&!sessionStorage.getItem("intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){sessionStorage.setItem("intro","1");d.dataset.intro="play";setTimeout(function(){if(d.dataset.intro==="play")delete d.dataset.intro},9000)}}catch(e){}})()`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: `${SITE.shortName} — Portfólio`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: `${SITE.shortName} — Portfólio`,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/avatar-logo-isaac.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#080607",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <TransitionProvider>
          <Header />
          {children}
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  );
}
