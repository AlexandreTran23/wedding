'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection({ startAnimation = true }: { startAnimation?: boolean }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const leftPhotoRef = useRef<HTMLDivElement>(null);
  const rightPhotoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      // Animation d'entrée plus douce
      const tl = gsap.timeline();
      
      tl.from(namesRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: 'power2.out',
      })
      .from(titleRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: 'power2.out',
      }, '-=0.8')
      .from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.6')
      .from(dateRef.current, {
        opacity: 0,
        y: 15,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.5')
      .from(buttonsRef.current, {
        opacity: 0,
        y: 15,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.4');

      if (leftPhotoRef.current && rightPhotoRef.current) {
        tl.fromTo([leftPhotoRef.current, rightPhotoRef.current], 
          {
            opacity: 0,
            x: (i) => (i === 0 ? -30 : 30),
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: 'power2.out',
          },
          '-=0.8'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Floral Decorations */}
      <div className="absolute top-0 left-0 z-10 w-48 sm:w-64 md:w-80 lg:w-96 opacity-90 pointer-events-none -translate-x-1/4 -translate-y-1/4">
        <Image
          src="/fleur_1.webp"
          alt="Decoration florale"
          width={600}
          height={600}
          className="object-contain"
          priority
        />
      </div>
      <div className="absolute bottom-0 right-0 z-10 w-48 sm:w-64 md:w-80 lg:w-96 opacity-90 pointer-events-none translate-x-1/4 translate-y-1/4">
        <Image
          src="/fleur2.webp"
          alt="Decoration florale"
          width={600}
          height={600}
          className="object-contain"
          priority
        />
      </div>

      {/* Couple Photos */}
      <div 
        ref={leftPhotoRef}
        className="absolute left-4 top-48 md:left-8 md:top-44 lg:left-12 lg:top-1/2 lg:-translate-y-1/2 z-10"
      >
        <div className="w-28 h-36 md:w-32 md:h-44 lg:w-64 lg:h-80 p-1.5 md:p-2 lg:p-3 bg-white shadow-xl rotate-[-6deg] hover:scale-105 hover:rotate-[-3deg] transition-all duration-500 cursor-pointer">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/alex_et_sam_1.jpg"
              alt="Alexandre et Samantha"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 130px, (max-width: 1024px) 150px, 300px"
            />
          </div>
        </div>
      </div>

      <div 
        ref={rightPhotoRef}
        className="absolute right-4 bottom-36 md:right-8 md:bottom-40 lg:right-12 lg:top-1/2 lg:-translate-y-1/2 z-10"
      >
        <div className="w-28 h-36 md:w-32 md:h-44 lg:w-64 lg:h-80 p-1.5 md:p-2 lg:p-3 bg-white shadow-xl rotate-[6deg] hover:scale-105 hover:rotate-[3deg] transition-all duration-500 cursor-pointer">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/alex_et_sam_2.jpeg"
              alt="Alexandre et Samantha"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 130px, (max-width: 1024px) 150px, 300px"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-8 md:px-10 lg:px-12 max-w-4xl mx-auto space-y-3 sm:space-y-4 md:space-y-5">
        <div ref={namesRef} className="space-y-2">
          <p
            className="text-red-600 text-sm sm:text-base md:text-lg tracking-[0.2em] font-semibold"
            style={{
              fontFamily:
                "system-ui, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', 'Noto Sans CJK SC', sans-serif",
            }}
          >
            我们结婚了
          </p>
          <div className="flex flex-col items-center gap-1">
            <p className="text-red-600 font-display text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase font-light">
              Nous nous marions
            </p>
            <span className="text-red-500 text-base sm:text-lg md:text-xl">♥</span>
          </div>
        </div>
        
        <h1
          ref={titleRef}
          className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 leading-[1.05] tracking-wide"
          style={{ fontFamily: 'var(--font-handwriting)' }}
        >
          <span className="block font-normal mb-1 sm:mb-2">Samantha</span>
          <span className="block text-red-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl my-3 sm:my-4 md:my-5 font-normal">&</span>
          <span className="block font-normal mt-1 sm:mt-2">Alexandre</span>
        </h1>
        
        <div ref={subtitleRef} className="pt-1 sm:pt-2">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <div className="h-px w-16 sm:w-24 md:w-32 bg-red-500/30"></div>
            <div className="w-1 h-1 rounded-full bg-red-500/50"></div>
            <div className="h-px w-16 sm:w-24 md:w-32 bg-red-500/30"></div>
          </div>
        </div>
        
        <div ref={dateRef} className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
          <p className="text-red-600 font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">
            Samedi, le 22 Août 2026
          </p>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl font-light tracking-wide">
            Château de Candie
          </p>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg font-light tracking-wide">
            533 Rue du Bois de Candie<br className="sm:hidden" />
            <span className="hidden sm:inline">, </span>73000 Chambéry, France
          </p>
        </div>
        
        {/* Buttons */}
        <div 
          ref={buttonsRef} 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8 md:mt-10"
        >
          <a
            href="/informations"
            className="inline-block bg-transparent text-red-600 rounded-md font-light text-xs sm:text-sm md:text-base tracking-[0.12em] uppercase hover:bg-red-50/50 transition-all duration-300 border-2 border-red-600/40 hover:border-red-600/60 shadow-sm hover:shadow-md px-3 py-1.5 sm:px-4 sm:py-2"
          >
            Informations
          </a>
          
          <a
            href="/rsvp"
            className="inline-block bg-red-600 text-white rounded-md font-light text-xs sm:text-sm md:text-base tracking-[0.12em] uppercase hover:bg-red-700 transition-all duration-300 border border-red-600/20 hover:border-red-700/30 shadow-sm hover:shadow-md px-3 py-1.5 sm:px-4 sm:py-2"
          >
            Répondre
          </a>

          <button
            type="button"
            disabled
            className="inline-block bg-gray-100 text-gray-400 rounded-md font-light text-xs sm:text-sm md:text-base tracking-[0.12em] uppercase border border-gray-200 cursor-not-allowed px-3 py-1.5 sm:px-4 sm:py-2"
          >
            Menu
          </button>
        </div>
      </div>
    </section>
  );
}
