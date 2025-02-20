import "./globals.css";
import { Poppins } from 'next/font/google';
import Navbar from "@/app/components/core/nav-bar";
import Footer from "@/app/components/core/footer";

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
        <Footer />
      </body>
    </html>
  );
}
