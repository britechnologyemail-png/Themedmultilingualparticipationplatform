/**
 * Section Detail Configuration Page
 * 
 * Detailed configuration interface for a specific section with
 * tabs for Settings, Features, Access Control, and Statistics
 */

import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSection, useUpdateSection } from '../../hooks/useSections';
import {
  ArrowLeft,
  Settings,
  Eye,
  Shield,
  Sliders,
  BarChart,
  Save,
  Loader2,
  CheckCircle,
  XCircle,
  Info,
  Users,
  Globe,
  Tag,
  Plus, // Added Plus icon
} from 'lucide-react';
import { SectionKey, UpdateSectionConfigDTO } from '../../types';

// Import all creation dialogs
import { CreateConsultationDialog } from '../components/dialogs/ConsultationDialogs';
import { CreateAssemblyDialog, CreatePetitionDialog, CreateConferenceDialog, CreateVoteDialog } from '../components/dialogs/SectionContentDialogs';
import { CreateSignalementDialog, CreateYouthPollDialog } from '../components/dialogs/AdditionalSectionDialogs';
import { NewThemeDialog } from '../components/dialogs/ThemeDialogs';
import { toast } from 'sonner';

export function SectionDetailConfig() {
  const { sectionKey } = useParams<{ sectionKey: SectionKey }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { data: section, isLoading } = useSection(sectionKey as SectionKey);
  const updateSection = useUpdateSection();

  const [activeTab, setActiveTab] = useState<'settings' | 'features' | 'access' | 'stats'>('settings');
  const [formData, setFormData] = useState<UpdateSectionConfigDTO>({});
  
  // Dialog states for each section type
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!section) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Section non trouvée</p>
        <Link to="/admin/sections" className="text-blue-600 hover:underline mt-4 inline-block">
          Retour à la liste
        </Link>
      </div>
    );
  }

  const { config, stats } = section;

  const handleSave = () => {
    if (Object.keys(formData).length === 0) {
      return;
    }

    updateSection.mutate({
      key: config.key,
      updates: formData,
    }, {
      onSuccess: () => {
        setFormData({});
      },
    });
  };

  const tabs = [
    { id: 'settings' as const, label: language === 'fr' ? 'Paramètres' : language === 'de' ? 'Einstellungen' : 'Settings', icon: Settings },
    { id: 'features' as const, label: language === 'fr' ? 'Fonctionnalités' : language === 'de' ? 'Funktionen' : 'Features', icon: Sliders },
    { id: 'access' as const, label: language === 'fr' ? 'Accès' : language === 'de' ? 'Zugriff' : 'Access', icon: Shield },
    { id: 'stats' as const, label: language === 'fr' ? 'Statistiques' : language === 'de' ? 'Statistiken' : 'Statistics', icon: BarChart },
  ];

  // Get appropriate dialog component based on section key
  const renderCreateDialog = () => {
    const commonProps = {
      isOpen: isCreateDialogOpen,
      onClose: () => setIsCreateDialogOpen(false),
      themes: [], // TODO: Pass actual themes from API
    };

    switch (config.key) {
      case 'consultations':
        return <CreateConsultationDialog {...commonProps} />;
      case 'assemblies':
        return <CreateAssemblyDialog {...commonProps} />;
      case 'petitions':
        return <CreatePetitionDialog {...commonProps} />;
      case 'conferences':
        return <CreateConferenceDialog {...commonProps} />;
      case 'votes':
        return <CreateVoteDialog {...commonProps} />;
      case 'signalements':
        return <CreateSignalementDialog {...commonProps} />;
      case 'youth':
        return <CreateYouthPollDialog {...commonProps} />;
      case 'themes':
        return (
          <NewThemeDialog 
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            onSubmit={(data) => {
              console.log('New theme created:', data);
              toast.success(
                language === 'fr' ? 'Thème créé avec succès' :
                language === 'de' ? 'Thema erfolgreich erstellt' :
                'Theme created successfully'
              );
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/sections')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              {config.metadata.title[language]}
            </h1>
            <p className="text-gray-600 mt-1">
              {config.metadata.description[language]}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {/* Add New Content Button */}
          <button
            onClick={() => setIsCreateDialogOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            {language === 'fr' ? 'Ajouter' : language === 'de' ? 'Hinzufügen' : 'Add'}
          </button>

          <button
            onClick={handleSave}
            disabled={Object.keys(formData).length === 0 || updateSection.isPending}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {updateSection.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {language === 'fr' ? 'Enregistrer' : language === 'de' ? 'Speichern' : 'Save'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {activeTab === 'settings' && (
          <SettingsTab
            config={config}
            formData={formData}
            setFormData={setFormData}
            language={language}
          />
        )}
        {activeTab === 'features' && (
          <FeaturesTab
            config={config}
            formData={formData}
            setFormData={setFormData}
            language={language}
          />
        )}
        {activeTab === 'access' && (
          <AccessTab
            config={config}
            formData={formData}
            setFormData={setFormData}
            language={language}
          />
        )}
        {activeTab === 'stats' && (
          <StatsTab stats={stats} language={language} />
        )}
      </div>

      {/* Render appropriate creation dialog */}
      {renderCreateDialog()}
    </div>
  );
}

// ==================== Tab Components ====================

interface TabProps {
  config: any;
  formData: any;
  setFormData: (data: any) => void;
  language: 'fr' | 'de' | 'en';
}

function SettingsTab({ config, formData, setFormData, language }: TabProps) {
  const handleVisibilityChange = (field: string, value: boolean) => {
    setFormData({
      ...formData,
      visibility: {
        ...formData.visibility,
        [field]: value,
      },
    });
  };

  const handleDisplayChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      display: {
        ...formData.display,
        [field]: value,
      },
    });
  };

  const currentVisibility = { ...config.visibility, ...formData.visibility };
  const currentDisplay = { ...config.display, ...formData.display };

  return (
    <div className="space-y-8">
      {/* Status */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          {language === 'fr' ? 'Statut de la Section' : language === 'de' ? 'Abschnittsstatus' : 'Section Status'}
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="status"
              checked={formData.status === 'active' || (!formData.status && config.status === 'active')}
              onChange={() => setFormData({ ...formData, status: 'active' })}
              className="w-4 h-4 text-blue-600"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {language === 'fr' ? 'Active' : language === 'de' ? 'Aktiv' : 'Active'}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'fr' ? 'La section est visible et accessible aux utilisateurs' :
                 language === 'de' ? 'Der Abschnitt ist für Benutzer sichtbar und zugänglich' :
                 'Section is visible and accessible to users'}
              </div>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="status"
              checked={formData.status === 'inactive' || (!formData.status && config.status === 'inactive')}
              onChange={() => setFormData({ ...formData, status: 'inactive' })}
              className="w-4 h-4 text-blue-600"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {language === 'fr' ? 'Inactive' : language === 'de' ? 'Inaktiv' : 'Inactive'}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'fr' ? 'La section est masquée pour tous les utilisateurs' :
                 language === 'de' ? 'Der Abschnitt ist für alle Benutzer verborgen' :
                 'Section is hidden from all users'}
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Visibility */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5" />
          {language === 'fr' ? 'Visibilité' : language === 'de' ? 'Sichtbarkeit' : 'Visibility'}
        </h3>
        <div className="space-y-3">
          <CheckboxField
            label={language === 'fr' ? 'Afficher dans le Header' : language === 'de' ? 'Im Header anzeigen' : 'Show in Header'}
            checked={currentVisibility.showInHeader}
            onChange={(value) => handleVisibilityChange('showInHeader', value)}
          />
          <CheckboxField
            label={language === 'fr' ? 'Afficher dans le Footer' : language === 'de' ? 'Im Footer anzeigen' : 'Show in Footer'}
            checked={currentVisibility.showInFooter}
            onChange={(value) => handleVisibilityChange('showInFooter', value)}
          />
          <CheckboxField
            label={language === 'fr' ? 'Afficher sur la page d\'accueil' : language === 'de' ? 'Auf der Startseite anzeigen' : 'Show on Homepage'}
            checked={currentVisibility.showInHomepage}
            onChange={(value) => handleVisibilityChange('showInHomepage', value)}
          />
          <CheckboxField
            label={language === 'fr' ? 'Inclure dans la recherche' : language === 'de' ? 'In Suche einbeziehen' : 'Include in Search'}
            checked={currentVisibility.showInSearch}
            onChange={(value) => handleVisibilityChange('showInSearch', value)}
          />
          <CheckboxField
            label={language === 'fr' ? 'Authentification requise' : language === 'de' ? 'Authentifizierung erforderlich' : 'Requires Authentication'}
            checked={currentVisibility.requiresAuth}
            onChange={(value) => handleVisibilityChange('requiresAuth', value)}
          />
        </div>
      </div>

      {/* Display */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          {language === 'fr' ? 'Affichage' : language === 'de' ? 'Anzeige' : 'Display'}
        </h3>
        <div className="space-y-4">
          <CheckboxField
            label={language === 'fr' ? 'Section mise en avant' : language === 'de' ? 'Featured Abschnitt' : 'Featured Section'}
            checked={currentDisplay.featured}
            onChange={(value) => handleDisplayChange('featured', value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'Ordre d\'affichage' : language === 'de' ? 'Anzeigereihenfolge' : 'Display Order'}
            </label>
            <input
              type="number"
              value={currentDisplay.order}
              onChange={(e) => handleDisplayChange('order', parseInt(e.target.value))}
              className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturesTab({ config, formData, setFormData, language }: TabProps) {
  const handleFeatureChange = (field: string, value: boolean) => {
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [field]: value,
      },
    });
  };

  const currentFeatures = { ...config.features, ...formData.features };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Sliders className="w-5 h-5" />
        {language === 'fr' ? 'Fonctionnalités Activées' : language === 'de' ? 'Aktivierte Funktionen' : 'Enabled Features'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CheckboxField
          label={language === 'fr' ? 'Commentaires' : language === 'de' ? 'Kommentare' : 'Comments'}
          checked={currentFeatures.enableComments}
          onChange={(value) => handleFeatureChange('enableComments', value)}
        />
        <CheckboxField
          label={language === 'fr' ? 'Votes' : language === 'de' ? 'Abstimmungen' : 'Voting'}
          checked={currentFeatures.enableVoting}
          onChange={(value) => handleFeatureChange('enableVoting', value)}
        />
        <CheckboxField
          label={language === 'fr' ? 'Partage' : language === 'de' ? 'Teilen' : 'Sharing'}
          checked={currentFeatures.enableSharing}
          onChange={(value) => handleFeatureChange('enableSharing', value)}
        />
        <CheckboxField
          label={language === 'fr' ? 'Notifications' : language === 'de' ? 'Benachrichtigungen' : 'Notifications'}
          checked={currentFeatures.enableNotifications}
          onChange={(value) => handleFeatureChange('enableNotifications', value)}
        />
        <CheckboxField
          label={language === 'fr' ? 'Analyse' : language === 'de' ? 'Analytik' : 'Analytics'}
          checked={currentFeatures.enableAnalytics}
          onChange={(value) => handleFeatureChange('enableAnalytics', value)}
        />
        <CheckboxField
          label={language === 'fr' ? 'Modération' : language === 'de' ? 'Moderation' : 'Moderation'}
          checked={currentFeatures.enableModeration}
          onChange={(value) => handleFeatureChange('enableModeration', value)}
        />
        <CheckboxField
          label={language === 'fr' ? 'Export' : language === 'de' ? 'Export' : 'Export'}
          checked={currentFeatures.enableExport}
          onChange={(value) => handleFeatureChange('enableExport', value)}
        />
      </div>
    </div>
  );
}

function AccessTab({ config, formData, setFormData, language }: TabProps) {
  const currentAccessControl = { ...config.accessControl, ...formData.accessControl };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        {language === 'fr' ? 'Contrôle d\'Accès' : language === 'de' ? 'Zugriffskontrolle' : 'Access Control'}
      </h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="text-sm text-blue-900">
          {language === 'fr' ? 'Configurez qui peut accéder à cette section et sous quelles conditions.' :
           language === 'de' ? 'Konfigurieren Sie, wer auf diesen Abschnitt zugreifen kann und unter welchen Bedingungen.' :
           'Configure who can access this section and under what conditions.'}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'fr' ? 'Rôles autorisés' : language === 'de' ? 'Erlaubte Rollen' : 'Allowed Roles'}
        </label>
        <div className="text-sm text-gray-600 mb-2">
          {currentAccessControl.allowedRoles.join(', ')}
        </div>
      </div>

      <CheckboxField
        label={language === 'fr' ? 'Restriction géographique' : language === 'de' ? 'Geografische Einschränkung' : 'Geographic Restriction'}
        checked={currentAccessControl.geoRestricted}
        onChange={(value) => setFormData({
          ...formData,
          accessControl: {
            ...formData.accessControl,
            geoRestricted: value,
          },
        })}
      />
    </div>
  );
}

interface StatsTabProps {
  stats: any;
  language: 'fr' | 'de' | 'en';
}

function StatsTab({ stats, language }: StatsTabProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <BarChart className="w-5 h-5" />
        {language === 'fr' ? 'Statistiques' : language === 'de' ? 'Statistiken' : 'Statistics'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title={language === 'fr' ? 'Items Totaux' : language === 'de' ? 'Gesamt' : 'Total Items'}
          value={stats.totalItems}
          subtitle={`${stats.activeItems} ${language === 'fr' ? 'actifs' : language === 'de' ? 'aktiv' : 'active'}`}
        />
        <StatCard
          title={language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}
          value={stats.totalParticipants.toLocaleString()}
        />
        <StatCard
          title={language === 'fr' ? 'Vues' : language === 'de' ? 'Ansichten' : 'Views'}
          value={stats.totalViews.toLocaleString()}
        />
        <StatCard
          title={language === 'fr' ? 'Interactions' : language === 'de' ? 'Interaktionen' : 'Interactions'}
          value={stats.totalInteractions.toLocaleString()}
        />
        <StatCard
          title={language === 'fr' ? 'Vues (7j)' : language === 'de' ? 'Ansichten (7T)' : 'Views (7d)'}
          value={stats.last7Days.views.toLocaleString()}
        />
        <StatCard
          title={language === 'fr' ? 'Interactions (7j)' : language === 'de' ? 'Interaktionen (7T)' : 'Interactions (7d)'}
          value={stats.last7Days.interactions.toLocaleString()}
        />
      </div>
    </div>
  );
}

// ==================== Helper Components ====================

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function CheckboxField({ label, checked, onChange }: CheckboxFieldProps) {
  return (
    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 rounded"
      />
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </label>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}