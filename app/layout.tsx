import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import WhatsAppButton from "@/components/whatsapp-button"
import { AuthProvider } from "@/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blog",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head></head>
      <body className={inter.className}>
        <AuthProvider>
          <main className="container">{children}</main>
          <WhatsAppButton phoneNumber="+55 16 99788-2058" />
        </AuthProvider>
      </body>
    </html>
  )
}

