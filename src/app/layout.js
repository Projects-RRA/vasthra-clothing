import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar";
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export const metadata = {
  title: "Vasthra Clothing Apparel",
  description: "The best collections you can ever find.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       className={poppins.className}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
