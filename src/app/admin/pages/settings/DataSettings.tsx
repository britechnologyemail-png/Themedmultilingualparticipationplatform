import React, { useState } from 'react';
import { Database, Download, Upload, Trash2, Archive, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

interface Backup {
  id: string;
  name: string;
  date: string;
  size: string;
  type: 'automatic' | 'manual';
  status: 'completed' | 'in-progress' | 'failed';
}

export function DataSettings() {
  const [backups] = useState<Backup[]>([
    {
      id: '1',
      name: 'Sauvegarde automatique',
      date: '2025-01-06T02:00:00',
      size: '2.8 GB',
      type: 'automatic',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Sauvegarde manuelle - Avant migration',
      date: '2025-01-05T14:30:00',
      size: '2.7 GB',
      type: 'manual',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Sauvegarde automatique',
      date: '2025-01-05T02:00:00',
      size: '2.6 GB',
      type: 'automatic',
      status: 'completed'
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || colors.completed;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      completed: 'Terminé',
      'in-progress': 'En cours',
      failed: 'Échec'
    };
    return labels[status] || status;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Archivage & Données
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gestion des sauvegardes et archivage des données
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <Archive className="w-4 h-4" />
          Nouvelle sauvegarde
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Base de données
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  2.8 GB
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Fichiers stockés
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  1,247
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Sauvegardes
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {backups.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Archive className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Dernière sauvegarde
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                  Il y a 6h
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration des sauvegardes</CardTitle>
          <CardDescription>
            Paramètres de sauvegarde automatique
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="auto-backup"
              defaultChecked
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="auto-backup" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Activer les sauvegardes automatiques
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fréquence
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="daily">Quotidienne</option>
                <option value="weekly">Hebdomadaire</option>
                <option value="monthly">Mensuelle</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Heure d'exécution
              </label>
              <input
                type="time"
                defaultValue="02:00"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre de sauvegardes à conserver
              </label>
              <input
                type="number"
                defaultValue="30"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Destination
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="local">Stockage local</option>
                <option value="s3">Amazon S3</option>
                <option value="azure">Azure Storage</option>
                <option value="gcs">Google Cloud Storage</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="compress-backup"
              defaultChecked
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="compress-backup" className="text-sm text-gray-700 dark:text-gray-300">
              Compresser les sauvegardes
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="encrypt-backup"
              defaultChecked
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="encrypt-backup" className="text-sm text-gray-700 dark:text-gray-300">
              Chiffrer les sauvegardes (AES-256)
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Backups List */}
      <Card>
        <CardHeader>
          <CardTitle>Sauvegardes récentes</CardTitle>
          <CardDescription>
            Historique des sauvegardes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backups.map((backup) => (
              <div
                key={backup.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Archive className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                          {backup.name}
                        </p>
                        <Badge className={backup.type === 'automatic' ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-indigo-50 text-indigo-600 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400'}>
                          {backup.type === 'automatic' ? 'Auto' : 'Manuel'}
                        </Badge>
                        <Badge className={getStatusColor(backup.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(backup.status)}
                            {getStatusLabel(backup.status)}
                          </div>
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span>{formatDate(backup.date)}</span>
                        <span>•</span>
                        <span>{backup.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Upload className="w-4 h-4" />
                      Restaurer
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Rétention des données (RGPD)
          </CardTitle>
          <CardDescription>
            Politique de conservation et suppression des données
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Données utilisateurs inactifs (mois)
              </label>
              <input
                type="number"
                defaultValue="24"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Consultations fermées (mois)
              </label>
              <input
                type="number"
                defaultValue="36"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logs système (jours)
              </label>
              <input
                type="number"
                defaultValue="90"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sessions expirées (heures)
              </label>
              <input
                type="number"
                defaultValue="24"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="auto-delete"
                defaultChecked
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="auto-delete" className="text-sm text-gray-700 dark:text-gray-300">
                Suppression automatique des données expirées
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymize-old-data"
                defaultChecked
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="anonymize-old-data" className="text-sm text-gray-700 dark:text-gray-300">
                Anonymiser les données anciennes au lieu de les supprimer
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="archive-before-delete"
                defaultChecked
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="archive-before-delete" className="text-sm text-gray-700 dark:text-gray-300">
                Archiver avant suppression définitive
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Zone dangereuse
          </CardTitle>
          <CardDescription>
            Actions irréversibles - À utiliser avec prudence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-red-200 dark:border-red-800 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Purger les données archivées
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Supprime toutes les données archivées de plus de 5 ans
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border border-red-200 dark:border-red-800 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Réinitialiser la base de données
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ⚠️ Supprime toutes les données - Action irréversible
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}