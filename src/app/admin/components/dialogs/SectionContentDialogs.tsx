/**
 * Section Content Creation Dialogs
 * 
 * Dialogs for creating new content in various sections:
 * - Assemblies, Petitions, Conferences, Votes
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { X, Loader2, Calendar, Users, FileText, Target, Vote as VoteIcon, Video } from 'lucide-react';
import { 
  LocalizedString, 
  AssemblyType,
  VoteType,
  VotingMethod,
  ConferenceStatus 
} from '../../../types';
import { toast } from 'sonner';

// ==================== Assembly Dialog ====================

interface CreateAssemblyData {
  name: LocalizedString;
  description: LocalizedString;
  themeId: string;
  type: AssemblyType;
  foundedDate: string;
}

interface CreateAssemblyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: CreateAssemblyData) => void;
  themes?: { id: string; name: LocalizedString }[];
}

export function CreateAssemblyDialog({ isOpen, onClose, onSuccess, themes = [] }: CreateAssemblyDialogProps) {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateAssemblyData>({
    name: { fr: '', de: '', en: '' },
    description: { fr: '', de: '', en: '' },
    themeId: '',
    type: 'citizens_council',
    foundedDate: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name.fr || !formData.name.de || !formData.name.en) {
        throw new Error(
          language === 'fr' ? 'Le nom est requis dans toutes les langues' :
          language === 'de' ? 'Der Name ist in allen Sprachen erforderlich' :
          'Name is required in all languages'
        );
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(
        language === 'fr' ? 'Assemblée créée avec succès' :
        language === 'de' ? 'Versammlung erfolgreich erstellt' :
        'Assembly created successfully'
      );

      if (onSuccess) {
        onSuccess(formData);
      }

      handleClose();
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: { fr: '', de: '', en: '' },
      description: { fr: '', de: '', en: '' },
      themeId: '',
      type: 'citizens_council',
      foundedDate: '',
    });
    onClose();
  };

  const assemblyTypes: { value: AssemblyType; label: Record<'fr' | 'de' | 'en', string> }[] = [
    { value: 'citizens_council', label: { fr: 'Conseil citoyen', de: 'Bürgerrat', en: 'Citizens Council' } },
    { value: 'youth_assembly', label: { fr: 'Assemblée jeunesse', de: 'Jugendversammlung', en: 'Youth Assembly' } },
    { value: 'expert_committee', label: { fr: 'Comité d\'experts', de: 'Expertenausschuss', en: 'Expert Committee' } },
    { value: 'working_group', label: { fr: 'Groupe de travail', de: 'Arbeitsgruppe', en: 'Working Group' } },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              <Users className="w-6 h-6 inline mr-2 text-blue-600" />
              {language === 'fr' ? 'Nouvelle Assemblée' :
               language === 'de' ? 'Neue Versammlung' :
               'New Assembly'}
            </h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Multilingual Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Nom (multilingue)' :
               language === 'de' ? 'Name (mehrsprachig)' :
               'Name (multilingual)'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Français"
                value={formData.name.fr}
                onChange={(e) => setFormData(prev => ({ ...prev, name: { ...prev.name, fr: e.target.value } }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Deutsch"
                value={formData.name.de}
                onChange={(e) => setFormData(prev => ({ ...prev, name: { ...prev.name, de: e.target.value } }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="English"
                value={formData.name.en}
                onChange={(e) => setFormData(prev => ({ ...prev, name: { ...prev.name, en: e.target.value } }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Multilingual Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Description (multilingue)' :
               language === 'de' ? 'Beschreibung (mehrsprachig)' :
               'Description (multilingual)'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="space-y-3">
              <textarea
                placeholder="Français"
                value={formData.description.fr}
                onChange={(e) => setFormData(prev => ({ ...prev, description: { ...prev.description, fr: e.target.value } }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <textarea
                placeholder="Deutsch"
                value={formData.description.de}
                onChange={(e) => setFormData(prev => ({ ...prev, description: { ...prev.description, de: e.target.value } }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <textarea
                placeholder="English"
                value={formData.description.en}
                onChange={(e) => setFormData(prev => ({ ...prev, description: { ...prev.description, en: e.target.value } }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'Thème' : language === 'de' ? 'Thema' : 'Theme'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.themeId}
              onChange={(e) => setFormData(prev => ({ ...prev, themeId: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">{language === 'fr' ? 'Sélectionner' : language === 'de' ? 'Auswählen' : 'Select'}</option>
              {themes.map(theme => (
                <option key={theme.id} value={theme.id}>{theme.name[language]}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'Type d\'assemblée' : language === 'de' ? 'Versammlungstyp' : 'Assembly Type'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as AssemblyType }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {assemblyTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label[language]}</option>
              ))}
            </select>
          </div>

          {/* Founded Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              {language === 'fr' ? 'Date de création' : language === 'de' ? 'Gründungsdatum' : 'Founded Date'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              value={formData.foundedDate}
              onChange={(e) => setFormData(prev => ({ ...prev, foundedDate: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {language === 'fr' ? 'Créer' : language === 'de' ? 'Erstellen' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==================== Petition Dialog ====================

interface CreatePetitionData {
  title: LocalizedString;
  description: LocalizedString;
  content: LocalizedString;
  themeId: string;
  targetSignatures: number;
  startDate: string;
  endDate: string;
}

interface CreatePetitionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: CreatePetitionData) => void;
  themes?: { id: string; name: LocalizedString }[];
}

export function CreatePetitionDialog({ isOpen, onClose, onSuccess, themes = [] }: CreatePetitionDialogProps) {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreatePetitionData>({
    title: { fr: '', de: '', en: '' },
    description: { fr: '', de: '', en: '' },
    content: { fr: '', de: '', en: '' },
    themeId: '',
    targetSignatures: 1000,
    startDate: '',
    endDate: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.title.fr || !formData.title.de || !formData.title.en) {
        throw new Error(
          language === 'fr' ? 'Le titre est requis dans toutes les langues' :
          language === 'de' ? 'Der Titel ist in allen Sprachen erforderlich' :
          'Title is required in all languages'
        );
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(
        language === 'fr' ? 'Pétition créée avec succès' :
        language === 'de' ? 'Petition erfolgreich erstellt' :
        'Petition created successfully'
      );

      if (onSuccess) {
        onSuccess(formData);
      }

      handleClose();
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: { fr: '', de: '', en: '' },
      description: { fr: '', de: '', en: '' },
      content: { fr: '', de: '', en: '' },
      themeId: '',
      targetSignatures: 1000,
      startDate: '',
      endDate: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              <FileText className="w-6 h-6 inline mr-2 text-blue-600" />
              {language === 'fr' ? 'Nouvelle Pétition' :
               language === 'de' ? 'Neue Petition' :
               'New Petition'}
            </h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Multilingual Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Titre (multilingue)' :
               language === 'de' ? 'Titel (mehrsprachig)' :
               'Title (multilingual)'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Français"
                value={formData.title.fr}
                onChange={(e) => setFormData(prev => ({ ...prev, title: { ...prev.title, fr: e.target.value } }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Deutsch"
                value={formData.title.de}
                onChange={(e) => setFormData(prev => ({ ...prev, title: { ...prev.title, de: e.target.value } }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="English"
                value={formData.title.en}
                onChange={(e) => setFormData(prev => ({ ...prev, title: { ...prev.title, en: e.target.value } }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Multilingual Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Description courte (multilingue)' :
               language === 'de' ? 'Kurzbeschreibung (mehrsprachig)' :
               'Short Description (multilingual)'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="space-y-3">
              {(['fr', 'de', 'en'] as const).map(lang => (
                <textarea
                  key={lang}
                  placeholder={lang === 'fr' ? 'Français' : lang === 'de' ? 'Deutsch' : 'English'}
                  value={formData.description[lang]}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: { ...prev.description, [lang]: e.target.value } }))}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              ))}
            </div>
          </div>

          {/* Multilingual Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Contenu détaillé (multilingue)' :
               language === 'de' ? 'Detaillierter Inhalt (mehrsprachig)' :
               'Detailed Content (multilingual)'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="space-y-3">
              {(['fr', 'de', 'en'] as const).map(lang => (
                <textarea
                  key={lang}
                  placeholder={lang === 'fr' ? 'Français' : lang === 'de' ? 'Deutsch' : 'English'}
                  value={formData.content[lang]}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: { ...prev.content, [lang]: e.target.value } }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              ))}
            </div>
          </div>

          {/* Theme and Target */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Thème' : language === 'de' ? 'Thema' : 'Theme'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                value={formData.themeId}
                onChange={(e) => setFormData(prev => ({ ...prev, themeId: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">{language === 'fr' ? 'Sélectionner' : language === 'de' ? 'Auswählen' : 'Select'}</option>
                {themes.map(theme => (
                  <option key={theme.id} value={theme.id}>{theme.name[language]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4 inline mr-2" />
                {language === 'fr' ? 'Objectif de signatures' : language === 'de' ? 'Unterschriftenziel' : 'Signature Target'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={formData.targetSignatures}
                onChange={(e) => setFormData(prev => ({ ...prev, targetSignatures: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                {language === 'fr' ? 'Date de début' : language === 'de' ? 'Startdatum' : 'Start Date'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                {language === 'fr' ? 'Date de fin' : language === 'de' ? 'Enddatum' : 'End Date'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {language === 'fr' ? 'Créer' : language === 'de' ? 'Erstellen' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==================== Conference Dialog ====================

interface CreateConferenceData {
  title: LocalizedString;
  description: LocalizedString;
  themeId: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
  };
  isHybrid: boolean;
  onlineLink?: string;
  capacity: number;
  registrationDeadline: string;
}

interface CreateConferenceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: CreateConferenceData) => void;
  themes?: { id: string; name: LocalizedString }[];
}

export function CreateConferenceDialog({ isOpen, onClose, onSuccess, themes = [] }: CreateConferenceDialogProps) {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateConferenceData>({
    title: { fr: '', de: '', en: '' },
    description: { fr: '', de: '', en: '' },
    themeId: '',
    startDate: '',
    endDate: '',
    location: {
      name: '',
      address: '',
      city: '',
      postalCode: '',
    },
    isHybrid: false,
    capacity: 100,
    registrationDeadline: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.title.fr || !formData.title.de || !formData.title.en) {
        throw new Error(
          language === 'fr' ? 'Le titre est requis dans toutes les langues' :
          language === 'de' ? 'Der Titel ist in allen Sprachen erforderlich' :
          'Title is required in all languages'
        );
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(
        language === 'fr' ? 'Conférence créée avec succès' :
        language === 'de' ? 'Konferenz erfolgreich erstellt' :
        'Conference created successfully'
      );

      if (onSuccess) {
        onSuccess(formData);
      }

      handleClose();
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: { fr: '', de: '', en: '' },
      description: { fr: '', de: '', en: '' },
      themeId: '',
      startDate: '',
      endDate: '',
      location: {
        name: '',
        address: '',
        city: '',
        postalCode: '',
      },
      isHybrid: false,
      capacity: 100,
      registrationDeadline: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              <Video className="w-6 h-6 inline mr-2 text-blue-600" />
              {language === 'fr' ? 'Nouvelle Conférence' :
               language === 'de' ? 'Neue Konferenz' :
               'New Conference'}
            </h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Multilingual Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Titre (multilingue)' :
               language === 'de' ? 'Titel (mehrsprachig)' :
               'Title (multilingual)'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="space-y-3">
              {(['fr', 'de', 'en'] as const).map(lang => (
                <input
                  key={lang}
                  type="text"
                  placeholder={lang === 'fr' ? 'Français' : lang === 'de' ? 'Deutsch' : 'English'}
                  value={formData.title[lang]}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: { ...prev.title, [lang]: e.target.value } }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              ))}
            </div>
          </div>

          {/* Multilingual Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Description (multilingue)' :
               language === 'de' ? 'Beschreibung (mehrsprachig)' :
               'Description (multilingual)'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="space-y-3">
              {(['fr', 'de', 'en'] as const).map(lang => (
                <textarea
                  key={lang}
                  placeholder={lang === 'fr' ? 'Français' : lang === 'de' ? 'Deutsch' : 'English'}
                  value={formData.description[lang]}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: { ...prev.description, [lang]: e.target.value } }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              ))}
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'Thème' : language === 'de' ? 'Thema' : 'Theme'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.themeId}
              onChange={(e) => setFormData(prev => ({ ...prev, themeId: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">{language === 'fr' ? 'Sélectionner' : language === 'de' ? 'Auswählen' : 'Select'}</option>
              {themes.map(theme => (
                <option key={theme.id} value={theme.id}>{theme.name[language]}</option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                {language === 'fr' ? 'Date de début' : language === 'de' ? 'Startdatum' : 'Start Date'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                {language === 'fr' ? 'Date de fin' : language === 'de' ? 'Enddatum' : 'End Date'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Capacity and Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                {language === 'fr' ? 'Capacité' : language === 'de' ? 'Kapazität' : 'Capacity'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Date limite d\'inscription' : language === 'de' ? 'Anmeldefrist' : 'Registration Deadline'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                value={formData.registrationDeadline}
                onChange={(e) => setFormData(prev => ({ ...prev, registrationDeadline: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Hybrid checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isHybrid"
              checked={formData.isHybrid}
              onChange={(e) => setFormData(prev => ({ ...prev, isHybrid: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isHybrid" className="text-sm font-medium text-gray-700">
              {language === 'fr' ? 'Événement hybride (en ligne et présentiel)' :
               language === 'de' ? 'Hybride Veranstaltung (online und vor Ort)' :
               'Hybrid event (online and in-person)'}
            </label>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {language === 'fr' ? 'Créer' : language === 'de' ? 'Erstellen' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==================== Vote Dialog ====================

interface CreateVoteData {
  title: LocalizedString;
  description: LocalizedString;
  question: LocalizedString;
  themeId: string;
  type: VoteType;
  votingMethod: VotingMethod;
  startDate: string;
  endDate: string;
  isAnonymous: boolean;
  allowAbstention: boolean;
}

interface CreateVoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: CreateVoteData) => void;
  themes?: { id: string; name: LocalizedString }[];
}

export function CreateVoteDialog({ isOpen, onClose, onSuccess, themes = [] }: CreateVoteDialogProps) {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateVoteData>({
    title: { fr: '', de: '', en: '' },
    description: { fr: '', de: '', en: '' },
    question: { fr: '', de: '', en: '' },
    themeId: '',
    type: 'referendum',
    votingMethod: 'single_choice',
    startDate: '',
    endDate: '',
    isAnonymous: true,
    allowAbstention: true,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.title.fr || !formData.title.de || !formData.title.en) {
        throw new Error(
          language === 'fr' ? 'Le titre est requis dans toutes les langues' :
          language === 'de' ? 'Der Titel ist in allen Sprachen erforderlich' :
          'Title is required in all languages'
        );
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(
        language === 'fr' ? 'Vote créé avec succès' :
        language === 'de' ? 'Abstimmung erfolgreich erstellt' :
        'Vote created successfully'
      );

      if (onSuccess) {
        onSuccess(formData);
      }

      handleClose();
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: { fr: '', de: '', en: '' },
      description: { fr: '', de: '', en: '' },
      question: { fr: '', de: '', en: '' },
      themeId: '',
      type: 'referendum',
      votingMethod: 'single_choice',
      startDate: '',
      endDate: '',
      isAnonymous: true,
      allowAbstention: true,
    });
    onClose();
  };

  const voteTypes: { value: VoteType; label: Record<'fr' | 'de' | 'en', string> }[] = [
    { value: 'referendum', label: { fr: 'Référendum', de: 'Referendum', en: 'Referendum' } },
    { value: 'consultation', label: { fr: 'Consultation', de: 'Konsultation', en: 'Consultation' } },
    { value: 'poll', label: { fr: 'Sondage', de: 'Umfrage', en: 'Poll' } },
    { value: 'election', label: { fr: 'Élection', de: 'Wahl', en: 'Election' } },
  ];

  const votingMethods: { value: VotingMethod; label: Record<'fr' | 'de' | 'en', string> }[] = [
    { value: 'single_choice', label: { fr: 'Choix unique', de: 'Einzelwahl', en: 'Single Choice' } },
    { value: 'multiple_choice', label: { fr: 'Choix multiple', de: 'Mehrfachwahl', en: 'Multiple Choice' } },
    { value: 'ranked_choice', label: { fr: 'Vote classé', de: 'Rangwahl', en: 'Ranked Choice' } },
    { value: 'approval', label: { fr: 'Vote d\'approbation', de: 'Zustimmungswahl', en: 'Approval Voting' } },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              <VoteIcon className="w-6 h-6 inline mr-2 text-blue-600" />
              {language === 'fr' ? 'Nouveau Vote' :
               language === 'de' ? 'Neue Abstimmung' :
               'New Vote'}
            </h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Multilingual Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Titre (multilingue)' :
               language === 'de' ? 'Titel (mehrsprachig)' :
               'Title (multilingual)'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="space-y-3">
              {(['fr', 'de', 'en'] as const).map(lang => (
                <input
                  key={lang}
                  type="text"
                  placeholder={lang === 'fr' ? 'Français' : lang === 'de' ? 'Deutsch' : 'English'}
                  value={formData.title[lang]}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: { ...prev.title, [lang]: e.target.value } }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              ))}
            </div>
          </div>

          {/* Multilingual Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Question (multilingue)' :
               language === 'de' ? 'Frage (mehrsprachig)' :
               'Question (multilingual)'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="space-y-3">
              {(['fr', 'de', 'en'] as const).map(lang => (
                <input
                  key={lang}
                  type="text"
                  placeholder={lang === 'fr' ? 'Français' : lang === 'de' ? 'Deutsch' : 'English'}
                  value={formData.question[lang]}
                  onChange={(e) => setFormData(prev => ({ ...prev, question: { ...prev.question, [lang]: e.target.value } }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              ))}
            </div>
          </div>

          {/* Theme, Type, Method */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Thème' : language === 'de' ? 'Thema' : 'Theme'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                value={formData.themeId}
                onChange={(e) => setFormData(prev => ({ ...prev, themeId: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">{language === 'fr' ? 'Sélectionner' : language === 'de' ? 'Auswählen' : 'Select'}</option>
                {themes.map(theme => (
                  <option key={theme.id} value={theme.id}>{theme.name[language]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as VoteType }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {voteTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label[language]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Méthode' : language === 'de' ? 'Methode' : 'Method'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                value={formData.votingMethod}
                onChange={(e) => setFormData(prev => ({ ...prev, votingMethod: e.target.value as VotingMethod }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {votingMethods.map(method => (
                  <option key={method.value} value={method.value}>{method.label[language]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                {language === 'fr' ? 'Date de début' : language === 'de' ? 'Startdatum' : 'Start Date'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                {language === 'fr' ? 'Date de fin' : language === 'de' ? 'Enddatum' : 'End Date'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isAnonymous"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isAnonymous" className="text-sm font-medium text-gray-700">
                {language === 'fr' ? 'Vote anonyme' :
                 language === 'de' ? 'Anonyme Abstimmung' :
                 'Anonymous voting'}
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="allowAbstention"
                checked={formData.allowAbstention}
                onChange={(e) => setFormData(prev => ({ ...prev, allowAbstention: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="allowAbstention" className="text-sm font-medium text-gray-700">
                {language === 'fr' ? 'Permettre l\'abstention' :
                 language === 'de' ? 'Enthaltung zulassen' :
                 'Allow abstention'}
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {language === 'fr' ? 'Créer' : language === 'de' ? 'Erstellen' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}