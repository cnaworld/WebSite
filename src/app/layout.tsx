import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import Layout from '@/components/Layout'; // Import the new Layout component

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'LostSec - Cybersecurity Portfolio', // More specific title
  description: 'A personal website for a cybersecurity researcher and bug bounty hunter.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark"> {/* Apply 'dark' class to html tag */}
      <body className={`${jetbrainsMono.variable} font-mono bg-hacker-bg text-hacker-green antialiased`}>
        {/* Apply JetBrains Mono font, background, and text color globally. Antialiased for smoother text. */}
        <Layout>{children}</Layout> {/* Wrap children with Layout component */}
      </body>
    </html>
  )
}
