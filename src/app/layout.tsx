import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Us",
  description: "2024-1 YBIGTA conference",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#000000"></meta>
      </head>
      <GoogleOAuthProvider clientId={process.env.CLIENT_ID ?? ""}>
      <body className={inter.className}>{children}</body>
      </GoogleOAuthProvider>
    </html>
  );
}
