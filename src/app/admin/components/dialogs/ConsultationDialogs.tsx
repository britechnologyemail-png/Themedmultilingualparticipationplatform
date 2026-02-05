/**
 * Consultation Creation Dialog
 * 
 * Dialog for creating new consultations with full multilingual support
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { X, Loader2, Calendar, MapPin, Users, Globe, FileText, Plus, Trash2 } from 'lucide-react';
import { LocalizedString, ConsultationType, ConsultationPhaseDTO } from '../../../types';
import { toast } from 'sonner';

interface CreateConsultationData {
  title: LocalizedString;
  description: LocalizedString;
  themeId: string;
  type: ConsultationType;
  startDate: string;
  endDate: string;
  location?: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
  };
  isOnline: boolean;
  onlineLink?: string;
  capacity?: number;
  tags: string[];
}

interface ConsultationDialogsProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: CreateConsultationData) => void;
  themes?: { id: string; name: LocalizedString }[];
}

export function CreateConsultationDialog({ isOpen, onClose, onSuccess, themes = [] }: ConsultationDialogsProps) {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<CreateConsultationData>({
    title: { fr: '', de: '', en: '' },
    description: { fr: '', de: '', en: '' },
    themeId: '',
    type: 'public_meeting',
    startDate: '',
    endDate: '',
    isOnline: false,
    tags: [],
  });

  const [currentTag, setCurrentTag] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title.fr || !formData.title.de || !formData.title.en) {
        throw new Error(
          language === 'fr' ? 'Le titre est requis dans toutes les langues' :
          language === 'de' ? 'Der Titel ist in allen Sprachen erforderlich' :
          'Title is required in all languages'
        );
      }

      if (!formData.themeId) {
        throw new Error(
          language === 'fr' ? 'Veuillez sélectionner un thème' :
          language === 'de' ? 'Bitte wählen Sie ein Thema' :
          'Please select a theme'
        );
      }

      if (!formData.startDate || !formData.endDate) {
        throw new Error(
          language === 'fr' ? 'Les dates de début et de fin sont requises' :
          language === 'de' ? 'Start- und Enddatum sind erforderlich' :
          'Start and end dates are required'
        );
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(
        language === 'fr' ? 'Concertation créée avec succès' :
        language === 'de' ? 'Beratung erfolgreich erstellt' :
        'Consultation created successfully'
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
      type: 'public_meeting',
      startDate: '',
      endDate: '',
      isOnline: false,
      tags: [],
    });
    setCurrentStep(1);
    setCurrentTag('');
    onClose();
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const consultationTypes: { value: ConsultationType; label: Record<'fr' | 'de' | 'en', string> }[] = [
    { value: 'public_meeting', label: { fr: 'Réunion publique', de: 'Öffentliche Versammlung', en: 'Public Meeting' } },
    { value: 'online_debate', label: { fr: 'Débat en ligne', de: 'Online-Debatte', en: 'Online Debate' } },
    { value: 'citizen_proposal', label: { fr: 'Proposition citoyenne', de: 'Bürgervorschlag', en: 'Citizen Proposal' } },
    { value: 'expert_hearing', label: { fr: 'Audition d\'experts', de: 'Expertenanhörung', en: 'Expert Hearing' } },
    { value: 'workshop', label: { fr: 'Atelier', de: 'Workshop', en: 'Workshop' } },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {language === 'fr' ? 'Nouvelle Concertation' :
               language === 'de' ? 'Neue Beratung' :
               'New Consultation'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {language === 'fr' ? 'Créez une nouvelle concertation publique' :
               language === 'de' ? 'Erstellen Sie eine neue öffentliche Beratung' :
               'Create a new public consultation'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Steps Indicator */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <StepIndicator
              step={1}
              currentStep={currentStep}
              label={language === 'fr' ? 'Infos' : language === 'de' ? 'Info' : 'Info'}
            />
            <div className="flex-1 h-0.5 bg-gray-300 mx-2" />
            <StepIndicator
              step={2}
              currentStep={currentStep}
              label={language === 'fr' ? 'Détails' : language === 'de' ? 'Details' : 'Details'}
            />
            <div className="flex-1 h-0.5 bg-gray-300 mx-2" />
            <StepIndicator
              step={3}
              currentStep={currentStep}
              label={language === 'fr' ? 'Lieu' : language === 'de' ? 'Ort' : 'Location'}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
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
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      title: { ...prev.title, fr: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Deutsch"
                    value={formData.title.de}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      title: { ...prev.title, de: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="English"
                    value={formData.title.en}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      title: { ...prev.title, en: e.target.value }
                    }))}
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
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      description: { ...prev.description, fr: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <textarea
                    placeholder="Deutsch"
                    value={formData.description.de}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      description: { ...prev.description, de: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <textarea
                    placeholder="English"
                    value={formData.description.en}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      description: { ...prev.description, en: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Theme Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Thème' :
                   language === 'de' ? 'Thema' :
                   'Theme'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={formData.themeId}
                  onChange={(e) => setFormData(prev => ({ ...prev, themeId: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">
                    {language === 'fr' ? 'Sélectionner un thème' :
                     language === 'de' ? 'Thema auswählen' :
                     'Select a theme'}
                  </option>
                  {themes.map(theme => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name[language]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Consultation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Type de concertation' :
                   language === 'de' ? 'Beratungstyp' :
                   'Consultation Type'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as ConsultationType }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {consultationTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label[language]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Dates and Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    {language === 'fr' ? 'Date de début' :
                     language === 'de' ? 'Startdatum' :
                     'Start Date'}
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
                    {language === 'fr' ? 'Date de fin' :
                     language === 'de' ? 'Enddatum' :
                     'End Date'}
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

              {/* Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  {language === 'fr' ? 'Capacité (optionnel)' :
                   language === 'de' ? 'Kapazität (optional)' :
                   'Capacity (optional)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.capacity || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value ? parseInt(e.target.value) : undefined }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'fr' ? 'Nombre de participants maximum' : language === 'de' ? 'Maximale Teilnehmerzahl' : 'Maximum number of participants'}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Mots-clés' :
                   language === 'de' ? 'Schlagwörter' :
                   'Tags'}
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'fr' ? 'Ajouter un mot-clé' : language === 'de' ? 'Schlagwort hinzufügen' : 'Add a tag'}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-blue-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Online/Offline Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isOnline"
                  checked={formData.isOnline}
                  onChange={(e) => setFormData(prev => ({ ...prev, isOnline: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isOnline" className="text-sm font-medium text-gray-700">
                  <Globe className="w-4 h-4 inline mr-2" />
                  {language === 'fr' ? 'Événement en ligne' :
                   language === 'de' ? 'Online-Veranstaltung' :
                   'Online Event'}
                </label>
              </div>

              {/* Online Link */}
              {formData.isOnline && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Lien de l\'événement en ligne' :
                     language === 'de' ? 'Link zur Online-Veranstaltung' :
                     'Online Event Link'}
                  </label>
                  <input
                    type="url"
                    value={formData.onlineLink || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, onlineLink: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
              )}

              {/* Physical Location */}
              {!formData.isOnline && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      {language === 'fr' ? 'Nom du lieu' :
                       language === 'de' ? 'Name des Ortes' :
                       'Venue Name'}
                    </label>
                    <input
                      type="text"
                      value={formData.location?.name || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        location: { ...prev.location, name: e.target.value } as any
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'fr' ? 'Adresse' :
                       language === 'de' ? 'Adresse' :
                       'Address'}
                    </label>
                    <input
                      type="text"
                      value={formData.location?.address || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        location: { ...prev.location, address: e.target.value } as any
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'fr' ? 'Ville' :
                         language === 'de' ? 'Stadt' :
                         'City'}
                      </label>
                      <input
                        type="text"
                        value={formData.location?.city || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          location: { ...prev.location, city: e.target.value } as any
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'fr' ? 'Code postal' :
                         language === 'de' ? 'Postleitzahl' :
                         'Postal Code'}
                      </label>
                      <input
                        type="text"
                        value={formData.location?.postalCode || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          location: { ...prev.location, postalCode: e.target.value } as any
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  disabled={isSubmitting}
                >
                  {language === 'fr' ? 'Précédent' :
                   language === 'de' ? 'Zurück' :
                   'Previous'}
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isSubmitting}
              >
                {language === 'fr' ? 'Annuler' :
                 language === 'de' ? 'Abbrechen' :
                 'Cancel'}
              </button>
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={isSubmitting}
                >
                  {language === 'fr' ? 'Suivant' :
                   language === 'de' ? 'Weiter' :
                   'Next'}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {language === 'fr' ? 'Créer la concertation' :
                   language === 'de' ? 'Beratung erstellen' :
                   'Create Consultation'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Step Indicator Component
interface StepIndicatorProps {
  step: number;
  currentStep: number;
  label: string;
}

function StepIndicator({ step, currentStep, label }: StepIndicatorProps) {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : isCompleted
          ? 'bg-green-600 text-white'
          : 'bg-gray-200 text-gray-600'
      }`}>
        {step}
      </div>
      <span className={`text-xs mt-1 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
        {label}
      </span>
    </div>
  );
}
