import "./globals.css"
import { Poppins } from "next/font/google"
import { Providers } from "@/app/providers"

const font = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" })

export const metadata = {
  title: "Day Messages",
  description: "Next App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={font.className + " " + "overflow-x-hidden"}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
