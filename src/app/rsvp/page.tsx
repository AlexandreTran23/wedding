'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

// Types
interface RoomOccupant {
  firstName: string;
  isWaitingForPartner: boolean;
}

interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  public_price: number;
  discount_price: number;
  image_url: string;
  occupants: RoomOccupant[];
}

export default function RSVPPage() {
  const router = useRouter();
  
  // États
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    attendance: '',
    meal: '',
    nextDayMeal: '',
    wantsLodging: false,
    selectedRoomId: '',
    waitingForPartner: false,
    isFamilyPreBooked: false,
  });

  // Fetch rooms from Supabase
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select(`
            *,
            guests (
              first_name,
              is_waiting_for_partner
            )
          `)
          .order('name');

        if (error) throw error;

        if (data) {
          const formattedRooms: Room[] = data.map((room: any) => ({
            id: room.id,
            name: room.name,
            description: room.description,
            capacity: room.capacity,
            public_price: room.public_price,
            discount_price: room.discount_price,
            image_url: room.image_url,
            occupants:
              room.guests?.map((g: any) => ({
                firstName: g.first_name,
                isWaitingForPartner: g.is_waiting_for_partner ?? false,
              })) || [],
          }));
          setRooms(formattedRooms);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Gestionnaires
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleRoomSelect = (roomId: string) => {
    setFormData(prev => ({ ...prev, selectedRoomId: roomId }));
  };

  const nextStep = () => {
    // Validation simple
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.attendance || !formData.meal) {
        alert("Merci de remplir les champs obligatoires");
        return;
      }
      if (formData.attendance === 'no') {
        handleSubmit(); // Si ne vient pas, on soumet direct
        return;
      }
    } else if (step === 2) {
      if (!formData.nextDayMeal) {
        alert('Merci de choisir une option pour le repas du lendemain');
        return;
      }
    } else if (step === 3) {
      if (formData.isFamilyPreBooked) {
        handleSubmit(); // Si famille pré-réservée, on soumet
        return;
      }
      if (!formData.wantsLodging) {
        handleSubmit(); // Si ne dort pas sur place, on soumet
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Construction du texte de logement
    let lodgingText = 'Pas de logement souhaité.';
    if (formData.isFamilyPreBooked) {
      lodgingText = "FAMILLE : Une chambre est déjà réservée pour moi.";
    } else if (formData.wantsLodging && formData.selectedRoomId) {
      const room = rooms.find(r => r.id === formData.selectedRoomId);
      lodgingText = `
Souhaite loger au château : OUI
Chambre sélectionnée : ${room?.name} (${room?.discount_price}€)
En attente d'un partenaire : ${formData.waitingForPartner ? 'OUI' : 'NON'}
      `.trim();
    }

    // Construction du choix de repas du lendemain
    let nextDayText = 'Repas du lendemain : non renseigné.';
    switch (formData.nextDayMeal) {
      case 'bbq_only':
        nextDayText = "Souhaite participer au repas du lendemain uniquement si c'est un barbecue.";
        break;
      case 'brunch_only':
        nextDayText = "Souhaite participer au repas du lendemain uniquement si c'est un brunch.";
        break;
      case 'both':
        nextDayText = 'Les deux options (brunch ou barbecue) lui conviennent.';
        break;
      case 'none':
        nextDayText = "Ne pourra pas participer au repas du lendemain.";
        break;
    }

    const messageText = `${lodgingText}\n\n--- REPAS DU LENDEMAIN ---\n${nextDayText}`;

    // Enregistrement dans la base Supabase
    try {
      const mealChoice =
        formData.attendance === 'yes'
          ? formData.meal || 'none'
          : 'none';

      const { error } = await supabase.from('guests').insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone || null,
        attendance: formData.attendance,
        meal_choice: mealChoice,
        next_day_meal: formData.nextDayMeal || null,
        wants_lodging: formData.wantsLodging,
        room_id: formData.isFamilyPreBooked ? null : formData.selectedRoomId || null,
        is_waiting_for_partner: formData.waitingForPartner,
        message: messageText,
      });

      if (error) {
        console.error('Error inserting guest:', error);
        alert("Une erreur est survenue lors de l'enregistrement de votre réponse. Vous pouvez réessayer dans quelques instants.");
        return;
      }
    } catch (err) {
      console.error('Unexpected error inserting guest:', err);
      alert("Une erreur est survenue lors de l'enregistrement de votre réponse. Vous pouvez réessayer dans quelques instants.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-500/20">
        <div className="w-full mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => step > 1 ? prevStep() : router.push('/')}
            className="text-red-600 hover:text-red-700 transition-colors font-light text-sm tracking-wide flex items-center gap-2"
          >
            <span>←</span>
            <span>{step > 1 ? 'Précédent' : 'Retour'}</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="font-display text-lg text-red-600 font-light tracking-wide">RSVP</h1>
            <div className="flex gap-1 mt-1">
              <div className={`h-1 w-6 rounded-full transition-colors ${step >= 1 ? 'bg-red-500' : 'bg-red-100'}`} />
              <div className={`h-1 w-6 rounded-full transition-colors ${step >= 2 ? 'bg-red-500' : 'bg-red-100'}`} />
              <div className={`h-1 w-6 rounded-full transition-colors ${step >= 3 ? 'bg-red-500' : 'bg-red-100'}`} />
              {formData.wantsLodging && (
                 <div className={`h-1 w-6 rounded-full transition-colors ${step >= 4 ? 'bg-red-500' : 'bg-red-100'}`} />
              )}
            </div>
          </div>
          <div className="w-20" />
        </div>
      </div>

      <AnimatedSection className="w-full py-10 max-w-4xl mx-auto px-4">
        
        {submitted ? (
          <div className="text-center space-y-6 p-8 bg-white rounded-xl border border-red-100 shadow-xl">
            <div className="text-5xl mb-4">✨</div>
            <h2 className="font-display text-3xl text-red-600">Merci pour votre réponse !</h2>
            <p className="text-gray-600">Nous avons hâte de célébrer avec vous.</p>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-red-700 text-white text-sm font-medium tracking-wide shadow-md hover:bg-red-800 transition-colors"
            >
              Retour à la page d&apos;accueil
            </button>
          </div>
        ) : (
          <>
            {/* ÉTAPE 1 : INFOS DE BASE */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl sm:text-4xl text-gray-900 mb-2">Confirmez votre présence</h2>
                  <p className="text-gray-500 font-light">Commençons par les présentations</p>
                </div>

                <div className="bg-white rounded-xl border border-red-100 p-6 shadow-sm space-y-5">
                   <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Prénom <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Nom <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none"
                      placeholder="+41 78.."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Présence <span className="text-red-500">*</span></label>
                      <select
                        name="attendance"
                        value={formData.attendance}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="yes">Je serai présent(e)</option>
                        <option value="no">Je ne pourrai pas être présent(e)</option>
                      </select>
                    </div>

                    {formData.attendance === 'yes' && (
                      <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">Repas <span className="text-red-500">*</span></label>
                        <select
                          name="meal"
                          value={formData.meal}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none"
                        >
                          <option value="">Votre choix...</option>
                          <option value="viande">Viande</option>
                          <option value="poisson">Poisson</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={nextStep}
                  className="w-full py-4 bg-red-700 text-white rounded-xl font-medium tracking-wide shadow-lg hover:bg-red-800 transition-all hover:scale-[1.01]"
                >
                  {formData.attendance === 'no' ? 'Confirmer mon absence' : 'Continuer'}
                </button>
              </div>
            )}

            {/* ÉTAPE 2 : REPAS DU LENDEMAIN */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl sm:text-4xl text-gray-900 mb-4">Le repas du lendemain</h2>
                  <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                    Le château nous propose un brunch ou un barbecue le lendemain, pour prolonger les retrouvailles dans une ambiance conviviale.
                    Les deux formules sont sous réserve d&apos;un minimum de 25 personnes et sont intégralement à la charge des invités.
                  </p>
                </div>

                {/* Photos brunch & barbecue */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                  <div className="relative w-full sm:w-1/2 aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-100">
                    <Image
                      src="/brunch.jpeg"
                      alt="Brunch du lendemain"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                  </div>
                  <div className="relative w-full sm:w-1/2 aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-100">
                    <Image
                      src="/barbecue.webp"
                      alt="Barbecue du lendemain"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Brunch details */}
                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-2">
                    <h3 className="font-display text-lg text-gray-900 flex items-center gap-2">
                      🥐 Brunch du lendemain
                    </h3>
                    <p className="text-sm text-gray-600">
                      <strong>39€ / personne</strong> (35€ sans le forfait vin) — <strong>18€ / enfant</strong> (jusqu&apos;à 12 ans).
                    </p>
                    <p className="text-xs text-gray-500">
                      Buffet sucré-salé à volonté (viennoiseries, pains, gâteaux de Savoie, salades, quiches, charcuteries, fromages, saumon fumé...),
                      boissons chaudes, jus et vins de Savoie. Service de <strong>10h à 14h30</strong>.
                    </p>
                  </div>

                  {/* Barbecue details */}
                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-2">
                    <h3 className="font-display text-lg text-gray-900 flex items-center gap-2">
                      🔥 Barbecue du lendemain
                    </h3>
                    <p className="text-sm text-gray-600">
                      <strong>49€ / personne</strong> — <strong>25€ / enfant</strong> (jusqu&apos;à 12 ans).
                    </p>
                    <p className="text-xs text-gray-500">
                      Apéritif, feuilletés, crudités, viandes grillées (dont gigot d&apos;agneau mariné), accompagnements, légumes grillés, mignardises sucrées,
                      softs, eaux et vins de Savoie. Service de <strong>11h30 à 15h30</strong>.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Choix BBQ seulement */}
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, nextDayMeal: 'bbq_only' }))}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 text-center space-y-2
                      ${formData.nextDayMeal === 'bbq_only'
                        ? 'border-red-500 bg-red-50 ring-1 ring-red-500'
                        : 'border-gray-200 hover:border-red-200 bg-white'}`}
                  >
                    <span className="text-xl">🔥</span>
                    <p className="text-sm font-medium text-gray-900">
                      Je souhaite venir seulement si c&apos;est un barbecue
                    </p>
                  </div>

                  {/* Choix Brunch seulement */}
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, nextDayMeal: 'brunch_only' }))}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 text-center space-y-2
                      ${formData.nextDayMeal === 'brunch_only'
                        ? 'border-red-500 bg-red-50 ring-1 ring-red-500'
                        : 'border-gray-200 hover:border-red-200 bg-white'}`}
                  >
                    <span className="text-xl">🥐</span>
                    <p className="text-sm font-medium text-gray-900">
                      Je souhaite venir seulement si c&apos;est un brunch
                    </p>
                  </div>

                  {/* Les deux conviennent */}
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, nextDayMeal: 'both' }))}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 text-center space-y-2
                      ${formData.nextDayMeal === 'both'
                        ? 'border-red-500 bg-red-50 ring-1 ring-red-500'
                        : 'border-gray-200 hover:border-red-200 bg-white'}`}
                  >
                    <span className="text-xl">😊</span>
                    <p className="text-sm font-medium text-gray-900">
                      Les deux options me conviennent
                    </p>
                  </div>

                  {/* Ne peut pas venir */}
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, nextDayMeal: 'none' }))}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 text-center space-y-2
                      ${formData.nextDayMeal === 'none'
                        ? 'border-gray-600 bg-gray-50 ring-1 ring-gray-600'
                        : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <span className="text-xl">💤</span>
                    <p className="text-sm font-medium text-gray-900">
                      Je ne pourrai malheureusement pas venir au repas du lendemain
                    </p>
                  </div>
                </div>

                <button
                  onClick={nextStep}
                  className="w-full py-4 bg-red-700 text-white rounded-xl font-medium tracking-wide shadow-lg hover:bg-red-800 transition-all hover:scale-[1.01]"
                >
                  Continuer
                </button>
              </div>
            )}

            {/* ÉTAPE 3 : CHOIX LOGEMENT */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl sm:text-4xl text-gray-900 mb-4">Le Logement au Château</h2>
                  <div className="bg-amber-50 border border-amber-100 p-6 rounded-xl text-left text-sm text-amber-900 leading-relaxed max-w-2xl mx-auto space-y-3">
                    <p>
                      <strong>🏰 Privatisation :</strong> L&apos;idéal serait de pouvoir remplir les 45 chambres pour privatiser le château dans son ensemble. Cela permettrait de n&apos;avoir aucune personne extérieure au mariage, pour une ambiance plus conviviale et &quot;entre soi&quot;.
                    </p>
                    <p>
                      <strong>⚠️ Places limitées :</strong> Les chambres sont en nombre limité et seront attribuées au fur et à mesure des inscriptions. Si possible, merci de vous inscrire rapidement pour nous aider à sécuriser toutes les chambres.
                    </p>
                    <p>
                      <strong>💶 Coût :</strong> La nuitée est à la charge des invités. Il n&apos;y a aucune obligation de dormir sur place.
                    </p>
                    <p>
                      <strong>💎 Tarif préférentiel :</strong> Nous bénéficions de tarifs avantageux grâce à la réservation de groupe pour la privatisation du domaine.
                    </p>
                    <p>
                      <strong>🧸 Enfants :</strong> Des lits bébé peuvent être ajoutés dans certaines chambres sur demande (dans la limite des disponibilités).
                    </p>
                    <p>
                      <strong>🐾 Animaux :</strong> Les animaux sont acceptés dans certaines chambres, avec un supplément de 15€ par animal et par nuit.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option OUI */}
                  <div 
                    onClick={() => setFormData(prev => ({ ...prev, wantsLodging: true, isFamilyPreBooked: false }))}
                    className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-3
                      ${formData.wantsLodging && !formData.isFamilyPreBooked
                        ? 'border-red-500 bg-red-50 ring-1 ring-red-500' 
                        : 'border-gray-200 hover:border-red-200 bg-white'}`}
                  >
                    <span className="text-4xl">🛌</span>
                    <h3 className="font-display text-xl text-gray-900">Je dors au château</h3>
                    <p className="text-sm text-gray-500">Je participe à la privatisation et je règle ma chambre.</p>
                  </div>

                  {/* Option NON */}
                  <div 
                    onClick={() => setFormData(prev => ({ ...prev, wantsLodging: false, isFamilyPreBooked: false }))}
                    className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-3
                      ${!formData.wantsLodging && !formData.isFamilyPreBooked
                        ? 'border-gray-600 bg-gray-50 ring-1 ring-gray-600' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <span className="text-4xl">🌙</span>
                    <h3 className="font-display text-xl text-gray-900">Je dors ailleurs</h3>
                    <p className="text-sm text-gray-500">Je ne souhaite pas réserver de chambre au château.</p>
                  </div>
                </div>

                {/* Option Famille / Pré-réservé */}
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, wantsLodging: true, isFamilyPreBooked: true }))}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-3
                    ${formData.isFamilyPreBooked 
                      ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' 
                      : 'border-gray-100 hover:border-amber-200 bg-white'}`}
                >
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                  <p className="text-xs sm:text-sm text-gray-600 text-left">
                    Une chambre a déjà été réservée pour moi par les mariés
                  </p>
                </div>

                <button
                  onClick={nextStep}
                  className="w-full py-4 bg-red-700 text-white rounded-xl font-medium tracking-wide shadow-lg hover:bg-red-800 transition-all hover:scale-[1.01]"
                >
                  {formData.wantsLodging && !formData.isFamilyPreBooked ? 'Choisir ma chambre' : 'Terminer mon inscription'}
                </button>
              </div>
            )}

            {/* ÉTAPE 4 : SÉLECTION CHAMBRE */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="font-display text-3xl text-gray-900 mb-2">Choisissez votre chambre</h2>
                  <p className="text-gray-500 text-sm">Sélectionnez une chambre disponible ci-dessous.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {loading ? (
                    <div className="col-span-full flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                    </div>
                  ) : (
                    rooms.map((room) => {
                    const isSelected = formData.selectedRoomId === room.id;
                    const isFull = room.occupants.length >= room.capacity;
                    const hasWaitingPartner = room.occupants.some(o => o.isWaitingForPartner);
                    
                    return (
                      <div 
                        key={room.id}
                        onClick={() => !isFull && handleRoomSelect(room.id)}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 group
                          ${isSelected ? 'border-red-500 ring-1 ring-red-500 shadow-lg scale-[1.01]' : 'border-gray-100 hover:border-red-200 shadow-sm'}
                          ${isFull ? 'opacity-60 cursor-not-allowed grayscale-[0.5]' : 'cursor-pointer bg-white'}
                        `}
                      >
                        {/* Image */}
                        <div className="relative h-48 w-full bg-gray-200">
                          <Image
                            src={room.image_url}
                            alt={room.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-3 left-3 text-white">
                            <h3 className="font-display text-lg tracking-wide">{room.name}</h3>
                          </div>
                          {isSelected && (
                            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                              SÉLECTIONNÉ
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <p className="text-xs text-gray-500 leading-relaxed">{room.description}</p>
                            <div className="text-right shrink-0 ml-2">
                              <span className="text-xs text-gray-400 line-through block">{room.public_price}€</span>
                              <span className="text-red-600 font-bold text-lg">{room.discount_price}€</span>
                              <span className="text-[10px] text-gray-500 block mt-0.5 font-medium">soit {Math.round(room.discount_price / room.capacity)}€/p</span>
                            </div>
                          </div>

                          {/* Capacité & Occupants */}
                          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                             <div className="flex items-center gap-2 text-xs text-gray-600">
                               <span>👥 Capacité: {room.occupants.length}/{room.capacity}</span>
                             </div>
                             <div className="text-xs">
                               {room.occupants.length > 0 ? (
                                 <span className={isFull ? 'text-red-600 font-semibold' : 'text-amber-600'}>
                                   Occupé par : {room.occupants.map(o => o.firstName).join(', ')}
                                   {hasWaitingPartner && " (en attente d'un(e) partenaire)"}
                                   {isFull && ' — COMPLET'}
                                 </span>
                               ) : (
                                 <span className="text-green-600">Disponible</span>
                               )}
                             </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                </div>

                {formData.selectedRoomId && (
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 mt-6 animate-in fade-in slide-in-from-bottom-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        className="mt-1 w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                        checked={formData.waitingForPartner}
                        onChange={(e) => setFormData(prev => ({ ...prev, waitingForPartner: e.target.checked }))}
                      />
                      <div className="text-sm">
                        <span className="font-medium text-gray-900 block mb-1">J&apos;attends l&apos;inscription d&apos;un(e) partenaire</span>
                        <span className="text-gray-500">Cochez cette case si vous réservez cette chambre pour deux mais que votre accompagnant(e) s&apos;inscrira plus tard, ou si vous souhaitez laisser les autres lits disponibles.</span>
                      </div>
                    </label>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!formData.selectedRoomId}
                  className={`w-full py-4 rounded-xl font-medium tracking-wide shadow-lg transition-all
                    ${formData.selectedRoomId 
                      ? 'bg-red-700 text-white hover:bg-red-800 hover:scale-[1.01]' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  Valider et envoyer
                </button>
              </div>
            )}
          </>
        )}
      </AnimatedSection>
    </main>
  );
}
