import "./globals.css";
import { Lilita_One } from "next/font/google"

const lolita = Lilita_One({ subsets: ['latin'], weight: "400" })

const APP_NAME = "Tickly";
const APP_DESCRIPTION = "A simple timer app with PWA support.";

export const metadata = {
  applicationName: APP_NAME,

  title: {
    default: APP_NAME,
    template: "%s",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  themeColor: "#030712",
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

export default async function RootLayout({ children }) {
  return (
    // <ClerkProvider>
    <html lang="en">
      <body className={`bg-gray-950 text-white ${lolita.className}`}>
        {children}
      </body>
    </html>
    // </ClerkProvider>
  );
}
