'use client'

import * as React from 'react'
import { MoonIcon, SunIcon, LaptopIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { updateTheme } from '@/actions/settings.action'

const themeIcons = {
  light: <SunIcon className="h-[1.2rem] w-[1.2rem]" />,
  dark: <MoonIcon className="h-[1.2rem] w-[1.2rem]" />,
  system: <LaptopIcon className="h-[1.2rem] w-[1.2rem]" />,
  forest: <span className="h-[1.2rem] w-[1.2rem] rounded-full bg-[#2f7c4d]" />,
  valentine: (
    <span className="h-[1.2rem] w-[1.2rem] rounded-full bg-[#ff6b6b]" />
  ),
  ocean: <span className="h-[1.2rem] w-[1.2rem] rounded-full bg-[#0ea5e9]" />,
  rocky: <span className="h-[1.2rem] w-[1.2rem] rounded-full bg-[#8B7355]" />,
}

export default function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const currentTheme = theme || 'system'

  const handleThemeChange = async (newTheme: string) => {
    setTheme(newTheme)
    await updateTheme(newTheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {themeIcons[currentTheme as keyof typeof themeIcons]}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange('light')}>
          <SunIcon className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
          <MoonIcon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('system')}>
          <LaptopIcon className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('forest')}>
          <span className="mr-2 h-4 w-4 rounded-full bg-[#2f7c4d]" />
          <span>Forest</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('valentine')}>
          <span className="mr-2 h-4 w-4 rounded-full bg-[#ff6b6b]" />
          <span>Valentine</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('ocean')}>
          <span className="mr-2 h-4 w-4 rounded-full bg-[#0ea5e9]" />
          <span>Ocean</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('rocky')}>
          <span className="mr-2 h-4 w-4 rounded-full bg-[#8B7355]" />
          <span>Rocky</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
