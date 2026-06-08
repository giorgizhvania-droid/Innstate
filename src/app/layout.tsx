import type { Metadata } from "next";
import { Inter, Poppins, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

const notoGeorgian = Noto_Sans_Georgian({
  variable: "--font-georgian",
  weight: ["500", "600", "700", "800"],
  subsets: ["georgian"],
});

export const metadata: Metadata = {
  title: "Innstate — Hotel Deals Worldwide",
  description:
    "Discover hotel deals worldwide and submit inquiries instantly with Innstate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${poppins.variable} ${notoGeorgian.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">{children}</body>
    </html>
  );
}
