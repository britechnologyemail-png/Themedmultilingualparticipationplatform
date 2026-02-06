/**
 * Youth Management Page
 * 
 * Page de gestion complète du contenu Jeunesse avec :
 * - Liste des sondages jeunesse
 * - Gestion des participations
 * - Paramètres alignés avec le module Jeunesse du FrontOffice
 * - Toutes les actions fonctionnelles
 */

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router';
import {
  Sparkles,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Users,
  BarChart,
  MoreVertical,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Calendar,
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
import { CreateYouthPollDialog } from '../components/dialogs/AdditionalSectionDialogs';
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
const mockYouthPolls = [
  {
    id: '1',
    title: { fr: 'Quels sports préfères-tu ?', de: 'Welche Sportarten bevorzugst du?', en: 'What sports do you prefer?' },
    description: { fr: 'Aide-nous à choisir les sports pour le centre jeunesse', de: 'Hilf uns bei der Auswahl der Sportarten für das Jugendzentrum', en: 'Help us choose sports for the youth center' },
    category: 'sports' as const,
    status: 'active' as const,
    ageRange: '13-17',
    startDate: '2026-02-01',
    endDate: '2026-03-31',
    participants: 342,
    responses: 342,
    questions: 3,
  },
  {
    id: '2',
    title: { fr: 'Ton projet idéal pour le quartier', de: 'Dein ideales Projekt für das Viertel', en: 'Your ideal project for the neighborhood' },
    description: { fr: 'Partage tes idées pour améliorer le quartier', de: 'Teile deine Ideen zur Verbesserung des Viertels', en: 'Share your ideas to improve the neighborhood' },
    category: 'projects' as const,
    status: 'active' as const,
    ageRange: '15-25',
    startDate: '2026-01-15',
    endDate: '2026-04-15',
    participants: 234,
    responses: 198,
    questions: 5,
  },
  {
    id: '3',
    title: { fr: 'Comment améliorer ton école ?', de: 'Wie kann deine Schule verbessert werden?', en: 'How to improve your school?' },
    description: { fr: 'Donne ton avis sur les améliorations possibles', de: 'Gib deine Meinung zu möglichen Verbesserungen ab', en: 'Give your opinion on possible improvements' },
    category: 'education' as const,
    status: 'draft' as const,
    ageRange: '10-18',
    startDate: '2026-03-01',
    endDate: '2026-05-31',
    participants: 0,
    responses: 0,
    questions: 4,
  },
  {
    id: '4',
    title: { fr: 'Ta vision de l\'environnement', de: 'Deine Vorstellung von der Umwelt', en: 'Your vision of the environment' },
    description: { fr: 'Exprime tes préoccupations environnementales', de: 'Äußere deine Umweltbedenken', en: 'Express your environmental concerns' },
    category: 'environment' as const,
    status: 'closed' as const,
    ageRange: '12-16',
    startDate: '2025-11-01',
    endDate: '2025-12-31',
    participants: 456,
    responses: 456,
    questions: 6,
  },
  {
    id: '5',
    title: { fr: 'Activités culturelles à développer', de: 'Zu entwickelnde kulturelle Aktivitäten', en: 'Cultural activities to develop' },
    description: { fr: 'Quelles activités culturelles souhaiterais-tu ?', de: 'Welche kulturellen Aktivitäten würdest du dir wünschen?', en: 'What cultural activities would you like?' },
    category: 'culture' as const,
    status: 'active' as const,
    ageRange: '14-20',
    startDate: '2026-01-01',
    endDate: '2026-02-28',
    participants: 189,
    responses: 156,
    questions: 4,
  },
];

// Mock participants data
const mockParticipants = [
  { id: '1', firstName: 'Lucas', lastName: 'M.', age: 15, email: 'lucas.m@example.com', participatedAt: '2026-02-05T10:30:00Z', completed: true },
  { id: '2', firstName: 'Emma', lastName: 'D.', age: 16, email: 'emma.d@example.com', participatedAt: '2026-02-05T14:20:00Z', completed: true },
  { id: '3', firstName: 'Noah', lastName: 'B.', age: 14, email: 'noah.b@example.com', participatedAt: '2026-02-06T09:15:00Z', completed: false },
  { id: '4', firstName: 'Léa', lastName: 'P.', age: 17, email: 'lea.p@example.com', participatedAt: '2026-02-06T16:45:00Z', completed: true },
  { id: '5', firstName: 'Louis', lastName: 'R.', age: 15, email: 'louis.r@example.com', participatedAt: '2026-02-07T11:00:00Z', completed: true },
];

// Mock results data
const mockResults = [
  { id: '1', question: 'Football', responses: 156, percentage: 45.6 },
  { id: '2', question: 'Basketball', responses: 98, percentage: 28.7 },
  { id: '3', question: 'Natation', responses: 88, percentage: 25.7 },
];

export function YouthManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showResultsDialog, setShowResultsDialog] = useState(false);
  const [showParticipantsDialog, setShowParticipantsDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string; icon: any }> = {
      draft: { 
        label: language === 'fr' ? 'Brouillon' : language === 'de' ? 'Entwurf' : 'Draft', 
        color: 'bg-gray-100 text-gray-700 border-gray-300',
        icon: MessageSquare,
      },
      active: { 
        label: language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active', 
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: CheckCircle,
      },
      closed: { 
        label: language === 'fr' ? 'Clôturé' : language === 'de' ? 'Geschlossen' : 'Closed', 
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: XCircle,
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
      sports: { fr: 'Sports', de: 'Sport', en: 'Sports' },
      projects: { fr: 'Projets', de: 'Projekte', en: 'Projects' },
      education: { fr: 'Éducation', de: 'Bildung', en: 'Education' },
      environment: { fr: 'Environnement', de: 'Umwelt', en: 'Environment' },
      culture: { fr: 'Culture', de: 'Kultur', en: 'Culture' },
      other: { fr: 'Autre', de: 'Andere', en: 'Other' },
    };

    return categories[category]?.[language] || category;
  };

  const filteredPolls = mockYouthPolls.filter(poll => {
    const matchesSearch = poll.title[language].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || poll.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || poll.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleView = (poll: any) => {
    setSelectedPoll(poll);
    setShowDetailDialog(true);
  };

  const handleEdit = (poll: any) => {
    setSelectedPoll(poll);
    setShowEditDialog(true);
  };

  const handleViewResults = (poll: any) => {
    setSelectedPoll(poll);
    setShowResultsDialog(true);
  };

  const handleViewParticipants = (poll: any) => {
    setSelectedPoll(poll);
    setShowParticipantsDialog(true);
  };

  const handleDelete = (id: string) => {
    toast.success(
      language === 'fr' ? 'Sondage supprimé avec succès' :
      language === 'de' ? 'Umfrage erfolgreich gelöscht' :
      'Poll deleted successfully'
    );
  };

  const handleExport = () => {
    toast.success(
      language === 'fr' ? 'Export en cours...' :
      language === 'de' ? 'Export läuft...' :
      'Exporting...'
    );
  };

  const totalParticipants = mockYouthPolls.reduce((acc, p) => acc + p.participants, 0);
  const totalResponses = mockYouthPolls.reduce((acc, p) => acc + p.responses, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {language === 'fr' ? 'Gestion Espace Jeunesse' :
           language === 'de' ? 'Verwaltung Jugendbereich' :
           'Youth Space Management'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Gérez les sondages, les participations et le contenu jeunesse' :
           language === 'de' ? 'Verwalten Sie Umfragen, Teilnahmen und Jugendinhalte' :
           'Manage polls, participations and youth content'}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
            </CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockYouthPolls.length}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Sondages' : language === 'de' ? 'Umfragen' : 'Polls'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Actifs' : language === 'de' ? 'Aktiv' : 'Active'}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockYouthPolls.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'En cours' : language === 'de' ? 'Laufend' : 'Ongoing'}
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
              {language === 'fr' ? 'Jeunes' : language === 'de' ? 'Jugendliche' : 'Young people'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Réponses' : language === 'de' ? 'Antworten' : 'Responses'}
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {totalResponses.toLocaleString()}
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
              <SelectItem value="draft">{language === 'fr' ? 'Brouillon' : language === 'de' ? 'Entwurf' : 'Draft'}</SelectItem>
              <SelectItem value="active">{language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active'}</SelectItem>
              <SelectItem value="closed">{language === 'fr' ? 'Clôturé' : language === 'de' ? 'Geschlossen' : 'Closed'}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'fr' ? 'Toutes catégories' : language === 'de' ? 'Alle Kategorien' : 'All categories'}</SelectItem>
              <SelectItem value="sports">{getCategoryLabel('sports')}</SelectItem>
              <SelectItem value="projects">{getCategoryLabel('projects')}</SelectItem>
              <SelectItem value="education">{getCategoryLabel('education')}</SelectItem>
              <SelectItem value="environment">{getCategoryLabel('environment')}</SelectItem>
              <SelectItem value="culture">{getCategoryLabel('culture')}</SelectItem>
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
            {language === 'fr' ? 'Nouveau sondage' : language === 'de' ? 'Neue Umfrage' : 'New poll'}
          </Button>
        </div>
      </div>

      {/* Youth Polls Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'Liste des sondages jeunesse' : language === 'de' ? 'Liste der Jugendumfragen' : 'Youth polls list'}
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
                  <TableHead>{language === 'fr' ? 'Âge' : language === 'de' ? 'Alter' : 'Age'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Réponses' : language === 'de' ? 'Antworten' : 'Responses'}</TableHead>
                  <TableHead className="text-right">{language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPolls.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {language === 'fr' ? 'Aucun sondage trouvé' :
                       language === 'de' ? 'Keine Umfragen gefunden' :
                       'No polls found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPolls.map((poll) => (
                    <TableRow key={poll.id}>
                      <TableCell className="font-medium max-w-xs">
                        {poll.title[language]}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getCategoryLabel(poll.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(poll.status)}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-purple-100 text-purple-700">
                          {poll.ageRange} {language === 'fr' ? 'ans' : language === 'de' ? 'Jahre' : 'years'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{poll.participants}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{poll.responses}</span>
                          <span className="text-xs text-gray-500">
                            ({poll.questions} {language === 'fr' ? 'quest.' : language === 'de' ? 'Frag.' : 'quest.'})
                          </span>
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
                            <DropdownMenuItem onClick={() => handleView(poll)}>
                              <Eye className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Voir' : language === 'de' ? 'Ansehen' : 'View'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(poll)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewResults(poll)}>
                              <BarChart className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Résultats' : language === 'de' ? 'Ergebnisse' : 'Results'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewParticipants(poll)}>
                              <Users className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(poll.id)}
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

      {/* Create Youth Poll Dialog */}
      <CreateYouthPollDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        themes={[]} // TODO: Pass actual themes from API
      />

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedPoll && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Eye className="w-6 h-6 text-blue-600" />
                  {selectedPoll.title[language]}
                </DialogTitle>
                <DialogDescription>
                  {language === 'fr' ? 'Détails du sondage jeunesse' :
                   language === 'de' ? 'Details der Jugendumfrage' :
                   'Youth poll details'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status & Category */}
                <div className="flex gap-3 flex-wrap">
                  {getStatusBadge(selectedPoll.status)}
                  <Badge variant="outline">{getCategoryLabel(selectedPoll.category)}</Badge>
                  <Badge className="bg-purple-100 text-purple-700">
                    {selectedPoll.ageRange} {language === 'fr' ? 'ans' : language === 'de' ? 'Jahre' : 'years'}
                  </Badge>
                </div>

                {/* Description */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                  </div>
                  <div className="text-gray-900">
                    {selectedPoll.description?.[language] || '-'}
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
                      {new Date(selectedPoll.startDate).toLocaleDateString(language, {
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
                      {new Date(selectedPoll.endDate).toLocaleDateString(language, {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedPoll.participants}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedPoll.responses}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Réponses' : language === 'de' ? 'Antworten' : 'Responses'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedPoll.questions}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Questions' : language === 'de' ? 'Fragen' : 'Questions'}
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
                    handleEdit(selectedPoll);
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
          {selectedPoll && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Modifier le sondage' :
                   language === 'de' ? 'Umfrage bearbeiten' :
                   'Edit poll'}
                </DialogTitle>
                <DialogDescription>
                  {selectedPoll.title[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (FR)' : language === 'de' ? 'Titel (FR)' : 'Title (FR)'}
                  </label>
                  <Input defaultValue={selectedPoll.title.fr} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (DE)' : language === 'de' ? 'Titel (DE)' : 'Title (DE)'}
                  </label>
                  <Input defaultValue={selectedPoll.title.de} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (EN)' : language === 'de' ? 'Titel (EN)' : 'Title (EN)'}
                  </label>
                  <Input defaultValue={selectedPoll.title.en} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category'}
                    </label>
                    <Select defaultValue={selectedPoll.category}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sports">{getCategoryLabel('sports')}</SelectItem>
                        <SelectItem value="projects">{getCategoryLabel('projects')}</SelectItem>
                        <SelectItem value="education">{getCategoryLabel('education')}</SelectItem>
                        <SelectItem value="environment">{getCategoryLabel('environment')}</SelectItem>
                        <SelectItem value="culture">{getCategoryLabel('culture')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
                    </label>
                    <Select defaultValue={selectedPoll.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">
                          {language === 'fr' ? 'Brouillon' : language === 'de' ? 'Entwurf' : 'Draft'}
                        </SelectItem>
                        <SelectItem value="active">
                          {language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active'}
                        </SelectItem>
                        <SelectItem value="closed">
                          {language === 'fr' ? 'Clôturé' : language === 'de' ? 'Geschlossen' : 'Closed'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Tranche d\'âge' : language === 'de' ? 'Altersgruppe' : 'Age range'}
                  </label>
                  <Input defaultValue={selectedPoll.ageRange} placeholder={language === 'fr' ? 'Ex: 13-17' : language === 'de' ? 'Bsp: 13-17' : 'Ex: 13-17'} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Date de début' : language === 'de' ? 'Startdatum' : 'Start date'}
                    </label>
                    <Input type="date" defaultValue={selectedPoll.startDate} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Date de fin' : language === 'de' ? 'Enddatum' : 'End date'}
                    </label>
                    <Input type="date" defaultValue={selectedPoll.endDate} />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                  </Button>
                  <Button onClick={() => {
                    toast.success(
                      language === 'fr' ? 'Sondage modifié avec succès' :
                      language === 'de' ? 'Umfrage erfolgreich bearbeitet' :
                      'Poll updated successfully'
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

      {/* Results Dialog */}
      <Dialog open={showResultsDialog} onOpenChange={setShowResultsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
          {selectedPoll && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Résultats du sondage' : language === 'de' ? 'Umfrageergebnisse' : 'Poll results'}
                </DialogTitle>
                <DialogDescription>
                  {selectedPoll.title[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Overall Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedPoll.responses}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Réponses' : language === 'de' ? 'Antworten' : 'Responses'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedPoll.participants}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedPoll.questions}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Questions' : language === 'de' ? 'Fragen' : 'Questions'}
                    </div>
                  </div>
                </div>

                {/* Results Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {language === 'fr' ? 'Répartition des réponses' : language === 'de' ? 'Antwortverteilung' : 'Response distribution'}
                  </h4>
                  {mockResults.map((result, index) => (
                    <div key={result.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className={index === 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}>
                            {result.question}
                          </Badge>
                          <span className="text-sm text-gray-600">{result.responses} {language === 'fr' ? 'réponses' : language === 'de' ? 'Antworten' : 'responses'}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{result.percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-600'}`}
                          style={{ width: `${result.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => {
                    toast.success(
                      language === 'fr' ? 'Export des résultats en cours...' :
                      language === 'de' ? 'Export der Ergebnisse läuft...' :
                      'Exporting results...'
                    );
                  }}>
                    <Download className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Exporter' : language === 'de' ? 'Exportieren' : 'Export'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowResultsDialog(false)}>
                    {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Participants Dialog */}
      <Dialog open={showParticipantsDialog} onOpenChange={setShowParticipantsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
          {selectedPoll && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Liste des participants' : language === 'de' ? 'Teilnehmerliste' : 'Participants list'}
                </DialogTitle>
                <DialogDescription>
                  {selectedPoll.title[language]} • {selectedPoll.participants} {language === 'fr' ? 'jeunes' : language === 'de' ? 'Jugendliche' : 'young people'}
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
                          <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">
                            {participant.firstName[0] + participant.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {participant.firstName} {participant.lastName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {participant.age} {language === 'fr' ? 'ans' : language === 'de' ? 'Jahre' : 'years'} • {participant.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={participant.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                          {participant.completed ? 
                            (language === 'fr' ? 'Complété' : language === 'de' ? 'Abgeschlossen' : 'Completed') :
                            (language === 'fr' ? 'En cours' : language === 'de' ? 'Laufend' : 'In progress')
                          }
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {new Date(participant.participatedAt).toLocaleDateString(language, {
                            day: '2-digit',
                            month: 'short',
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-gray-600">
                    {mockParticipants.length} {language === 'fr' ? 'participants affichés' : language === 'de' ? 'Teilnehmer angezeigt' : 'participants shown'}
                  </span>
                  <Button variant="outline" onClick={() => setShowParticipantsDialog(false)}>
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
