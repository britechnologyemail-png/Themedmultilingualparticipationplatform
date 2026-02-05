/**
 * Header Menu Mock Data
 * 
 * Mock data for the dynamic header menu system
 */

import type {
  HeaderMenuDataDTO,
  HeaderMenuConfigDTO,
  HeaderMenuItemDTO,
  HeaderMenuStatsDTO,
} from '../types';

// ==================== Mock Header Menu Items ====================

/**
 * Header Menu Items
 * 
 * IMPORTANT: By default, this is set to an empty array [] to allow testing
 * the "Create First Menu Item" button and starting from scratch.
 * 
 * To use pre-filled example data, replace the empty array with:
 * export const mockHeaderMenuItems: HeaderMenuItemDTO[] = [...EXAMPLE_HEADER_MENU_ITEMS];
 */
export const mockHeaderMenuItems: HeaderMenuItemDTO[] = [];

/**
 * Example Header Menu Items (for reference or quick setup)
 * 
 * These are pre-configured menu items that can be used as examples.
 * To use them, replace [] above with [...EXAMPLE_HEADER_MENU_ITEMS]
 */
export const EXAMPLE_HEADER_MENU_ITEMS: HeaderMenuItemDTO[] = [
  {
    id: 'header-item-001',
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
    showInHeader: true,
    description: {
      fr: 'Retour à la page d\'accueil',
      de: 'Zurück zur Startseite',
      en: 'Back to homepage',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'header-item-002',
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
    showInHeader: true,
    badge: {
      count: 5,
      label: {
        fr: 'Nouveautés',
        de: 'Neu',
        en: 'New',
      },
      color: 'bg-green-500',
    },
    description: {
      fr: 'Participez aux concertations publiques',
      de: 'Nehmen Sie an öffentlichen Konsultationen teil',
      en: 'Participate in public consultations',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'header-item-003',
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
    showInHeader: true,
    description: {
      fr: 'Découvrez les assemblées citoyennes',
      de: 'Entdecken Sie die Bürgerversammlungen',
      en: 'Discover citizen assemblies',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'header-item-004',
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
    showInHeader: true,
    badge: {
      count: 12,
      label: {
        fr: 'Actives',
        de: 'Aktiv',
        en: 'Active',
      },
      color: 'bg-orange-500',
    },
    description: {
      fr: 'Soutenez les pétitions citoyennes',
      de: 'Unterstützen Sie Bürgerpetitionen',
      en: 'Support citizen petitions',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'header-item-005',
    key: 'conferences',
    label: {
      fr: 'Conférences',
      de: 'Konferenzen',
      en: 'Conferences',
    },
    path: '/conferences',
    icon: {
      name: 'Video',
      activeColor: 'text-red-600',
      inactiveColor: 'text-gray-400',
      hoverColor: 'text-red-500',
    },
    order: 4,
    isActive: true,
    isVisible: true,
    showInHeader: true,
    description: {
      fr: 'Assistez aux conférences publiques',
      de: 'Nehmen Sie an öffentlichen Konferenzen teil',
      en: 'Attend public conferences',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'header-item-006',
    key: 'votes',
    label: {
      fr: 'Votes',
      de: 'Abstimmungen',
      en: 'Votes',
    },
    path: '/votes',
    icon: {
      name: 'Vote',
      activeColor: 'text-teal-600',
      inactiveColor: 'text-gray-400',
      hoverColor: 'text-teal-500',
    },
    order: 5,
    isActive: true,
    isVisible: true,
    showInHeader: true,
    badge: {
      count: 3,
      label: {
        fr: 'En cours',
        de: 'Laufend',
        en: 'Ongoing',
      },
      color: 'bg-teal-500',
    },
    description: {
      fr: 'Votez sur les décisions importantes',
      de: 'Stimmen Sie über wichtige Entscheidungen ab',
      en: 'Vote on important decisions',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z',
  },
  {
    id: 'header-item-007',
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
    showInHeader: true,
    description: {
      fr: 'Signalez un problème dans votre ville',
      de: 'Melden Sie ein Problem in Ihrer Stadt',
      en: 'Report an issue in your city',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'header-item-008',
    key: 'youth-space',
    label: {
      fr: 'Jeunesse',
      de: 'Jugend',
      en: 'Youth',
    },
    path: '/youth-space',
    icon: {
      name: 'Sparkles',
      activeColor: 'text-pink-600',
      inactiveColor: 'text-gray-400',
      hoverColor: 'text-pink-500',
    },
    order: 7,
    isActive: true,
    isVisible: true,
    showInHeader: true,
    badge: {
      count: 8,
      label: {
        fr: 'Populaire',
        de: 'Beliebt',
        en: 'Popular',
      },
      color: 'bg-pink-500',
    },
    description: {
      fr: 'Espace dédié aux jeunes citoyens',
      de: 'Bereich für junge Bürger',
      en: 'Space for young citizens',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z',
  },
  {
    id: 'header-item-009',
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
    showInHeader: true,
    description: {
      fr: 'Explorez les thèmes de participation',
      de: 'Erkunden Sie die Beteiligungsthemen',
      en: 'Explore participation themes',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// ==================== Mock Header Menu Configuration ====================

export const mockHeaderMenuConfig: HeaderMenuConfigDTO = {
  id: 'header-config-001',
  logo: {
    isVisible: true,
    altText: {
      fr: 'Logo CiviX - Démocratie participative',
      de: 'CiviX Logo - Partizipative Demokratie',
      en: 'CiviX Logo - Participatory Democracy',
    },
    width: 40,
    height: 40,
  },
  layout: {
    position: 'left', // logo on the left
    alignment: 'center', // menu items centered
    showIcons: true,
    showLabels: true,
    compactMode: false,
  },
  styling: {
    backgroundColor: 'bg-white',
    textColor: 'text-gray-700',
    hoverBackgroundColor: 'bg-blue-50',
    activeBackgroundColor: 'bg-blue-100',
    borderColor: 'border-gray-200',
  },
  behavior: {
    enableDropdowns: false,
    enableTooltips: true,
    animationEnabled: true,
    stickyHeader: true,
  },
  updatedAt: '2024-01-15T10:30:00Z',
  updatedBy: 'admin_user_001',
};

// ==================== Mock Header Menu Statistics ====================

export const mockHeaderMenuStats: HeaderMenuStatsDTO = {
  totalItems: 9,
  activeItems: 9,
  inactiveItems: 0,
  visibleItems: 9,
  clickStats: [
    {
      itemId: 'header-item-001',
      itemKey: 'home',
      totalClicks: 15420,
      last7Days: 842,
      last30Days: 3628,
    },
    {
      itemId: 'header-item-002',
      itemKey: 'consultations',
      totalClicks: 8932,
      last7Days: 524,
      last30Days: 2145,
    },
    {
      itemId: 'header-item-003',
      itemKey: 'assemblies',
      totalClicks: 5647,
      last7Days: 312,
      last30Days: 1287,
    },
    {
      itemId: 'header-item-004',
      itemKey: 'petitions',
      totalClicks: 12300,
      last7Days: 698,
      last30Days: 2845,
    },
    {
      itemId: 'header-item-005',
      itemKey: 'conferences',
      totalClicks: 4521,
      last7Days: 245,
      last30Days: 987,
    },
    {
      itemId: 'header-item-006',
      itemKey: 'votes',
      totalClicks: 9800,
      last7Days: 587,
      last30Days: 2398,
    },
    {
      itemId: 'header-item-007',
      itemKey: 'signalements',
      totalClicks: 7654,
      last7Days: 432,
      last30Days: 1765,
    },
    {
      itemId: 'header-item-008',
      itemKey: 'youth-space',
      totalClicks: 6789,
      last7Days: 389,
      last30Days: 1598,
    },
    {
      itemId: 'header-item-009',
      itemKey: 'themes',
      totalClicks: 3456,
      last7Days: 198,
      last30Days: 821,
    },
  ],
  mostPopularItems: [
    {
      id: 'header-item-001',
      key: 'home',
      label: {
        fr: 'Accueil',
        de: 'Startseite',
        en: 'Home',
      },
      clicks: 15420,
    },
    {
      id: 'header-item-004',
      key: 'petitions',
      label: {
        fr: 'Pétitions',
        de: 'Petitionen',
        en: 'Petitions',
      },
      clicks: 12300,
    },
    {
      id: 'header-item-006',
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

// ==================== Complete Header Menu Data ====================

export const mockHeaderMenuData: HeaderMenuDataDTO = {
  config: mockHeaderMenuConfig,
  items: mockHeaderMenuItems,
};

// ==================== Helper Functions ====================

/**
 * Get active and visible menu items for display in the header
 */
export function getActiveHeaderMenuItems(): HeaderMenuItemDTO[] {
  return mockHeaderMenuItems
    .filter((item) => item.isActive && item.isVisible && item.showInHeader)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get a menu item by ID
 */
export function getHeaderMenuItemById(id: string): HeaderMenuItemDTO | undefined {
  return mockHeaderMenuItems.find((item) => item.id === id);
}

/**
 * Get a menu item by key
 */
export function getHeaderMenuItemByKey(key: string): HeaderMenuItemDTO | undefined {
  return mockHeaderMenuItems.find((item) => item.key === key);
}

/**
 * Toggle menu item active state
 */
export function toggleHeaderMenuItemActive(id: string): HeaderMenuItemDTO | undefined {
  const item = mockHeaderMenuItems.find((item) => item.id === id);
  if (item) {
    item.isActive = !item.isActive;
    item.updatedAt = new Date().toISOString();
  }
  return item;
}

/**
 * Toggle menu item visibility
 */
export function toggleHeaderMenuItemVisibility(id: string): HeaderMenuItemDTO | undefined {
  const item = mockHeaderMenuItems.find((item) => item.id === id);
  if (item) {
    item.isVisible = !item.isVisible;
    item.updatedAt = new Date().toISOString();
  }
  return item;
}

/**
 * Update menu item order
 */
export function updateHeaderMenuItemOrder(id: string, newOrder: number): void {
  const item = mockHeaderMenuItems.find((item) => item.id === id);
  if (item) {
    item.order = newOrder;
    item.updatedAt = new Date().toISOString();
  }
}

/**
 * Update header menu configuration
 */
export function updateMockHeaderMenuConfig(
  updates: Partial<HeaderMenuConfigDTO>
): HeaderMenuConfigDTO {
  Object.assign(mockHeaderMenuConfig, updates, {
    updatedAt: new Date().toISOString(),
  });
  return mockHeaderMenuConfig;
}

/**
 * Get sorted menu items by order
 */
export function getSortedHeaderMenuItems(): HeaderMenuItemDTO[] {
  return [...mockHeaderMenuItems].sort((a, b) => a.order - b.order);
}

/**
 * Count menu items by status
 */
export function getHeaderMenuItemsCount(): {
  total: number;
  active: number;
  inactive: number;
  visible: number;
  hidden: number;
} {
  const total = mockHeaderMenuItems.length;
  const active = mockHeaderMenuItems.filter((item) => item.isActive).length;
  const inactive = total - active;
  const visible = mockHeaderMenuItems.filter((item) => item.isVisible).length;
  const hidden = total - visible;

  return { total, active, inactive, visible, hidden };
}