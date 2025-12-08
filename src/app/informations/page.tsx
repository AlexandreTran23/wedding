'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

export default function InformationsPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen bg-white">
      {/* Header with back button */}
      <div className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-500/20">
        <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-red-600 hover:text-red-700 transition-colors font-light text-sm sm:text-base tracking-wide flex items-center gap-2"
          >
            <span>←</span>
            <span>Retour</span>
          </button>
          <h1 className="font-display text-lg sm:text-xl text-red-600 font-light tracking-wide">Informations</h1>
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
            
            <div className="flex justify-center w-full">
              <div className="relative aspect-4/3 overflow-hidden rounded-sm w-full md:w-3/4 lg:w-2/3">
                <Image
                  src="/canide-artprism-47-retouche_3_123516-169097545849643.jpeg"
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


      {/* Address Section */}
      <AnimatedSection className="w-full py-6 sm:py-8 md:py-8 bg-white">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <div className="text-4xl sm:text-5xl mb-2">📍</div>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-red-600 font-light tracking-wide mb-4">
            Adresse
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <p className="text-gray-800 text-lg sm:text-xl md:text-2xl font-light tracking-wide">
              Château de Candie
            </p>
            <p className="text-gray-600 text-base sm:text-lg font-light tracking-wide">
              533 Rue du Bois de Candie
            </p>
            <p className="text-gray-600 text-base sm:text-lg font-light tracking-wide">
              73000 Chambéry, France
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Château+de+Candie,+533+Rue+du+Bois+de+Candie,+73000+Chambéry,+France"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 sm:px-6 py-2 sm:py-2.5 text-red-600 border border-red-600/40 rounded-sm font-light text-xs sm:text-sm tracking-wide uppercase hover:bg-red-50 hover:border-red-600 transition-all"
            >
              Voir sur la carte
            </a>
            <a
              href="https://chateaudecandie.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 sm:px-6 py-2 sm:py-2.5 text-white bg-red-600 border border-red-600 rounded-sm font-light text-xs sm:text-sm tracking-wide uppercase hover:bg-red-700 hover:border-red-700 transition-all shadow-sm"
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
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-gray-900 text-center mb-6 sm:mb-8 md:mb-10 font-light tracking-wide">
              Programme de la Journée
            </h2>
            
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-100 via-red-200 to-red-100 -translate-x-1/2"></div>
              
              <div className="space-y-6">
                {[
                  { time: '14h30', event: 'Accueil des invités', location: 'Château de Candie', icon: '👋' },
                  { time: '15h00', event: 'Cérémonie', location: 'Château de Candie', icon: '💍' },
                  { time: '16h00', event: 'Séance photo', location: 'Jardins du Château', icon: '📸' },
                  { time: '18h00', event: "Vin d'honneur", location: 'Château de Candie', icon: '🥂' },
                  { time: '20h00', event: 'Dîner', location: 'Château de Candie', icon: '🍽️' },
                  { time: '23h00', event: 'Ouverture du bal', location: 'Château de Candie', icon: '💃' },
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
                        <p className="text-gray-500 font-light italic text-base md:text-lg">
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
        <p className="font-display text-lg sm:text-xl text-red-600 mb-2 font-light tracking-wide">
          Avec tout notre amour
        </p>
        <p className="text-gray-600 text-base sm:text-lg font-light tracking-wide">
          Alexandre & Samantha
        </p>
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
