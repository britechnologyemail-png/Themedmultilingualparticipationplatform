import React, { useState, useEffect } from 'react';
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
import { Badge } from '../../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Checkbox } from '../../../components/ui/checkbox';
import { UserPlus, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import type {
  NewsletterSubscriptionDTO,
  NewsletterTopicType,
  NewsletterFrequency,
  NewsletterSubscriptionStatus,
  Language,
} from '../../../types';
import { getNewsletterTopicLabel } from '../../../data/mockNewsletterData';

interface AddSubscriberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddSubscriberDialog({ open, onOpenChange, onSuccess }: AddSubscriberDialogProps) {
  const { language, tLocal } = useLanguage();
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    frequency: 'weekly' as NewsletterFrequency,
    lang: 'fr' as Language,
    topics: [] as NewsletterTopicType[],
    status: 'active' as NewsletterSubscriptionStatus,
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
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || formData.topics.length === 0) {
      toast.error(
        language === 'fr'
          ? 'Veuillez remplir tous les champs requis'
          : language === 'de'
          ? 'Bitte füllen Sie alle erforderlichen Felder aus'
          : 'Please fill in all required fields'
      );
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Creating subscriber:', formData);
      
      toast.success(
        language === 'fr'
          ? `Abonné ${formData.email} ajouté avec succès`
          : language === 'de'
          ? `Abonnent ${formData.email} erfolgreich hinzugefügt`
          : `Subscriber ${formData.email} added successfully`
      );

      setLoading(false);
      onOpenChange(false);
      onSuccess?.();

      // Reset form
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        frequency: 'weekly',
        lang: 'fr',
        topics: [],
        status: 'active',
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            {language === 'fr' ? 'Ajouter un abonné' : language === 'de' ? 'Abonnent hinzufügen' : 'Add Subscriber'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr'
              ? 'Créez un nouveau profil d\'abonné pour la newsletter'
              : language === 'de'
              ? 'Erstellen Sie ein neues Abonnentenprofil für den Newsletter'
              : 'Create a new subscriber profile for the newsletter'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="required">
              {language === 'fr' ? 'Adresse email' : language === 'de' ? 'E-Mail-Adresse' : 'Email Address'}
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              required
            />
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                {language === 'fr' ? 'Prénom' : language === 'de' ? 'Vorname' : 'First Name'}
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                {language === 'fr' ? 'Nom' : language === 'de' ? 'Nachname' : 'Last Name'}
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          {/* Frequency & Language */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">
                {language === 'fr' ? 'Fréquence' : language === 'de' ? 'Häufigkeit' : 'Frequency'}
              </Label>
              <Select value={formData.frequency} onValueChange={(value: NewsletterFrequency) => setFormData({ ...formData, frequency: value })}>
                <SelectTrigger id="frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">{language === 'fr' ? 'Quotidienne' : language === 'de' ? 'Täglich' : 'Daily'}</SelectItem>
                  <SelectItem value="weekly">{language === 'fr' ? 'Hebdomadaire' : language === 'de' ? 'Wöchentlich' : 'Weekly'}</SelectItem>
                  <SelectItem value="monthly">{language === 'fr' ? 'Mensuelle' : language === 'de' ? 'Monatlich' : 'Monthly'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">
                {language === 'fr' ? 'Langue' : language === 'de' ? 'Sprache' : 'Language'}
              </Label>
              <Select value={formData.lang} onValueChange={(value: Language) => setFormData({ ...formData, lang: value })}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">
              {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
            </Label>
            <Select value={formData.status} onValueChange={(value: NewsletterSubscriptionStatus) => setFormData({ ...formData, status: value })}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">{language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active'}</SelectItem>
                <SelectItem value="paused">{language === 'fr' ? 'En pause' : language === 'de' ? 'Pausiert' : 'Paused'}</SelectItem>
                <SelectItem value="unsubscribed">{language === 'fr' ? 'Désabonné' : language === 'de' ? 'Abgemeldet' : 'Unsubscribed'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Topics */}
          <div className="space-y-3">
            <Label>
              {language === 'fr' ? 'Sujets d\'intérêt' : language === 'de' ? 'Interessengebiete' : 'Topics of Interest'}
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {allTopics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
                >
                  <Checkbox
                    id={`topic-${topic}`}
                    checked={formData.topics.includes(topic)}
                    onCheckedChange={() => handleTopicToggle(topic)}
                  />
                  <label
                    htmlFor={`topic-${topic}`}
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {tLocal(getNewsletterTopicLabel(topic))}
                  </label>
                </div>
              ))}
            </div>
            {formData.topics.length === 0 && (
              <p className="text-sm text-red-500">
                {language === 'fr'
                  ? 'Veuillez sélectionner au moins un sujet'
                  : language === 'de'
                  ? 'Bitte wählen Sie mindestens ein Thema aus'
                  : 'Please select at least one topic'}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              <X className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading
                ? language === 'fr'
                  ? 'Ajout en cours...'
                  : language === 'de'
                  ? 'Wird hinzugefügt...'
                  : 'Adding...'
                : language === 'fr'
                ? 'Ajouter'
                : language === 'de'
                ? 'Hinzufügen'
                : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface EditSubscriberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriber: NewsletterSubscriptionDTO | null;
  onSuccess?: () => void;
}

export function EditSubscriberDialog({
  open,
  onOpenChange,
  subscriber,
  onSuccess,
}: EditSubscriberDialogProps) {
  const { language, tLocal } = useLanguage();
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    frequency: 'weekly' as NewsletterFrequency,
    lang: 'fr' as Language,
    topics: [] as NewsletterTopicType[],
    status: 'active' as NewsletterSubscriptionStatus,
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

  // Initialize form when subscriber changes
  useEffect(() => {
    if (subscriber) {
      setFormData({
        email: subscriber.email,
        firstName: subscriber.firstName || '',
        lastName: subscriber.lastName || '',
        frequency: subscriber.frequency,
        lang: subscriber.language,
        topics: subscriber.topics,
        status: subscriber.status,
      });
    }
  }, [subscriber]);

  const handleTopicToggle = (topic: NewsletterTopicType) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || formData.topics.length === 0) {
      toast.error(
        language === 'fr'
          ? 'Veuillez remplir tous les champs requis'
          : language === 'de'
          ? 'Bitte füllen Sie alle erforderlichen Felder aus'
          : 'Please fill in all required fields'
      );
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Updating subscriber:', subscriber?.id, formData);
      
      toast.success(
        language === 'fr'
          ? `Abonné ${formData.email} modifié avec succès`
          : language === 'de'
          ? `Abonnent ${formData.email} erfolgreich aktualisiert`
          : `Subscriber ${formData.email} updated successfully`
      );

      setLoading(false);
      onOpenChange(false);
      onSuccess?.();
    }, 1000);
  };

  if (!subscriber) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            {language === 'fr' ? 'Modifier l\'abonné' : language === 'de' ? 'Abonnent bearbeiten' : 'Edit Subscriber'}
          </DialogTitle>
          <DialogDescription>{subscriber.email}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="required">
              {language === 'fr' ? 'Adresse email' : language === 'de' ? 'E-Mail-Adresse' : 'Email Address'}
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                {language === 'fr' ? 'Prénom' : language === 'de' ? 'Vorname' : 'First Name'}
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                {language === 'fr' ? 'Nom' : language === 'de' ? 'Nachname' : 'Last Name'}
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          {/* Frequency & Language */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">
                {language === 'fr' ? 'Fréquence' : language === 'de' ? 'Häufigkeit' : 'Frequency'}
              </Label>
              <Select value={formData.frequency} onValueChange={(value: NewsletterFrequency) => setFormData({ ...formData, frequency: value })}>
                <SelectTrigger id="frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">{language === 'fr' ? 'Quotidienne' : language === 'de' ? 'Täglich' : 'Daily'}</SelectItem>
                  <SelectItem value="weekly">{language === 'fr' ? 'Hebdomadaire' : language === 'de' ? 'Wöchentlich' : 'Weekly'}</SelectItem>
                  <SelectItem value="monthly">{language === 'fr' ? 'Mensuelle' : language === 'de' ? 'Monatlich' : 'Monthly'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">
                {language === 'fr' ? 'Langue' : language === 'de' ? 'Sprache' : 'Language'}
              </Label>
              <Select value={formData.lang} onValueChange={(value: Language) => setFormData({ ...formData, lang: value })}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">
              {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
            </Label>
            <Select value={formData.status} onValueChange={(value: NewsletterSubscriptionStatus) => setFormData({ ...formData, status: value })}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">{language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active'}</SelectItem>
                <SelectItem value="paused">{language === 'fr' ? 'En pause' : language === 'de' ? 'Pausiert' : 'Paused'}</SelectItem>
                <SelectItem value="unsubscribed">{language === 'fr' ? 'Désabonné' : language === 'de' ? 'Abgemeldet' : 'Unsubscribed'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Topics */}
          <div className="space-y-3">
            <Label>
              {language === 'fr' ? 'Sujets d\'intérêt' : language === 'de' ? 'Interessengebiete' : 'Topics of Interest'}
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {allTopics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
                >
                  <Checkbox
                    id={`topic-edit-${topic}`}
                    checked={formData.topics.includes(topic)}
                    onCheckedChange={() => handleTopicToggle(topic)}
                  />
                  <label
                    htmlFor={`topic-edit-${topic}`}
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {tLocal(getNewsletterTopicLabel(topic))}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              <X className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading
                ? language === 'fr'
                  ? 'Enregistrement...'
                  : language === 'de'
                  ? 'Wird gespeichert...'
                  : 'Saving...'
                : language === 'fr'
                ? 'Enregistrer'
                : language === 'de'
                ? 'Speichern'
                : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}