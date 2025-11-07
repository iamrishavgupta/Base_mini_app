import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ← UPDATED: Changed metadata for Burger Flip game
export const metadata: Metadata = {
  title: "Burger Flip - Play on Base",
  description: "A fun and fast-paced game where you tap burgers before they burn!",
  openGraph: {
    title: "Burger Flip - Play on Base",
    description: "A fun and fast-paced game where you tap burgers before they burn!",
    images: ["https://base-mini-app-ashy-nu.vercel.app/"], // ← UPDATE THIS
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ← ADDED: Base mini-app embed metadata */}
        <meta
          name="fc:miniapp"
          content={JSON.stringify({
            version: "next",
            imageUrl: "https://base-mini-app-ashy-nu.vercel.app/burger.png", // ← UPDATE THIS
            button: {
              title: "Play Now",
              action: {
                type: "launch_miniapp",
                name: "Burger Flip",
                url: "https://base-mini-app-ashy-nu.vercel.app/", // ← UPDATE THIS
              },
            },
          })}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
