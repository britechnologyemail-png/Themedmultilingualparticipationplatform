import React, { useState } from 'react';
import { BarChart as BarChartIcon, TrendingUp, Users, Mail, ThumbsUp, Eye, Download, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';

export function AnalyticsPage() {
  const { language } = useLanguage();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [exportFormat, setExportFormat] = useState<string>('csv');

  const handleExport = () => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const timeRangeLabels = {
        '7d': '7_jours',
        '30d': '30_jours',
        '90d': '90_jours',
        '1y': '1_an'
      };

      const filename = `statistiques_civix_${timeRangeLabels[timeRange]}_${currentDate}`;

      if (exportFormat === 'csv') {
        exportToCSV(filename);
      } else if (exportFormat === 'xlsx') {
        exportToXLSX(filename);
      } else if (exportFormat === 'pdf') {
        exportToPDF(filename);
      }

      toast.success(
        language === 'fr' ? `Export ${exportFormat.toUpperCase()} réussi` :
        language === 'de' ? `${exportFormat.toUpperCase()}-Export erfolgreich` :
        `${exportFormat.toUpperCase()} export successful`,
        {
          description: language === 'fr' ? 'Le fichier a été téléchargé' :
                      language === 'de' ? 'Die Datei wurde heruntergeladen' :
                      'The file has been downloaded'
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

  const exportToCSV = (filename: string) => {
    // KPI Data
    const kpiData = [
      ['Indicateur', 'Valeur', 'Évolution'],
      ['Utilisateurs actifs', '2,847', '+12.5%'],
      ['Contributions', '8,426', '+18.2%'],
      ['Votes totaux', '15,683', '+24.8%'],
      ['Vues de page', '45,219', '+8.4%']
    ];

    // Participation Evolution
    const participationHeaders = ['Date', 'Concertations', 'Pétitions', 'Votes', 'Assemblées'];
    const participationRows = participationData.map(d => [
      d.date,
      d.consultations.toString(),
      d.petitions.toString(),
      d.votes.toString(),
      d.assemblies.toString()
    ]);

    // Module Distribution
    const moduleHeaders = ['Module', 'Pourcentage'];
    const moduleRows = moduleData.map(m => [m.name, `${m.value}%`]);

    // Theme Engagement
    const themeHeaders = ['Thème', 'Participants', 'Contributions'];
    const themeRows = themeEngagementData.map(t => [
      t.theme,
      t.participants.toString(),
      t.contributions.toString()
    ]);

    // Demographics
    const demoHeaders = ['Tranche d\'âge', 'Nombre d\'utilisateurs'];
    const demoRows = demographicsData.map(d => [d.ageGroup, d.count.toString()]);

    // Combine all sections
    const csvContent = [
      ['RAPPORT STATISTIQUES CIVIX'],
      [`Période: ${timeRange}`],
      [`Date d'export: ${new Date().toLocaleString('fr-FR')}`],
      [],
      ['=== INDICATEURS CLÉS ==='],
      ...kpiData,
      [],
      ['=== ÉVOLUTION DE LA PARTICIPATION ==='],
      participationHeaders,
      ...participationRows,
      [],
      ['=== RÉPARTITION PAR MODULE ==='],
      moduleHeaders,
      ...moduleRows,
      [],
      ['=== ENGAGEMENT PAR THÈME ==='],
      themeHeaders,
      ...themeRows,
      [],
      ['=== DÉMOGRAPHIE DES UTILISATEURS ==='],
      demoHeaders,
      ...demoRows
    ].map(row => Array.isArray(row) ? row.map(cell => `"${cell}"`).join(',') : row).join('\n');

    // Create and download file
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToXLSX = (filename: string) => {
    // For XLSX, we'll create a CSV with tab separators that Excel can open
    // A real implementation would use a library like xlsx or exceljs
    const sections = [
      {
        title: 'INDICATEURS CLÉS',
        headers: ['Indicateur', 'Valeur', 'Évolution'],
        data: [
          ['Utilisateurs actifs', '2,847', '+12.5%'],
          ['Contributions', '8,426', '+18.2%'],
          ['Votes totaux', '15,683', '+24.8%'],
          ['Vues de page', '45,219', '+8.4%']
        ]
      },
      {
        title: 'ÉVOLUTION DE LA PARTICIPATION',
        headers: ['Date', 'Concertations', 'Pétitions', 'Votes', 'Assemblées'],
        data: participationData.map(d => [
          d.date,
          d.consultations.toString(),
          d.petitions.toString(),
          d.votes.toString(),
          d.assemblies.toString()
        ])
      },
      {
        title: 'RÉPARTITION PAR MODULE',
        headers: ['Module', 'Pourcentage'],
        data: moduleData.map(m => [m.name, `${m.value}%`])
      },
      {
        title: 'ENGAGEMENT PAR THÈME',
        headers: ['Thème', 'Participants', 'Contributions'],
        data: themeEngagementData.map(t => [
          t.theme,
          t.participants.toString(),
          t.contributions.toString()
        ])
      },
      {
        title: 'DÉMOGRAPHIE DES UTILISATEURS',
        headers: ['Tranche d\'âge', 'Nombre d\'utilisateurs'],
        data: demographicsData.map(d => [d.ageGroup, d.count.toString()])
      }
    ];

    let xlsxContent = `RAPPORT STATISTIQUES CIVIX\t\t\t\t\n`;
    xlsxContent += `Période: ${timeRange}\t\t\t\t\n`;
    xlsxContent += `Date d'export: ${new Date().toLocaleString('fr-FR')}\t\t\t\t\n\n`;

    sections.forEach(section => {
      xlsxContent += `${section.title}\t\t\t\t\n`;
      xlsxContent += section.headers.join('\t') + '\n';
      section.data.forEach(row => {
        xlsxContent += row.join('\t') + '\n';
      });
      xlsxContent += '\n';
    });

    const blob = new Blob(['\uFEFF' + xlsxContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = (filename: string) => {
    // Generate a text-based PDF-like report
    // A real implementation would use a library like jsPDF
    const report = `
╔════════════════════════════════════════════════════════════════╗
║           RAPPORT STATISTIQUES CIVIX - ${timeRange.toUpperCase()}                    ║
╚════════════════════════════════════════════════════════════════╝

Date d'export: ${new Date().toLocaleString('fr-FR')}
Période analysée: ${timeRange}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 INDICATEURS CLÉS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👥 Utilisateurs actifs      : 2,847     (+12.5%)
💬 Contributions             : 8,426     (+18.2%)
🗳️  Votes totaux             : 15,683    (+24.8%)
👁️  Vues de page             : 45,219    (+8.4%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 ÉVOLUTION DE LA PARTICIPATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Date      | Concertations | Pétitions | Votes | Assemblées
----------|---------------|-----------|-------|------------
${participationData.map(d => 
  `${d.date.padEnd(9)} | ${d.consultations.toString().padEnd(13)} | ${d.petitions.toString().padEnd(9)} | ${d.votes.toString().padEnd(5)} | ${d.assemblies.toString()}`
).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 RÉPARTITION PAR MODULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${moduleData.map(m => `${m.name.padEnd(20)} : ${m.value}%`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏷️  ENGAGEMENT PAR THÈME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thème            | Participants | Contributions
-----------------|--------------|---------------
${themeEngagementData.map(t => 
  `${t.theme.padEnd(16)} | ${t.participants.toString().padEnd(12)} | ${t.contributions.toString()}`
).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 DÉMOGRAPHIE DES UTILISATEURS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tranche d'âge    | Nombre d'utilisateurs
-----------------|----------------------
${demographicsData.map(d => 
  `${d.ageGroup.padEnd(16)} | ${d.count.toString()}`
).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rapport généré automatiquement par CiviX
Plateforme de démocratie participative
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Participation data over time
  const participationData = [
    { date: '01/12', consultations: 120, petitions: 85, votes: 150, assemblies: 45 },
    { date: '05/12', consultations: 135, petitions: 92, votes: 168, assemblies: 52 },
    { date: '10/12', consultations: 145, petitions: 105, votes: 180, assemblies: 58 },
    { date: '15/12', consultations: 158, petitions: 118, votes: 195, assemblies: 63 },
    { date: '20/12', consultations: 172, petitions: 125, votes: 210, assemblies: 68 },
    { date: '25/12', consultations: 165, petitions: 120, votes: 205, assemblies: 65 },
    { date: '30/12', consultations: 180, petitions: 135, votes: 225, assemblies: 72 },
    { date: '05/01', consultations: 195, petitions: 148, votes: 240, assemblies: 78 }
  ];

  // Module usage distribution
  const moduleData = [
    { name: 'Concertations', value: 35, color: '#3b82f6' },
    { name: 'Votes', value: 30, color: '#8b5cf6' },
    { name: 'Pétitions', value: 20, color: '#10b981' },
    { name: 'Assemblées', value: 10, color: '#f59e0b' },
    { name: 'Conférences', value: 5, color: '#ec4899' }
  ];

  // Theme engagement
  const themeEngagementData = [
    { theme: 'Mobilité', participants: 420, contributions: 850 },
    { theme: 'Environnement', participants: 385, contributions: 720 },
    { theme: 'Logement', participants: 340, contributions: 620 },
    { theme: 'Culture', participants: 295, contributions: 540 },
    { theme: 'Éducation', participants: 280, contributions: 510 },
    { theme: 'Économie', participants: 245, contributions: 465 }
  ];

  // User demographics
  const demographicsData = [
    { ageGroup: '18-24', count: 120 },
    { ageGroup: '25-34', count: 280 },
    { ageGroup: '35-44', count: 340 },
    { ageGroup: '45-54', count: 295 },
    { ageGroup: '55-64', count: 210 },
    { ageGroup: '65+', count: 155 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChartIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Indicateurs & Statistiques
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analysez les performances et l'engagement de votre plateforme
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === '7d'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              7 jours
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === '30d'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              30 jours
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === '90d'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              90 jours
            </button>
            <button
              onClick={() => setTimeRange('1y')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === '1y'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              1 an
            </button>
          </div>
          <Select onValueChange={setExportFormat} defaultValue={exportFormat}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="xlsx">XLSX</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Utilisateurs actifs
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  2,847
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Contributions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  8,426
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+18.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Votes totaux
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  15,683
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+24.8%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Vues de page
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  45,219
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+8.4%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution de la participation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="consultations" stroke="#3b82f6" strokeWidth={2} name="Concertations" />
                <Line type="monotone" dataKey="votes" stroke="#8b5cf6" strokeWidth={2} name="Votes" />
                <Line type="monotone" dataKey="petitions" stroke="#10b981" strokeWidth={2} name="Pétitions" />
                <Line type="monotone" dataKey="assemblies" stroke="#f59e0b" strokeWidth={2} name="Assemblées" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition par module</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moduleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {moduleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement par thème</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={themeEngagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="theme" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="participants" fill="#3b82f6" name="Participants" />
                <Bar dataKey="contributions" fill="#8b5cf6" name="Contributions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Démographie des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demographicsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="ageGroup" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#10b981" name="Utilisateurs" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                title: 'Nouvelle contribution sur "Mobilité Urbaine"',
                time: 'Il y a 5 minutes',
                user: 'Marie Dubois'
              },
              {
                icon: ThumbsUp,
                color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
                title: 'Vote enregistré sur le budget participatif',
                time: 'Il y a 12 minutes',
                user: 'Jean Martin'
              },
              {
                icon: Users,
                color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                title: 'Nouvel utilisateur inscrit',
                time: 'Il y a 23 minutes',
                user: 'Sophie Bernard'
              },
              {
                icon: Calendar,
                color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
                title: 'Assemblée citoyenne programmée',
                time: 'Il y a 1 heure',
                user: 'Admin'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}