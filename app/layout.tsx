import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import type React from "react"
import { Analytics } from "@vercel/analytics/react"
import { RunningText } from "@/components/running-text"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Langka",
  description: "Buku-buku langka Indonesia",
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/favicon.svg",
    },
  ],
    generator: 'v0.app'
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground flex flex-col`}>
        <RunningText />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
        </main>
        <Analytics />
      </body>
    </html>
  )
}
