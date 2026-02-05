import React, { useState } from 'react';
import { FileCheck, Plus, Eye, Download, Share2, CheckCircle, Clock, AlertCircle, Edit2, Trash2, Send, BarChart as BarChartIcon, Copy, Mail, Link as LinkIcon, QrCode } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { NewResultDialog, EditResultDialog, PublishResultDialog, DeleteResultDialog } from '../components/dialogs/ResultDialogs';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { useLanguage } from '../../contexts/LanguageContext';
import { Input } from '../../components/ui/input';

interface Result {
  id: string;
  title: string;
  type: 'consultation' | 'vote' | 'petition' | 'assembly';
  status: 'draft' | 'published' | 'scheduled';
  date: string;
  scheduledDate?: string;
  participants: number;
  views: number;
  downloads: number;
}

export function ResultsPublication() {
  const { language } = useLanguage();
  const [results] = useState([
    {
      id: '1',
      title: 'Résultats - Concertation Mobilité Urbaine',
      type: 'consultation',
      status: 'published',
      date: '2025-01-05',
      participants: 487,
      views: 1240,
      downloads: 89
    },
    {
      id: '2',
      title: 'Résultats - Vote Budget Participatif 2025',
      type: 'vote',
      status: 'published',
      date: '2025-01-03',
      participants: 1523,
      views: 3450,
      downloads: 234
    },
    {
      id: '3',
      title: 'Résultats - Pétition Transport Public',
      type: 'petition',
      status: 'scheduled',
      date: '2025-01-02',
      scheduledDate: '2025-01-15',
      participants: 2847,
      views: 0,
      downloads: 0
    },
    {
      id: '4',
      title: 'Résultats - Assemblée Citoyenne Climat',
      type: 'assembly',
      status: 'draft',
      date: '2024-12-28',
      participants: 145,
      views: 0,
      downloads: 0
    },
    {
      id: '5',
      title: 'Résultats - Concertation Espaces Verts',
      type: 'consultation',
      status: 'published',
      date: '2024-12-20',
      participants: 623,
      views: 2180,
      downloads: 156
    }
  ]);

  // Dialog states
  const [newResultOpen, setNewResultOpen] = useState(false);
  const [editResultOpen, setEditResultOpen] = useState(false);
  const [publishResultOpen, setPublishResultOpen] = useState(false);
  const [deleteResultOpen, setDeleteResultOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'scheduled' | 'draft'>('all');
  const [viewResultOpen, setViewResultOpen] = useState(false);
  const [shareResultOpen, setShareResultOpen] = useState(false);

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      consultation: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      vote: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      petition: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      assembly: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
    };
    return colors[type] || colors.consultation;
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      consultation: 'Concertation',
      vote: 'Vote',
      petition: 'Pétition',
      assembly: 'Assemblée'
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      published: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      scheduled: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
    };
    return colors[status] || colors.draft;
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      draft: 'Brouillon',
      published: 'Publié',
      scheduled: 'Programmé'
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4" />;
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'draft':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEditResult = (result: any) => {
    setSelectedResult(result);
    setEditResultOpen(true);
  };

  const handlePublishResult = (result: any) => {
    setSelectedResult(result);
    setPublishResultOpen(true);
  };

  const handleDeleteResult = (result: any) => {
    setSelectedResult(result);
    setDeleteResultOpen(true);
  };

  const handleNewResultSubmit = (data: any) => {
    console.log('New result:', data);
    // TODO: Implement result creation
  };

  const handleEditSubmit = (data: any) => {
    console.log('Edit result:', data);
    // TODO: Implement result update
  };

  const handlePublishConfirm = (options: any) => {
    console.log('Publish result with options:', options);
    // TODO: Implement result publication
  };

  const handleDeleteConfirm = () => {
    console.log('Delete result:', selectedResult);
    // TODO: Implement result deletion
  };

  const handleViewResult = (result: any) => {
    setSelectedResult(result);
    setViewResultOpen(true);
  };

  const handleShareResult = async (result: any) => {
    setSelectedResult(result);
    setShareResultOpen(true);
  };

  const copyToClipboard = async (shareUrl: string) => {
    try {
      // Try native clipboard API first
      await navigator.clipboard.writeText(shareUrl);
      
      toast.success(
        language === 'fr' ? 'Lien copié dans le presse-papiers' :
        language === 'de' ? 'Link in Zwischenablage kopiert' :
        'Link copied to clipboard',
        {
          description: shareUrl
        }
      );
    } catch (err) {
      // Fallback method for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          toast.success(
            language === 'fr' ? 'Lien copié dans le presse-papiers' :
            language === 'de' ? 'Link in Zwischenablage kopiert' :
            'Link copied to clipboard',
            {
              description: shareUrl
            }
          );
        } else {
          throw new Error('Copy command failed');
        }
      } catch (fallbackErr) {
        toast.error(
          language === 'fr' ? 'Impossible de copier le lien' :
          language === 'de' ? 'Link konnte nicht kopiert werden' :
          'Unable to copy link',
          {
            description: language === 'fr' ? `Copiez manuellement : ${shareUrl}` :
                        language === 'de' ? `Manuell kopieren: ${shareUrl}` :
                        `Copy manually: ${shareUrl}`
          }
        );
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  const handleShareViaEmail = (result: any) => {
    const shareUrl = `${window.location.origin}/results/${result.id}`;
    const subject = encodeURIComponent(
      language === 'fr' ? `Résultats - ${result.title}` :
      language === 'de' ? `Ergebnisse - ${result.title}` :
      `Results - ${result.title}`
    );
    const body = encodeURIComponent(
      language === 'fr' ? `Bonjour,\n\nJe souhaite partager avec vous les résultats suivants :\n\n${result.title}\n\nVous pouvez consulter les détails ici : ${shareUrl}\n\nCordialement` :
      language === 'de' ? `Hallo,\n\nIch möchte die folgenden Ergebnisse mit Ihnen teilen:\n\n${result.title}\n\nSie können die Details hier einsehen: ${shareUrl}\n\nMit freundlichen Grüßen` :
      `Hello,\n\nI would like to share the following results with you:\n\n${result.title}\n\nYou can view the details here: ${shareUrl}\n\nBest regards`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    
    toast.success(
      language === 'fr' ? 'Client email ouvert' :
      language === 'de' ? 'E-Mail-Client geöffnet' :
      'Email client opened'
    );
  };

  const handleDownloadPDF = (result: any) => {
    try {
      // Generate detailed PDF-like report
      const currentDate = new Date().toLocaleString('fr-FR');
      
      // Mock data for detailed results
      const mockResultsData = {
        consultation: {
          totalContributions: Math.floor(result.participants * 1.8),
          approvalRate: '76%',
          topThemes: ['Mobilité douce', 'Transports publics', 'Stationnement']
        },
        vote: {
          turnout: `${Math.floor((result.participants / 2000) * 100)}%`,
          winningOption: 'Projet A - Parc urbain',
          results: [
            { option: 'Projet A - Parc urbain', votes: 542, percentage: '35.6%' },
            { option: 'Projet B - Piste cyclable', votes: 487, percentage: '32.0%' },
            { option: 'Projet C - Centre culturel', votes: 494, percentage: '32.4%' }
          ]
        },
        petition: {
          signaturesTarget: 3000,
          signaturesReached: result.participants,
          successRate: `${Math.floor((result.participants / 3000) * 100)}%`,
          topLocations: ['Centre-ville', 'Zone Nord', 'Zone Sud']
        },
        assembly: {
          meetingsHeld: 5,
          proposalsSubmitted: 23,
          proposalsApproved: 18,
          nextSteps: 'Mise en œuvre des recommandations'
        }
      };

      const typeData = mockResultsData[result.type as keyof typeof mockResultsData];

      const pdfContent = `
╔════════════════════════════════════════════════════════════════════════════════╗
║                         RAPPORT DE RÉSULTATS - CIVIX                           ║
╚════════════════════════════════════════════════════════════════════════════════╝

${result.title}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 INFORMATIONS GÉNÉRALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type de processus    : ${getTypeLabel(result.type)}
Statut               : ${getStatusLabel(result.status)}
Date du processus    : ${formatDate(result.date)}
${result.scheduledDate ? `Date de publication  : ${formatDate(result.scheduledDate)}\n` : ''}
Date du rapport      : ${currentDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 STATISTIQUES DE PARTICIPATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nombre de participants   : ${result.participants.toLocaleString('fr-FR')}
Vues du résultat         : ${result.views.toLocaleString('fr-FR')}
Téléchargements PDF      : ${result.downloads.toLocaleString('fr-FR')}

${result.type === 'consultation' ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 RÉSULTATS DE LA CONCERTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total des contributions  : ${typeData.totalContributions}
Taux d'approbation       : ${typeData.approvalRate}

Thèmes principaux :
${typeData.topThemes.map((theme: string, i: number) => `  ${i + 1}. ${theme}`).join('\n')}
` : ''}

${result.type === 'vote' ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗳️  RÉSULTATS DU VOTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Taux de participation    : ${typeData.turnout}
Option gagnante          : ${typeData.winningOption}

Résultats détaillés :
${typeData.results.map((r: any) => `
  ${r.option}
  Votes: ${r.votes.toLocaleString('fr-FR')} (${r.percentage})`).join('\n')}
` : ''}

${result.type === 'petition' ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✍️  RÉSULTATS DE LA PÉTITION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Objectif de signatures   : ${typeData.signaturesTarget.toLocaleString('fr-FR')}
Signatures obtenues      : ${typeData.signaturesReached.toLocaleString('fr-FR')}
Taux de réussite         : ${typeData.successRate}

Localités principales :
${typeData.topLocations.map((loc: string, i: number) => `  ${i + 1}. ${loc}`).join('\n')}
` : ''}

${result.type === 'assembly' ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 RÉSULTATS DE L'ASSEMBLÉE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Réunions tenues          : ${typeData.meetingsHeld}
Propositions soumises    : ${typeData.proposalsSubmitted}
Propositions approuvées  : ${typeData.proposalsApproved}
Prochaines étapes        : ${typeData.nextSteps}
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 PROCHAINES ÉTAPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Analyse des résultats et recommandations
✓ Présentation aux instances décisionnaires
✓ Communication publique des décisions
✓ Mise en œuvre des actions retenues
✓ Suivi et évaluation des impacts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce rapport a été généré automatiquement par la plateforme CiviX
Pour plus d'informations : ${window.location.origin}/results/${result.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();

      // Create and download the file
      const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const filename = `resultat_${result.id}_${new Date().toISOString().split('T')[0]}.txt`;
      
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);

      toast.success(
        language === 'fr' ? 'Rapport PDF généré avec succès' :
        language === 'de' ? 'PDF-Bericht erfolgreich erstellt' :
        'PDF report generated successfully',
        {
          description: language === 'fr' ? 'Le téléchargement a commencé' :
                      language === 'de' ? 'Der Download hat begonnen' :
                      'Download has started'
        }
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de la génération du PDF' :
        language === 'de' ? 'Fehler beim Erstellen des PDF' :
        'Error generating PDF',
        {
          description: language === 'fr' ? 'Veuillez réessayer' :
                      language === 'de' ? 'Bitte versuchen Sie es erneut' :
                      'Please try again'
        }
      );
    }
  };

  const handleExportResults = (filterStatus: 'all' | 'published' | 'scheduled' | 'draft') => {
    try {
      // Filter results based on status
      const filteredResults = filterStatus === 'all' 
        ? results 
        : results.filter(r => r.status === filterStatus);

      if (filteredResults.length === 0) {
        toast.error(
          language === 'fr' ? 'Aucun résultat à exporter' :
          language === 'de' ? 'Keine Ergebnisse zum Exportieren' :
          'No results to export',
          {
            description: language === 'fr' ? 'La sélection ne contient aucun résultat' :
                        language === 'de' ? 'Die Auswahl enthält keine Ergebnisse' :
                        'The selection contains no results'
          }
        );
        return;
      }

      const currentDate = new Date().toISOString().split('T')[0];
      const statusLabels = {
        all: language === 'fr' ? 'tous' : language === 'de' ? 'alle' : 'all',
        published: language === 'fr' ? 'publies' : language === 'de' ? 'veroffentlicht' : 'published',
        scheduled: language === 'fr' ? 'programmes' : language === 'de' ? 'geplant' : 'scheduled',
        draft: language === 'fr' ? 'brouillons' : language === 'de' ? 'entwurfe' : 'drafts'
      };

      const filename = `resultats_${statusLabels[filterStatus]}_${currentDate}`;

      // Generate CSV
      const headers = [
        'ID',
        'Titre',
        'Type',
        'Statut',
        'Date du processus',
        'Date de publication programmée',
        'Participants',
        'Vues',
        'Téléchargements'
      ];

      const csvRows = filteredResults.map(result => [
        result.id,
        `"${result.title}"`,
        getTypeLabel(result.type),
        getStatusLabel(result.status),
        formatDate(result.date),
        result.scheduledDate ? formatDate(result.scheduledDate) : '-',
        result.participants.toString(),
        result.views.toString(),
        result.downloads.toString()
      ]);

      const csvContent = [
        ['EXPORT DES RÉSULTATS - CIVIX'],
        [`Filtre: ${filterStatus === 'all' ? 'Tous les résultats' : getStatusLabel(filterStatus)}`],
        [`Date d'export: ${new Date().toLocaleString('fr-FR')}`],
        [`Nombre de résultats: ${filteredResults.length}`],
        [],
        headers,
        ...csvRows
      ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n');

      // Create and download CSV file
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(
        language === 'fr' ? 'Export réussi' :
        language === 'de' ? 'Export erfolgreich' :
        'Export successful',
        {
          description: language === 'fr' ? `${filteredResults.length} résultat(s) exporté(s)` :
                      language === 'de' ? `${filteredResults.length} Ergebnis(se) exportiert` :
                      `${filteredResults.length} result(s) exported`
        }
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de l\'export' :
        language === 'de' ? 'Fehler beim Exportieren' :
        'Error during export',
        {
          description: language === 'fr' ? 'Veuillez réessayer' :
                      language === 'de' ? 'Bitte versuchen Sie es erneut' :
                      'Please try again'
        }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FileCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Publication des résultats
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gérer et publier les résultats des processus participatifs
            </p>
          </div>
        </div>
        <Button className="gap-2" onClick={() => setNewResultOpen(true)}>
          <Plus className="w-4 h-4" />
          Nouveau résultat
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total résultats
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {results.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Publiés
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {results.filter(r => r.status === 'published').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Programmés
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {results.filter(r => r.status === 'scheduled').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Brouillons
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {results.filter(r => r.status === 'draft').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button 
              variant={filterStatus === 'all' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setFilterStatus('all')}
            >
              {language === 'fr' ? 'Tous' : language === 'de' ? 'Alle' : 'All'}
              <Badge 
                variant="secondary" 
                className="ml-2 bg-white/20 text-white dark:bg-white/10"
              >
                {results.length}
              </Badge>
            </Button>
            <Button 
              variant={filterStatus === 'published' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setFilterStatus('published')}
            >
              {language === 'fr' ? 'Publiés' : language === 'de' ? 'Veröffentlicht' : 'Published'}
              <Badge 
                variant="secondary" 
                className={`ml-2 ${filterStatus === 'published' ? 'bg-white/20 text-white dark:bg-white/10' : ''}`}
              >
                {results.filter(r => r.status === 'published').length}
              </Badge>
            </Button>
            <Button 
              variant={filterStatus === 'scheduled' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setFilterStatus('scheduled')}
            >
              {language === 'fr' ? 'Programmés' : language === 'de' ? 'Geplant' : 'Scheduled'}
              <Badge 
                variant="secondary" 
                className={`ml-2 ${filterStatus === 'scheduled' ? 'bg-white/20 text-white dark:bg-white/10' : ''}`}
              >
                {results.filter(r => r.status === 'scheduled').length}
              </Badge>
            </Button>
            <Button 
              variant={filterStatus === 'draft' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setFilterStatus('draft')}
            >
              {language === 'fr' ? 'Brouillons' : language === 'de' ? 'Entwürfe' : 'Drafts'}
              <Badge 
                variant="secondary" 
                className={`ml-2 ${filterStatus === 'draft' ? 'bg-white/20 text-white dark:bg-white/10' : ''}`}
              >
                {results.filter(r => r.status === 'draft').length}
              </Badge>
            </Button>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => handleExportResults(filterStatus)}>
                <Download className="w-4 h-4" />
                {language === 'fr' ? 'Exporter' : language === 'de' ? 'Exportieren' : 'Export'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results List */}
      <div className="space-y-4">
        {results
          .filter(result => filterStatus === 'all' || result.status === filterStatus)
          .length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {language === 'fr' ? 'Aucun résultat trouvé' :
                     language === 'de' ? 'Keine Ergebnisse gefunden' :
                     'No results found'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? `Aucun résultat ne correspond au filtre "${filterStatus === 'all' ? 'Tous' : filterStatus === 'published' ? 'Publiés' : filterStatus === 'scheduled' ? 'Programmés' : 'Brouillons'}".` :
                     language === 'de' ? `Keine Ergebnisse entsprechen dem Filter "${filterStatus === 'all' ? 'Alle' : filterStatus === 'published' ? 'Veröffentlicht' : filterStatus === 'scheduled' ? 'Geplant' : 'Entwürfe'}".` :
                     `No results match the filter "${filterStatus === 'all' ? 'All' : filterStatus === 'published' ? 'Published' : filterStatus === 'scheduled' ? 'Scheduled' : 'Drafts'}".`}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            results
              .filter(result => filterStatus === 'all' || result.status === filterStatus)
              .map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                              {result.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge className={getTypeColor(result.type)}>
                                {getTypeLabel(result.type)}
                              </Badge>
                              <Badge className={getStatusColor(result.status)}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(result.status)}
                                  {getStatusLabel(result.status)}
                                </div>
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Date du processus</p>
                            <p className="font-medium text-gray-900 dark:text-white mt-1">
                              {formatDate(result.date)}
                            </p>
                          </div>
                          {result.scheduledDate && (
                            <div>
                              <p className="text-gray-600 dark:text-gray-400">Publication prévue</p>
                              <p className="font-medium text-gray-900 dark:text-white mt-1">
                                {formatDate(result.scheduledDate)}
                              </p>
                            </div>
                          )}
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Participants</p>
                            <p className="font-medium text-gray-900 dark:text-white mt-1">
                              {result.participants.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Vues</p>
                            <p className="font-medium text-gray-900 dark:text-white mt-1">
                              {result.views.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Téléchargements</p>
                            <p className="font-medium text-gray-900 dark:text-white mt-1">
                              {result.downloads.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {result.status === 'draft' && (
                          <Button size="sm" className="gap-2" onClick={() => handlePublishResult(result)}>
                            <Send className="w-4 h-4" />
                            Publier
                          </Button>
                        )}
                        {result.status === 'published' && (
                          <>
                            <Button variant="outline" size="sm" className="gap-2" onClick={() => handleViewResult(result)}>
                              <Eye className="w-4 h-4" />
                              Voir
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShareResult(result)}>
                              <Share2 className="w-4 h-4" />
                              Partager
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => handleDownloadPDF(result)}>
                          <Download className="w-4 h-4" />
                          PDF
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditResult(result)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteResult(result)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
      </div>

      {/* Publication Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Directives de publication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Transparence :</strong> Tous les résultats doivent être publiés dans un délai de 30 jours après la clôture du processus
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Accessibilité :</strong> Les résultats doivent être présentés de manière claire et compréhensible pour tous les citoyens
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Format :</strong> Fournir les résultats dans plusieurs formats (web, PDF, données ouvertes)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Suivi :</strong> Inclure les prochaines étapes et comment les résultats seront utilisés
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <NewResultDialog
        open={newResultOpen}
        onOpenChange={setNewResultOpen}
        onSubmit={handleNewResultSubmit}
      />
      
      <EditResultDialog
        open={editResultOpen}
        onOpenChange={setEditResultOpen}
        result={selectedResult}
        onSubmit={handleEditSubmit}
      />
      
      <PublishResultDialog
        open={publishResultOpen}
        onOpenChange={setPublishResultOpen}
        result={selectedResult}
        onConfirm={handlePublishConfirm}
      />
      
      <DeleteResultDialog
        open={deleteResultOpen}
        onOpenChange={setDeleteResultOpen}
        result={selectedResult}
        onConfirm={handleDeleteConfirm}
      />

      {/* View Result Dialog */}
      <Dialog open={viewResultOpen} onOpenChange={setViewResultOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              {selectedResult?.title}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Aperçu des résultats publiés' :
               language === 'de' ? 'Vorschau der veröffentlichten Ergebnisse' :
               'Preview of published results'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedResult && (
            <div className="space-y-6">
              {/* General Information */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {language === 'fr' ? 'Informations générales' :
                   language === 'de' ? 'Allgemeine Informationen' :
                   'General Information'}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'fr' ? 'Type de processus' :
                       language === 'de' ? 'Prozesstyp' :
                       'Process type'}
                    </p>
                    <Badge className={`${getTypeColor(selectedResult.type)} mt-1`}>
                      {getTypeLabel(selectedResult.type)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
                    </p>
                    <Badge className={`${getStatusColor(selectedResult.status)} mt-1`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(selectedResult.status)}
                        {getStatusLabel(selectedResult.status)}
                      </div>
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'fr' ? 'Date du processus' :
                       language === 'de' ? 'Prozessdatum' :
                       'Process date'}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white mt-1">
                      {formatDate(selectedResult.date)}
                    </p>
                  </div>
                  {selectedResult.scheduledDate && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'fr' ? 'Date de publication programmée' :
                         language === 'de' ? 'Geplantes Veröffentlichungsdatum' :
                         'Scheduled publication date'}
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {formatDate(selectedResult.scheduledDate)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <BarChartIcon className="w-4 h-4" />
                  {language === 'fr' ? 'Statistiques de participation' :
                   language === 'de' ? 'Teilnahmestatistiken' :
                   'Participation statistics'}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'fr' ? 'Participants' :
                         language === 'de' ? 'Teilnehmer' :
                         'Participants'}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {selectedResult.participants.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'fr' ? 'Vues' : language === 'de' ? 'Aufrufe' : 'Views'}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {selectedResult.views.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'fr' ? 'Téléchargements' :
                         language === 'de' ? 'Downloads' :
                         'Downloads'}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {selectedResult.downloads.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Mock Results Preview */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {language === 'fr' ? 'Aperçu des résultats' :
                   language === 'de' ? 'Ergebnisvorschau' :
                   'Results preview'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'fr' ? 'Les résultats détaillés seront affichés ici une fois publiés sur le frontoffice.' :
                   language === 'de' ? 'Die detaillierten Ergebnisse werden hier angezeigt, sobald sie im Frontend veröffentlicht sind.' :
                   'Detailed results will be displayed here once published on the front office.'}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewResultOpen(false)}>
              {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
            </Button>
            {selectedResult?.status === 'published' && (
              <Button onClick={() => {
                window.open(`/results/${selectedResult.id}`, '_blank');
                setViewResultOpen(false);
              }}>
                <Eye className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Voir sur le frontoffice' :
                 language === 'de' ? 'Im Frontend ansehen' :
                 'View on front office'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Result Dialog */}
      <Dialog open={shareResultOpen} onOpenChange={setShareResultOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-600" />
              {selectedResult?.title}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Partager les résultats' :
               language === 'de' ? 'Ergebnisse teilen' :
               'Share results'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedResult && (
            <div className="space-y-6">
              {/* General Information */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {language === 'fr' ? 'Informations générales' :
                   language === 'de' ? 'Allgemeine Informationen' :
                   'General Information'}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'fr' ? 'Type de processus' :
                       language === 'de' ? 'Prozesstyp' :
                       'Process type'}
                    </p>
                    <Badge className={`${getTypeColor(selectedResult.type)} mt-1`}>
                      {getTypeLabel(selectedResult.type)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
                    </p>
                    <Badge className={`${getStatusColor(selectedResult.status)} mt-1`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(selectedResult.status)}
                        {getStatusLabel(selectedResult.status)}
                      </div>
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'fr' ? 'Date du processus' :
                       language === 'de' ? 'Prozessdatum' :
                       'Process date'}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white mt-1">
                      {formatDate(selectedResult.date)}
                    </p>
                  </div>
                  {selectedResult.scheduledDate && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'fr' ? 'Date de publication programmée' :
                         language === 'de' ? 'Geplantes Veröffentlichungsdatum' :
                         'Scheduled publication date'}
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {formatDate(selectedResult.scheduledDate)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Share Options */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  {language === 'fr' ? 'Options de partage' :
                   language === 'de' ? 'Teilen-Optionen' :
                   'Share options'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'fr' ? 'Copier le lien' :
                         language === 'de' ? 'Link kopieren' :
                         'Copy link'}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="gap-2" onClick={() => copyToClipboard(`${window.location.origin}/results/${selectedResult.id}`)}>
                          <Copy className="w-4 h-4" />
                          {language === 'fr' ? 'Copier' :
                           language === 'de' ? 'Kopieren' :
                           'Copy'}
                        </Button>
                        <p className="text-gray-900 dark:text-white">
                          {`${window.location.origin}/results/${selectedResult.id}`}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'fr' ? 'Partager par email' :
                         language === 'de' ? 'Per E-Mail teilen' :
                         'Share via email'}
                      </p>
                      <Button size="sm" className="gap-2" onClick={() => handleShareViaEmail(selectedResult)}>
                        <Mail className="w-4 h-4" />
                        {language === 'fr' ? 'Email' :
                         language === 'de' ? 'E-Mail' :
                         'Email'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareResultOpen(false)}>
              {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}