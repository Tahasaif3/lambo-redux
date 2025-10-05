import Link from "next/link"
import { Instagram, Youtube, Facebook, Twitter, Send } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-zinc-950 to-black border-t border-zinc-800">
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="font-display text-3xl font-bold tracking-tighter text-white">SUPERCAR</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6 max-w-sm">
              Redefining automotive excellence through innovation, performance, and timeless design.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
              ].map(({ icon: Icon, label }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Models */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-zinc-200 mb-6">Models</h3>
            <ul className="space-y-3">
              {[
                { name: "Revuelto", href: "/models/revuelto" },
                { name: "Huracán STO", href: "/models/huracan-sto" },
                { name: "Urus Performante", href: "/models/urus-performante" },
                { name: "View All Models", href: "/models" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-zinc-200 mb-6">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "Our Story", href: "/story" },
                { name: "News & Media", href: "/news" },
                { name: "Find a Dealer", href: "/dealers" },
                { name: "Contact Us", href: "/dealers" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-zinc-200 mb-6">Stay Updated</h3>
            <p className="text-sm text-zinc-400 mb-4">
              Subscribe for the latest news, models, and events.
            </p>
          <div className="mt-6">
            <form className="flex flex-col gap-2 w-full">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 transition-colors text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500">© 2025 Supercar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item, i) => (
              <Link
                key={i}
                href="/privacypolicy"
                className="text-xs text-zinc-500 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
