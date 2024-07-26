import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TrackingProvider } from "./TrackingContext";
import { NavBar } from "../components";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Tracking dapp",
  description: "Developed by ushie pius the Blockchain guru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
        <body suppressHydrationWarning={true} className={inter.className}>
        <TrackingProvider>
          <NavBar />
            {children}
          <Footer />
        </TrackingProvider>
        </body>
     
    </html>
  );
}
