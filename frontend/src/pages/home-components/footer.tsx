import { Icon } from '@iconify/react'

const locations = ['Beijing', 'Shanghai', 'Shenzhen']
const legalLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
]

export function Footer() {
  return (
    <footer
      data-section="footer"
      className="relative bg-transparent py-12"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#d4a574]/30" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl tracking-[0.2em] text-[#f5f2ed]">MOLI</span>
            <span className="hidden sm:inline text-[#f5f2ed]/40">—</span>
            <span className="hidden sm:inline text-sm text-[#f5f2ed]/40 italic">The art of being cared for</span>
          </div>

          {/* Locations */}
          <div className="flex items-center gap-4">
            {locations.map((location, index) => (
              <span key={location} className="flex items-center gap-4">
                <span className="text-sm text-[#f5f2ed]/60 hover:text-[#d4a574] transition-colors">
                  {location}
                </span>
                {index < locations.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-[#d4a574]/40" />
                )}
              </span>
            ))}
          </div>

          {/* Contact & Legal */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:concierge@moli.com"
              className="group flex items-center gap-2 text-sm text-[#f5f2ed]/60 hover:text-[#d4a574] transition-colors"
            >
              <Icon icon="lucide:mail" className="w-4 h-4" />
              <span>concierge@moli.com</span>
            </a>

            <div className="flex items-center gap-4 text-sm">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#f5f2ed]/40 hover:text-[#d4a574] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#f5f2ed]/10 text-center">
          <p className="text-xs text-[#f5f2ed]/30">
            © {new Date().getFullYear()} MOLI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
