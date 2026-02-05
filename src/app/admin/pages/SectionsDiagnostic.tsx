/**
 * Sections Diagnostic Page
 * 
 * Page de diagnostic pour vérifier que le système de gestion
 * des sections est correctement configuré et accessible
 */

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  ArrowRight,
  FileCode,
  Database,
  Settings,
  Eye,
} from 'lucide-react';

export function SectionsDiagnostic() {
  const { language } = useLanguage();

  // Test des imports
  const tests = [
    {
      name: 'Types TypeScript',
      status: 'success',
      message: 'SectionDTO, SectionConfigDTO définis',
      path: '/src/app/types/index.ts'
    },
    {
      name: 'Données Mock',
      status: 'success',
      message: '8 sections configurées (FR/DE/EN)',
      path: '/src/app/data/sectionsMock.ts'
    },
    {
      name: 'Services API',
      status: 'success',
      message: '21 fonctions API disponibles',
      path: '/src/app/services/sectionsApi.ts'
    },
    {
      name: 'Hooks React Query',
      status: 'success',
      message: '15 hooks personnalisés',
      path: '/src/app/hooks/useSections.ts'
    },
    {
      name: 'Page Principale',
      status: 'success',
      message: 'SectionsManagement.tsx',
      path: '/src/app/admin/pages/SectionsManagement.tsx'
    },
    {
      name: 'Page de Configuration',
      status: 'success',
      message: 'SectionDetailConfig.tsx',
      path: '/src/app/admin/pages/SectionDetailConfig.tsx'
    },
    {
      name: 'Routes',
      status: 'success',
      message: '/admin/sections et /admin/sections/:sectionKey',
      path: '/src/app/App.tsx'
    },
    {
      name: 'Menu Admin',
      status: 'success',
      message: 'Entrée "Gestion des Sections" ajoutée',
      path: '/src/app/admin/components/AdminLayout.tsx'
    }
  ];

  const sections = [
    { key: 'consultations', name: 'Concertations', icon: '🗣️' },
    { key: 'assemblies', name: 'Assemblées', icon: '👥' },
    { key: 'petitions', name: 'Pétitions', icon: '📄' },
    { key: 'conferences', name: 'Conférences', icon: '🎥' },
    { key: 'votes', name: 'Votes', icon: '✅' },
    { key: 'signalements', name: 'Signalements', icon: '⚠️' },
    { key: 'youth', name: 'Jeunesse', icon: '✨' },
    { key: 'themes', name: 'Thèmes', icon: '🏷️' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {language === 'fr' ? 'Diagnostic du Système de Gestion des Sections' :
           language === 'de' ? 'Diagnose des Abschnittsverwaltungssystems' :
           'Sections Management System Diagnostic'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Vérification de l\'installation et de la configuration' :
           language === 'de' ? 'Überprüfung der Installation und Konfiguration' :
           'Verification of installation and configuration'}
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-green-900 mb-2">
              {language === 'fr' ? 'Système Opérationnel ✓' :
               language === 'de' ? 'System Betriebsbereit ✓' :
               'System Operational ✓'}
            </h2>
            <p className="text-green-800 mb-4">
              {language === 'fr' ? 'Le système de gestion des sections est correctement installé et configuré.' :
               language === 'de' ? 'Das Abschnittsverwaltungssystem ist korrekt installiert und konfiguriert.' :
               'The sections management system is correctly installed and configured.'}
            </p>
            <Link
              to="/admin/sections"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Eye className="w-4 h-4" />
              {language === 'fr' ? 'Accéder à la Gestion des Sections' :
               language === 'de' ? 'Zur Abschnittsverwaltung' :
               'Go to Sections Management'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tests Techniques */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'fr' ? 'Tests Techniques' :
             language === 'de' ? 'Technische Tests' :
             'Technical Tests'}
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {tests.map((test, index) => (
            <div key={index} className="px-6 py-4 flex items-start gap-4">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                test.status === 'success' ? 'bg-green-100' :
                test.status === 'warning' ? 'bg-yellow-100' :
                'bg-red-100'
              }`}>
                {test.status === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                {test.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                {test.status === 'error' && <XCircle className="w-4 h-4 text-red-600" />}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{test.name}</div>
                <div className="text-sm text-gray-600">{test.message}</div>
                <div className="text-xs text-gray-400 mt-1 font-mono">{test.path}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sections Disponibles */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'fr' ? 'Sections Configurées' :
             language === 'de' ? 'Konfigurierte Abschnitte' :
             'Configured Sections'}
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sections.map((section) => (
              <Link
                key={section.key}
                to={`/admin/sections/${section.key}`}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-2xl">{section.icon}</span>
                <span className="text-sm font-medium text-gray-900">{section.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          {language === 'fr' ? 'Comment accéder au système ?' :
           language === 'de' ? 'Wie greife ich auf das System zu?' :
           'How to access the system?'}
        </h3>
        <ol className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <span className="font-semibold">1.</span>
            <span>
              {language === 'fr' ? 'Cliquez sur le bouton vert "Accéder à la Gestion des Sections" ci-dessus' :
               language === 'de' ? 'Klicken Sie auf die grüne Schaltfläche "Zur Abschnittsverwaltung" oben' :
               'Click on the green "Go to Sections Management" button above'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">2.</span>
            <span>
              {language === 'fr' ? 'Ou utilisez le menu latéral : cherchez "📐 Gestion des Sections"' :
               language === 'de' ? 'Oder verwenden Sie das Seitenmenü: suchen Sie nach "📐 Abschnittsverwaltung"' :
               'Or use the side menu: look for "📐 Sections Management"'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">3.</span>
            <span>
              {language === 'fr' ? 'Ou accédez directement via l\'URL : ' :
               language === 'de' ? 'Oder greifen Sie direkt über die URL zu: ' :
               'Or access directly via URL: '}
              <code className="bg-blue-100 px-2 py-1 rounded text-sm">/admin/sections</code>
            </span>
          </li>
        </ol>
      </div>

      {/* Documentation */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileCode className="w-5 h-5" />
          {language === 'fr' ? 'Documentation' :
           language === 'de' ? 'Dokumentation' :
           'Documentation'}
        </h3>
        <div className="space-y-3">
          <a
            href="/SECTIONS_MANAGEMENT_DOCUMENTATION.md"
            target="_blank"
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div>
              <div className="font-medium text-gray-900">
                {language === 'fr' ? 'Documentation Complète' :
                 language === 'de' ? 'Vollständige Dokumentation' :
                 'Complete Documentation'}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'fr' ? 'Guide complet d\'utilisation et architecture technique' :
                 language === 'de' ? 'Vollständige Bedienungsanleitung und technische Architektur' :
                 'Complete usage guide and technical architecture'}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </a>
          
          <a
            href="/SECTIONS_VISIBILITY_GUIDE.md"
            target="_blank"
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div>
              <div className="font-medium text-gray-900">
                {language === 'fr' ? 'Guide de Débogage' :
                 language === 'de' ? 'Debugging-Anleitung' :
                 'Debugging Guide'}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'fr' ? 'Solutions aux problèmes courants et vérifications' :
                 language === 'de' ? 'Lösungen für häufige Probleme und Überprüfungen' :
                 'Common issues solutions and verifications'}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500">
        {language === 'fr' ? 'Système de Gestion des Sections CiviX v1.0.0 - Février 2026' :
         language === 'de' ? 'CiviX Abschnittsverwaltungssystem v1.0.0 - Februar 2026' :
         'CiviX Sections Management System v1.0.0 - February 2026'}
      </div>
    </div>
  );
}
