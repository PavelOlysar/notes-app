import type { Metadata } from 'next'
import './global.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'
import { TooltipProvider } from '@/components/ui/tooltip'

export const metadata: Metadata = {
  title: 'Notes App',
  description: 'The coolest notes app in the world',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="font-sans">
          <TooltipProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="min-h-screen">
                <Navbar />
                <main className="py-8">{children}</main>
              </div>
              <Toaster />
            </ThemeProvider>
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
