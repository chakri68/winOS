import Appbar from "@/components/Appbar/Appbar";
import Desktop from "@/components/Desktop/Desktop";
import Window from "@/components/Window/Window";
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
        <Window
          appbarProps={{}}
          desktopProps={{
            icons: [
              { label: "About", initialPosition: { x: 100, y: 100 } },
              {
                label: "wrihvbwruivbwuivbjiwri",
                initialPosition: { x: 100, y: 200 },
              },
              { label: "3ruivb", initialPosition: { x: 100, y: 300 } },
              {
                label: "2uibrvqwuicb3rwuibviuewr rwvquiwvbqu",
                initialPosition: { x: 100, y: 400 },
              },
            ],
          }}
          dockProps={{
            dockItems: [
              { label: "About", id: "about" },
              { label: "Projects", id: "projects" },
              { label: "Contact", id: "contact" },
              { label: "Resume", id: "resume" },
              { label: "Blog", id: "blog" },
              { label: "Github", id: "github" },
              { label: "LinkedIn", id: "linkedin" },
              { label: "Twitter", id: "twitter" },
            ],
          }}
        />
      </body>
    </html>
  );
}
