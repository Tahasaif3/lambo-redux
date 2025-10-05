"use client"

import type React from "react"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh()

    // Add smooth scroll behavior
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (anchor) {
        e.preventDefault()
        const href = anchor.getAttribute("href")
        if (href && href !== "#") {
          const element = document.querySelector(href)
          if (element) {
            gsap.to(window, {
              duration: 1.5,
              scrollTo: { y: element, offsetY: 80 },
              ease: "power3.inOut",
            })
          }
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <>{children}</>
}
