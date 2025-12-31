import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeTag } from '../components/ThemeTag';
import { StatusBadge } from '../components/StatusBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { votes } from '../data/mockData';
import { themes } from '../data/themes';
import { Vote, CircleCheck, Users, Calendar } from 'lucide-react';

export function VotesPage() {
  const { t } = useLanguage();
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredVotes = votes.filter((vote) => {
    if (selectedTheme !== 'all' && vote.themeId !== selectedTheme) return false;
    if (selectedType !== 'all' && vote.type !== selectedType) return false;
    return true;
  });

  const stats = {
    total: votes.length,
    open: votes.filter((v) => v.status === 'open').length,
    upcoming: votes.filter((v) => v.status === 'upcoming').length,
    totalVotes: votes.reduce((sum, v) => sum + (v.participants || 0), 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-4 text-gray-900">{t('nav.votes')}</h1>
        <p className="text-xl text-gray-600">
          Participez aux consultations et référendums de votre commune
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Votes ouverts</p>
                <p className="text-3xl">{stats.open}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Vote className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">À venir</p>
                <p className="text-3xl">{stats.upcoming}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total votes</p>
                <p className="text-3xl">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <CircleCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Participants</p>
                <p className="text-3xl">{stats.totalVotes.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm mb-2 text-gray-700">{t('common.filter')} par thème</label>
          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('common.all')}</SelectItem>
              {themes.map((theme) => (
                <SelectItem key={theme.id} value={theme.id}>
                  {theme.icon} {t(theme.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm mb-2 text-gray-700">Type de vote</label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('common.all')}</SelectItem>
              <SelectItem value="referendum">Référendum</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Votes List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVotes.map((vote) => {
          const totalVotes = vote.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);

          return (
            <Card key={vote.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ThemeTag themeId={vote.themeId} />
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300">
                      {vote.type === 'referendum' ? 'Référendum' : 'Consultation'}
                    </span>
                  </div>
                  <StatusBadge status={vote.status} />
                </div>
                <CardTitle>{vote.title}</CardTitle>
                <CardDescription className="text-base mt-2">{vote.question}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Vote options with results for open/closed votes */}
                  {vote.status === 'open' && vote.options[0].votes !== undefined && (
                    <div className="space-y-3">
                      <div className="text-sm text-gray-600 mb-2">Résultats actuels :</div>
                      {vote.options.map((option) => {
                        const percentage = totalVotes > 0 ? ((option.votes || 0) / totalVotes) * 100 : 0;
                        return (
                          <div key={option.id}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-700">{option.text}</span>
                              <span className="font-medium">
                                {option.votes?.toLocaleString()} ({percentage.toFixed(1)}%)
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Upcoming vote - just show options */}
                  {vote.status === 'upcoming' && (
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600 mb-2">Options de vote :</div>
                      {vote.options.map((option) => (
                        <div key={option.id} className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-sm">{option.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(vote.startDate).toLocaleDateString('fr-FR')} -{' '}
                          {new Date(vote.endDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      {vote.participants && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{vote.participants.toLocaleString()} votes</span>
                        </div>
                      )}
                    </div>

                    {vote.status === 'open' && (
                      <Link
                        to={`/votes/${vote.id}`}
                        className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        <Vote className="w-4 h-4" />
                        Voter maintenant
                      </Link>
                    )}

                    {vote.status === 'upcoming' && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          Ce vote ouvrira le {new Date(vote.startDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredVotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Aucun vote ne correspond à vos critères de recherche.</p>
        </div>
      )}

      {/* Info section */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="max-w-2xl">
          <h2 className="text-2xl mb-4 text-gray-900">Comment voter ?</h2>
          <div className="space-y-3 text-gray-700">
            <p>• Vous devez être un citoyen vérifié pour participer aux votes</p>
            <p>• Les référendums ont une valeur consultative ou décisionnelle selon leur nature</p>
            <p>• Les consultations permettent de recueillir l'avis des citoyens</p>
            <p>• Vous pouvez consulter les résultats en temps réel pendant le vote</p>
          </div>
        </div>
      </div>
    </div>
  );
}