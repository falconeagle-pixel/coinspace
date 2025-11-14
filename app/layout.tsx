import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import ReferrerProvider from "./ReffererProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "500",
});
const satoshi = localFont({
  src: "../public/fonts/satoshi/Satoshi-Variable.woff",
  variable: "--font-satoshi",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "500",
});

const inter = Inter({
  display: "swap",
  variable: "--inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Coin Wallet | Secure Self-Custodial Multicurrency Crypto Wallet",
  description:
    "Buy, send, receive, and swap crypto easily with Coin Wallet — a secure, self-custodial wallet for Bitcoin, Ethereum, Litecoin, Solana, Dogecoin, XRP, Monero, and more on desktop and mobile.",
  keywords: "Coinspace wallet",
  icons: [
    { rel: "icon", url: "https://coin.space/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { rel: "icon", url: "https://coin.space/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { rel: "apple-touch-icon", url: "https://coin.space/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    "/brand/coinspace.ico", // keeping the existing icon path as fallback
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${satoshi.variable} ${inter.variable} antialiased`}
      >
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          theme="colored"
        />
<<<<<<< HEAD
        <ReferrerProvider
        >
            {children}
        </ReferrerProvider>
=======
        <ReferrerProvider>{children}</ReferrerProvider>
>>>>>>> redirect-app
      </body>
    </html>
  );
}
