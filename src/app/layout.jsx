// layout.jsx
import { Raleway } from "next/font/google";
import "./globals.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Perníková Jane | Ručně zdobené perníčky a e-shop",
  description: "Ručně zdobené perníčky z domácí výroby. Tradiční české perníky, dárkové balíčky a zakázková výroba. Objednejte online v e-shopu Perníková Jane.",
  keywords: ["perníky", "perníčky", "ručně zdobené perníčky", "vánoční perníky", "e-shop perníky", "Perníková Jane"],
  openGraph: {
    title: "Perníková Jane | Ručně zdobené perníčky",
    description: "Tradiční ručně zdobené české perníčky. Objednejte online v e-shopu Perníková Jane.",
    url: "https://www.pernikovajane.cz", 
    siteName: "Perníková Jane",
    images: [
      {
        url: "https://www.pernikovajane.cz/og-image.jpg", // náhledový obrázek pro soc
        width: 1200,
        height: 630,
        alt: "Ručně zdobené perníčky Perníková Jane",
      },
    ],
    locale: "cs_CZ",
    type: "website",
  },
  alternates: {
    canonical: "https://www.pernikovajane.cz",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body className={raleway.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
