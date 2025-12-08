'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface InvitationRevealProps {
  children: ReactNode;
  onOpen?: () => void;
}

export default function InvitationReveal({ children, onOpen }: InvitationRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const decorationsRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.pointerEvents = 'auto';
      containerRef.current.style.opacity = '1';
      containerRef.current.style.display = 'flex';
    }
  }, []);

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);

    if (onOpen) onOpen();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.pointerEvents = 'none';
            containerRef.current.style.display = 'none';
          }
        },
      });

      tl.to(buttonRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'back.in(1.7)',
      })
        .to(
          decorationsRef.current,
          {
            opacity: 0,
            duration: 0.4,
            ease: 'power1.out',
          },
          '<',
        )
        .to(
          [leftPanelRef.current, rightPanelRef.current],
          {
            rotationY: (i: number) => (i === 0 ? -140 : 140),
            duration: 2.1,
            ease: 'power3.inOut',
            transformOrigin: (i: number) => (i === 0 ? 'left center' : 'right center'),
            stagger: 0,
          },
          '-=0.1',
        )
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: 'power1.in',
          },
          '-=0.9',
        );
    }, containerRef);

    return () => ctx.revert();
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Cover / Envelope */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-100 flex items-center justify-center perspective-[2000px] overflow-hidden bg-linear-to-br from-red-900 via-red-800 to-red-700"
      >
        {/* Floral background on closed envelope (above panels) */}
        <div ref={decorationsRef} className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-95">
          {/* Stamp */}
          <div className="absolute left-6 bottom-6 sm:left-10 sm:bottom-10 w-20 sm:w-24 md:w-28 opacity-80 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <Image
              src="/png-clipart-double-happiness-symbol-jasmine-tea-miscellaneous-photography-removebg-preview 1.png"
              alt="Timbre double bonheur"
              width={300}
              height={300}
              className="w-full h-auto object-contain"
              priority
              style={{
                filter:
                  'sepia(1) saturate(2.2) hue-rotate(-15deg) brightness(1.05)',
              }}
            />
          </div>
        </div>

        {/* Left Panel */}
        <div
          ref={leftPanelRef}
          className="absolute left-0 top-0 w-1/2 h-full bg-linear-to-br from-red-900 via-red-800 to-red-700 border-r border-red-500/40 origin-left flex items-center justify-end shadow-[5px_0_30px_rgba(0,0,0,0.45)] z-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-6 border border-red-gold/50" />
          <div className="absolute inset-10 border border-red-gold/40" />
        </div>

        {/* Right Panel */}
        <div
          ref={rightPanelRef}
          className="absolute right-0 top-0 w-1/2 h-full bg-linear-to-bl from-red-900 via-red-800 to-red-700 border-l border-red-500/40 origin-right flex items-center justify-start shadow-[-5px_0_30px_rgba(0,0,0,0.45)] z-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-6 border border-red-gold/50" />
          <div className="absolute inset-10 border border-red-gold/40" />
        </div>

        {/* Seal / Button */}
        <div ref={buttonRef} onClick={handleOpen} className="relative z-30 flex flex-col items-center gap-4 cursor-pointer group">
          <div
            className="w-20 h-20 md:w-24 md:h-24 bg-red-700 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300 relative"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #dc2626, #991b1b)',
              boxShadow: '0 10px 25px -5px rgba(153, 27, 27, 0.6)',
            }}
          >
            <div className="w-[85%] h-[85%] border border-red-400/40 rounded-full flex items-center justify-center bg-red-700/40">
              <span className="font-display text-white text-sm md:text-base font-light tracking-[0.18em] md:tracking-[0.28em] opacity-90 whitespace-nowrap">
                A &amp; S
              </span>
            </div>
          </div>
          <span className="font-display text-red-100 text-xs md:text-sm tracking-[0.25em] uppercase opacity-90 transition-all duration-500">
            Cliquer pour ouvrir l&apos;invitation
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
