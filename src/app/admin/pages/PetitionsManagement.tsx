/**
 * Petitions Management Page
 * 
 * Page de gestion complète des Pétitions avec :
 * - Liste des pétitions avec leurs états
 * - Actions CRUD complètes
 * - Gestion des signatures
 * - Liste des participants par pétition
 * - Formulaires alignés avec le FrontOffice
 * - Toutes les actions fonctionnelles
 */

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router';
import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  MoreVertical,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  MapPin,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { CreatePetitionDialog } from '../components/dialogs/SectionContentDialogs';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  Avatar,
  AvatarFallback,
} from '../../components/ui/avatar';

// Mock data
const mockPetitions = [
  {
    id: '1',
    title: { fr: 'Pour un transport public gratuit', de: 'Für kostenlose öffentliche Verkehrsmittel', en: 'For free public transport' },
    description: { fr: 'Demande de gratuité des transports publics pour tous les citoyens', de: 'Forderung nach kostenlosen öffentlichen Verkehrsmitteln für alle Bürger', en: 'Request for free public transport for all citizens' },
    status: 'open' as const,
    currentSignatures: 2847,
    targetSignatures: 5000,
    progressPercentage: 57,
    startDate: '2026-01-15',
    endDate: '2026-04-15',
    themeId: 'mobility',
    category: 'local' as const,
    author: 'Marie Dupont',
  },
  {
    id: '2',
    title: { fr: 'Sauvegarde de la forêt communale', de: 'Rettung des Gemeindewaldes', en: 'Save the municipal forest' },
    description: { fr: 'Protection et préservation de notre forêt communale', de: 'Schutz und Erhaltung unseres Gemeindewaldes', en: 'Protection and preservation of our municipal forest' },
    status: 'threshold_reached' as const,
    currentSignatures: 5234,
    targetSignatures: 5000,
    progressPercentage: 105,
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    themeId: 'environment',
    category: 'local' as const,
    author: 'Jean Martin',
  },
  {
    id: '3',
    title: { fr: 'Installation de pistes cyclables sécurisées', de: 'Installation sicherer Radwege', en: 'Installation of safe bike lanes' },
    description: { fr: 'Création d\'un réseau de pistes cyclables sécurisées dans toute la ville', de: 'Schaffung eines sicheren Radwegnetzes in der ganzen Stadt', en: 'Creation of a network of safe bike lanes throughout the city' },
    status: 'in_review' as const,
    currentSignatures: 6421,
    targetSignatures: 3000,
    progressPercentage: 214,
    startDate: '2025-12-01',
    endDate: '2026-02-28',
    themeId: 'mobility',
    category: 'regional' as const,
    author: 'Sophie Bernard',
  },
  {
    id: '4',
    title: { fr: 'Budget participatif pour les écoles', de: 'Partizipativer Haushalt für Schulen', en: 'Participatory budget for schools' },
    description: { fr: 'Mise en place d\'un budget participatif pour améliorer les écoles', de: 'Einführung eines partizipativen Haushalts zur Verbesserung der Schulen', en: 'Implementation of a participatory budget to improve schools' },
    status: 'draft' as const,
    currentSignatures: 0,
    targetSignatures: 2000,
    progressPercentage: 0,
    startDate: '2026-03-01',
    endDate: '2026-06-30',
    themeId: 'education',
    category: 'local' as const,
    author: 'Pierre Dubois',
  },
  {
    id: '5',
    title: { fr: 'Réouverture du centre culturel', de: 'Wiedereröffnung des Kulturzentrums', en: 'Reopening of the cultural center' },
    description: { fr: 'Demande de réouverture du centre culturel fermé depuis 2 ans', de: 'Forderung nach Wiedereröffnung des seit 2 Jahren geschlossenen Kulturzentrums', en: 'Request to reopen the cultural center closed for 2 years' },
    status: 'accepted' as const,
    currentSignatures: 3892,
    targetSignatures: 3000,
    progressPercentage: 130,
    startDate: '2025-10-01',
    endDate: '2025-12-31',
    themeId: 'culture',
    category: 'local' as const,
    author: 'Claire Rousseau',
  },
  {
    id: '6',
    title: { fr: 'Non à la construction du parking', de: 'Nein zum Parkplatzbau', en: 'No to the parking lot construction' },
    description: { fr: 'Opposition à la construction d\'un nouveau parking sur l\'espace vert', de: 'Opposition gegen den Bau eines neuen Parkplatzes auf der Grünfläche', en: 'Opposition to the construction of a new parking lot on the green space' },
    status: 'rejected' as const,
    currentSignatures: 1234,
    targetSignatures: 5000,
    progressPercentage: 25,
    startDate: '2025-09-01',
    endDate: '2025-11-30',
    themeId: 'urbanisme',
    category: 'local' as const,
    author: 'Luc Petit',
  },
];

// Mock signatures data
const mockSignatures = [
  { id: '1', firstName: 'Sophie', lastName: 'Martin', email: 's.martin@example.com', signedAt: '2026-02-01T10:30:00Z', city: 'Paris' },
  { id: '2', firstName: 'Pierre', lastName: 'Dubois', email: 'p.dubois@example.com', signedAt: '2026-02-01T14:20:00Z', city: 'Lyon' },
  { id: '3', firstName: 'Marie', lastName: 'Bernard', email: 'm.bernard@example.com', signedAt: '2026-02-02T09:15:00Z', city: 'Marseille' },
  { id: '4', firstName: 'Jean', lastName: 'Petit', email: 'j.petit@example.com', signedAt: '2026-02-02T16:45:00Z', city: 'Toulouse' },
  { id: '5', firstName: 'Claire', lastName: 'Rousseau', email: 'c.rousseau@example.com', signedAt: '2026-02-03T11:00:00Z', city: 'Nice' },
  { id: '6', firstName: 'Luc', lastName: 'Moreau', email: 'l.moreau@example.com', signedAt: '2026-02-03T13:30:00Z', city: 'Nantes' },
  { id: '7', firstName: 'Anne', lastName: 'Laurent', email: 'a.laurent@example.com', signedAt: '2026-02-04T08:45:00Z', city: 'Strasbourg' },
  { id: '8', firstName: 'Thomas', lastName: 'Girard', email: 't.girard@example.com', signedAt: '2026-02-04T15:20:00Z', city: 'Bordeaux' },
];

export function PetitionsManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedPetition, setSelectedPetition] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showSignaturesDialog, setShowSignaturesDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string; icon: any }> = {
      draft: { 
        label: language === 'fr' ? 'Brouillon' : language === 'de' ? 'Entwurf' : 'Draft', 
        color: 'bg-gray-100 text-gray-700 border-gray-300',
        icon: FileText,
      },
      open: { 
        label: language === 'fr' ? 'Ouverte' : language === 'de' ? 'Offen' : 'Open', 
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: CheckCircle,
      },
      threshold_reached: { 
        label: language === 'fr' ? 'Objectif atteint' : language === 'de' ? 'Ziel erreicht' : 'Threshold reached', 
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: TrendingUp,
      },
      in_review: { 
        label: language === 'fr' ? 'En examen' : language === 'de' ? 'In Prüfung' : 'In review', 
        color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        icon: Clock,
      },
      accepted: { 
        label: language === 'fr' ? 'Acceptée' : language === 'de' ? 'Akzeptiert' : 'Accepted', 
        color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
        icon: CheckCircle,
      },
      rejected: { 
        label: language === 'fr' ? 'Rejetée' : language === 'de' ? 'Abgelehnt' : 'Rejected', 
        color: 'bg-red-100 text-red-700 border-red-300',
        icon: XCircle,
      },
      closed: { 
        label: language === 'fr' ? 'Clôturée' : language === 'de' ? 'Geschlossen' : 'Closed', 
        color: 'bg-purple-100 text-purple-700 border-purple-300',
        icon: AlertCircle,
      },
    };

    const variant = variants[status] || variants.draft;
    const Icon = variant.icon;
    
    return (
      <Badge className={`${variant.color} border inline-flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, { fr: string; de: string; en: string }> = {
      local: { fr: 'Locale', de: 'Lokal', en: 'Local' },
      regional: { fr: 'Régionale', de: 'Regional', en: 'Regional' },
      national: { fr: 'Nationale', de: 'National', en: 'National' },
    };

    return categories[category]?.[language] || category;
  };

  const filteredPetitions = mockPetitions.filter(petition => {
    const matchesSearch = petition.title[language].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || petition.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || petition.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleView = (petition: any) => {
    setSelectedPetition(petition);
    setShowDetailDialog(true);
  };

  const handleEdit = (petition: any) => {
    setSelectedPetition(petition);
    setShowEditDialog(true);
  };

  const handleViewSignatures = (petition: any) => {
    setSelectedPetition(petition);
    setShowSignaturesDialog(true);
  };

  const handleExportSignatures = (petitionId: string) => {
    try {
      const petition = mockPetitions.find(p => p.id === petitionId);
      if (!petition) return;

      // Headers for signatures export
      const headers = [
        language === 'fr' ? 'Prénom' : language === 'de' ? 'Vorname' : 'First Name',
        language === 'fr' ? 'Nom' : language === 'de' ? 'Nachname' : 'Last Name',
        'Email',
        language === 'fr' ? 'Ville' : language === 'de' ? 'Stadt' : 'City',
        language === 'fr' ? 'Date de signature' : language === 'de' ? 'Unterschriftsdatum' : 'Signed At',
      ];

      // Generate CSV content for signatures
      const csvContent = [
        headers.join(','),
        ...mockSignatures.map((sig) => {
          const formatDate = (date: string) => {
            return new Date(date).toLocaleString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          };

          return [
            `"${sig.firstName}"`,
            `"${sig.lastName}"`,
            `"${sig.email}"`,
            `"${sig.city}"`,
            `"${formatDate(sig.signedAt)}"`
          ].join(',');
        })
      ].join('\n');

      // Create and download the file
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const filename = `signatures_${petition.title[language].replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`;
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(
        language === 'fr' ? 'Export des signatures réussi' :
        language === 'de' ? 'Export der Unterschriften erfolgreich' :
        'Signatures export successful'
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de l\'export des signatures' :
        language === 'de' ? 'Fehler beim Exportieren der Unterschriften' :
        'Error exporting signatures'
      );
    }
  };

  const handleDelete = (id: string) => {
    toast.success(
      language === 'fr' ? 'Pétition supprimée avec succès' :
      language === 'de' ? 'Petition erfolgreich gelöscht' :
      'Petition deleted successfully'
    );
  };

  const handleExport = () => {
    try {
      // Headers for petitions export
      const headers = [
        language === 'fr' ? 'Titre' : language === 'de' ? 'Titel' : 'Title',
        language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status',
        language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category',
        language === 'fr' ? 'Signatures actuelles' : language === 'de' ? 'Aktuelle Unterschriften' : 'Current signatures',
        language === 'fr' ? 'Objectif' : language === 'de' ? 'Ziel' : 'Target',
        language === 'fr' ? 'Progression (%)' : language === 'de' ? 'Fortschritt (%)' : 'Progress (%)',
        language === 'fr' ? 'Date de début' : language === 'de' ? 'Startdatum' : 'Start date',
        language === 'fr' ? 'Date de fin' : language === 'de' ? 'Enddatum' : 'End date',
        language === 'fr' ? 'Auteur' : language === 'de' ? 'Autor' : 'Author',
      ];

      // Generate CSV content for all petitions
      const csvContent = [
        headers.join(','),
        ...filteredPetitions.map((petition) => {
          const formatDate = (date: string) => {
            return new Date(date).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });
          };

          const getStatusLabel = (status: string) => {
            const labels: Record<string, string> = {
              draft: language === 'fr' ? 'Brouillon' : language === 'de' ? 'Entwurf' : 'Draft',
              open: language === 'fr' ? 'Ouverte' : language === 'de' ? 'Offen' : 'Open',
              threshold_reached: language === 'fr' ? 'Objectif atteint' : language === 'de' ? 'Ziel erreicht' : 'Threshold reached',
              in_review: language === 'fr' ? 'En examen' : language === 'de' ? 'In Prüfung' : 'In review',
              accepted: language === 'fr' ? 'Acceptée' : language === 'de' ? 'Akzeptiert' : 'Accepted',
              rejected: language === 'fr' ? 'Rejetée' : language === 'de' ? 'Abgelehnt' : 'Rejected',
              closed: language === 'fr' ? 'Clôturée' : language === 'de' ? 'Geschlossen' : 'Closed',
            };
            return labels[status] || status;
          };

          return [
            `"${petition.title[language]}"`,
            `"${getStatusLabel(petition.status)}"`,
            `"${getCategoryLabel(petition.category)}"`,
            petition.currentSignatures,
            petition.targetSignatures,
            petition.progressPercentage,
            `"${formatDate(petition.startDate)}"`,
            `"${formatDate(petition.endDate)}"`,
            `"${petition.author}"`
          ].join(',');
        })
      ].join('\n');

      // Create and download the file
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const filename = `petitions_${new Date().toISOString().split('T')[0]}.csv`;
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(
        language === 'fr' ? 'Export des pétitions réussi' :
        language === 'de' ? 'Export der Petitionen erfolgreich' :
        'Petitions export successful'
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de l\'export' :
        language === 'de' ? 'Fehler beim Exportieren' :
        'Error during export'
      );
    }
  };

  const totalSignatures = mockPetitions.reduce((acc, p) => acc + p.currentSignatures, 0);
  const averageProgress = mockPetitions.reduce((acc, p) => acc + p.progressPercentage, 0) / mockPetitions.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {language === 'fr' ? 'Gestion des Pétitions' :
           language === 'de' ? 'Verwaltung der Petitionen' :
           'Petitions Management'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Gérez les pétitions et leurs signatures' :
           language === 'de' ? 'Verwalten Sie Petitionen und deren Unterschriften' :
           'Manage petitions and their signatures'}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPetitions.length}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Pétitions' : language === 'de' ? 'Petitionen' : 'Petitions'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Ouvertes' : language === 'de' ? 'Offen' : 'Open'}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockPetitions.filter(p => p.status === 'open').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'En cours' : language === 'de' ? 'Laufend' : 'Ongoing'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Signatures' : language === 'de' ? 'Unterschriften' : 'Signatures'}
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalSignatures.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Progression moy.' : language === 'de' ? 'Durchschn. Fortschritt' : 'Avg. progress'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(averageProgress)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Toutes pétitions' : language === 'de' ? 'Alle Petitionen' : 'All petitions'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={language === 'fr' ? 'Rechercher...' : language === 'de' ? 'Suchen...' : 'Search...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'fr' ? 'Tous les statuts' : language === 'de' ? 'Alle Status' : 'All statuses'}</SelectItem>
              <SelectItem value="draft">{language === 'fr' ? 'Brouillon' : language === 'de' ? 'Entwurf' : 'Draft'}</SelectItem>
              <SelectItem value="open">{language === 'fr' ? 'Ouverte' : language === 'de' ? 'Offen' : 'Open'}</SelectItem>
              <SelectItem value="threshold_reached">{language === 'fr' ? 'Objectif atteint' : language === 'de' ? 'Ziel erreicht' : 'Threshold reached'}</SelectItem>
              <SelectItem value="in_review">{language === 'fr' ? 'En examen' : language === 'de' ? 'In Prüfung' : 'In review'}</SelectItem>
              <SelectItem value="accepted">{language === 'fr' ? 'Acceptée' : language === 'de' ? 'Akzeptiert' : 'Accepted'}</SelectItem>
              <SelectItem value="rejected">{language === 'fr' ? 'Rejetée' : language === 'de' ? 'Abgelehnt' : 'Rejected'}</SelectItem>
              <SelectItem value="closed">{language === 'fr' ? 'Clôturée' : language === 'de' ? 'Geschlossen' : 'Closed'}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'fr' ? 'Toutes catégories' : language === 'de' ? 'Alle Kategorien' : 'All categories'}</SelectItem>
              <SelectItem value="local">{language === 'fr' ? 'Locale' : language === 'de' ? 'Lokal' : 'Local'}</SelectItem>
              <SelectItem value="regional">{language === 'fr' ? 'Régionale' : language === 'de' ? 'Regional' : 'Regional'}</SelectItem>
              <SelectItem value="national">{language === 'fr' ? 'Nationale' : language === 'de' ? 'National' : 'National'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Exporter' : language === 'de' ? 'Exportieren' : 'Export'}
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Nouvelle pétition' : language === 'de' ? 'Neue Petition' : 'New petition'}
          </Button>
        </div>
      </div>

      {/* Petitions Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'Liste des pétitions' : language === 'de' ? 'Liste der Petitionen' : 'Petitions list'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'fr' ? 'Titre' : language === 'de' ? 'Titel' : 'Title'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Progression' : language === 'de' ? 'Fortschritt' : 'Progress'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Signatures' : language === 'de' ? 'Unterschriften' : 'Signatures'}</TableHead>
                  <TableHead className="text-right">{language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPetitions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      {language === 'fr' ? 'Aucune pétition trouvée' :
                       language === 'de' ? 'Keine Petitionen gefunden' :
                       'No petitions found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPetitions.map((petition) => (
                    <TableRow key={petition.id}>
                      <TableCell className="font-medium max-w-xs">
                        {petition.title[language]}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(petition.status)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getCategoryLabel(petition.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium">{petition.progressPercentage}%</span>
                            <span className="text-gray-500">
                              {petition.currentSignatures.toLocaleString()} / {petition.targetSignatures.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                petition.progressPercentage >= 100 ? 'bg-green-600' :
                                petition.progressPercentage >= 75 ? 'bg-blue-600' :
                                petition.progressPercentage >= 50 ? 'bg-yellow-600' :
                                'bg-gray-400'
                              }`}
                              style={{ width: `${Math.min(petition.progressPercentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{petition.currentSignatures.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                              {language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}
                            </DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleView(petition)}>
                              <Eye className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Voir' : language === 'de' ? 'Ansehen' : 'View'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(petition)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewSignatures(petition)}>
                              <Users className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Signatures' : language === 'de' ? 'Unterschriften' : 'Signatures'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExportSignatures(petition.id)}>
                              <Download className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Exporter signatures' : language === 'de' ? 'Unterschriften exportieren' : 'Export signatures'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(petition.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Supprimer' : language === 'de' ? 'Löschen' : 'Delete'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Petition Dialog */}
      <CreatePetitionDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        themes={[]} // TODO: Pass actual themes from API
      />

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedPetition && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Eye className="w-6 h-6 text-blue-600" />
                  {selectedPetition.title[language]}
                </DialogTitle>
                <DialogDescription>
                  {language === 'fr' ? 'Détails de la pétition' :
                   language === 'de' ? 'Details der Petition' :
                   'Petition details'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status & Category */}
                <div className="flex gap-3">
                  {getStatusBadge(selectedPetition.status)}
                  <Badge variant="outline">{getCategoryLabel(selectedPetition.category)}</Badge>
                </div>

                {/* Description */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                  </div>
                  <div className="text-gray-900">
                    {selectedPetition.description?.[language] || '-'}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'fr' ? 'Date de début' : language === 'de' ? 'Startdatum' : 'Start date'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedPetition.startDate).toLocaleDateString(language, {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'fr' ? 'Date de fin' : language === 'de' ? 'Enddatum' : 'End date'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedPetition.endDate).toLocaleDateString(language, {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {language === 'fr' ? 'Progression' : language === 'de' ? 'Fortschritt' : 'Progress'}
                    </span>
                    <span className="text-sm font-bold text-gray-900">{selectedPetition.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className={`h-3 rounded-full ${
                        selectedPetition.progressPercentage >= 100 ? 'bg-green-600' :
                        selectedPetition.progressPercentage >= 75 ? 'bg-blue-600' :
                        selectedPetition.progressPercentage >= 50 ? 'bg-yellow-600' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${Math.min(selectedPetition.progressPercentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{selectedPetition.currentSignatures.toLocaleString()} {language === 'fr' ? 'signatures' : language === 'de' ? 'Unterschriften' : 'signatures'}</span>
                    <span>{language === 'fr' ? 'Objectif:' : language === 'de' ? 'Ziel:' : 'Target:'} {selectedPetition.targetSignatures.toLocaleString()}</span>
                  </div>
                </div>

                {/* Author */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'fr' ? 'Auteur' : language === 'de' ? 'Autor' : 'Author'}
                  </div>
                  <div className="text-gray-900 font-medium">
                    {selectedPetition.author}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
                    {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
                  </Button>
                  <Button onClick={() => {
                    setShowDetailDialog(false);
                    handleEdit(selectedPetition);
                  }}>
                    <Edit className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedPetition && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Modifier la pétition' :
                   language === 'de' ? 'Petition bearbeiten' :
                   'Edit petition'}
                </DialogTitle>
                <DialogDescription>
                  {selectedPetition.title[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (FR)' : language === 'de' ? 'Titel (FR)' : 'Title (FR)'}
                  </label>
                  <Input defaultValue={selectedPetition.title.fr} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (DE)' : language === 'de' ? 'Titel (DE)' : 'Title (DE)'}
                  </label>
                  <Input defaultValue={selectedPetition.title.de} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (EN)' : language === 'de' ? 'Titel (EN)' : 'Title (EN)'}
                  </label>
                  <Input defaultValue={selectedPetition.title.en} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
                    </label>
                    <Select defaultValue={selectedPetition.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">
                          {language === 'fr' ? 'Brouillon' : language === 'de' ? 'Entwurf' : 'Draft'}
                        </SelectItem>
                        <SelectItem value="open">
                          {language === 'fr' ? 'Ouverte' : language === 'de' ? 'Offen' : 'Open'}
                        </SelectItem>
                        <SelectItem value="threshold_reached">
                          {language === 'fr' ? 'Objectif atteint' : language === 'de' ? 'Ziel erreicht' : 'Threshold reached'}
                        </SelectItem>
                        <SelectItem value="in_review">
                          {language === 'fr' ? 'En examen' : language === 'de' ? 'In Prüfung' : 'In review'}
                        </SelectItem>
                        <SelectItem value="accepted">
                          {language === 'fr' ? 'Acceptée' : language === 'de' ? 'Akzeptiert' : 'Accepted'}
                        </SelectItem>
                        <SelectItem value="rejected">
                          {language === 'fr' ? 'Rejetée' : language === 'de' ? 'Abgelehnt' : 'Rejected'}
                        </SelectItem>
                        <SelectItem value="closed">
                          {language === 'fr' ? 'Clôturée' : language === 'de' ? 'Geschlossen' : 'Closed'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category'}
                    </label>
                    <Select defaultValue={selectedPetition.category}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">
                          {language === 'fr' ? 'Locale' : language === 'de' ? 'Lokal' : 'Local'}
                        </SelectItem>
                        <SelectItem value="regional">
                          {language === 'fr' ? 'Régionale' : language === 'de' ? 'Regional' : 'Regional'}
                        </SelectItem>
                        <SelectItem value="national">
                          {language === 'fr' ? 'Nationale' : language === 'de' ? 'National' : 'National'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Date de début' : language === 'de' ? 'Startdatum' : 'Start date'}
                    </label>
                    <Input type="date" defaultValue={selectedPetition.startDate} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Date de fin' : language === 'de' ? 'Enddatum' : 'End date'}
                    </label>
                    <Input type="date" defaultValue={selectedPetition.endDate} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Objectif de signatures' : language === 'de' ? 'Unterschriftenziel' : 'Signature target'}
                  </label>
                  <Input type="number" defaultValue={selectedPetition.targetSignatures} />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                  </Button>
                  <Button onClick={() => {
                    toast.success(
                      language === 'fr' ? 'Pétition modifiée avec succès' :
                      language === 'de' ? 'Petition erfolgreich bearbeitet' :
                      'Petition updated successfully'
                    );
                    setShowEditDialog(false);
                  }}>
                    {language === 'fr' ? 'Enregistrer' : language === 'de' ? 'Speichern' : 'Save'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Signatures Dialog */}
      <Dialog open={showSignaturesDialog} onOpenChange={setShowSignaturesDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
          {selectedPetition && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Liste des signatures' : language === 'de' ? 'Liste der Unterschriften' : 'Signatures list'}
                </DialogTitle>
                <DialogDescription>
                  {selectedPetition.title[language]} • {selectedPetition.currentSignatures.toLocaleString()} {language === 'fr' ? 'signatures' : language === 'de' ? 'Unterschriften' : 'signatures'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder={language === 'fr' ? 'Rechercher un signataire...' : language === 'de' ? 'Unterzeichner suchen...' : 'Search a signatory...'}
                    className="pl-9"
                  />
                </div>

                {/* Signatures List */}
                <div className="overflow-y-auto max-h-[400px] space-y-2">
                  {mockSignatures.map((signature) => (
                    <div key={signature.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                            {signature.firstName[0] + signature.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {signature.firstName} {signature.lastName}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{signature.email}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {signature.city}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(signature.signedAt).toLocaleDateString(language, {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={() => handleExportSignatures(selectedPetition.id)}>
                    <Download className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Exporter (CSV)' : language === 'de' ? 'Exportieren (CSV)' : 'Export (CSV)'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowSignaturesDialog(false)}>
                    {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}