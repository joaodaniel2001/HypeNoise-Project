import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Bebas_Neue } from "next/font/google";
import "@/styles/index.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Configuração das fontes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Imobiliaria Lua",
  description: "Encontre seu lugar no espaço com a Imobiliaria Lua.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${spaceGrotesk.variable} 
          ${bebasNeue.variable} 
          min-h-screen bg-background text-foreground font-sans
        `}
        suppressHydrationWarning={true}
      >
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
