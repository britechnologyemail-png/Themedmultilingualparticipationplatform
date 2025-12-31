import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeTag } from '../components/ThemeTag';
import { StatusBadge } from '../components/StatusBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { participatoryProcesses, consultations, petitions, votes } from '../data/mockData';
import { themes } from '../data/themes';
import { ArrowRight, TrendingUp, Users, FileText, Vote } from 'lucide-react';

export function Dashboard() {
  const { t } = useLanguage();

  const stats = [
    {
      title: 'Processus actifs',
      value: participatoryProcesses.filter((p) => p.status === 'active').length,
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Pétitions ouvertes',
      value: petitions.filter((p) => p.status === 'open').length,
      icon: FileText,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      title: 'Votes en cours',
      value: votes.filter((v) => v.status === 'open').length,
      icon: Vote,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      title: 'Participants totaux',
      value: '2,450',
      icon: Users,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl mb-4 text-gray-900">{t('dashboard.welcome')}</h1>
        <p className="text-xl text-gray-600">
          Participez aux décisions qui façonnent votre commune
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Themes Overview */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-gray-900">{t('nav.themes')}</h2>
          <Link to="/themes" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
            Voir tous <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.slice(0, 8).map((theme) => (
            <Link
              key={theme.id}
              to={`/themes/${theme.id}`}
              className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md"
              style={{ borderLeftWidth: '4px', borderLeftColor: theme.color }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{theme.icon}</span>
                <span className="text-sm">{t(theme.name)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Active Processes */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-gray-900">{t('dashboard.activeProcesses')}</h2>
          <Link to="/processes" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
            Voir tous <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {participatoryProcesses
            .filter((p) => p.status === 'active')
            .slice(0, 2)
            .map((process) => (
              <Card key={process.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <ThemeTag themeId={process.themeId} />
                    <StatusBadge status={process.status} />
                  </div>
                  <CardTitle>{process.title}</CardTitle>
                  <CardDescription>{process.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {process.participants} {t('common.participants')}
                    </span>
                    <span>
                      {new Date(process.endDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <Link
                    to={`/processes/${process.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    {t('common.participate')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Recent Petitions */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-gray-900">{t('nav.petitions')}</h2>
          <Link to="/petitions" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
            Voir toutes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {petitions.slice(0, 2).map((petition) => {
            const percentage = (petition.current / petition.target) * 100;
            return (
              <Card key={petition.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <ThemeTag themeId={petition.themeId} />
                    <StatusBadge status={petition.status} />
                  </div>
                  <CardTitle>{petition.title}</CardTitle>
                  <CardDescription>{petition.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">
                        {petition.current} / {petition.target} {t('common.signatures')}
                      </span>
                      <span>{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                  <Link
                    to={`/petitions/${petition.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    Signer la pétition <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Open Votes */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-gray-900">{t('nav.votes')}</h2>
          <Link to="/votes" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
            Voir tous <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {votes
            .filter((v) => v.status === 'open')
            .slice(0, 2)
            .map((vote) => (
              <Card key={vote.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <ThemeTag themeId={vote.themeId} />
                    <StatusBadge status={vote.status} />
                  </div>
                  <CardTitle>{vote.title}</CardTitle>
                  <CardDescription>{vote.question}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    {vote.participants && (
                      <span className="flex items-center gap-1">
                        <Vote className="w-4 h-4" />
                        {vote.participants} votes
                      </span>
                    )}
                    <span>
                      Jusqu'au {new Date(vote.endDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <Link
                    to={`/votes/${vote.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    Voter <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
