import Appbar from "@/components/Appbar/Appbar";
import Desktop from "@/components/Desktop/Desktop";
import "@/scss/global.scss";
// import "@/scss/normalize.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["100", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={lato.className}>
        <Desktop>
          <Appbar />
          {children}
        </Desktop>
      </body>
    </html>
  );
}
