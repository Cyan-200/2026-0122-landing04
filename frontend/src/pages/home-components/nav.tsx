import { useState, useEffect } from 'react'
import { useLenis } from 'lenis/react'
import { motion } from 'motion/react'

const navLinks = [
  { label: 'Experience', href: '#hero' },
  { label: 'Residences', href: '#residences' },
  { label: 'Care', href: '#care' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href)
    if (target && lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -80 })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1a1816]/80 backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#hero')}
          className="font-serif text-2xl tracking-[0.2em] text-[#f5f2ed] hover:text-[#d4a574] transition-colors"
        >
          MOLI
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="group relative text-sm tracking-wide text-[#f5f2ed]/80 hover:text-[#f5f2ed] transition-colors"
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 w-0 h-px bg-[#d4a574] transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => handleNavClick('#booking')}
          className="group relative px-6 py-2.5 border border-[#d4a574] text-sm tracking-wide text-[#d4a574] overflow-hidden transition-colors hover:text-[#1a1816]"
        >
          <span className="relative z-10">Book a Tour</span>
          <span className="absolute inset-0 bg-[#d4a574] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </button>
      </div>
    </motion.nav>
  )
}
