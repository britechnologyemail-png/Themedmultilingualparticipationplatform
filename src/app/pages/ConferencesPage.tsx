import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeTag } from '../components/ThemeTag';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { conferences } from '../data/mockData';
import { Calendar, MapPin, Users, Presentation } from 'lucide-react';

export function ConferencesPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-4 text-gray-900">{t('nav.conferences')}</h1>
        <p className="text-xl text-gray-600">
          Participez aux conférences et forums thématiques
        </p>
      </div>

      {/* Conferences List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {conferences.map((conference) => {
          const availableSpots = conference.capacity - conference.registered;
          const fillRate = (conference.registered / conference.capacity) * 100;

          return (
            <Card key={conference.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-3">
                  <ThemeTag themeId={conference.themeId} />
                </div>
                <CardTitle>{conference.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {conference.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Conference details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span>
                        {new Date(conference.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{conference.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Presentation className="w-5 h-5" />
                      <span>{conference.sessions} sessions au programme</span>
                    </div>
                  </div>

                  {/* Speakers */}
                  {conference.speakers.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        Intervenants
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {conference.speakers.map((speaker, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200"
                          >
                            {speaker}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Registration stats */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">
                        {conference.registered} / {conference.capacity} places réservées
                      </span>
                      <span className="font-medium">{fillRate.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          fillRate >= 90 ? 'bg-red-600' : fillRate >= 70 ? 'bg-orange-600' : 'bg-green-600'
                        }`}
                        style={{ width: `${fillRate}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {availableSpots} places restantes
                    </div>
                  </div>

                  {availableSpots > 0 ? (
                    <button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                      S'inscrire à la conférence
                    </button>
                  ) : (
                    <div className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-500 text-center">
                      Complet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <div className="max-w-2xl">
          <h2 className="text-2xl mb-4 text-gray-900">Format des conférences</h2>
          <div className="space-y-3 text-gray-700">
            <p>• Sessions de présentation par des experts</p>
            <p>• Ateliers participatifs et tables rondes</p>
            <p>• Questions-réponses avec les intervenants</p>
            <p>• Networking avec les autres participants</p>
            <p>• Documentation et ressources disponibles après l'événement</p>
          </div>
        </div>
      </div>
    </div>
  );
}
