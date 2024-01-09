import { ClerkProvider, UserButton } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
              <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2"> 
                <Logo/>
                <div className="flex gap-4 items-center">
                  <ThemeSwitcher/>
                  <UserButton afterSignOutUrl='/'/>
                </div>
              </nav>
              <main className="flex w-full flex-grow">{children}</main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
