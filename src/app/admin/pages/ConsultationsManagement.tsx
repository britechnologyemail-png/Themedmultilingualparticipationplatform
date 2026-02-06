/**
 * Consultations Management Page
 * 
 * Page de gestion complète des Concertations avec :
 * - Liste des concertations avec leurs états
 * - Actions CRUD complètes
 * - Formulaires alignés avec le FrontOffice
 * - Gestion des participants et commentaires
 */

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router';
import {
  MessageSquare,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  MapPin,
  MoreVertical,
  Download,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Heart,
  TrendingUp,
  AlertCircle,
  CalendarPlus,
  CalendarDays,
  UserPlus,
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
import { CreateConsultationDialog } from '../components/dialogs/ConsultationDialogs';
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

// Mock data - À remplacer par l'API réelle
const mockConsultations = [
  {
    id: '1',
    title: { fr: 'Réaménagement du parc central', de: 'Neugestaltung des Zentralparks', en: 'Central park redevelopment' },
    type: 'public_meeting' as const,
    status: 'open' as const,
    startDate: '2026-02-10',
    endDate: '2026-03-15',
    participants: 145,
    comments: 87,
    likes: 234,
    uniqueParticipants: 98,
    themeId: 'urbanisme',
    location: 'Mairie - Salle du Conseil',
    isOnline: true,
    createdAt: '2026-02-01',
  },
  {
    id: '2',
    title: { fr: 'Plan climat 2030', de: 'Klimaplan 2030', en: 'Climate plan 2030' },
    type: 'online_debate' as const,
    status: 'open' as const,
    startDate: '2026-01-20',
    endDate: '2026-04-30',
    participants: 342,
    comments: 256,
    likes: 487,
    uniqueParticipants: 215,
    themeId: 'environment',
    location: null,
    isOnline: true,
    createdAt: '2026-01-15',
  },
  {
    id: '3',
    title: { fr: 'Budget participatif jeunesse', de: 'Partizipativer Jugendhaushalt', en: 'Youth participatory budget' },
    type: 'citizen_proposal' as const,
    status: 'draft' as const,
    startDate: '2026-03-01',
    endDate: '2026-06-30',
    participants: 0,
    comments: 0,
    likes: 0,
    uniqueParticipants: 0,
    themeId: 'youth',
    location: null,
    isOnline: true,
    createdAt: '2026-02-05',
  },
  {
    id: '4',
    title: { fr: 'Mobilité urbaine durable', de: 'Nachhaltige städtische Mobilität', en: 'Sustainable urban mobility' },
    type: 'expert_hearing' as const,
    status: 'closed' as const,
    startDate: '2025-11-01',
    endDate: '2025-12-31',
    participants: 234,
    comments: 178,
    likes: 321,
    uniqueParticipants: 156,
    themeId: 'mobility',
    location: 'Salle municipale',
    isOnline: false,
    createdAt: '2025-10-25',
  },
  {
    id: '5',
    title: { fr: 'Concertation logement social', de: 'Konsultation zum sozialen Wohnungsbau', en: 'Social housing consultation' },
    type: 'workshop' as const,
    status: 'archived' as const,
    startDate: '2025-09-01',
    endDate: '2025-10-30',
    participants: 189,
    comments: 134,
    likes: 198,
    uniqueParticipants: 112,
    themeId: 'housing',
    location: 'Centre communautaire',
    isOnline: false,
    createdAt: '2025-08-20',
  },
];

// Mock data pour les citoyens intervenus
const mockParticipants = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dupont',
    avatar: null,
    email: 'm.dupont@example.com',
    interventionType: 'comment' as const,
    interventionDate: '2026-02-12T10:30:00',
    commentsCount: 3,
    likesCount: 12,
  },
  {
    id: '2',
    firstName: 'Jean',
    lastName: 'Martin',
    avatar: null,
    email: 'j.martin@example.com',
    interventionType: 'both' as const,
    interventionDate: '2026-02-11T14:20:00',
    commentsCount: 5,
    likesCount: 8,
  },
  {
    id: '3',
    firstName: 'Sophie',
    lastName: 'Bernard',
    avatar: null,
    email: 's.bernard@example.com',
    interventionType: 'like' as const,
    interventionDate: '2026-02-13T09:15:00',
    commentsCount: 0,
    likesCount: 15,
  },
  {
    id: '4',
    firstName: 'Pierre',
    lastName: 'Dubois',
    avatar: null,
    email: 'p.dubois@example.com',
    interventionType: 'comment' as const,
    interventionDate: '2026-02-10T16:45:00',
    commentsCount: 2,
    likesCount: 0,
  },
  {
    id: '5',
    firstName: 'Claire',
    lastName: 'Petit',
    avatar: null,
    email: 'c.petit@example.com',
    interventionType: 'both' as const,
    interventionDate: '2026-02-14T11:30:00',
    commentsCount: 7,
    likesCount: 23,
  },
];

// Mock data pour les commentaires
const generateMockComments = () => [
  {
    id: '1',
    author: { firstName: 'Marie', lastName: 'Dupont', avatar: null },
    content: 'Je trouve cette initiative très intéressante pour notre ville. Cela permettra de mieux impliquer les citoyens dans les décisions importantes.',
    status: 'pending' as const,
    likes: 12,
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: '2',
    author: { firstName: 'Jean', lastName: 'Martin', avatar: null },
    content: 'Excellent projet ! J\'espère que nous pourrons vraiment avoir un impact sur les décisions prises.',
    status: 'published' as const,
    likes: 25,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: '3',
    author: { firstName: 'Sophie', lastName: 'Bernard', avatar: null },
    content: 'Très bonne idée, mais il faudrait plus de communication pour toucher davantage de citoyens.',
    status: 'published' as const,
    likes: 8,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: '4',
    author: { firstName: 'Pierre', lastName: 'Dubois', avatar: null },
    content: 'Contenu inapproprié à modérer.',
    status: 'pending' as const,
    likes: 2,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: '5',
    author: { firstName: 'Claire', lastName: 'Petit', avatar: null },
    content: 'Bravo pour cette démarche participative ! C\'est exactement ce dont nous avons besoin.',
    status: 'rejected' as const,
    likes: 15,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];

// Mock data pour les réunions
const generateMockMeetings = (consultationId: string) => [
  {
    id: `${consultationId}-meeting-1`,
    consultationId,
    title: { 
      fr: 'Réunion de concertation 1', 
      de: 'Beratungstreffen 1', 
      en: 'Consultation meeting 1' 
    },
    description: { 
      fr: 'Discussion sur les propositions citoyennes', 
      de: 'Diskussion über Bürgervorschläge', 
      en: 'Discussion on citizen proposals' 
    },
    date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    time: '15:00',
    location: { 
      fr: 'Mairie - Salle du Conseil', 
      de: 'Rathaus - Ratssaal', 
      en: 'City Hall - Council Room' 
    },
    maxParticipants: 30,
    currentParticipants: 0,
    status: 'upcoming' as const,
    isOnline: false,
    meetingUrl: null,
  },
  {
    id: `${consultationId}-meeting-2`,
    consultationId,
    title: { 
      fr: 'Réunion de concertation 2', 
      de: 'Beratungstreffen 2', 
      en: 'Consultation meeting 2' 
    },
    description: { 
      fr: 'Présentation des résultats intermédiaires', 
      de: 'Präsentation der Zwischenergebnisse', 
      en: 'Presentation of intermediate results' 
    },
    date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    time: '16:00',
    location: { 
      fr: 'Mairie - Salle du Conseil', 
      de: 'Rathaus - Ratssaal', 
      en: 'City Hall - Council Room' 
    },
    maxParticipants: 35,
    currentParticipants: 0,
    status: 'upcoming' as const,
    isOnline: true,
    meetingUrl: 'https://meet.civix.com/meeting-2',
  },
  {
    id: `${consultationId}-meeting-3`,
    consultationId,
    title: { 
      fr: 'Réunion de concertation 3', 
      de: 'Beratungstreffen 3', 
      en: 'Consultation meeting 3' 
    },
    description: { 
      fr: 'Synthèse et décisions finales', 
      de: 'Zusammenfassung und endgültige Entscheidungen', 
      en: 'Summary and final decisions' 
    },
    date: new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0],
    time: '17:00',
    location: { 
      fr: 'Mairie - Salle du Conseil', 
      de: 'Rathaus - Ratssaal', 
      en: 'City Hall - Council Room' 
    },
    maxParticipants: 40,
    currentParticipants: 0,
    status: 'upcoming' as const,
    isOnline: false,
    meetingUrl: null,
  },
];

export function ConsultationsManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [showParticipantsDialog, setShowParticipantsDialog] = useState(false);
  const [selectedConsultationId, setSelectedConsultationId] = useState<string | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCommentsDialog, setShowCommentsDialog] = useState(false);
  const [comments, setComments] = useState<any[]>(generateMockComments());
  const [commentStatusFilter, setCommentStatusFilter] = useState<string>('all');
  const [showManageMembersDialog, setShowManageMembersDialog] = useState(false);
  const [showAddMeetingDialog, setShowAddMeetingDialog] = useState(false);
  const [showViewMeetingsDialog, setShowViewMeetingsDialog] = useState(false);
  const [showEditMeetingDialog, setShowEditMeetingDialog] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [consultationMembers, setConsultationMembers] = useState<Record<string, any[]>>({});
  const [consultationMeetings, setConsultationMeetings] = useState<Record<string, any[]>>({});
  const [newMemberEmail, setNewMemberEmail] = useState('');

  // Obtenir les membres de la consultation sélectionnée
  const getCurrentMembers = () => {
    if (!selectedConsultation) return [];
    return consultationMembers[selectedConsultation.id] || mockParticipants;
  };

  // Mettre à jour les membres de la consultation sélectionnée
  const setCurrentMembers = (members: any[]) => {
    if (!selectedConsultation) return;
    setConsultationMembers({
      ...consultationMembers,
      [selectedConsultation.id]: members,
    });
  };

  // Obtenir les réunions de la consultation sélectionnée
  const getCurrentMeetings = () => {
    if (!selectedConsultation) return [];
    if (!consultationMeetings[selectedConsultation.id]) {
      return generateMockMeetings(selectedConsultation.id);
    }
    return consultationMeetings[selectedConsultation.id];
  };

  // Mettre à jour les réunions de la consultation sélectionnée
  const setCurrentMeetings = (meetings: any[]) => {
    if (!selectedConsultation) return;
    setConsultationMeetings({
      ...consultationMeetings,
      [selectedConsultation.id]: meetings,
    });
  };

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
      closed: { 
        label: language === 'fr' ? 'Clôturée' : language === 'de' ? 'Geschlossen' : 'Closed', 
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: XCircle,
      },
      archived: { 
        label: language === 'fr' ? 'Archivée' : language === 'de' ? 'Archiviert' : 'Archived', 
        color: 'bg-purple-100 text-purple-700 border-purple-300',
        icon: Clock,
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
      public_meeting: { fr: 'Réunion publique', de: 'Öffentliche Versammlung', en: 'Public meeting' },
      online_debate: { fr: 'Débat en ligne', de: 'Online-Debatte', en: 'Online debate' },
      citizen_proposal: { fr: 'Proposition citoyenne', de: 'Bürgervorschlag', en: 'Citizen proposal' },
      expert_hearing: { fr: 'Audition d\'experts', de: 'Expertenanhörung', en: 'Expert hearing' },
      workshop: { fr: 'Atelier', de: 'Workshop', en: 'Workshop' },
    };

    return types[type]?.[language] || type;
  };

  const filteredConsultations = mockConsultations.filter(consultation => {
    const matchesSearch = consultation.title[language].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
    const matchesType = typeFilter === 'all' || consultation.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDelete = (id: string) => {
    toast.success(
      language === 'fr' ? 'Concertation supprimée avec succès' :
      language === 'de' ? 'Konsultation erfolgreich gelöscht' :
      'Consultation deleted successfully'
    );
  };

  const handleExport = () => {
    toast.success(
      language === 'fr' ? 'Export en cours...' :
      language === 'de' ? 'Export läuft...' :
      'Exporting...'
    );
  };

  const handleShowParticipants = (id: string) => {
    setSelectedConsultationId(id);
    setShowParticipantsDialog(true);
  };

  const handleView = (consultation: any) => {
    setSelectedConsultation(consultation);
    setShowDetailDialog(true);
  };

  const handleEdit = (consultation: any) => {
    setSelectedConsultation(consultation);
    setShowEditDialog(true);
  };

  const handleShowComments = (consultation: any) => {
    setSelectedConsultation(consultation);
    setShowCommentsDialog(true);
  };

  const handleApproveComment = (commentId: string) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, status: 'published' } : c
    ));
    toast.success(
      language === 'fr' ? 'Commentaire approuvé et publié' :
      language === 'de' ? 'Kommentar genehmigt und veröffentlicht' :
      'Comment approved and published'
    );
  };

  const handleRejectComment = (commentId: string) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, status: 'rejected' } : c
    ));
    toast.success(
      language === 'fr' ? 'Commentaire rejeté' :
      language === 'de' ? 'Kommentar abgelehnt' :
      'Comment rejected'
    );
  };

  const handleAddMember = () => {
    if (!newMemberEmail.trim()) {
      toast.error(
        language === 'fr' ? 'Veuillez entrer un email' :
        language === 'de' ? 'Bitte geben Sie eine E-Mail ein' :
        'Please enter an email'
      );
      return;
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newMemberEmail)) {
      toast.error(
        language === 'fr' ? 'Email invalide' :
        language === 'de' ? 'Ungültige E-Mail' :
        'Invalid email'
      );
      return;
    }

    const currentMembers = getCurrentMembers();
    
    // Vérifier si l'email existe déjà
    if (currentMembers.some(m => m.email.toLowerCase() === newMemberEmail.toLowerCase())) {
      toast.error(
        language === 'fr' ? 'Ce membre est déjà ajouté' :
        language === 'de' ? 'Dieses Mitglied wurde bereits hinzugefügt' :
        'This member is already added'
      );
      return;
    }

    // Créer un nouveau membre
    const emailParts = newMemberEmail.split('@')[0].split('.');
    const firstName = emailParts[0] ? emailParts[0].charAt(0).toUpperCase() + emailParts[0].slice(1) : 'Nouveau';
    const lastName = emailParts[1] ? emailParts[1].charAt(0).toUpperCase() + emailParts[1].slice(1) : 'Membre';
    
    const newMember = {
      id: String(Date.now()),
      firstName: firstName,
      lastName: lastName,
      avatar: null,
      email: newMemberEmail,
      interventionType: 'comment' as const,
      interventionDate: new Date().toISOString(),
      commentsCount: 0,
      likesCount: 0,
    };

    setCurrentMembers([...currentMembers, newMember]);
    setNewMemberEmail('');
    toast.success(
      language === 'fr' ? 'Membre ajouté avec succès' :
      language === 'de' ? 'Mitglied erfolgreich hinzugefügt' :
      'Member added successfully'
    );
  };

  const handleRemoveMember = (memberId: string) => {
    const currentMembers = getCurrentMembers();
    const member = currentMembers.find(m => m.id === memberId);
    setCurrentMembers(currentMembers.filter(m => m.id !== memberId));
    toast.success(
      language === 'fr' ? `${member?.firstName} ${member?.lastName} a été retiré` :
      language === 'de' ? `${member?.firstName} ${member?.lastName} wurde entfernt` :
      `${member?.firstName} ${member?.lastName} has been removed`
    );
  };

  const handleEditMeeting = (meeting: any) => {
    setSelectedMeeting(meeting);
    setShowEditMeetingDialog(true);
  };

  const handleCancelMeeting = (meetingId: string) => {
    const currentMeetings = getCurrentMeetings();
    const meeting = currentMeetings.find(m => m.id === meetingId);
    
    if (meeting) {
      // Marquer la réunion comme annulée
      const updatedMeetings = currentMeetings.map(m => 
        m.id === meetingId ? { ...m, status: 'cancelled' } : m
      );
      setCurrentMeetings(updatedMeetings);
      
      toast.success(
        language === 'fr' ? `Réunion "${meeting.title[language]}" annulée` :
        language === 'de' ? `Meeting "${meeting.title[language]}" abgesagt` :
        `Meeting "${meeting.title[language]}" cancelled`
      );
    }
  };

  const handleSaveEditedMeeting = (updatedMeeting: any) => {
    const currentMeetings = getCurrentMeetings();
    const updatedMeetings = currentMeetings.map(m => 
      m.id === updatedMeeting.id ? updatedMeeting : m
    );
    setCurrentMeetings(updatedMeetings);
    setShowEditMeetingDialog(false);
    setSelectedMeeting(null);
    
    toast.success(
      language === 'fr' ? 'Réunion modifiée avec succès' :
      language === 'de' ? 'Meeting erfolgreich bearbeitet' :
      'Meeting updated successfully'
    );
  };

  const getCommentStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string; icon: any }> = {
      pending: { 
        label: language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending', 
        color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        icon: Clock,
      },
      published: { 
        label: language === 'fr' ? 'Publié' : language === 'de' ? 'Veröffentlicht' : 'Published', 
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
      <Badge className={`${variant.color} border inline-flex items-center gap-1 text-xs`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  const filteredComments = comments.filter(comment => 
    commentStatusFilter === 'all' || comment.status === commentStatusFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {language === 'fr' ? 'Gestion des Concertations' :
           language === 'de' ? 'Verwaltung der Konsultationen' :
           'Consultations Management'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Gérez les concertations, leurs états et leurs participants' :
           language === 'de' ? 'Verwalten Sie Konsultationen, deren Status und Teilnehmer' :
           'Manage consultations, their states and participants'}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockConsultations.length}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Concertations' : language === 'de' ? 'Konsultationen' : 'Consultations'}
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
              {mockConsultations.filter(c => c.status === 'open').length}
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
              {mockConsultations.reduce((acc, c) => acc + c.participants, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'fr' ? 'Commentaires' : language === 'de' ? 'Kommentare' : 'Comments'}
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {mockConsultations.reduce((acc, c) => acc + c.comments, 0).toLocaleString()}
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
              <SelectItem value="open">{language === 'fr' ? 'Ouverte' : language === 'de' ? 'Offen' : 'Open'}</SelectItem>
              <SelectItem value="closed">{language === 'fr' ? 'Clôturée' : language === 'de' ? 'Geschlossen' : 'Closed'}</SelectItem>
              <SelectItem value="archived">{language === 'fr' ? 'Archivée' : language === 'de' ? 'Archiviert' : 'Archived'}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'fr' ? 'Tous les types' : language === 'de' ? 'Alle Typen' : 'All types'}</SelectItem>
              <SelectItem value="public_meeting">{language === 'fr' ? 'Réunion publique' : language === 'de' ? 'Öffentliche Versammlung' : 'Public meeting'}</SelectItem>
              <SelectItem value="online_debate">{language === 'fr' ? 'Débat en ligne' : language === 'de' ? 'Online-Debatte' : 'Online debate'}</SelectItem>
              <SelectItem value="citizen_proposal">{language === 'fr' ? 'Proposition citoyenne' : language === 'de' ? 'Bürgervorschlag' : 'Citizen proposal'}</SelectItem>
              <SelectItem value="expert_hearing">{language === 'fr' ? 'Audition d\'experts' : language === 'de' ? 'Expertenanhörung' : 'Expert hearing'}</SelectItem>
              <SelectItem value="workshop">{language === 'fr' ? 'Atelier' : language === 'de' ? 'Workshop' : 'Workshop'}</SelectItem>
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
            {language === 'fr' ? 'Nouvelle concertation' : language === 'de' ? 'Neue Konsultation' : 'New consultation'}
          </Button>
        </div>
      </div>

      {/* Consultations Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'Liste des concertations' : language === 'de' ? 'Liste der Konsultationen' : 'Consultations list'}
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
                  <TableHead>{language === 'fr' ? 'Dates' : language === 'de' ? 'Termine' : 'Dates'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Lieu' : language === 'de' ? 'Ort' : 'Location'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Engagement' : language === 'de' ? 'Engagement' : 'Engagement'}</TableHead>
                  <TableHead className="text-right">{language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsultations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {language === 'fr' ? 'Aucune concertation trouvée' :
                       language === 'de' ? 'Keine Konsultationen gefunden' :
                       'No consultations found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredConsultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-medium text-gray-900">{consultation.title[language]}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {language === 'fr' ? 'Créée le' : language === 'de' ? 'Erstellt am' : 'Created on'} {new Date(consultation.createdAt).toLocaleDateString(language)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getTypeLabel(consultation.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(consultation.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(consultation.startDate).toLocaleDateString(language)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {language === 'fr' ? 'au' : language === 'de' ? 'bis' : 'to'} {new Date(consultation.endDate).toLocaleDateString(language)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {consultation.isOnline ? (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {language === 'fr' ? 'En ligne' : language === 'de' ? 'Online' : 'Online'}
                          </Badge>
                        ) : consultation.location ? (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate max-w-[150px]">{consultation.location}</span>
                          </div>
                        ) : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-sm">
                              <MessageSquare className="w-4 h-4 text-blue-600" />
                              <span className="font-medium text-gray-900">{consultation.comments}</span>
                              <span className="text-xs text-gray-500">
                                {language === 'fr' ? 'comm.' : language === 'de' ? 'Komm.' : 'comm.'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="font-medium text-gray-900">{consultation.likes}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleShowParticipants(consultation.id)}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            <Users className="w-4 h-4" />
                            <span className="font-medium">{consultation.uniqueParticipants}</span>
                            <span className="text-xs">
                              {language === 'fr' ? 'citoyens' : language === 'de' ? 'Bürger' : 'citizens'}
                            </span>
                          </button>
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
                            <DropdownMenuItem onClick={() => handleView(consultation)}>
                              <Eye className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Voir' : language === 'de' ? 'Ansehen' : 'View'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(consultation)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedConsultation(consultation);
                              setShowManageMembersDialog(true);
                            }}>
                              <UserPlus className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Gérer les membres' : language === 'de' ? 'Mitglieder verwalten' : 'Manage members'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedConsultation(consultation);
                              setShowAddMeetingDialog(true);
                            }}>
                              <CalendarPlus className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Ajouter une réunion' : language === 'de' ? 'Meeting hinzufügen' : 'Add a meeting'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedConsultation(consultation);
                              setShowViewMeetingsDialog(true);
                            }}>
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {language === 'fr' ? 'Voir les réunions' : language === 'de' ? 'Meetings ansehen' : 'View meetings'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(consultation.id)}
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

      {/* Create Consultation Dialog */}
      <CreateConsultationDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        themes={[]} // TODO: Pass actual themes from API
      />

      {/* Participants Dialog */}
      <Dialog
        open={showParticipantsDialog}
        onOpenChange={setShowParticipantsDialog}
      >
        <DialogContent className="sm:max-w-[650px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              {language === 'fr' ? 'Citoyens intervenus' : language === 'de' ? 'Beteiligte Bürger' : 'Citizens involved'}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Liste complète des citoyens ayant participé à cette concertation' : 
               language === 'de' ? 'Vollständige Liste der an dieser Konsultation beteiligten Bürger' : 
               'Complete list of citizens who participated in this consultation'}
            </DialogDescription>
          </DialogHeader>
          
          {/* Statistics Summary */}
          <div className="grid grid-cols-3 gap-4 pb-4 border-b">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{mockParticipants.length}</div>
              <div className="text-xs text-gray-500">
                {language === 'fr' ? 'Citoyens' : language === 'de' ? 'Bürger' : 'Citizens'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {mockParticipants.reduce((acc, p) => acc + p.commentsCount, 0)}
              </div>
              <div className="text-xs text-gray-500">
                {language === 'fr' ? 'Commentaires' : language === 'de' ? 'Kommentare' : 'Comments'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {mockParticipants.reduce((acc, p) => acc + p.likesCount, 0)}
              </div>
              <div className="text-xs text-gray-500">
                {language === 'fr' ? 'Likes' : language === 'de' ? 'Likes' : 'Likes'}
              </div>
            </div>
          </div>

          {/* Participants List */}
          <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
            {mockParticipants.map((participant, index) => (
              <div 
                key={participant.id} 
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                    {participant.firstName[0] + participant.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {participant.firstName} {participant.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {participant.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    {/* Type d'intervention */}
                    <div className="flex items-center gap-4">
                      {participant.interventionType === 'comment' || participant.interventionType === 'both' ? (
                        <div className="flex items-center gap-1 text-xs">
                          <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                          <span className="font-medium">{participant.commentsCount}</span>
                          <span className="text-gray-500">
                            {language === 'fr' ? 'comm.' : language === 'de' ? 'Komm.' : 'comm.'}
                          </span>
                        </div>
                      ) : null}
                      
                      {participant.interventionType === 'like' || participant.interventionType === 'both' ? (
                        <div className="flex items-center gap-1 text-xs">
                          <Heart className="w-3.5 h-3.5 text-red-500" />
                          <span className="font-medium">{participant.likesCount}</span>
                          <span className="text-gray-500">
                            {language === 'fr' ? 'likes' : language === 'de' ? 'Likes' : 'likes'}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    
                    {/* Date d'intervention */}
                    <div className="text-xs text-gray-500 ml-auto">
                      {new Date(participant.interventionDate).toLocaleDateString(language, {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Export Button */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowParticipantsDialog(false)}>
              {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
            </Button>
            <Button onClick={() => {
              toast.success(
                language === 'fr' ? 'Export de la liste en cours...' :
                language === 'de' ? 'Liste wird exportiert...' :
                'Exporting list...'
              );
            }}>
              <Download className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Exporter la liste' : language === 'de' ? 'Liste exportieren' : 'Export list'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedConsultation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Eye className="w-6 h-6 text-blue-600" />
                  {selectedConsultation.title[language]}
                </DialogTitle>
                <DialogDescription>
                  {language === 'fr' ? 'Détails de la concertation' :
                   language === 'de' ? 'Details der Konsultation' :
                   'Consultation details'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status & Type */}
                <div className="flex gap-3">
                  {getStatusBadge(selectedConsultation.status)}
                  <Badge variant="outline">{getTypeLabel(selectedConsultation.type)}</Badge>
                  {selectedConsultation.isOnline && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {language === 'fr' ? 'En ligne' : language === 'de' ? 'Online' : 'Online'}
                    </Badge>
                  )}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'fr' ? 'Date de début' : language === 'de' ? 'Startdatum' : 'Start date'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedConsultation.startDate).toLocaleDateString(language, {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'fr' ? 'Date de fin' : language === 'de' ? 'Enddatum' : 'End date'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedConsultation.endDate).toLocaleDateString(language, {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Location */}
                {selectedConsultation.location && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'fr' ? 'Lieu' : language === 'de' ? 'Ort' : 'Location'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <MapPin className="w-4 h-4" />
                      {selectedConsultation.location}
                    </div>
                  </div>
                )}

                {/* Statistics */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedConsultation.participants}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedConsultation.comments}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Commentaires' : language === 'de' ? 'Kommentare' : 'Comments'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{selectedConsultation.likes}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Likes' : language === 'de' ? 'Likes' : 'Likes'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedConsultation.uniqueParticipants}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Citoyens' : language === 'de' ? 'Bürger' : 'Citizens'}
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
                    handleEdit(selectedConsultation);
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
          {selectedConsultation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Modifier la concertation' :
                   language === 'de' ? 'Konsultation bearbeiten' :
                   'Edit consultation'}
                </DialogTitle>
                <DialogDescription>
                  {selectedConsultation.title[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (FR)' : language === 'de' ? 'Titel (FR)' : 'Title (FR)'}
                  </label>
                  <Input defaultValue={selectedConsultation.title.fr} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (DE)' : language === 'de' ? 'Titel (DE)' : 'Title (DE)'}
                  </label>
                  <Input defaultValue={selectedConsultation.title.de} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre (EN)' : language === 'de' ? 'Titel (EN)' : 'Title (EN)'}
                  </label>
                  <Input defaultValue={selectedConsultation.title.en} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'}
                    </label>
                    <Select defaultValue={selectedConsultation.type}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public_meeting">
                          {language === 'fr' ? 'Réunion publique' : language === 'de' ? 'Öffentliche Versammlung' : 'Public meeting'}
                        </SelectItem>
                        <SelectItem value="online_debate">
                          {language === 'fr' ? 'Débat en ligne' : language === 'de' ? 'Online-Debatte' : 'Online debate'}
                        </SelectItem>
                        <SelectItem value="citizen_proposal">
                          {language === 'fr' ? 'Proposition citoyenne' : language === 'de' ? 'Bürgervorschlag' : 'Citizen proposal'}
                        </SelectItem>
                        <SelectItem value="expert_hearing">
                          {language === 'fr' ? 'Audition d\'experts' : language === 'de' ? 'Expertenanhörung' : 'Expert hearing'}
                        </SelectItem>
                        <SelectItem value="workshop">
                          {language === 'fr' ? 'Atelier' : language === 'de' ? 'Workshop' : 'Workshop'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
                    </label>
                    <Select defaultValue={selectedConsultation.status}>
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
                        <SelectItem value="closed">
                          {language === 'fr' ? 'Clôturée' : language === 'de' ? 'Geschlossen' : 'Closed'}
                        </SelectItem>
                        <SelectItem value="archived">
                          {language === 'fr' ? 'Archivée' : language === 'de' ? 'Archiviert' : 'Archived'}
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
                    <Input type="date" defaultValue={selectedConsultation.startDate} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Date de fin' : language === 'de' ? 'Enddatum' : 'End date'}
                    </label>
                    <Input type="date" defaultValue={selectedConsultation.endDate} />
                  </div>
                </div>

                {selectedConsultation.location && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {language === 'fr' ? 'Lieu' : language === 'de' ? 'Ort' : 'Location'}
                    </label>
                    <Input defaultValue={selectedConsultation.location} />
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                  </Button>
                  <Button onClick={() => {
                    toast.success(
                      language === 'fr' ? 'Concertation modifiée avec succès' :
                      language === 'de' ? 'Konsultation erfolgreich bearbeitet' :
                      'Consultation updated successfully'
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

      {/* Comments Dialog */}
      <Dialog open={showCommentsDialog} onOpenChange={setShowCommentsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
          {selectedConsultation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Commentaires' : language === 'de' ? 'Kommentare' : 'Comments'}
                </DialogTitle>
                <DialogDescription>
                  {selectedConsultation.title[language]} • {selectedConsultation.comments} {language === 'fr' ? 'commentaires' : language === 'de' ? 'Kommentare' : 'comments'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
                {filteredComments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                          {comment.author.firstName[0] + comment.author.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {comment.author.firstName} {comment.author.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(comment.createdAt).toLocaleDateString(language)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Heart className="w-3 h-3" />
                            {comment.likes}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          {comment.content}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => handleApproveComment(comment.id)}>
                            {language === 'fr' ? 'Approuver' : language === 'de' ? 'Genehmigen' : 'Approve'}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-red-600 hover:text-red-700" onClick={() => handleRejectComment(comment.id)}>
                            {language === 'fr' ? 'Rejeter' : language === 'de' ? 'Ablehnen' : 'Reject'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowCommentsDialog(false)}>
                  {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
                </Button>
                <Button onClick={() => {
                  toast.success(
                    language === 'fr' ? 'Export des commentaires en cours...' :
                    language === 'de' ? 'Kommentare werden exportiert...' :
                    'Exporting comments...'
                  );
                }}>
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Exporter' : language === 'de' ? 'Exportieren' : 'Export'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Manage Members Dialog */}
      <Dialog open={showManageMembersDialog} onOpenChange={setShowManageMembersDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedConsultation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Gérer les membres' : language === 'de' ? 'Mitglieder verwalten' : 'Manage members'}
                </DialogTitle>
                <DialogDescription>
                  {selectedConsultation.title[language]}
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
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddMember();
                        }
                      }}
                    />
                    <Button onClick={handleAddMember}>
                      <Plus className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Ajouter' : language === 'de' ? 'Hinzufügen' : 'Add'}
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    {language === 'fr' ? 'Membres actuels' : language === 'de' ? 'Aktuelle Mitglieder' : 'Current members'} ({getCurrentMembers().length})
                  </h4>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {getCurrentMembers().length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        {language === 'fr' ? 'Aucun membre ajouté' :
                         language === 'de' ? 'Keine Mitglieder hinzugefügt' :
                         'No members added'}
                      </div>
                    ) : (
                      getCurrentMembers().map((member) => (
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
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))
                    )}
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
          {selectedConsultation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CalendarPlus className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Ajouter une réunion' : language === 'de' ? 'Meeting hinzufügen' : 'Add a meeting'}
                </DialogTitle>
                <DialogDescription>
                  {selectedConsultation.title[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre de la réunion (FR)' : language === 'de' ? 'Besprechungstitel (FR)' : 'Meeting title (FR)'}
                  </label>
                  <Input placeholder={language === 'fr' ? 'Ex: Réunion de concertation' : language === 'de' ? 'Bsp: Beratungstreffen' : 'Ex: Consultation meeting'} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre de la réunion (DE)' : language === 'de' ? 'Besprechungstitel (DE)' : 'Meeting title (DE)'}
                  </label>
                  <Input placeholder="Beratungstreffen" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'fr' ? 'Titre de la réunion (EN)' : language === 'de' ? 'Besprechungstitel (EN)' : 'Meeting title (EN)'}
                  </label>
                  <Input placeholder="Consultation meeting" />
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
                    <Input type="time" defaultValue="14:00" />
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
          {selectedConsultation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Réunions planifiées' : language === 'de' ? 'Geplante Meetings' : 'Scheduled meetings'}
                </DialogTitle>
                <DialogDescription>
                  {selectedConsultation.title[language]}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2">
                {getCurrentMeetings().filter(m => m.status !== 'cancelled').length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <CalendarDays className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm">
                      {language === 'fr' ? 'Aucune réunion planifiée' :
                       language === 'de' ? 'Keine geplanten Meetings' :
                       'No scheduled meetings'}
                    </p>
                  </div>
                ) : (
                  getCurrentMeetings()
                    .filter(meeting => meeting.status !== 'cancelled')
                    .map((meeting) => (
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
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {language === 'fr' ? 'À venir' : language === 'de' ? 'Bevorstehend' : 'Upcoming'}
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
                          <Button variant="ghost" size="sm" onClick={() => handleEditMeeting(meeting)}>
                            <Edit className="w-3.5 h-3.5 mr-1" />
                            {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50" 
                            onClick={() => handleCancelMeeting(meeting.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                          </Button>
                        </div>
                      </div>
                    ))
                )}
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
                  {language === 'fr' ? 'Modifiez les informations de la réunion' :
                   language === 'de' ? 'Bearbeiten Sie die Meeting-Informationen' :
                   'Edit the meeting information'}
                </DialogDescription>
              </DialogHeader>

              <EditMeetingForm
                meeting={selectedMeeting}
                language={language}
                onSave={handleSaveEditedMeeting}
                onCancel={() => {
                  setShowEditMeetingDialog(false);
                  setSelectedMeeting(null);
                }}
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
  language: string; 
  onSave: (meeting: any) => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    titleFr: meeting.title.fr,
    titleDe: meeting.title.de,
    titleEn: meeting.title.en,
    descriptionFr: meeting.description.fr,
    descriptionDe: meeting.description.de,
    descriptionEn: meeting.description.en,
    date: meeting.date,
    time: meeting.time,
    locationFr: meeting.location.fr,
    locationDe: meeting.location.de,
    locationEn: meeting.location.en,
    maxParticipants: meeting.maxParticipants,
    isOnline: meeting.isOnline,
    meetingUrl: meeting.meetingUrl || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedMeeting = {
      ...meeting,
      title: {
        fr: formData.titleFr,
        de: formData.titleDe,
        en: formData.titleEn,
      },
      description: {
        fr: formData.descriptionFr,
        de: formData.descriptionDe,
        en: formData.descriptionEn,
      },
      date: formData.date,
      time: formData.time,
      location: {
        fr: formData.locationFr,
        de: formData.locationDe,
        en: formData.locationEn,
      },
      maxParticipants: formData.maxParticipants,
      isOnline: formData.isOnline,
      meetingUrl: formData.meetingUrl,
    };

    onSave(updatedMeeting);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Titre (FR)' : language === 'de' ? 'Titel (FR)' : 'Title (FR)'}
          </label>
          <Input
            value={formData.titleFr}
            onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
            placeholder="Réunion de concertation"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Titre (DE)' : language === 'de' ? 'Titel (DE)' : 'Title (DE)'}
          </label>
          <Input
            value={formData.titleDe}
            onChange={(e) => setFormData({ ...formData, titleDe: e.target.value })}
            placeholder="Beratungstreffen"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Titre (EN)' : language === 'de' ? 'Titel (EN)' : 'Title (EN)'}
          </label>
          <Input
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            placeholder="Consultation meeting"
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Description (FR)' : language === 'de' ? 'Beschreibung (FR)' : 'Description (FR)'}
          </label>
          <Input
            value={formData.descriptionFr}
            onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
            placeholder="Discussion sur les propositions citoyennes"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Description (DE)' : language === 'de' ? 'Beschreibung (DE)' : 'Description (DE)'}
          </label>
          <Input
            value={formData.descriptionDe}
            onChange={(e) => setFormData({ ...formData, descriptionDe: e.target.value })}
            placeholder="Diskussion über Bürgervorschläge"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Description (EN)' : language === 'de' ? 'Beschreibung (EN)' : 'Description (EN)'}
          </label>
          <Input
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
            placeholder="Discussion on citizen proposals"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Date' : language === 'de' ? 'Datum' : 'Date'}
          </label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Heure' : language === 'de' ? 'Uhrzeit' : 'Time'}
          </label>
          <Input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Lieu (FR)' : language === 'de' ? 'Ort (FR)' : 'Location (FR)'}
          </label>
          <Input
            value={formData.locationFr}
            onChange={(e) => setFormData({ ...formData, locationFr: e.target.value })}
            placeholder="Mairie - Salle du Conseil"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Lieu (DE)' : language === 'de' ? 'Ort (DE)' : 'Location (DE)'}
          </label>
          <Input
            value={formData.locationDe}
            onChange={(e) => setFormData({ ...formData, locationDe: e.target.value })}
            placeholder="Rathaus - Ratssaal"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'Lieu (EN)' : language === 'de' ? 'Ort (EN)' : 'Location (EN)'}
          </label>
          <Input
            value={formData.locationEn}
            onChange={(e) => setFormData({ ...formData, locationEn: e.target.value })}
            placeholder="City Hall - Council Room"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {language === 'fr' ? 'Nombre maximum de participants' : 
           language === 'de' ? 'Maximale Teilnehmerzahl' : 
           'Maximum number of participants'}
        </label>
        <Input
          type="number"
          min="1"
          value={formData.maxParticipants}
          onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isOnline"
          checked={formData.isOnline}
          onChange={(e) => setFormData({ ...formData, isOnline: e.target.checked })}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isOnline" className="text-sm font-medium text-gray-700">
          {language === 'fr' ? 'Réunion en ligne' : 
           language === 'de' ? 'Online-Meeting' : 
           'Online meeting'}
        </label>
      </div>

      {formData.isOnline && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {language === 'fr' ? 'URL de la réunion' : 
             language === 'de' ? 'Meeting-URL' : 
             'Meeting URL'}
          </label>
          <Input
            type="url"
            value={formData.meetingUrl}
            onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
            placeholder="https://meet.civix.com/..."
          />
        </div>
      )}

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