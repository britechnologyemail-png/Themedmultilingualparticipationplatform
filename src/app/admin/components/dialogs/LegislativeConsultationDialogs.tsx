import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useThemes } from '../../../hooks/useApi';
import { FileText, Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { LegislativeTextType, ConsultationStatus } from '../../../types';

interface AddLegislativeConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export function AddLegislativeConsultationDialog({ 
  open, 
  onOpenChange, 
  onSubmit 
}: AddLegislativeConsultationDialogProps) {
  const { language } = useLanguage();
  const { data: themes } = useThemes();
  
  const [formData, setFormData] = useState({
    titleFr: '',
    titleDe: '',
    titleEn: '',
    descriptionFr: '',
    descriptionDe: '',
    descriptionEn: '',
    textType: 'law' as LegislativeTextType,
    referenceNumber: '',
    themeId: '',
    status: 'draft' as ConsultationStatus,
    startDate: '',
    endDate: '',
    tags: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate titles
    if (!formData.titleFr.trim()) {
      newErrors.titleFr = language === 'fr' ? 'Le titre français est requis' : 
                           language === 'de' ? 'Französischer Titel erforderlich' : 
                           'French title required';
    }
    if (!formData.titleDe.trim()) {
      newErrors.titleDe = language === 'fr' ? 'Le titre allemand est requis' : 
                           language === 'de' ? 'Deutscher Titel erforderlich' : 
                           'German title required';
    }
    if (!formData.titleEn.trim()) {
      newErrors.titleEn = language === 'fr' ? 'Le titre anglais est requis' : 
                           language === 'de' ? 'Englischer Titel erforderlich' : 
                           'English title required';
    }

    // Validate theme
    if (!formData.themeId) {
      newErrors.themeId = language === 'fr' ? 'Le thème est requis' : 
                          language === 'de' ? 'Thema erforderlich' : 
                          'Theme required';
    }

    // Validate dates
    if (!formData.startDate) {
      newErrors.startDate = language === 'fr' ? 'La date de début est requise' : 
                            language === 'de' ? 'Startdatum erforderlich' : 
                            'Start date required';
    }
    if (!formData.endDate) {
      newErrors.endDate = language === 'fr' ? 'La date de fin est requise' : 
                          language === 'de' ? 'Enddatum erforderlich' : 
                          'End date required';
    }

    // Validate date logic
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = language === 'fr' ? 'La date de fin doit être après la date de début' : 
                          language === 'de' ? 'Enddatum muss nach dem Startdatum liegen' : 
                          'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(
        language === 'fr' ? 'Veuillez corriger les erreurs dans le formulaire' :
        language === 'de' ? 'Bitte korrigieren Sie die Fehler im Formular' :
        'Please correct the errors in the form'
      );
      return;
    }

    const newConsultation = {
      id: `leg_${Date.now()}`,
      slug: formData.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: {
        fr: formData.titleFr,
        de: formData.titleDe,
        en: formData.titleEn,
      },
      description: {
        fr: formData.descriptionFr,
        de: formData.descriptionDe,
        en: formData.descriptionEn,
      },
      textType: formData.textType,
      referenceNumber: formData.referenceNumber,
      themeId: formData.themeId,
      status: formData.status,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      articles: [],
      stats: {
        totalArticles: 0,
        totalAnnotations: 0,
        totalParticipants: 0,
        totalVotes: 0,
        articlesWithAnnotations: 0,
        averageAnnotationsPerArticle: 0,
        engagementRate: 0,
      },
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit?.(newConsultation);
    
    toast.success(
      language === 'fr' ? 'Consultation législative créée avec succès' :
      language === 'de' ? 'Gesetzgebungsberatung erfolgreich erstellt' :
      'Legislative consultation created successfully'
    );
    
    // Reset form
    setFormData({
      titleFr: '',
      titleDe: '',
      titleEn: '',
      descriptionFr: '',
      descriptionDe: '',
      descriptionEn: '',
      textType: 'law',
      referenceNumber: '',
      themeId: '',
      status: 'draft',
      startDate: '',
      endDate: '',
      tags: '',
    });
    setErrors({});
    onOpenChange(false);
  };

  const getTextTypeLabel = (textType: string) => {
    const labels: Record<string, { fr: string; de: string; en: string }> = {
      law: { fr: 'Projet de loi', de: 'Gesetzentwurf', en: 'Bill' },
      regulation: { fr: 'Règlement', de: 'Verordnung', en: 'Regulation' },
      decree: { fr: 'Décret', de: 'Dekret', en: 'Decree' },
      ordinance: { fr: 'Ordonnance', de: 'Verordnung', en: 'Ordinance' },
      amendment: { fr: 'Amendement', de: 'Änderungsantrag', en: 'Amendment' }
    };
    return labels[textType]?.[language] || textType;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {language === 'fr' && 'Nouvelle consultation législative'}
            {language === 'de' && 'Neue Gesetzgebungsberatung'}
            {language === 'en' && 'New Legislative Consultation'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' && 'Créez une nouvelle consultation législative pour permettre aux citoyens d\'annoter et commenter les articles.'}
            {language === 'de' && 'Erstellen Sie eine neue Gesetzgebungsberatung, damit Bürger Artikel annotieren und kommentieren können.'}
            {language === 'en' && 'Create a new legislative consultation to allow citizens to annotate and comment on articles.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Titles Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-700 border-b pb-2">
                {language === 'fr' && 'Titres (toutes les langues)'}
                {language === 'de' && 'Titel (alle Sprachen)'}
                {language === 'en' && 'Titles (all languages)'}
              </h4>
              
              <div className="space-y-2">
                <Label htmlFor="titleFr">
                  {language === 'fr' && 'Titre (Français)'}
                  {language === 'de' && 'Titel (Französisch)'}
                  {language === 'en' && 'Title (French)'} *
                </Label>
                <Input
                  id="titleFr"
                  value={formData.titleFr}
                  onChange={(e) => handleChange('titleFr', e.target.value)}
                  placeholder="Ex: Loi sur la neutralité carbone"
                  className={errors.titleFr ? 'border-red-500' : ''}
                />
                {errors.titleFr && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.titleFr}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="titleDe">
                  {language === 'fr' && 'Titre (Allemand)'}
                  {language === 'de' && 'Titel (Deutsch)'}
                  {language === 'en' && 'Title (German)'} *
                </Label>
                <Input
                  id="titleDe"
                  value={formData.titleDe}
                  onChange={(e) => handleChange('titleDe', e.target.value)}
                  placeholder="z.B.: Gesetz über Klimaneutralität"
                  className={errors.titleDe ? 'border-red-500' : ''}
                />
                {errors.titleDe && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.titleDe}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="titleEn">
                  {language === 'fr' && 'Titre (Anglais)'}
                  {language === 'de' && 'Titel (Englisch)'}
                  {language === 'en' && 'Title (English)'} *
                </Label>
                <Input
                  id="titleEn"
                  value={formData.titleEn}
                  onChange={(e) => handleChange('titleEn', e.target.value)}
                  placeholder="e.g., Carbon Neutrality Act"
                  className={errors.titleEn ? 'border-red-500' : ''}
                />
                {errors.titleEn && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.titleEn}
                  </p>
                )}
              </div>
            </div>

            {/* Descriptions Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-700 border-b pb-2">
                {language === 'fr' && 'Descriptions (toutes les langues)'}
                {language === 'de' && 'Beschreibungen (alle Sprachen)'}
                {language === 'en' && 'Descriptions (all languages)'}
              </h4>

              <div className="space-y-2">
                <Label htmlFor="descriptionFr">
                  {language === 'fr' && 'Description (Français)'}
                  {language === 'de' && 'Beschreibung (Französisch)'}
                  {language === 'en' && 'Description (French)'}
                </Label>
                <Textarea
                  id="descriptionFr"
                  value={formData.descriptionFr}
                  onChange={(e) => handleChange('descriptionFr', e.target.value)}
                  placeholder="Décrivez l'objectif de cette consultation législative..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionDe">
                  {language === 'fr' && 'Description (Allemand)'}
                  {language === 'de' && 'Beschreibung (Deutsch)'}
                  {language === 'en' && 'Description (German)'}
                </Label>
                <Textarea
                  id="descriptionDe"
                  value={formData.descriptionDe}
                  onChange={(e) => handleChange('descriptionDe', e.target.value)}
                  placeholder="Beschreiben Sie das Ziel dieser Gesetzgebungsberatung..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionEn">
                  {language === 'fr' && 'Description (Anglais)'}
                  {language === 'de' && 'Beschreibung (Englisch)'}
                  {language === 'en' && 'Description (English)'}
                </Label>
                <Textarea
                  id="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={(e) => handleChange('descriptionEn', e.target.value)}
                  placeholder="Describe the purpose of this legislative consultation..."
                  rows={3}
                />
              </div>
            </div>

            {/* Consultation Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-700 border-b pb-2">
                {language === 'fr' && 'Détails de la consultation'}
                {language === 'de' && 'Beratungsdetails'}
                {language === 'en' && 'Consultation Details'}
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="textType">
                    {language === 'fr' && 'Type de texte'}
                    {language === 'de' && 'Texttyp'}
                    {language === 'en' && 'Text Type'} *
                  </Label>
                  <Select value={formData.textType} onValueChange={(value) => handleChange('textType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="law">{getTextTypeLabel('law')}</SelectItem>
                      <SelectItem value="regulation">{getTextTypeLabel('regulation')}</SelectItem>
                      <SelectItem value="decree">{getTextTypeLabel('decree')}</SelectItem>
                      <SelectItem value="ordinance">{getTextTypeLabel('ordinance')}</SelectItem>
                      <SelectItem value="amendment">{getTextTypeLabel('amendment')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referenceNumber">
                    {language === 'fr' && 'Numéro de référence'}
                    {language === 'de' && 'Referenznummer'}
                    {language === 'en' && 'Reference Number'}
                  </Label>
                  <Input
                    id="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={(e) => handleChange('referenceNumber', e.target.value)}
                    placeholder="Ex: LEG-2026-001"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="themeId">
                    {language === 'fr' && 'Thème'}
                    {language === 'de' && 'Thema'}
                    {language === 'en' && 'Theme'} *
                  </Label>
                  <Select 
                    value={formData.themeId} 
                    onValueChange={(value) => handleChange('themeId', value)}
                  >
                    <SelectTrigger className={errors.themeId ? 'border-red-500' : ''}>
                      <SelectValue placeholder={
                        language === 'fr' ? 'Sélectionner un thème' :
                        language === 'de' ? 'Thema auswählen' :
                        'Select a theme'
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {themes?.map(theme => (
                        <SelectItem key={theme.id} value={theme.id}>
                          {theme.name[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.themeId && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.themeId}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">
                    {language === 'fr' && 'Statut'}
                    {language === 'de' && 'Status'}
                    {language === 'en' && 'Status'} *
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">
                        {language === 'fr' && 'Brouillon'}
                        {language === 'de' && 'Entwurf'}
                        {language === 'en' && 'Draft'}
                      </SelectItem>
                      <SelectItem value="upcoming">
                        {language === 'fr' && 'À venir'}
                        {language === 'de' && 'Bevorstehend'}
                        {language === 'en' && 'Upcoming'}
                      </SelectItem>
                      <SelectItem value="open">
                        {language === 'fr' && 'Ouverte'}
                        {language === 'de' && 'Offen'}
                        {language === 'en' && 'Open'}
                      </SelectItem>
                      <SelectItem value="closed">
                        {language === 'fr' && 'Fermée'}
                        {language === 'de' && 'Geschlossen'}
                        {language === 'en' && 'Closed'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">
                    {language === 'fr' && 'Date de début'}
                    {language === 'de' && 'Startdatum'}
                    {language === 'en' && 'Start Date'} *
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className={errors.startDate ? 'border-red-500' : ''}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.startDate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">
                    {language === 'fr' && 'Date de fin'}
                    {language === 'de' && 'Enddatum'}
                    {language === 'en' && 'End Date'} *
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    className={errors.endDate ? 'border-red-500' : ''}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">
                  {language === 'fr' && 'Étiquettes (séparées par des virgules)'}
                  {language === 'de' && 'Tags (durch Kommas getrennt)'}
                  {language === 'en' && 'Tags (comma-separated)'}
                </Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  placeholder="environnement, climat, énergie"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'fr' && 'Annuler'}
              {language === 'de' && 'Abbrechen'}
              {language === 'en' && 'Cancel'}
            </Button>
            <Button type="submit">
              <Plus className="w-4 h-4 mr-2" />
              {language === 'fr' && 'Créer la consultation'}
              {language === 'de' && 'Beratung erstellen'}
              {language === 'en' && 'Create Consultation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Edit Dialog
interface EditLegislativeConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consultation: any | null;
  onSubmit?: (data: any) => void;
}

export function EditLegislativeConsultationDialog({ 
  open, 
  onOpenChange, 
  consultation,
  onSubmit 
}: EditLegislativeConsultationDialogProps) {
  const { language } = useLanguage();
  const { data: themes } = useThemes();
  
  const [formData, setFormData] = useState({
    titleFr: '',
    titleDe: '',
    titleEn: '',
    descriptionFr: '',
    descriptionDe: '',
    descriptionEn: '',
    textType: 'law' as LegislativeTextType,
    referenceNumber: '',
    themeId: '',
    status: 'draft' as ConsultationStatus,
    startDate: '',
    endDate: '',
    tags: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (consultation) {
      setFormData({
        titleFr: consultation.title?.fr || '',
        titleDe: consultation.title?.de || '',
        titleEn: consultation.title?.en || '',
        descriptionFr: consultation.description?.fr || '',
        descriptionDe: consultation.description?.de || '',
        descriptionEn: consultation.description?.en || '',
        textType: consultation.textType || 'law',
        referenceNumber: consultation.referenceNumber || '',
        themeId: consultation.themeId || '',
        status: consultation.status || 'draft',
        startDate: consultation.startDate ? consultation.startDate.split('T')[0] : '',
        endDate: consultation.endDate ? consultation.endDate.split('T')[0] : '',
        tags: consultation.tags ? consultation.tags.join(', ') : '',
      });
    }
  }, [consultation]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate titles
    if (!formData.titleFr.trim()) {
      newErrors.titleFr = language === 'fr' ? 'Le titre français est requis' : 
                           language === 'de' ? 'Französischer Titel erforderlich' : 
                           'French title required';
    }
    if (!formData.titleDe.trim()) {
      newErrors.titleDe = language === 'fr' ? 'Le titre allemand est requis' : 
                           language === 'de' ? 'Deutscher Titel erforderlich' : 
                           'German title required';
    }
    if (!formData.titleEn.trim()) {
      newErrors.titleEn = language === 'fr' ? 'Le titre anglais est requis' : 
                           language === 'de' ? 'Englischer Titel erforderlich' : 
                           'English title required';
    }

    // Validate theme
    if (!formData.themeId) {
      newErrors.themeId = language === 'fr' ? 'Le thème est requis' : 
                          language === 'de' ? 'Thema erforderlich' : 
                          'Theme required';
    }

    // Validate dates
    if (!formData.startDate) {
      newErrors.startDate = language === 'fr' ? 'La date de début est requise' : 
                            language === 'de' ? 'Startdatum erforderlich' : 
                            'Start date required';
    }
    if (!formData.endDate) {
      newErrors.endDate = language === 'fr' ? 'La date de fin est requise' : 
                          language === 'de' ? 'Enddatum erforderlich' : 
                          'End date required';
    }

    // Validate date logic
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = language === 'fr' ? 'La date de fin doit être après la date de début' : 
                          language === 'de' ? 'Enddatum muss nach dem Startdatum liegen' : 
                          'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(
        language === 'fr' ? 'Veuillez corriger les erreurs dans le formulaire' :
        language === 'de' ? 'Bitte korrigieren Sie die Fehler im Formular' :
        'Please correct the errors in the form'
      );
      return;
    }

    const updatedConsultation = {
      ...consultation,
      title: {
        fr: formData.titleFr,
        de: formData.titleDe,
        en: formData.titleEn,
      },
      description: {
        fr: formData.descriptionFr,
        de: formData.descriptionDe,
        en: formData.descriptionEn,
      },
      textType: formData.textType,
      referenceNumber: formData.referenceNumber,
      themeId: formData.themeId,
      status: formData.status,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      updatedAt: new Date().toISOString(),
    };

    onSubmit?.(updatedConsultation);
    
    toast.success(
      language === 'fr' ? 'Consultation législative modifiée avec succès' :
      language === 'de' ? 'Gesetzgebungsberatung erfolgreich bearbeitet' :
      'Legislative consultation updated successfully'
    );
    
    onOpenChange(false);
  };

  const getTextTypeLabel = (textType: string) => {
    const labels: Record<string, { fr: string; de: string; en: string }> = {
      law: { fr: 'Projet de loi', de: 'Gesetzentwurf', en: 'Bill' },
      regulation: { fr: 'Règlement', de: 'Verordnung', en: 'Regulation' },
      decree: { fr: 'Décret', de: 'Dekret', en: 'Decree' },
      ordinance: { fr: 'Ordonnance', de: 'Verordnung', en: 'Ordinance' },
      amendment: { fr: 'Amendement', de: 'Änderungsantrag', en: 'Amendment' }
    };
    return labels[textType]?.[language] || textType;
  };

  if (!consultation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            {language === 'fr' && 'Modifier la consultation'}
            {language === 'de' && 'Beratung bearbeiten'}
            {language === 'en' && 'Edit Consultation'}
          </DialogTitle>
          <DialogDescription>
            {consultation.title[language]}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Consultation ID */}
            <div className="space-y-2">
              <Label className="text-gray-600">
                {language === 'fr' && 'ID Consultation'}
                {language === 'de' && 'Beratungs-ID'}
                {language === 'en' && 'Consultation ID'}
              </Label>
              <Input value={consultation.id} disabled className="bg-gray-100" />
            </div>

            {/* Titles Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-700 border-b pb-2">
                {language === 'fr' && 'Titres (toutes les langues)'}
                {language === 'de' && 'Titel (alle Sprachen)'}
                {language === 'en' && 'Titles (all languages)'}
              </h4>
              
              <div className="space-y-2">
                <Label htmlFor="edit-titleFr">
                  {language === 'fr' && 'Titre (Français)'}
                  {language === 'de' && 'Titel (Französisch)'}
                  {language === 'en' && 'Title (French)'} *
                </Label>
                <Input
                  id="edit-titleFr"
                  value={formData.titleFr}
                  onChange={(e) => handleChange('titleFr', e.target.value)}
                  className={errors.titleFr ? 'border-red-500' : ''}
                />
                {errors.titleFr && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.titleFr}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-titleDe">
                  {language === 'fr' && 'Titre (Allemand)'}
                  {language === 'de' && 'Titel (Deutsch)'}
                  {language === 'en' && 'Title (German)'} *
                </Label>
                <Input
                  id="edit-titleDe"
                  value={formData.titleDe}
                  onChange={(e) => handleChange('titleDe', e.target.value)}
                  className={errors.titleDe ? 'border-red-500' : ''}
                />
                {errors.titleDe && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.titleDe}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-titleEn">
                  {language === 'fr' && 'Titre (Anglais)'}
                  {language === 'de' && 'Titel (Englisch)'}
                  {language === 'en' && 'Title (English)'} *
                </Label>
                <Input
                  id="edit-titleEn"
                  value={formData.titleEn}
                  onChange={(e) => handleChange('titleEn', e.target.value)}
                  className={errors.titleEn ? 'border-red-500' : ''}
                />
                {errors.titleEn && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.titleEn}
                  </p>
                )}
              </div>
            </div>

            {/* Descriptions Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-700 border-b pb-2">
                {language === 'fr' && 'Descriptions (toutes les langues)'}
                {language === 'de' && 'Beschreibungen (alle Sprachen)'}
                {language === 'en' && 'Descriptions (all languages)'}
              </h4>

              <div className="space-y-2">
                <Label htmlFor="edit-descriptionFr">
                  {language === 'fr' && 'Description (Français)'}
                  {language === 'de' && 'Beschreibung (Französisch)'}
                  {language === 'en' && 'Description (French)'}
                </Label>
                <Textarea
                  id="edit-descriptionFr"
                  value={formData.descriptionFr}
                  onChange={(e) => handleChange('descriptionFr', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-descriptionDe">
                  {language === 'fr' && 'Description (Allemand)'}
                  {language === 'de' && 'Beschreibung (Deutsch)'}
                  {language === 'en' && 'Description (German)'}
                </Label>
                <Textarea
                  id="edit-descriptionDe"
                  value={formData.descriptionDe}
                  onChange={(e) => handleChange('descriptionDe', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-descriptionEn">
                  {language === 'fr' && 'Description (Anglais)'}
                  {language === 'de' && 'Beschreibung (Englisch)'}
                  {language === 'en' && 'Description (English)'}
                </Label>
                <Textarea
                  id="edit-descriptionEn"
                  value={formData.descriptionEn}
                  onChange={(e) => handleChange('descriptionEn', e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Consultation Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-700 border-b pb-2">
                {language === 'fr' && 'Détails de la consultation'}
                {language === 'de' && 'Beratungsdetails'}
                {language === 'en' && 'Consultation Details'}
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-textType">
                    {language === 'fr' && 'Type de texte'}
                    {language === 'de' && 'Texttyp'}
                    {language === 'en' && 'Text Type'} *
                  </Label>
                  <Select value={formData.textType} onValueChange={(value) => handleChange('textType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="law">{getTextTypeLabel('law')}</SelectItem>
                      <SelectItem value="regulation">{getTextTypeLabel('regulation')}</SelectItem>
                      <SelectItem value="decree">{getTextTypeLabel('decree')}</SelectItem>
                      <SelectItem value="ordinance">{getTextTypeLabel('ordinance')}</SelectItem>
                      <SelectItem value="amendment">{getTextTypeLabel('amendment')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-referenceNumber">
                    {language === 'fr' && 'Numéro de référence'}
                    {language === 'de' && 'Referenznummer'}
                    {language === 'en' && 'Reference Number'}
                  </Label>
                  <Input
                    id="edit-referenceNumber"
                    value={formData.referenceNumber}
                    onChange={(e) => handleChange('referenceNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-themeId">
                    {language === 'fr' && 'Thème'}
                    {language === 'de' && 'Thema'}
                    {language === 'en' && 'Theme'} *
                  </Label>
                  <Select 
                    value={formData.themeId} 
                    onValueChange={(value) => handleChange('themeId', value)}
                  >
                    <SelectTrigger className={errors.themeId ? 'border-red-500' : ''}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {themes?.map(theme => (
                        <SelectItem key={theme.id} value={theme.id}>
                          {theme.name[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.themeId && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.themeId}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-status">
                    {language === 'fr' && 'Statut'}
                    {language === 'de' && 'Status'}
                    {language === 'en' && 'Status'} *
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">
                        {language === 'fr' && 'Brouillon'}
                        {language === 'de' && 'Entwurf'}
                        {language === 'en' && 'Draft'}
                      </SelectItem>
                      <SelectItem value="upcoming">
                        {language === 'fr' && 'À venir'}
                        {language === 'de' && 'Bevorstehend'}
                        {language === 'en' && 'Upcoming'}
                      </SelectItem>
                      <SelectItem value="open">
                        {language === 'fr' && 'Ouverte'}
                        {language === 'de' && 'Offen'}
                        {language === 'en' && 'Open'}
                      </SelectItem>
                      <SelectItem value="closed">
                        {language === 'fr' && 'Fermée'}
                        {language === 'de' && 'Geschlossen'}
                        {language === 'en' && 'Closed'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-startDate">
                    {language === 'fr' && 'Date de début'}
                    {language === 'de' && 'Startdatum'}
                    {language === 'en' && 'Start Date'} *
                  </Label>
                  <Input
                    id="edit-startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className={errors.startDate ? 'border-red-500' : ''}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.startDate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-endDate">
                    {language === 'fr' && 'Date de fin'}
                    {language === 'de' && 'Enddatum'}
                    {language === 'en' && 'End Date'} *
                  </Label>
                  <Input
                    id="edit-endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    className={errors.endDate ? 'border-red-500' : ''}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-tags">
                  {language === 'fr' && 'Étiquettes (séparées par des virgules)'}
                  {language === 'de' && 'Tags (durch Kommas getrennt)'}
                  {language === 'en' && 'Tags (comma-separated)'}
                </Label>
                <Input
                  id="edit-tags"
                  value={formData.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'fr' && 'Annuler'}
              {language === 'de' && 'Abbrechen'}
              {language === 'en' && 'Cancel'}
            </Button>
            <Button type="submit">
              <Edit className="w-4 h-4 mr-2" />
              {language === 'fr' && 'Enregistrer les modifications'}
              {language === 'de' && 'Änderungen speichern'}
              {language === 'en' && 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Delete Dialog
interface DeleteLegislativeConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consultation: any | null;
  onConfirm?: () => void;
}

export function DeleteLegislativeConsultationDialog({ 
  open, 
  onOpenChange, 
  consultation,
  onConfirm 
}: DeleteLegislativeConsultationDialogProps) {
  const { language } = useLanguage();

  const handleConfirm = () => {
    onConfirm?.();
    toast.success(
      language === 'fr' ? 'Consultation supprimée avec succès' :
      language === 'de' ? 'Beratung erfolgreich gelöscht' :
      'Consultation deleted successfully'
    );
    onOpenChange(false);
  };

  if (!consultation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            {language === 'fr' && 'Supprimer la consultation'}
            {language === 'de' && 'Beratung löschen'}
            {language === 'en' && 'Delete Consultation'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' && 'Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cette consultation législative ?'}
            {language === 'de' && 'Diese Aktion ist irreversibel. Sind Sie sicher, dass Sie diese Gesetzgebungsberatung löschen möchten?'}
            {language === 'en' && 'This action is irreversible. Are you sure you want to delete this legislative consultation?'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-900">{consultation.title[language]}</p>
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>
                {language === 'fr' && `Articles: ${consultation.totalArticles}`}
                {language === 'de' && `Artikel: ${consultation.totalArticles}`}
                {language === 'en' && `Articles: ${consultation.totalArticles}`}
              </p>
              <p>
                {language === 'fr' && `Annotations: ${consultation.totalAnnotations}`}
                {language === 'de' && `Anmerkungen: ${consultation.totalAnnotations}`}
                {language === 'en' && `Annotations: ${consultation.totalAnnotations}`}
              </p>
              <p>
                {language === 'fr' && `Participants: ${consultation.totalParticipants}`}
                {language === 'de' && `Teilnehmer: ${consultation.totalParticipants}`}
                {language === 'en' && `Participants: ${consultation.totalParticipants}`}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {language === 'fr' && 'Annuler'}
            {language === 'de' && 'Abbrechen'}
            {language === 'en' && 'Cancel'}
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm}>
            <Trash2 className="w-4 h-4 mr-2" />
            {language === 'fr' && 'Supprimer'}
            {language === 'de' && 'Löschen'}
            {language === 'en' && 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}