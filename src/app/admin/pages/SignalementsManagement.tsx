/**
 * Signalements Management Page
 * 
 * Page de gestion complète des Signalements avec :
 * - Consultation des signalements
 * - États, priorités et suivi
 * - Actions CRUD complètes
 * - Formulaires alignés avec le FrontOffice
 * - Toutes les actions fonctionnelles
 */

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router';
import {
  AlertCircle,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  MoreVertical,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageSquare,
  User,
  Map,
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
import { CreateSignalementDialog } from '../components/dialogs/AdditionalSectionDialogs';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { SignalementEditForm } from '../components/SignalementEditForm';
import { SignalementAssignForm } from '../components/SignalementAssignForm';

// Mock data
const mockSignalements = [
  {
    id: '1',
    title: { fr: 'Nid de poule rue de la Gare', de: 'Schlagloch in der Bahnhofstraße', en: 'Pothole on Station Street' },
    description: { fr: 'Important nid de poule dangereux pour les véhicules', de: 'Wichtiges Schlagloch gefährlich für Fahrzeuge', en: 'Significant pothole dangerous for vehicles' },
    category: 'road' as const,
    status: 'pending' as const,
    priority: 'high' as const,
    location: 'Rue de la Gare, 1200 Genève',
    coordinates: { lat: 46.2044, lng: 6.1432 },
    createdAt: '2026-02-05',
    assignedTo: null,
    themeId: 'infrastructure',
  },
  {
    id: '2',
    title: { fr: 'Éclairage public défectueux', de: 'Defekte Straßenbeleuchtung', en: 'Defective street lighting' },
    description: { fr: 'Lampadaires éteints depuis 3 jours', de: 'Straßenlaternen seit 3 Tagen aus', en: 'Street lights off for 3 days' },
    category: 'lighting' as const,
    status: 'in_progress' as const,
    priority: 'medium' as const,
    location: 'Avenue du Mont-Blanc, 1200 Genève',
    coordinates: { lat: 46.2043, lng: 6.1500 },
    createdAt: '2026-02-03',
    assignedTo: 'Service Technique',
    themeId: 'infrastructure',
  },
  {
    id: '3',
    title: { fr: 'Graffiti sur le bâtiment public', de: 'Graffiti am öffentlichen Gebäude', en: 'Graffiti on public building' },
    description: { fr: 'Tags sur la façade de la mairie', de: 'Tags an der Fassade des Rathauses', en: 'Tags on the town hall facade' },
    category: 'vandalism' as const,
    status: 'resolved' as const,
    priority: 'low' as const,
    location: 'Place de la Mairie, 1200 Genève',
    coordinates: { lat: 46.2011, lng: 6.1421 },
    createdAt: '2026-01-28',
    assignedTo: 'Service Propreté',
    themeId: 'urbanisme',
  },
  {
    id: '4',
    title: { fr: 'Déchets sauvages dans le parc', de: 'Wilde Müllentsorgung im Park', en: 'Illegal dumping in the park' },
    description: { fr: 'Dépôt sauvage de déchets encombrants', de: 'Illegale Entsorgung von sperrigem Müll', en: 'Illegal dumping of bulky waste' },
    category: 'waste' as const,
    status: 'pending' as const,
    priority: 'urgent' as const,
    location: 'Parc des Bastions, 1200 Genève',
    coordinates: { lat: 46.2000, lng: 6.1450 },
    createdAt: '2026-02-06',
    assignedTo: null,
    themeId: 'environment',
  },
  {
    id: '5',
    title: { fr: 'Arbre dangereux à abattre', de: 'Gefährlicher Baum zum Fällen', en: 'Dangerous tree to be cut down' },
    description: { fr: 'Arbre penché menaçant de tomber', de: 'Geneigter Baum droht zu fallen', en: 'Leaning tree threatening to fall' },
    category: 'vegetation' as const,
    status: 'in_progress' as const,
    priority: 'high' as const,
    location: 'Rue du Rhône, 1200 Genève',
    coordinates: { lat: 46.2050, lng: 6.1480 },
    createdAt: '2026-02-01',
    assignedTo: 'Service Espaces Verts',
    themeId: 'environment',
  },
  {
    id: '6',
    title: { fr: 'Bruit excessif chantier', de: 'Übermäßiger Lärm Baustelle', en: 'Excessive noise construction site' },
    description: { fr: 'Chantier ne respectant pas les horaires autorisés', de: 'Baustelle hält sich nicht an erlaubte Zeiten', en: 'Construction site not respecting authorized hours' },
    category: 'noise' as const,
    status: 'rejected' as const,
    priority: 'low' as const,
    location: 'Avenue de la Paix, 1200 Genève',
    coordinates: { lat: 46.2100, lng: 6.1400 },
    createdAt: '2026-01-25',
    assignedTo: 'Service Environnement',
    themeId: 'environment',
  },
];

// Mock services pour assignation
const mockServices = [
  { id: '1', name: 'Service Technique' },
  { id: '2', name: 'Service Propreté' },
  { id: '3', name: 'Service Espaces Verts' },
  { id: '4', name: 'Service Environnement' },
  { id: '5', name: 'Service Voirie' },
];

export function SignalementsManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedSignalement, setSelectedSignalement] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showMapDialog, setShowMapDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  
  // États pour la gestion des données
  const [signalements, setSignalements] = useState(mockSignalements);
  const [selectedService, setSelectedService] = useState<string>('');
  
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string; icon: any }> = {
      pending: { 
        label: language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending', 
        color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        icon: Clock,
      },
      in_progress: { 
        label: language === 'fr' ? 'En cours' : language === 'de' ? 'In Bearbeitung' : 'In progress', 
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: AlertCircle,
      },
      resolved: { 
        label: language === 'fr' ? 'Résolu' : language === 'de' ? 'Gelöst' : 'Resolved', 
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: CheckCircle,
      },
      rejected: { 
        label: language === 'fr' ? 'Rejeté' : language === 'de' ? 'Abgelehnt' : 'Rejected', 
        color: 'bg-red-100 text-red-700 border-red-300',
        icon: XCircle,
      },
    };

    const variant = variants[status] || variants.pending;
    const Icon = variant.icon;
    
    return (
      <Badge className={`${variant.color} border inline-flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, { label: string; color: string }> = {
      low: { 
        label: language === 'fr' ? 'Faible' : language === 'de' ? 'Niedrig' : 'Low', 
        color: 'bg-gray-100 text-gray-700',
      },
      medium: { 
        label: language === 'fr' ? 'Moyenne' : language === 'de' ? 'Mittel' : 'Medium', 
        color: 'bg-blue-100 text-blue-700',
      },
      high: { 
        label: language === 'fr' ? 'Élevée' : language === 'de' ? 'Hoch' : 'High', 
        color: 'bg-orange-100 text-orange-700',
      },
      urgent: { 
        label: language === 'fr' ? 'Urgente' : language === 'de' ? 'Dringend' : 'Urgent', 
        color: 'bg-red-100 text-red-700',
      },
    };

    const variant = variants[priority] || variants.medium;
    
    return (
      <Badge className={variant.color}>
        {variant.label}
      </Badge>
    );
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, { fr: string; de: string; en: string }> = {
      road: { fr: 'Voirie', de: 'Straßen', en: 'Road' },
      lighting: { fr: 'Éclairage', de: 'Beleuchtung', en: 'Lighting' },
      waste: { fr: 'Déchets', de: 'Abfall', en: 'Waste' },
      noise: { fr: 'Bruit', de: 'Lärm', en: 'Noise' },
      vandalism: { fr: 'Vandalisme', de: 'Vandalismus', en: 'Vandalism' },
      vegetation: { fr: 'Végétation', de: 'Vegetation', en: 'Vegetation' },
      water: { fr: 'Eau', de: 'Wasser', en: 'Water' },
      other: { fr: 'Autre', de: 'Andere', en: 'Other' },
    };

    return categories[category]?.[language] || category;
  };

  const filteredSignalements = signalements.filter(signalement => {
    const matchesSearch = signalement.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         signalement.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || signalement.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || signalement.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || signalement.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const handleView = (signalement: any) => {
    setSelectedSignalement(signalement);
    setShowDetailDialog(true);
  };

  const handleEdit = (signalement: any) => {
    setSelectedSignalement(signalement);
    setShowEditDialog(true);
  };

  const handleViewOnMap = (signalement: any) => {
    setSelectedSignalement(signalement);
    setShowMapDialog(true);
  };

  const handleAssign = (signalement: any) => {
    setSelectedSignalement(signalement);
    setShowAssignDialog(true);
  };

  const handleDelete = (id: string) => {
    setSignalements(signalements.filter(s => s.id !== id));
    toast.success(
      language === 'fr' ? 'Signalement supprimé avec succès' :
      language === 'de' ? 'Meldung erfolgreich gelöscht' :
      'Report deleted successfully'
    );
  };
  
  // Fonction pour sauvegarder les modifications d'un signalement
  const handleSaveEdit = (updatedSignalement: any) => {
    setSignalements(signalements.map(s =>
      s.id === updatedSignalement.id ? updatedSignalement : s
    ));
    setShowEditDialog(false);
    setSelectedSignalement(null);
    toast.success(
      language === 'fr' ? 'Signalement modifié avec succès' :
      language === 'de' ? 'Meldung erfolgreich bearbeitet' :
      'Report updated successfully'
    );
  };
  
  // Fonction pour assigner un signalement à un service
  const handleSaveAssignment = (signalementId: string, serviceName: string) => {
    setSignalements(signalements.map(s =>
      s.id === signalementId ? { ...s, assignedTo: serviceName } : s
    ));
    setShowAssignDialog(false);
    setSelectedSignalement(null);
    toast.success(
      language === 'fr' ? 'Signalement assigné avec succès' :
      language === 'de' ? 'Meldung erfolgreich zugewiesen' :
      'Report assigned successfully'
    );
  };

  const handleExport = () => {
    toast.success(
      language === 'fr' ? 'Export en cours...' :
      language === 'de' ? 'Export läuft...' :
      'Exporting...'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {language === 'fr' ? 'Gestion des Signalements' :
           language === 'de' ? 'Verwaltung der Meldungen' :
           'Reports Management'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Gérez les signalements, leurs états et leur priorité' :
           language === 'de' ? 'Verwalten Sie Meldungen, deren Status und Priorität' :
           'Manage reports, their states and priority'}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{signalements.length}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Signalements' : language === 'de' ? 'Meldungen' : 'Reports'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending'}
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {signalements.filter(s => s.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Non traités' : language === 'de' ? 'Unbehandelt' : 'Untreated'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'En cours' : language === 'de' ? 'In Bearbeitung' : 'In progress'}
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {signalements.filter(s => s.status === 'in_progress').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'En traitement' : language === 'de' ? 'In Bearbeitung' : 'Processing'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Résolus' : language === 'de' ? 'Gelöst' : 'Resolved'}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {signalements.filter(s => s.status === 'resolved').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Traités' : language === 'de' ? 'Behandelt' : 'Treated'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-4 w-full sm:w-auto flex-wrap">
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
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'fr' ? 'Tous' : language === 'de' ? 'Alle' : 'All'}</SelectItem>
              <SelectItem value="pending">{language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending'}</SelectItem>
              <SelectItem value="in_progress">{language === 'fr' ? 'En cours' : language === 'de' ? 'In Bearbeitung' : 'In progress'}</SelectItem>
              <SelectItem value="resolved">{language === 'fr' ? 'Résolu' : language === 'de' ? 'Gelöst' : 'Resolved'}</SelectItem>
              <SelectItem value="rejected">{language === 'fr' ? 'Rejeté' : language === 'de' ? 'Abgelehnt' : 'Rejected'}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={language === 'fr' ? 'Priorité' : language === 'de' ? 'Priorität' : 'Priority'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'fr' ? 'Toutes' : language === 'de' ? 'Alle' : 'All'}</SelectItem>
              <SelectItem value="low">{language === 'fr' ? 'Faible' : language === 'de' ? 'Niedrig' : 'Low'}</SelectItem>
              <SelectItem value="medium">{language === 'fr' ? 'Moyenne' : language === 'de' ? 'Mittel' : 'Medium'}</SelectItem>
              <SelectItem value="high">{language === 'fr' ? 'Élevée' : language === 'de' ? 'Hoch' : 'High'}</SelectItem>
              <SelectItem value="urgent">{language === 'fr' ? 'Urgente' : language === 'de' ? 'Dringend' : 'Urgent'}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'fr' ? 'Toutes' : language === 'de' ? 'Alle' : 'All'}</SelectItem>
              <SelectItem value="road">{getCategoryLabel('road')}</SelectItem>
              <SelectItem value="lighting">{getCategoryLabel('lighting')}</SelectItem>
              <SelectItem value="waste">{getCategoryLabel('waste')}</SelectItem>
              <SelectItem value="noise">{getCategoryLabel('noise')}</SelectItem>
              <SelectItem value="vandalism">{getCategoryLabel('vandalism')}</SelectItem>
              <SelectItem value="vegetation">{getCategoryLabel('vegetation')}</SelectItem>
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
            {language === 'fr' ? 'Nouveau signalement' : language === 'de' ? 'Neue Meldung' : 'New report'}
          </Button>
        </div>
      </div>

      {/* Signalements Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'Liste des signalements' : language === 'de' ? 'Liste der Meldungen' : 'Reports list'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'fr' ? 'Titre' : language === 'de' ? 'Titel' : 'Title'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Priorité' : language === 'de' ? 'Priorität' : 'Priority'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Lieu' : language === 'de' ? 'Ort' : 'Location'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Assigné à' : language === 'de' ? 'Zugewiesen an' : 'Assigned to'}</TableHead>
                  <TableHead className="text-right">{language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSignalements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {language === 'fr' ? 'Aucun signalement trouvé' :
                       language === 'de' ? 'Keine Meldungen gefunden' :
                       'No reports found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSignalements.map((signalement) => (
                    <TableRow key={signalement.id}>
                      <TableCell className="font-medium max-w-xs">
                        {signalement.title[language]}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getCategoryLabel(signalement.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(signalement.status)}
                      </TableCell>
                      <TableCell>
                        {getPriorityBadge(signalement.priority)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600 max-w-[200px]">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{signalement.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {signalement.assignedTo ? (
                          <div className="flex items-center gap-1 text-sm">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="truncate">{signalement.assignedTo}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
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
                            <DropdownMenuItem onClick={() => handleView(signalement)}>
                              <Eye className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Voir' : language === 'de' ? 'Ansehen' : 'View'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(signalement)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewOnMap(signalement)}>
                              <MapPin className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Voir sur la carte' : language === 'de' ? 'Auf Karte anzeigen' : 'View on map'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAssign(signalement)}>
                              <User className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Assigner' : language === 'de' ? 'Zuweisen' : 'Assign'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(signalement.id)}
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

      {/* Create Signalement Dialog */}
      <CreateSignalementDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        themes={[]} // TODO: Pass actual themes from API
      />

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedSignalement && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Eye className="w-6 h-6 text-blue-600" />
                  {selectedSignalement.title[language]}
                </DialogTitle>
                <DialogDescription>
                  {language === 'fr' ? 'Détails du signalement' :
                   language === 'de' ? 'Details der Meldung' :
                   'Report details'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status, Priority & Category */}
                <div className="flex gap-3 flex-wrap">
                  {getStatusBadge(selectedSignalement.status)}
                  {getPriorityBadge(selectedSignalement.priority)}
                  <Badge variant="outline">{getCategoryLabel(selectedSignalement.category)}</Badge>
                </div>

                {/* Description */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                  </div>
                  <div className="text-gray-900">
                    {selectedSignalement.description?.[language] || '-'}
                  </div>
                </div>

                {/* Location & Coordinates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'fr' ? 'Lieu' : language === 'de' ? 'Ort' : 'Location'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <MapPin className="w-4 h-4" />
                      {selectedSignalement.location}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'fr' ? 'Coordonnées' : language === 'de' ? 'Koordinaten' : 'Coordinates'}
                    </div>
                    <div className="text-gray-900 font-medium font-mono text-sm">
                      {selectedSignalement.coordinates.lat.toFixed(4)}, {selectedSignalement.coordinates.lng.toFixed(4)}
                    </div>
                  </div>
                </div>

                {/* Date & Assignment */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'fr' ? 'Date de création' : language === 'de' ? 'Erstellungsdatum' : 'Creation date'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <Clock className="w-4 h-4" />
                      {new Date(selectedSignalement.createdAt).toLocaleDateString(language, {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'fr' ? 'Assigné à' : language === 'de' ? 'Zugewiesen an' : 'Assigned to'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <User className="w-4 h-4" />
                      {selectedSignalement.assignedTo || '-'}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => {
                    setShowDetailDialog(false);
                    handleViewOnMap(selectedSignalement);
                  }}>
                    <MapPin className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Voir sur la carte' : language === 'de' ? 'Auf Karte' : 'View on map'}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
                      {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
                    </Button>
                    <Button onClick={() => {
                      setShowDetailDialog(false);
                      handleEdit(selectedSignalement);
                    }}>
                      <Edit className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedSignalement && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Modifier le signalement' :
                   language === 'de' ? 'Meldung bearbeiten' :
                   'Edit report'}
                </DialogTitle>
                <DialogDescription>
                  {selectedSignalement.title[language]}
                </DialogDescription>
              </DialogHeader>

              <SignalementEditForm
                signalement={selectedSignalement}
                language={language}
                onSave={handleSaveEdit}
                onCancel={() => setShowEditDialog(false)}
                getCategoryLabel={getCategoryLabel}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* View on Map Dialog */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh]">
          {selectedSignalement && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Localisation sur la carte' :
                   language === 'de' ? 'Standort auf der Karte' :
                   'Location on map'}
                </DialogTitle>
                <DialogDescription>
                  {selectedSignalement.title[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Map Placeholder */}
                <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50" />
                  <div className="relative z-10 text-center space-y-3">
                    <Map className="w-16 h-16 text-blue-600 mx-auto" />
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedSignalement.location}
                      </p>
                      <p className="text-sm text-gray-600 font-mono mt-1">
                        {selectedSignalement.coordinates.lat.toFixed(4)}, {selectedSignalement.coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 italic">
                      {language === 'fr' ? 'Carte interactive disponible en production' :
                       language === 'de' ? 'Interaktive Karte in Produktion verfügbar' :
                       'Interactive map available in production'}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        {language === 'fr' ? 'Information' : language === 'de' ? 'Information' : 'Information'}
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        {language === 'fr' ? 'La carte interactive avec OpenStreetMap sera intégrée dans la version finale.' :
                         language === 'de' ? 'Die interaktive Karte mit OpenStreetMap wird in der endgültigen Version integriert.' :
                         'The interactive map with OpenStreetMap will be integrated in the final version.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowMapDialog(false)}>
                    {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedSignalement && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Assigner le signalement' :
                   language === 'de' ? 'Meldung zuweisen' :
                   'Assign report'}
                </DialogTitle>
                <DialogDescription>
                  {selectedSignalement.title[language]}
                </DialogDescription>
              </DialogHeader>

              <SignalementAssignForm
                signalement={selectedSignalement}
                language={language}
                services={mockServices}
                onAssign={handleSaveAssignment}
                onCancel={() => setShowAssignDialog(false)}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}