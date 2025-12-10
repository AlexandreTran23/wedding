'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Guest {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  attendance: 'yes' | 'no' | 'maybe';
  meal_choice: string | null;
  wants_lodging: boolean;
  room_id: string | null;
  is_waiting_for_partner: boolean;
  next_day_meal: string | null;
  message: string | null;
  created_at: string;
}

export default function GuestsAdminPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const { data, error } = await supabase
          .from('guests')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setGuests((data as Guest[]) || []);
      } catch (err: any) {
        console.error('Error loading guests', err);
        setError('Impossible de charger les réponses pour le moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl text-gray-900 mb-2">
            Réponses des invités
          </h1>
          <p className="text-gray-500 text-sm">
            Page interne non référencée, réservée au suivi des réponses.
          </p>
        </header>

        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600" />
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto bg-white border border-gray-100 rounded-xl shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Nom</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Présence</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Repas</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Repas lendemain</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Logement</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Créé le</th>
                </tr>
              </thead>
              <tbody>
                {guests.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3 py-6 text-center text-gray-400 text-sm"
                    >
                      Aucune réponse pour le moment.
                    </td>
                  </tr>
                )}
                {guests.map((g) => {
                  const attendanceLabel =
                    g.attendance === 'yes'
                      ? 'Présent(e)'
                      : g.attendance === 'no'
                      ? 'Absent(e)'
                      : 'Peut-être';

                  let nextDayLabel = 'Non renseigné';
                  switch (g.next_day_meal) {
                    case 'bbq_only':
                      nextDayLabel = 'Seulement si barbecue';
                      break;
                    case 'brunch_only':
                      nextDayLabel = 'Seulement si brunch';
                      break;
                    case 'both':
                      nextDayLabel = 'Les deux conviennent';
                      break;
                    case 'none':
                      nextDayLabel = 'Ne vient pas au lendemain';
                      break;
                  }

                  const created = new Date(g.created_at);

                  return (
                    <tr key={g.id} className="border-t border-gray-50">
                      <td className="px-3 py-2 align-top">
                        <div className="font-medium text-gray-900">
                          {g.first_name} {g.last_name}
                        </div>
                        {g.phone && (
                          <div className="text-xs text-gray-500">{g.phone}</div>
                        )}
                      </td>
                      <td className="px-3 py-2 align-top text-gray-700">
                        {attendanceLabel}
                      </td>
                      <td className="px-3 py-2 align-top text-gray-700">
                        {g.meal_choice && g.meal_choice !== 'none'
                          ? g.meal_choice
                          : '—'}
                      </td>
                      <td className="px-3 py-2 align-top text-gray-700">
                        {nextDayLabel}
                      </td>
                      <td className="px-3 py-2 align-top text-gray-700 text-xs">
                        {g.wants_lodging ? 'Souhaite loger' : 'Ne loge pas'}
                        {g.is_waiting_for_partner && (
                          <div className="text-amber-600">
                            En attente d&apos;un(e) partenaire
                          </div>
                        )}
                        {g.message && (
                          <details className="mt-1 text-gray-500">
                            <summary className="cursor-pointer text-[11px] text-gray-400">
                              Détails
                            </summary>
                            <pre className="whitespace-pre-wrap text-[11px] mt-1">
                              {g.message}
                            </pre>
                          </details>
                        )}
                      </td>
                      <td className="px-3 py-2 align-top text-gray-600 text-xs">
                        {created.toLocaleDateString('fr-FR')}<br />
                        {created.toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

