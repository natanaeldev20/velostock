'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Switch } from '@heroui/react'
import { Moon, Sun } from '@gravity-ui/icons'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="w-12 h-6 bg-default-200 animate-pulse rounded-full" />
    )
  }

  const isLight = theme === 'light'

  return (
    <Switch isSelected={isLight} size="lg">
      {({ isSelected }) => (
        <>
          <Switch.Control
            className="bg-indigo-500"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Switch.Thumb>
              <Switch.Icon>
                {isSelected ? (
                  <Sun className="size-3 text-inherit opacity-70" />
                ) : (
                  <Moon className="size-3 text-inherit opacity-70" />
                )}
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </>
      )}
    </Switch>
  )
}
