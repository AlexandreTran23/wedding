'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

const INFO_IMAGES = [
  '/infos-accueil-01.jpg',
  '/infos-artp4008.jpg',
  '/infos-artprism-dji-0953.jpg',
  '/infos-canide-artprism-47-retouche_3_123516-169097545849643.jpeg',
  '/infos-chateau-de-candie-exterieur-32-lucas-pavy.jpg',
  '/infos-espace-detente-feat.jpg',
  '/infos-piscine-chateau-de-candieartprism.jpg',
  '/infos-shooting-inspiration-chateau-de-candie-14102024-tad-vision-photographie-291.jpg',
  '/infos-20240627-105747-768x1364.png',
];

export default function InformationsPage() {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const amount = direction === 'left' ? -320 : 320;
    carouselRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen bg-white">
      {/* Header with back button */}
      <div className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-500/20">
        <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-red-600 hover:text-red-700 transition-colors font-normal text-sm sm:text-base tracking-wide flex items-center gap-2"
          >
            <span>←</span>
            <span>Retour</span>
          </button>
          <h1 className="font-display text-lg sm:text-xl text-red-600 font-medium tracking-wide">Informations</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Gallery Section */}
      <AnimatedSection className="w-full py-6 sm:py-8 md:py-8">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="w-full mx-auto">
            <div className="py-2 md:py-3">
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-gray-900 text-center mb-4 sm:mb-5 md:mb-6 tracking-wide"
                style={{ fontWeight: 600 }}
              >
                Le Château de Candie
              </h2>
            </div>
            <p className="text-center text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-2 sm:mb-3">
              Nous sommes impatients de vous retrouver tous ensemble pour célébrer notre mariage dans une ambiance chaleureuse et conviviale,
              et très heureux de vous compter parmi nos invités.
            </p>
            <div className="flex justify-center mb-4 sm:mb-6">
              <span className="text-red-500 text-lg sm:text-xl">♥</span>
            </div>
            
            <div className="flex justify-center w-full">
              <div className="relative aspect-4/3 overflow-hidden rounded-sm w-full md:w-3/4 lg:w-2/3">
                <Image
                  src="/infos-canide-artprism-47-retouche_3_123516-169097545849643.jpeg"
                  alt="Château de Candie"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Infos Photos Carousel */}
      <AnimatedSection className="w-full py-4 sm:py-6 md:py-8 bg-white">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="w-full mx-auto">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-gray-900 text-center mb-4 sm:mb-6 tracking-wide">
              Quelques vues du lieu
            </h3>
            <div className="relative">
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center rounded-full bg-white/90 border border-gray-200 shadow-sm hover:bg-white"
                aria-label="Précédent"
              >
                ‹
              </button>
              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              >
                {INFO_IMAGES.map((src, index) => (
                  <div
                    key={src}
                    className="relative min-w-[220px] sm:min-w-[260px] md:min-w-[320px] aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-sm"
                  >
                    <Image
                      src={src}
                      alt={`Vue du château ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 320px"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center rounded-full bg-white/90 border border-gray-200 shadow-sm hover:bg-white"
                aria-label="Suivant"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>


      {/* Address Section */}
      <AnimatedSection className="w-full py-6 sm:py-8 md:py-8 bg-white">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <div className="text-4xl sm:text-5xl mb-2">📍</div>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-red-600 font-medium tracking-wide mb-4">
            Adresse
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <p className="text-gray-800 text-lg sm:text-xl md:text-2xl font-medium tracking-wide">
              Château de Candie
            </p>
            <p className="text-gray-600 text-base sm:text-lg font-normal tracking-wide">
              533 Rue du Bois de Candie
            </p>
            <p className="text-gray-600 text-base sm:text-lg font-normal tracking-wide">
              73000 Chambéry, France
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Château+de+Candie,+533+Rue+du+Bois+de+Candie,+73000+Chambéry,+France"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 sm:px-6 py-2 sm:py-2.5 text-red-600 border border-red-600/40 rounded-sm font-medium text-xs sm:text-sm tracking-wide uppercase hover:bg-red-50 hover:border-red-600 transition-all"
            >
              Voir sur la carte
            </a>
            <a
              href="https://chateaudecandie.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 sm:px-6 py-2 sm:py-2.5 text-white bg-red-600 border border-red-600 rounded-sm font-medium text-xs sm:text-sm tracking-wide uppercase hover:bg-red-700 hover:border-red-700 transition-all shadow-sm"
            >
              Plus d&apos;informations sur le lieu
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* Timeline Section */}
      <AnimatedSection className="w-full py-6 sm:py-8 md:py-8 bg-white">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="w-full mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-gray-900 text-center mb-4 sm:mb-5 md:mb-6 font-medium tracking-wide">
              Programme de la Journée
            </h2>
            <p className="text-center text-gray-600 text-sm sm:text-base mb-4 sm:mb-5 max-w-2xl mx-auto italic">
              Le programme est voué à subir des modifications jusqu&apos;à la date du mariage.
            </p>
            <p className="flex items-center justify-center gap-2 text-sm sm:text-base mb-6 sm:mb-8 md:mb-10 px-4 py-2 rounded-full bg-red-50 text-red-700 font-medium mx-auto text-center w-fit">
              <span>🤵‍♂️</span>
              <span className="text-center">
                Il n&apos;y a pas de dress code particulier : venez comme vous êtes, élégants et à l&apos;aise.
              </span>
            </p>
            
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-100 via-red-200 to-red-100 -translate-x-1/2"></div>
              
              <div className="space-y-6">
                {[
                  { time: '15h30', event: 'Accueil des invités', location: 'Château de Candie', icon: '👋' },
                  { time: '16h', event: 'Début de la cérémonie', location: 'Château de Candie', icon: '💍' },
                  { time: '17h', event: "Vin d'honneur", location: 'Château de Candie', icon: '🥂' },
                  { time: '19h30', event: 'Dîner', location: 'Château de Candie', icon: '🍽️' },
                  { time: '22h', event: 'Ouverture du bal', location: 'Château de Candie', icon: '💃' },
                ].map((item, index) => (
                  <AnimatedSection key={index} className="w-full">
                    <div className="relative flex flex-col items-center">
                      {/* Icon Bubble */}
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-red-50 shadow-sm flex items-center justify-center text-xl md:text-2xl z-10 mb-4 transition-transform hover:scale-110 duration-300 relative">
                        {item.icon}
                      </div>
                      
                      {/* Content Card */}
                      <div className="text-center bg-white p-4 rounded-xl border border-red-50 shadow-[0_4px_20px_-4px_rgba(220,38,38,0.05)] max-w-md w-full hover:shadow-[0_4px_20px_-4px_rgba(220,38,38,0.1)] transition-all duration-300 z-10">
                        <div className="inline-block px-3 py-1 bg-red-50/50 text-red-600 rounded-full text-sm font-medium tracking-wide mb-3">
                            {item.time}
                        </div>
                        <h4 className="font-display text-xl md:text-2xl lg:text-3xl text-gray-900 mb-2">
                            {item.event}
                        </h4>
                        <p className="text-gray-500 font-normal italic text-base md:text-lg">
                            {item.location}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="w-full py-6 sm:py-8 md:py-8 bg-white border-t border-red-500/20 text-center">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <p className="font-display text-lg sm:text-xl text-red-600 mb-2 font-medium tracking-wide">
            Avec tout notre amour
          </p>
          <p className="text-gray-600 text-base sm:text-lg font-normal tracking-wide">
            Alexandre & Samantha
          </p>
          <div className="mt-1 mb-4">
            <span className="text-red-500 text-lg sm:text-xl">♥</span>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
          </div>
        </div>
      </footer>
    </main>
  );
}
