import "./globals.css";
import { Lilita_One } from "next/font/google"

const lolita = Lilita_One({ subsets: ['latin'], weight: "400" })

const APP_NAME = "Timely";
const APP_DESCRIPTION = "A simple timer app with Progressive Web App support.";

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: "%s - PWA App",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-gray-950 ${lolita.className}`}>
        {children}
      </body>
    </html>
  );
}
