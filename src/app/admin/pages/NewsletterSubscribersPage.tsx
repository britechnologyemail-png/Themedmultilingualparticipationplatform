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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../components/ui/dialog';
import {
  Mail,
  Search,
  UserPlus,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  Filter,
  BarChart3,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Pause,
  Eye
} from 'lucide-react';
import { mockNewsletterSubscriptions, getNewsletterTopicLabel } from '../../data/mockNewsletterData';
import type { NewsletterSubscriptionDTO, NewsletterTopicType, NewsletterFrequency, NewsletterSubscriptionStatus } from '../../types';
import { AddSubscriberDialog, EditSubscriberDialog } from '../components/dialogs/NewsletterSubscriberDialogs';
import { toast } from 'sonner';

export function NewsletterSubscribersPage() {
  const { language, tLocal } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [selectedSubscriber, setSelectedSubscriber] = useState<NewsletterSubscriptionDTO | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Filter subscriptions
  const filteredSubscriptions = mockNewsletterSubscriptions.filter(sub => {
    const matchesSearch = 
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.firstName?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (sub.lastName?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    const matchesFrequency = frequencyFilter === 'all' || sub.frequency === frequencyFilter;
    const matchesLanguage = languageFilter === 'all' || sub.language === languageFilter;

    return matchesSearch && matchesStatus && matchesFrequency && matchesLanguage;
  });

  // Calculate statistics
  const stats = {
    total: mockNewsletterSubscriptions.length,
    active: mockNewsletterSubscriptions.filter(s => s.status === 'active').length,
    paused: mockNewsletterSubscriptions.filter(s => s.status === 'paused').length,
    unsubscribed: mockNewsletterSubscriptions.filter(s => s.status === 'unsubscribed').length,
    avgOpenRate: (mockNewsletterSubscriptions.reduce((sum, s) => sum + s.openRate, 0) / mockNewsletterSubscriptions.length).toFixed(1),
    avgClickRate: (mockNewsletterSubscriptions.reduce((sum, s) => sum + s.clickRate, 0) / mockNewsletterSubscriptions.length).toFixed(1),
  };

  const getStatusBadge = (status: NewsletterSubscriptionStatus) => {
    const variants = {
      active: { variant: 'default' as const, icon: CheckCircle, label: { fr: 'Actif', de: 'Aktiv', en: 'Active' } },
      paused: { variant: 'secondary' as const, icon: Pause, label: { fr: 'En pause', de: 'Pausiert', en: 'Paused' } },
      unsubscribed: { variant: 'destructive' as const, icon: XCircle, label: { fr: 'Désabonné', de: 'Abgemeldet', en: 'Unsubscribed' } },
    };
    const config = variants[status];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label[language]}
      </Badge>
    );
  };

  const getFrequencyLabel = (frequency: NewsletterFrequency) => {
    const labels = {
      daily: { fr: 'Quotidienne', de: 'Täglich', en: 'Daily' },
      weekly: { fr: 'Hebdomadaire', de: 'Wöchentlich', en: 'Weekly' },
      monthly: { fr: 'Mensuelle', de: 'Monatlich', en: 'Monthly' },
    };
    return labels[frequency][language];
  };

  const handleView = (subscriber: NewsletterSubscriptionDTO) => {
    setSelectedSubscriber(subscriber);
    setViewDialogOpen(true);
  };

  const handleDelete = (subscriber: NewsletterSubscriptionDTO) => {
    setSelectedSubscriber(subscriber);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In real app: call API to delete
    console.log('Deleting subscriber:', selectedSubscriber?.id);
    setDeleteDialogOpen(false);
    setSelectedSubscriber(null);
  };

  const exportSubscribers = () => {
    // Generate CSV content
    const headers = [
      'ID',
      'Email',
      'First Name',
      'Last Name',
      'Status',
      'Frequency',
      'Language',
      'Topics',
      'Subscribed At',
      'Emails Sent',
      'Open Rate',
      'Click Rate'
    ];

    const csvRows = [
      headers.join(','),
      ...filteredSubscriptions.map(sub => [
        sub.id,
        sub.email,
        sub.firstName || '',
        sub.lastName || '',
        sub.status,
        sub.frequency,
        sub.language,
        sub.topics.join(';'),
        new Date(sub.subscribedAt).toLocaleDateString(),
        sub.emailsSent,
        sub.openRate.toFixed(1),
        sub.clickRate.toFixed(1)
      ].map(field => `"${field}"`).join(','))
    ];

    const csvContent = csvRows.join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      language === 'fr'
        ? `${filteredSubscriptions.length} abonné(s) exporté(s)`
        : language === 'de'
        ? `${filteredSubscriptions.length} Abonnent(en) exportiert`
        : `${filteredSubscriptions.length} subscriber(s) exported`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {language === 'fr' ? 'Abonnés Newsletter' : language === 'de' ? 'Newsletter-Abonnenten' : 'Newsletter Subscribers'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'fr' ? 'Gérez les abonnements à la newsletter' : language === 'de' ? 'Verwalten Sie Newsletter-Abonnements' : 'Manage newsletter subscriptions'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={exportSubscribers}>
            <Download className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Exporter' : language === 'de' ? 'Exportieren' : 'Export'}
          </Button>
          <Button onClick={() => setAddDialogOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Ajouter' : language === 'de' ? 'Hinzufügen' : 'Add'}
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
                  {language === 'fr' ? 'Total abonnés' : language === 'de' ? 'Gesamt Abonnenten' : 'Total Subscribers'}
                </p>
                <p className="text-2xl font-semibold mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Actifs' : language === 'de' ? 'Aktiv' : 'Active'}
                </p>
                <p className="text-2xl font-semibold mt-1">{stats.active}</p>
                <p className="text-xs text-green-600 mt-1">
                  {((stats.active / stats.total) * 100).toFixed(0)}%
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
                  {language === 'fr' ? 'Taux d\'ouverture moy.' : language === 'de' ? 'Durchschn. Öffnungsrate' : 'Avg. Open Rate'}
                </p>
                <p className="text-2xl font-semibold mt-1">{stats.avgOpenRate}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Taux de clic moy.' : language === 'de' ? 'Durchschn. Klickrate' : 'Avg. Click Rate'}
                </p>
                <p className="text-2xl font-semibold mt-1">{stats.avgClickRate}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {language === 'fr' ? 'Filtres' : language === 'de' ? 'Filter' : 'Filters'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={language === 'fr' ? 'Rechercher...' : language === 'de' ? 'Suchen...' : 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'fr' ? 'Tous les statuts' : language === 'de' ? 'Alle Status' : 'All statuses'}</SelectItem>
                <SelectItem value="active">{language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active'}</SelectItem>
                <SelectItem value="paused">{language === 'fr' ? 'En pause' : language === 'de' ? 'Pausiert' : 'Paused'}</SelectItem>
                <SelectItem value="unsubscribed">{language === 'fr' ? 'Désabonné' : language === 'de' ? 'Abgemeldet' : 'Unsubscribed'}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'fr' ? 'Fréquence' : language === 'de' ? 'Häufigkeit' : 'Frequency'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'fr' ? 'Toutes' : language === 'de' ? 'Alle' : 'All'}</SelectItem>
                <SelectItem value="daily">{language === 'fr' ? 'Quotidienne' : language === 'de' ? 'Täglich' : 'Daily'}</SelectItem>
                <SelectItem value="weekly">{language === 'fr' ? 'Hebdomadaire' : language === 'de' ? 'Wöchentlich' : 'Weekly'}</SelectItem>
                <SelectItem value="monthly">{language === 'fr' ? 'Mensuelle' : language === 'de' ? 'Monatlich' : 'Monthly'}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'fr' ? 'Langue' : language === 'de' ? 'Sprache' : 'Language'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'fr' ? 'Toutes' : language === 'de' ? 'Alle' : 'All'}</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Subscribers Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {language === 'fr' ? 'Liste des abonnés' : language === 'de' ? 'Abonnentenliste' : 'Subscribers List'}
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({filteredSubscriptions.length} {language === 'fr' ? 'résultats' : language === 'de' ? 'Ergebnisse' : 'results'})
              </span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'fr' ? 'Abonné' : language === 'de' ? 'Abonnent' : 'Subscriber'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Fréquence' : language === 'de' ? 'Häufigkeit' : 'Frequency'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Langue' : language === 'de' ? 'Sprache' : 'Language'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Ouverture' : language === 'de' ? 'Öffnung' : 'Open Rate'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Clics' : language === 'de' ? 'Klicks' : 'Click Rate'}</TableHead>
                  <TableHead className="text-right">{language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{sub.firstName} {sub.lastName}</div>
                        <div className="text-sm text-gray-500">{sub.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(sub.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{getFrequencyLabel(sub.frequency)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{sub.language.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${sub.openRate}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{sub.openRate.toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${sub.clickRate}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{sub.clickRate.toFixed(0)}%</span>
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
                            {language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleView(sub)}>
                            <Eye className="w-4 h-4 mr-2" />
                            {language === 'fr' ? 'Voir détails' : language === 'de' ? 'Details ansehen' : 'View details'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedSubscriber(sub);
                            setEditDialogOpen(true);
                          }}>
                            <Edit className="w-4 h-4 mr-2" />
                            {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(sub)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {language === 'fr' ? 'Supprimer' : language === 'de' ? 'Löschen' : 'Delete'}
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

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Détails de l\'abonné' : language === 'de' ? 'Abonnentendetails' : 'Subscriber Details'}
            </DialogTitle>
            <DialogDescription>
              {selectedSubscriber?.email}
            </DialogDescription>
          </DialogHeader>
          {selectedSubscriber && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">{language === 'fr' ? 'Nom' : language === 'de' ? 'Name' : 'Name'}</p>
                  <p className="font-medium">{selectedSubscriber.firstName} {selectedSubscriber.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</p>
                  <div className="mt-1">{getStatusBadge(selectedSubscriber.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'fr' ? 'Fréquence' : language === 'de' ? 'Häufigkeit' : 'Frequency'}</p>
                  <p className="font-medium">{getFrequencyLabel(selectedSubscriber.frequency)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'fr' ? 'Langue' : language === 'de' ? 'Sprache' : 'Language'}</p>
                  <p className="font-medium">{selectedSubscriber.language.toUpperCase()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">{language === 'fr' ? 'Sujets d\'intérêt' : language === 'de' ? 'Interessengebiete' : 'Topics of Interest'}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSubscriber.topics.map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {tLocal(getNewsletterTopicLabel(topic))}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">{language === 'fr' ? 'Emails envoyés' : language === 'de' ? 'Gesendete E-Mails' : 'Emails Sent'}</p>
                  <p className="text-xl font-semibold">{selectedSubscriber.emailsSent}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'fr' ? 'Taux d\'ouverture' : language === 'de' ? 'Öffnungsrate' : 'Open Rate'}</p>
                  <p className="text-xl font-semibold text-blue-600">{selectedSubscriber.openRate.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'fr' ? 'Taux de clic' : language === 'de' ? 'Klickrate' : 'Click Rate'}</p>
                  <p className="text-xl font-semibold text-green-600">{selectedSubscriber.clickRate.toFixed(1)}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">{language === 'fr' ? 'Inscrit le' : language === 'de' ? 'Registriert am' : 'Subscribed on'}</p>
                  <p className="font-medium">{new Date(selectedSubscriber.subscribedAt).toLocaleDateString()}</p>
                </div>
                {selectedSubscriber.lastEmailSentAt && (
                  <div>
                    <p className="text-gray-600">{language === 'fr' ? 'Dernier email' : language === 'de' ? 'Letzte E-Mail' : 'Last Email'}</p>
                    <p className="font-medium">{new Date(selectedSubscriber.lastEmailSentAt).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Confirmer la suppression' : language === 'de' ? 'Löschen bestätigen' : 'Confirm Deletion'}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' 
                ? 'Êtes-vous sûr de vouloir supprimer cet abonné ? Cette action est irréversible.'
                : language === 'de'
                ? 'Sind Sie sicher, dass Sie diesen Abonnenten löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.'
                : 'Are you sure you want to delete this subscriber? This action cannot be undone.'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              <strong>{language === 'fr' ? 'Email :' : language === 'de' ? 'E-Mail:' : 'Email:'}</strong> {selectedSubscriber?.email}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              {language === 'fr' ? 'Supprimer' : language === 'de' ? 'Löschen' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Subscriber Dialog */}
      <AddSubscriberDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />

      {/* Edit Subscriber Dialog */}
      <EditSubscriberDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} subscriber={selectedSubscriber} />
    </div>
  );
}