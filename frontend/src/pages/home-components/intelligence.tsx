import { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: 'lucide:thermometer',
    title: 'Environment Monitoring',
    description: 'Temperature, humidity, air quality — always optimal, automatically.',
  },
  {
    icon: 'lucide:moon-star',
    title: 'Sleep Intelligence',
    description: "Baby's sleep patterns visualized, insights delivered daily.",
  },
  {
    icon: 'lucide:bell-ring',
    title: 'One-Tap Response',
    description: 'Nurse, meal service, housekeeping — a single touch away.',
  },
  {
    icon: 'lucide:file-heart',
    title: 'Health Reports',
    description: 'Weekly comprehensive reports for mother and baby. Your peace of mind, documented.',
  },
]

export function Intelligence() {
  const sectionRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<(HTMLDivElement | null)[]>([])
  const borderRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Staggered reveal for features
    featuresRef.current.forEach((feature, index) => {
      if (!feature) return

      gsap.fromTo(
        feature,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: feature,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.15,
        }
      )

      // Border fill animation
      const border = borderRefs.current[index]
      if (border) {
        gsap.fromTo(
          border,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: feature,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="intelligence"
      data-section="intelligence"
      className="relative bg-transparent py-32"
    >
      {/* Radial glow behind device mockup */}
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,165,116,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left: Features List */}
          <div className="lg:w-[55%]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.3em] text-[#d4a574]"
            >
              Intelligence
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 font-serif text-4xl md:text-5xl font-medium tracking-wide text-[#f5f2ed] leading-tight"
            >
              Technology that disappears into care
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-[#f5f2ed]/70 max-w-lg"
            >
              Smart doesn't mean complicated. Our system monitors, tracks, and reports — so you can simply be present.
            </motion.p>

            {/* Features */}
            <div className="mt-12 space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  ref={(el) => { featuresRef.current[index] = el }}
                  className="group relative pl-6 transition-all duration-300 hover:pl-8"
                >
                  {/* Animated border */}
                  <div
                    ref={(el) => { borderRefs.current[index] = el }}
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#d4a574] origin-top"
                  />

                  <div className="flex items-start gap-4">
                    <Icon
                      icon={feature.icon}
                      className="w-5 h-5 mt-1 text-[#d4a574] flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-serif text-xl text-[#f5f2ed] group-hover:text-[#d4a574] transition-colors">
                        {feature.title}
                        <Icon
                          icon="lucide:arrow-right"
                          className="inline-block ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        />
                      </h3>
                      <p className="mt-1 text-[#f5f2ed]/60 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: App Mockup */}
          <div className="lg:w-[45%] flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
              style={{
                transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
              }}
            >
              {/* Phone Frame */}
              <div className="relative w-[280px] h-[580px] bg-[#0f0d0c] rounded-[40px] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),0_0_60px_-15px_rgba(212,165,116,0.15)]">
                {/* Screen */}
                <div className="w-full h-full bg-[#1a1816] rounded-[32px] overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-6 py-3 text-[10px] text-[#f5f2ed]/60">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <Icon icon="lucide:signal" className="w-3 h-3" />
                      <Icon icon="lucide:wifi" className="w-3 h-3" />
                      <Icon icon="lucide:battery-full" className="w-3 h-3" />
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="px-5 pt-2">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-serif text-lg text-[#f5f2ed]">Good Morning</span>
                      <div className="w-8 h-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center">
                        <Icon icon="lucide:bell" className="w-4 h-4 text-[#d4a574]" />
                      </div>
                    </div>

                    {/* Room Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {[
                        { label: 'Temp', value: '24°C', icon: 'lucide:thermometer' },
                        { label: 'Humidity', value: '55%', icon: 'lucide:droplets' },
                        { label: 'Air', value: 'Good', icon: 'lucide:wind' },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-[#f5f2ed]/5 rounded-xl p-3 text-center">
                          <Icon icon={stat.icon} className="w-4 h-4 mx-auto mb-1 text-[#d4a574]" />
                          <div className="text-xs text-[#f5f2ed]/60">{stat.label}</div>
                          <div className="text-sm font-medium text-[#f5f2ed]">{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Sleep Card */}
                    <div className="bg-[#f5f2ed]/5 rounded-2xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-[#f5f2ed]">Baby Sleep</span>
                        <span className="text-xs text-[#d4a574]">Today</span>
                      </div>
                      {/* Simple chart visualization */}
                      <div className="flex items-end gap-1 h-16">
                        {[40, 80, 60, 90, 70, 85, 50, 95].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                            className="flex-1 bg-gradient-to-t from-[#d4a574] to-[#d4a574]/30 rounded-t"
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-[10px] text-[#f5f2ed]/40">
                        <span>12AM</span>
                        <span>6AM</span>
                        <span>12PM</span>
                        <span>6PM</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <button className="flex items-center gap-2 bg-[#d4a574] rounded-xl p-3 text-[#1a1816]">
                        <Icon icon="lucide:phone-call" className="w-4 h-4" />
                        <span className="text-xs font-medium">Call Nurse</span>
                      </button>
                      <button className="flex items-center gap-2 bg-[#f5f2ed]/10 rounded-xl p-3 text-[#f5f2ed]">
                        <Icon icon="lucide:utensils" className="w-4 h-4" />
                        <span className="text-xs font-medium">Meal Service</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0f0d0c] rounded-full" />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-[#1a1816] border border-[#d4a574]/30 rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-[#f5f2ed]">All systems normal</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
