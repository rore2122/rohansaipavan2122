import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rohan Sai Pavan — Business Analytics & Data Intelligence",
  description:
    "Portfolio of Rohan Sai Pavan — Business Analytics, Data Analytics, Business Intelligence, AI, forecasting and AML/KYC analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}