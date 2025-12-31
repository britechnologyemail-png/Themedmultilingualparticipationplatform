import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getThemeById } from '../data/themes';
import { participatoryProcesses, consultations, petitions, votes } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowRight, Users } from 'lucide-react';

export function ThemeDetailPage() {
  const { themeId } = useParams<{ themeId: string }>();
  const { t } = useLanguage();
  const theme = themeId ? getThemeById(themeId) : null;

  if (!theme) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p>Thème non trouvé</p>
      </div>
    );
  }

  const themeProcesses = participatoryProcesses.filter((p) => p.themeId === themeId);
  const themeConsultations = consultations.filter((c) => c.themeId === themeId);
  const themePetitions = petitions.filter((p) => p.themeId === themeId);
  const themeVotes = votes.filter((v) => v.themeId === themeId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{theme.icon}</span>
          <div>
            <h1 className="text-4xl text-gray-900">{t(theme.name)}</h1>
            <p className="text-xl text-gray-600 mt-2">
              Toutes les activités participatives sur cette thématique
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tout voir</TabsTrigger>
          <TabsTrigger value="processes">
            Processus ({themeProcesses.length})
          </TabsTrigger>
          <TabsTrigger value="consultations">
            Concertations ({themeConsultations.length})
          </TabsTrigger>
          <TabsTrigger value="petitions">
            Pétitions ({themePetitions.length})
          </TabsTrigger>
          <TabsTrigger value="votes">
            Votes ({themeVotes.length})
          </TabsTrigger>
        </TabsList>

        {/* All */}
        <TabsContent value="all" className="space-y-8">
          {themeProcesses.length > 0 && (
            <div>
              <h2 className="text-2xl mb-4">Processus participatifs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themeProcesses.map((process) => (
                  <Card key={process.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <StatusBadge status={process.status} />
                      </div>
                      <CardTitle>{process.title}</CardTitle>
                      <CardDescription>{process.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {process.participants} participants
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {themeConsultations.length > 0 && (
            <div>
              <h2 className="text-2xl mb-4">Concertations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themeConsultations.map((consultation) => (
                  <Card key={consultation.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <StatusBadge status={consultation.status} />
                      </div>
                      <CardTitle>{consultation.title}</CardTitle>
                      <CardDescription>{consultation.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-600">
                        {new Date(consultation.date).toLocaleDateString('fr-FR')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {themePetitions.length > 0 && (
            <div>
              <h2 className="text-2xl mb-4">Pétitions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themePetitions.map((petition) => {
                  const percentage = (petition.current / petition.target) * 100;
                  return (
                    <Card key={petition.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <StatusBadge status={petition.status} />
                        </div>
                        <CardTitle>{petition.title}</CardTitle>
                        <CardDescription>{petition.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">
                              {petition.current} / {petition.target} signatures
                            </span>
                            <span>{percentage.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${Math.min(percentage, 100)}%`,
                                backgroundColor: theme.color,
                              }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {themeVotes.length > 0 && (
            <div>
              <h2 className="text-2xl mb-4">Votes & Référendums</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themeVotes.map((vote) => (
                  <Card key={vote.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <StatusBadge status={vote.status} />
                      </div>
                      <CardTitle>{vote.title}</CardTitle>
                      <CardDescription>{vote.question}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-600">
                        {new Date(vote.startDate).toLocaleDateString('fr-FR')} -{' '}
                        {new Date(vote.endDate).toLocaleDateString('fr-FR')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Processes Tab */}
        <TabsContent value="processes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themeProcesses.map((process) => (
              <Card key={process.id}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <StatusBadge status={process.status} />
                  </div>
                  <CardTitle>{process.title}</CardTitle>
                  <CardDescription>{process.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {process.participants} participants
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other tabs with similar structure */}
        <TabsContent value="consultations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themeConsultations.map((consultation) => (
              <Card key={consultation.id}>
                <CardHeader>
                  <StatusBadge status={consultation.status} />
                  <CardTitle>{consultation.title}</CardTitle>
                  <CardDescription>{consultation.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="petitions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themePetitions.map((petition) => {
              const percentage = (petition.current / petition.target) * 100;
              return (
                <Card key={petition.id}>
                  <CardHeader>
                    <StatusBadge status={petition.status} />
                    <CardTitle>{petition.title}</CardTitle>
                    <CardDescription>{petition.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: theme.color,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="votes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themeVotes.map((vote) => (
              <Card key={vote.id}>
                <CardHeader>
                  <StatusBadge status={vote.status} />
                  <CardTitle>{vote.title}</CardTitle>
                  <CardDescription>{vote.question}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
