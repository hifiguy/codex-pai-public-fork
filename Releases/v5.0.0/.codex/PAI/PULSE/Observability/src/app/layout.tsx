import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import AppHeader from "@/components/AppHeader";
import TemplateOnboarding from "@/components/TemplateOnboarding";
import { Providers } from "./providers";
import "./globals.css";
import "./telos/_v7/styles.css";

export const metadata: Metadata = {
  title: "PAI Observatory",
  description: "PAI Observability Dashboard",
  icons: {
    icon: "/pai-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <Providers>
          <AppHeader />
          <TemplateOnboarding />
          <main className="min-h-screen max-w-[1920px] mx-auto w-full overflow-x-hidden">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
