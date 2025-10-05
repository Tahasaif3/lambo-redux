'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BrandTimeline() {
  const timelineRef = useRef(null);
  const milestones = [
    {
      year: "1963",
      title: "The Beginning",
      description: "Founded with a vision to create the world's most extraordinary automobiles.",
    },
    {
      year: "1975",
      title: "First Championship",
      description: "Dominated the racing circuit with our revolutionary V12 engine design.",
    },
    {
      year: "1988",
      title: "Global Expansion",
      description: "Opened manufacturing facilities across three continents.",
    },
    {
      year: "2001",
      title: "Hypercar Era",
      description: "Launched our first hypercar, setting new standards for performance.",
    },
    {
      year: "2015",
      title: "Hybrid Innovation",
      description: "Introduced hybrid technology without compromising raw power.",
    },
    {
      year: "2024",
      title: "Future Forward",
      description: "Leading the industry with sustainable performance solutions.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from('.timeline-header', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
      });

      // Animate timeline line
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.timeline-line',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
        }
      });

      // Animate each milestone
      const milestoneItems = gsap.utils.toArray('.milestone-item');
      milestoneItems.forEach((item, index) => {
        const isEven = index % 2 === 0;
      //@ts-expect-error: error ignored
        gsap.from(item, {
          opacity: 0,
          x: isEven ? -80 : 80,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });

     //@ts-expect-error: error ignored
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
            //@ts-expect-error: error ignored
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          });
        }

        //@ts-expect-error: error ignored
        const yearElement = item.querySelector('.milestone-year');
        if (yearElement) {
          gsap.from(yearElement, {
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              //@ts-expect-error: error ignored
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          });
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={timelineRef} className="py-24 bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 timeline-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Journey</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Six decades of innovation, passion, and excellence
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500 via-red-600 to-red-500 hidden lg:block" />

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`milestone-item relative grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`${index % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:col-start-2 lg:pl-16"}`}>
                  <div className="inline-block mb-4">
                    <div className="milestone-year text-5xl md:text-6xl font-bold text-primary">
                      {milestone.year}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{milestone.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
                </div>

                {/* Timeline Dot */}
                <div className="timeline-dot hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 rounded-full bg-red-500 ring-8 ring-black shadow-lg shadow-red-500/50" />
                </div>

                {/* Spacer for alternating layout */}
                {index % 2 === 0 ? <div className="hidden lg:block" /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}