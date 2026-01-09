import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
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
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  User,
  Calendar,
  Eye,
  Search,
  Filter,
  FileText,
  Shield
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

// Mock data
const mockContributions = [
  {
    id: 1,
    author: 'Marie Dubois',
    content: 'Je propose d\'améliorer les pistes cyclables en ajoutant des protections physiques sur les axes principaux. Cela permettrait de sécuriser les trajets quotidiens.',
    theme: 'Mobilité',
    process: 'Plan climat 2030',
    date: '2026-01-06T10:30:00',
    status: 'pending',
    priority: 'high',
    type: 'proposal'
  },
  {
    id: 2,
    author: 'Pierre Leroy',
    content: 'Le projet de parc urbain est une excellente initiative. J\'aimerais suggérer d\'y inclure des espaces de jardinage partagé pour renforcer le lien social.',
    theme: 'Environnement',
    process: 'Aménagement centre-ville',
    date: '2026-01-06T09:15:00',
    status: 'pending',
    priority: 'medium',
    type: 'comment'
  },
  {
    id: 3,
    author: 'Claire Bernard',
    content: 'Les horaires d\'ouverture des bibliothèques devraient être étendus le week-end pour mieux servir les familles et les étudiants.',
    theme: 'Culture',
    process: 'Budget participatif 2027',
    date: '2026-01-05T16:45:00',
    status: 'pending',
    priority: 'low',
    type: 'suggestion'
  },
  {
    id: 4,
    author: 'Jean Martin',
    content: 'Excellente proposition pour améliorer la qualité de vie dans notre quartier. Je soutiens pleinement cette initiative.',
    theme: 'Urbanisme',
    process: 'Plan climat 2030',
    date: '2026-01-05T14:20:00',
    status: 'approved',
    priority: 'medium',
    type: 'proposal'
  },
  {
    id: 5,
    author: 'Sophie Petit',
    content: 'Contenu inapproprié et non constructif.',
    theme: 'Mobilité',
    process: 'Mobilité douce',
    date: '2026-01-05T11:00:00',
    status: 'rejected',
    priority: 'high',
    type: 'comment',
    moderationNote: 'Contenu ne respectant pas la charte de participation citoyenne.'
  },
  {
    id: 6,
    author: 'Lucas Moreau',
    content: 'Il faudrait installer plus de bornes de recharge électrique dans les parkings publics pour encourager la mobilité verte.',
    theme: 'Environnement',
    process: 'Plan climat 2030',
    date: '2026-01-04T15:30:00',
    status: 'approved',
    priority: 'medium',
    type: 'proposal'
  },
  {
    id: 7,
    author: 'Emma Rousseau',
    content: 'Les espaces verts manquent cruellement dans notre quartier. Un parc serait bienvenu pour les familles.',
    theme: 'Urbanisme',
    process: 'Aménagement centre-ville',
    date: '2026-01-04T11:20:00',
    status: 'pending',
    priority: 'medium',
    type: 'suggestion'
  },
  {
    id: 8,
    author: 'Thomas Blanc',
    content: 'La sécurité aux abords des écoles doit être renforcée avec des zones 30 et plus de passages piétons.',
    theme: 'Mobilité',
    process: 'Sécurité routière',
    date: '2026-01-03T09:45:00',
    status: 'approved',
    priority: 'high',
    type: 'proposal'
  }
];

export function ModerationPage() {
  const { language } = useLanguage();
  const [selectedContribution, setSelectedContribution] = useState<any>(null);
  const [moderationComment, setModerationComment] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, { label: string; color: string }> = {
      high: { label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-300' },
      medium: { label: 'Moyen', color: 'bg-orange-100 text-orange-700 border-orange-300' },
      low: { label: 'Faible', color: 'bg-gray-100 text-gray-700 border-gray-300' }
    };

    const variant = variants[priority] || variants.low;
    return (
      <Badge className={`${variant.color} border`}>
        {variant.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string; icon: any }> = {
      pending: { label: 'En attente', color: 'bg-orange-100 text-orange-700 border-orange-300', icon: Clock },
      approved: { label: 'Approuvé', color: 'bg-green-100 text-green-700 border-green-300', icon: CheckCircle2 },
      rejected: { label: 'Rejeté', color: 'bg-red-100 text-red-700 border-red-300', icon: XCircle }
    };

    const variant = variants[status] || variants.pending;
    const Icon = variant.icon;
    
    return (
      <Badge className={`${variant.color} border flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const types: Record<string, { label: string; color: string }> = {
      proposal: { label: 'Proposition', color: 'bg-blue-100 text-blue-700 border-blue-300' },
      comment: { label: 'Commentaire', color: 'bg-purple-100 text-purple-700 border-purple-300' },
      suggestion: { label: 'Suggestion', color: 'bg-cyan-100 text-cyan-700 border-cyan-300' }
    };

    const variant = types[type] || types.comment;
    return (
      <Badge className={`${variant.color} border`}>
        {variant.label}
      </Badge>
    );
  };

  const filteredContributions = mockContributions.filter(c => {
    const matchesTab = activeTab === 'all' || c.status === activeTab;
    const matchesSearch = c.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.theme.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || c.priority === priorityFilter;
    const matchesType = typeFilter === 'all' || c.type === typeFilter;
    
    return matchesTab && matchesSearch && matchesPriority && matchesType;
  });

  const pendingCount = mockContributions.filter(c => c.status === 'pending').length;
  const approvedCount = mockContributions.filter(c => c.status === 'approved').length;
  const rejectedCount = mockContributions.filter(c => c.status === 'rejected').length;
  const urgentCount = mockContributions.filter(c => c.priority === 'high' && c.status === 'pending').length;

  const handleApprove = () => {
    console.log('Approved:', selectedContribution?.id, 'Comment:', moderationComment);
    setModerationComment('');
    setSelectedContribution(null);
  };

  const handleReject = () => {
    console.log('Rejected:', selectedContribution?.id, 'Comment:', moderationComment);
    setModerationComment('');
    setSelectedContribution(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {language === 'fr' ? 'Modération des contenus' :
             language === 'de' ? 'Inhaltsmoderation' :
             'Content Moderation'}
          </h1>
          <p className="text-gray-600">
            {language === 'fr' ? 'Examinez et modérez les contributions des citoyens' :
             language === 'de' ? 'Überprüfen und moderieren Sie Bürgerbeiträge' :
             'Review and moderate citizen contributions'}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Shield className="w-4 h-4" />
          Guide de modération
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-semibold text-gray-900">{pendingCount}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approuvées</p>
                <p className="text-2xl font-semibold text-gray-900">{approvedCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejetées</p>
                <p className="text-2xl font-semibold text-gray-900">{rejectedCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgent</p>
                <p className="text-2xl font-semibold text-gray-900">{urgentCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="all">
            Toutes
            <span className="ml-1 text-xs">({mockContributions.length})</span>
          </TabsTrigger>
          <TabsTrigger value="pending">
            <Clock className="w-3 h-3 mr-1" />
            {pendingCount}
          </TabsTrigger>
          <TabsTrigger value="approved">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {approvedCount}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            <XCircle className="w-3 h-3 mr-1" />
            {rejectedCount}
          </TabsTrigger>
        </TabsList>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="w-5 h-5" />
              Filtres et recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes priorités</SelectItem>
                  <SelectItem value="high">Urgent</SelectItem>
                  <SelectItem value="medium">Moyen</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="proposal">Proposition</SelectItem>
                  <SelectItem value="comment">Commentaire</SelectItem>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <TabsContent value={activeTab} className="space-y-6">
          {/* Contributions Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Contributions ({filteredContributions.length})
              </CardTitle>
              <CardDescription>
                {activeTab === 'pending' && 'Contributions en attente de modération'}
                {activeTab === 'approved' && 'Contributions approuvées'}
                {activeTab === 'rejected' && 'Contributions rejetées'}
                {activeTab === 'all' && 'Toutes les contributions'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Auteur</TableHead>
                      <TableHead>Contenu</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Thème</TableHead>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContributions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          Aucune contribution à afficher
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredContributions.map((contribution) => (
                        <TableRow 
                          key={contribution.id}
                          className={selectedContribution?.id === contribution.id ? 'bg-blue-50' : ''}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="font-medium text-gray-900">
                                {contribution.author}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-md">
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {contribution.content}
                            </p>
                          </TableCell>
                          <TableCell>
                            {getTypeBadge(contribution.type)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-gray-50">
                              {contribution.theme}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getPriorityBadge(contribution.priority)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(contribution.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Calendar className="w-3 h-3" />
                              {new Date(contribution.date).toLocaleDateString('fr-FR')}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedContribution(contribution)}
                              className="gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              Examiner
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Detail & Moderation Panel */}
          {selectedContribution && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Aperçu et modération
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contribution Details */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between pb-4 border-b">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          {selectedContribution.author}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(selectedContribution.date).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(selectedContribution.status)}
                      {getPriorityBadge(selectedContribution.priority)}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Type:</span>
                      {getTypeBadge(selectedContribution.type)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Thème:</span>
                      <Badge variant="outline" className="bg-gray-50">
                        {selectedContribution.theme}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Processus:</span>
                      <Badge variant="outline" className="bg-gray-50">
                        {selectedContribution.process}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-900 leading-relaxed">
                      {selectedContribution.content}
                    </p>
                  </div>

                  {/* Moderation Note (if rejected) */}
                  {selectedContribution.status === 'rejected' && selectedContribution.moderationNote && (
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-900 mb-1">Note de modération</p>
                          <p className="text-sm text-red-700">{selectedContribution.moderationNote}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Moderation Actions */}
                {selectedContribution.status === 'pending' && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Commentaire de modération
                      </label>
                      <Textarea
                        value={moderationComment}
                        onChange={(e) => setModerationComment(e.target.value)}
                        placeholder="Ajoutez un commentaire expliquant votre décision (optionnel pour approbation, requis pour rejet)..."
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleApprove}
                        className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approuver la contribution
                      </Button>
                      <Button
                        onClick={handleReject}
                        variant="destructive"
                        className="flex-1 gap-2"
                        disabled={!moderationComment.trim()}
                      >
                        <XCircle className="w-4 h-4" />
                        Rejeter la contribution
                      </Button>
                    </div>

                    {!moderationComment.trim() && (
                      <p className="text-xs text-amber-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Un commentaire est requis pour rejeter une contribution
                      </p>
                    )}
                  </div>
                )}

                {/* Already Moderated */}
                {selectedContribution.status !== 'pending' && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${
                      selectedContribution.status === 'approved'
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      {selectedContribution.status === 'approved' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          Contribution {selectedContribution.status === 'approved' ? 'approuvée' : 'rejetée'}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Cette contribution a déjà été traitée et ne nécessite plus d'action.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
