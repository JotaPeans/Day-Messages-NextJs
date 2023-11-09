import "./globals.css"
import { Poppins } from "next/font/google"
import { Providers } from "@/app/providers"
import Head from "./Head"

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

  const date = new Date();
  const hour = date.toLocaleTimeString("pt-BR").split(":")[0];

  const dark = parseInt(hour) >= 17 ? "dark" : "";

  return (
    <html lang="pt-br" className={dark}>
      <Head/>
      <body className={font.className + " " + "overflow-x-hidden dark:bg-zinc-800"}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
