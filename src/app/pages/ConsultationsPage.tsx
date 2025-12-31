import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeTag } from '../components/ThemeTag';
import { StatusBadge } from '../components/StatusBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { consultations } from '../data/mockData';
import { themes } from '../data/themes';
import { MessageSquare, MapPin, Calendar, Users, Heart } from 'lucide-react';

export function ConsultationsPage() {
  const { t } = useLanguage();
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredConsultations = consultations.filter((consultation) => {
    if (selectedTheme !== 'all' && consultation.themeId !== selectedTheme) return false;
    if (selectedType !== 'all' && consultation.type !== selectedType) return false;
    return true;
  });

  const stats = {
    debates: consultations.filter((c) => c.type === 'debate').length,
    proposals: consultations.filter((c) => c.type === 'proposal').length,
    meetings: consultations.filter((c) => c.type === 'meeting').length,
    totalParticipants: consultations.reduce((sum, c) => sum + c.participants, 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-4 text-gray-900">{t('nav.consultations')}</h1>
        <p className="text-xl text-gray-600">
          Débats, propositions et rencontres citoyennes
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Débats</p>
                <p className="text-3xl">{stats.debates}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Propositions</p>
                <p className="text-3xl">{stats.proposals}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rencontres</p>
                <p className="text-3xl">{stats.meetings}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Participants</p>
                <p className="text-3xl">{stats.totalParticipants}</p>
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
          <label className="block text-sm mb-2 text-gray-700">Type de concertation</label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('common.all')}</SelectItem>
              <SelectItem value="debate">Débats</SelectItem>
              <SelectItem value="proposal">Propositions</SelectItem>
              <SelectItem value="meeting">Rencontres</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList>
          <TabsTrigger value="all">Toutes ({filteredConsultations.length})</TabsTrigger>
          <TabsTrigger value="debate">Débats ({filteredConsultations.filter(c => c.type === 'debate').length})</TabsTrigger>
          <TabsTrigger value="proposal">Propositions ({filteredConsultations.filter(c => c.type === 'proposal').length})</TabsTrigger>
          <TabsTrigger value="meeting">Rencontres ({filteredConsultations.filter(c => c.type === 'meeting').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ConsultationsList consultations={filteredConsultations} />
        </TabsContent>

        <TabsContent value="debate">
          <ConsultationsList consultations={filteredConsultations.filter(c => c.type === 'debate')} />
        </TabsContent>

        <TabsContent value="proposal">
          <ConsultationsList consultations={filteredConsultations.filter(c => c.type === 'proposal')} />
        </TabsContent>

        <TabsContent value="meeting">
          <ConsultationsList consultations={filteredConsultations.filter(c => c.type === 'meeting')} />
        </TabsContent>
      </Tabs>

      {filteredConsultations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Aucune concertation ne correspond à vos critères.</p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
        <div className="max-w-2xl">
          <h2 className="text-2xl mb-4 text-gray-900">Participez aux concertations</h2>
          <div className="space-y-3 text-gray-700">
            <p>• <strong>Débats :</strong> Échangez sur les sujets qui vous tiennent à cœur</p>
            <p>• <strong>Propositions :</strong> Soumettez vos idées et soutenez celles des autres</p>
            <p>• <strong>Rencontres :</strong> Rencontrez les élus et acteurs locaux en personne</p>
          </div>
          <button className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            Proposer une idée
          </button>
        </div>
      </div>
    </div>
  );
}

// Component to display consultations list
function ConsultationsList({ consultations }: { consultations: typeof import('../data/mockData').consultations }) {
  const { t } = useLanguage();
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'debate':
        return <MessageSquare className="w-5 h-5" />;
      case 'proposal':
        return <Heart className="w-5 h-5" />;
      case 'meeting':
        return <MapPin className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'debate':
        return 'Débat';
      case 'proposal':
        return 'Proposition';
      case 'meeting':
        return 'Rencontre';
      default:
        return type;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {consultations.map((consultation) => (
        <Card key={consultation.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <ThemeTag themeId={consultation.themeId} />
                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300">
                  {getTypeIcon(consultation.type)}
                  {getTypeName(consultation.type)}
                </span>
              </div>
              <StatusBadge status={consultation.status} />
            </div>
            <CardTitle>{consultation.title}</CardTitle>
            <CardDescription className="text-base mt-2">
              {consultation.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(consultation.date).toLocaleDateString('fr-FR')}</span>
                </div>
                {consultation.location && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{consultation.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{consultation.participants} participants</span>
                </div>
              </div>

              {/* Supports for proposals */}
              {consultation.type === 'proposal' && consultation.supports !== undefined && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <Heart className="w-4 h-4" />
                    <span className="font-medium">{consultation.supports} soutiens</span>
                  </div>
                </div>
              )}

              {consultation.status === 'open' && (
                <Link
                  to={`/consultations/${consultation.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  {t('common.participate')}
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}