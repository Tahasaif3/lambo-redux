import { Navigation } from "@/components/navigation"
import { VideoHero } from "@/components/video-hero"
import CarSwiperHero from "@/components/featured-models"
import { PerformanceShowcase } from "@/components/performance-showcase"
import { ImmersiveGallery } from "@/components/immersive-gallery"
import { RevealText } from "@/components/reveal-text"
import { ExperienceSection } from "@/components/experience-section"
import { LatestNews } from "@/components/latest-news"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { SmoothScrollWrapper } from "@/components/smooth-scroll-wrapper"

export default function HomePage() {
  return (
    <SmoothScrollWrapper>
      <main className="min-h-screen">
        <Navigation />
        <VideoHero />
        <CarSwiperHero/>
        <PerformanceShowcase />
        <ImmersiveGallery />
        <RevealText />
        <ExperienceSection />
        <LatestNews />
        <CTASection />
        <Footer />
      </main>
    </SmoothScrollWrapper>
  )
}
