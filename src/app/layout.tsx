import type { Metadata } from "next"
import { Lora, Open_Sans, IBM_Plex_Mono } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "VastuCart — Vastu & Spiritual Products",
    template: "%s | VastuCart",
  },
  description:
    "Premium Vastu, spiritual, and wellness products. Shop with confidence — dual currency (INR/USD), secure payments, and worldwide shipping.",
  icons: {
    icon: "/VastuCartLFAV.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${openSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
