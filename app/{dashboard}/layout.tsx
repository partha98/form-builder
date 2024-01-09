import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { UserButton } from '@clerk/nextjs'
import React, { ReactNode } from 'react'

function Layout({children}:{children: ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen min-w-full max-h-screen bg-background">
        <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2"> 
                <Logo/>
                <div className="flex gap-4 items-center"></div>
                <ThemeSwitcher/>
                <UserButton afterSignOutUrl='/'/>
        </nav>
        <main className="flex w-full flex-grow">{children}</main>
    </div>
  )
}

export default Layout