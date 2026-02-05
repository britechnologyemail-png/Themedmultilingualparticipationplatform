/**
 * Footer Menu Management Page - Enhanced Version (Admin Backoffice)
 * 
 * Complete interface for managing footer menu configuration and items
 * Features: Drag & Drop, Create/Edit forms, Icon selector, Statistics
 */

import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion, AnimatePresence } from 'motion/react';
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
  Edit,
  X,
  Image as ImageIcon,
  Palette,
  Layout,
  Zap,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import {
  useFooterMenuItems,
  useFooterMenuConfig,
  useToggleMenuItemActive,
  useToggleMenuItemVisibility,
  useDeleteFooterMenuItem,
  useBatchUpdateMenuOrder,
  useCreateFooterMenuItem,
  useUpdateFooterMenuItem,
  useUpdateFooterMenuConfig,
  useFooterMenuStats,
} from '../../hooks/useFooterMenuApi';
import type { FooterMenuItemDTO, CreateFooterMenuItemDTO, UpdateFooterMenuItemDTO } from '../../types';

const ItemType = 'MENU_ITEM';

export function FooterMenuManagementPageEnhanced() {
  const [activeTab, setActiveTab] = useState<'items' | 'config' | 'stats'>('items');

  const tabs = [
    { id: 'items' as const, label: 'Menu Items', icon: Menu, description: 'Manage menu items' },
    { id: 'config' as const, label: 'Configuration', icon: Settings, description: 'Configure menu settings' },
    { id: 'stats' as const, label: 'Statistics', icon: BarChart3, description: 'View usage statistics' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Footer Menu Management
            </h1>
            <p className="text-gray-600">
              Configure and manage the dynamic footer menu displayed on the FrontOffice
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
                        group flex flex-col items-center gap-1 px-8 py-4 border-b-2 font-medium transition-all
                        ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                      <span>{tab.label}</span>
                      <span className="text-xs text-gray-400">{tab.description}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow p-6"
            >
              {activeTab === 'items' && <MenuItemsTab />}
              {activeTab === 'config' && <ConfigurationTab />}
              {activeTab === 'stats' && <StatisticsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </DndProvider>
  );
}

// ==================== Menu Items Tab with Drag & Drop ====================

function MenuItemsTab() {
  const { data: menuItems, isLoading } = useFooterMenuItems();
  const [editingItem, setEditingItem] = useState<FooterMenuItemDTO | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const batchUpdateOrder = useBatchUpdateMenuOrder();

  const handleDrop = (draggedId: string, targetId: string) => {
    if (!menuItems) return;

    const draggedIndex = menuItems.findIndex(item => item.id === draggedId);
    const targetIndex = menuItems.findIndex(item => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newItems = [...menuItems];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);

    // Update order for all items
    const updates = newItems.map((item, index) => ({
      id: item.id,
      order: index,
    }));

    batchUpdateOrder.mutate({ items: updates });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!menuItems || menuItems.length === 0) {
    return (
      <>
        <EmptyState onCreateClick={() => setIsCreating(true)} />
        
        {/* Create/Edit Modal - Must be outside EmptyState return */}
        <AnimatePresence>
          {(isCreating || editingItem) && (
            <MenuItemFormModal
              item={editingItem}
              onClose={() => {
                setIsCreating(false);
                setEditingItem(null);
              }}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  const sortedItems = [...menuItems].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Menu Items</h2>
          <p className="text-sm text-gray-500 mt-1">Drag and drop to reorder • Click to edit</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          Add New Item
        </button>
      </div>

      <div className="space-y-2">
        {sortedItems.map((item) => (
          <DraggableMenuItem
            key={item.id}
            item={item}
            onDrop={handleDrop}
            onEdit={() => setEditingItem(item)}
          />
        ))}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {(isCreating || editingItem) && (
          <MenuItemFormModal
            item={editingItem}
            onClose={() => {
              setIsCreating(false);
              setEditingItem(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== Draggable Menu Item ====================

interface DraggableMenuItemProps {
  item: FooterMenuItemDTO;
  onDrop: (draggedId: string, targetId: string) => void;
  onEdit: () => void;
}

function DraggableMenuItem({ item, onDrop, onEdit }: DraggableMenuItemProps) {
  const toggleActive = useToggleMenuItemActive();
  const toggleVisibility = useToggleMenuItemVisibility();
  const deleteItem = useDeleteFooterMenuItem();

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (draggedItem: { id: string }) => {
      if (draggedItem.id !== item.id) {
        onDrop(draggedItem.id, item.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const Icon = getIconComponent(item.icon.name);

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`
        flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-move
        ${isDragging ? 'opacity-50 border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'}
        ${isOver ? 'border-blue-400 bg-blue-50' : ''}
        hover:border-gray-300 hover:shadow-sm
      `}
    >
      {/* Drag Handle */}
      <button className="cursor-move text-gray-400 hover:text-gray-600 transition-colors">
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Order Badge */}
      <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 shadow-sm">
        {item.order + 1}
      </div>

      {/* Icon */}
      {Icon && (
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.isActive ? 'bg-blue-100' : 'bg-gray-200'}`}>
          <Icon className={`w-5 h-5 ${item.isActive ? item.icon.activeColor : item.icon.inactiveColor}`} />
        </div>
      )}

      {/* Item Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 truncate">{item.label.en}</h3>
          {item.badge && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.badge.color || 'bg-blue-500'} text-white shrink-0`}>
              {item.badge.count || item.badge.label?.en}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-sm text-gray-500 truncate">{item.path}</p>
          <span className="text-xs text-gray-400">•</span>
          <p className="text-xs text-gray-400 truncate">{item.key}</p>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex items-center gap-2 shrink-0">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
        }`}>
          {item.isActive ? 'Active' : 'Inactive'}
        </span>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          item.isVisible ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
        }`}>
          {item.isVisible ? 'Visible' : 'Hidden'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleActive.mutate(item.id);
          }}
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
          onClick={(e) => {
            e.stopPropagation();
            toggleVisibility.mutate(item.id);
          }}
          disabled={toggleVisibility.isPending}
          className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          title={item.isVisible ? 'Hide' : 'Show'}
        >
          {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm(`Delete "${item.label.en}"?`)) {
              deleteItem.mutate(item.id);
            }
          }}
          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ==================== Menu Item Form Modal ====================

interface MenuItemFormModalProps {
  item: FooterMenuItemDTO | null;
  onClose: () => void;
}

function MenuItemFormModal({ item, onClose }: MenuItemFormModalProps) {
  const isEditing = !!item;
  const createItem = useCreateFooterMenuItem();
  const updateItem = useUpdateFooterMenuItem();

  const [formData, setFormData] = useState({
    key: item?.key || '',
    labelFr: item?.label.fr || '',
    labelDe: item?.label.de || '',
    labelEn: item?.label.en || '',
    path: item?.path || '',
    iconName: item?.icon.name || 'Home',
    iconActiveColor: item?.icon.activeColor || 'text-blue-600',
    iconInactiveColor: item?.icon.inactiveColor || 'text-gray-400',
    iconHoverColor: item?.icon.hoverColor || 'text-blue-500',
    order: item?.order ?? 0,
    isActive: item?.isActive ?? true,
    isVisible: item?.isVisible ?? true,
    showInFooter: item?.showInFooter ?? true,
    descriptionFr: item?.description?.fr || '',
    descriptionDe: item?.description?.de || '',
    descriptionEn: item?.description?.en || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: CreateFooterMenuItemDTO = {
      key: formData.key,
      label: {
        fr: formData.labelFr,
        de: formData.labelDe,
        en: formData.labelEn,
      },
      path: formData.path,
      icon: {
        name: formData.iconName,
        activeColor: formData.iconActiveColor,
        inactiveColor: formData.iconInactiveColor,
        hoverColor: formData.iconHoverColor,
      },
      order: formData.order,
      isActive: formData.isActive,
      isVisible: formData.isVisible,
      showInFooter: formData.showInFooter,
      description: formData.descriptionEn ? {
        fr: formData.descriptionFr,
        de: formData.descriptionDe,
        en: formData.descriptionEn,
      } : undefined,
    };

    if (isEditing && item) {
      updateItem.mutate({ id: item.id, updates: payload }, {
        onSuccess: () => onClose(),
      });
    } else {
      createItem.mutate(payload, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Edit Menu Item' : 'Create Menu Item'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Menu className="w-4 h-4" />
              Basic Information
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key (unique identifier)
                </label>
                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="home, consultations, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Path
                </label>
                <input
                  type="text"
                  value={formData.path}
                  onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/consultations"
                  required
                />
              </div>
            </div>
          </div>

          {/* Labels (Multilingual) */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Labels (Multilingual)</h4>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  🇫🇷 French
                </label>
                <input
                  type="text"
                  value={formData.labelFr}
                  onChange={(e) => setFormData({ ...formData, labelFr: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Accueil"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  🇩🇪 German
                </label>
                <input
                  type="text"
                  value={formData.labelDe}
                  onChange={(e) => setFormData({ ...formData, labelDe: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Startseite"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  🇬🇧 English
                </label>
                <input
                  type="text"
                  value={formData.labelEn}
                  onChange={(e) => setFormData({ ...formData, labelEn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Home"
                  required
                />
              </div>
            </div>
          </div>

          {/* Icon Selection */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Icon Configuration
            </h4>

            <IconSelector
              selectedIcon={formData.iconName}
              onSelectIcon={(icon) => setFormData({ ...formData, iconName: icon })}
            />

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Active Color
                </label>
                <select
                  value={formData.iconActiveColor}
                  onChange={(e) => setFormData({ ...formData, iconActiveColor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text-blue-600">Blue</option>
                  <option value="text-green-600">Green</option>
                  <option value="text-purple-600">Purple</option>
                  <option value="text-orange-600">Orange</option>
                  <option value="text-red-600">Red</option>
                  <option value="text-teal-600">Teal</option>
                  <option value="text-pink-600">Pink</option>
                  <option value="text-yellow-600">Yellow</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inactive Color
                </label>
                <select
                  value={formData.iconInactiveColor}
                  onChange={(e) => setFormData({ ...formData, iconInactiveColor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text-gray-400">Gray 400</option>
                  <option value="text-gray-500">Gray 500</option>
                  <option value="text-gray-600">Gray 600</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hover Color
                </label>
                <select
                  value={formData.iconHoverColor}
                  onChange={(e) => setFormData({ ...formData, iconHoverColor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text-blue-500">Blue</option>
                  <option value="text-green-500">Green</option>
                  <option value="text-purple-500">Purple</option>
                  <option value="text-orange-500">Orange</option>
                  <option value="text-red-500">Red</option>
                  <option value="text-teal-500">Teal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Display Settings
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <div className="flex items-center gap-6 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Visible</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showInFooter}
                    onChange={(e) => setFormData({ ...formData, showInFooter: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Show in Footer</span>
                </label>
              </div>
            </div>
          </div>

          {/* Descriptions (Optional) */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Descriptions (Optional - for tooltips)</h4>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  🇫🇷 French
                </label>
                <input
                  type="text"
                  value={formData.descriptionFr}
                  onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Retour à la page d'accueil"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  🇩🇪 German
                </label>
                <input
                  type="text"
                  value={formData.descriptionDe}
                  onChange={(e) => setFormData({ ...formData, descriptionDe: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Zurück zur Startseite"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  🇬🇧 English
                </label>
                <input
                  type="text"
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Back to homepage"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createItem.isPending || updateItem.isPending}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isEditing ? 'Save Changes' : 'Create Item'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ==================== Icon Selector ====================

interface IconSelectorProps {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
}

function IconSelector({ selectedIcon, onSelectIcon }: IconSelectorProps) {
  const availableIcons = [
    'Home', 'MessageSquare', 'Users', 'FileText', 'Video', 'Vote',
    'AlertCircle', 'Sparkles', 'Tag', 'Settings', 'BarChart', 'Calendar',
    'Mail', 'Bell', 'Search', 'Menu', 'X', 'ChevronDown', 'ChevronUp',
    'ChevronLeft', 'ChevronRight', 'Plus', 'Minus', 'Check', 'Info',
    'HelpCircle', 'Shield', 'Lock', 'Unlock', 'Heart', 'Star',
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Icon
      </label>
      <div className="grid grid-cols-8 gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
        {availableIcons.map((iconName) => {
          const Icon = getIconComponent(iconName);
          if (!Icon) return null;

          return (
            <button
              key={iconName}
              type="button"
              onClick={() => onSelectIcon(iconName)}
              className={`
                p-3 rounded-lg border-2 transition-all hover:scale-110
                ${
                  selectedIcon === iconName
                    ? 'border-blue-500 bg-blue-100 text-blue-600'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                }
              `}
              title={iconName}
            >
              <Icon className="w-5 h-5 mx-auto" />
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-500">Selected: {selectedIcon}</p>
    </div>
  );
}

// ==================== Configuration Tab ====================

function ConfigurationTab() {
  const { data: config, isLoading } = useFooterMenuConfig();
  const updateConfig = useUpdateFooterMenuConfig();

  const [formData, setFormData] = useState({
    logoVisible: config?.logo.isVisible ?? true,
    logoWidth: config?.logo.width ?? 120,
    logoHeight: config?.logo.height ?? 40,
    position: config?.layout.position ?? 'top',
    alignment: config?.layout.alignment ?? 'center',
    showIcons: config?.layout.showIcons ?? true,
    showLabels: config?.layout.showLabels ?? true,
    compactMode: config?.layout.compactMode ?? false,
    enableTooltips: config?.behavior.enableTooltips ?? true,
    animationEnabled: config?.behavior.animationEnabled ?? true,
  });

  const handleSave = () => {
    updateConfig.mutate({
      logo: {
        isVisible: formData.logoVisible,
        width: formData.logoWidth,
        height: formData.logoHeight,
      },
      layout: {
        position: formData.position as 'top' | 'bottom' | 'both',
        alignment: formData.alignment as 'left' | 'center' | 'right',
        showIcons: formData.showIcons,
        showLabels: formData.showLabels,
        compactMode: formData.compactMode,
      },
      behavior: {
        enableTooltips: formData.enableTooltips,
        animationEnabled: formData.animationEnabled,
      },
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Footer Menu Configuration</h2>
        <button
          onClick={handleSave}
          disabled={updateConfig.isPending}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Save Configuration
        </button>
      </div>

      {/* Logo Settings */}
      <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Logo Settings
        </h3>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.logoVisible}
                onChange={(e) => setFormData({ ...formData, logoVisible: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Show Logo in Footer Menu</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo Width (px)
            </label>
            <input
              type="number"
              value={formData.logoWidth}
              onChange={(e) => setFormData({ ...formData, logoWidth: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="50"
              max="300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo Height (px)
            </label>
            <input
              type="number"
              value={formData.logoHeight}
              onChange={(e) => setFormData({ ...formData, logoHeight: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="20"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Layout Settings */}
      <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Layout className="w-5 h-5" />
          Layout Settings
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Menu Position
            </label>
            <select
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="top">Top of Footer</option>
              <option value="bottom">Bottom of Footer</option>
              <option value="both">Both Top & Bottom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Menu Alignment
            </label>
            <select
              value={formData.alignment}
              onChange={(e) => setFormData({ ...formData, alignment: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.showIcons}
              onChange={(e) => setFormData({ ...formData, showIcons: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Show Icons</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.showLabels}
              onChange={(e) => setFormData({ ...formData, showLabels: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Show Labels</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.compactMode}
              onChange={(e) => setFormData({ ...formData, compactMode: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Compact Mode (Mobile)</span>
          </label>
        </div>
      </div>

      {/* Behavior Settings */}
      <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Behavior Settings
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.enableTooltips}
              onChange={(e) => setFormData({ ...formData, enableTooltips: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 block">Enable Tooltips</span>
              <span className="text-xs text-gray-500">Show description on hover</span>
            </div>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.animationEnabled}
              onChange={(e) => setFormData({ ...formData, animationEnabled: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 block">Enable Animations</span>
              <span className="text-xs text-gray-500">Smooth transitions and effects</span>
            </div>
          </label>
        </div>
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
      <h2 className="text-xl font-semibold text-gray-900">Menu Usage Statistics</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Total Items"
          value={stats.totalItems}
          color="blue"
          icon={Menu}
        />
        <StatCard
          label="Active Items"
          value={stats.activeItems}
          color="green"
          icon={Power}
        />
        <StatCard
          label="Inactive Items"
          value={stats.inactiveItems}
          color="gray"
          icon={Power}
        />
        <StatCard
          label="Visible Items"
          value={stats.visibleItems}
          color="blue"
          icon={Eye}
        />
      </div>

      {/* Most Popular Items */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Most Popular Items (by clicks)
        </h3>
        <div className="space-y-3">
          {stats.mostPopularItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'}
              `}>
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{item.label.en}</div>
                <div className="text-sm text-gray-500">{item.clicks.toLocaleString()} total clicks</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{item.clicks.toLocaleString()}</div>
                <div className="text-xs text-gray-500">clicks</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Click Statistics by Item */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Click Statistics (All Items)</h3>
        <div className="space-y-2">
          {stats.clickStats.map((stat) => (
            <div
              key={stat.itemId}
              className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900">{stat.itemKey}</div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Total:</span>{' '}
                  <span className="font-semibold text-gray-900">{stat.totalClicks.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Last 7 days:</span>{' '}
                  <span className="font-semibold text-blue-600">{stat.last7Days.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Last 30 days:</span>{' '}
                  <span className="font-semibold text-green-600">{stat.last30Days.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== Helper Components ====================

interface StatCardProps {
  label: string;
  value: number;
  color: string;
  icon?: React.ComponentType<any>;
}

function StatCard({ label, value, color, icon: Icon }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    gray: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  return (
    <div className="bg-white border-2 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-600">{label}</div>
        {Icon && <Icon className="w-5 h-5 text-gray-400" />}
      </div>
      <div className={`text-3xl font-bold ${colorClasses[color as keyof typeof colorClasses]}`}>
        {value}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col justify-center items-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-500">Loading...</p>
    </div>
  );
}

function EmptyState({ onCreateClick }: { onCreateClick?: () => void }) {
  return (
    <div className="text-center py-16">
      <Menu className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500 mb-4">No menu items available</p>
      {onCreateClick && (
        <button
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create First Menu Item
        </button>
      )}
    </div>
  );
}

// ==================== Icon Helper ====================

function getIconComponent(iconName: string): React.ComponentType<any> | null {
  const iconMap: Record<string, React.ComponentType<any>> = {
    Home: LucideIcons.Home,
    MessageSquare: LucideIcons.MessageSquare,
    Users: LucideIcons.Users,
    FileText: LucideIcons.FileText,
    Video: LucideIcons.Video,
    Vote: LucideIcons.Vote,
    AlertCircle: LucideIcons.AlertCircle,
    Sparkles: LucideIcons.Sparkles,
    Tag: LucideIcons.Tag,
    Settings: LucideIcons.Settings,
    BarChart: LucideIcons.BarChart,
    Calendar: LucideIcons.Calendar,
    Mail: LucideIcons.Mail,
    Bell: LucideIcons.Bell,
    Search: LucideIcons.Search,
    Menu: LucideIcons.Menu,
    X: LucideIcons.X,
    ChevronDown: LucideIcons.ChevronDown,
    ChevronUp: LucideIcons.ChevronUp,
    ChevronLeft: LucideIcons.ChevronLeft,
    ChevronRight: LucideIcons.ChevronRight,
    Plus: LucideIcons.Plus,
    Minus: LucideIcons.Minus,
    Check: LucideIcons.Check,
    Info: LucideIcons.Info,
    HelpCircle: LucideIcons.HelpCircle,
    Shield: LucideIcons.Shield,
    Lock: LucideIcons.Lock,
    Unlock: LucideIcons.Unlock,
    Heart: LucideIcons.Heart,
    Star: LucideIcons.Star,
  };

  return iconMap[iconName] || null;
}