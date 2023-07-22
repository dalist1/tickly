import Head from "next/head";
import "./globals.css";
import { Lilita_One } from "next/font/google"

const lolita = Lilita_One({ subsets: ['latin'], weight: "400" })

export const metadata = {
  title: "Timely",
  description: "A simple timer app with Progressive Web App support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link rel="manifest" href="../public/manifest.json" />
      </Head>
      <body className={`bg-gray-950 ${lolita.className}`}>
        {children}
      </body>
    </html>
  );
}
