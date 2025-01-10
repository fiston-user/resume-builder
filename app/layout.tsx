import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Providers";
import { AutoSaveHeaderWrapper } from "./components/header/AutoSaveHeaderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Build your professional resume with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AutoSaveHeaderWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}
