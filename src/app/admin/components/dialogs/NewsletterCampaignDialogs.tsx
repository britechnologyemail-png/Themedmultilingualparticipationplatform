import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Checkbox } from '../../../components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Plus, Save, X, Calendar, Users, FileText } from 'lucide-react';
import { toast } from 'sonner';
import type {
  NewsletterFrequency,
  NewsletterTopicType,
  Language,
} from '../../../types';
import { getNewsletterTopicLabel } from '../../../data/mockNewsletterData';

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateCampaignDialog({ open, onOpenChange, onSuccess }: CreateCampaignDialogProps) {
  const { language, tLocal } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    name: { fr: '', de: '', en: '' },
    subject: { fr: '', de: '', en: '' },
    preheader: { fr: '', de: '', en: '' },
    content: {
      html: { fr: '', de: '', en: '' },
      text: { fr: '', de: '', en: '' },
    },
    targetFrequency: [] as NewsletterFrequency[],
    targetTopics: [] as NewsletterTopicType[],
    targetLanguages: [] as Language[],
    scheduledFor: '',
  });

  const allTopics: NewsletterTopicType[] = [
    'consultations',
    'votes',
    'petitions',
    'assemblies',
    'conferences',
    'results',
    'signalements',
    'youth',
  ];

  const handleTopicToggle = (topic: NewsletterTopicType) => {
    setFormData((prev) => ({
      ...prev,
      targetTopics: prev.targetTopics.includes(topic)
        ? prev.targetTopics.filter((t) => t !== topic)
        : [...prev.targetTopics, topic],
    }));
  };

  const handleFrequencyToggle = (freq: NewsletterFrequency) => {
    setFormData((prev) => ({
      ...prev,
      targetFrequency: prev.targetFrequency.includes(freq)
        ? prev.targetFrequency.filter((f) => f !== freq)
        : [...prev.targetFrequency, freq],
    }));
  };

  const handleLanguageToggle = (lang: Language) => {
    setFormData((prev) => ({
      ...prev,
      targetLanguages: prev.targetLanguages.includes(lang)
        ? prev.targetLanguages.filter((l) => l !== lang)
        : [...prev.targetLanguages, lang],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.fr || !formData.subject.fr) {
      toast.error(
        language === 'fr'
          ? 'Veuillez remplir tous les champs requis'
          : language === 'de'
          ? 'Bitte füllen Sie alle erforderlichen Felder aus'
          : 'Please fill in all required fields'
      );
      return;
    }

    if (formData.targetLanguages.length === 0) {
      toast.error(
        language === 'fr'
          ? 'Veuillez sélectionner au moins une langue cible'
          : language === 'de'
          ? 'Bitte wählen Sie mindestens eine Zielsprache aus'
          : 'Please select at least one target language'
      );
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Creating campaign:', formData);
      
      toast.success(
        language === 'fr'
          ? `Campagne "${formData.name.fr}" créée avec succès`
          : language === 'de'
          ? `Kampagne "${formData.name.de || formData.name.fr}" erfolgreich erstellt`
          : `Campaign "${formData.name.en || formData.name.fr}" created successfully`
      );

      setLoading(false);
      onOpenChange(false);
      onSuccess?.();

      // Reset form
      setFormData({
        name: { fr: '', de: '', en: '' },
        subject: { fr: '', de: '', en: '' },
        preheader: { fr: '', de: '', en: '' },
        content: {
          html: { fr: '', de: '', en: '' },
          text: { fr: '', de: '', en: '' },
        },
        targetFrequency: [],
        targetTopics: [],
        targetLanguages: [],
        scheduledFor: '',
      });
      setCurrentStep(1);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {language === 'fr' ? 'Créer une campagne' : language === 'de' ? 'Kampagne erstellen' : 'Create Campaign'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr'
              ? 'Configurez et planifiez une nouvelle campagne newsletter'
              : language === 'de'
              ? 'Konfigurieren und planen Sie eine neue Newsletter-Kampagne'
              : 'Configure and schedule a new newsletter campaign'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 pb-4 border-b">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                1
              </div>
              <span className="text-sm font-medium">
                {language === 'fr' ? 'Informations' : language === 'de' ? 'Informationen' : 'Information'}
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-200" />
            <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                2
              </div>
              <span className="text-sm font-medium">
                {language === 'fr' ? 'Contenu' : language === 'de' ? 'Inhalt' : 'Content'}
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-200" />
            <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                3
              </div>
              <span className="text-sm font-medium">
                {language === 'fr' ? 'Audience' : language === 'de' ? 'Zielgruppe' : 'Audience'}
              </span>
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <Tabs defaultValue="fr">
                <TabsList>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                  <TabsTrigger value="de">Deutsch</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                </TabsList>

                <TabsContent value="fr" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-fr">
                      {language === 'fr' ? 'Nom de la campagne' : language === 'de' ? 'Kampagnenname' : 'Campaign Name'}
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="name-fr"
                      value={formData.name.fr}
                      onChange={(e) => setFormData({ ...formData, name: { ...formData.name, fr: e.target.value } })}
                      placeholder="Newsletter Hebdomadaire - Janvier 2026"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject-fr">
                      {language === 'fr' ? 'Sujet de l\'email' : language === 'de' ? 'E-Mail-Betreff' : 'Email Subject'}
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="subject-fr"
                      value={formData.subject.fr}
                      onChange={(e) => setFormData({ ...formData, subject: { ...formData.subject, fr: e.target.value } })}
                      placeholder="🗳️ Nouvelles consultations cette semaine"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preheader-fr">
                      {language === 'fr' ? 'Texte de prévisualisation' : language === 'de' ? 'Vorschautext' : 'Preview Text'}
                    </Label>
                    <Input
                      id="preheader-fr"
                      value={formData.preheader.fr}
                      onChange={(e) => setFormData({ ...formData, preheader: { ...formData.preheader, fr: e.target.value } })}
                      placeholder="Découvrez les nouvelles opportunités de participation"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="de" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-de">Kampagnenname</Label>
                    <Input
                      id="name-de"
                      value={formData.name.de}
                      onChange={(e) => setFormData({ ...formData, name: { ...formData.name, de: e.target.value } })}
                      placeholder="Wöchentlicher Newsletter - Januar 2026"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject-de">E-Mail-Betreff</Label>
                    <Input
                      id="subject-de"
                      value={formData.subject.de}
                      onChange={(e) => setFormData({ ...formData, subject: { ...formData.subject, de: e.target.value } })}
                      placeholder="🗳️ Neue Konsultationen diese Woche"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preheader-de">Vorschautext</Label>
                    <Input
                      id="preheader-de"
                      value={formData.preheader.de}
                      onChange={(e) => setFormData({ ...formData, preheader: { ...formData.preheader, de: e.target.value } })}
                      placeholder="Entdecken Sie neue Beteiligungsmöglichkeiten"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="en" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-en">Campaign Name</Label>
                    <Input
                      id="name-en"
                      value={formData.name.en}
                      onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
                      placeholder="Weekly Newsletter - January 2026"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject-en">Email Subject</Label>
                    <Input
                      id="subject-en"
                      value={formData.subject.en}
                      onChange={(e) => setFormData({ ...formData, subject: { ...formData.subject, en: e.target.value } })}
                      placeholder="🗳️ New consultations this week"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preheader-en">Preview Text</Label>
                    <Input
                      id="preheader-en"
                      value={formData.preheader.en}
                      onChange={(e) => setFormData({ ...formData, preheader: { ...formData.preheader, en: e.target.value } })}
                      placeholder="Discover new participation opportunities"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Schedule */}
              <div className="space-y-2">
                <Label htmlFor="scheduledFor" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {language === 'fr' ? 'Programmer l\'envoi (optionnel)' : language === 'de' ? 'Versand planen (optional)' : 'Schedule Send (Optional)'}
                </Label>
                <Input
                  id="scheduledFor"
                  type="datetime-local"
                  value={formData.scheduledFor}
                  onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 2: Content */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <Tabs defaultValue="fr">
                <TabsList>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                  <TabsTrigger value="de">Deutsch</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                </TabsList>

                <TabsContent value="fr" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content-text-fr">
                      {language === 'fr' ? 'Contenu texte' : language === 'de' ? 'Textinhalt' : 'Text Content'}
                    </Label>
                    <Textarea
                      id="content-text-fr"
                      value={formData.content.text.fr}
                      onChange={(e) => setFormData({
                        ...formData,
                        content: { ...formData.content, text: { ...formData.content.text, fr: e.target.value } }
                      })}
                      placeholder="Version texte de votre newsletter..."
                      rows={8}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content-html-fr">
                      {language === 'fr' ? 'Contenu HTML (optionnel)' : language === 'de' ? 'HTML-Inhalt (optional)' : 'HTML Content (Optional)'}
                    </Label>
                    <Textarea
                      id="content-html-fr"
                      value={formData.content.html.fr}
                      onChange={(e) => setFormData({
                        ...formData,
                        content: { ...formData.content, html: { ...formData.content.html, fr: e.target.value } }
                      })}
                      placeholder="<html>...</html>"
                      rows={6}
                      className="font-mono text-sm"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="de" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content-text-de">Textinhalt</Label>
                    <Textarea
                      id="content-text-de"
                      value={formData.content.text.de}
                      onChange={(e) => setFormData({
                        ...formData,
                        content: { ...formData.content, text: { ...formData.content.text, de: e.target.value } }
                      })}
                      placeholder="Textversion Ihres Newsletters..."
                      rows={8}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content-html-de">HTML-Inhalt (optional)</Label>
                    <Textarea
                      id="content-html-de"
                      value={formData.content.html.de}
                      onChange={(e) => setFormData({
                        ...formData,
                        content: { ...formData.content, html: { ...formData.content.html, de: e.target.value } }
                      })}
                      placeholder="<html>...</html>"
                      rows={6}
                      className="font-mono text-sm"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="en" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content-text-en">Text Content</Label>
                    <Textarea
                      id="content-text-en"
                      value={formData.content.text.en}
                      onChange={(e) => setFormData({
                        ...formData,
                        content: { ...formData.content, text: { ...formData.content.text, en: e.target.value } }
                      })}
                      placeholder="Text version of your newsletter..."
                      rows={8}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content-html-en">HTML Content (Optional)</Label>
                    <Textarea
                      id="content-html-en"
                      value={formData.content.html.en}
                      onChange={(e) => setFormData({
                        ...formData,
                        content: { ...formData.content, html: { ...formData.content.html, en: e.target.value } }
                      })}
                      placeholder="<html>...</html>"
                      rows={6}
                      className="font-mono text-sm"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Step 3: Target Audience */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Target Languages */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {language === 'fr' ? 'Langues cibles' : language === 'de' ? 'Zielsprachen' : 'Target Languages'}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {(['fr', 'de', 'en'] as Language[]).map((lang) => (
                    <div
                      key={lang}
                      className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <Checkbox
                        id={`lang-${lang}`}
                        checked={formData.targetLanguages.includes(lang)}
                        onCheckedChange={() => handleLanguageToggle(lang)}
                      />
                      <label htmlFor={`lang-${lang}`} className="text-sm font-medium cursor-pointer flex-1">
                        {lang === 'fr' ? 'Français' : lang === 'de' ? 'Deutsch' : 'English'}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Frequency */}
              <div className="space-y-3">
                <Label>
                  {language === 'fr' ? 'Fréquences cibles (optionnel)' : language === 'de' ? 'Zielhäufigkeiten (optional)' : 'Target Frequencies (Optional)'}
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {(['daily', 'weekly', 'monthly'] as NewsletterFrequency[]).map((freq) => (
                    <div
                      key={freq}
                      className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <Checkbox
                        id={`freq-${freq}`}
                        checked={formData.targetFrequency.includes(freq)}
                        onCheckedChange={() => handleFrequencyToggle(freq)}
                      />
                      <label htmlFor={`freq-${freq}`} className="text-sm font-medium cursor-pointer flex-1">
                        {freq === 'daily'
                          ? language === 'fr' ? 'Quotidienne' : language === 'de' ? 'Täglich' : 'Daily'
                          : freq === 'weekly'
                          ? language === 'fr' ? 'Hebdomadaire' : language === 'de' ? 'Wöchentlich' : 'Weekly'
                          : language === 'fr' ? 'Mensuelle' : language === 'de' ? 'Monatlich' : 'Monthly'}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Topics */}
              <div className="space-y-3">
                <Label>
                  {language === 'fr' ? 'Sujets cibles (optionnel)' : language === 'de' ? 'Zielthemen (optional)' : 'Target Topics (Optional)'}
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {allTopics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <Checkbox
                        id={`target-topic-${topic}`}
                        checked={formData.targetTopics.includes(topic)}
                        onCheckedChange={() => handleTopicToggle(topic)}
                      />
                      <label
                        htmlFor={`target-topic-${topic}`}
                        className="text-sm font-medium cursor-pointer flex-1"
                      >
                        {tLocal(getNewsletterTopicLabel(topic))}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimated Recipients */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">
                      {language === 'fr' ? 'Destinataires estimés' : language === 'de' ? 'Geschätzte Empfänger' : 'Estimated Recipients'}
                    </p>
                    <p className="text-sm text-blue-700">
                      {language === 'fr'
                        ? 'Environ 10 abonnés correspondent à vos critères'
                        : language === 'de'
                        ? 'Etwa 10 Abonnenten entsprechen Ihren Kriterien'
                        : 'Approximately 10 subscribers match your criteria'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex items-center justify-between">
            <div>
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  {language === 'fr' ? 'Précédent' : language === 'de' ? 'Zurück' : 'Previous'}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                <X className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
              </Button>
              {currentStep < 3 ? (
                <Button type="button" onClick={() => setCurrentStep(currentStep + 1)}>
                  {language === 'fr' ? 'Suivant' : language === 'de' ? 'Weiter' : 'Next'}
                </Button>
              ) : (
                <Button type="submit" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading
                    ? language === 'fr'
                      ? 'Création...'
                      : language === 'de'
                      ? 'Wird erstellt...'
                      : 'Creating...'
                    : language === 'fr'
                    ? 'Créer la campagne'
                    : language === 'de'
                    ? 'Kampagne erstellen'
                    : 'Create Campaign'}
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}