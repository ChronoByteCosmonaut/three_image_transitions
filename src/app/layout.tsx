import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/navigation";
import localFont from "next/font/local";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Morphing image transitions",
  description: "Morphing image source on hover with three.js",
};

const biotif = localFont({
  src: "../../public/fonts/Biotif-Variable/font.woff2",
  variable: "--biotif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={biotif.variable}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
