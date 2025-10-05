import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { ModelGallery } from "@/components/model-gallery"
import { ModelSpecs } from "@/components/model-specs"
import { Button } from "@/components/ui/button"
import { carModels } from "@/lib/models-data"
import { ArrowLeft, Settings, Play, Download, Share2, DownloadIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ModelDetailWrapper } from "@/components/ModelDetailAnimations"

export function generateStaticParams() {
  return carModels.map((model) => ({
    id: model.id,
  }))
}

export default function ModelDetailPage({ params }: { params: { id: string } }) {
  const model = carModels.find((m) => m.id === params.id)

  if (!model) {
    notFound()
  }

  // Video URLs for each model (you can customize these)
  const videoUrl = `https://res.cloudinary.com/dfsruso6z/video/upload/v1759444778/Lamborghini_Revuelto_From_Now_On_psyd38.mp4`

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <ModelDetailWrapper>

      {/* Hero Video Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Video/Image Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster={model.image}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        {/* Back Button */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-24">
          <Link
            href="/models"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Models</span>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-end pb-24">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              {/* Series Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-0.5 w-16 bg-gradient-to-r from-yellow-400 to-orange-500" />
                <span className="text-sm font-semibold text-yellow-500 uppercase tracking-[0.3em]">
                  {model.series}
                </span>
              </div>

              {/* Model Name */}
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tight">
                {model.name}
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-zinc-300 mb-10 leading-relaxed max-w-3xl">
                {model.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href={`/configures/${model.id}`}>
                  <Button 
                    size="lg" 
                    className="px-8 py-6 text-base bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105"
                  >
                    <Settings size={20} className="mr-2" />
                    Configure Your {model.name}
                  </Button>
                </Link>
                <Link href="/testdrive">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="px-8 py-6 text-base bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
                  >
                    Request Test Drive
                  </Button>
                </Link>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-5">
                  <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    {model.specs.horsepower}
                  </div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mt-2">HP</div>
                </div>
                <div className="bg-black/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-5">
                  <div className="text-4xl font-black text-white">{model.specs.acceleration}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mt-2">0-60 MPH</div>
                </div>
                <div className="bg-black/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-5">
                  <div className="text-4xl font-black text-white">{model.specs.topSpeed}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mt-2">Top Speed</div>
                </div>
                <div className="bg-black/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-5">
                  <div className="text-2xl font-black text-white">{model.specs.engine}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mt-2">Engine</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sound On Button */}
        <button className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group z-20">
          <Play size={24} className="text-white ml-1 group-hover:scale-110 transition-transform" />
        </button>
      </section>

      {/* Specs Section with Dark Theme */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900">
        <ModelSpecs model={model} />
      </section>

      {/* Engineering Excellence Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-0.5 w-16 bg-gradient-to-r from-yellow-400 to-orange-500" />
                <span className="text-sm font-semibold text-yellow-500 uppercase tracking-[0.3em]">
                  Engineering
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                Precision in<br />Every Detail
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                The {model.name} represents the culmination of decades of racing heritage and cutting-edge innovation.
                Every component has been meticulously engineered to deliver an unparalleled driving experience.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                From the advanced aerodynamics to the precision-tuned suspension, every aspect of this vehicle has been
                optimized for maximum performance without compromising on luxury or comfort.
              </p>
              <div className="flex gap-4">
                <Link href="/brochures">
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:shadow-lg hover:shadow-orange-500/50">
                    <Download size={18} className="mr-2" />
                    Download Brochure
                  </Button>
                </Link>
                <Button variant="outline" className="border-zinc-800 hover:bg-zinc-900">
                  <Share2 size={18} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800">
              <Image 
                src="/engine.jpg" 
                alt="Engine detail" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-zinc-950">
        <ModelGallery model={model} />
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Key Features</h2>
            <p className="text-zinc-500 text-lg">Advanced technology meets uncompromising performance</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⚡", title: "Active Aerodynamics", description: "Intelligent downforce optimization" },
              { icon: "🎯", title: "Rear-Wheel Steering", description: "Enhanced agility and control" },
              { icon: "🔧", title: "Adaptive Suspension", description: "Dynamic ride adjustment" },
              { icon: "⚙️", title: "Carbon Fiber Body", description: "Lightweight rigid structure" }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-yellow-500/50 hover:bg-zinc-900/80 transition-all group"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Experience Excellence?</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
            Contact your nearest dealer to schedule a private viewing or test drive of the {model.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dealers">
              <Button 
                size="lg" 
                className="px-8 py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-base hover:shadow-2xl hover:shadow-orange-500/50"
              >
                Find a Dealer
              </Button>
            </Link>
         <Link href={`/brochures`}>
          <Button 
            size="lg" 
            variant="outline"
            className="px-8 py-6 border-2 border-zinc-800 text-white transition-all duration-300 ease-in-out
                      hover:border-yellow-500 hover:text-yellow-500 hover:scale-105"
          >
            <DownloadIcon size={20} className="mr-2" />
            Download Brochure
          </Button>
        </Link>
          </div>
        </div>
      </section>
      </ModelDetailWrapper>
    </main>
  )
}

