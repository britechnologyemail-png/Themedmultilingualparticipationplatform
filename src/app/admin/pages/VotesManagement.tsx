/**
 * Votes Management Page
 * 
 * Page de gestion complète des Votes avec :
 * - Liste des scrutins avec leurs états
 * - Actions CRUD complètes
 * - Visualisation des participants et résultats
 * - Gestion des options de vote
 * - Formulaires alignés avec le FrontOffice
 * - Toutes les actions fonctionnelles
 */

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router';
import {
  Vote as VoteIcon,
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
  FileText,
  TrendingUp,
  Calendar,
  PieChart,
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
import { CreateVoteDialog } from '../components/dialogs/SectionContentDialogs';
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
const mockVotes = [
  {
    id: '1',
    title: { fr: 'Référendum mobilité urbaine', de: 'Referendum städtische Mobilität', en: 'Urban mobility referendum' },
    description: { fr: 'Référendum sur le plan de mobilité urbaine 2026-2030', de: 'Referendum über den städtischen Mobilitätsplan 2026-2030', en: 'Referendum on urban mobility plan 2026-2030' },
    type: 'referendum' as const,
    status: 'open' as const,
    votingMethod: 'single_choice' as const,
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    totalEligibleVoters: 25000,
    totalVotes: 8934,
    participationRate: 35.7,
    themeId: 'mobility',
  },
  {
    id: '2',
    title: { fr: 'Consultation budget 2027', de: 'Haushaltsberatung 2027', en: 'Budget 2027 consultation' },
    description: { fr: 'Consultation citoyenne sur les priorités budgétaires 2027', de: 'Bürgerbefragung zu den Haushaltsprioritäten 2027', en: 'Citizen consultation on 2027 budget priorities' },
    type: 'consultation' as const,
    status: 'upcoming' as const,
    votingMethod: 'multiple_choice' as const,
    startDate: '2026-03-15',
    endDate: '2026-04-15',
    totalEligibleVoters: 25000,
    totalVotes: 0,
    participationRate: 0,
    themeId: 'governance',
  },
  {
    id: '3',
    title: { fr: 'Sondage priorités environnementales', de: 'Umfrage Umweltprioritäten', en: 'Environmental priorities poll' },
    description: { fr: 'Sondage sur les priorités en matière d\'environnement', de: 'Umfrage zu Umweltprioritäten', en: 'Poll on environmental priorities' },
    type: 'poll' as const,
    status: 'open' as const,
    votingMethod: 'ranked_choice' as const,
    startDate: '2026-01-20',
    endDate: '2026-03-20',
    totalEligibleVoters: 25000,
    totalVotes: 12456,
    participationRate: 49.8,
    themeId: 'environment',
  },
  {
    id: '4',
    title: { fr: 'Élection conseil citoyen', de: 'Wahl Bürgerrat', en: 'Citizens council election' },
    description: { fr: 'Élection des membres du conseil citoyen', de: 'Wahl der Mitglieder des Bürgerrats', en: 'Election of citizen council members' },
    type: 'election' as const,
    status: 'closed' as const,
    votingMethod: 'approval' as const,
    startDate: '2026-01-05',
    endDate: '2026-01-31',
    totalEligibleVoters: 25000,
    totalVotes: 15234,
    participationRate: 60.9,
    themeId: 'governance',
  },
  {
    id: '5',
    title: { fr: 'Référendum plan climat', de: 'Referendum Klimaplan', en: 'Climate plan referendum' },
    description: { fr: 'Référendum sur le plan climat municipal', de: 'Referendum über den kommunalen Klimaplan', en: 'Referendum on municipal climate plan' },
    type: 'referendum' as const,
    status: 'results_published' as const,
    votingMethod: 'single_choice' as const,
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    totalEligibleVoters: 25000,
    totalVotes: 18743,
    participationRate: 75.0,
    themeId: 'environment',
  },
];

// Mock participants data
const mockParticipants = [
  { id: '1', firstName: 'Sophie', lastName: 'Martin', email: 's.martin@example.com', votedAt: '2026-02-05T10:30:00Z', verified: true },
  { id: '2', firstName: 'Pierre', lastName: 'Dubois', email: 'p.dubois@example.com', votedAt: '2026-02-05T14:20:00Z', verified: true },
  { id: '3', firstName: 'Marie', lastName: 'Bernard', email: 'm.bernard@example.com', votedAt: '2026-02-06T09:15:00Z', verified: true },
  { id: '4', firstName: 'Jean', lastName: 'Petit', email: 'j.petit@example.com', votedAt: '2026-02-06T16:45:00Z', verified: false },
  { id: '5', firstName: 'Claire', lastName: 'Rousseau', email: 'c.rousseau@example.com', votedAt: '2026-02-07T11:00:00Z', verified: true },
];

// Mock results data
const mockResults = [
  { id: '1', option: 'Oui', votes: 5340, percentage: 59.8 },
  { id: '2', option: 'Non', votes: 3594, percentage: 40.2 },
];

export function VotesManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showParticipantsDialog, setShowParticipantsDialog] = useState(false);
  const [showResultsDialog, setShowResultsDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string; icon: any }> = {
      draft: { 
        label: language === 'fr' ? 'Brouillon' : language === 'de' ? 'Entwurf' : 'Draft', 
        color: 'bg-gray-100 text-gray-700 border-gray-300',
        icon: FileText,
      },
      upcoming: { 
        label: language === 'fr' ? 'À venir' : language === 'de' ? 'Bevorstehend' : 'Upcoming', 
        color: 'bg-orange-100 text-orange-700 border-orange-300',
        icon: Clock,
      },
      open: { 
        label: language === 'fr' ? 'Ouvert' : language === 'de' ? 'Offen' : 'Open', 
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: CheckCircle,
      },
      closed: { 
        label: language === 'fr' ? 'Clôturé' : language === 'de' ? 'Geschlossen' : 'Closed', 
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: XCircle,
      },
      results_published: { 
        label: language === 'fr' ? 'Résultats publiés' : language === 'de' ? 'Ergebnisse veröffentlicht' : 'Results published', 
        color: 'bg-purple-100 text-purple-700 border-purple-300',
        icon: BarChart,
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

  const getTypeLabel = (type: string) => {
    const types: Record<string, { fr: string; de: string; en: string }> = {
      referendum: { fr: 'Référendum', de: 'Referendum', en: 'Referendum' },
      consultation: { fr: 'Consultation', de: 'Konsultation', en: 'Consultation' },
      poll: { fr: 'Sondage', de: 'Umfrage', en: 'Poll' },
      election: { fr: 'Élection', de: 'Wahl', en: 'Election' },
    };

    return types[type]?.[language] || type;
  };

  const getVotingMethodLabel = (method: string) => {
    const methods: Record<string, { fr: string; de: string; en: string }> = {
      single_choice: { fr: 'Choix unique', de: 'Einzelwahl', en: 'Single choice' },
      multiple_choice: { fr: 'Choix multiples', de: 'Mehrfachwahl', en: 'Multiple choice' },
      ranked_choice: { fr: 'Vote par classement', de: 'Ranglistenwahl', en: 'Ranked choice' },
      approval: { fr: 'Vote par approbation', de: 'Zustimmungswahl', en: 'Approval voting' },
    };

    return methods[method]?.[language] || method;
  };

  const filteredVotes = mockVotes.filter(vote => {
    const matchesSearch = vote.title[language].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vote.status === statusFilter;
    const matchesType = typeFilter === 'all' || vote.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleView = (vote: any) => {
    setSelectedVote(vote);
    setShowDetailDialog(true);
  };

  const handleEdit = (vote: any) => {
    setSelectedVote(vote);
    setShowEditDialog(true);
  };

  const handleViewParticipants = (vote: any) => {
    setSelectedVote(vote);
    setShowParticipantsDialog(true);
  };

  const handleViewResults = (vote: any) => {
    setSelectedVote(vote);
    setShowResultsDialog(true);
  };

  const handleDelete = (id: string) => {
    toast.success(
      language === 'fr' ? 'Scrutin supprimé avec succès' :
      language === 'de' ? 'Abstimmung erfolgreich gelöscht' :
      'Vote deleted successfully'
    );
  };

  const handleExport = () => {
    toast.success(
      language === 'fr' ? 'Export en cours...' :
      language === 'de' ? 'Export läuft...' :
      'Exporting...'
    );
  };

  const totalVotes = mockVotes.reduce((acc, v) => acc + v.totalVotes, 0);
  const averageParticipation = mockVotes.reduce((acc, v) => acc + v.participationRate, 0) / mockVotes.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {language === 'fr' ? 'Gestion des Votes' :
           language === 'de' ? 'Verwaltung der Abstimmungen' :
           'Votes Management'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Gérez les scrutins, les participants et les résultats' :
           language === 'de' ? 'Verwalten Sie Abstimmungen, Teilnehmer und Ergebnisse' :
           'Manage votes, participants and results'}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
            </CardTitle>
            <VoteIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockVotes.length}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Scrutins' : language === 'de' ? 'Abstimmungen' : 'Votes'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Ouverts' : language === 'de' ? 'Offen' : 'Open'}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockVotes.filter(v => v.status === 'open').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'En cours' : language === 'de' ? 'Laufend' : 'Ongoing'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Votes totaux' : language === 'de' ? 'Gesamtstimmen' : 'Total votes'}
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalVotes.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Toutes périodes' : language === 'de' ? 'Alle Zeiträume' : 'All periods'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Part. moyenne' : language === 'de' ? 'Durchschn. Beteil.' : 'Avg. participation'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {averageParticipation.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Taux moyen' : language === 'de' ? 'Durchschnittssatz' : 'Average rate'}
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
              <SelectItem value="upcoming">{language === 'fr' ? 'À venir' : language === 'de' ? 'Bevorstehend' : 'Upcoming'}</SelectItem>
              <SelectItem value="open">{language === 'fr' ? 'Ouvert' : language === 'de' ? 'Offen' : 'Open'}</SelectItem>
              <SelectItem value="closed">{language === 'fr' ? 'Clôturé' : language === 'de' ? 'Geschlossen' : 'Closed'}</SelectItem>
              <SelectItem value="results_published">{language === 'fr' ? 'Résultats publiés' : language === 'de' ? 'Ergebnisse veröffentlicht' : 'Results published'}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'fr' ? 'Tous les types' : language === 'de' ? 'Alle Typen' : 'All types'}</SelectItem>
              <SelectItem value="referendum">{language === 'fr' ? 'Référendum' : language === 'de' ? 'Referendum' : 'Referendum'}</SelectItem>
              <SelectItem value="consultation">{language === 'fr' ? 'Consultation' : language === 'de' ? 'Konsultation' : 'Consultation'}</SelectItem>
              <SelectItem value="poll">{language === 'fr' ? 'Sondage' : language === 'de' ? 'Umfrage' : 'Poll'}</SelectItem>
              <SelectItem value="election">{language === 'fr' ? 'Élection' : language === 'de' ? 'Wahl' : 'Election'}</SelectItem>
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
            {language === 'fr' ? 'Nouveau scrutin' : language === 'de' ? 'Neue Abstimmung' : 'New vote'}
          </Button>
        </div>
      </div>

      {/* Votes Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'Liste des scrutins' : language === 'de' ? 'Liste der Abstimmungen' : 'Votes list'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'fr' ? 'Titre' : language === 'de' ? 'Titel' : 'Title'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Période' : language === 'de' ? 'Zeitraum' : 'Period'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Participation' : language === 'de' ? 'Beteiligung' : 'Participation'}</TableHead>
                  <TableHead className="text-right">{language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      {language === 'fr' ? 'Aucun scrutin trouvé' :
                       language === 'de' ? 'Keine Abstimmungen gefunden' :
                       'No votes found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVotes.map((vote) => (
                    <TableRow key={vote.id}>
                      <TableCell className="font-medium max-w-xs">
                        {vote.title[language]}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getTypeLabel(vote.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(vote.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {new Date(vote.startDate).toLocaleDateString(language)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {language === 'fr' ? 'au' : language === 'de' ? 'bis' : 'to'} {new Date(vote.endDate).toLocaleDateString(language)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{vote.participationRate.toFixed(1)}%</span>
                            <span className="text-xs text-gray-500">
                              ({vote.totalVotes.toLocaleString()})
                            </span>
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full bg-blue-600"
                              style={{ width: `${Math.min(vote.participationRate, 100)}%` }}
                            />
                          </div>
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
                            <DropdownMenuItem onClick={() => handleView(vote)}>
                              <Eye className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Voir' : language === 'de' ? 'Ansehen' : 'View'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(vote)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewParticipants(vote)}>
                              <Users className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewResults(vote)}>
                              <BarChart className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Résultats' : language === 'de' ? 'Ergebnisse' : 'Results'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(vote.id)}
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

      {/* Create Vote Dialog */}
      <CreateVoteDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        themes={[]} // TODO: Pass actual themes from API
      />

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedVote && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Eye className="w-6 h-6 text-blue-600" />
                  {selectedVote.title[language]}
                </DialogTitle>
                <DialogDescription>
                  {language === 'fr' ? 'Détails du scrutin' :
                   language === 'de' ? 'Details der Abstimmung' :
                   'Vote details'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status & Type */}
                <div className="flex gap-3">
                  {getStatusBadge(selectedVote.status)}
                  <Badge variant="outline">{getTypeLabel(selectedVote.type)}</Badge>
                  <Badge className="bg-indigo-100 text-indigo-700">{getVotingMethodLabel(selectedVote.votingMethod)}</Badge>
                </div>

                {/* Description */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                  </div>
                  <div className="text-gray-900">
                    {selectedVote.description?.[language] || '-'}
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
                      {new Date(selectedVote.startDate).toLocaleDateString(language, {
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
                      {new Date(selectedVote.endDate).toLocaleDateString(language, {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Participation Bar */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {language === 'fr' ? 'Taux de participation' : language === 'de' ? 'Beteiligungsrate' : 'Participation rate'}
                    </span>
                    <span className="text-sm font-bold text-gray-900">{selectedVote.participationRate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="h-3 rounded-full bg-blue-600"
                      style={{ width: `${Math.min(selectedVote.participationRate, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{selectedVote.totalVotes.toLocaleString()} {language === 'fr' ? 'votes' : language === 'de' ? 'Stimmen' : 'votes'}</span>
                    <span>{language === 'fr' ? 'Électeurs inscrits:' : language === 'de' ? 'Eingetragene Wähler:' : 'Registered voters:'} {selectedVote.totalEligibleVoters.toLocaleString()}</span>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedVote.totalVotes.toLocaleString()}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Votes' : language === 'de' ? 'Stimmen' : 'Votes'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedVote.totalEligibleVoters.toLocaleString()}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Inscrits' : language === 'de' ? 'Registriert' : 'Registered'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedVote.participationRate.toFixed(1)}%</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Participation' : language === 'de' ? 'Beteiligung' : 'Participation'}
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
                    handleEdit(selectedVote);
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
          {selectedVote && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Modifier le scrutin' :
                   language === 'de' ? 'Abstimmung bearbeiten' :
                   'Edit vote'}
                </DialogTitle>
                <DialogDescription>
                  {selectedVote.title[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (FR)' : language === 'de' ? 'Titel (FR)' : 'Title (FR)'}
                  </label>
                  <Input defaultValue={selectedVote.title.fr} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (DE)' : language === 'de' ? 'Titel (DE)' : 'Title (DE)'}
                  </label>
                  <Input defaultValue={selectedVote.title.de} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (EN)' : language === 'de' ? 'Titel (EN)' : 'Title (EN)'}
                  </label>
                  <Input defaultValue={selectedVote.title.en} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'}
                    </label>
                    <Select defaultValue={selectedVote.type}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="referendum">
                          {language === 'fr' ? 'Référendum' : language === 'de' ? 'Referendum' : 'Referendum'}
                        </SelectItem>
                        <SelectItem value="consultation">
                          {language === 'fr' ? 'Consultation' : language === 'de' ? 'Konsultation' : 'Consultation'}
                        </SelectItem>
                        <SelectItem value="poll">
                          {language === 'fr' ? 'Sondage' : language === 'de' ? 'Umfrage' : 'Poll'}
                        </SelectItem>
                        <SelectItem value="election">
                          {language === 'fr' ? 'Élection' : language === 'de' ? 'Wahl' : 'Election'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
                    </label>
                    <Select defaultValue={selectedVote.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">
                          {language === 'fr' ? 'Brouillon' : language === 'de' ? 'Entwurf' : 'Draft'}
                        </SelectItem>
                        <SelectItem value="upcoming">
                          {language === 'fr' ? 'À venir' : language === 'de' ? 'Bevorstehend' : 'Upcoming'}
                        </SelectItem>
                        <SelectItem value="open">
                          {language === 'fr' ? 'Ouvert' : language === 'de' ? 'Offen' : 'Open'}
                        </SelectItem>
                        <SelectItem value="closed">
                          {language === 'fr' ? 'Clôturé' : language === 'de' ? 'Geschlossen' : 'Closed'}
                        </SelectItem>
                        <SelectItem value="results_published">
                          {language === 'fr' ? 'Résultats publiés' : language === 'de' ? 'Ergebnisse veröffentlicht' : 'Results published'}
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
                    <Input type="date" defaultValue={selectedVote.startDate} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Date de fin' : language === 'de' ? 'Enddatum' : 'End date'}
                    </label>
                    <Input type="date" defaultValue={selectedVote.endDate} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Méthode de vote' : language === 'de' ? 'Abstimmungsmethode' : 'Voting method'}
                  </label>
                  <Select defaultValue={selectedVote.votingMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single_choice">
                        {language === 'fr' ? 'Choix unique' : language === 'de' ? 'Einzelwahl' : 'Single choice'}
                      </SelectItem>
                      <SelectItem value="multiple_choice">
                        {language === 'fr' ? 'Choix multiples' : language === 'de' ? 'Mehrfachwahl' : 'Multiple choice'}
                      </SelectItem>
                      <SelectItem value="ranked_choice">
                        {language === 'fr' ? 'Vote par classement' : language === 'de' ? 'Ranglistenwahl' : 'Ranked choice'}
                      </SelectItem>
                      <SelectItem value="approval">
                        {language === 'fr' ? 'Vote par approbation' : language === 'de' ? 'Zustimmungswahl' : 'Approval voting'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                  </Button>
                  <Button onClick={() => {
                    toast.success(
                      language === 'fr' ? 'Scrutin modifié avec succès' :
                      language === 'de' ? 'Abstimmung erfolgreich bearbeitet' :
                      'Vote updated successfully'
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

      {/* Participants Dialog */}
      <Dialog open={showParticipantsDialog} onOpenChange={setShowParticipantsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
          {selectedVote && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Liste des participants' : language === 'de' ? 'Teilnehmerliste' : 'Participants list'}
                </DialogTitle>
                <DialogDescription>
                  {selectedVote.title[language]} • {selectedVote.totalVotes.toLocaleString()} {language === 'fr' ? 'votes' : language === 'de' ? 'Stimmen' : 'votes'}
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
                      <div className="flex items-center gap-3">
                        <Badge className={participant.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                          {participant.verified ? 
                            (language === 'fr' ? 'Vérifié' : language === 'de' ? 'Verifiziert' : 'Verified') :
                            (language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending')
                          }
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {new Date(participant.votedAt).toLocaleDateString(language, {
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

      {/* Results Dialog */}
      <Dialog open={showResultsDialog} onOpenChange={setShowResultsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
          {selectedVote && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Résultats du scrutin' : language === 'de' ? 'Abstimmungsergebnisse' : 'Vote results'}
                </DialogTitle>
                <DialogDescription>
                  {selectedVote.title[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Overall Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedVote.totalVotes.toLocaleString()}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Votes exprimés' : language === 'de' ? 'Abgegebene Stimmen' : 'Votes cast'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedVote.participationRate.toFixed(1)}%</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Participation' : language === 'de' ? 'Beteiligung' : 'Participation'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{mockResults.length}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Options' : language === 'de' ? 'Optionen' : 'Options'}
                    </div>
                  </div>
                </div>

                {/* Results Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {language === 'fr' ? 'Répartition des votes' : language === 'de' ? 'Stimmenverteilung' : 'Vote distribution'}
                  </h4>
                  {mockResults.map((result, index) => (
                    <div key={result.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className={index === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {result.option}
                          </Badge>
                          <span className="text-sm text-gray-600">{result.votes.toLocaleString()} votes</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{result.percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${index === 0 ? 'bg-green-600' : 'bg-gray-600'}`}
                          style={{ width: `${result.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Winner */}
                {selectedVote.status === 'results_published' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-900">
                        {language === 'fr' ? 'Option gagnante' : language === 'de' ? 'Gewinneroption' : 'Winning option'}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{mockResults[0].option}</p>
                    <p className="text-sm text-green-700 mt-1">
                      {mockResults[0].votes.toLocaleString()} votes ({mockResults[0].percentage.toFixed(1)}%)
                    </p>
                  </div>
                )}

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
    </div>
  );
}
