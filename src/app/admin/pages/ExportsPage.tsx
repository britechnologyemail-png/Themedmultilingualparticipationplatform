import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileJson, Calendar, Filter, CheckCircle, Clock, AlertCircle, Plus, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
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

interface Export {
  id: string;
  name: string;
  type: 'pdf' | 'csv' | 'json' | 'excel';
  category: 'users' | 'consultations' | 'votes' | 'petitions' | 'analytics';
  status: 'ready' | 'generating' | 'failed';
  date: string;
  size: string;
  downloadCount: number;
}

export function ExportsPage() {
  const { language } = useLanguage();
  const [exports] = useState([
    {
      id: '1',
      name: 'Rapport mensuel - Décembre 2024',
      type: 'pdf',
      category: 'analytics',
      status: 'ready',
      date: '2025-01-05T10:30:00',
      size: '2.4 MB',
      downloadCount: 12
    },
    {
      id: '2',
      name: 'Export utilisateurs actifs',
      type: 'csv',
      category: 'users',
      status: 'ready',
      date: '2025-01-04T15:20:00',
      size: '856 KB',
      downloadCount: 8
    },
    {
      id: '3',
      name: 'Données concertations - Q4 2024',
      type: 'json',
      category: 'consultations',
      status: 'generating',
      date: '2025-01-06T09:15:00',
      size: '-',
      downloadCount: 0
    },
    {
      id: '4',
      name: 'Statistiques votes - Annuel 2024',
      type: 'excel',
      category: 'votes',
      status: 'ready',
      date: '2025-01-03T14:45:00',
      size: '3.2 MB',
      downloadCount: 24
    },
    {
      id: '5',
      name: 'Export pétitions - Erreur de génération',
      type: 'pdf',
      category: 'petitions',
      status: 'failed',
      date: '2025-01-02T11:00:00',
      size: '-',
      downloadCount: 0
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'csv':
      case 'excel':
        return <FileSpreadsheet className="w-5 h-5" />;
      case 'json':
        return <FileJson className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      pdf: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      csv: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      json: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      excel: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
    };
    return colors[type] || colors.pdf;
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      users: 'Utilisateurs',
      consultations: 'Concertations',
      votes: 'Votes',
      petitions: 'Pétitions',
      analytics: 'Statistiques'
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      users: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      consultations: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      votes: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      petitions: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      analytics: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400'
    };
    return colors[category] || colors.users;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      ready: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      generating: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || colors.ready;
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      ready: 'Prêt',
      generating: 'En cours',
      failed: 'Échec'
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-4 h-4" />;
      case 'generating':
        return <Clock className="w-4 h-4" />;
      case 'failed':
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('pdf');
  const [selectedCategory, setSelectedCategory] = useState('analytics');

  // Filter states
  const [filterType, setFilterType] = useState<'all' | 'pdf' | 'csv' | 'json' | 'excel'>('all');
  const [isPeriodDialogOpen, setIsPeriodDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hasActivePeriodFilter, setHasActivePeriodFilter] = useState(false);
  const [downloadingIds, setDownloadingIds] = useState<string[]>([]);
  const [retryingIds, setRetryingIds] = useState<string[]>([]);

  // Filter exports based on active filters
  const filteredExports = exports.filter(exp => {
    // Type filter
    const matchesType = filterType === 'all' || exp.type === filterType;

    // Period filter
    let matchesPeriod = true;
    if (hasActivePeriodFilter && startDate && endDate) {
      const exportDate = new Date(exp.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include the entire end date
      matchesPeriod = exportDate >= start && exportDate <= end;
    }

    return matchesType && matchesPeriod;
  });

  const handleTypeFilter = (type: 'all' | 'pdf' | 'csv' | 'json' | 'excel') => {
    setFilterType(type);
    const filterLabel = type === 'all' 
      ? (language === 'fr' ? 'Tous les exports' : language === 'de' ? 'Alle Exporte' : 'All exports')
      : `${language === 'fr' ? 'Exports' : language === 'de' ? 'Exporte' : 'Exports'} ${type.toUpperCase()}`;
    
    toast.info(
      language === 'fr' ? 'Filtre appliqué' :
      language === 'de' ? 'Filter angewendet' :
      'Filter applied',
      {
        description: filterLabel
      }
    );
  };

  const handlePeriodFilter = () => {
    if (!startDate || !endDate) {
      toast.error(
        language === 'fr' ? 'Dates invalides' :
        language === 'de' ? 'Ungültige Daten' :
        'Invalid dates',
        {
          description: language === 'fr' ? 'Veuillez sélectionner une période complète' :
                      language === 'de' ? 'Bitte wählen Sie einen vollständigen Zeitraum' :
                      'Please select a complete period'
        }
      );
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      toast.error(
        language === 'fr' ? 'Période invalide' :
        language === 'de' ? 'Ungültiger Zeitraum' :
        'Invalid period',
        {
          description: language === 'fr' ? 'La date de début doit être antérieure à la date de fin' :
                      language === 'de' ? 'Das Startdatum muss vor dem Enddatum liegen' :
                      'Start date must be before end date'
        }
      );
      return;
    }

    setHasActivePeriodFilter(true);
    setIsPeriodDialogOpen(false);

    const formattedStart = start.toLocaleDateString('fr-FR');
    const formattedEnd = end.toLocaleDateString('fr-FR');

    toast.success(
      language === 'fr' ? 'Filtre de période appliqué' :
      language === 'de' ? 'Zeitraumfilter angewendet' :
      'Period filter applied',
      {
        description: `${formattedStart} - ${formattedEnd}`
      }
    );
  };

  const handleClearPeriodFilter = () => {
    setHasActivePeriodFilter(false);
    setStartDate('');
    setEndDate('');
    setIsPeriodDialogOpen(false);

    toast.info(
      language === 'fr' ? 'Filtre de période supprimé' :
      language === 'de' ? 'Zeitraumfilter entfernt' :
      'Period filter removed'
    );
  };

  const getFilterCount = (type: 'all' | 'pdf' | 'csv' | 'json' | 'excel') => {
    if (type === 'all') return exports.length;
    return exports.filter(exp => exp.type === type).length;
  };

  const handleCreateExport = () => {
    toast.success(
      language === 'fr' ? 'Création d\'un nouvel export...' :
      language === 'de' ? 'Neuen Export erstellen...' :
      'Creating a new export...',
      {
        description: language === 'fr' ? 'Sélectionnez le type de données à exporter' :
                    language === 'de' ? 'Wählen Sie den Datentyp zum Exportieren' :
                    'Select the type of data to export'
      }
    );
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = () => {
    toast.success(
      language === 'fr' ? 'Export créé avec succès !' :
      language === 'de' ? 'Export erfolgreich erstellt!' :
      'Export created successfully!',
      {
        description: `${language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'}: ${selectedType.toUpperCase()}, ${language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category'}: ${getCategoryLabel(selectedCategory)}`
      }
    );
    setIsDialogOpen(false);
  };

  // Monthly Report Export
  const handleMonthlyReport = () => {
    try {
      const currentDate = new Date();
      const monthYear = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      
      const reportContent = `
╔════════════════════════════════════════════════════════════════════════════════╗
║                      RAPPORT MENSUEL - CIVIX                                  ║
╚════════════════════════════════════════════════════════════════════════════════╝

Période: ${monthYear}
Date du rapport: ${currentDate.toLocaleDateString('fr-FR')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 VUE D'ENSEMBLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Utilisateurs actifs          : 2,847
Nouvelles inscriptions       : 342
Taux d'engagement            : 68%
Processus en cours           : 12
Processus clôturés           : 8

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 CONCERTATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total des concertations      : 5
Contributions reçues          : 1,234
Taux de participation         : 73%
Concertations actives         : 3
Concertations clôturées       : 2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗳️  VOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total des votes               : 3
Participants                  : 1,895
Taux de participation         : 65%
Votes en cours                : 1
Votes clôturés                : 2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✍️  PÉTITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total des pétitions           : 4
Signatures collectées         : 3,562
Objectifs atteints            : 2
Pétitions actives             : 2
Pétitions clôturées           : 2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 ASSEMBLÉES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total des assemblées          : 2
Membres actifs                : 145
Réunions tenues               : 8
Propositions soumises         : 34
Propositions approuvées       : 27

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 TENDANCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

↗ Croissance des utilisateurs : +12% par rapport au mois précédent
↗ Engagement moyen            : +8% par rapport au mois précédent
↗ Taux de conversion          : 72% (en hausse)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce rapport a été généré automatiquement par la plateforme CiviX
Pour plus d'informations : ${window.location.origin}/admin/analytics

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();

      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const filename = `rapport_mensuel_${currentDate.toISOString().split('T')[0]}.txt`;
      
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(
        language === 'fr' ? 'Rapport mensuel généré' :
        language === 'de' ? 'Monatsbericht erstellt' :
        'Monthly report generated',
        {
          description: language === 'fr' ? 'Le téléchargement a commencé' :
                      language === 'de' ? 'Der Download hat begonnen' :
                      'Download has started'
        }
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de la génération' :
        language === 'de' ? 'Fehler bei der Generierung' :
        'Error during generation'
      );
    }
  };

  // Users CSV Export
  const handleUsersExport = () => {
    try {
      const mockUsers = [
        { id: '1', name: 'Jean Dupont', email: 'jean.dupont@example.com', role: 'Citoyen', registeredDate: '2024-01-15', lastActive: '2025-02-03', participations: 12 },
        { id: '2', name: 'Marie Martin', email: 'marie.martin@example.com', role: 'Citoyen', registeredDate: '2024-02-20', lastActive: '2025-02-04', participations: 8 },
        { id: '3', name: 'Pierre Durand', email: 'pierre.durand@example.com', role: 'Modérateur', registeredDate: '2023-11-10', lastActive: '2025-02-04', participations: 45 },
        { id: '4', name: 'Sophie Lefebvre', email: 'sophie.lefebvre@example.com', role: 'Citoyen', registeredDate: '2024-03-05', lastActive: '2025-02-02', participations: 15 },
        { id: '5', name: 'Luc Moreau', email: 'luc.moreau@example.com', role: 'Citoyen', registeredDate: '2024-04-12', lastActive: '2025-02-01', participations: 6 }
      ];

      const headers = ['ID', 'Nom', 'Email', 'Rôle', 'Date d\'inscription', 'Dernière activité', 'Participations'];
      const csvRows = mockUsers.map(user => [
        user.id,
        `"${user.name}"`,
        user.email,
        user.role,
        user.registeredDate,
        user.lastActive,
        user.participations.toString()
      ]);

      const csvContent = [
        ['EXPORT DES UTILISATEURS - CIVIX'],
        [`Date d'export: ${new Date().toLocaleString('fr-FR')}`],
        [`Nombre d'utilisateurs: ${mockUsers.length}`],
        [],
        headers,
        ...csvRows
      ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n');

      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const filename = `utilisateurs_${new Date().toISOString().split('T')[0]}.csv`;
      
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(
        language === 'fr' ? 'Export des utilisateurs réussi' :
        language === 'de' ? 'Benutzerexport erfolgreich' :
        'Users export successful',
        {
          description: language === 'fr' ? `${mockUsers.length} utilisateurs exportés` :
                      language === 'de' ? `${mockUsers.length} Benutzer exportiert` :
                      `${mockUsers.length} users exported`
        }
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de l\'export' :
        language === 'de' ? 'Fehler beim Exportieren' :
        'Error during export'
      );
    }
  };

  // Open Data JSON Export
  const handleOpenDataExport = () => {
    try {
      const openData = {
        metadata: {
          platform: 'CiviX',
          version: '1.0',
          exportDate: new Date().toISOString(),
          dataType: 'open_data',
          license: 'CC-BY-4.0'
        },
        statistics: {
          totalUsers: 2847,
          activeProcesses: 12,
          closedProcesses: 8,
          totalParticipations: 6891
        },
        consultations: [
          {
            id: 'cons-1',
            title: 'Aménagement du centre-ville',
            status: 'active',
            startDate: '2025-01-15',
            endDate: '2025-02-28',
            participants: 487,
            contributions: 1234
          },
          {
            id: 'cons-2',
            title: 'Plan de mobilité urbaine',
            status: 'closed',
            startDate: '2024-11-01',
            endDate: '2024-12-31',
            participants: 623,
            contributions: 2180
          }
        ],
        votes: [
          {
            id: 'vote-1',
            title: 'Budget participatif 2025',
            status: 'active',
            startDate: '2025-01-20',
            endDate: '2025-02-20',
            participants: 1523,
            options: 3
          }
        ],
        petitions: [
          {
            id: 'pet-1',
            title: 'Amélioration des transports publics',
            status: 'active',
            startDate: '2025-01-10',
            signatures: 2847,
            targetSignatures: 3000,
            progress: 94.9
          }
        ]
      };

      const jsonContent = JSON.stringify(openData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const filename = `donnees_ouvertes_${new Date().toISOString().split('T')[0]}.json`;
      
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(
        language === 'fr' ? 'Export des données ouvertes réussi' :
        language === 'de' ? 'Export offener Daten erfolgreich' :
        'Open data export successful',
        {
          description: language === 'fr' ? 'Format JSON pour API' :
                      language === 'de' ? 'JSON-Format für API' :
                      'JSON format for API'
        }
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de l\'export' :
        language === 'de' ? 'Fehler beim Exportieren' :
        'Error during export'
      );
    }
  };

  // Excel Statistics Export
  const handleExcelStatistics = () => {
    try {
      const statisticsContent = `
STATISTIQUES DÉTAILLÉES - CIVIX
Export: ${new Date().toLocaleString('fr-FR')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TABLEAU DE BORD PRINCIPAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Indicateur,Valeur,Évolution,Période
Utilisateurs actifs,2847,+12%,30 jours
Taux d'engagement,68%,+8%,30 jours
Processus actifs,12,+3,30 jours
Processus clôturés,8,0,30 jours
Participations totales,6891,+15%,30 jours

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉPARTITION PAR TYPE DE PROCESSUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type,Nombre,Participants,Taux de participation
Concertations,5,1234,73%
Votes,3,1895,65%
Pétitions,4,3562,89%
Assemblées,2,145,68%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTIVITÉ PAR PÉRIODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Semaine,Nouvelles inscriptions,Participations,Taux d'activité
Semaine 1,87,456,72%
Semaine 2,94,523,75%
Semaine 3,82,489,70%
Semaine 4,79,512,73%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOP 5 DES PROCESSUS LES PLUS ACTIFS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rang,Processus,Type,Participants
1,Budget participatif 2025,Vote,1523
2,Amélioration transports publics,Pétition,2847
3,Aménagement centre-ville,Concertation,1234
4,Plan mobilité urbaine,Concertation,623
5,Espaces verts quartier Nord,Pétition,715

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Note: Ce fichier peut être ouvert dans Excel, LibreOffice Calc, Google Sheets
Format CSV compatible avec tous les logiciels tableur

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();

      const blob = new Blob(['\uFEFF' + statisticsContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const filename = `statistiques_${new Date().toISOString().split('T')[0]}.csv`;
      
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(
        language === 'fr' ? 'Export des statistiques réussi' :
        language === 'de' ? 'Statistikexport erfolgreich' :
        'Statistics export successful',
        {
          description: language === 'fr' ? 'Format Excel/CSV compatible' :
                      language === 'de' ? 'Excel/CSV-kompatibles Format' :
                      'Excel/CSV compatible format'
        }
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de l\'export' :
        language === 'de' ? 'Fehler beim Exportieren' :
        'Error during export'
      );
    }
  };

  // Download Export File
  const handleDownloadExport = async (exportItem: Export) => {
    setDownloadingIds(prev => [...prev, exportItem.id]);

    try {
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      let content = '';
      let mimeType = '';
      let extension = '';

      // Generate content based on type and category
      if (exportItem.type === 'pdf') {
        content = `
╔════════════════════════════════════════════════════════════════════════════════╗
║                         ${exportItem.name.toUpperCase()}                       ║
╚════════════════════════════════════════════════════════════════════════════════╝

Date d'export: ${new Date().toLocaleDateString('fr-FR')}
Catégorie: ${getCategoryLabel(exportItem.category)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SOMMAIRE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Vue d'ensemble
2. Données détaillées
3. Analyses et recommandations
4. Annexes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. VUE D'ENSEMBLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce rapport présente une analyse complète des données de la plateforme CiviX
pour la catégorie : ${getCategoryLabel(exportItem.category)}

Période analysée : ${formatDate(exportItem.date)}
Nombre de participants : 2,847
Taux d'engagement : 68%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. DONNÉES DÉTAILLÉES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Les données détaillées seraient incluses ici dans un rapport réel]

Processus actifs : 12
Processus clôturés : 8
Participations totales : 6,891

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce rapport a été généré automatiquement par la plateforme CiviX
Pour plus d'informations : ${window.location.origin}/admin

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `.trim();
        mimeType = 'text/plain;charset=utf-8;';
        extension = 'txt';
      } else if (exportItem.type === 'csv') {
        const csvData = [
          ['EXPORT CIVIX - ' + exportItem.name.toUpperCase()],
          ['Date d\'export: ' + new Date().toLocaleString('fr-FR')],
          ['Catégorie: ' + getCategoryLabel(exportItem.category)],
          [],
          ['ID', 'Nom', 'Date', 'Statut', 'Valeur'],
          ['1', 'Élément 1', '2025-01-15', 'Actif', '234'],
          ['2', 'Élément 2', '2025-01-20', 'Actif', '567'],
          ['3', 'Élément 3', '2025-01-25', 'Clôturé', '891'],
          ['4', 'Élément 4', '2025-02-01', 'Actif', '123'],
          ['5', 'Élément 5', '2025-02-03', 'Actif', '456']
        ];
        content = '\uFEFF' + csvData.map(row => row.join(',')).join('\n');
        mimeType = 'text/csv;charset=utf-8;';
        extension = 'csv';
      } else if (exportItem.type === 'json') {
        const jsonData = {
          metadata: {
            platform: 'CiviX',
            exportName: exportItem.name,
            exportDate: new Date().toISOString(),
            category: exportItem.category,
            dataType: exportItem.type,
            version: '1.0'
          },
          summary: {
            totalItems: 5,
            activeItems: 4,
            closedItems: 1,
            participants: 2847,
            engagementRate: 68
          },
          data: [
            { id: '1', name: 'Élément 1', date: '2025-01-15', status: 'active', value: 234 },
            { id: '2', name: 'Élément 2', date: '2025-01-20', status: 'active', value: 567 },
            { id: '3', name: 'Élément 3', date: '2025-01-25', status: 'closed', value: 891 },
            { id: '4', name: 'Élément 4', date: '2025-02-01', status: 'active', value: 123 },
            { id: '5', name: 'Élément 5', date: '2025-02-03', status: 'active', value: 456 }
          ]
        };
        content = JSON.stringify(jsonData, null, 2);
        mimeType = 'application/json;charset=utf-8;';
        extension = 'json';
      } else if (exportItem.type === 'excel') {
        const excelData = [
          ['EXPORT CIVIX - ' + exportItem.name.toUpperCase()],
          ['Date d\'export: ' + new Date().toLocaleString('fr-FR')],
          ['Catégorie: ' + getCategoryLabel(exportItem.category)],
          [],
          ['TABLEAU DE DONNÉES'],
          ['ID', 'Nom', 'Date', 'Statut', 'Valeur', 'Pourcentage'],
          ['1', 'Élément 1', '2025-01-15', 'Actif', '234', '12%'],
          ['2', 'Élément 2', '2025-01-20', 'Actif', '567', '28%'],
          ['3', 'Élément 3', '2025-01-25', 'Clôturé', '891', '45%'],
          ['4', 'Élément 4', '2025-02-01', 'Actif', '123', '6%'],
          ['5', 'Élément 5', '2025-02-03', 'Actif', '456', '23%'],
          [],
          ['STATISTIQUES'],
          ['Total', '2271'],
          ['Moyenne', '454.2'],
          ['Médiane', '456']
        ];
        content = '\uFEFF' + excelData.map(row => row.join(',')).join('\n');
        mimeType = 'text/csv;charset=utf-8;';
        extension = 'csv';
      }

      // Create download
      const blob = new Blob([content], { type: mimeType });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const filename = `${exportItem.name.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${extension}`;
      
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(
        language === 'fr' ? 'Téléchargement réussi' :
        language === 'de' ? 'Download erfolgreich' :
        'Download successful',
        {
          description: exportItem.name
        }
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors du téléchargement' :
        language === 'de' ? 'Fehler beim Herunterladen' :
        'Error during download',
        {
          description: exportItem.name
        }
      );
    } finally {
      setDownloadingIds(prev => prev.filter(id => id !== exportItem.id));
    }
  };

  // Retry Failed Export
  const handleRetryExport = async (exportItem: Export) => {
    setRetryingIds(prev => [...prev, exportItem.id]);

    toast.info(
      language === 'fr' ? 'Tentative de régénération...' :
      language === 'de' ? 'Regenerierungsversuch...' :
      'Retrying generation...',
      {
        description: exportItem.name
      }
    );

    try {
      // Simulate retry process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate success (80% chance)
      const success = Math.random() > 0.2;

      if (success) {
        toast.success(
          language === 'fr' ? 'Export régénéré avec succès' :
          language === 'de' ? 'Export erfolgreich regeneriert' :
          'Export successfully regenerated',
          {
            description: language === 'fr' ? 'L\'export est maintenant prêt au téléchargement' :
                        language === 'de' ? 'Der Export ist jetzt bereit zum Download' :
                        'The export is now ready for download'
          }
        );
      } else {
        throw new Error('Retry failed');
      }
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Échec de la régénération' :
        language === 'de' ? 'Regenerierung fehlgeschlagen' :
        'Regeneration failed',
        {
          description: language === 'fr' ? 'Veuillez réessayer plus tard ou contacter le support' :
                      language === 'de' ? 'Bitte versuchen Sie es später erneut oder kontaktieren Sie den Support' :
                      'Please try again later or contact support'
        }
      );
    } finally {
      setRetryingIds(prev => prev.filter(id => id !== exportItem.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Exports & Rapports
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gérer et générer les exports de données
            </p>
          </div>
        </div>
        <Button className="gap-2" onClick={handleCreateExport}>
          <Download className="w-4 h-4" />
          Nouvel export
        </Button>
      </div>

      {/* Quick Export Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleMonthlyReport}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Rapport mensuel
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Synthèse complète du mois
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleUsersExport}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Données utilisateurs
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Export CSV des utilisateurs
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleOpenDataExport}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FileJson className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Données ouvertes
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Export JSON pour API
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleExcelStatistics}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Statistiques Excel
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tableaux de bord détaillés
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total exports
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {exports.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Prêts
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {exports.filter(e => e.status === 'ready').length}
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
                  En cours
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {exports.filter(e => e.status === 'generating').length}
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
                  Téléchargements
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {exports.reduce((sum, e) => sum + e.downloadCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
              variant={filterType === 'all' ? 'default' : 'outline'} 
              size="sm" 
              className="gap-2" 
              onClick={() => handleTypeFilter('all')}
            >
              <Filter className="w-4 h-4" />
              Tous
              <Badge className="ml-2" variant={filterType === 'all' ? 'secondary' : 'outline'}>{getFilterCount('all')}</Badge>
            </Button>
            <Button 
              variant={filterType === 'pdf' ? 'default' : 'outline'} 
              size="sm" 
              className="gap-2" 
              onClick={() => handleTypeFilter('pdf')}
            >
              PDF
              <Badge className="ml-2" variant={filterType === 'pdf' ? 'secondary' : 'outline'}>{getFilterCount('pdf')}</Badge>
            </Button>
            <Button 
              variant={filterType === 'csv' ? 'default' : 'outline'} 
              size="sm" 
              className="gap-2" 
              onClick={() => handleTypeFilter('csv')}
            >
              CSV
              <Badge className="ml-2" variant={filterType === 'csv' ? 'secondary' : 'outline'}>{getFilterCount('csv')}</Badge>
            </Button>
            <Button 
              variant={filterType === 'json' ? 'default' : 'outline'} 
              size="sm" 
              className="gap-2" 
              onClick={() => handleTypeFilter('json')}
            >
              JSON
              <Badge className="ml-2" variant={filterType === 'json' ? 'secondary' : 'outline'}>{getFilterCount('json')}</Badge>
            </Button>
            <Button 
              variant={filterType === 'excel' ? 'default' : 'outline'} 
              size="sm" 
              className="gap-2" 
              onClick={() => handleTypeFilter('excel')}
            >
              Excel
              <Badge className="ml-2" variant={filterType === 'excel' ? 'secondary' : 'outline'}>{getFilterCount('excel')}</Badge>
            </Button>
            <div className="ml-auto flex gap-2">
              {hasActivePeriodFilter && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2" 
                  onClick={handleClearPeriodFilter}
                >
                  <X className="w-4 h-4" />
                  {language === 'fr' ? 'Supprimer période' : language === 'de' ? 'Zeitraum löschen' : 'Clear period'}
                </Button>
              )}
              <Button 
                variant={hasActivePeriodFilter ? 'default' : 'outline'} 
                size="sm" 
                className="gap-2" 
                onClick={() => setIsPeriodDialogOpen(true)}
              >
                <Calendar className="w-4 h-4" />
                {language === 'fr' ? 'Période' : language === 'de' ? 'Zeitraum' : 'Period'}
                {hasActivePeriodFilter && <Badge className="ml-2" variant="secondary">✓</Badge>}
              </Button>
            </div>
          </div>
          {(filterType !== 'all' || hasActivePeriodFilter) && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Filter className="w-4 h-4" />
                <span>
                  {language === 'fr' ? 'Filtres actifs :' : language === 'de' ? 'Aktive Filter:' : 'Active filters:'}
                </span>
                {filterType !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    {filterType.toUpperCase()}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-600" 
                      onClick={() => handleTypeFilter('all')}
                    />
                  </Badge>
                )}
                {hasActivePeriodFilter && startDate && endDate && (
                  <Badge variant="secondary" className="gap-1">
                    {new Date(startDate).toLocaleDateString('fr-FR')} - {new Date(endDate).toLocaleDateString('fr-FR')}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-600" 
                      onClick={handleClearPeriodFilter}
                    />
                  </Badge>
                )}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredExports.length} {language === 'fr' ? 'résultat(s)' : language === 'de' ? 'Ergebnis(se)' : 'result(s)'}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exports List */}
      <div className="space-y-4">
        {filteredExports.map((exportItem) => (
          <Card key={exportItem.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(exportItem.type)}`}>
                  {getTypeIcon(exportItem.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {exportItem.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getTypeColor(exportItem.type)}>
                          {exportItem.type.toUpperCase()}
                        </Badge>
                        <Badge className={getCategoryColor(exportItem.category)}>
                          {getCategoryLabel(exportItem.category)}
                        </Badge>
                        <Badge className={getStatusColor(exportItem.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(exportItem.status)}
                            {getStatusLabel(exportItem.status)}
                          </div>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Date de création</p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {formatDate(exportItem.date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Taille</p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {exportItem.size}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Téléchargements</p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {exportItem.downloadCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {exportItem.status === 'ready' && (
                    <Button 
                      size="sm" 
                      className="gap-2" 
                      onClick={() => handleDownloadExport(exportItem)}
                      disabled={downloadingIds.includes(exportItem.id)}
                    >
                      {downloadingIds.includes(exportItem.id) ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          {language === 'fr' ? 'Téléchargement...' : language === 'de' ? 'Herunterladen...' : 'Downloading...'}
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          {language === 'fr' ? 'Télécharger' : language === 'de' ? 'Herunterladen' : 'Download'}
                        </>
                      )}
                    </Button>
                  )}
                  {exportItem.status === 'generating' && (
                    <Button size="sm" disabled className="gap-2">
                      <Clock className="w-4 h-4 animate-spin" />
                      {language === 'fr' ? 'En cours...' : language === 'de' ? 'In Bearbeitung...' : 'In progress...'}
                    </Button>
                  )}
                  {exportItem.status === 'failed' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-2" 
                      onClick={() => handleRetryExport(exportItem)}
                      disabled={retryingIds.includes(exportItem.id)}
                    >
                      {retryingIds.includes(exportItem.id) ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          {language === 'fr' ? 'Régénération...' : language === 'de' ? 'Regenerierung...' : 'Retrying...'}
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4" />
                          {language === 'fr' ? 'Réessayer' : language === 'de' ? 'Wiederholen' : 'Retry'}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Export Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Formats disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">PDF</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Rapports formatés et synthèses pour impression
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">CSV</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Données tabulaires pour analyse et traitement
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileJson className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">JSON</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Données structurées pour intégrations API
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Excel</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Tableaux de bord avec graphiques et formules
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nouvel export</DialogTitle>
            <DialogDescription>
              Sélectionnez le type et la catégorie de données à exporter.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select
              value={selectedType}
              onValueChange={setSelectedType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type de fichier">
                  {selectedType.toUpperCase()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Catégorie de données">
                  {getCategoryLabel(selectedCategory)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="users">Utilisateurs</SelectItem>
                <SelectItem value="consultations">Concertations</SelectItem>
                <SelectItem value="votes">Votes</SelectItem>
                <SelectItem value="petitions">Pétitions</SelectItem>
                <SelectItem value="analytics">Statistiques</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleDialogClose}>
              Annuler
            </Button>
            <Button type="button" onClick={handleDialogSubmit}>
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Period Filter Dialog */}
      <Dialog open={isPeriodDialogOpen} onOpenChange={setIsPeriodDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filtrer par période</DialogTitle>
            <DialogDescription>
              Sélectionnez la période pour filtrer les exports.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="startDate">Date de début</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="endDate">Date de fin</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClearPeriodFilter}>
              Annuler
            </Button>
            <Button type="button" onClick={handlePeriodFilter}>
              Appliquer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}