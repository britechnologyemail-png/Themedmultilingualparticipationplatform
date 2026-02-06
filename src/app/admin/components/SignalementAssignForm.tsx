/**
 * Assign Signalement Form Component
 * Composant de formulaire d'assignation de signalement réutilisable
 */

import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { User } from 'lucide-react';

interface SignalementAssignFormProps {
  signalement: any;
  language: 'fr' | 'de' | 'en';
  services: { id: string; name: string }[];
  onAssign: (signalementId: string, serviceName: string) => void;
  onCancel: () => void;
}

export function SignalementAssignForm({
  signalement,
  language,
  services,
  onAssign,
  onCancel,
}: SignalementAssignFormProps) {
  const [selectedService, setSelectedService] = useState<string>(
    signalement.assignedTo || ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService) {
      onAssign(signalement.id, selectedService);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr'
            ? 'Service responsable'
            : language === 'de'
            ? 'Verantwortlicher Dienst'
            : 'Responsible service'}
        </label>
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger>
            <SelectValue
              placeholder={
                language === 'fr'
                  ? 'Sélectionner un service...'
                  : language === 'de'
                  ? 'Dienst auswählen...'
                  : 'Select a service...'
              }
            />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.id} value={service.name}>
                {service.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-500 mb-1">
          {language === 'fr'
            ? 'Assignation actuelle'
            : language === 'de'
            ? 'Aktuelle Zuweisung'
            : 'Current assignment'}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <User className="w-4 h-4" />
          {signalement.assignedTo || (
            <span className="text-gray-400 italic">
              {language === 'fr'
                ? 'Non assigné'
                : language === 'de'
                ? 'Nicht zugewiesen'
                : 'Unassigned'}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
        </Button>
        <Button type="submit" disabled={!selectedService}>
          {language === 'fr' ? 'Assigner' : language === 'de' ? 'Zuweisen' : 'Assign'}
        </Button>
      </div>
    </form>
  );
}
