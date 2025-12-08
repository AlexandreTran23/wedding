'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';

export default function RSVPPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: '',
    guests: '',
    dietary: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    setSubmitted(true);
    
    // Create mailto link with form data
    const subject = `RSVP Mariage Alexandre & Samantha - ${formData.name}`;
    const body = `
Nom / Name: ${formData.name}
Email: ${formData.email}
Téléphone / Phone: ${formData.phone}
Présence / Attendance: ${formData.attendance}
Nombre d'invités / Number of guests: ${formData.guests}
Régime alimentaire / Dietary requirements: ${formData.dietary}
Message: ${formData.message}
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
    <main className="relative chinese-pattern min-h-screen">
      {/* Header with back button */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b-2 border-red-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-red-400 hover:text-red-500 transition-colors font-semibold flex items-center gap-2"
          >
            <span>←</span>
            <span>返回 | Retour</span>
          </button>
          <h1 className="font-serif text-xl sm:text-2xl text-red-500">回复邀请 | RSVP</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* RSVP Section */}
      <AnimatedSection className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-black relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-red-500 mb-6 sm:mb-8">
              <span className="block mb-2">确认出席</span>
              <span className="block text-2xl sm:text-3xl md:text-4xl">Confirmez Votre Présence</span>
            </h2>
            <p className="text-white/80 text-base sm:text-lg md:text-xl mb-4 leading-relaxed px-2">
              请在2026年7月1日之前告知我们您是否能够出席。
            </p>
            <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed px-2">
              Merci de nous faire savoir si vous pourrez être présents avant le 1er Juillet 2026.
            </p>
            <p className="text-white/70 text-sm sm:text-base mt-4 px-2">
              您的存在是我们能收到的最美好的礼物。
              <br />
              Votre présence est le plus beau cadeau que vous puissiez nous offrir.
            </p>
          </div>

          {submitted ? (
            <div className="text-center space-y-6 p-8 bg-gradient-to-br from-red-950/30 to-black rounded-2xl border-2 border-red-600/30">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="font-serif text-2xl text-red-400 mb-2">谢谢！</h3>
              <h3 className="font-serif text-xl text-red-500 mb-4">Merci !</h3>
              <p className="text-white/80">
                您的回复已收到。我们期待与您共度这个特殊的日子。
              </p>
              <p className="text-white/70 text-sm">
                Votre réponse a été reçue. Nous avons hâte de partager ce jour spécial avec vous.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gradient-to-br from-red-950/30 to-black rounded-xl sm:rounded-2xl border-2 border-red-600/30 p-6 sm:p-8 space-y-6">
                <div>
                  <label className="block text-red-400 font-semibold mb-2">
                    姓名 / Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border-2 border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="Votre nom / Your name"
                  />
                </div>

                <div>
                  <label className="block text-red-400 font-semibold mb-2">
                    电子邮件 / Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border-2 border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-red-400 font-semibold mb-2">
                    电话 / Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                <div>
                  <label className="block text-red-400 font-semibold mb-2">
                    出席 / Présence <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border-2 border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                  >
                    <option value="">请选择 / Veuillez choisir</option>
                    <option value="yes">我会参加 / Je serai présent(e)</option>
                    <option value="no">我不能参加 / Je ne pourrai pas être présent(e)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-red-400 font-semibold mb-2">
                    宾客人数 / Nombre d'invités
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 bg-black/50 border-2 border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-red-400 font-semibold mb-2">
                    饮食要求 / Régime alimentaire
                  </label>
                  <input
                    type="text"
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="素食、无麸质等 / Végétarien, sans gluten, etc."
                  />
                </div>

                <div>
                  <label className="block text-red-400 font-semibold mb-2">
                    留言 / Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors resize-none"
                    placeholder="Votre message / Your message"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 sm:px-10 md:px-12 py-4 sm:py-4 md:py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold text-base sm:text-lg hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-2xl hover:shadow-red-600/50 transform hover:scale-105 border-2 border-red-500/50"
              >
                发送回复 | Envoyer la réponse
              </button>
            </form>
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-black border-t-2 border-red-600/30 text-center relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <p className="font-serif text-xl sm:text-2xl text-red-400 mb-2 sm:mb-3">以我们所有的爱</p>
        <p className="font-serif text-lg sm:text-xl text-red-500 mb-2">Avec tout notre amour</p>
        <p className="text-white/60 text-base sm:text-lg">Alexandre & Samantha</p>
        <div className="mt-6 sm:mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
        </div>
      </footer>
    </main>
  );
}

