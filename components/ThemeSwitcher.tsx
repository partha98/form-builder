"use client"

import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

function ThemeSwitcher() {
    
    const {theme,setTheme} = useTheme();
    const [mounted,setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) {
        return null;
    }
    return (
        <Tabs defaultValue={theme}>
            <TabsList className="border py-2">
                <TabsTrigger value="light" onClick = {() => setTheme("light")}>
                    <SunIcon className="h-[1.2rem] w-[1.2rem]"/>
                </TabsTrigger>
                <TabsTrigger value="dark" className="px-4 py-2" onClick = {() => setTheme("dark")} >
                    <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0"/>
                </TabsTrigger>
                <TabsTrigger value="system" className="px-4 py-2" onClick = {() => setTheme("system")}>
                    <DesktopIcon className="h-[1.2rem] w-[1.2rem]" />
                </TabsTrigger>
            </TabsList>
        </Tabs>
  )
}

export default ThemeSwitcher