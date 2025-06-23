import { Open_Sans } from "next/font/google";
import "./globals.css";

//Components
import Navbar from './components/Navbar'
import Footer from "./components/Footer";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Pernikova Jane",
  description: "E-shop Pernikova Jane",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
      <Navbar/>
      {children}
      <Footer/>
      </body>
    </html>
  );
}
