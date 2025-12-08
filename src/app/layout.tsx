import type { Metadata } from "next";
import { Lora, Cormorant_Garamond, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const greatVibes = Great_Vibes({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Notre Mariage",
  description: "Invitation au mariage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${lora.variable} ${cormorant.variable} ${inter.variable} ${greatVibes.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
