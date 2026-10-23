import { DM_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
export const metadata = { title:"IkyDevs — Ahmad Rofiki, Frontend Developer", description:"Expressive web experiences and custom internal software by Ahmad Rofiki.", openGraph:{title:"IkyDevs",images:["/image/ikydevs.png"]} };
export default function RootLayout({children}) { return <html lang="en"><body className={`${display.variable} ${mono.variable}`}>{children}</body></html>; }
