/**
 * Header Menu Management Page (Admin Backoffice)
 * 
 * Complete interface for managing header navigation menu
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Menu,
  Settings,
  BarChart3,
  Home,
  MessageSquare,
  Users,
  FileText,
  Video,
  Vote,
  AlertCircle,
  Sparkles,
  Tag,
  Info,
} from 'lucide-react';

export function HeaderMenuManagementPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'config'>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Menu },
    { id: 'config' as const, label: 'Configuration', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Header Menu Management
          </h1>
          <p className="text-gray-600">
            Configure and manage the navigation menu displayed in the site header
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      group flex items-center gap-2 px-8 py-4 border-b-2 font-medium transition-all
                      ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'config' && <ConfigurationTab />}
        </div>
      </div>
    </div>
  );
}

// ==================== Overview Tab ====================

function OverviewTab() {
  const menuStructure = [
    {
      id: 'home',
      label: 'Home / Accueil',
      path: '/',
      icon: <Home className="w-5 h-5" />,
      isActive: true,
      hasChildren: false,
    },
    {
      id: 'consultations',
      label: 'Consultations / Concertations',
      path: '/consultations',
      icon: <MessageSquare className="w-5 h-5" />,
      isActive: true,
      hasChildren: false,
    },
    {
      id: 'assemblies',
      label: 'Assemblies / Assemblées',
      path: '/assemblies',
      icon: <Users className="w-5 h-5" />,
      isActive: true,
      hasChildren: false,
    },
    {
      id: 'petitions',
      label: 'Petitions / Pétitions',
      path: '/petitions',
      icon: <FileText className="w-5 h-5" />,
      isActive: true,
      hasChildren: false,
    },
    {
      id: 'conferences',
      label: 'Conferences / Conférences',
      path: '/conferences',
      icon: <Video className="w-5 h-5" />,
      isActive: true,
      hasChildren: false,
    },
    {
      id: 'votes',
      label: 'Votes',
      path: '/votes',
      icon: <Vote className="w-5 h-5" />,
      isActive: true,
      hasChildren: false,
    },
    {
      id: 'signalements',
      label: 'Reports / Signalements',
      path: '/signalements',
      icon: <AlertCircle className="w-5 h-5" />,
      isActive: true,
      hasChildren: false,
    },
    {
      id: 'youth',
      label: 'Youth Space / Espace Jeunesse',
      path: '/youth-space',
      icon: <Sparkles className="w-5 h-5" />,
      isActive: true,
      hasChildren: false,
    },
    {
      id: 'themes',
      label: 'Themes / Thèmes',
      path: '/themes',
      icon: <Tag className="w-5 h-5" />,
      isActive: true,
      hasChildren: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Current Header Menu Structure</h2>
          <p className="text-sm text-gray-500 mt-1">
            The header menu is currently managed through the Header component
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Header Menu Configuration</h3>
            <p className="text-sm text-blue-800">
              The header menu is currently hard-coded in the Header component (<code className="bg-blue-100 px-1 py-0.5 rounded">/src/app/components/Header.tsx</code>).
              To make it fully dynamic like the footer menu, additional development is required to:
            </p>
            <ul className="list-disc list-inside text-sm text-blue-800 mt-2 space-y-1 ml-2">
              <li>Create HeaderMenuDTO interfaces</li>
              <li>Implement header menu API endpoints</li>
              <li>Create React Query hooks for header menu</li>
              <li>Build drag & drop management interface</li>
              <li>Update Header component to consume dynamic data</li>
            </ul>
            <p className="text-sm text-blue-800 mt-3">
              <strong>Current implementation:</strong> The menu items below show the current static structure from the Header component.
            </p>
          </div>
        </div>
      </div>

      {/* Menu Structure Preview */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Menu Items</h3>
        
        {menuStructure.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200"
          >
            {/* Order */}
            <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 shadow-sm">
              {index + 1}
            </div>

            {/* Icon */}
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              {item.icon}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{item.label}</div>
              <div className="text-sm text-gray-500">{item.path}</div>
            </div>

            {/* Status */}
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
              {item.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-sm text-blue-600 mb-1">Total Items</div>
          <div className="text-3xl font-bold text-blue-700">{menuStructure.length}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-sm text-green-600 mb-1">Active Items</div>
          <div className="text-3xl font-bold text-green-700">
            {menuStructure.filter((item) => item.isActive).length}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Inactive Items</div>
          <div className="text-3xl font-bold text-gray-700">
            {menuStructure.filter((item) => !item.isActive).length}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== Configuration Tab ====================

function ConfigurationTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Header Menu Configuration</h2>
        <p className="text-gray-600">
          Configuration options for the header menu will be available here once the dynamic menu system is fully implemented.
        </p>
      </div>

      {/* Placeholder for future configuration */}
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">Configuration Coming Soon</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Header menu configuration options (logo settings, layout preferences, and behavior settings) will be available once the dynamic menu system is implemented.
        </p>
      </div>

      {/* Info about current implementation */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-1">Current Implementation</h3>
            <p className="text-sm text-yellow-800">
              The header currently uses a static configuration defined in the Header component.
              To modify the header menu, you need to edit the file: <code className="bg-yellow-100 px-1 py-0.5 rounded">/src/app/components/Header.tsx</code>
            </p>
            <p className="text-sm text-yellow-800 mt-2">
              <strong>Recommendation:</strong> Implement a dynamic header menu system similar to the footer menu for full administrative control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
