'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';

export default function RSVPPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    attendance: '',
    meal: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    const subject = `RSVP Mariage Alexandre & Samantha - ${formData.firstName} ${formData.lastName}`;
    const body = `
Prénom: ${formData.firstName}
Nom: ${formData.lastName}
Téléphone: ${formData.phone}
Présence: ${formData.attendance === 'yes' ? 'Oui' : formData.attendance === 'no' ? 'Non' : ''}
Choix repas: ${formData.meal}
    `.trim();
    
    window.location.href = `mailto:alexandre.samantha@mariage.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          <h1 className="font-display text-lg sm:text-xl text-red-600 font-light tracking-wide">
            RSVP
          </h1>
          <div className="w-20" />
        </div>
      </div>

      {/* RSVP Section */}
      <AnimatedSection className="w-full py-10 sm:py-12 md:py-14">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-2xl">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4 font-light tracking-wide">
              Confirmez votre présence
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Merci de remplir ce formulaire avec vos informations et votre choix de repas.
            </p>
          </div>

          {submitted ? (
            <div className="text-center space-y-4 p-6 bg-red-50 rounded-xl border border-red-100">
              <div className="text-4xl mb-2">✓</div>
              <p className="font-display text-lg sm:text-xl text-red-600">
                Merci pour votre réponse !
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                Nous avons bien reçu vos informations.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-xl border border-red-100 p-5 sm:p-6 space-y-5 shadow-[0_4px_20px_-10px_rgba(220,38,38,0.25)]">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-light mb-1.5">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 border border-red-100 rounded-md text-gray-900 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none text-sm sm:text-base"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-light mb-1.5">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 border border-red-100 rounded-md text-gray-900 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none text-sm sm:text-base"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-light mb-1.5">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-red-100 rounded-md text-gray-900 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none text-sm sm:text-base"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-light mb-1.5">
                      Présence <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="attendance"
                      value={formData.attendance}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 border border-red-100 rounded-md text-gray-900 bg-white focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none text-sm sm:text-base"
                    >
                      <option value="">Sélectionnez une option</option>
                      <option value="yes">Je serai présent(e)</option>
                      <option value="no">Je ne pourrai pas être présent(e)</option>
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-light mb-1.5">
                      Choix du repas <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="meal"
                      value={formData.meal}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 border border-red-100 rounded-md text-gray-900 bg-white focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none text-sm sm:text-base"
                    >
                      <option value="">Sélectionnez une option</option>
                      <option value="viande">Viande</option>
                      <option value="poisson">Poisson</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-6 sm:px-8 py-3 sm:py-3.5 bg-red-600 text-white rounded-full font-light text-sm sm:text-base tracking-[0.15em] uppercase hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Envoyer
              </button>
            </form>
          )}
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="w-full py-10 sm:py-12 md:py-14 bg-white border-t border-red-500/20 text-center">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <p className="font-display text-lg sm:text-xl text-red-600 mb-2 font-light tracking-wide">
            Avec tout notre amour
          </p>
          <p className="text-gray-600 text-base sm:text-lg font-light tracking-wide">
            Alexandre & Samantha
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
          </div>
        </div>
      </footer>
    </main>
  );
}

