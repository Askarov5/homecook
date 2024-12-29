// Code: Home Page
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import TopRatedChefs from './components/TopRatedChefs'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchBar />
      <TopRatedChefs />
      <Features />
      <HowItWorks />
      <Testimonials />
    </>
  )
}

