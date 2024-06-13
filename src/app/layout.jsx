import { Gabarito } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";

const gabarito = Gabarito({ subsets: ["latin"] });

export const metadata = {
  title: "browanimelist",
  description: "Website Anime Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gabarito.className} bg-color-dark`} suppressHydrationWarning={true}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
