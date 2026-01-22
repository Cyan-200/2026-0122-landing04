import {
  HomeCanvas,
  Nav,
  Hero,
  Residences,
  Care,
  Intelligence,
  Booking,
  Footer,
} from './home-components'

export default function HomePage() {
  return (
    <>
      {/* 3D Canvas Background */}
      <HomeCanvas />

      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <main className="relative">
        <Hero />
        <Residences />
        <Care />
        <Intelligence />
        <Booking />
        <Footer />
      </main>
    </>
  )
}
