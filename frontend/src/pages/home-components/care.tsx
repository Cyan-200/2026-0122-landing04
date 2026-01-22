import { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/react'

gsap.registerPlugin(ScrollTrigger)

const careServices = [
  {
    icon: 'lucide:heart-pulse',
    title: '24/7 Private Nursing',
    description: 'One nurse, one family. Always present, never intrusive.',
  },
  {
    icon: 'lucide:baby',
    title: 'Lactation Support',
    description: 'Board-certified specialists guiding every feeding milestone.',
  },
  {
    icon: 'lucide:flower-2',
    title: 'Postpartum Recovery',
    description: 'Pelvic floor rehabilitation, body restoration, gentle return to strength.',
  },
  {
    icon: 'lucide:salad',
    title: 'Nutritional Care',
    description: 'Personalized meal programs designed by certified nutritionists.',
  },
]

export function Care() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardsWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = cardsContainerRef.current
    const wrapper = cardsWrapperRef.current

    if (!section || !container || !wrapper) return

    const cards = wrapper.querySelectorAll('.care-card')
    const totalWidth = wrapper.scrollWidth - container.offsetWidth

    // Horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 20%',
        end: () => `+=${totalWidth + 200}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    })

    tl.to(wrapper, {
      x: -totalWidth,
      ease: 'none',
    })

    // Individual card reveals
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0.3, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: 'left 80%',
            end: 'left 50%',
            scrub: true,
          },
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
      id="care"
      data-section="care"
      className="relative bg-transparent py-32 overflow-hidden"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a574]/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-[#d4a574]"
          >
            Care Philosophy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-serif text-4xl md:text-5xl font-medium tracking-wide text-[#f5f2ed]"
          >
            You rest. We handle everything.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-[#f5f2ed]/70 max-w-xl mx-auto"
          >
            Every mother is paired with a dedicated care team — available around the clock, invisible until needed.
          </motion.p>
        </div>

        {/* Horizontal Scroll Cards */}
        <div ref={cardsContainerRef} className="overflow-hidden">
          <div
            ref={cardsWrapperRef}
            className="flex gap-8"
            style={{ width: 'max-content' }}
          >
            {careServices.map((service, index) => (
              <div
                key={service.title}
                className="care-card group w-[350px] flex-shrink-0"
              >
                <div className="relative h-full p-8 rounded-2xl border border-[#d4a574]/20 bg-[#f5f2ed]/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-[#f5f2ed]/10 hover:shadow-[0_0_60px_-15px_rgba(212,165,116,0.2)]">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <Icon
                      icon={service.icon}
                      className="w-12 h-12 text-[#d4a574] transition-transform duration-500 group-hover:rotate-[5deg]"
                    />
                    {/* Glow on hover */}
                    <div className="absolute inset-0 w-12 h-12 bg-[#d4a574]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-2xl text-[#f5f2ed] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#f5f2ed]/60 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Index number */}
                  <span className="absolute top-6 right-6 font-serif text-6xl text-[#d4a574]/10">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
