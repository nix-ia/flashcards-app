import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "English Flashcards",
  description: "Learn English vocabulary with flashcards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
