/**
 * Footer Menu Management Page (Admin Backoffice)
 * 
 * Interface for managing footer menu configuration and items
 * Allows admins to activate/deactivate items, reorder them, and configure settings
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import {
  Menu,
  Settings,
  Plus,
  Eye,
  EyeOff,
  Power,
  GripVertical,
  Trash2,
  Save,
  BarChart3,
} from 'lucide-react';
import {
  useFooterMenuItems,
  useFooterMenuConfig,
  useToggleMenuItemActive,
  useToggleMenuItemVisibility,
  useFooterMenuStats,
} from '../../hooks/useFooterMenuApi';

export function FooterMenuManagementPage() {
  const [activeTab, setActiveTab] = useState<'items' | 'config' | 'stats'>('items');

  const tabs = [
    { id: 'items' as const, label: 'Menu Items', icon: Menu },
    { id: 'config' as const, label: 'Configuration', icon: Settings },
    { id: 'stats' as const, label: 'Statistics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Footer Menu Management
          </h1>
          <p className="text-gray-600">
            Configure and manage the dynamic footer menu displayed on the FrontOffice
          </p>
        </div>

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
                      flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors
                      ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'items' && <MenuItemsTab />}
          {activeTab === 'config' && <ConfigurationTab />}
          {activeTab === 'stats' && <StatisticsTab />}
        </div>
      </div>
    </div>
  );
}

// ==================== Menu Items Tab ====================

function MenuItemsTab() {
  const { data: menuItems, isLoading } = useFooterMenuItems();
  const toggleActive = useToggleMenuItemActive();
  const toggleVisibility = useToggleMenuItemVisibility();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!menuItems || menuItems.length === 0) {
    return <EmptyState />;
  }

  const sortedItems = [...menuItems].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Menu Items</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add New Item
        </button>
      </div>

      <div className="space-y-2">
        {sortedItems.map((item) => (
          <motion.div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Drag Handle */}
            <button className="cursor-move text-gray-400 hover:text-gray-600">
              <GripVertical className="w-5 h-5" />
            </button>

            {/* Order Badge */}
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
              {item.order + 1}
            </div>

            {/* Item Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">{item.label.en}</h3>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.badge.color || 'bg-blue-500'} text-white`}>
                    {item.badge.count || item.badge.label?.en}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{item.path}</p>
            </div>

            {/* Status Badges */}
            <div className="flex items-center gap-2">
              {item.isActive && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  Active
                </span>
              )}
              {!item.isActive && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                  Inactive
                </span>
              )}
              {item.isVisible && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  Visible
                </span>
              )}
              {!item.isVisible && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                  Hidden
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleActive.mutate(item.id)}
                disabled={toggleActive.isPending}
                className={`
                  p-2 rounded-lg transition-colors
                  ${
                    item.isActive
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
                title={item.isActive ? 'Deactivate' : 'Activate'}
              >
                <Power className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleVisibility.mutate(item.id)}
                disabled={toggleVisibility.isPending}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title={item.isVisible ? 'Hide' : 'Show'}
              >
                {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ==================== Configuration Tab ====================

function ConfigurationTab() {
  const { data: config, isLoading } = useFooterMenuConfig();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!config) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Footer Menu Configuration</h2>

      {/* Logo Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Logo Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Show Logo
            </label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.logo.isVisible}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                readOnly
              />
              <span className="text-sm text-gray-600">
                {config.logo.isVisible ? 'Visible' : 'Hidden'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Size
            </label>
            <div className="text-sm text-gray-600">
              {config.logo.width}x{config.logo.height}px
            </div>
          </div>
        </div>
      </div>

      {/* Layout Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Layout Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>
            <div className="text-sm text-gray-900 capitalize">{config.layout.position}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alignment
            </label>
            <div className="text-sm text-gray-900 capitalize">{config.layout.alignment}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Show Icons
            </label>
            <div className="text-sm text-gray-600">
              {config.layout.showIcons ? 'Yes' : 'No'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Show Labels
            </label>
            <div className="text-sm text-gray-600">
              {config.layout.showLabels ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>

      {/* Behavior Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Behavior Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enable Tooltips
            </label>
            <div className="text-sm text-gray-600">
              {config.behavior.enableTooltips ? 'Yes' : 'No'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Animations
            </label>
            <div className="text-sm text-gray-600">
              {config.behavior.animationEnabled ? 'Enabled' : 'Disabled'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Reset
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

// ==================== Statistics Tab ====================

function StatisticsTab() {
  const { data: stats, isLoading } = useFooterMenuStats();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!stats) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Menu Statistics</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Total Items"
          value={stats.totalItems}
          color="blue"
        />
        <StatCard
          label="Active Items"
          value={stats.activeItems}
          color="green"
        />
        <StatCard
          label="Inactive Items"
          value={stats.inactiveItems}
          color="gray"
        />
        <StatCard
          label="Visible Items"
          value={stats.visibleItems}
          color="blue"
        />
      </div>

      {/* Most Popular Items */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Most Popular Items</h3>
        <div className="space-y-2">
          {stats.mostPopularItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{item.label.en}</div>
                <div className="text-sm text-gray-500">{item.clicks.toLocaleString()} clicks</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== Helper Components ====================

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    gray: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${colorClasses[color as keyof typeof colorClasses]}`}>
        {value}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">No data available</p>
    </div>
  );
}
