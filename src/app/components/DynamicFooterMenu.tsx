/**
 * Dynamic Footer Menu Component
 * 
 * Horizontal menu displayed in the footer with configurable items
 * Supports multilingual display, icons, badges, and tooltips
 */

import React from 'react';
import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useActiveFooterMenuItems } from '../hooks/useFooterMenuApi';
import * as LucideIcons from 'lucide-react';
import type { FooterMenuItemDTO } from '../types';

export function DynamicFooterMenu() {
  const { language } = useLanguage();
  const location = useLocation();
  const { data: menuItems, isLoading } = useActiveFooterMenuItems();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return null;
  }

  return (
    <nav className="w-full border-t border-gray-800 bg-gray-800/50 backdrop-blur-sm">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1400px] px-6 lg:px-8 py-4">
          <motion.div
            className="flex flex-wrap justify-center items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {menuItems.map((item, index) => (
              <MenuButton
                key={item.id}
                item={item}
                language={language}
                isActive={location.pathname === item.path}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </nav>
  );
}

// ==================== Menu Button Component ====================

interface MenuButtonProps {
  item: FooterMenuItemDTO;
  language: 'fr' | 'de' | 'en';
  isActive: boolean;
  index: number;
}

function MenuButton({ item, language, isActive, index }: MenuButtonProps) {
  const Icon = getIconComponent(item.icon.name);
  const label = item.label[language];
  const description = item.description?.[language];
  const badge = item.badge;

  return (
    <Link to={item.path}>
      <motion.button
        className={`
          group relative px-4 py-2.5 rounded-lg
          flex items-center gap-2
          transition-all duration-300
          ${
            isActive
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
          }
        `}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        title={description || label}
      >
        {/* Icon */}
        {Icon && (
          <Icon
            className={`
              w-4 h-4 transition-colors
              ${isActive ? 'text-white' : item.icon.inactiveColor}
              group-hover:${item.icon.hoverColor}
            `}
          />
        )}

        {/* Label */}
        <span className="text-sm font-medium whitespace-nowrap">
          {label}
        </span>

        {/* Badge */}
        {badge && (badge.count || badge.label) && (
          <span
            className={`
              px-1.5 py-0.5 rounded-full text-xs font-semibold
              ${badge.color || 'bg-blue-500'} text-white
              ${badge.count ? 'min-w-[20px] text-center' : ''}
            `}
          >
            {badge.count || badge.label[language]}
          </span>
        )}

        {/* Active Indicator */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-white rounded-full"
            layoutId="activeIndicator"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}

        {/* Tooltip (optional, shown on hover) */}
        {description && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50">
            {description}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </motion.button>
    </Link>
  );
}

// ==================== Icon Helper ====================

/**
 * Get Lucide icon component by name
 */
function getIconComponent(iconName: string): React.ComponentType<any> | null {
  // Map of icon names to Lucide components
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
  };

  return iconMap[iconName] || null;
}
