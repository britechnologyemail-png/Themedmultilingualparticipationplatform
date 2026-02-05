/**
 * Footer Menu Items
 * 
 * IMPORTANT: By default, this is set to an empty array [] to allow testing
 * the "Create First Menu Item" button and starting from scratch.
 * 
 * To use pre-filled example data, replace the empty array with:
 * export const mockFooterMenuItems: FooterMenuItemDTO[] = [...EXAMPLE_FOOTER_MENU_ITEMS];
 */

import type { FooterMenuItemDTO, FooterMenuConfigDTO, FooterMenuDataDTO, FooterMenuStatsDTO } from '../types';

/**
 * Footer Menu Configuration
 */
export const mockFooterMenuConfig: FooterMenuConfigDTO = {
  id: 'footer-config-001',
  maxItems: 10,
  allowIcons: true,
  allowBadges: true,
  defaultIconColor: 'text-gray-600',
  defaultActiveColor: 'text-blue-600',
  layout: 'horizontal',
  displayStyle: 'icons-and-labels',
  isEnabled: true,
  showLabels: true,
  showIcons: true,
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-02-05T10:00:00Z',
};

export const mockFooterMenuItems: FooterMenuItemDTO[] = [];

/**
 * Example Footer Menu Items (for reference or quick setup)
 * 
 * These are pre-configured menu items that can be used as examples.
 * To use them, uncomment the line above and replace [] with [...EXAMPLE_FOOTER_MENU_ITEMS]
 */
export const EXAMPLE_FOOTER_MENU_ITEMS: FooterMenuItemDTO[] = [
  {
    id: 'menu-item-001',
    key: 'home',
    label: {
      fr: 'Accueil',
      de: 'Startseite',
      en: 'Home',
    },
    path: '/',
    icon: {
      name: 'Home',
      activeColor: 'text-blue-600',
      inactiveColor: 'text-gray-400',
      hoverColor: 'text-blue-500',
    },
    order: 0,
    isActive: true,
    isVisible: true,
    showInFooter: true,
    description: {
      fr: 'Retour à la page d\'accueil',
      de: 'Zurück zur Startseite',
      en: 'Back to homepage',
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-05T10:00:00Z',
  },
  {
    id: 'menu-item-002',
    key: 'consultations',
    label: {
      fr: 'Concertations',
      de: 'Beratungen',
      en: 'Consultations',
    },
    path: '/consultations',
    icon: {
      name: 'MessageSquare',
      activeColor: 'text-green-600',
      inactiveColor: 'text-gray-400',
      hoverColor: 'text-green-500',
    },
    order: 1,
    isActive: true,
    isVisible: true,
    showInFooter: true,
    description: {
      fr: 'Participez aux concertations publiques',
      de: 'Nehmen Sie an öffentlichen Beratungen teil',
      en: 'Participate in public consultations',
    },
    badge: {
      count: 5,
      label: {
        fr: 'Nouveau',
        de: 'Neu',
        en: 'New',
      },
      color: 'bg-green-500',
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-05T10:00:00Z',
  },
  {
    id: 'menu-item-003',
    key: 'assemblies',
    label: {
      fr: 'Assemblées',
      de: 'Versammlungen',
      en: 'Assemblies',
    },
    path: '/assemblies',
    icon: {
      name: 'Users',
      activeColor: 'text-purple-600',
      inactiveColor: 'text-gray-400',
      hoverColor: 'text-purple-500',
    },
    order: 2,
    isActive: true,
    isVisible: true,
    showInFooter: true,
    description: {
      fr: 'Rejoignez les assemblées citoyennes',
      de: 'Treten Sie Bürgerversammlungen bei',
      en: 'Join citizen assemblies',
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-05T10:00:00Z',
  },
  {
    id: 'menu-item-004',
    key: 'petitions',
    label: {
      fr: 'Pétitions',
      de: 'Petitionen',
      en: 'Petitions',
    },
    path: '/petitions',
    icon: {
      name: 'FileText',
      activeColor: 'text-orange-600',
      inactiveColor: 'text-gray-400',
      hoverColor: 'text-orange-500',
    },
    order: 3,
    isActive: true,
    isVisible: true,
    showInFooter: true,
    description: {
      fr: 'Signez et créez des pétitions',
      de: 'Petitionen unterzeichnen und erstellen',
      en: 'Sign and create petitions',
    },
    badge: {
      count: 12,
      label: {
        fr: 'Actif',
        de: 'Aktiv',
        en: 'Active',
      },
      color: 'bg-orange-500',
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-05T10:00:00Z',
  },
  {
    id: 'menu-item-005',
    key: 'conferences',
    label: {
      fr: 'Conférences',
      de: 'Konferenzen',
      en: 'Conferences',
    },
    path: '/conferences',
    icon: {
      name: 'Video',
      activeColor: 'text-pink-600',
      inactiveColor: 'text-gray-400',
      hoverColor: 'text-pink-500',
    },
    order: 4,
    isActive: true,
    isVisible: true,
    showInFooter: true,
    description: {
      fr: 'Assistez aux conférences publiques',
      de: 'Nehmen Sie an öffentlichen Konferenzen teil',
      en: 'Attend public conferences',
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-05T10:00:00Z',
  },
  {
    id: 'menu-item-006',
    key: 'votes',
    label: {
      fr: 'Votes',
      de: 'Abstimmungen',
      en: 'Votes',
    },
    path: '/votes',
    icon: {
      name: 'Vote',
      activeColor: 'text-red-600',
      inactiveColor: 'text-gray-400',
      hoverColor: 'text-red-500',
    },
    order: 5,
    isActive: true,
    isVisible: true,
    showInFooter: true,
    description: {
      fr: 'Votez sur les référendums et sondages',
      de: 'Abstimmen über Referenden und Umfragen',
      en: 'Vote on referendums and polls',
    },
    badge: {
      count: 3,
      label: {
        fr: 'En cours',
        de: 'Laufend',
        en: 'Ongoing',
      },
      color: 'bg-red-500',
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-05T10:00:00Z',
  },
  {
    id: 'menu-item-007',
    key: 'signalements',
    label: {
      fr: 'Signalements',
      de: 'Meldungen',
      en: 'Reports',
    },
    path: '/signalements',
    icon: {
      name: 'AlertCircle',
      activeColor: 'text-yellow-600',
      inactiveColor: 'text-gray-400',
      hoverColor: 'text-yellow-500',
    },
    order: 6,
    isActive: true,
    isVisible: true,
    showInFooter: true,
    description: {
      fr: 'Signalez les problèmes dans votre commune',
      de: 'Melden Sie Probleme in Ihrer Gemeinde',
      en: 'Report issues in your municipality',
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-05T10:00:00Z',
  },
  {
    id: 'menu-item-008',
    key: 'youth',
    label: {
      fr: '🌟 Espace Jeunesse',
      de: '🌟 Jugendraum',
      en: '🌟 Youth Space',
    },
    path: '/youth-space',
    icon: {
      name: 'Sparkles',
      activeColor: 'text-teal-600',
      inactiveColor: 'text-gray-400',
      hoverColor: 'text-teal-500',
    },
    order: 7,
    isActive: true,
    isVisible: true,
    showInFooter: true,
    description: {
      fr: 'Espace dédié aux jeunes citoyens',
      de: 'Raum für junge Bürger',
      en: 'Space dedicated to young citizens',
    },
    badge: {
      count: 8,
      label: {
        fr: 'Populaire',
        de: 'Beliebt',
        en: 'Popular',
      },
      color: 'bg-teal-500',
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-05T10:00:00Z',
  },
  {
    id: 'menu-item-009',
    key: 'themes',
    label: {
      fr: 'Thèmes',
      de: 'Themen',
      en: 'Themes',
    },
    path: '/themes',
    icon: {
      name: 'Tag',
      activeColor: 'text-indigo-600',
      inactiveColor: 'text-gray-400',
      hoverColor: 'text-indigo-500',
    },
    order: 8,
    isActive: true,
    isVisible: true,
    showInFooter: true,
    description: {
      fr: 'Explorez par thématiques',
      de: 'Nach Themen erkunden',
      en: 'Explore by topics',
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-05T10:00:00Z',
  },
];

/**
 * Complete Footer Menu Data
 */
export const mockFooterMenuData: FooterMenuDataDTO = {
  config: mockFooterMenuConfig,
  items: mockFooterMenuItems,
};

/**
 * Footer Menu Statistics
 */
export const mockFooterMenuStats: FooterMenuStatsDTO = {
  totalItems: 9,
  activeItems: 9,
  inactiveItems: 0,
  visibleItems: 9,
  clickStats: [
    {
      itemId: 'menu-item-001',
      itemKey: 'home',
      totalClicks: 15420,
      last7Days: 1240,
      last30Days: 5320,
    },
    {
      itemId: 'menu-item-002',
      itemKey: 'consultations',
      totalClicks: 8750,
      last7Days: 720,
      last30Days: 3100,
    },
    {
      itemId: 'menu-item-003',
      itemKey: 'assemblies',
      totalClicks: 6200,
      last7Days: 450,
      last30Days: 2050,
    },
    {
      itemId: 'menu-item-004',
      itemKey: 'petitions',
      totalClicks: 12300,
      last7Days: 980,
      last30Days: 4250,
    },
    {
      itemId: 'menu-item-005',
      itemKey: 'conferences',
      totalClicks: 4100,
      last7Days: 320,
      last30Days: 1450,
    },
    {
      itemId: 'menu-item-006',
      itemKey: 'votes',
      totalClicks: 9800,
      last7Days: 850,
      last30Days: 3600,
    },
    {
      itemId: 'menu-item-007',
      itemKey: 'signalements',
      totalClicks: 5600,
      last7Days: 420,
      last30Days: 1920,
    },
    {
      itemId: 'menu-item-008',
      itemKey: 'youth',
      totalClicks: 7200,
      last7Days: 650,
      last30Days: 2800,
    },
    {
      itemId: 'menu-item-009',
      itemKey: 'themes',
      totalClicks: 5900,
      last7Days: 480,
      last30Days: 2150,
    },
  ],
  mostPopularItems: [
    {
      id: 'menu-item-001',
      key: 'home',
      label: {
        fr: 'Accueil',
        de: 'Startseite',
        en: 'Home',
      },
      clicks: 15420,
    },
    {
      id: 'menu-item-004',
      key: 'petitions',
      label: {
        fr: 'Pétitions',
        de: 'Petitionen',
        en: 'Petitions',
      },
      clicks: 12300,
    },
    {
      id: 'menu-item-006',
      key: 'votes',
      label: {
        fr: 'Votes',
        de: 'Abstimmungen',
        en: 'Votes',
      },
      clicks: 9800,
    },
  ],
};

// ==================== Helper Functions ====================

/**
 * Get active and visible menu items sorted by order
 */
export function getActiveFooterMenuItems(): FooterMenuItemDTO[] {
  return mockFooterMenuItems
    .filter(item => item.isActive && item.isVisible && item.showInFooter)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get menu item by key
 */
export function getFooterMenuItemByKey(key: string): FooterMenuItemDTO | undefined {
  return mockFooterMenuItems.find(item => item.key === key);
}

/**
 * Get menu item by ID
 */
export function getFooterMenuItemById(id: string): FooterMenuItemDTO | undefined {
  return mockFooterMenuItems.find(item => item.id === id);
}

/**
 * Toggle menu item active state
 */
export function toggleFooterMenuItemActive(id: string): FooterMenuItemDTO | undefined {
  const item = mockFooterMenuItems.find(item => item.id === id);
  if (item) {
    item.isActive = !item.isActive;
    item.updatedAt = new Date().toISOString();
  }
  return item;
}

/**
 * Toggle menu item visibility
 */
export function toggleFooterMenuItemVisibility(id: string): FooterMenuItemDTO | undefined {
  const item = mockFooterMenuItems.find(item => item.id === id);
  if (item) {
    item.isVisible = !item.isVisible;
    item.updatedAt = new Date().toISOString();
  }
  return item;
}

/**
 * Update menu item order
 */
export function updateFooterMenuItemOrder(id: string, newOrder: number): FooterMenuItemDTO | undefined {
  const item = mockFooterMenuItems.find(item => item.id === id);
  if (item) {
    item.order = newOrder;
    item.updatedAt = new Date().toISOString();
  }
  return item;
}

/**
 * Update menu configuration
 */
export function updateFooterMenuConfig(updates: Partial<FooterMenuConfigDTO>): FooterMenuConfigDTO {
  Object.assign(mockFooterMenuConfig, updates);
  mockFooterMenuConfig.updatedAt = new Date().toISOString();
  return mockFooterMenuConfig;
}
