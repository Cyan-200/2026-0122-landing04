import { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const content = contentRef.current

    if (!section || !image || !content) return

    // Parallax effect on scroll
    gsap.to(image, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Text fade out faster
    gsap.to(content, {
      opacity: 0,
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '50% top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-section="hero"
      className="relative h-screen w-full overflow-hidden bg-transparent"
    >
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-[1]"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/hero-mother-suite.jpg`}
          alt="Serene hotel suite"
          className="w-full h-full object-cover scale-105"
        />
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(26,24,22,0.4)_50%,rgba(26,24,22,0.9)_100%)]" />
        {/* Noise Texture */}
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[20] flex flex-col items-center justify-center h-full text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-medium tracking-[0.08em] text-[#f5f2ed] leading-tight max-w-4xl"
        >
          Where new life begins in absolute calm
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg tracking-wide text-[#f5f2ed]/70 max-w-xl"
        >
          The private postpartum sanctuary within Asia's finest hotels
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-16 bg-gradient-to-b from-[#d4a574] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
