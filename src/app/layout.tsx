import "./globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { AuthProvider } from "@/components/providers/AuthProvider";

const roboto = Roboto({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    template: "%s | Habitura",
    default: "Habitura",
  },
  description: "A simple habit tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={` ${roboto.className} antialiased`}>{children}</body>
      </html>
    </AuthProvider>
  );
}
