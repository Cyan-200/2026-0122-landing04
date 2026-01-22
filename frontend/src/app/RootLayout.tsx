import { Outlet, useLocation } from 'react-router-dom'
import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { CustomCursor, type CursorType } from '@/components/effects/CustomCursor'

interface RootLayoutProps {
  cursorType?: CursorType
  cursorColor?: string
  cursorGlow?: boolean
}

function ScrollReset() {
  const lenis = useLenis()
  const location = useLocation()

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [location.pathname, lenis])

  return null
}

export function RootLayout({ cursorType = 'dot', cursorColor = '#ffffff', cursorGlow = false }: RootLayoutProps) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
      <ScrollReset />
      <Outlet />
      <CustomCursor type={cursorType} color={cursorColor} glow={cursorGlow} />
    </ReactLenis>
  )
}
