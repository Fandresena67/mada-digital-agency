import Hero from '../components/Hero'
import ServicesSection from '../components/ServicesSection'
import WhyChooseUs from '../components/WhyChooseUs'
import ProjectsSection from '../components/ProjectsSection'
import StatsSection from '../components/StatsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import CTASection from '../components/CTASection'

// Page d'accueil — sections ajoutées étape par étape
function Home() {
  return (
    <div>
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <ProjectsSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}

export default Home
