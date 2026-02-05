import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
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
import {
  FileText,
  Plus,
  Search,
  Edit,
  Eye,
  Trash2,
  MoreHorizontal,
  Filter,
  Users,
  MessageSquare,
  BarChart3,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { 
  AddLegislativeConsultationDialog,
  EditLegislativeConsultationDialog,
  DeleteLegislativeConsultationDialog
} from '../components/dialogs/LegislativeConsultationDialogs';
import { LegislativeStatisticsDialog } from '../components/dialogs/LegislativeStatisticsDialog';

// Mock data - sera remplacé par les données API
const mockLegislativeConsultations = [
  {
    id: 'leg_001',
    title: {
      fr: 'Loi sur la neutralité carbone',
      de: 'Gesetz über Klimaneutralität',
      en: 'Carbon Neutrality Act'
    },
    textType: 'law' as const,
    status: 'open' as const,
    startDate: '2026-01-15T00:00:00Z',
    endDate: '2026-03-31T23:59:59Z',
    totalArticles: 12,
    totalAnnotations: 234,
    totalParticipants: 89,
    createdAt: '2026-01-10T00:00:00Z',
    themeId: 'theme-003'
  },
  {
    id: 'leg_002',
    title: {
      fr: 'Règlement sur l\'urbanisme durable',
      de: 'Verordnung über nachhaltige Stadtplanung',
      en: 'Sustainable Urban Planning Regulation'
    },
    textType: 'regulation' as const,
    status: 'open' as const,
    startDate: '2026-02-01T00:00:00Z',
    endDate: '2026-04-15T23:59:59Z',
    totalArticles: 8,
    totalAnnotations: 156,
    totalParticipants: 67,
    createdAt: '2026-01-25T00:00:00Z',
    themeId: 'theme-001'
  },
  {
    id: 'leg_003',
    title: {
      fr: 'Projet de loi sur la mobilité électrique',
      de: 'Gesetzentwurf zur Elektromobilität',
      en: 'Electric Mobility Bill'
    },
    textType: 'law' as const,
    status: 'upcoming' as const,
    startDate: '2026-03-15T00:00:00Z',
    endDate: '2026-05-31T23:59:59Z',
    totalArticles: 15,
    totalAnnotations: 0,
    totalParticipants: 0,
    createdAt: '2026-02-01T00:00:00Z',
    themeId: 'theme-002'
  },
  {
    id: 'leg_004',
    title: {
      fr: 'Décret sur la gestion des déchets',
      de: 'Dekret über Abfallwirtschaft',
      en: 'Waste Management Decree'
    },
    textType: 'decree' as const,
    status: 'closed' as const,
    startDate: '2025-11-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    totalArticles: 6,
    totalAnnotations: 412,
    totalParticipants: 145,
    createdAt: '2025-10-15T00:00:00Z',
    themeId: 'theme-003'
  }
];

export function LegislativeConsultationsManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [textTypeFilter, setTextTypeFilter] = useState<string>('all');
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statisticsDialogOpen, setStatisticsDialogOpen] = useState(false);
  const [consultations, setConsultations] = useState(mockLegislativeConsultations);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: { fr: string; de: string; en: string }; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ElementType }> = {
      open: { 
        label: { fr: 'Ouverte', de: 'Offen', en: 'Open' }, 
        variant: 'default',
        icon: CheckCircle
      },
      upcoming: { 
        label: { fr: 'À venir', de: 'Bevorstehend', en: 'Upcoming' }, 
        variant: 'secondary',
        icon: Clock
      },
      closed: { 
        label: { fr: 'Fermée', de: 'Geschlossen', en: 'Closed' }, 
        variant: 'outline',
        icon: XCircle
      },
      archived: { 
        label: { fr: 'Archivée', de: 'Archiviert', en: 'Archived' }, 
        variant: 'secondary',
        icon: XCircle
      }
    };

    const config = variants[status] || variants.open;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {config.label[language]}
      </Badge>
    );
  };

  const getTextTypeLabel = (textType: string) => {
    const labels: Record<string, { fr: string; de: string; en: string }> = {
      law: { fr: 'Projet de loi', de: 'Gesetzentwurf', en: 'Bill' },
      regulation: { fr: 'Règlement', de: 'Verordnung', en: 'Regulation' },
      decree: { fr: 'Décret', de: 'Dekret', en: 'Decree' },
      ordinance: { fr: 'Ordonnance', de: 'Verordnung', en: 'Ordinance' },
      amendment: { fr: 'Amendement', de: 'Änderungsantrag', en: 'Amendment' }
    };
    return labels[textType]?.[language] || textType;
  };

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.title[language].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
    const matchesTextType = textTypeFilter === 'all' || consultation.textType === textTypeFilter;
    return matchesSearch && matchesStatus && matchesTextType;
  });

  const handleView = (id: string) => {
    window.open(`/legislative-consultations/${id}`, '_blank');
  };

  const handleEdit = (consultation: any) => {
    setSelectedConsultation(consultation);
    setEditDialogOpen(true);
  };

  const handleDelete = (consultation: any) => {
    setSelectedConsultation(consultation);
    setDeleteDialogOpen(true);
  };
  
  const handleStatistics = (consultation: any) => {
    setSelectedConsultation(consultation);
    setStatisticsDialogOpen(true);
  };
  
  const handleAddConsultation = (newConsultation: any) => {
    setConsultations(prev => [...prev, newConsultation]);
  };
  
  const handleEditConsultation = (updatedConsultation: any) => {
    setConsultations(prev => 
      prev.map(c => c.id === updatedConsultation.id ? updatedConsultation : c)
    );
  };
  
  const handleDeleteConfirm = () => {
    if (selectedConsultation) {
      setConsultations(prev => prev.filter(c => c.id !== selectedConsultation.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {language === 'fr' && 'Consultations Législatives'}
            {language === 'de' && 'Gesetzgebungsberatungen'}
            {language === 'en' && 'Legislative Consultations'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'fr' && 'Gérez les consultations législatives et les annotations citoyennes'}
            {language === 'de' && 'Verwalten Sie Gesetzgebungsberatungen und Bürgeranmerkungen'}
            {language === 'en' && 'Manage legislative consultations and citizen annotations'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {language === 'fr' && 'Nouvelle consultation'}
            {language === 'de' && 'Neue Beratung'}
            {language === 'en' && 'New consultation'}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' && 'Total'}
                  {language === 'de' && 'Gesamt'}
                  {language === 'en' && 'Total'}
                </p>
                <p className="text-2xl font-semibold mt-1">{consultations.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' && 'Ouvertes'}
                  {language === 'de' && 'Offen'}
                  {language === 'en' && 'Open'}
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {consultations.filter(c => c.status === 'open').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' && 'Participants'}
                  {language === 'de' && 'Teilnehmer'}
                  {language === 'en' && 'Participants'}
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {consultations.reduce((sum, c) => sum + c.totalParticipants, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' && 'Annotations'}
                  {language === 'de' && 'Anmerkungen'}
                  {language === 'en' && 'Annotations'}
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {consultations.reduce((sum, c) => sum + c.totalAnnotations, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {language === 'fr' && 'Filtres'}
            {language === 'de' && 'Filter'}
            {language === 'en' && 'Filters'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={
                  language === 'fr' ? 'Rechercher...' :
                  language === 'de' ? 'Suchen...' :
                  'Search...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={
                  language === 'fr' ? 'Statut' :
                  language === 'de' ? 'Status' :
                  'Status'
                } />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {language === 'fr' && 'Tous les statuts'}
                  {language === 'de' && 'Alle Status'}
                  {language === 'en' && 'All statuses'}
                </SelectItem>
                <SelectItem value="open">
                  {language === 'fr' && 'Ouvertes'}
                  {language === 'de' && 'Offen'}
                  {language === 'en' && 'Open'}
                </SelectItem>
                <SelectItem value="upcoming">
                  {language === 'fr' && 'À venir'}
                  {language === 'de' && 'Bevorstehend'}
                  {language === 'en' && 'Upcoming'}
                </SelectItem>
                <SelectItem value="closed">
                  {language === 'fr' && 'Fermées'}
                  {language === 'de' && 'Geschlossen'}
                  {language === 'en' && 'Closed'}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={textTypeFilter} onValueChange={setTextTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder={
                  language === 'fr' ? 'Type de texte' :
                  language === 'de' ? 'Texttyp' :
                  'Text type'
                } />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {language === 'fr' && 'Tous les types'}
                  {language === 'de' && 'Alle Typen'}
                  {language === 'en' && 'All types'}
                </SelectItem>
                <SelectItem value="law">
                  {getTextTypeLabel('law')}
                </SelectItem>
                <SelectItem value="regulation">
                  {getTextTypeLabel('regulation')}
                </SelectItem>
                <SelectItem value="decree">
                  {getTextTypeLabel('decree')}
                </SelectItem>
                <SelectItem value="ordinance">
                  {getTextTypeLabel('ordinance')}
                </SelectItem>
                <SelectItem value="amendment">
                  {getTextTypeLabel('amendment')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Consultations Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {language === 'fr' && 'Liste des consultations'}
              {language === 'de' && 'Beratungsliste'}
              {language === 'en' && 'Consultations List'}
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({filteredConsultations.length} {language === 'fr' ? 'résultats' : language === 'de' ? 'Ergebnisse' : 'results'})
              </span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {language === 'fr' && 'Titre'}
                    {language === 'de' && 'Titel'}
                    {language === 'en' && 'Title'}
                  </TableHead>
                  <TableHead>
                    {language === 'fr' && 'Type'}
                    {language === 'de' && 'Typ'}
                    {language === 'en' && 'Type'}
                  </TableHead>
                  <TableHead>
                    {language === 'fr' && 'Statut'}
                    {language === 'de' && 'Status'}
                    {language === 'en' && 'Status'}
                  </TableHead>
                  <TableHead>
                    {language === 'fr' && 'Articles'}
                    {language === 'de' && 'Artikel'}
                    {language === 'en' && 'Articles'}
                  </TableHead>
                  <TableHead>
                    {language === 'fr' && 'Annotations'}
                    {language === 'de' && 'Anmerkungen'}
                    {language === 'en' && 'Annotations'}
                  </TableHead>
                  <TableHead>
                    {language === 'fr' && 'Participants'}
                    {language === 'de' && 'Teilnehmer'}
                    {language === 'en' && 'Participants'}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === 'fr' && 'Actions'}
                    {language === 'de' && 'Aktionen'}
                    {language === 'en' && 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsultations.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{consultation.title[language]}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(consultation.startDate).toLocaleDateString()} - {new Date(consultation.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{getTextTypeLabel(consultation.textType)}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(consultation.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span>{consultation.totalArticles}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <span>{consultation.totalAnnotations}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{consultation.totalParticipants}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>
                            {language === 'fr' && 'Actions'}
                            {language === 'de' && 'Aktionen'}
                            {language === 'en' && 'Actions'}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleView(consultation.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            {language === 'fr' && 'Voir'}
                            {language === 'de' && 'Ansehen'}
                            {language === 'en' && 'View'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(consultation)}>
                            <Edit className="w-4 h-4 mr-2" />
                            {language === 'fr' && 'Modifier'}
                            {language === 'de' && 'Bearbeiten'}
                            {language === 'en' && 'Edit'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatistics(consultation)}>
                            <BarChart3 className="w-4 h-4 mr-2" />
                            {language === 'fr' && 'Statistiques'}
                            {language === 'de' && 'Statistiken'}
                            {language === 'en' && 'Statistics'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(consultation)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {language === 'fr' && 'Supprimer'}
                            {language === 'de' && 'Löschen'}
                            {language === 'en' && 'Delete'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Dialogs */}
      <AddLegislativeConsultationDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={handleAddConsultation}
      />
      <EditLegislativeConsultationDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        consultation={selectedConsultation}
        onSubmit={handleEditConsultation}
      />
      <DeleteLegislativeConsultationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        consultation={selectedConsultation}
        onConfirm={handleDeleteConfirm}
      />
      <LegislativeStatisticsDialog
        open={statisticsDialogOpen}
        onOpenChange={setStatisticsDialogOpen}
        consultation={selectedConsultation}
      />
    </div>
  );
}