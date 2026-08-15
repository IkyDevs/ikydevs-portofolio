// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ahmad Rofiki — Frontend Developer",
  description:
    "Portfolio of Ahmad Rofiki (IkyDevs), a frontend developer specializing in Next.js, React, Tailwind CSS, and modern web experiences.",
  keywords: [
    "Ahmad Rofiki",
    "IkyDevs",
    "Frontend Developer",
    "Next.js",
    "React",
    "Web Developer Indonesia",
  ],
  authors: [{ name: "Ahmad Rofiki" }],
  creator: "Ahmad Rofiki",
  openGraph: {
    title: "Ahmad Rofiki — Frontend Developer",
    description:
      "Frontend developer crafting modern web experiences with Next.js and React.",
    type: "website",
    images: [
      {
        url: "/image/1.jpeg",
        width: 512,
        height: 512,
        alt: "Ahmad Rofiki",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Ahmad Rofiki — Frontend Developer",
    description:
      "Frontend developer crafting modern web experiences with Next.js and React.",
    images: ["/image/1.jpeg"],
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ahmad Rofiki",
  jobTitle: "Frontend Developer",
  email: "mailto:ahmadrofiki6146@gmail.com",
  url: "https://github.com/IkyDevs",
  sameAs: [
    "https://github.com/IkyDevs",
    "https://www.instagram.com/rfky_ahmadz/",
  ],
  knowsAbout: ["Next.js", "React", "Tailwind CSS", "Flutter", "Python"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-[#09090b] text-zinc-100 antialiased`}>
        {/* film grain - haluskan flatness, pointer-events off */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[5] opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
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