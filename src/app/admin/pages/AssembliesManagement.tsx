/**
 * Assemblies Management Page
 * 
 * Page de gestion complète des Assemblées avec :
 * - Liste des assemblées
 * - Gestion des participants (membres)
 * - Ajout de réunions liées à une assemblée
 * - Formulaires alignés avec le FrontOffice
 * - Toutes les actions fonctionnelles
 */

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router';
import {
  Users,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  UserPlus,
  MoreVertical,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  CalendarPlus,
  CalendarDays,
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
import { CreateAssemblyDialog } from '../components/dialogs/SectionContentDialogs';
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
  AvatarImage,
} from '../../components/ui/avatar';

// Mock data
const mockAssemblies = [
  {
    id: '1',
    name: { fr: 'Conseil citoyen du quartier', de: 'Bürgerrat des Viertels', en: 'Neighborhood citizen council' },
    description: { fr: 'Conseil citoyen pour la gestion du quartier', de: 'Bürgerrat für die Stadtteilver waltung', en: 'Citizen council for neighborhood management' },
    type: 'citizens_council' as const,
    status: 'active' as const,
    totalMembers: 24,
    foundedDate: '2025-06-01',
    nextMeeting: { date: '2026-02-15', title: 'Réunion mensuelle' },
    upcomingMeetingsCount: 3,
    themeId: 'governance',
  },
  {
    id: '2',
    name: { fr: 'Assemblée jeunesse', de: 'Jugendversammlung', en: 'Youth assembly' },
    description: { fr: 'Assemblée dédiée aux jeunes citoyens', de: 'Versammlung für junge Bürger', en: 'Assembly dedicated to young citizens' },
    type: 'youth_assembly' as const,
    status: 'active' as const,
    totalMembers: 18,
    foundedDate: '2025-09-01',
    nextMeeting: { date: '2026-02-20', title: 'Débat sur la mobilité' },
    upcomingMeetingsCount: 2,
    themeId: 'youth',
  },
  {
    id: '3',
    name: { fr: 'Comité d\'experts climat', de: 'Expertenausschuss Klima', en: 'Climate expert committee' },
    description: { fr: 'Comité d\'experts sur les questions climatiques', de: 'Expertenausschuss für Klimafragen', en: 'Expert committee on climate issues' },
    type: 'expert_committee' as const,
    status: 'active' as const,
    totalMembers: 12,
    foundedDate: '2025-03-15',
    nextMeeting: { date: '2026-03-01', title: 'Bilan trimestriel' },
    upcomingMeetingsCount: 1,
    themeId: 'environment',
  },
  {
    id: '4',
    name: { fr: 'Groupe de travail mobilité', de: 'Arbeitsgruppe Mobilität', en: 'Mobility working group' },
    description: { fr: 'Groupe de travail sur la mobilité durable', de: 'Arbeitsgruppe für nachhaltige Mobilität', en: 'Working group on sustainable mobility' },
    type: 'working_group' as const,
    status: 'active' as const,
    totalMembers: 15,
    foundedDate: '2025-11-01',
    nextMeeting: { date: '2026-02-18', title: 'Plan d\'action 2026' },
    upcomingMeetingsCount: 4,
    themeId: 'mobility',
  },
  {
    id: '5',
    name: { fr: 'Conseil culturel', de: 'Kulturrat', en: 'Cultural council' },
    description: { fr: 'Conseil pour les affaires culturelles', de: 'Rat für kulturelle Angelegenheiten', en: 'Council for cultural affairs' },
    type: 'citizens_council' as const,
    status: 'inactive' as const,
    totalMembers: 8,
    foundedDate: '2024-05-01',
    nextMeeting: null,
    upcomingMeetingsCount: 0,
    themeId: 'culture',
  },
];

// Mock members data
const mockMembers = [
  { id: '1', firstName: 'Sophie', lastName: 'Martin', email: 's.martin@example.com', role: 'Président', joinedDate: '2025-06-01' },
  { id: '2', firstName: 'Pierre', lastName: 'Dubois', email: 'p.dubois@example.com', role: 'Secrétaire', joinedDate: '2025-06-15' },
  { id: '3', firstName: 'Marie', lastName: 'Bernard', email: 'm.bernard@example.com', role: 'Membre', joinedDate: '2025-07-01' },
  { id: '4', firstName: 'Jean', lastName: 'Petit', email: 'j.petit@example.com', role: 'Membre', joinedDate: '2025-07-20' },
  { id: '5', firstName: 'Claire', lastName: 'Rousseau', email: 'c.rousseau@example.com', role: 'Trésorier', joinedDate: '2025-08-01' },
];

// Mock data pour les réunions
const generateMockMeetings = (assemblyId: string) => [
  {
    id: `${assemblyId}-meeting-1`,
    title: {
      fr: 'Réunion mensuelle 1',
      de: 'Monatstreffen 1',
      en: 'Monthly meeting 1'
    },
    description: {
      fr: 'Ordre du jour et décisions importantes',
      de: 'Tagesordnung und wichtige Entscheidungen',
      en: 'Agenda and important decisions'
    },
    date: '2026-02-13',
    time: '19:00',
    location: {
      fr: 'Mairie - Salle du Conseil',
      de: 'Rathaus - Ratssaal',
      en: 'City Hall - Council Room'
    },
    isOnline: false,
    onlineUrl: '',
    maxParticipants: 22,
    status: 'upcoming' as const,
  },
  {
    id: `${assemblyId}-meeting-2`,
    title: {
      fr: 'Réunion mensuelle 2',
      de: 'Monatstreffen 2',
      en: 'Monthly meeting 2'
    },
    description: {
      fr: 'Discussion des projets en cours',
      de: 'Diskussion laufender Projekte',
      en: 'Discussion of ongoing projects'
    },
    date: '2026-02-20',
    time: '20:00',
    location: {
      fr: 'Centre communautaire',
      de: 'Gemeindezentrum',
      en: 'Community center'
    },
    isOnline: true,
    onlineUrl: 'https://meet.example.com/assembly-meeting-2',
    maxParticipants: 24,
    status: 'upcoming' as const,
  },
  {
    id: `${assemblyId}-meeting-3`,
    title: {
      fr: 'Réunion mensuelle 3',
      de: 'Monatstreffen 3',
      en: 'Monthly meeting 3'
    },
    description: {
      fr: 'Planification trimestrielle',
      de: 'Quartalsplanung',
      en: 'Quarterly planning'
    },
    date: '2026-02-27',
    time: '21:00',
    location: {
      fr: 'Bibliothèque municipale',
      de: 'Stadtbibliothek',
      en: 'Municipal library'
    },
    isOnline: false,
    onlineUrl: '',
    maxParticipants: 26,
    status: 'upcoming' as const,
  },
];

export function AssembliesManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedAssembly, setSelectedAssembly] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showManageMembersDialog, setShowManageMembersDialog] = useState(false);
  const [showAddMeetingDialog, setShowAddMeetingDialog] = useState(false);
  const [showViewMeetingsDialog, setShowViewMeetingsDialog] = useState(false);
  const [showEditMeetingDialog, setShowEditMeetingDialog] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [assemblyMeetings, setAssemblyMeetings] = useState<Record<string, any[]>>({});

  // Obtenir les réunions de l'assemblée sélectionnée
  const getCurrentMeetings = () => {
    if (!selectedAssembly) return [];
    if (!assemblyMeetings[selectedAssembly.id]) {
      return generateMockMeetings(selectedAssembly.id);
    }
    return assemblyMeetings[selectedAssembly.id];
  };

  // Mettre à jour les réunions de l'assemblée sélectionnée
  const setCurrentMeetings = (meetings: any[]) => {
    if (!selectedAssembly) return;
    setAssemblyMeetings(prev => ({
      ...prev,
      [selectedAssembly.id]: meetings
    }));
  };

  // Fonction pour modifier une réunion
  const handleEditMeeting = (meeting: any) => {
    setSelectedMeeting(meeting);
    setShowEditMeetingDialog(true);
  };

  // Fonction pour annuler une réunion
  const handleCancelMeeting = (meetingId: string) => {
    const currentMeetings = getCurrentMeetings();
    const updatedMeetings = currentMeetings.map((m: any) => 
      m.id === meetingId ? { ...m, status: 'cancelled' } : m
    );
    setCurrentMeetings(updatedMeetings);
    
    toast.success(
      language === 'fr' ? 'Réunion annulée avec succès' :
      language === 'de' ? 'Meeting erfolgreich abgesagt' :
      'Meeting cancelled successfully'
    );
  };

  // Fonction pour sauvegarder les modifications d'une réunion
  const handleSaveEditedMeeting = (updatedMeeting: any) => {
    const currentMeetings = getCurrentMeetings();
    const updatedMeetings = currentMeetings.map((m: any) => 
      m.id === updatedMeeting.id ? updatedMeeting : m
    );
    setCurrentMeetings(updatedMeetings);
    
    setShowEditMeetingDialog(false);
    setSelectedMeeting(null);
    
    toast.success(
      language === 'fr' ? 'Réunion modifiée avec succès' :
      language === 'de' ? 'Meeting erfolgreich aktualisiert' :
      'Meeting updated successfully'
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string; icon: any }> = {
      active: { 
        label: language === 'fr' ? 'Active' : language === 'de' ? 'Aktiv' : 'Active', 
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: CheckCircle,
      },
      inactive: { 
        label: language === 'fr' ? 'Inactive' : language === 'de' ? 'Inaktiv' : 'Inactive', 
        color: 'bg-gray-100 text-gray-700 border-gray-300',
        icon: XCircle,
      },
      archived: { 
        label: language === 'fr' ? 'Archivée' : language === 'de' ? 'Archiviert' : 'Archived', 
        color: 'bg-purple-100 text-purple-700 border-purple-300',
        icon: FileText,
      },
    };

    const variant = variants[status] || variants.active;
    const Icon = variant.icon;
    
    return (
      <Badge className={`${variant.color} border inline-flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, { fr: string; de: string; en: string }> = {
      citizens_council: { fr: 'Conseil citoyen', de: 'Bürgerrat', en: 'Citizens council' },
      youth_assembly: { fr: 'Assemblée jeunesse', de: 'Jugendversammlung', en: 'Youth assembly' },
      expert_committee: { fr: 'Comité d\'experts', de: 'Expertenausschuss', en: 'Expert committee' },
      working_group: { fr: 'Groupe de travail', de: 'Arbeitsgruppe', en: 'Working group' },
    };

    return types[type]?.[language] || type;
  };

  const filteredAssemblies = mockAssemblies.filter(assembly => {
    const matchesSearch = assembly.name[language].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assembly.status === statusFilter;
    const matchesType = typeFilter === 'all' || assembly.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleView = (assembly: any) => {
    setSelectedAssembly(assembly);
    setShowDetailDialog(true);
  };

  const handleEdit = (assembly: any) => {
    setSelectedAssembly(assembly);
    setShowEditDialog(true);
  };

  const handleDelete = (id: string) => {
    toast.success(
      language === 'fr' ? 'Assemblée supprimée avec succès' :
      language === 'de' ? 'Versammlung erfolgreich gelöscht' :
      'Assembly deleted successfully'
    );
  };

  const handleExport = () => {
    toast.success(
      language === 'fr' ? 'Export en cours...' :
      language === 'de' ? 'Export läuft...' :
      'Exporting...'
    );
  };

  const totalMembers = mockAssemblies.reduce((acc, a) => acc + a.totalMembers, 0);
  const totalMeetings = mockAssemblies.reduce((acc, a) => acc + a.upcomingMeetingsCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {language === 'fr' ? 'Gestion des Assemblées' :
           language === 'de' ? 'Verwaltung der Versammlungen' :
           'Assemblies Management'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Gérez les assemblées, leurs membres et leurs réunions' :
           language === 'de' ? 'Verwalten Sie Versammlungen, deren Mitglieder und Treffen' :
           'Manage assemblies, their members and meetings'}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssemblies.length}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Assemblées' : language === 'de' ? 'Versammlungen' : 'Assemblies'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Actives' : language === 'de' ? 'Aktiv' : 'Active'}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockAssemblies.filter(a => a.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'En activité' : language === 'de' ? 'In Betrieb' : 'Operating'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Membres' : language === 'de' ? 'Mitglieder' : 'Members'}
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalMembers}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Réunions' : language === 'de' ? 'Treffen' : 'Meetings'}
            </CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {totalMeetings}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'À venir' : language === 'de' ? 'Bevorstehend' : 'Upcoming'}
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
              <SelectItem value="active">{language === 'fr' ? 'Active' : language === 'de' ? 'Aktiv' : 'Active'}</SelectItem>
              <SelectItem value="inactive">{language === 'fr' ? 'Inactive' : language === 'de' ? 'Inaktiv' : 'Inactive'}</SelectItem>
              <SelectItem value="archived">{language === 'fr' ? 'Archivée' : language === 'de' ? 'Archiviert' : 'Archived'}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'fr' ? 'Tous les types' : language === 'de' ? 'Alle Typen' : 'All types'}</SelectItem>
              <SelectItem value="citizens_council">{language === 'fr' ? 'Conseil citoyen' : language === 'de' ? 'Bürgerrat' : 'Citizens council'}</SelectItem>
              <SelectItem value="youth_assembly">{language === 'fr' ? 'Assemblée jeunesse' : language === 'de' ? 'Jugendversammlung' : 'Youth assembly'}</SelectItem>
              <SelectItem value="expert_committee">{language === 'fr' ? 'Comité d\'experts' : language === 'de' ? 'Expertenausschuss' : 'Expert committee'}</SelectItem>
              <SelectItem value="working_group">{language === 'fr' ? 'Groupe de travail' : language === 'de' ? 'Arbeitsgruppe' : 'Working group'}</SelectItem>
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
            {language === 'fr' ? 'Nouvelle assemblée' : language === 'de' ? 'Neue Versammlung' : 'New assembly'}
          </Button>
        </div>
      </div>

      {/* Assemblies Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'Liste des assemblées' : language === 'de' ? 'Liste der Versammlungen' : 'Assemblies list'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'fr' ? 'Nom' : language === 'de' ? 'Name' : 'Name'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Membres' : language === 'de' ? 'Mitglieder' : 'Members'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Prochaine réunion' : language === 'de' ? 'Nächstes Treffen' : 'Next meeting'}</TableHead>
                  <TableHead className="text-right">{language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssemblies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      {language === 'fr' ? 'Aucune assemblée trouvée' :
                       language === 'de' ? 'Keine Versammlungen gefunden' :
                       'No assemblies found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssemblies.map((assembly) => (
                    <TableRow key={assembly.id}>
                      <TableCell className="font-medium">
                        {assembly.name[language]}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getTypeLabel(assembly.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(assembly.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{assembly.totalMembers}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {assembly.nextMeeting ? (
                          <div>
                            <div className="flex items-center gap-1 text-sm font-medium">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              {new Date(assembly.nextMeeting.date).toLocaleDateString(language)}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {assembly.nextMeeting.title}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            {language === 'fr' ? 'Aucune réunion' : language === 'de' ? 'Kein Treffen' : 'No meeting'}
                          </span>
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
                            <DropdownMenuItem onClick={() => handleView(assembly)}>
                              <Eye className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Voir' : language === 'de' ? 'Ansehen' : 'View'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(assembly)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                              setSelectedAssembly(assembly);
                              setShowManageMembersDialog(true);
                            }}>
                              <UserPlus className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Gérer les membres' : language === 'de' ? 'Mitglieder verwalten' : 'Manage members'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedAssembly(assembly);
                              setShowAddMeetingDialog(true);
                            }}>
                              <CalendarPlus className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Ajouter une réunion' : language === 'de' ? 'Treffen hinzufügen' : 'Add a meeting'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedAssembly(assembly);
                              setShowViewMeetingsDialog(true);
                            }}>
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Voir les réunions' : language === 'de' ? 'Treffen ansehen' : 'View meetings'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(assembly.id)}
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

      {/* Create Assembly Dialog */}
      <CreateAssemblyDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        themes={[]} // TODO: Pass actual themes from API
      />

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedAssembly && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Eye className="w-6 h-6 text-blue-600" />
                  {selectedAssembly.name[language]}
                </DialogTitle>
                <DialogDescription>
                  {language === 'fr' ? 'Détails de l\'assemblée' :
                   language === 'de' ? 'Details der Versammlung' :
                   'Assembly details'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status & Type */}
                <div className="flex gap-3">
                  {getStatusBadge(selectedAssembly.status)}
                  <Badge variant="outline">{getTypeLabel(selectedAssembly.type)}</Badge>
                </div>

                {/* Description */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                  </div>
                  <div className="text-gray-900">
                    {selectedAssembly.description?.[language] || '-'}
                  </div>
                </div>

                {/* Date de création */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'fr' ? 'Date de création' : language === 'de' ? 'Erstellungsdatum' : 'Founded date'}
                  </div>
                  <div className="flex items-center gap-2 text-gray-900 font-medium">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedAssembly.foundedDate).toLocaleDateString(language, {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedAssembly.totalMembers}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Membres' : language === 'de' ? 'Mitglieder' : 'Members'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedAssembly.upcomingMeetingsCount}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Réunions à venir' : language === 'de' ? 'Bevorstehende Treffen' : 'Upcoming meetings'}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
                    {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
                  </Button>
                  <Button onClick={() => {
                    setShowDetailDialog(false);
                    handleEdit(selectedAssembly);
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
          {selectedAssembly && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Modifier l\'assemblée' :
                   language === 'de' ? 'Versammlung bearbeiten' :
                   'Edit assembly'}
                </DialogTitle>
                <DialogDescription>
                  {selectedAssembly.name[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Nom (FR)' : language === 'de' ? 'Name (FR)' : 'Name (FR)'}
                  </label>
                  <Input defaultValue={selectedAssembly.name.fr} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Nom (DE)' : language === 'de' ? 'Name (DE)' : 'Name (DE)'}
                  </label>
                  <Input defaultValue={selectedAssembly.name.de} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Nom (EN)' : language === 'de' ? 'Name (EN)' : 'Name (EN)'}
                  </label>
                  <Input defaultValue={selectedAssembly.name.en} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'}
                    </label>
                    <Select defaultValue={selectedAssembly.type}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="citizens_council">
                          {language === 'fr' ? 'Conseil citoyen' : language === 'de' ? 'Bürgerrat' : 'Citizens council'}
                        </SelectItem>
                        <SelectItem value="youth_assembly">
                          {language === 'fr' ? 'Assemblée jeunesse' : language === 'de' ? 'Jugendversammlung' : 'Youth assembly'}
                        </SelectItem>
                        <SelectItem value="expert_committee">
                          {language === 'fr' ? 'Comité d\'experts' : language === 'de' ? 'Expertenausschuss' : 'Expert committee'}
                        </SelectItem>
                        <SelectItem value="working_group">
                          {language === 'fr' ? 'Groupe de travail' : language === 'de' ? 'Arbeitsgruppe' : 'Working group'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
                    </label>
                    <Select defaultValue={selectedAssembly.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          {language === 'fr' ? 'Active' : language === 'de' ? 'Aktiv' : 'Active'}
                        </SelectItem>
                        <SelectItem value="inactive">
                          {language === 'fr' ? 'Inactive' : language === 'de' ? 'Inaktiv' : 'Inactive'}
                        </SelectItem>
                        <SelectItem value="archived">
                          {language === 'fr' ? 'Archivée' : language === 'de' ? 'Archiviert' : 'Archived'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                  </Button>
                  <Button onClick={() => {
                    toast.success(
                      language === 'fr' ? 'Assemblée modifiée avec succès' :
                      language === 'de' ? 'Versammlung erfolgreich bearbeitet' :
                      'Assembly updated successfully'
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

      {/* Manage Members Dialog */}
      <Dialog open={showManageMembersDialog} onOpenChange={setShowManageMembersDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedAssembly && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Gérer les membres' : language === 'de' ? 'Mitglieder verwalten' : 'Manage members'}
                </DialogTitle>
                <DialogDescription>
                  {selectedAssembly.name[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {language === 'fr' ? 'Ajouter un membre' : language === 'de' ? 'Mitglied hinzufügen' : 'Add member'}
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder={language === 'fr' ? 'Email du membre' : language === 'de' ? 'Mitglied-E-Mail' : 'Member email'} 
                    />
                    <Button onClick={() => {
                      toast.success(
                        language === 'fr' ? 'Membre ajouté avec succès' :
                        language === 'de' ? 'Mitglied erfolgreich hinzugefügt' :
                        'Member added successfully'
                      );
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Ajouter' : language === 'de' ? 'Hinzufügen' : 'Add'}
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    {language === 'fr' ? 'Membres actuels' : language === 'de' ? 'Aktuelle Mitglieder' : 'Current members'} ({mockMembers.length})
                  </h4>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {mockMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-semibold">
                              {member.firstName[0] + member.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {member.firstName} {member.lastName}
                            </p>
                            <p className="text-xs text-gray-500">{member.email}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => {
                            toast.success(
                              language === 'fr' ? 'Membre retiré' :
                              language === 'de' ? 'Mitglied entfernt' :
                              'Member removed'
                            );
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowManageMembersDialog(false)}>
                    {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Meeting Dialog */}
      <Dialog open={showAddMeetingDialog} onOpenChange={setShowAddMeetingDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedAssembly && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CalendarPlus className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Ajouter une réunion' : language === 'de' ? 'Meeting hinzufügen' : 'Add a meeting'}
                </DialogTitle>
                <DialogDescription>
                  {selectedAssembly.name[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre de la réunion (FR)' : language === 'de' ? 'Besprechungstitel (FR)' : 'Meeting title (FR)'}
                  </label>
                  <Input placeholder={language === 'fr' ? 'Ex: Réunion mensuelle' : language === 'de' ? 'Bsp: Monatstreffen' : 'Ex: Monthly meeting'} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre de la réunion (DE)' : language === 'de' ? 'Besprechungstitel (DE)' : 'Meeting title (DE)'}
                  </label>
                  <Input placeholder="Monatstreffen" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre de la réunion (EN)' : language === 'de' ? 'Besprechungstitel (EN)' : 'Meeting title (EN)'}
                  </label>
                  <Input placeholder="Monthly meeting" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Date' : language === 'de' ? 'Datum' : 'Date'}
                    </label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Heure' : language === 'de' ? 'Uhrzeit' : 'Time'}
                    </label>
                    <Input type="time" defaultValue="18:00" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Lieu' : language === 'de' ? 'Ort' : 'Location'}
                  </label>
                  <Input placeholder={language === 'fr' ? 'Mairie - Salle du Conseil' : language === 'de' ? 'Rathaus - Ratssaal' : 'City Hall - Council Room'} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                  </label>
                  <Input placeholder={language === 'fr' ? 'Brève description...' : language === 'de' ? 'Kurze Beschreibung...' : 'Brief description...'} />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowAddMeetingDialog(false)}>
                    {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                  </Button>
                  <Button onClick={() => {
                    toast.success(
                      language === 'fr' ? 'Réunion ajoutée avec succès' :
                      language === 'de' ? 'Meeting erfolgreich hinzugefügt' :
                      'Meeting added successfully'
                    );
                    setShowAddMeetingDialog(false);
                  }}>
                    {language === 'fr' ? 'Ajouter' : language === 'de' ? 'Hinzufügen' : 'Add'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* View Meetings Dialog */}
      <Dialog open={showViewMeetingsDialog} onOpenChange={setShowViewMeetingsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
          {selectedAssembly && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Réunions planifiées' : language === 'de' ? 'Geplante Meetings' : 'Scheduled meetings'}
                </DialogTitle>
                <DialogDescription>
                  {selectedAssembly.name[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2">
                {getCurrentMeetings().map((meeting) => (
                  <div key={meeting.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {meeting.title[language]}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {meeting.description[language]}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={meeting.status === 'cancelled' 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : 'bg-green-50 text-green-700 border-green-200'}
                      >
                        {meeting.status === 'cancelled' 
                          ? (language === 'fr' ? 'Annulée' : language === 'de' ? 'Abgesagt' : 'Cancelled')
                          : (language === 'fr' ? 'À venir' : language === 'de' ? 'Bevorstehend' : 'Upcoming')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(meeting.date).toLocaleDateString(language, {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {meeting.time}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {meeting.location[language]}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        {meeting.maxParticipants} {language === 'fr' ? 'participants' : language === 'de' ? 'Teilnehmer' : 'participants'}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3 pt-3 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditMeeting(meeting)}
                        disabled={meeting.status === 'cancelled'}
                      >
                        <Edit className="w-3.5 h-3.5 mr-1" />
                        {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700" 
                        onClick={() => handleCancelMeeting(meeting.id)}
                        disabled={meeting.status === 'cancelled'}
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowViewMeetingsDialog(false)}>
                  {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
                </Button>
                <Button onClick={() => {
                  setShowViewMeetingsDialog(false);
                  setShowAddMeetingDialog(true);
                }}>
                  <CalendarPlus className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Nouvelle réunion' : language === 'de' ? 'Neues Meeting' : 'New meeting'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Meeting Dialog */}
      <Dialog open={showEditMeetingDialog} onOpenChange={setShowEditMeetingDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedMeeting && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Modifier la réunion' : language === 'de' ? 'Meeting bearbeiten' : 'Edit meeting'}
                </DialogTitle>
                <DialogDescription>
                  {selectedMeeting.title[language]}
                </DialogDescription>
              </DialogHeader>

              <EditMeetingForm
                meeting={selectedMeeting}
                language={language}
                onSave={handleSaveEditedMeeting}
                onCancel={() => setShowEditMeetingDialog(false)}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Composant pour le formulaire d'édition de réunion
function EditMeetingForm({ 
  meeting, 
  language, 
  onSave, 
  onCancel 
}: { 
  meeting: any; 
  language: 'fr' | 'de' | 'en'; 
  onSave: (meeting: any) => void; 
  onCancel: () => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updatedMeeting = {
      ...meeting,
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
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      location: {
        fr: formData.get('location_fr') as string,
        de: formData.get('location_de') as string,
        en: formData.get('location_en') as string,
      },
      isOnline: formData.get('isOnline') === 'true',
      onlineUrl: formData.get('onlineUrl') as string,
      maxParticipants: parseInt(formData.get('maxParticipants') as string, 10),
    };
    
    onSave(updatedMeeting);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Titre FR */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Titre (FR)' : language === 'de' ? 'Titel (FR)' : 'Title (FR)'}
        </label>
        <Input 
          name="title_fr" 
          defaultValue={meeting.title.fr} 
          required 
        />
      </div>

      {/* Titre DE */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Titre (DE)' : language === 'de' ? 'Titel (DE)' : 'Title (DE)'}
        </label>
        <Input 
          name="title_de" 
          defaultValue={meeting.title.de} 
          required 
        />
      </div>

      {/* Titre EN */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Titre (EN)' : language === 'de' ? 'Titel (EN)' : 'Title (EN)'}
        </label>
        <Input 
          name="title_en" 
          defaultValue={meeting.title.en} 
          required 
        />
      </div>

      {/* Description FR */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Description (FR)' : language === 'de' ? 'Beschreibung (FR)' : 'Description (FR)'}
        </label>
        <Input 
          name="description_fr" 
          defaultValue={meeting.description.fr} 
          required 
        />
      </div>

      {/* Description DE */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Description (DE)' : language === 'de' ? 'Beschreibung (DE)' : 'Description (DE)'}
        </label>
        <Input 
          name="description_de" 
          defaultValue={meeting.description.de} 
          required 
        />
      </div>

      {/* Description EN */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Description (EN)' : language === 'de' ? 'Beschreibung (EN)' : 'Description (EN)'}
        </label>
        <Input 
          name="description_en" 
          defaultValue={meeting.description.en} 
          required 
        />
      </div>

      {/* Date et Heure */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Date' : language === 'de' ? 'Datum' : 'Date'}
          </label>
          <Input 
            type="date" 
            name="date" 
            defaultValue={meeting.date} 
            required 
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Heure' : language === 'de' ? 'Uhrzeit' : 'Time'}
          </label>
          <Input 
            type="time" 
            name="time" 
            defaultValue={meeting.time} 
            required 
          />
        </div>
      </div>

      {/* Lieu FR */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Lieu (FR)' : language === 'de' ? 'Ort (FR)' : 'Location (FR)'}
        </label>
        <Input 
          name="location_fr" 
          defaultValue={meeting.location.fr} 
          required 
        />
      </div>

      {/* Lieu DE */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Lieu (DE)' : language === 'de' ? 'Ort (DE)' : 'Location (DE)'}
        </label>
        <Input 
          name="location_de" 
          defaultValue={meeting.location.de} 
          required 
        />
      </div>

      {/* Lieu EN */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Lieu (EN)' : language === 'de' ? 'Ort (EN)' : 'Location (EN)'}
        </label>
        <Input 
          name="location_en" 
          defaultValue={meeting.location.en} 
          required 
        />
      </div>

      {/* Réunion en ligne */}
      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          name="isOnline" 
          value="true"
          defaultChecked={meeting.isOnline}
          className="h-4 w-4"
        />
        <label className="text-sm font-medium text-gray-700">
          {language === 'fr' ? 'Réunion en ligne' : language === 'de' ? 'Online-Meeting' : 'Online meeting'}
        </label>
      </div>

      {/* URL en ligne */}
      {meeting.isOnline && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'URL de la réunion en ligne' : language === 'de' ? 'Online-Meeting-URL' : 'Online meeting URL'}
          </label>
          <Input 
            name="onlineUrl" 
            type="url"
            defaultValue={meeting.onlineUrl} 
            placeholder="https://meet.example.com/..."
          />
        </div>
      )}

      {/* Nombre max de participants */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Nombre max de participants' : language === 'de' ? 'Max. Teilnehmerzahl' : 'Max participants'}
        </label>
        <Input 
          type="number" 
          name="maxParticipants" 
          defaultValue={meeting.maxParticipants} 
          min="1"
          required 
        />
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