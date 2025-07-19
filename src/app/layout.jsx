//layout.jsx
import { Raleway } from "next/font/google";
import "./globals.css";

//Components
import Navbar from './components/Navbar'
import Footer from "./components/Footer";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Pernikova Jane",
  description: "E-shop Pernikova Jane",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
      <Navbar/>
      {children}
      <Footer/>
      </body>
    </html>
  );
}
