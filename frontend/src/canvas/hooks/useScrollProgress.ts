import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'

/**
 * Hook to track scroll progress (0 to 1)
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => {
      const scrollProgress = lenis.progress || 0
      setProgress(scrollProgress)
    }

    lenis.on('scroll', handleScroll)
    return () => lenis.off('scroll', handleScroll)
  }, [lenis])

  return progress
}
