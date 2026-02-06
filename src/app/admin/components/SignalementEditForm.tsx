/**
 * Edit Signalement Form Component
 * Composant de formulaire d'édition de signalement réutilisable
 */

import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

interface SignalementEditFormProps {
  signalement: any;
  language: 'fr' | 'de' | 'en';
  onSave: (updated: any) => void;
  onCancel: () => void;
  getCategoryLabel: (category: string) => string;
}

export function SignalementEditForm({
  signalement,
  language,
  onSave,
  onCancel,
  getCategoryLabel,
}: SignalementEditFormProps) {
  const [status, setStatus] = useState(signalement.status);
  const [category, setCategory] = useState(signalement.category);
  const [priority, setPriority] = useState(signalement.priority);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedSignalement = {
      ...signalement,
      title: {
        fr: formData.get('title_fr') as string,
        de: formData.get('title_de') as string,
        en: formData.get('title_en') as string,
      },
      description: {
        fr: formData.get('description_fr') as string,
        de: formData.get('description_de') as string,
        en: formData.get('description_en') as string,
      },
      location: formData.get('location') as string,
      status,
      category,
      priority,
    };

    onSave(updatedSignalement);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Titre FR */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Titre (FR)' : language === 'de' ? 'Titel (FR)' : 'Title (FR)'}
        </label>
        <Input name="title_fr" defaultValue={signalement.title.fr} required />
      </div>

      {/* Titre DE */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Titre (DE)' : language === 'de' ? 'Titel (DE)' : 'Title (DE)'}
        </label>
        <Input name="title_de" defaultValue={signalement.title.de} required />
      </div>

      {/* Titre EN */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Titre (EN)' : language === 'de' ? 'Titel (EN)' : 'Title (EN)'}
        </label>
        <Input name="title_en" defaultValue={signalement.title.en} required />
      </div>

      {/* Description FR */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Description (FR)' : language === 'de' ? 'Beschreibung (FR)' : 'Description (FR)'}
        </label>
        <Textarea name="description_fr" defaultValue={signalement.description.fr} required rows={3} />
      </div>

      {/* Description DE */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Description (DE)' : language === 'de' ? 'Beschreibung (DE)' : 'Description (DE)'}
        </label>
        <Textarea name="description_de" defaultValue={signalement.description.de} required rows={3} />
      </div>

      {/* Description EN */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Description (EN)' : language === 'de' ? 'Beschreibung (EN)' : 'Description (EN)'}
        </label>
        <Textarea name="description_en" defaultValue={signalement.description.en} required rows={3} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Catégorie */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category'}
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="road">{getCategoryLabel('road')}</SelectItem>
              <SelectItem value="lighting">{getCategoryLabel('lighting')}</SelectItem>
              <SelectItem value="waste">{getCategoryLabel('waste')}</SelectItem>
              <SelectItem value="noise">{getCategoryLabel('noise')}</SelectItem>
              <SelectItem value="vandalism">{getCategoryLabel('vandalism')}</SelectItem>
              <SelectItem value="vegetation">{getCategoryLabel('vegetation')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Statut */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
          </label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">
                {language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending'}
              </SelectItem>
              <SelectItem value="in_progress">
                {language === 'fr' ? 'En cours' : language === 'de' ? 'In Bearbeitung' : 'In progress'}
              </SelectItem>
              <SelectItem value="resolved">
                {language === 'fr' ? 'Résolu' : language === 'de' ? 'Gelöst' : 'Resolved'}
              </SelectItem>
              <SelectItem value="rejected">
                {language === 'fr' ? 'Rejeté' : language === 'de' ? 'Abgelehnt' : 'Rejected'}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Priorité */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Priorité' : language === 'de' ? 'Priorität' : 'Priority'}
        </label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">
              {language === 'fr' ? 'Faible' : language === 'de' ? 'Niedrig' : 'Low'}
            </SelectItem>
            <SelectItem value="medium">
              {language === 'fr' ? 'Moyenne' : language === 'de' ? 'Mittel' : 'Medium'}
            </SelectItem>
            <SelectItem value="high">
              {language === 'fr' ? 'Élevée' : language === 'de' ? 'Hoch' : 'High'}
            </SelectItem>
            <SelectItem value="urgent">
              {language === 'fr' ? 'Urgente' : language === 'de' ? 'Dringend' : 'Urgent'}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lieu */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Lieu' : language === 'de' ? 'Ort' : 'Location'}
        </label>
        <Input name="location" defaultValue={signalement.location} required />
      </div>

      {/* Boutons */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
        </Button>
        <Button type="submit">
          {language === 'fr' ? 'Enregistrer' : language === 'de' ? 'Speichern' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
