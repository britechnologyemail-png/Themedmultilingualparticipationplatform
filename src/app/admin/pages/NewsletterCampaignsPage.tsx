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
  DialogFooter,
} from '../../components/ui/dialog';
import {
  Mail,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Send,
  Eye,
  Copy,
  Calendar,
  FileText,
  BarChart3,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { mockNewsletterCampaigns } from '../../data/mockNewsletterData';
import type { NewsletterCampaignDTO, NewsletterCampaignStatus } from '../../types';
import { CreateCampaignDialog } from '../components/dialogs/NewsletterCampaignDialogs';
import { useNavigate } from 'react-router';

export function NewsletterCampaignsPage() {
  const { language, tLocal } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<NewsletterCampaignDTO | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Filter campaigns
  const filteredCampaigns = mockNewsletterCampaigns.filter(campaign => {
    const matchesSearch = 
      tLocal(campaign.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
      tLocal(campaign.subject).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: mockNewsletterCampaigns.length,
    draft: mockNewsletterCampaigns.filter(c => c.status === 'draft').length,
    scheduled: mockNewsletterCampaigns.filter(c => c.status === 'scheduled').length,
    sent: mockNewsletterCampaigns.filter(c => c.status === 'sent').length,
    totalRecipients: mockNewsletterCampaigns.reduce((sum, c) => sum + c.stats.totalRecipients, 0),
    avgOpenRate: (mockNewsletterCampaigns
      .filter(c => c.status === 'sent')
      .reduce((sum, c) => sum + c.stats.openRate, 0) / mockNewsletterCampaigns.filter(c => c.status === 'sent').length || 0
    ).toFixed(1),
  };

  const getStatusBadge = (status: NewsletterCampaignStatus) => {
    const variants = {
      draft: { variant: 'secondary' as const, icon: FileText, label: { fr: 'Brouillon', de: 'Entwurf', en: 'Draft' } },
      scheduled: { variant: 'default' as const, icon: Clock, label: { fr: 'Programmée', de: 'Geplant', en: 'Scheduled' } },
      sending: { variant: 'default' as const, icon: Send, label: { fr: 'Envoi en cours', de: 'Wird gesendet', en: 'Sending' } },
      sent: { variant: 'default' as const, icon: CheckCircle, label: { fr: 'Envoyée', de: 'Gesendet', en: 'Sent' }, class: 'bg-green-100 text-green-700' },
      failed: { variant: 'destructive' as const, icon: XCircle, label: { fr: 'Échec', de: 'Fehlgeschlagen', en: 'Failed' } },
    };
    const config = variants[status];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className={config.class}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label[language]}
      </Badge>
    );
  };

  const handleView = (campaign: NewsletterCampaignDTO) => {
    setSelectedCampaign(campaign);
    setViewDialogOpen(true);
  };

  const handleDelete = (campaign: NewsletterCampaignDTO) => {
    setSelectedCampaign(campaign);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In real app: call API to delete
    console.log('Deleting campaign:', selectedCampaign?.id);
    setDeleteDialogOpen(false);
    setSelectedCampaign(null);
  };

  const handleDuplicate = (campaign: NewsletterCampaignDTO) => {
    // In real app: duplicate campaign
    console.log('Duplicating campaign:', campaign.id);
  };

  const handleSendTest = (campaign: NewsletterCampaignDTO) => {
    // In real app: send test email
    console.log('Sending test for campaign:', campaign.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {language === 'fr' ? 'Campagnes Newsletter' : language === 'de' ? 'Newsletter-Kampagnen' : 'Newsletter Campaigns'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'fr' ? 'Créez et gérez vos campagnes d\'emailing' : language === 'de' ? 'Erstellen und verwalten Sie Ihre E-Mail-Kampagnen' : 'Create and manage your email campaigns'}
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {language === 'fr' ? 'Nouvelle campagne' : language === 'de' ? 'Neue Kampagne' : 'New Campaign'}
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Total campagnes' : language === 'de' ? 'Gesamt Kampagnen' : 'Total Campaigns'}
                </p>
                <p className="text-2xl font-semibold mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Envoyées' : language === 'de' ? 'Gesendet' : 'Sent'}
                </p>
                <p className="text-2xl font-semibold mt-1">{stats.sent}</p>
                <p className="text-xs text-green-600 mt-1">
                  {((stats.sent / stats.total) * 100).toFixed(0)}%
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
                  {language === 'fr' ? 'Destinataires' : language === 'de' ? 'Empfänger' : 'Recipients'}
                </p>
                <p className="text-2xl font-semibold mt-1">{stats.totalRecipients}</p>
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
                  {language === 'fr' ? 'Taux d\'ouverture moy.' : language === 'de' ? 'Durchschn. Öffnungsrate' : 'Avg. Open Rate'}
                </p>
                <p className="text-2xl font-semibold mt-1">{stats.avgOpenRate}%</p>
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
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={language === 'fr' ? 'Rechercher une campagne...' : language === 'de' ? 'Kampagne suchen...' : 'Search campaign...'}
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
                <SelectItem value="draft">{language === 'fr' ? 'Brouillon' : language === 'de' ? 'Entwurf' : 'Draft'}</SelectItem>
                <SelectItem value="scheduled">{language === 'fr' ? 'Programmée' : language === 'de' ? 'Geplant' : 'Scheduled'}</SelectItem>
                <SelectItem value="sent">{language === 'fr' ? 'Envoyée' : language === 'de' ? 'Gesendet' : 'Sent'}</SelectItem>
                <SelectItem value="failed">{language === 'fr' ? 'Échec' : language === 'de' ? 'Fehlgeschlagen' : 'Failed'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'Liste des campagnes' : language === 'de' ? 'Kampagnenliste' : 'Campaigns List'}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredCampaigns.length} {language === 'fr' ? 'résultats' : language === 'de' ? 'Ergebnisse' : 'results'})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'fr' ? 'Campagne' : language === 'de' ? 'Kampagne' : 'Campaign'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Date' : language === 'de' ? 'Datum' : 'Date'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Destinataires' : language === 'de' ? 'Empfänger' : 'Recipients'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Performances' : language === 'de' ? 'Leistung' : 'Performance'}</TableHead>
                  <TableHead className="text-right">{language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{tLocal(campaign.name)}</div>
                        <div className="text-sm text-gray-500">{tLocal(campaign.subject)}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {campaign.status === 'sent' && campaign.sentAt ? (
                          <>
                            <div className="font-medium">
                              {new Date(campaign.sentAt).toLocaleDateString()}
                            </div>
                            <div className="text-gray-500">
                              {new Date(campaign.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </>
                        ) : campaign.scheduledFor ? (
                          <>
                            <div className="font-medium text-blue-600">
                              {new Date(campaign.scheduledFor).toLocaleDateString()}
                            </div>
                            <div className="text-gray-500">
                              {new Date(campaign.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{campaign.stats.totalRecipients}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {campaign.status === 'sent' ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Eye className="w-3 h-3 text-blue-600" />
                            <span className="text-blue-600">{campaign.stats.openRate}%</span>
                            <span className="text-gray-400">|</span>
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">{campaign.stats.clickRate}%</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
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
                          <DropdownMenuItem onClick={() => handleView(campaign)}>
                            <Eye className="w-4 h-4 mr-2" />
                            {language === 'fr' ? 'Voir détails' : language === 'de' ? 'Details ansehen' : 'View details'}
                          </DropdownMenuItem>
                          {campaign.status === 'draft' && (
                            <>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendTest(campaign)}>
                                <Send className="w-4 h-4 mr-2" />
                                {language === 'fr' ? 'Envoyer un test' : language === 'de' ? 'Test senden' : 'Send test'}
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem onClick={() => handleDuplicate(campaign)}>
                            <Copy className="w-4 h-4 mr-2" />
                            {language === 'fr' ? 'Dupliquer' : language === 'de' ? 'Duplizieren' : 'Duplicate'}
                          </DropdownMenuItem>
                          {campaign.status === 'sent' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedCampaign(campaign);
                              setViewDialogOpen(true);
                            }}>
                              <BarChart3 className="w-4 h-4 mr-2" />
                              {language === 'fr' ? 'Statistiques' : language === 'de' ? 'Statistiken' : 'Statistics'}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(campaign)}
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
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Détails de la campagne' : language === 'de' ? 'Kampagnendetails' : 'Campaign Details'}
            </DialogTitle>
            <DialogDescription>
              {selectedCampaign && tLocal(selectedCampaign.name)}
            </DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6">
              {/* Campaign Info */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">{language === 'fr' ? 'Sujet' : language === 'de' ? 'Betreff' : 'Subject'}</p>
                  <p className="font-medium">{tLocal(selectedCampaign.subject)}</p>
                </div>
                {selectedCampaign.preheader && (
                  <div>
                    <p className="text-sm text-gray-600">{language === 'fr' ? 'Prévisualisation' : language === 'de' ? 'Vorschau' : 'Preview'}</p>
                    <p className="text-sm text-gray-700">{tLocal(selectedCampaign.preheader)}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</p>
                  <div className="mt-1">{getStatusBadge(selectedCampaign.status)}</div>
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <h4 className="font-semibold mb-2">{language === 'fr' ? 'Audience cible' : language === 'de' ? 'Zielgruppe' : 'Target Audience'}</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{language === 'fr' ? 'Destinataires' : language === 'de' ? 'Empfänger' : 'Recipients'}:</span>
                    <span className="font-medium">{selectedCampaign.stats.totalRecipients}</span>
                  </div>
                  {selectedCampaign.targetAudience.frequency && (
                    <div>
                      <span className="text-gray-600">{language === 'fr' ? 'Fréquences:' : language === 'de' ? 'Häufigkeiten:' : 'Frequencies:'}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedCampaign.targetAudience.frequency.map(freq => (
                          <Badge key={freq} variant="outline" className="text-xs">{freq}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedCampaign.targetAudience.languages && (
                    <div>
                      <span className="text-gray-600">{language === 'fr' ? 'Langues:' : language === 'de' ? 'Sprachen:' : 'Languages:'}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedCampaign.targetAudience.languages.map(lang => (
                          <Badge key={lang} variant="secondary" className="text-xs">{lang.toUpperCase()}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Statistics (for sent campaigns) */}
              {selectedCampaign.status === 'sent' && (
                <div>
                  <h4 className="font-semibold mb-2">{language === 'fr' ? 'Performances' : language === 'de' ? 'Leistung' : 'Performance'}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">{language === 'fr' ? 'Envoyés' : language === 'de' ? 'Gesendet' : 'Sent'}</p>
                      <p className="text-2xl font-semibold text-blue-600">{selectedCampaign.stats.totalSent}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">{language === 'fr' ? 'Ouvertures' : language === 'de' ? 'Öffnungen' : 'Opens'}</p>
                      <p className="text-2xl font-semibold text-green-600">{selectedCampaign.stats.openRate}%</p>
                      <p className="text-xs text-gray-600 mt-1">{selectedCampaign.stats.totalOpened} / {selectedCampaign.stats.totalSent}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">{language === 'fr' ? 'Clics' : language === 'de' ? 'Klicks' : 'Clicks'}</p>
                      <p className="text-2xl font-semibold text-purple-600">{selectedCampaign.stats.clickRate}%</p>
                      <p className="text-xs text-gray-600 mt-1">{selectedCampaign.stats.totalClicked} / {selectedCampaign.stats.totalSent}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">{language === 'fr' ? 'Désabonnés' : language === 'de' ? 'Abgemeldet' : 'Unsubscribed'}</p>
                      <p className="text-2xl font-semibold text-red-600">{selectedCampaign.stats.totalUnsubscribed}</p>
                      <p className="text-xs text-gray-600 mt-1">{selectedCampaign.stats.unsubscribeRate}%</p>
                    </div>
                  </div>

                  {selectedCampaign.stats.topLinks && selectedCampaign.stats.topLinks.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {language === 'fr' ? 'Liens les plus cliqués' : language === 'de' ? 'Meistgeklickte Links' : 'Top Clicked Links'}
                      </p>
                      <div className="space-y-2">
                        {selectedCampaign.stats.topLinks.map((link, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                            <span className="text-gray-700 truncate flex-1">{link.url}</span>
                            <Badge variant="secondary">{link.clicks} {language === 'fr' ? 'clics' : language === 'de' ? 'Klicks' : 'clicks'}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">{language === 'fr' ? 'Créée le' : language === 'de' ? 'Erstellt am' : 'Created on'}</p>
                  <p className="font-medium">{new Date(selectedCampaign.createdAt).toLocaleDateString()}</p>
                </div>
                {selectedCampaign.scheduledFor && (
                  <div>
                    <p className="text-gray-600">{language === 'fr' ? 'Programmée pour' : language === 'de' ? 'Geplant für' : 'Scheduled for'}</p>
                    <p className="font-medium">{new Date(selectedCampaign.scheduledFor).toLocaleDateString()} {new Date(selectedCampaign.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                )}
                {selectedCampaign.sentAt && (
                  <div>
                    <p className="text-gray-600">{language === 'fr' ? 'Envoyée le' : language === 'de' ? 'Gesendet am' : 'Sent on'}</p>
                    <p className="font-medium">{new Date(selectedCampaign.sentAt).toLocaleDateString()} {new Date(selectedCampaign.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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
                ? 'Êtes-vous sûr de vouloir supprimer cette campagne ? Cette action est irréversible.'
                : language === 'de'
                ? 'Sind Sie sicher, dass Sie diese Kampagne löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.'
                : 'Are you sure you want to delete this campaign? This action cannot be undone.'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              <strong>{language === 'fr' ? 'Campagne :' : language === 'de' ? 'Kampagne:' : 'Campaign:'}</strong> {selectedCampaign && tLocal(selectedCampaign.name)}
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

      {/* Create Campaign Dialog */}
      <CreateCampaignDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
}