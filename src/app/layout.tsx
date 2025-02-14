import type { Metadata } from 'next'
import './global.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'
import { TooltipProvider } from '@/components/ui/tooltip'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const metadata: Metadata = {
  title: 'Notes App',
  description: 'The coolest notes app in the world',
}

async function getInitialTheme() {
  try {
    const user = await currentUser()
    if (!user) return 'system'

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
      select: { theme: true },
    })

    return dbUser?.theme || 'system'
  } catch {
    return 'system'
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialTheme = await getInitialTheme()

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="font-sans">
          <TooltipProvider>
            <ThemeProvider defaultTheme={initialTheme}>
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
