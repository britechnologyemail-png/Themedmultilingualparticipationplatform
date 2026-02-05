import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
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
  Users,
  UserMinus,
  Edit,
  FileText,
  Mic,
  CheckSquare,
  MessageSquare,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  Filter,
  Heart,
  Settings,
  Flag
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { toast } from 'sonner';

// Mock data for user participations
const mockParticipations = {
  assemblies: [
    {
      id: 1,
      userName: 'Marie Dubois',
      assemblyName: 'Assemblée Citoyenne Climat',
      action: 'joined',
      date: '2026-01-05T14:30:00',
      status: 'active',
      nextMeeting: '2026-02-15'
    },
    {
      id: 2,
      userName: 'Pierre Martin',
      assemblyName: 'Assemblée Citoyenne Climat',
      action: 'cancelled',
      date: '2026-01-06T10:15:00',
      status: 'cancelled',
      reason: 'Conflit d\'horaire'
    },
    {
      id: 3,
      userName: 'Sophie Bernard',
      assemblyName: 'Conseil Participatif Mobilité',
      action: 'joined',
      date: '2026-01-04T09:20:00',
      status: 'active',
      nextMeeting: '2026-01-20'
    },
    {
      id: 4,
      userName: 'Jean Leroy',
      assemblyName: 'Commission Participative Éducation',
      action: 'cancelled',
      date: '2026-01-03T16:45:00',
      status: 'cancelled',
      reason: 'Changement de disponibilité'
    }
  ],
  petitions: [
    {
      id: 1,
      userName: 'Claire Fontaine',
      petitionName: 'Pour plus d\'espaces verts',
      action: 'signed',
      date: '2026-01-05T11:30:00',
      status: 'active'
    },
    {
      id: 2,
      userName: 'Marc Petit',
      petitionName: 'Transports publics gratuits',
      action: 'signed',
      date: '2026-01-04T14:20:00',
      status: 'active'
    },
    {
      id: 3,
      userName: 'Claire Fontaine',
      petitionName: 'Pour plus d\'espaces verts',
      action: 'unsigned',
      date: '2026-01-06T09:15:00',
      status: 'removed',
      reason: 'Changement d\'avis'
    },
    {
      id: 4,
      userName: 'Isabelle Wagner',
      petitionName: 'Piste cyclable sécurisée',
      action: 'signed',
      date: '2026-01-03T10:45:00',
      status: 'active'
    },
    {
      id: 5,
      userName: 'Thomas Müller',
      petitionName: 'Piste cyclable sécurisée',
      action: 'unsigned',
      date: '2026-01-05T15:30:00',
      status: 'removed',
      reason: 'Signature en doublon'
    }
  ],
  conferences: [
    {
      id: 1,
      userName: 'Laura Rossi',
      conferenceName: 'Forum Développement Durable',
      action: 'registered',
      date: '2026-01-05T13:20:00',
      status: 'confirmed',
      conferenceDate: '2026-02-20'
    },
    {
      id: 2,
      userName: 'Antoine Durand',
      conferenceName: 'Conférence Mobilité Urbaine',
      action: 'registered',
      date: '2026-01-04T16:30:00',
      status: 'confirmed',
      conferenceDate: '2026-01-30'
    },
    {
      id: 3,
      userName: 'Laura Rossi',
      conferenceName: 'Forum Développement Durable',
      action: 'cancelled',
      date: '2026-01-06T10:00:00',
      status: 'cancelled',
      reason: 'Empêchement professionnel'
    },
    {
      id: 4,
      userName: 'Sophie Garcia',
      conferenceName: 'Atelier Participation Citoyenne',
      action: 'registered',
      date: '2026-01-03T11:45:00',
      status: 'confirmed',
      conferenceDate: '2026-02-10'
    }
  ],
  comments: [
    {
      id: 1,
      userName: 'Pierre Dubois',
      processName: 'Plan climat 2030',
      action: 'created',
      date: '2026-01-05T10:30:00',
      status: 'published',
      content: 'Excellente initiative pour...'
    },
    {
      id: 2,
      userName: 'Pierre Dubois',
      processName: 'Plan climat 2030',
      action: 'edited',
      date: '2026-01-05T11:15:00',
      status: 'published',
      content: 'Excellente initiative pour le climat...'
    },
    {
      id: 3,
      userName: 'Marie Laurent',
      processName: 'Aménagement centre-ville',
      action: 'deleted',
      date: '2026-01-04T15:20:00',
      status: 'deleted',
      reason: 'Contenu inapproprié'
    },
    {
      id: 4,
      userName: 'Jean Moreau',
      processName: 'Budget participatif 2027',
      action: 'created',
      date: '2026-01-03T09:45:00',
      status: 'published',
      content: 'Je propose d\'allouer...'
    }
  ],
  votes: [
    {
      id: 1,
      userName: 'Sophie Martin',
      voteName: 'Choix du projet gagnant',
      action: 'voted',
      date: '2026-01-05T14:00:00',
      status: 'confirmed',
      choice: 'Projet A - Parc urbain'
    },
    {
      id: 2,
      userName: 'Sophie Martin',
      voteName: 'Choix du projet gagnant',
      action: 'changed',
      date: '2026-01-05T16:30:00',
      status: 'updated',
      oldChoice: 'Projet A - Parc urbain',
      newChoice: 'Projet B - Piste cyclable'
    },
    {
      id: 3,
      userName: 'Marc Lefevre',
      voteName: 'Budget participatif priorités',
      action: 'voted',
      date: '2026-01-04T11:20:00',
      status: 'confirmed',
      choice: 'Éducation'
    },
    {
      id: 4,
      userName: 'Claire Bernard',
      voteName: 'Choix du projet gagnant',
      action: 'voted',
      date: '2026-01-03T13:45:00',
      status: 'confirmed',
      choice: 'Projet C - Centre culturel'
    }
  ],
  youth: [
    {
      id: 1,
      userName: 'Lucas Dubois',
      age: 15,
      pollName: 'Aménagement skatepark',
      action: 'voted',
      date: '2026-01-05T14:20:00',
      status: 'completed',
      choice: 'Option A - Nouveaux modules'
    },
    {
      id: 2,
      userName: 'Emma Martin',
      age: 14,
      pollName: 'Activités vacances d\'été',
      action: 'voted',
      date: '2026-01-04T11:15:00',
      status: 'completed',
      choice: 'Sports nautiques'
    },
    {
      id: 3,
      userName: 'Noah Garcia',
      age: 16,
      pollName: 'Aménagement skatepark',
      action: 'voted',
      date: '2026-01-03T16:30:00',
      status: 'completed',
      choice: 'Option B - Zone street'
    },
    {
      id: 4,
      userName: 'Léa Bernard',
      age: 13,
      pollName: 'Choix du spectacle jeunesse',
      action: 'voted',
      date: '2026-01-02T10:45:00',
      status: 'completed',
      choice: 'Concert rap'
    }
  ],
  signalements: [
    {
      id: 1,
      userName: 'Marc Dubois',
      title: 'Nid-de-poule dangereux avenue de la Liberté',
      category: 'infrastructure',
      action: 'created',
      date: '2026-01-05T09:15:00',
      status: 'under_review',
      priority: 'high',
      location: 'Avenue de la Liberté, 45'
    },
    {
      id: 2,
      userName: 'Sophie Leroy',
      title: 'Déchets abandonnés parc municipal',
      category: 'cleanliness',
      action: 'created',
      date: '2026-01-04T14:30:00',
      status: 'in_progress',
      priority: 'medium',
      location: 'Parc Municipal'
    },
    {
      id: 3,
      userName: 'Jean Martin',
      title: 'Éclairage défectueux rue du Commerce',
      category: 'safety',
      action: 'created',
      date: '2026-01-03T18:45:00',
      status: 'resolved',
      priority: 'high',
      location: 'Rue du Commerce, 23',
      resolvedAt: '2026-01-05T10:00:00'
    },
    {
      id: 4,
      userName: 'Marie Garcia',
      title: 'Graffiti mur école primaire',
      category: 'vandalism',
      action: 'created',
      date: '2026-01-02T11:20:00',
      status: 'in_progress',
      priority: 'low',
      location: 'École Primaire Jean Jaurès'
    },
    {
      id: 5,
      userName: 'Pierre Bernard',
      title: 'Fuite d\'eau fontaine publique',
      category: 'infrastructure',
      action: 'created',
      date: '2026-01-01T15:50:00',
      status: 'submitted',
      priority: 'medium',
      location: 'Place de la République'
    }
  ]
};

export function ParticipationsManagement() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('assemblies');
  const [showFilters, setShowFilters] = useState(false);

  // Export function
  const handleExport = () => {
    try {
      let data: any[] = [];
      let headers: string[] = [];
      let filename = '';

      // Determine which data to export based on active tab
      switch (activeTab) {
        case 'assemblies':
          data = mockParticipations.assemblies;
          headers = ['Utilisateur', 'Assemblée', 'Action', 'Date', 'Statut', 'Prochaine réunion', 'Raison'];
          filename = 'participations_assemblees';
          break;
        case 'petitions':
          data = mockParticipations.petitions;
          headers = ['Utilisateur', 'Pétition', 'Action', 'Date', 'Statut', 'Raison'];
          filename = 'participations_petitions';
          break;
        case 'conferences':
          data = mockParticipations.conferences;
          headers = ['Utilisateur', 'Conférence', 'Action', 'Date action', 'Statut', 'Date conférence', 'Raison'];
          filename = 'participations_conferences';
          break;
        case 'comments':
          data = mockParticipations.comments;
          headers = ['Utilisateur', 'Processus', 'Action', 'Date', 'Statut', 'Contenu', 'Raison'];
          filename = 'participations_commentaires';
          break;
        case 'votes':
          data = mockParticipations.votes;
          headers = ['Utilisateur', 'Vote', 'Action', 'Date', 'Statut', 'Choix', 'Ancien choix'];
          filename = 'participations_votes';
          break;
        case 'youth':
          data = mockParticipations.youth;
          headers = ['Utilisateur', 'Âge', 'Sondage', 'Action', 'Date', 'Statut', 'Choix'];
          filename = 'participations_jeunesse';
          break;
        case 'signalements':
          data = mockParticipations.signalements;
          headers = ['Utilisateur', 'Titre', 'Catégorie', 'Action', 'Date', 'Statut', 'Priorité', 'Localisation', 'Résolu le'];
          filename = 'participations_signalements';
          break;
      }

      // Generate CSV content
      const csvContent = [
        headers.join(','),
        ...data.map((item: any) => {
          const formatDate = (date: string) => {
            return new Date(date).toLocaleString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          };

          switch (activeTab) {
            case 'assemblies':
              return [
                `"${item.userName}"`,
                `"${item.assemblyName}"`,
                `"${item.action}"`,
                `"${formatDate(item.date)}"`,
                `"${item.status}"`,
                `"${item.nextMeeting ? new Date(item.nextMeeting).toLocaleDateString('fr-FR') : '-'}"`,
                `"${item.reason || '-'}"`
              ].join(',');
            case 'petitions':
              return [
                `"${item.userName}"`,
                `"${item.petitionName}"`,
                `"${item.action}"`,
                `"${formatDate(item.date)}"`,
                `"${item.status}"`,
                `"${item.reason || '-'}"`
              ].join(',');
            case 'conferences':
              return [
                `"${item.userName}"`,
                `"${item.conferenceName}"`,
                `"${item.action}"`,
                `"${formatDate(item.date)}"`,
                `"${item.status}"`,
                `"${item.conferenceDate ? new Date(item.conferenceDate).toLocaleDateString('fr-FR') : '-'}"`,
                `"${item.reason || '-'}"`
              ].join(',');
            case 'comments':
              return [
                `"${item.userName}"`,
                `"${item.processName}"`,
                `"${item.action}"`,
                `"${formatDate(item.date)}"`,
                `"${item.status}"`,
                `"${item.content || '-'}"`,
                `"${item.reason || '-'}"`
              ].join(',');
            case 'votes':
              return [
                `"${item.userName}"`,
                `"${item.voteName}"`,
                `"${item.action}"`,
                `"${formatDate(item.date)}"`,
                `"${item.status}"`,
                `"${item.newChoice || item.choice || '-'}"`,
                `"${item.oldChoice || '-'}"`
              ].join(',');
            case 'youth':
              return [
                `"${item.userName}"`,
                `"${item.age}"`,
                `"${item.pollName}"`,
                `"${item.action}"`,
                `"${formatDate(item.date)}"`,
                `"${item.status}"`,
                `"${item.choice || '-'}"`
              ].join(',');
            case 'signalements':
              return [
                `"${item.userName}"`,
                `"${item.title}"`,
                `"${item.category}"`,
                `"${item.action}"`,
                `"${formatDate(item.date)}"`,
                `"${item.status}"`,
                `"${item.priority}"`,
                `"${item.location}"`,
                `"${item.resolvedAt ? new Date(item.resolvedAt).toLocaleDateString('fr-FR') : '-'}"`
              ].join(',');
            default:
              return '';
          }
        })
      ].join('\n');

      // Create and download the file
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(
        language === 'fr' ? 'Export réussi' :
        language === 'de' ? 'Export erfolgreich' :
        'Export successful'
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de l\'export' :
        language === 'de' ? 'Fehler beim Exportieren' :
        'Error during export'
      );
    }
  };

  const getActionBadge = (action: string) => {
    const variants: Record<string, { label: string; color: string }> = {
      joined: { label: 'Adhésion', color: 'bg-green-100 text-green-700 border-green-200' },
      cancelled: { label: 'Annulé', color: 'bg-orange-100 text-orange-700 border-orange-200' },
      signed: { label: 'Signé', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      unsigned: { label: 'Retiré', color: 'bg-red-100 text-red-700 border-red-200' },
      registered: { label: 'Inscrit', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      created: { label: 'Créé', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
      edited: { label: 'Modifié', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      deleted: { label: 'Supprimé', color: 'bg-red-100 text-red-700 border-red-200' },
      voted: { label: 'Voté', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
      changed: { label: 'Changé', color: 'bg-orange-100 text-orange-700 border-orange-200' }
    };

    const variant = variants[action] || { label: action, color: 'bg-gray-100 text-gray-700 border-gray-200' };
    return (
      <Badge className={`${variant.color} border`}>
        {variant.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string; icon: any }> = {
      active: { label: 'Actif', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
      cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
      confirmed: { label: 'Confirmé', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
      removed: { label: 'Retiré', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: AlertCircle },
      published: { label: 'Publié', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle },
      deleted: { label: 'Supprimé', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
      updated: { label: 'Mis à jour', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: AlertCircle },
      completed: { label: 'Terminé', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: CheckCircle }
    };

    const variant = variants[status] || { label: status, color: 'bg-gray-100 text-gray-700 border-gray-200', icon: AlertCircle };
    const Icon = variant.icon;

    return (
      <Badge className={`${variant.color} border flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  // Badge helpers for Signalements
  const getCategoryBadge = (category: string) => {
    const variants: Record<string, { label: string; color: string }> = {
      infrastructure: { label: 'Infrastructure', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      cleanliness: { label: 'Propreté', color: 'bg-green-100 text-green-700 border-green-200' },
      safety: { label: 'Sécurité', color: 'bg-red-100 text-red-700 border-red-200' },
      vandalism: { label: 'Vandalisme', color: 'bg-orange-100 text-orange-700 border-orange-200' },
      environment: { label: 'Environnement', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      accessibility: { label: 'Accessibilité', color: 'bg-purple-100 text-purple-700 border-purple-200' }
    };
    const variant = variants[category] || { label: category, color: 'bg-gray-100 text-gray-700 border-gray-200' };
    return <Badge className={`${variant.color} border`}>{variant.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, { label: string; color: string }> = {
      high: { label: 'Haute', color: 'bg-red-100 text-red-700 border-red-200' },
      medium: { label: 'Moyenne', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      low: { label: 'Basse', color: 'bg-green-100 text-green-700 border-green-200' }
    };
    const variant = variants[priority] || { label: priority, color: 'bg-gray-100 text-gray-700 border-gray-200' };
    return <Badge className={`${variant.color} border`}>{variant.label}</Badge>;
  };

  const getSignalementStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string; icon: any }> = {
      submitted: { label: 'Soumis', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: AlertCircle },
      under_review: { label: 'En révision', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: AlertCircle },
      in_progress: { label: 'En cours', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: AlertCircle },
      resolved: { label: 'Résolu', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
      rejected: { label: 'Rejeté', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
      archived: { label: 'Archivé', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: XCircle }
    };
    const variant = variants[status] || { label: status, color: 'bg-gray-100 text-gray-700 border-gray-200', icon: AlertCircle };
    const Icon = variant.icon;
    return (
      <Badge className={`${variant.color} border flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  // Calculate statistics
  const calculateStats = () => {
    const activeAssemblies = mockParticipations.assemblies.filter(a => a.status === 'active').length;
    const cancelledAssemblies = mockParticipations.assemblies.filter(a => a.status === 'cancelled').length;
    
    const activePetitions = mockParticipations.petitions.filter(p => p.status === 'active').length;
    const removedSignatures = mockParticipations.petitions.filter(p => p.status === 'removed').length;
    
    const confirmedConferences = mockParticipations.conferences.filter(c => c.status === 'confirmed').length;
    const cancelledConferences = mockParticipations.conferences.filter(c => c.status === 'cancelled').length;
    
    const publishedComments = mockParticipations.comments.filter(c => c.status === 'published').length;
    const deletedComments = mockParticipations.comments.filter(c => c.status === 'deleted').length;
    
    const confirmedVotes = mockParticipations.votes.filter(v => v.status === 'confirmed').length;
    const changedVotes = mockParticipations.votes.filter(v => v.status === 'updated').length;
    
    const completedYouthPolls = mockParticipations.youth.filter(y => y.status === 'completed').length;

    const activeSignalements = mockParticipations.signalements.filter(s => 
      s.status === 'under_review' || s.status === 'in_progress'
    ).length;
    const resolvedSignalements = mockParticipations.signalements.filter(s => s.status === 'resolved').length;

    return {
      assemblies: { active: activeAssemblies, cancelled: cancelledAssemblies },
      petitions: { active: activePetitions, removed: removedSignatures },
      conferences: { confirmed: confirmedConferences, cancelled: cancelledConferences },
      comments: { published: publishedComments, deleted: deletedComments },
      votes: { confirmed: confirmedVotes, changed: changedVotes },
      youth: { completed: completedYouthPolls },
      signalements: { active: activeSignalements, resolved: resolvedSignalements }
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {language === 'fr' ? 'Gestion des participations' :
           language === 'de' ? 'Teilnahmeverwaltung' :
           'Participation Management'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Suivez toutes les actions des citoyens : adhésions, signatures, inscriptions, commentaires et votes' :
           language === 'de' ? 'Verfolgen Sie alle Bürgeraktionen: Beitritte, Unterschriften, Anmeldungen, Kommentare und Abstimmungen' :
           'Track all citizen actions: memberships, signatures, registrations, comments and votes'}
        </p>
      </div>

      {/* Global Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assemblées actives</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.assemblies.active}</p>
                <p className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  {stats.assemblies.cancelled} annulations
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Signatures actives</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.petitions.active}</p>
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  {stats.petitions.removed} retraits
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Edit className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conférences confirmées</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.conferences.confirmed}</p>
                <p className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  {stats.conferences.cancelled} annulations
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Mic className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commentaires publiés</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.comments.published}</p>
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  {stats.comments.deleted} suppressions
                </p>
              </div>
              <div className="p-3 bg-cyan-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Votes confirmés</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.votes.confirmed}</p>
                <p className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  {stats.votes.changed} modifications
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <CheckSquare className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sondages jeunesse terminés</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.youth.completed}</p>
              </div>
              <div className="p-3 bg-pink-100 rounded-lg">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Signalements actifs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.signalements.active}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  {stats.signalements.resolved} résolus
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <Flag className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par utilisateur, processus..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Type d'action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les actions</SelectItem>
                  <SelectItem value="joined">Adhésions</SelectItem>
                  <SelectItem value="cancelled">Annulations</SelectItem>
                  <SelectItem value="signed">Signatures</SelectItem>
                  <SelectItem value="edited">Modifications</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2" onClick={handleExport}>
                <Download className="w-4 h-4" />
                {language === 'fr' ? 'Exporter' : language === 'de' ? 'Exportieren' : 'Export'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Toggle Filters Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Settings className="w-4 h-4" />
          {showFilters 
            ? (language === 'fr' ? 'Masquer les filtres' : language === 'de' ? 'Filter ausblenden' : 'Hide filters')
            : (language === 'fr' ? 'Afficher les filtres et export' : language === 'de' ? 'Filter und Export anzeigen' : 'Show filters and export')
          }
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="assemblies" className="gap-2">
            <Users className="w-4 h-4" />
            Assemblées
          </TabsTrigger>
          <TabsTrigger value="petitions" className="gap-2">
            <Edit className="w-4 h-4" />
            Pétitions
          </TabsTrigger>
          <TabsTrigger value="conferences" className="gap-2">
            <Mic className="w-4 h-4" />
            Conférences
          </TabsTrigger>
          <TabsTrigger value="comments" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Commentaires
          </TabsTrigger>
          <TabsTrigger value="votes" className="gap-2">
            <CheckSquare className="w-4 h-4" />
            Votes
          </TabsTrigger>
          <TabsTrigger value="youth" className="gap-2">
            <Heart className="w-4 h-4" />
            Jeunesse
          </TabsTrigger>
          <TabsTrigger value="signalements" className="gap-2">
            <Flag className="w-4 h-4" />
            Signalements
          </TabsTrigger>
        </TabsList>

        {/* Assemblies Tab */}
        <TabsContent value="assemblies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Participations aux assemblées</span>
                <Badge variant="outline">{mockParticipations.assemblies.length} actions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Assemblée</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Prochaine réunion</TableHead>
                    <TableHead>Raison</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParticipations.assemblies.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.userName}</TableCell>
                      <TableCell>{item.assemblyName}</TableCell>
                      <TableCell>{getActionBadge(item.action)}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(item.date).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        {item.nextMeeting ? (
                          <span className="text-sm text-gray-700">
                            {new Date(item.nextMeeting).toLocaleDateString('fr-FR')}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                        {item.reason || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Petitions Tab */}
        <TabsContent value="petitions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Signatures de pétitions</span>
                <Badge variant="outline">{mockParticipations.petitions.length} actions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Pétition</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Raison</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParticipations.petitions.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.userName}</TableCell>
                      <TableCell>{item.petitionName}</TableCell>
                      <TableCell>{getActionBadge(item.action)}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(item.date).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                        {item.reason || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conferences Tab */}
        <TabsContent value="conferences">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Inscriptions aux conférences</span>
                <Badge variant="outline">{mockParticipations.conferences.length} actions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Conférence</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Date action</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date conférence</TableHead>
                    <TableHead>Raison</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParticipations.conferences.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.userName}</TableCell>
                      <TableCell>{item.conferenceName}</TableCell>
                      <TableCell>{getActionBadge(item.action)}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(item.date).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        {item.conferenceDate ? (
                          <span className="text-sm text-gray-700">
                            {new Date(item.conferenceDate).toLocaleDateString('fr-FR')}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                        {item.reason || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comments Tab */}
        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Gestion des commentaires</span>
                <Badge variant="outline">{mockParticipations.comments.length} actions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Processus</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Contenu</TableHead>
                    <TableHead>Raison</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParticipations.comments.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.userName}</TableCell>
                      <TableCell>{item.processName}</TableCell>
                      <TableCell>{getActionBadge(item.action)}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(item.date).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                        {item.content || '-'}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                        {item.reason || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Votes Tab */}
        <TabsContent value="votes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Historique des votes</span>
                <Badge variant="outline">{mockParticipations.votes.length} actions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Vote</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Choix</TableHead>
                    <TableHead>Ancien choix</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParticipations.votes.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.userName}</TableCell>
                      <TableCell>{item.voteName}</TableCell>
                      <TableCell>{getActionBadge(item.action)}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(item.date).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-sm font-medium text-gray-700">
                        {item.newChoice || item.choice || '-'}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {item.oldChoice ? (
                          <span className="line-through">{item.oldChoice}</span>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Youth Tab */}
        <TabsContent value="youth">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Sondages jeunesse</span>
                <Badge variant="outline">{mockParticipations.youth.length} actions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Âge</TableHead>
                    <TableHead>Sondage</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Choix</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParticipations.youth.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.userName}</TableCell>
                      <TableCell>{item.age}</TableCell>
                      <TableCell>{item.pollName}</TableCell>
                      <TableCell>{getActionBadge(item.action)}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(item.date).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-sm font-medium text-gray-700">
                        {item.choice || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Signalements Tab */}
        <TabsContent value="signalements">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Signalements</span>
                <Badge variant="outline">{mockParticipations.signalements.length} actions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Résolu le</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParticipations.signalements.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.userName}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{getCategoryBadge(item.category)}</TableCell>
                      <TableCell>{getActionBadge(item.action)}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(item.date).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>{getSignalementStatusBadge(item.status)}</TableCell>
                      <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                        {item.location}
                      </TableCell>
                      <TableCell>
                        {item.resolvedAt ? (
                          <span className="text-sm text-gray-700">
                            {new Date(item.resolvedAt).toLocaleDateString('fr-FR')}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Suivi en temps réel
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Cette page affiche toutes les actions des citoyens sur la plateforme : adhésions aux assemblées, 
                signatures de pétitions, inscriptions aux conférences, création/modification de commentaires et votes.
              </p>
              <p className="text-sm text-gray-700">
                Les données incluent les annulations et modifications pour assurer une traçabilité complète.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}