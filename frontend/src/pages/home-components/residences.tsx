import { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const hotels = [
  {
    city: 'Beijing',
    name: 'Rosewood Beijing',
    image: `${import.meta.env.BASE_URL}images/rosewood-beijing.jpg`,
  },
  {
    city: 'Shanghai',
    name: 'The Peninsula Shanghai',
    image: `${import.meta.env.BASE_URL}images/peninsula-shanghai.jpg`,
  },
  {
    city: 'Shenzhen',
    name: 'Park Hyatt Shenzhen',
    image: `${import.meta.env.BASE_URL}images/park-hyatt-shenzhen.jpg`,
  },
]

export function Residences() {
  const sectionRef = useRef<HTMLElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    imagesRef.current.forEach((img, index) => {
      if (!img) return

      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.95, y: 60 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.15,
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="residences"
      data-section="residences"
      className="relative min-h-screen bg-transparent py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">
          {/* Left: Sticky Text Column */}
          <div className="lg:w-[40%] lg:sticky lg:top-32 lg:self-start">
            <div className="relative pl-8 border-l-2 border-[#d4a574]/30">
              {/* Grain texture background */}
              <div className="absolute -inset-4 -left-0 bg-[#1a1816]/60 backdrop-blur-sm rounded-lg noise-overlay -z-10" />

              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs uppercase tracking-[0.3em] text-[#d4a574]"
              >
                Residences
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mt-6 font-serif text-4xl md:text-5xl font-medium tracking-wide text-[#f5f2ed] leading-tight"
              >
                The city's most coveted address, now yours
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-8 text-[#f5f2ed]/70 leading-relaxed"
              >
                We partner exclusively with Rosewood Beijing, The Peninsula Shanghai, and Park Hyatt Shenzhen. Your suite — from 55 to 125 square meters — comes with Frette linens, Le Labo amenities, and Michelin-crafted meals. Not because we added them. Because this is simply the standard.
              </motion.p>
            </div>
          </div>

          {/* Right: Scrolling Images */}
          <div className="lg:w-[60%] space-y-[-60px]">
            {hotels.map((hotel, index) => (
              <div
                key={hotel.name}
                ref={(el) => { imagesRef.current[index] = el }}
                className="group relative"
                style={{ zIndex: hotels.length - index }}
              >
                <div className="relative overflow-hidden rounded-[20px] border-2 border-[#d4a574]/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(212,165,116,0.3)]">
                  <div className="aspect-[3/4]">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816]/80 via-transparent to-transparent" />

                  {/* Hotel Info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#d4a574]">
                      {hotel.city}
                    </span>
                    <h3 className="mt-1 font-serif text-xl text-[#f5f2ed]">
                      {hotel.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
