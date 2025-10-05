'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, X, Clock, Share2 } from "lucide-react"
import { Navigation } from '@/components/navigation'

export default function NewsPage() {

  interface Article {
  id: number
  title: string
  excerpt: string
  fullContent: string
  image: string
  date: string
  readTime: string
  category: string
}

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const articles = [
    {
      id: 1,
      title: "Introducing the All-New Storm H5 Hypercar",
      excerpt: "Our most powerful vehicle yet pushes the boundaries of performance with 1,500 horsepower and revolutionary aerodynamics.",
      fullContent: "The Storm H5 represents a quantum leap in automotive engineering. With a twin-turbocharged V8 hybrid powertrain producing 1,500 horsepower, this hypercar accelerates from 0-60 mph in just 2.3 seconds. The advanced aerodynamics package generates over 800kg of downforce at speed, while the carbon fiber monocoque chassis weighs just 1,200kg. Inside, driver-focused ergonomics meet cutting-edge technology with a fully digital cockpit and adaptive suspension that reads the road 1,000 times per second.",
      image: "/carbon-fiber-hypercar-aerodynamic.jpg",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Product Launch",
    },
    {
      id: 2,
      title: "Championship Victory at Le Mans",
      excerpt: "Our racing team secures another historic win at the 24 Hours of Le Mans, continuing our legacy of motorsport excellence.",
      fullContent: "In an epic display of endurance and engineering prowess, our racing team has clinched victory at the prestigious 24 Hours of Le Mans. The winning car completed 387 laps, covering over 5,200 kilometers at an average speed of 217 km/h. This marks our fifth consecutive victory at La Sarthe, cementing our position as the dominant force in endurance racing. The race saw intense battles throughout, with our drivers executing flawless pit strategies and maintaining remarkable consistency in ever-changing weather conditions.",
      image: "/luxury-supercar-driving-on-mountain-road-cinematic.jpg",
      date: "March 10, 2024",
      readTime: "7 min read",
      category: "Racing",
    },
    {
      id: 3,
      title: "Sustainable Performance: Our Hybrid Future",
      excerpt: "Discover how we're combining electrification with our signature performance to create the supercars of tomorrow.",
      fullContent: "As we accelerate towards an electrified future, we're proving that sustainability and performance aren't mutually exclusive. Our new hybrid powertrain technology delivers instant torque from electric motors while maintaining the visceral experience of our legendary engines. The advanced battery system, developed in-house, provides 50km of pure electric range for urban driving, while the active energy recovery system harvests power during braking and cornering. This technology will cascade across our entire model range by 2026, reducing emissions by 40% while actually increasing performance metrics.",
      image: "/news.jpg",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: "Innovation",
    },
    {
      id: 4,
      title: "New Flagship Showroom Opens in Dubai",
      excerpt: "Experience our brand in a revolutionary new space that blends architecture, technology, and automotive artistry.",
      fullContent: "Our latest showroom in Dubai's prestigious Downtown district redefines the automotive retail experience. Spanning 5,000 square meters across three levels, the space features a stunning glass façade, rotating display platforms, and immersive VR configuration studios. Visitors can experience our vehicles in a curated environment that celebrates engineering excellence and design philosophy. The showroom also houses an exclusive lounge, private consultation suites, and a heritage gallery showcasing our racing history.",
      image: "/carbon-fiber-hypercar-aerodynamic.jpg",
      date: "March 1, 2024",
      readTime: "4 min read",
      category: "Company News",
    },
    {
      id: 5,
      title: "Behind the Scenes: Aerodynamics Testing",
      excerpt: "Take an exclusive look inside our wind tunnel facility where we perfect every curve and surface for maximum performance.",
      fullContent: "Our state-of-the-art aerodynamics facility operates 24/7, testing full-scale models in wind speeds up to 300 km/h. Using advanced computational fluid dynamics and real-world validation, our engineers optimize every detail from front splitter design to rear diffuser angles. The latest Storm H5 underwent over 1,000 hours of wind tunnel testing, resulting in a drag coefficient of just 0.32 while generating massive downforce. This meticulous approach ensures our vehicles deliver both stunning performance and stability at extreme speeds.",
      image: "/luxury-supercar-driving-on-mountain-road-cinematic.jpg",
      date: "February 28, 2024",
      readTime: "8 min read",
      category: "Technology",
    },
    {
      id: 6,
      title: "Limited Edition Apex Series Announced",
      excerpt: "Only 50 units of this track-focused masterpiece will be produced, featuring exclusive performance upgrades.",
      fullContent: "Introducing the Apex Series - our most extreme road-legal vehicle ever created. Limited to just 50 units worldwide, each Apex features a titanium exhaust system, carbon ceramic brakes, and a track-tuned suspension that's 30% stiffer than standard. Power increases to 1,650 horsepower through ECU optimization and enhanced cooling systems. The interior is stripped down to essentials with racing seats, a roll cage, and Alcantara throughout. Every Apex Series vehicle is individually numbered and comes with a bespoke delivery experience at our factory.",
      image: "/news.jpg",
      date: "February 25, 2024",
      readTime: "5 min read",
      category: "Product Launch",
    },
    {
      id: 7,
      title: "Partnership with Legendary Racing Driver",
      excerpt: "Three-time world champion joins our team as brand ambassador and development consultant.",
      fullContent: "We're thrilled to announce a multi-year partnership with motorsport legend Marcus Bernstein. The three-time world champion will serve as our brand ambassador while contributing to vehicle development and driver training programs. Marcus brings decades of racing expertise and will work closely with our engineering team to refine chassis dynamics and driver feedback systems. He'll also lead our exclusive track day experiences, offering customers the opportunity to learn from one of the greatest drivers of all time.",
      image: "/carbon-fiber-hypercar-aerodynamic.jpg",
      date: "February 20, 2024",
      readTime: "6 min read",
      category: "Racing",
    },
    {
      id: 8,
      title: "Carbon Fiber Innovation Breakthrough",
      excerpt: "Our new manufacturing process creates stronger, lighter components while reducing production time by 40%.",
      fullContent: "After five years of research, we've revolutionized carbon fiber manufacturing with a proprietary curing process that increases tensile strength by 25% while cutting production time dramatically. This breakthrough enables us to create more complex geometries with fewer joints, resulting in lighter and stronger chassis components. The technology also reduces waste by 60% and lowers energy consumption, aligning with our sustainability goals. This innovation will be implemented across our entire production line starting next quarter.",
      image: "/luxury-supercar-driving-on-mountain-road-cinematic.jpg",
      date: "February 15, 2024",
      readTime: "7 min read",
      category: "Innovation",
    },
    {
      id: 9,
      title: "Customer Track Day Series Expands Globally",
      excerpt: "Our exclusive track experience program now available at 15 circuits across three continents.",
      fullContent: "We're expanding our popular customer track day program to 15 world-class circuits including Spa-Francorchamps, Laguna Seca, and Suzuka. Participants receive professional instruction, telemetry analysis, and the opportunity to push their vehicles to the limit in a safe, controlled environment. Each event includes technical seminars, pit lane tours, and networking opportunities with fellow enthusiasts. The program has become one of our most valued customer experiences, with over 2,000 participants annually and consistently outstanding feedback.",
      image: "/news.jpg",
      date: "February 10, 2024",
      readTime: "5 min read",
      category: "Events",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <Navigation/>
      {/* Hero Section */}
      <section className="pt-32 pb-16 container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="h-px w-12 bg-gradient-to-r from-red-600 to-orange-500" />
            <span className="text-sm font-medium bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent tracking-wider uppercase">
              Latest News
            </span>
          </div>
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl mb-6 text-white animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            News &<br />
            <span className="text-primary">
              Updates
            </span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Stay informed about our latest vehicle launches, racing achievements, and company developments.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-24 container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card
              key={article.id}
              className="overflow-hidden bg-zinc-900/50 border-zinc-800 backdrop-blur-sm group hover:border-red-600/50 transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-bottom-10 hover:shadow-2xl hover:shadow-red-600/20"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg">
                    {article.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-colors duration-500 z-10" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-orange-500 group-hover:bg-clip-text transition-all duration-300">
                  {article.title}
                </h3>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                  {article.excerpt}
                </p>
                              
               <Button
                variant="ghost"
                className="
                  group/btn 
                  relative 
                  overflow-hidden 
                  px-4 py-2 
                  h-auto 
                  font-semibold 
                  text-zinc-300 
                  bg-zinc-900 
                  rounded-md 
                  shadow-md 
                  hover:text-white 
                  hover:bg-red-600 
                  transition-all 
                  duration-300
                "
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedArticle(article)
                }}
              >
                <span className="relative z-10 flex items-center">
                  Read More
                  <ArrowRight 
                    size={16} 
                    className="ml-2 transform transition-transform duration-300 group-hover/btn:translate-x-2" 
                  />
                </span>
                {/* subtle hover effect */}
                <span className="absolute inset-0 bg-red-600 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300 rounded-md"></span>
              </Button>

              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedArticle(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-zinc-800/80 backdrop-blur-sm text-zinc-400 hover:text-white hover:bg-red-600 transition-all duration-300 hover:rotate-90"
            >
              <X size={20} />
            </button>

            {/* Hero Image */}
            <div className="relative h-[50vh] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent z-10" />
              <img
                src={selectedArticle.image || "/placeholder.svg"}
                alt={selectedArticle.title}
                className="object-cover w-full h-full animate-in zoom-in-105 duration-1000"
              />
              <div className="absolute bottom-8 left-8 z-20 animate-in slide-in-from-bottom-4 duration-700 delay-300">
                <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg mb-4">
                  {selectedArticle.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-6 text-sm text-zinc-500 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{selectedArticle.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{selectedArticle.readTime}</span>
                </div>
                <button className="ml-auto flex items-center gap-2 text-zinc-400 hover:text-red-600 transition-colors">
                  <Share2 size={14} />
                  <span>Share</span>
                </button>
              </div>

              <h1 className="font-bold text-4xl md:text-5xl mb-6 text-white leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                {selectedArticle.title}
              </h1>

              <p className="text-xl text-zinc-400 mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                {selectedArticle.excerpt}
              </p>

              <div className="prose prose-invert prose-zinc max-w-none animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
                <p className="text-zinc-300 leading-relaxed text-lg">
                  {selectedArticle.fullContent}
                </p>
              </div>

              {/* Call to Action */}
              <div className="mt-12 pt-8 border-t border-zinc-800 animate-in fade-in duration-700 delay-500">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold px-8 py-6 text-base transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50">
                    Explore Our Vehicles
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-zinc-700 text-zinc-300 hover:border-red-600 hover:text-red-600 hover:bg-transparent font-semibold px-8 py-6 text-base transition-all duration-300"
                  >
                    View All News
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}