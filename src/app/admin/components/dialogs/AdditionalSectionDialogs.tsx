/**
 * Additional Section Creation Dialogs
 * 
 * Dialogs for creating:
 * - Signalements, Youth Polls (with Questions, Answers & Points)
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { X, Loader2, AlertCircle, Sparkles, MapPin, Plus, Trash2, GripVertical, AlertTriangle, Check, ChevronUp, ChevronDown } from 'lucide-react';
import {
  LocalizedString,
  SignalementCategory,
  YouthPollQuestionType,
  YouthPollTargetAge,
} from '../../../types';
import { toast } from 'sonner';

// ==================== Signalement Dialog ====================

interface CreateSignalementData {
  title: LocalizedString;
  description: LocalizedString;
  category: SignalementCategory;
  themeId: string;
  location: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

interface CreateSignalementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: CreateSignalementData) => void;
  themes?: { id: string; name: LocalizedString }[];
}

export function CreateSignalementDialog({ isOpen, onClose, onSuccess, themes = [] }: CreateSignalementDialogProps) {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateSignalementData>({
    title: { fr: '', de: '', en: '' },
    description: { fr: '', de: '', en: '' },
    category: 'infrastructure',
    themeId: '',
    location: {
      name: '',
      address: '',
      city: '',
      postalCode: '',
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
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
        language === 'fr' ? 'Signalement créé avec succès' :
        language === 'de' ? 'Meldung erfolgreich erstellt' :
        'Report created successfully'
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
      category: 'infrastructure',
      themeId: '',
      location: {
        name: '',
        address: '',
        city: '',
        postalCode: '',
        coordinates: { lat: 0, lng: 0 },
      },
    });
    onClose();
  };

  const categories: { value: SignalementCategory; label: Record<'fr' | 'de' | 'en', string> }[] = [
    { value: 'infrastructure', label: { fr: 'Infrastructure', de: 'Infrastruktur', en: 'Infrastructure' } },
    { value: 'cleanliness', label: { fr: 'Propreté', de: 'Sauberkeit', en: 'Cleanliness' } },
    { value: 'safety', label: { fr: 'Sécurité', de: 'Sicherheit', en: 'Safety' } },
    { value: 'environment', label: { fr: 'Environnement', de: 'Umwelt', en: 'Environment' } },
    { value: 'public_space', label: { fr: 'Espace public', de: 'Öffentlicher Raum', en: 'Public Space' } },
    { value: 'transport', label: { fr: 'Transport', de: 'Transport', en: 'Transport' } },
    { value: 'noise', label: { fr: 'Nuisances sonores', de: 'Lärm', en: 'Noise' } },
    { value: 'other', label: { fr: 'Autre', de: 'Sonstiges', en: 'Other' } },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              <AlertCircle className="w-6 h-6 inline mr-2 text-blue-600" />
              {language === 'fr' ? 'Nouveau Signalement' :
               language === 'de' ? 'Neue Meldung' :
               'New Report'}
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

          {/* Category and Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as SignalementCategory }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label[language]}</option>
                ))}
              </select>
            </div>
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
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {language === 'fr' ? 'Localisation' : language === 'de' ? 'Standort' : 'Location'}
              <span className="text-red-500">*</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Adresse' : language === 'de' ? 'Adresse' : 'Address'}
                </label>
                <input
                  type="text"
                  value={formData.location.address}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: { ...prev.location, address: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Ville' : language === 'de' ? 'Stadt' : 'City'}
                </label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: { ...prev.location, city: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
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

// ==================== Youth Poll Dialog (with Questions, Answers & Points) ====================

interface QuizAnswer {
  id: string;
  text: LocalizedString;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: string;
  question: LocalizedString;
  type: YouthPollQuestionType;
  points: number;
  answers: QuizAnswer[];
  required: boolean;
}

interface CreateYouthPollData {
  title: LocalizedString;
  description: LocalizedString;
  themeId: string;
  targetAge: YouthPollTargetAge;
  startDate: string;
  endDate: string;
  estimatedDuration: number;
  questions: QuizQuestion[];
}

interface CreateYouthPollDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: CreateYouthPollData) => void;
  themes?: { id: string; name: LocalizedString }[];
}

export function CreateYouthPollDialog({ isOpen, onClose, onSuccess, themes = [] }: CreateYouthPollDialogProps) {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateYouthPollData>({
    title: { fr: '', de: '', en: '' },
    description: { fr: '', de: '', en: '' },
    themeId: '',
    targetAge: 'all',
    startDate: '',
    endDate: '',
    estimatedDuration: 5,
    questions: [],
  });

  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  if (!isOpen) return null;

  // Generate unique ID
  const generateId = () => `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Add new question
  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: generateId(),
      question: { fr: '', de: '', en: '' },
      type: 'single_choice',
      points: 10,
      answers: [
        { id: generateId(), text: { fr: '', de: '', en: '' }, isCorrect: false },
        { id: generateId(), text: { fr: '', de: '', en: '' }, isCorrect: false },
      ],
      required: true,
    };
    setFormData(prev => ({ ...prev, questions: [...prev.questions, newQuestion] }));
    setExpandedQuestion(newQuestion.id);
  };

  // Remove question
  const removeQuestion = (questionId: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  // Move question up/down
  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    const newQuestions = [...formData.questions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newQuestions.length) return;
    
    [newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]];
    setFormData(prev => ({ ...prev, questions: newQuestions }));
  };

  // Update question field
  const updateQuestion = (questionId: string, field: keyof QuizQuestion, value: any) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  // Update question text in specific language
  const updateQuestionText = (questionId: string, lang: 'fr' | 'de' | 'en', value: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, question: { ...q.question, [lang]: value } } : q
      )
    }));
  };

  // Add answer to question
  const addAnswer = (questionId: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? {
          ...q,
          answers: [...q.answers, { id: generateId(), text: { fr: '', de: '', en: '' }, isCorrect: false }]
        } : q
      )
    }));
  };

  // Remove answer from question
  const removeAnswer = (questionId: string, answerId: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? {
          ...q,
          answers: q.answers.filter(a => a.id !== answerId)
        } : q
      )
    }));
  };

  // Update answer text
  const updateAnswerText = (questionId: string, answerId: string, lang: 'fr' | 'de' | 'en', value: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? {
          ...q,
          answers: q.answers.map(a => 
            a.id === answerId ? { ...a, text: { ...a.text, [lang]: value } } : a
          )
        } : q
      )
    }));
  };

  // Toggle answer correctness
  const toggleAnswerCorrect = (questionId: string, answerId: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          // For single_choice, only one answer can be correct
          if (q.type === 'single_choice') {
            return {
              ...q,
              answers: q.answers.map(a => ({
                ...a,
                isCorrect: a.id === answerId ? !a.isCorrect : false
              }))
            };
          } else {
            // For multiple_choice, toggle the selected answer
            return {
              ...q,
              answers: q.answers.map(a => 
                a.id === answerId ? { ...a, isCorrect: !a.isCorrect } : a
              )
            };
          }
        }
        return q;
      })
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate basic fields
      if (!formData.title.fr || !formData.title.de || !formData.title.en) {
        throw new Error(
          language === 'fr' ? 'Le titre est requis dans toutes les langues' :
          language === 'de' ? 'Der Titel ist in allen Sprachen erforderlich' :
          'Title is required in all languages'
        );
      }

      // Validate questions
      if (formData.questions.length === 0) {
        throw new Error(
          language === 'fr' ? 'Veuillez ajouter au moins une question' :
          language === 'de' ? 'Bitte fügen Sie mindestens eine Frage hinzu' :
          'Please add at least one question'
        );
      }

      // Validate each question
      for (let i = 0; i < formData.questions.length; i++) {
        const q = formData.questions[i];
        
        if (!q.question.fr || !q.question.de || !q.question.en) {
          throw new Error(
            language === 'fr' ? `Question ${i + 1} : Le texte est requis dans toutes les langues` :
            language === 'de' ? `Frage ${i + 1}: Der Text ist in allen Sprachen erforderlich` :
            `Question ${i + 1}: Text is required in all languages`
          );
        }

        if (q.answers.length < 2) {
          throw new Error(
            language === 'fr' ? `Question ${i + 1} : Au moins 2 réponses sont requises` :
            language === 'de' ? `Frage ${i + 1}: Mindestens 2 Antworten sind erforderlich` :
            `Question ${i + 1}: At least 2 answers are required`
          );
        }

        const hasCorrectAnswer = q.answers.some(a => a.isCorrect);
        if (!hasCorrectAnswer) {
          throw new Error(
            language === 'fr' ? `Question ${i + 1} : Au moins une réponse doit être marquée comme correcte` :
            language === 'de' ? `Frage ${i + 1}: Mindestens eine Antwort muss als richtig markiert werden` :
            `Question ${i + 1}: At least one answer must be marked as correct`
          );
        }

        // Validate answer texts
        for (let j = 0; j < q.answers.length; j++) {
          const a = q.answers[j];
          if (!a.text.fr || !a.text.de || !a.text.en) {
            throw new Error(
              language === 'fr' ? `Question ${i + 1}, Réponse ${j + 1} : Le texte est requis dans toutes les langues` :
              language === 'de' ? `Frage ${i + 1}, Antwort ${j + 1}: Der Text ist in allen Sprachen erforderlich` :
              `Question ${i + 1}, Answer ${j + 1}: Text is required in all languages`
            );
          }
        }

        if (q.points <= 0) {
          throw new Error(
            language === 'fr' ? `Question ${i + 1} : Les points doivent être supérieurs à 0` :
            language === 'de' ? `Frage ${i + 1}: Die Punkte müssen größer als 0 sein` :
            `Question ${i + 1}: Points must be greater than 0`
          );
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      const totalPoints = formData.questions.reduce((sum, q) => sum + q.points, 0);
      
      toast.success(
        language === 'fr' ? `Sondage créé avec succès ! ${formData.questions.length} questions • ${totalPoints} points totaux` :
        language === 'de' ? `Umfrage erfolgreich erstellt! ${formData.questions.length} Fragen • ${totalPoints} Gesamtpunkte` :
        `Poll created successfully! ${formData.questions.length} questions • ${totalPoints} total points`
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
      targetAge: 'all',
      startDate: '',
      endDate: '',
      estimatedDuration: 5,
      questions: [],
    });
    setExpandedQuestion(null);
    onClose();
  };

  const targetAges: { value: YouthPollTargetAge; label: string }[] = [
    { value: 'all', label: language === 'fr' ? 'Tous les âges' : language === 'de' ? 'Alle Altersgruppen' : 'All ages' },
    { value: '12-15', label: '12-15 ans / Jahre / years' },
    { value: '16-18', label: '16-18 ans / Jahre / years' },
    { value: '19-25', label: '19-25 ans / Jahre / years' },
  ];

  const questionTypes: { value: YouthPollQuestionType; label: Record<'fr' | 'de' | 'en', string> }[] = [
    { value: 'single_choice', label: { fr: 'Choix unique', de: 'Einzelauswahl', en: 'Single choice' } },
    { value: 'multiple_choice', label: { fr: 'Choix multiples', de: 'Mehrfachauswahl', en: 'Multiple choice' } },
  ];

  const totalPoints = formData.questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              <Sparkles className="w-6 h-6 inline mr-2 text-blue-600" />
              {language === 'fr' ? 'Nouveau Sondage Jeunesse' :
               language === 'de' ? 'Neue Jugendbefragung' :
               'New Youth Poll'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {language === 'fr' ? `${formData.questions.length} questions • ${totalPoints} points totaux` :
               language === 'de' ? `${formData.questions.length} Fragen • ${totalPoints} Gesamtpunkte` :
               `${formData.questions.length} questions • ${totalPoints} total points`}
            </p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              {language === 'fr' ? '📋 Informations générales' :
               language === 'de' ? '📋 Allgemeine Informationen' :
               '📋 General Information'}
            </h3>

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
                    placeholder={`${lang === 'fr' ? '🇫🇷 Français' : lang === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'}`}
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
                    placeholder={`${lang === 'fr' ? '🇫🇷 Français' : lang === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'}`}
                    value={formData.description[lang]}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: { ...prev.description, [lang]: e.target.value } }))}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                ))}
              </div>
            </div>

            {/* Theme, Age, Duration */}
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
                  {language === 'fr' ? 'Tranche d\'âge' : language === 'de' ? 'Altersgruppe' : 'Age Group'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={formData.targetAge}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAge: e.target.value as YouthPollTargetAge }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {targetAges.map(age => (
                    <option key={age.value} value={age.value}>{age.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Durée (min)' : language === 'de' ? 'Dauer (Min.)' : 'Duration (min)'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.estimatedDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedDuration: parseInt(e.target.value) || 5 }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
          </div>

          {/* Questions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === 'fr' ? '❓ Questions du sondage' :
                 language === 'de' ? '❓ Umfragefragen' :
                 '❓ Poll Questions'}
              </h3>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                {language === 'fr' ? 'Ajouter une question' :
                 language === 'de' ? 'Frage hinzufügen' :
                 'Add Question'}
              </button>
            </div>

            {formData.questions.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">
                  {language === 'fr' ? 'Aucune question ajoutée' :
                   language === 'de' ? 'Keine Fragen hinzugefügt' :
                   'No questions added'}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'fr' ? 'Cliquez sur "Ajouter une question" pour commencer' :
                   language === 'de' ? 'Klicken Sie auf "Frage hinzufügen", um zu beginnen' :
                   'Click "Add Question" to get started'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.questions.map((question, qIndex) => (
                  <div key={question.id} className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                    {/* Question Header */}
                    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between gap-3 border-b border-gray-300">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex flex-col gap-1">
                          <button
                            type="button"
                            onClick={() => moveQuestion(qIndex, 'up')}
                            disabled={qIndex === 0}
                            className="p-0.5 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            title={language === 'fr' ? 'Monter' : language === 'de' ? 'Nach oben' : 'Move up'}
                          >
                            <ChevronUp className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveQuestion(qIndex, 'down')}
                            disabled={qIndex === formData.questions.length - 1}
                            className="p-0.5 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            title={language === 'fr' ? 'Descendre' : language === 'de' ? 'Nach unten' : 'Move down'}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                        <GripVertical className="w-5 h-5 text-gray-400" />
                        <span className="font-semibold text-gray-900">
                          {language === 'fr' ? `Question ${qIndex + 1}` :
                           language === 'de' ? `Frage ${qIndex + 1}` :
                           `Question ${qIndex + 1}`}
                        </span>
                        <span className="text-sm text-gray-600 truncate">
                          {question.question.fr || (language === 'fr' ? '(sans titre)' : language === 'de' ? '(ohne Titel)' : '(untitled)')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                          {question.points} {language === 'fr' ? 'pts' : language === 'de' ? 'Pkt' : 'pts'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          {expandedQuestion === question.id ? 
                            (language === 'fr' ? 'Réduire' : language === 'de' ? 'Einklappen' : 'Collapse') :
                            (language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit')}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeQuestion(question.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title={language === 'fr' ? 'Supprimer' : language === 'de' ? 'Löschen' : 'Delete'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Question Details (Expanded) */}
                    {expandedQuestion === question.id && (
                      <div className="p-4 space-y-4">
                        {/* Question Text */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === 'fr' ? 'Texte de la question (multilingue)' :
                             language === 'de' ? 'Fragetext (mehrsprachig)' :
                             'Question text (multilingual)'}
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <div className="space-y-2">
                            {(['fr', 'de', 'en'] as const).map(lang => (
                              <input
                                key={lang}
                                type="text"
                                placeholder={`${lang === 'fr' ? '🇫🇷 Français' : lang === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'}`}
                                value={question.question[lang]}
                                onChange={(e) => updateQuestionText(question.id, lang, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                required
                              />
                            ))}
                          </div>
                        </div>

                        {/* Question Settings */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {language === 'fr' ? 'Type de question' :
                               language === 'de' ? 'Fragetyp' :
                               'Question type'}
                            </label>
                            <select
                              value={question.type}
                              onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            >
                              {questionTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label[language]}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {language === 'fr' ? 'Points' :
                               language === 'de' ? 'Punkte' :
                               'Points'}
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={question.points}
                              onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value) || 10)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              required
                            />
                          </div>
                        </div>

                        {/* Answers */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700">
                              {language === 'fr' ? 'Réponses possibles' :
                               language === 'de' ? 'Mögliche Antworten' :
                               'Possible answers'}
                              <span className="text-red-500 ml-1">*</span>
                              <span className="text-xs text-gray-500 ml-2">
                                ({language === 'fr' ? 'Cochez les bonnes réponses' :
                                  language === 'de' ? 'Markieren Sie die richtigen Antworten' :
                                  'Check the correct answers'})
                              </span>
                            </label>
                            <button
                              type="button"
                              onClick={() => addAnswer(question.id)}
                              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-xs font-medium"
                            >
                              <Plus className="w-3 h-3" />
                              {language === 'fr' ? 'Ajouter' :
                               language === 'de' ? 'Hinzufügen' :
                               'Add'}
                            </button>
                          </div>

                          {question.answers.map((answer, aIndex) => (
                            <div key={answer.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                              <div className="flex items-start gap-3">
                                {/* Correct Answer Checkbox */}
                                <div className="flex items-center justify-center pt-2">
                                  <button
                                    type="button"
                                    onClick={() => toggleAnswerCorrect(question.id, answer.id)}
                                    className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${
                                      answer.isCorrect 
                                        ? 'bg-green-600 border-green-600' 
                                        : 'border-gray-300 hover:border-green-400'
                                    }`}
                                    title={language === 'fr' ? 'Réponse correcte' : language === 'de' ? 'Richtige Antwort' : 'Correct answer'}
                                  >
                                    {answer.isCorrect && <Check className="w-4 h-4 text-white" />}
                                  </button>
                                </div>

                                {/* Answer Texts */}
                                <div className="flex-1 space-y-2">
                                  {(['fr', 'de', 'en'] as const).map(lang => (
                                    <input
                                      key={lang}
                                      type="text"
                                      placeholder={`${lang === 'fr' ? '🇫🇷' : lang === 'de' ? '🇩🇪' : '🇬🇧'} ${language === 'fr' ? `Réponse ${aIndex + 1}` : language === 'de' ? `Antwort ${aIndex + 1}` : `Answer ${aIndex + 1}`}`}
                                      value={answer.text[lang]}
                                      onChange={(e) => updateAnswerText(question.id, answer.id, lang, e.target.value)}
                                      className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                      required
                                    />
                                  ))}
                                </div>

                                {/* Delete Answer */}
                                {question.answers.length > 2 && (
                                  <button
                                    type="button"
                                    onClick={() => removeAnswer(question.id, answer.id)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors mt-1"
                                    title={language === 'fr' ? 'Supprimer' : language === 'de' ? 'Löschen' : 'Delete'}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center gap-3 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {formData.questions.length > 0 && (
                <span className="font-medium">
                  {language === 'fr' ? `Total : ${formData.questions.length} questions • ${totalPoints} points` :
                   language === 'de' ? `Gesamt: ${formData.questions.length} Fragen • ${totalPoints} Punkte` :
                   `Total: ${formData.questions.length} questions • ${totalPoints} points`}
                </span>
              )}
            </div>
            <div className="flex gap-3">
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
                disabled={isSubmitting || formData.questions.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {language === 'fr' ? 'Créer le sondage' : language === 'de' ? 'Umfrage erstellen' : 'Create Poll'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
