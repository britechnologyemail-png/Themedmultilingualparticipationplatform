import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { themes } from '../data/themes';
import { participatoryProcesses, consultations, petitions, votes } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowRight } from 'lucide-react';

export function ThemesPage() {
  const { t } = useLanguage();

  const getThemeStats = (themeId: string) => {
    return {
      processes: participatoryProcesses.filter((p) => p.themeId === themeId).length,
      consultations: consultations.filter((c) => c.themeId === themeId).length,
      petitions: petitions.filter((p) => p.themeId === themeId).length,
      votes: votes.filter((v) => v.themeId === themeId).length,
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-4 text-gray-900">{t('nav.themes')}</h1>
        <p className="text-xl text-gray-600">
          Explorez toutes les activités participatives organisées par thématique
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => {
          const stats = getThemeStats(theme.id);
          const totalActivities =
            stats.processes + stats.consultations + stats.petitions + stats.votes;

          return (
            <Link key={theme.id} to={`/themes/${theme.id}`}>
              <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader
                  style={{
                    borderTopWidth: '4px',
                    borderTopColor: theme.color,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{theme.icon}</span>
                    <div className="flex-1">
                      <CardTitle>{t(theme.name)}</CardTitle>
                      <CardDescription>{totalActivities} activités en cours</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {stats.processes > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Processus participatifs</span>
                        <span className="font-medium">{stats.processes}</span>
                      </div>
                    )}
                    {stats.consultations > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Concertations</span>
                        <span className="font-medium">{stats.consultations}</span>
                      </div>
                    )}
                    {stats.petitions > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Pétitions</span>
                        <span className="font-medium">{stats.petitions}</span>
                      </div>
                    )}
                    {stats.votes > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Votes</span>
                        <span className="font-medium">{stats.votes}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    Voir le thème <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
