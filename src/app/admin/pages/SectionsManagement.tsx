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
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Download,
  FileJson,
  FileSpreadsheet,
  Globe,
  Clock,
} from 'lucide-react';
import { SectionKey, SectionDTO } from '../../types';
import { Link, useNavigate } from 'react-router';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

// Mapping des sections vers leurs pages de gestion dédiées
const SECTION_MANAGEMENT_ROUTES: Record<SectionKey, string> = {
  consultations: '/admin/consultations',
  assemblies: '/admin/assemblies',
  petitions: '/admin/petitions',
  conferences: '/admin/conferences',
  votes: '/admin/votes',
  signalements: '/admin/signalements',
  youth: '/admin/youth',
  themes: '/admin/themes',
};

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
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState<SectionKey | null>(null);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [showAnalyticsDialog, setShowAnalyticsDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');
  const [selectedSections, setSelectedSections] = useState<string[]>(['all']);

  const handleGlobalConfig = () => {
    setShowConfigDialog(true);
  };

  const handleViewAnalytics = () => {
    setShowAnalyticsDialog(true);
  };

  const handleGlobalExport = () => {
    setShowExportDialog(true);
  };

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
          <button className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left" onClick={handleGlobalConfig}>
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
          
          <button className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left" onClick={handleViewAnalytics}>
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
          
          <button className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left" onClick={handleGlobalExport}>
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

      {/* Configuration Dialog */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              {language === 'fr' ? 'Configuration Globale' :
               language === 'de' ? 'Globale Konfiguration' :
               'Global Configuration'}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Paramètres généraux de la plateforme CiviX' :
               language === 'de' ? 'Allgemeine Einstellungen der CiviX-Plattform' :
               'General settings for the CiviX platform'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Langue par défaut */}
            <div className="space-y-2">
              <Label htmlFor="default-language" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {language === 'fr' ? 'Langue par défaut' :
                 language === 'de' ? 'Standardsprache' :
                 'Default Language'}
              </Label>
              <Select defaultValue="fr">
                <SelectTrigger id="default-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fuseau horaire */}
            <div className="space-y-2">
              <Label htmlFor="timezone" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {language === 'fr' ? 'Fuseau horaire' :
                 language === 'de' ? 'Zeitzone' :
                 'Timezone'}
              </Label>
              <Select defaultValue="Europe/Geneva">
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Geneva">Europe/Geneva (GMT+1)</SelectItem>
                  <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                  <SelectItem value="Europe/Berlin">Europe/Berlin (GMT+1)</SelectItem>
                  <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nom de la plateforme */}
            <div className="space-y-2">
              <Label htmlFor="platform-name">
                {language === 'fr' ? 'Nom de la plateforme' :
                 language === 'de' ? 'Plattformname' :
                 'Platform Name'}
              </Label>
              <Input id="platform-name" defaultValue="CiviX" placeholder="CiviX" />
            </div>

            {/* Email de contact */}
            <div className="space-y-2">
              <Label htmlFor="contact-email">
                {language === 'fr' ? 'Email de contact' :
                 language === 'de' ? 'Kontakt-E-Mail' :
                 'Contact Email'}
              </Label>
              <Input id="contact-email" type="email" defaultValue="contact@civix.ch" placeholder="contact@civix.ch" />
            </div>

            {/* Options de visibilité */}
            <div className="space-y-3 pt-3 border-t">
              <Label className="text-sm font-semibold">
                {language === 'fr' ? 'Options de visibilité' :
                 language === 'de' ? 'Sichtbarkeitsoptionen' :
                 'Visibility Options'}
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-stats" defaultChecked />
                  <label htmlFor="show-stats" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {language === 'fr' ? 'Afficher les statistiques publiques' :
                     language === 'de' ? 'Öffentliche Statistiken anzeigen' :
                     'Show public statistics'}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-themes" defaultChecked />
                  <label htmlFor="show-themes" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {language === 'fr' ? 'Activer le filtrage par thèmes' :
                     language === 'de' ? 'Filterung nach Themen aktivieren' :
                     'Enable theme filtering'}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-notifications" defaultChecked />
                  <label htmlFor="show-notifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {language === 'fr' ? 'Activer les notifications push' :
                     language === 'de' ? 'Push-Benachrichtigungen aktivieren' :
                     'Enable push notifications'}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowConfigDialog(false)}>
              {language === 'fr' ? 'Annuler' :
               language === 'de' ? 'Abbrechen' :
               'Cancel'}
            </Button>
            <Button onClick={() => {
              toast.success(
                language === 'fr' ? 'Configuration enregistrée avec succès' :
                language === 'de' ? 'Konfiguration erfolgreich gespeichert' :
                'Configuration saved successfully'
              );
              setShowConfigDialog(false);
            }}>
              {language === 'fr' ? 'Enregistrer' :
               language === 'de' ? 'Speichern' :
               'Save'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={showAnalyticsDialog} onOpenChange={setShowAnalyticsDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-purple-600" />
              {language === 'fr' ? 'Rapport d\'Analyse' :
               language === 'de' ? 'Analysebericht' :
               'Analytics Report'}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Statistiques détaillées de toutes les sections' :
               language === 'de' ? 'Detaillierte Statistiken aller Abschnitte' :
               'Detailed statistics of all sections'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Statistiques globales */}
            {summary && (
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {language === 'fr' ? 'Sections Actives' : language === 'de' ? 'Aktive Abschnitte' : 'Active Sections'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{summary.activeSections}/{summary.totalSections}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {language === 'fr' ? 'Participants Totaux' : language === 'de' ? 'Gesamtteilnehmer' : 'Total Participants'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{summary.totalParticipants.toLocaleString()}</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Statistiques par section */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">
                {language === 'fr' ? 'Statistiques par section' :
                 language === 'de' ? 'Statistiken nach Abschnitt' :
                 'Statistics by section'}
              </Label>
              <div className="space-y-2">
                {sections?.map((section) => (
                  <div key={section.config.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${section.config.display.backgroundColor}`}>
                        {React.createElement(SECTION_ICONS[section.config.key], {
                          className: `w-4 h-4 ${section.config.display.iconColor}`,
                        })}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">{section.config.metadata.title[language]}</div>
                        <div className="text-xs text-gray-500">
                          {section.stats.totalItems} {language === 'fr' ? 'items' : language === 'de' ? 'Artikel' : 'items'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{section.stats.totalParticipants.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{language === 'fr' ? 'participants' : language === 'de' ? 'Teilnehmer' : 'participants'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Période d'analyse */}
            <div className="pt-3 border-t">
              <Label htmlFor="analytics-period">
                {language === 'fr' ? 'Période d\'analyse' :
                 language === 'de' ? 'Analysezeitraum' :
                 'Analysis Period'}
              </Label>
              <Select defaultValue="last30days">
                <SelectTrigger id="analytics-period" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">
                    {language === 'fr' ? '7 derniers jours' : language === 'de' ? 'Letzte 7 Tage' : 'Last 7 days'}
                  </SelectItem>
                  <SelectItem value="last30days">
                    {language === 'fr' ? '30 derniers jours' : language === 'de' ? 'Letzte 30 Tage' : 'Last 30 days'}
                  </SelectItem>
                  <SelectItem value="last3months">
                    {language === 'fr' ? '3 derniers mois' : language === 'de' ? 'Letzte 3 Monate' : 'Last 3 months'}
                  </SelectItem>
                  <SelectItem value="lastyear">
                    {language === 'fr' ? 'Dernière année' : language === 'de' ? 'Letztes Jahr' : 'Last year'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => {
              toast.success(
                language === 'fr' ? 'Rapport téléchargé avec succès' :
                language === 'de' ? 'Bericht erfolgreich heruntergeladen' :
                'Report downloaded successfully'
              );
            }}>
              <Download className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Télécharger PDF' :
               language === 'de' ? 'PDF herunterladen' :
               'Download PDF'}
            </Button>
            <Button variant="outline" onClick={() => setShowAnalyticsDialog(false)}>
              {language === 'fr' ? 'Fermer' :
               language === 'de' ? 'Schließen' :
               'Close'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-green-600" />
              {language === 'fr' ? 'Exporter les Données' :
               language === 'de' ? 'Daten exportieren' :
               'Export Data'}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Configuration de l\'export CSV/JSON' :
               language === 'de' ? 'CSV/JSON-Exportkonfiguration' :
               'CSV/JSON export configuration'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Sélection des sections */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">
                {language === 'fr' ? 'Sections à exporter' :
                 language === 'de' ? 'Zu exportierende Abschnitte' :
                 'Sections to export'}
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="export-all" 
                    checked={selectedSections.includes('all')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedSections(['all']);
                      } else {
                        setSelectedSections([]);
                      }
                    }}
                  />
                  <label htmlFor="export-all" className="text-sm font-medium">
                    {language === 'fr' ? 'Toutes les sections' :
                     language === 'de' ? 'Alle Abschnitte' :
                     'All sections'}
                  </label>
                </div>
                {sections?.map((section) => (
                  <div key={section.config.key} className="flex items-center space-x-2 ml-6">
                    <Checkbox 
                      id={`export-${section.config.key}`}
                      disabled={selectedSections.includes('all')}
                    />
                    <label htmlFor={`export-${section.config.key}`} className="text-sm">
                      {section.config.metadata.title[language]}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Format d'export */}
            <div className="space-y-2 pt-3 border-t">
              <Label>
                {language === 'fr' ? 'Format d\'export' :
                 language === 'de' ? 'Exportformat' :
                 'Export Format'}
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setExportFormat('csv')}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                    exportFormat === 'csv'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FileSpreadsheet className={`w-5 h-5 ${exportFormat === 'csv' ? 'text-blue-600' : 'text-gray-500'}`} />
                  <div className="text-left">
                    <div className="font-medium text-sm">CSV</div>
                    <div className="text-xs text-gray-500">
                      {language === 'fr' ? 'Tableur' : language === 'de' ? 'Tabelle' : 'Spreadsheet'}
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setExportFormat('json')}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                    exportFormat === 'json'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FileJson className={`w-5 h-5 ${exportFormat === 'json' ? 'text-blue-600' : 'text-gray-500'}`} />
                  <div className="text-left">
                    <div className="font-medium text-sm">JSON</div>
                    <div className="text-xs text-gray-500">
                      {language === 'fr' ? 'Données' : language === 'de' ? 'Daten' : 'Data'}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Options d'export */}
            <div className="space-y-2 pt-3 border-t">
              <Label className="text-sm font-semibold">
                {language === 'fr' ? 'Options' :
                 language === 'de' ? 'Optionen' :
                 'Options'}
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-participants" defaultChecked />
                  <label htmlFor="include-participants" className="text-sm">
                    {language === 'fr' ? 'Inclure les participants' :
                     language === 'de' ? 'Teilnehmer einschließen' :
                     'Include participants'}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-comments" defaultChecked />
                  <label htmlFor="include-comments" className="text-sm">
                    {language === 'fr' ? 'Inclure les commentaires' :
                     language === 'de' ? 'Kommentare einschließen' :
                     'Include comments'}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-stats" defaultChecked />
                  <label htmlFor="include-stats" className="text-sm">
                    {language === 'fr' ? 'Inclure les statistiques' :
                     language === 'de' ? 'Statistiken einschließen' :
                     'Include statistics'}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              {language === 'fr' ? 'Annuler' :
               language === 'de' ? 'Abbrechen' :
               'Cancel'}
            </Button>
            <Button onClick={() => {
              toast.success(
                language === 'fr' ? `Export ${exportFormat.toUpperCase()} en cours...` :
                language === 'de' ? `${exportFormat.toUpperCase()}-Export läuft...` :
                `${exportFormat.toUpperCase()} export in progress...`
              );
              setShowExportDialog(false);
            }}>
              <Download className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Exporter' :
               language === 'de' ? 'Exportieren' :
               'Export'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
  const navigate = useNavigate();

  const handleViewSection = () => {
    navigate(SECTION_MANAGEMENT_ROUTES[config.key]);
    toast.success(
      language === 'fr' ? `Ouverture de ${config.metadata.title[language]}...` :
      language === 'de' ? `Öffnen von ${config.metadata.title[language]}...` :
      `Opening ${config.metadata.title[language]}...`
    );
  };

  const handleAddNew = () => {
    navigate(SECTION_MANAGEMENT_ROUTES[config.key]);
    toast.info(
      language === 'fr' ? 'Créer un nouvel élément...' :
      language === 'de' ? 'Neues Element erstellen...' :
      'Create new item...'
    );
  };

  const handleEditSettings = () => {
    toast.info(
      language === 'fr' ? 'Configuration des paramètres...' :
      language === 'de' ? 'Einstellungen konfigurieren...' :
      'Configuring settings...'
    );
  };

  const handleViewStats = () => {
    toast.info(
      language === 'fr' ? 'Affichage des statistiques...' :
      language === 'de' ? 'Statistiken anzeigen...' :
      'Viewing statistics...'
    );
  };

  const handleExport = () => {
    toast.success(
      language === 'fr' ? 'Export des données en cours...' :
      language === 'de' ? 'Daten werden exportiert...' :
      'Exporting data...'
    );
  };

  const getAddNewLabel = () => {
    const labels: Record<SectionKey, { fr: string; de: string; en: string }> = {
      consultations: { fr: 'Nouvelle concertation', de: 'Neue Konsultation', en: 'New consultation' },
      assemblies: { fr: 'Nouvelle assemblée', de: 'Neue Versammlung', en: 'New assembly' },
      petitions: { fr: 'Nouvelle pétition', de: 'Neue Petition', en: 'New petition' },
      conferences: { fr: 'Nouvelle conférence', de: 'Neue Konferenz', en: 'New conference' },
      votes: { fr: 'Nouveau vote', de: 'Neue Abstimmung', en: 'New vote' },
      signalements: { fr: 'Nouveau signalement', de: 'Neue Meldung', en: 'New report' },
      youth: { fr: 'Nouveau contenu jeunesse', de: 'Neuer Jugendinhalt', en: 'New youth content' },
      themes: { fr: 'Nouveau thème', de: 'Neues Thema', en: 'New theme' },
    };
    return labels[config.key][language];
  };

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
        <div className="flex items-center justify-end gap-2">
          {/* Quick Configure Button */}
          <Link
            to={SECTION_MANAGEMENT_ROUTES[config.key]}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            {language === 'fr' ? 'Voir' : language === 'de' ? 'Ansehen' : 'View'}
          </Link>

          {/* Actions Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}
              </DropdownMenuLabel>
              
              <DropdownMenuItem onClick={handleViewSection}>
                <Eye className="mr-2 h-4 w-4" />
                {language === 'fr' ? 'Voir la section' : language === 'de' ? 'Abschnitt ansehen' : 'View section'}
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                {getAddNewLabel()}
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={handleEditSettings}>
                <Settings className="mr-2 h-4 w-4" />
                {language === 'fr' ? 'Configurer' : language === 'de' ? 'Konfigurieren' : 'Configure'}
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={handleViewStats}>
                <BarChart className="mr-2 h-4 w-4" />
                {language === 'fr' ? 'Statistiques' : language === 'de' ? 'Statistiken' : 'Statistics'}
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                {language === 'fr' ? 'Exporter les données' : language === 'de' ? 'Daten exportieren' : 'Export data'}
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={onToggleFeatured}>
                <Star className="mr-2 h-4 w-4" />
                {config.display.featured
                  ? (language === 'fr' ? 'Retirer de l\'épinglage' : language === 'de' ? 'Vom Anheften entfernen' : 'Unpin')
                  : (language === 'fr' ? 'Épingler' : language === 'de' ? 'Anheften' : 'Pin')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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