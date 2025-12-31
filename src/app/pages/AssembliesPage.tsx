import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeTag } from '../components/ThemeTag';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { assemblies } from '../data/mockData';
import { Users, Calendar, FileText } from 'lucide-react';

export function AssembliesPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-4 text-gray-900">{t('nav.assemblies')}</h1>
        <p className="text-xl text-gray-600">
          Rejoignez les assemblées citoyennes et participez aux débats
        </p>
      </div>

      {/* Assemblies List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assemblies.map((assembly) => (
          <Card key={assembly.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mb-3">
                <ThemeTag themeId={assembly.themeId} />
              </div>
              <CardTitle>{assembly.title}</CardTitle>
              <CardDescription className="text-base mt-2">{assembly.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5" />
                    <span>{assembly.members} membres</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-5 h-5" />
                    <span>{assembly.meetings.length} réunions</span>
                  </div>
                </div>

                {/* Next meeting */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-900 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Prochaine réunion</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {new Date(assembly.nextMeeting).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {/* Last meetings */}
                {assembly.meetings.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">
                      Réunions passées
                    </div>
                    {assembly.meetings.map((meeting) => (
                      <div
                        key={meeting.id}
                        className="p-3 bg-gray-50 border border-gray-200 rounded mb-2"
                      >
                        <div className="font-medium text-sm">{meeting.title}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {new Date(meeting.date).toLocaleDateString('fr-FR')}
                        </div>
                        {meeting.agenda.length > 0 && (
                          <div className="mt-2 text-xs text-gray-600">
                            Ordre du jour: {meeting.agenda.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  Rejoindre l'assemblée
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <div className="max-w-2xl">
          <h2 className="text-2xl mb-4 text-gray-900">Pourquoi rejoindre une assemblée ?</h2>
          <div className="space-y-3 text-gray-700">
            <p>• Participez activement aux décisions de votre commune</p>
            <p>• Échangez avec d'autres citoyens engagés</p>
            <p>• Contribuez à l'élaboration de propositions concrètes</p>
            <p>• Suivez les projets de votre thématique favorite</p>
          </div>
        </div>
      </div>
    </div>
  );
}
