import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display, Source_Sans_3, Ubuntu,Roboto, Bokor, Molle } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"


const sourceSans = Ubuntu({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400","700"],
})

export const metadata: Metadata = {
  title: "YogaMind - AI-Powered Yoga Assistant",
  description: "An AI-powered yoga assistant that predicts yoga poses and generates personalized yoga plans.",
  generator: "v0.app",
  applicationName: "YogaMind",
  icons: {
    icon: [
      {url: "/icon64.ico",sizes:"32x32"},
      {url: "/icon64.ico",sizes:"64x64"}],
    shortcut: "/icon.ico",
    apple: "/icon.ico",
  },  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${sourceSans.className} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
