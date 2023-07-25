import Appbar from "@/components/Appbar/Appbar";
import Desktop from "@/components/Desktop/Desktop";
import "@/scss/global.scss";
// import "@/scss/normalize.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio of a web developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Desktop>
          <Appbar />
          {children}
        </Desktop>
      </body>
    </html>
  );
}
