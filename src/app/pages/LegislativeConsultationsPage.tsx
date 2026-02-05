import React, { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useLegislativeConsultationSummaries, useThemes } from '@/app/hooks/useApi';
import { PageBanner } from '@/app/components/PageBanner';
import { PageLayout } from '@/app/components/layout/PageLayout';
import { LegislativeConsultationCard } from '@/app/components/cards/LegislativeConsultationCard';
import { EmptyState } from '@/app/components/EmptyState';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { ErrorMessage } from '@/app/components/ErrorMessage';
import { FileText, Filter, X, Scale } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';

export function LegislativeConsultationsPage() {
  const { language, t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [themeFilter, setThemeFilter] = useState<string>('all');
  const [textTypeFilter, setTextTypeFilter] = useState<string>('all');

  // Build filters
  const filters: Record<string, any> = {};
  if (statusFilter !== 'all') filters.status = statusFilter;
  if (themeFilter !== 'all') filters.themeId = themeFilter;
  if (textTypeFilter !== 'all') filters.textType = textTypeFilter;

  // Fetch data
  const { data: consultations, isLoading, error } = useLegislativeConsultationSummaries(filters);
  const { data: themes } = useThemes();

  // Page header
  const pageTitle = {
    fr: 'Consultations Législatives',
    de: 'Gesetzgebungsberatungen',
    en: 'Legislative Consultations',
  }[language];

  const pageDescription = {
    fr: 'Participez à l\'élaboration des textes législatifs en annotant les articles et en votant sur les commentaires de la communauté',
    de: 'Beteiligen Sie sich an der Ausarbeitung von Gesetzestexten, indem Sie Artikel annotieren und über Community-Kommentare abstimmen',
    en: 'Participate in the development of legislative texts by annotating articles and voting on community comments',
  }[language];

  // Status options
  const statusOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'open', label: language === 'fr' ? 'Ouvertes' : language === 'de' ? 'Offen' : 'Open' },
    { value: 'upcoming', label: t('common.upcoming') },
    { value: 'closed', label: t('common.closed') },
  ];

  // Text type options
  const textTypeOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'law', label: language === 'fr' ? 'Projet de loi' : language === 'de' ? 'Gesetzentwurf' : 'Bill' },
    { value: 'regulation', label: language === 'fr' ? 'Règlement' : language === 'de' ? 'Verordnung' : 'Regulation' },
    { value: 'decree', label: language === 'fr' ? 'Décret' : language === 'de' ? 'Dekret' : 'Decree' },
    { value: 'ordinance', label: language === 'fr' ? 'Ordonnance' : language === 'de' ? 'Verordnung' : 'Ordinance' },
    { value: 'amendment', label: language === 'fr' ? 'Amendement' : language === 'de' ? 'Änderungsantrag' : 'Amendment' },
  ];

  // Theme options
  const themeOptions = [
    { value: 'all', label: t('common.all') },
    ...(themes || []).map(theme => ({
      value: theme.id,
      label: theme.name[language],
    })),
  ];

  // Check if any filters are active
  const hasActiveFilters = statusFilter !== 'all' || themeFilter !== 'all' || textTypeFilter !== 'all';
  
  // Reset all filters
  const resetFilters = () => {
    setStatusFilter('all');
    setThemeFilter('all');
    setTextTypeFilter('all');
  };

  // Get active filter labels
  const getActiveFilterLabel = (value: string, options: Array<{value: string; label: string}>) => {
    return options.find(opt => opt.value === value)?.label || '';
  };

  return (
    <div>
      {/* Page Banner - Same style as Dashboard */}
      <PageBanner
        title={pageTitle}
        description={pageDescription}
        gradient="from-indigo-600 to-purple-600"
        icon={<Scale className="w-12 h-12 text-white" />}
      />

      <PageLayout className="py-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {language === 'fr' && 'Textes législatifs ouverts à la consultation'}
                {language === 'de' && 'Gesetzestexte zur Konsultation'}
                {language === 'en' && 'Legislative texts open for consultation'}
              </h2>
              <p className="text-sm text-gray-500">
                {language === 'fr' && 'Annotez les articles, votez sur les commentaires et participez au débat législatif'}
                {language === 'de' && 'Kommentieren Sie Artikel, stimmen Sie über Kommentare ab und nehmen Sie an der gesetzgeberischen Debatte teil'}
                {language === 'en' && 'Annotate articles, vote on comments and participate in legislative debate'}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filtre Statut */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    {t('common.filter')}
                  </div>
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtre Type de texte */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Type de texte' : language === 'de' ? 'Texttyp' : 'Text type'}
                </label>
                <select
                  value={textTypeFilter}
                  onChange={(e) => setTextTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {textTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtre Thème */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Thème' : language === 'de' ? 'Thema' : 'Theme'}
                </label>
                <select
                  value={themeFilter}
                  onChange={(e) => setThemeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {themeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active filters and results count */}
          {!isLoading && !error && (
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-3">
                {/* Results count */}
                <Badge variant="outline" className="text-sm font-normal px-3 py-1">
                  {consultations?.length || 0}{' '}
                  {language === 'fr' && (consultations?.length === 1 ? 'consultation' : 'consultations')}
                  {language === 'de' && (consultations?.length === 1 ? 'Beratung' : 'Beratungen')}
                  {language === 'en' && (consultations?.length === 1 ? 'consultation' : 'consultations')}
                </Badge>

                {/* Active filters */}
                {statusFilter !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
                    <span className="text-xs">
                      {language === 'fr' && 'Statut: '}
                      {language === 'de' && 'Status: '}
                      {language === 'en' && 'Status: '}
                      {getActiveFilterLabel(statusFilter, statusOptions)}
                    </span>
                    <X 
                      className="w-3.5 h-3.5 cursor-pointer hover:text-red-600 transition-colors" 
                      onClick={() => setStatusFilter('all')}
                    />
                  </Badge>
                )}

                {textTypeFilter !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
                    <span className="text-xs">
                      {language === 'fr' && 'Type: '}
                      {language === 'de' && 'Typ: '}
                      {language === 'en' && 'Type: '}
                      {getActiveFilterLabel(textTypeFilter, textTypeOptions)}
                    </span>
                    <X 
                      className="w-3.5 h-3.5 cursor-pointer hover:text-red-600 transition-colors" 
                      onClick={() => setTextTypeFilter('all')}
                    />
                  </Badge>
                )}

                {themeFilter !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
                    <span className="text-xs">
                      {language === 'fr' && 'Thème: '}
                      {language === 'de' && 'Thema: '}
                      {language === 'en' && 'Theme: '}
                      {getActiveFilterLabel(themeFilter, themeOptions)}
                    </span>
                    <X 
                      className="w-3.5 h-3.5 cursor-pointer hover:text-red-600 transition-colors" 
                      onClick={() => setThemeFilter('all')}
                    />
                  </Badge>
                )}

                {/* Reset filters button */}
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-sm h-8 hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 mr-1" />
                    {language === 'fr' && 'Réinitialiser'}
                    {language === 'de' && 'Zurücksetzen'}
                    {language === 'en' && 'Reset'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {isLoading && (
          <div className="py-12">
            <LoadingSpinner />
          </div>
        )}
        
        {error && (
          <ErrorMessage 
            message={
              language === 'fr' 
                ? 'Erreur lors du chargement des consultations législatives' 
                : language === 'de'
                ? 'Fehler beim Laden der Gesetzgebungsberatungen'
                : 'Error loading legislative consultations'
            } 
          />
        )}

        {!isLoading && !error && consultations && consultations.length === 0 && (
          <EmptyState
            icon={<FileText className="w-12 h-12 text-gray-400" />}
            title={
              language === 'fr'
                ? 'Aucune consultation législative'
                : language === 'de'
                ? 'Keine Gesetzgebungsberatungen'
                : 'No legislative consultations'
            }
            description={
              language === 'fr'
                ? 'Il n\'y a pas de consultations législatives correspondant à vos critères.'
                : language === 'de'
                ? 'Es gibt keine Gesetzgebungsberatungen, die Ihren Kriterien entsprechen.'
                : 'There are no legislative consultations matching your criteria.'
            }
          />
        )}

        {!isLoading && !error && consultations && consultations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultations.map(consultation => (
              <LegislativeConsultationCard
                key={consultation.id}
                consultation={consultation}
              />
            ))}
          </div>
        )}
      </PageLayout>
    </div>
  );
}