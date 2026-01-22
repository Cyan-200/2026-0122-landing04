import { useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'

const cities = ['Beijing', 'Shanghai', 'Shenzhen']

export function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section
      id="booking"
      data-section="booking"
      className="relative bg-transparent py-40"
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="mx-auto max-w-2xl px-6 text-center relative z-10">
        {/* MOLI wordmark */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-sm tracking-[0.4em] text-[#d4a574]/50"
        >
          MOLI
        </motion.span>

        {/* Section label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="block mt-8 text-xs uppercase tracking-[0.3em] text-[#d4a574]"
        >
          Begin
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 font-serif text-4xl md:text-5xl font-medium tracking-wide text-[#f5f2ed]"
        >
          We'd love to welcome you
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-[#f5f2ed]/70"
        >
          Schedule a private tour of our residence in your city. Our concierge will be in touch within 24 hours.
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="mt-12 space-y-8"
        >
          {/* Name Input */}
          <div className="relative">
            <label
              className={`absolute left-0 transition-all duration-300 ${
                focusedField === 'name' || formData.name
                  ? '-top-6 text-xs text-[#d4a574]'
                  : 'top-3 text-[#f5f2ed]/40'
              }`}
            >
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent border-b border-[#f5f2ed]/20 py-3 text-[#f5f2ed] outline-none focus:border-[#d4a574] transition-colors"
            />
            <span
              className={`absolute bottom-0 left-1/2 h-px bg-[#d4a574] transition-all duration-300 ${
                focusedField === 'name' ? 'w-full left-0' : 'w-0'
              }`}
            />
          </div>

          {/* Phone Input */}
          <div className="relative">
            <label
              className={`absolute left-0 transition-all duration-300 ${
                focusedField === 'phone' || formData.phone
                  ? '-top-6 text-xs text-[#d4a574]'
                  : 'top-3 text-[#f5f2ed]/40'
              }`}
            >
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent border-b border-[#f5f2ed]/20 py-3 text-[#f5f2ed] outline-none focus:border-[#d4a574] transition-colors"
            />
            <span
              className={`absolute bottom-0 left-1/2 h-px bg-[#d4a574] transition-all duration-300 ${
                focusedField === 'phone' ? 'w-full left-0' : 'w-0'
              }`}
            />
          </div>

          {/* City Select */}
          <div className="relative">
            <label
              className={`absolute left-0 transition-all duration-300 ${
                focusedField === 'city' || formData.city
                  ? '-top-6 text-xs text-[#d4a574]'
                  : 'top-3 text-[#f5f2ed]/40'
              }`}
            >
              Preferred City
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              onFocus={() => setFocusedField('city')}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent border-b border-[#f5f2ed]/20 py-3 text-[#f5f2ed] outline-none focus:border-[#d4a574] transition-colors appearance-none"
            >
              <option value="" disabled className="bg-[#1a1816]">
                Select a city
              </option>
              {cities.map((city) => (
                <option key={city} value={city} className="bg-[#1a1816]">
                  {city}
                </option>
              ))}
            </select>
            <Icon
              icon="lucide:chevron-down"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f5f2ed]/40 pointer-events-none"
            />
            <span
              className={`absolute bottom-0 left-1/2 h-px bg-[#d4a574] transition-all duration-300 ${
                focusedField === 'city' ? 'w-full left-0' : 'w-0'
              }`}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="group relative mt-12 w-full py-4 border border-[#d4a574] text-[#d4a574] font-medium tracking-wide overflow-hidden transition-colors hover:text-[#1a1816]"
          >
            <span className="relative z-10">Request Private Tour</span>
            <span className="absolute inset-0 bg-[#d4a574] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
