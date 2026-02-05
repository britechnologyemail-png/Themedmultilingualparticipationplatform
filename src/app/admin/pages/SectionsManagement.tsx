/**
 * Sections Management Page
 * 
 * Complete interface for managing all platform sections (Consultations,
 * Assemblies, Petitions, Conferences, Votes, Signalements, Youth, Themes)
 */

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  useAllSections, 
  useSectionsSummary,
  useToggleSectionStatus,
  useToggleSectionVisibility,
  useToggleSectionFeatured,
  useBatchUpdateSectionsOrder,
} from '../../hooks/useSections';
import {
  MessageSquare,
  Users,
  FileText,
  Video,
  Vote,
  AlertCircle,
  Sparkles,
  Tag,
  Settings,
  Eye,
  EyeOff,
  Power,
  Star,
  TrendingUp,
  BarChart,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
} from 'lucide-react';
import { SectionKey, SectionDTO } from '../../types';
import { Link } from 'react-router';

// Icon mapping
const SECTION_ICONS = {
  consultations: MessageSquare,
  assemblies: Users,
  petitions: FileText,
  conferences: Video,
  votes: Vote,
  signalements: AlertCircle,
  youth: Sparkles,
  themes: Tag,
};

export function SectionsManagement() {
  const { language } = useLanguage();
  const { data: sections, isLoading } = useAllSections();
  const { data: summary } = useSectionsSummary();
  const toggleStatus = useToggleSectionStatus();
  const toggleVisibility = useToggleSectionVisibility();
  const toggleFeatured = useToggleSectionFeatured();

  const [selectedSection, setSelectedSection] = useState<SectionKey | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {language === 'fr' ? 'Gestion des Sections' :
           language === 'de' ? 'Abschnittsverwaltung' :
           'Sections Management'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Configurez et gérez toutes les sections de la plateforme CiviX' :
           language === 'de' ? 'Konfigurieren und verwalten Sie alle Abschnitte der CiviX-Plattform' :
           'Configure and manage all sections of the CiviX platform'}
        </p>
      </div>

      {/* Statistics Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title={language === 'fr' ? 'Sections Totales' : language === 'de' ? 'Gesamt' : 'Total Sections'}
            value={summary.totalSections}
            icon={<Settings className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title={language === 'fr' ? 'Sections Actives' : language === 'de' ? 'Aktiv' : 'Active Sections'}
            value={summary.activeSections}
            icon={<CheckCircle className="w-5 h-5" />}
            color="green"
          />
          <StatCard
            title={language === 'fr' ? 'Participants Totaux' : language === 'de' ? 'Teilnehmer' : 'Total Participants'}
            value={summary.totalParticipants.toLocaleString()}
            icon={<Users className="w-5 h-5" />}
            color="purple"
          />
          <StatCard
            title={language === 'fr' ? 'Interactions Totales' : language === 'de' ? 'Interaktionen' : 'Total Interactions'}
            value={summary.totalInteractions.toLocaleString()}
            icon={<TrendingUp className="w-5 h-5" />}
            color="orange"
          />
        </div>
      )}

      {/* Sections Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'fr' ? 'Vue d\'ensemble des Sections' :
             language === 'de' ? 'Abschnittsübersicht' :
             'Sections Overview'}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'fr' ? 'Section' : language === 'de' ? 'Abschnitt' : 'Section'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'fr' ? 'Visibilité' : language === 'de' ? 'Sichtbarkeit' : 'Visibility'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'fr' ? 'Statistiques' : language === 'de' ? 'Statistiken' : 'Statistics'}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sections?.map((section) => (
                <SectionRow
                  key={section.config.key}
                  section={section}
                  language={language}
                  onToggleStatus={() => toggleStatus.mutate(section.config.key)}
                  onToggleVisibility={(location) => toggleVisibility.mutate({ key: section.config.key, location })}
                  onToggleFeatured={() => toggleFeatured.mutate(section.config.key)}
                  onConfigure={() => setSelectedSection(section.config.key)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'fr' ? 'Actions Rapides' :
           language === 'de' ? 'Schnellaktionen' :
           'Quick Actions'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
            <Settings className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">
                {language === 'fr' ? 'Configuration Globale' :
                 language === 'de' ? 'Globale Konfiguration' :
                 'Global Configuration'}
              </div>
              <div className="text-sm text-gray-500">
                {language === 'fr' ? 'Paramètres généraux' :
                 language === 'de' ? 'Allgemeine Einstellungen' :
                 'General settings'}
              </div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
            <BarChart className="w-5 h-5 text-purple-600" />
            <div>
              <div className="font-medium text-gray-900">
                {language === 'fr' ? 'Rapport d\'Analyse' :
                 language === 'de' ? 'Analysebericht' :
                 'Analytics Report'}
              </div>
              <div className="text-sm text-gray-500">
                {language === 'fr' ? 'Statistiques détaillées' :
                 language === 'de' ? 'Detaillierte Statistiken' :
                 'Detailed statistics'}
              </div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
            <ExternalLink className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-gray-900">
                {language === 'fr' ? 'Exporter les Données' :
                 language === 'de' ? 'Daten exportieren' :
                 'Export Data'}
              </div>
              <div className="text-sm text-gray-500">
                {language === 'fr' ? 'Configuration CSV/JSON' :
                 language === 'de' ? 'CSV/JSON-Konfiguration' :
                 'CSV/JSON configuration'}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== Sub-Components ====================

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
    </div>
  );
}

interface SectionRowProps {
  section: SectionDTO;
  language: 'fr' | 'de' | 'en';
  onToggleStatus: () => void;
  onToggleVisibility: (location: keyof SectionDTO['config']['visibility']) => void;
  onToggleFeatured: () => void;
  onConfigure: () => void;
}

function SectionRow({ section, language, onToggleStatus, onToggleVisibility, onToggleFeatured, onConfigure }: SectionRowProps) {
  const { config, stats } = section;
  const Icon = SECTION_ICONS[config.key];

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Section Name & Icon */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.display.backgroundColor}`}>
            <Icon className={`w-5 h-5 ${config.display.iconColor}`} />
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {config.metadata.title[language]}
            </div>
            <div className="text-sm text-gray-500">
              {config.metadata.shortDescription[language]}
            </div>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <button
          onClick={onToggleStatus}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            config.status === 'active'
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {config.status === 'active' ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          {config.status === 'active'
            ? (language === 'fr' ? 'Active' : language === 'de' ? 'Aktiv' : 'Active')
            : (language === 'fr' ? 'Inactive' : language === 'de' ? 'Inaktiv' : 'Inactive')}
        </button>
        {config.display.featured && (
          <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Star className="w-3 h-3" />
            Featured
          </span>
        )}
      </td>

      {/* Visibility */}
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          <VisibilityBadge
            label="Header"
            visible={config.visibility.showInHeader}
            onClick={() => onToggleVisibility('showInHeader')}
          />
          <VisibilityBadge
            label="Footer"
            visible={config.visibility.showInFooter}
            onClick={() => onToggleVisibility('showInFooter')}
          />
          <VisibilityBadge
            label="Home"
            visible={config.visibility.showInHomepage}
            onClick={() => onToggleVisibility('showInHomepage')}
          />
        </div>
      </td>

      {/* Statistics */}
      <td className="px-6 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">
              {language === 'fr' ? 'Items:' : language === 'de' ? 'Artikel:' : 'Items:'}
            </span>
            <span className="font-medium text-gray-900">{stats.totalItems}</span>
            <span className="text-green-600">({stats.activeItems} actifs)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">
              {language === 'fr' ? 'Participants:' : language === 'de' ? 'Teilnehmer:' : 'Participants:'}
            </span>
            <span className="font-medium text-gray-900">{stats.totalParticipants.toLocaleString()}</span>
          </div>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <Link
          to={`/admin/sections/${config.key}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Settings className="w-4 h-4" />
          {language === 'fr' ? 'Configurer' : language === 'de' ? 'Konfigurieren' : 'Configure'}
        </Link>
      </td>
    </tr>
  );
}

interface VisibilityBadgeProps {
  label: string;
  visible: boolean;
  onClick: () => void;
}

function VisibilityBadge({ label, visible, onClick }: VisibilityBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
        visible
          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
      {label}
    </button>
  );
}
