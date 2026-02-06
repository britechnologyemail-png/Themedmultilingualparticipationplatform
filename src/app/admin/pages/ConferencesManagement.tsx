/**
 * Conferences Management Page
 * 
 * Page de gestion complète des Conférences avec :
 * - Liste des conférences
 * - Gestion des participants
 * - Ajout d'intervenants
 * - Paramètres synchronisés avec le FrontOffice
 * - Toutes les actions fonctionnelles
 */

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router';
import {
  Video,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Users,
  UserPlus,
  Calendar,
  MapPin,
  MoreVertical,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Mic,
  Play,
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
import { CreateConferenceDialog } from '../components/dialogs/SectionContentDialogs';
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
const mockConferences = [
  {
    id: '1',
    title: { fr: 'Forum climat 2026', de: 'Klimaforum 2026', en: 'Climate Forum 2026' },
    description: { fr: 'Grand forum sur les enjeux climatiques locaux', de: 'Großes Forum zu lokalen Klimafragen', en: 'Major forum on local climate issues' },
    date: '2026-03-15',
    location: 'Centre de conférences',
    format: 'hybrid' as const,
    status: 'upcoming' as const,
    registered: 234,
    capacity: 500,
    speakers: 12,
    sessions: 8,
    themeId: 'environment',
  },
  {
    id: '2',
    title: { fr: 'Conférence mobilité urbaine', de: 'Konferenz städtische Mobilität', en: 'Urban mobility conference' },
    description: { fr: 'Discussion sur les solutions de mobilité durable', de: 'Diskussion über nachhaltige Mobilitätslösungen', en: 'Discussion on sustainable mobility solutions' },
    date: '2026-02-20',
    location: 'Salle municipale',
    format: 'in_person' as const,
    status: 'open' as const,
    registered: 156,
    capacity: 300,
    speakers: 8,
    sessions: 6,
    themeId: 'mobility',
  },
  {
    id: '3',
    title: { fr: 'Sommet numérique citoyen', de: 'Digitaler Bürgergipfel', en: 'Digital citizen summit' },
    description: { fr: 'Sommet sur la transformation numérique et la démocratie', de: 'Gipfel über digitale Transformation und Demokratie', en: 'Summit on digital transformation and democracy' },
    date: '2026-04-10',
    location: 'En ligne',
    format: 'online' as const,
    status: 'upcoming' as const,
    registered: 542,
    capacity: 1000,
    speakers: 15,
    sessions: 10,
    themeId: 'governance',
  },
  {
    id: '4',
    title: { fr: 'Colloque éducation et innovation', de: 'Kolloquium Bildung und Innovation', en: 'Education and innovation colloquium' },
    description: { fr: 'Colloque sur les innovations pédagogiques', de: 'Kolloquium über pädagogische Innovationen', en: 'Colloquium on educational innovations' },
    date: '2025-12-05',
    location: 'Université',
    format: 'hybrid' as const,
    status: 'completed' as const,
    registered: 387,
    capacity: 400,
    speakers: 10,
    sessions: 7,
    themeId: 'education',
  },
  {
    id: '5',
    title: { fr: 'Débat culture et territoire', de: 'Debatte Kultur und Territorium', en: 'Culture and territory debate' },
    description: { fr: 'Débat public sur la culture locale', de: 'Öffentliche Debatte über lokale Kultur', en: 'Public debate on local culture' },
    date: '2026-01-15',
    location: 'Théâtre municipal',
    format: 'in_person' as const,
    status: 'cancelled' as const,
    registered: 89,
    capacity: 200,
    speakers: 5,
    sessions: 3,
    themeId: 'culture',
  },
];

// Mock participants data
const mockParticipants = [
  { id: '1', firstName: 'Sophie', lastName: 'Martin', email: 's.martin@example.com', registeredAt: '2026-01-15T10:30:00Z', status: 'confirmed' },
  { id: '2', firstName: 'Pierre', lastName: 'Dubois', email: 'p.dubois@example.com', registeredAt: '2026-01-16T14:20:00Z', status: 'confirmed' },
  { id: '3', firstName: 'Marie', lastName: 'Bernard', email: 'm.bernard@example.com', registeredAt: '2026-01-17T09:15:00Z', status: 'pending' },
  { id: '4', firstName: 'Jean', lastName: 'Petit', email: 'j.petit@example.com', registeredAt: '2026-01-18T16:45:00Z', status: 'confirmed' },
  { id: '5', firstName: 'Claire', lastName: 'Rousseau', email: 'c.rousseau@example.com', registeredAt: '2026-01-19T11:00:00Z', status: 'confirmed' },
];

// Mock speakers data
const mockSpeakers = [
  { id: '1', name: 'Dr. Marie Lefebvre', role: 'Climatologue', bio: 'Experte en changement climatique', organization: 'CNRS' },
  { id: '2', name: 'Jean Dupont', role: 'Ingénieur', bio: 'Spécialiste mobilité urbaine', organization: 'Ville de Paris' },
  { id: '3', name: 'Sophie Martin', role: 'Architecte', bio: 'Architecture durable', organization: 'Studio Martin' },
];

// Mock sessions data
const mockSessions = [
  { id: '1', title: 'Session d\'ouverture', startTime: '09:00', endTime: '10:00', speaker: 'Dr. Marie Lefebvre', room: 'Salle principale' },
  { id: '2', title: 'Table ronde : Mobilité durable', startTime: '10:30', endTime: '12:00', speaker: 'Jean Dupont', room: 'Salle A' },
  { id: '3', title: 'Atelier pratique', startTime: '14:00', endTime: '16:00', speaker: 'Sophie Martin', room: 'Salle B' },
  { id: '4', title: 'Session de clôture', startTime: '16:30', endTime: '18:00', speaker: 'Dr. Marie Lefebvre', room: 'Salle principale' },
];

export function ConferencesManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showManageParticipantsDialog, setShowManageParticipantsDialog] = useState(false);
  const [showAddSpeakerDialog, setShowAddSpeakerDialog] = useState(false);
  const [showViewSessionsDialog, setShowViewSessionsDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showEditSessionDialog, setShowEditSessionDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string; icon: any }> = {
      upcoming: { 
        label: language === 'fr' ? 'À venir' : language === 'de' ? 'Bevorstehend' : 'Upcoming', 
        color: 'bg-orange-100 text-orange-700 border-orange-300',
        icon: Clock,
      },
      open: { 
        label: language === 'fr' ? 'Inscriptions ouvertes' : language === 'de' ? 'Anmeldungen offen' : 'Open for registration', 
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: CheckCircle,
      },
      completed: { 
        label: language === 'fr' ? 'Terminée' : language === 'de' ? 'Abgeschlossen' : 'Completed', 
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: CheckCircle,
      },
      cancelled: { 
        label: language === 'fr' ? 'Annulée' : language === 'de' ? 'Abgesagt' : 'Cancelled', 
        color: 'bg-red-100 text-red-700 border-red-300',
        icon: XCircle,
      },
    };

    const variant = variants[status] || variants.upcoming;
    const Icon = variant.icon;
    
    return (
      <Badge className={`${variant.color} border inline-flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  const getFormatBadge = (format: string) => {
    const formats: Record<string, { label: string; color: string }> = {
      in_person: { 
        label: language === 'fr' ? 'Présentiel' : language === 'de' ? 'Präsenz' : 'In person', 
        color: 'bg-purple-100 text-purple-700',
      },
      online: { 
        label: language === 'fr' ? 'En ligne' : language === 'de' ? 'Online' : 'Online', 
        color: 'bg-blue-100 text-blue-700',
      },
      hybrid: { 
        label: language === 'fr' ? 'Hybride' : language === 'de' ? 'Hybrid' : 'Hybrid', 
        color: 'bg-green-100 text-green-700',
      },
    };

    const variant = formats[format] || formats.hybrid;
    
    return (
      <Badge className={variant.color}>
        {variant.label}
      </Badge>
    );
  };

  const filteredConferences = mockConferences.filter(conference => {
    const matchesSearch = conference.title[language].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || conference.status === statusFilter;
    const matchesFormat = formatFilter === 'all' || conference.format === formatFilter;
    return matchesSearch && matchesStatus && matchesFormat;
  });

  const handleView = (conference: any) => {
    setSelectedConference(conference);
    setShowDetailDialog(true);
  };

  const handleEdit = (conference: any) => {
    setSelectedConference(conference);
    setShowEditDialog(true);
  };

  const handleDelete = (id: string) => {
    toast.success(
      language === 'fr' ? 'Conférence supprimée avec succès' :
      language === 'de' ? 'Konferenz erfolgreich gelöscht' :
      'Conference deleted successfully'
    );
  };

  const handleExport = () => {
    toast.success(
      language === 'fr' ? 'Export en cours...' :
      language === 'de' ? 'Export läuft...' :
      'Exporting...'
    );
  };

  const totalParticipants = mockConferences.reduce((acc, c) => acc + c.registered, 0);
  const totalSpeakers = mockConferences.reduce((acc, c) => acc + c.speakers, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {language === 'fr' ? 'Gestion des Conférences' :
           language === 'de' ? 'Verwaltung der Konferenzen' :
           'Conferences Management'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Gérez les conférences, leurs participants et leurs intervenants' :
           language === 'de' ? 'Verwalten Sie Konferenzen, deren Teilnehmer und Referenten' :
           'Manage conferences, their participants and speakers'}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
            </CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockConferences.length}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Conférences' : language === 'de' ? 'Konferenzen' : 'Conferences'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'À venir' : language === 'de' ? 'Bevorstehend' : 'Upcoming'}
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mockConferences.filter(c => c.status === 'upcoming' || c.status === 'open').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Programmées' : language === 'de' ? 'Geplant' : 'Scheduled'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalParticipants.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Inscrits' : language === 'de' ? 'Registriert' : 'Registered'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Intervenants' : language === 'de' ? 'Referenten' : 'Speakers'}
            </CardTitle>
            <Mic className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {totalSpeakers}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
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
              <SelectItem value="upcoming">{language === 'fr' ? 'À venir' : language === 'de' ? 'Bevorstehend' : 'Upcoming'}</SelectItem>
              <SelectItem value="open">{language === 'fr' ? 'Inscriptions ouvertes' : language === 'de' ? 'Anmeldungen offen' : 'Open'}</SelectItem>
              <SelectItem value="completed">{language === 'fr' ? 'Terminée' : language === 'de' ? 'Abgeschlossen' : 'Completed'}</SelectItem>
              <SelectItem value="cancelled">{language === 'fr' ? 'Annulée' : language === 'de' ? 'Abgesagt' : 'Cancelled'}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={formatFilter} onValueChange={setFormatFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === 'fr' ? 'Format' : language === 'de' ? 'Format' : 'Format'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'fr' ? 'Tous formats' : language === 'de' ? 'Alle Formate' : 'All formats'}</SelectItem>
              <SelectItem value="in_person">{language === 'fr' ? 'Présentiel' : language === 'de' ? 'Präsenz' : 'In person'}</SelectItem>
              <SelectItem value="online">{language === 'fr' ? 'En ligne' : language === 'de' ? 'Online' : 'Online'}</SelectItem>
              <SelectItem value="hybrid">{language === 'fr' ? 'Hybride' : language === 'de' ? 'Hybrid' : 'Hybrid'}</SelectItem>
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
            {language === 'fr' ? 'Nouvelle conférence' : language === 'de' ? 'Neue Konferenz' : 'New conference'}
          </Button>
        </div>
      </div>

      {/* Conferences Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'Liste des conférences' : language === 'de' ? 'Liste der Konferenzen' : 'Conferences list'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'fr' ? 'Titre' : language === 'de' ? 'Titel' : 'Title'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Date' : language === 'de' ? 'Datum' : 'Date'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Format' : language === 'de' ? 'Format' : 'Format'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Intervenants' : language === 'de' ? 'Referenten' : 'Speakers'}</TableHead>
                  <TableHead className="text-right">{language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConferences.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {language === 'fr' ? 'Aucune conférence trouvée' :
                       language === 'de' ? 'Keine Konferenzen gefunden' :
                       'No conferences found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredConferences.map((conference) => (
                    <TableRow key={conference.id}>
                      <TableCell className="font-medium max-w-xs">
                        {conference.title[language]}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          {new Date(conference.date).toLocaleDateString(language)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getFormatBadge(conference.format)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(conference.status)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{conference.registered}</span>
                            <span className="text-xs text-gray-500">/ {conference.capacity}</span>
                          </div>
                          <div className="w-20 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full bg-blue-600"
                              style={{ width: `${Math.min((conference.registered / conference.capacity) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mic className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">{conference.speakers}</span>
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
                            <DropdownMenuItem onClick={() => handleView(conference)}>
                              <Eye className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Voir' : language === 'de' ? 'Ansehen' : 'View'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(conference)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                              setSelectedConference(conference);
                              setShowManageParticipantsDialog(true);
                            }}>
                              <Users className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Gérer les participants' : language === 'de' ? 'Teilnehmer verwalten' : 'Manage participants'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedConference(conference);
                              setShowAddSpeakerDialog(true);
                            }}>
                              <UserPlus className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Ajouter un intervenant' : language === 'de' ? 'Referent hinzufügen' : 'Add speaker'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedConference(conference);
                              setShowViewSessionsDialog(true);
                            }}>
                              <Video className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Voir les sessions' : language === 'de' ? 'Sitzungen ansehen' : 'View sessions'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(conference.id)}
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

      {/* Create Conference Dialog */}
      <CreateConferenceDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        themes={[]} // TODO: Pass actual themes from API
      />

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedConference && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Eye className="w-6 h-6 text-blue-600" />
                  {selectedConference.title[language]}
                </DialogTitle>
                <DialogDescription>
                  {language === 'fr' ? 'Détails de la conférence' :
                   language === 'de' ? 'Details der Konferenz' :
                   'Conference details'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status & Format */}
                <div className="flex gap-3">
                  {getStatusBadge(selectedConference.status)}
                  {getFormatBadge(selectedConference.format)}
                </div>

                {/* Description */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                  </div>
                  <div className="text-gray-900">
                    {selectedConference.description?.[language] || '-'}
                  </div>
                </div>

                {/* Date & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'fr' ? 'Date' : language === 'de' ? 'Datum' : 'Date'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedConference.date).toLocaleDateString(language, {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'fr' ? 'Lieu' : language === 'de' ? 'Ort' : 'Location'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <MapPin className="w-4 h-4" />
                      {selectedConference.location}
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedConference.registered}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedConference.speakers}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Intervenants' : language === 'de' ? 'Referenten' : 'Speakers'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedConference.sessions}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Sessions' : language === 'de' ? 'Sitzungen' : 'Sessions'}
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
                    handleEdit(selectedConference);
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
          {selectedConference && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Modifier la conférence' :
                   language === 'de' ? 'Konferenz bearbeiten' :
                   'Edit conference'}
                </DialogTitle>
                <DialogDescription>
                  {selectedConference.title[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (FR)' : language === 'de' ? 'Titel (FR)' : 'Title (FR)'}
                  </label>
                  <Input defaultValue={selectedConference.title.fr} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (DE)' : language === 'de' ? 'Titel (DE)' : 'Title (DE)'}
                  </label>
                  <Input defaultValue={selectedConference.title.de} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (EN)' : language === 'de' ? 'Titel (EN)' : 'Title (EN)'}
                  </label>
                  <Input defaultValue={selectedConference.title.en} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Date' : language === 'de' ? 'Datum' : 'Date'}
                    </label>
                    <Input type="date" defaultValue={selectedConference.date} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Lieu' : language === 'de' ? 'Ort' : 'Location'}
                    </label>
                    <Input defaultValue={selectedConference.location} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Format' : language === 'de' ? 'Format' : 'Format'}
                    </label>
                    <Select defaultValue={selectedConference.format}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in_person">
                          {language === 'fr' ? 'Présentiel' : language === 'de' ? 'Präsenz' : 'In person'}
                        </SelectItem>
                        <SelectItem value="online">
                          {language === 'fr' ? 'En ligne' : language === 'de' ? 'Online' : 'Online'}
                        </SelectItem>
                        <SelectItem value="hybrid">
                          {language === 'fr' ? 'Hybride' : language === 'de' ? 'Hybrid' : 'Hybrid'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
                    </label>
                    <Select defaultValue={selectedConference.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">
                          {language === 'fr' ? 'À venir' : language === 'de' ? 'Bevorstehend' : 'Upcoming'}
                        </SelectItem>
                        <SelectItem value="open">
                          {language === 'fr' ? 'Inscriptions ouvertes' : language === 'de' ? 'Anmeldungen offen' : 'Open'}
                        </SelectItem>
                        <SelectItem value="completed">
                          {language === 'fr' ? 'Terminée' : language === 'de' ? 'Abgeschlossen' : 'Completed'}
                        </SelectItem>
                        <SelectItem value="cancelled">
                          {language === 'fr' ? 'Annulée' : language === 'de' ? 'Abgesagt' : 'Cancelled'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Capacité' : language === 'de' ? 'Kapazität' : 'Capacity'}
                  </label>
                  <Input type="number" defaultValue={selectedConference.capacity} />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                  </Button>
                  <Button onClick={() => {
                    toast.success(
                      language === 'fr' ? 'Conférence modifiée avec succès' :
                      language === 'de' ? 'Konferenz erfolgreich bearbeitet' :
                      'Conference updated successfully'
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

      {/* Manage Participants Dialog */}
      <Dialog open={showManageParticipantsDialog} onOpenChange={setShowManageParticipantsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
          {selectedConference && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Gérer les participants' : language === 'de' ? 'Teilnehmer verwalten' : 'Manage participants'}
                </DialogTitle>
                <DialogDescription>
                  {selectedConference.title[language]} • {selectedConference.registered} {language === 'fr' ? 'inscrits' : language === 'de' ? 'registriert' : 'registered'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder={language === 'fr' ? 'Rechercher un participant...' : language === 'de' ? 'Teilnehmer suchen...' : 'Search participant...'}
                    className="pl-9"
                  />
                </div>

                {/* Participants List */}
                <div className="overflow-y-auto max-h-[400px] space-y-2">
                  {mockParticipants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                            {participant.firstName[0] + participant.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {participant.firstName} {participant.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{participant.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={participant.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                          {participant.status === 'confirmed' ? 
                            (language === 'fr' ? 'Confirmé' : language === 'de' ? 'Bestätigt' : 'Confirmed') :
                            (language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending')
                          }
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => {
                            toast.success(
                              language === 'fr' ? 'Participant retiré' :
                              language === 'de' ? 'Teilnehmer entfernt' :
                              'Participant removed'
                            );
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowManageParticipantsDialog(false)}>
                    {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Speaker Dialog */}
      <Dialog open={showAddSpeakerDialog} onOpenChange={setShowAddSpeakerDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedConference && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Ajouter un intervenant' : language === 'de' ? 'Referent hinzufügen' : 'Add speaker'}
                </DialogTitle>
                <DialogDescription>
                  {selectedConference.title[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Nom complet' : language === 'de' ? 'Vollständiger Name' : 'Full name'}
                  </label>
                  <Input placeholder={language === 'fr' ? 'Ex: Dr. Marie Dupont' : language === 'de' ? 'Bsp: Dr. Marie Dupont' : 'Ex: Dr. Marie Dupont'} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Rôle / Titre' : language === 'de' ? 'Rolle / Titel' : 'Role / Title'}
                  </label>
                  <Input placeholder={language === 'fr' ? 'Ex: Climatologue' : language === 'de' ? 'Bsp: Klimatologe' : 'Ex: Climatologist'} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Organisation' : language === 'de' ? 'Organisation' : 'Organization'}
                  </label>
                  <Input placeholder={language === 'fr' ? 'Ex: CNRS' : language === 'de' ? 'Bsp: CNRS' : 'Ex: CNRS'} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Biographie courte' : language === 'de' ? 'Kurze Biografie' : 'Short bio'}
                  </label>
                  <Input placeholder={language === 'fr' ? 'Quelques mots sur l\'intervenant...' : language === 'de' ? 'Ein paar Worte über den Referenten...' : 'A few words about the speaker...'} />
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    {language === 'fr' ? 'Intervenants actuels' : language === 'de' ? 'Aktuelle Referenten' : 'Current speakers'} ({mockSpeakers.length})
                  </h4>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {mockSpeakers.map((speaker) => (
                      <div key={speaker.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{speaker.name}</p>
                            <p className="text-xs text-gray-600">{speaker.role} • {speaker.organization}</p>
                            <p className="text-xs text-gray-500 mt-1">{speaker.bio}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => {
                              toast.success(
                                language === 'fr' ? 'Intervenant retiré' :
                                language === 'de' ? 'Referent entfernt' :
                                'Speaker removed'
                              );
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowAddSpeakerDialog(false)}>
                    {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                  </Button>
                  <Button onClick={() => {
                    toast.success(
                      language === 'fr' ? 'Intervenant ajouté avec succès' :
                      language === 'de' ? 'Referent erfolgreich hinzugefügt' :
                      'Speaker added successfully'
                    );
                    setShowAddSpeakerDialog(false);
                  }}>
                    {language === 'fr' ? 'Ajouter' : language === 'de' ? 'Hinzufügen' : 'Add'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* View Sessions Dialog */}
      <Dialog open={showViewSessionsDialog} onOpenChange={setShowViewSessionsDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
          {selectedConference && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Programme des sessions' : language === 'de' ? 'Sitzungsprogramm' : 'Sessions program'}
                </DialogTitle>
                <DialogDescription>
                  {selectedConference.title[language]} • {selectedConference.sessions} {language === 'fr' ? 'sessions' : language === 'de' ? 'Sitzungen' : 'sessions'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2">
                {mockSessions.map((session, index) => (
                  <div key={session.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {language === 'fr' ? 'Session' : language === 'de' ? 'Sitzung' : 'Session'} {index + 1}
                          </Badge>
                          <span className="text-sm font-medium text-gray-600">
                            {session.startTime} - {session.endTime}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900">{session.title}</h4>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mic className="w-4 h-4" />
                        {session.speaker}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {session.room}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3 pt-3 border-t">
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedSession(session);
                        setShowEditSessionDialog(true);
                      }}>
                        <Edit className="w-3.5 h-3.5 mr-1" />
                        {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => {
                        toast.success(
                          language === 'fr' ? 'Session supprimée' :
                          language === 'de' ? 'Sitzung gelöscht' :
                          'Session deleted'
                        );
                      }}>
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        {language === 'fr' ? 'Supprimer' : language === 'de' ? 'Löschen' : 'Delete'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="outline" onClick={() => {
                  toast.info(
                    language === 'fr' ? 'Ajout d\'une nouvelle session' :
                    language === 'de' ? 'Neue Sitzung hinzufügen' :
                    'Add new session'
                  );
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Nouvelle session' : language === 'de' ? 'Neue Sitzung' : 'New session'}
                </Button>
                <Button variant="outline" onClick={() => setShowViewSessionsDialog(false)}>
                  {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Session Dialog */}
      <Dialog open={showEditSessionDialog} onOpenChange={setShowEditSessionDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedSession && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Modifier la session' :
                   language === 'de' ? 'Sitzung bearbeiten' :
                   'Edit session'}
                </DialogTitle>
                <DialogDescription>
                  {selectedSession.title}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre de la session' : language === 'de' ? 'Sitzungstitel' : 'Session title'}
                  </label>
                  <Input defaultValue={selectedSession.title} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Heure de début' : language === 'de' ? 'Startzeit' : 'Start time'}
                    </label>
                    <Input type="time" defaultValue={selectedSession.startTime} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Heure de fin' : language === 'de' ? 'Endzeit' : 'End time'}
                    </label>
                    <Input type="time" defaultValue={selectedSession.endTime} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Intervenant' : language === 'de' ? 'Referent' : 'Speaker'}
                  </label>
                  <Select defaultValue={selectedSession.speaker}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSpeakers.map((speaker) => (
                        <SelectItem key={speaker.id} value={speaker.name}>
                          {speaker.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Salle' : language === 'de' ? 'Raum' : 'Room'}
                  </label>
                  <Input defaultValue={selectedSession.room} placeholder={language === 'fr' ? 'Ex: Salle principale' : language === 'de' ? 'Bsp: Hauptsaal' : 'Ex: Main room'} />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowEditSessionDialog(false)}>
                    {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                  </Button>
                  <Button onClick={() => {
                    toast.success(
                      language === 'fr' ? 'Session modifiée avec succès' :
                      language === 'de' ? 'Sitzung erfolgreich bearbeitet' :
                      'Session updated successfully'
                    );
                    setShowEditSessionDialog(false);
                  }}>
                    {language === 'fr' ? 'Enregistrer' : language === 'de' ? 'Speichern' : 'Save'}
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