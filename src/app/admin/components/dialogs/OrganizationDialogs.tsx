import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
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
import { toast } from 'sonner';
import { Building2, Upload, MapPin } from 'lucide-react';

interface EditOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization: {
    id: string;
    name: string;
    description: string;
    logo?: string;
    email: string;
    phone: string;
    website?: string;
    address: string;
  };
  onSave: (org: any) => void;
}

export function EditOrganizationDialog({
  open,
  onOpenChange,
  organization,
  onSave
}: EditOrganizationDialogProps) {
  const [formData, setFormData] = useState(organization);
  const [logoPreview, setLogoPreview] = useState(organization.logo);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, logo: logoPreview });
    toast.success('Organisation mise à jour avec succès');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Modifier le profil de l'organisation
          </DialogTitle>
          <DialogDescription>
            Modifiez les informations générales de votre organisation
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Logo */}
            <div className="space-y-2">
              <Label>Logo de l'organisation</Label>
              <div className="flex items-center gap-4">
                {logoPreview && (
                  <div className="w-24 h-24 rounded-lg border-2 border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50">
                    <img 
                      src={logoPreview} 
                      alt="Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format recommandé : PNG ou SVG (max. 2MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Nom */}
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'organisation *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Ville de Genève"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez votre organisation..."
                rows={4}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email de contact *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@organisation.ch"
                required
              />
            </div>

            {/* Téléphone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+41 22 123 45 67"
              />
            </div>

            {/* Site web */}
            <div className="space-y-2">
              <Label htmlFor="website">Site web</Label>
              <Input
                id="website"
                type="url"
                value={formData.website || ''}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://www.organisation.ch"
              />
            </div>

            {/* Adresse */}
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Rue, code postal, ville"
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface TerritoryElementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  element?: {
    id: string;
    name: string;
    type: 'street' | 'avenue' | 'park' | 'square';
    description?: string;
  };
  onSave: (element: any) => void;
}

export function TerritoryElementDialog({
  open,
  onOpenChange,
  element,
  onSave
}: TerritoryElementDialogProps) {
  const [formData, setFormData] = useState(element || {
    name: '',
    type: 'street' as const,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast.success(
      element 
        ? 'Élément du territoire mis à jour' 
        : 'Élément du territoire ajouté avec succès'
    );
    onOpenChange(false);
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      street: 'Rue',
      avenue: 'Avenue',
      park: 'Parc / Jardin',
      square: 'Place'
    };
    return labels[type] || type;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {element ? 'Modifier l\'élément' : 'Ajouter un élément du territoire'}
          </DialogTitle>
          <DialogDescription>
            {element 
              ? 'Modifiez les informations de cet élément du territoire'
              : 'Ajoutez un nouvel élément à votre territoire'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Type d'élément *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="street">Rue</SelectItem>
                  <SelectItem value="avenue">Avenue</SelectItem>
                  <SelectItem value="park">Parc / Jardin</SelectItem>
                  <SelectItem value="square">Place</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nom */}
            <div className="space-y-2">
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={`Ex: ${formData.type === 'street' ? 'Rue de la Paix' : formData.type === 'avenue' ? 'Avenue des Champs' : formData.type === 'park' ? 'Parc Central' : 'Place de la République'}`}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (optionnel)</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ajoutez des informations complémentaires..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              {element ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
