import Sparkles from "@/components/Sparkles";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Versify",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-b from-bg-gradient-from to-bg-gradient-to min-h-screen`}
      >
        <main className="p-4 text-white min-width-2xl mx-auto">
          <header className="flex justify-between mb-8">
            <Link href="/" className="flex gap-2">
              <Sparkles />
              Verseify
            </Link>
            <nav className="flex gap-4">
              <Link href="/">Home</Link>
              <Link href="/pricing">Pricing</Link>
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
