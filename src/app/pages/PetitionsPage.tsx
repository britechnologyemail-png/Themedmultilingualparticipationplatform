import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeTag } from '../components/ThemeTag';
import { StatusBadge } from '../components/StatusBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { petitions } from '../data/mockData';
import { themes } from '../data/themes';
import { FileText, TrendingUp, Users } from 'lucide-react';

export function PetitionsPage() {
  const { t } = useLanguage();
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredPetitions = petitions.filter((petition) => {
    if (selectedTheme !== 'all' && petition.themeId !== selectedTheme) return false;
    if (selectedStatus !== 'all' && petition.status !== selectedStatus) return false;
    return true;
  });

  const stats = {
    total: petitions.length,
    open: petitions.filter((p) => p.status === 'open').length,
    thresholdReached: petitions.filter((p) => p.status === 'threshold_reached').length,
    totalSignatures: petitions.reduce((sum, p) => sum + p.current, 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-4 text-gray-900">{t('nav.petitions')}</h1>
        <p className="text-xl text-gray-600">
          Lancez ou signez des pétitions pour faire entendre votre voix
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pétitions actives</p>
                <p className="text-3xl">{stats.open}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Seuil atteint</p>
                <p className="text-3xl">{stats.thresholdReached}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total pétitions</p>
                <p className="text-3xl">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Signatures totales</p>
                <p className="text-3xl">{stats.totalSignatures.toLocaleString()}</p>
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
          <label className="block text-sm mb-2 text-gray-700">{t('common.filter')} par statut</label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('common.all')}</SelectItem>
              <SelectItem value="open">Ouvertes</SelectItem>
              <SelectItem value="closed">Fermées</SelectItem>
              <SelectItem value="threshold_reached">Seuil atteint</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Petitions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPetitions.map((petition) => {
          const percentage = (petition.current / petition.target) * 100;
          const daysLeft = Math.ceil(
            (new Date(petition.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );

          return (
            <Card key={petition.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <ThemeTag themeId={petition.themeId} />
                  <StatusBadge status={petition.status} />
                </div>
                <CardTitle>{petition.title}</CardTitle>
                <CardDescription>{petition.description}</CardDescription>
                <div className="text-sm text-gray-600 mt-2">
                  Lancée par : <span className="font-medium">{petition.author}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">
                        <span className="font-semibold text-gray-900">{petition.current}</span> /{' '}
                        {petition.target} {t('common.signatures')}
                      </span>
                      <span className="font-semibold">{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          percentage >= 100 ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Time remaining */}
                  {petition.status === 'open' && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {daysLeft > 0 ? (
                          <>
                            <span className="font-medium text-gray-900">{daysLeft}</span> jours
                            restants
                          </>
                        ) : (
                          <span className="text-red-600">Expire bientôt</span>
                        )}
                      </span>
                      <Link
                        to={`/petitions/${petition.id}`}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        Signer
                      </Link>
                    </div>
                  )}

                  {petition.status === 'threshold_reached' && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        ✓ Objectif atteint ! Cette pétition sera examinée par les autorités.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPetitions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Aucune pétition ne correspond à vos critères de recherche.</p>
        </div>
      )}

      {/* CTA to create petition */}
      <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="max-w-2xl">
          <h2 className="text-2xl mb-4 text-gray-900">Lancez votre propre pétition</h2>
          <p className="text-gray-700 mb-6">
            Vous avez une idée pour améliorer votre commune ? Créez une pétition et mobilisez les
            citoyens autour de votre cause.
          </p>
          <button className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            Créer une pétition
          </button>
        </div>
      </div>
    </div>
  );
}
