// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ahmad Rofiki - Portfolio",
  description: "Frontend Developer specializing in Next.js, React, and modern web technologies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-[#09090b] text-zinc-100 antialiased`}>
        <ScrollProgress />
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}