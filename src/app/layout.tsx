import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import React from "react";
import Providers from "@/lib/providers/Providers";


export const metadata: Metadata = {
  title: "Blood Bank",
  description: "Blood Bank",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/icon.ico" />
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <title>Blood Bank</title>
    </head>
    <body>
    <Providers>
      <AppRouterCacheProvider>
        <>
        <Toaster position={"top-center"} />
          {children}
        </>
      </AppRouterCacheProvider>
    </Providers>
    </body>
    </html>
  );
}
