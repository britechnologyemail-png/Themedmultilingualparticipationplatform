/**
 * Sections Management - Mock Data
 * 
 * Mock data for the sections management system including configurations,
 * statistics, and complete section data with multilingual support (FR/DE/EN)
 */

import {
  SectionConfigDTO,
  SectionDTO,
  SectionsSummaryDTO,
  SectionKey,
  SectionStatus,
  LocalizedString,
} from '../types';

// ==================== Mock Section Configurations ====================

/**
 * Consultations Section Configuration
 */
export const mockConsultationsConfig: SectionConfigDTO = {
  id: 'section-config-consultations',
  key: 'consultations',
  status: 'active',
  visibility: {
    showInHeader: true,
    showInFooter: true,
    showInHomepage: true,
    showInSearch: true,
    requiresAuth: false,
  },
  display: {
    icon: 'MessageSquare',
    iconColor: 'text-green-600',
    backgroundColor: 'bg-green-50',
    order: 1,
    featured: true,
  },
  accessControl: {
    allowedRoles: ['citizen', 'moderator', 'admin', 'super_admin'],
    allowedAgeGroups: ['18+'],
    geoRestricted: false,
    allowedTerritories: [],
  },
  features: {
    enableComments: true,
    enableVoting: true,
    enableSharing: true,
    enableNotifications: true,
    enableAnalytics: true,
    enableModeration: true,
    enableExport: true,
  },
  metadata: {
    title: {
      fr: 'Concertations',
      de: 'Beratungen',
      en: 'Consultations',
    },
    description: {
      fr: 'Participez aux concertations publiques et donnez votre avis sur les projets de votre collectivité',
      de: 'Nehmen Sie an öffentlichen Beratungen teil und äußern Sie Ihre Meinung zu den Projekten Ihrer Gemeinde',
      en: 'Participate in public consultations and share your opinion on your community projects',
    },
    shortDescription: {
      fr: 'Débats et concertations citoyennes',
      de: 'Bürgerdebatten und -beratungen',
      en: 'Citizen debates and consultations',
    },
    keywords: {
      fr: 'concertation, débat public, participation citoyenne, avis',
      de: 'Beratung, öffentliche Debatte, Bürgerbeteiligung, Meinung',
      en: 'consultation, public debate, citizen participation, opinion',
    },
    helpUrl: {
      fr: '/aide/concertations',
      de: '/hilfe/beratungen',
      en: '/help/consultations',
    },
    tutorialUrl: {
      fr: '/tutoriel/concertations',
      de: '/tutorial/beratungen',
      en: '/tutorial/consultations',
    },
  },
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-02-05T10:00:00Z',
  updatedBy: 'admin-001',
};

/**
 * Assemblies Section Configuration
 */
export const mockAssembliesConfig: SectionConfigDTO = {
  id: 'section-config-assemblies',
  key: 'assemblies',
  status: 'active',
  visibility: {
    showInHeader: true,
    showInFooter: true,
    showInHomepage: true,
    showInSearch: true,
    requiresAuth: false,
  },
  display: {
    icon: 'Users',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-50',
    order: 2,
    featured: true,
  },
  accessControl: {
    allowedRoles: ['citizen', 'moderator', 'admin', 'super_admin'],
    allowedAgeGroups: ['18+'],
    geoRestricted: false,
    allowedTerritories: [],
  },
  features: {
    enableComments: true,
    enableVoting: false,
    enableSharing: true,
    enableNotifications: true,
    enableAnalytics: true,
    enableModeration: true,
    enableExport: true,
  },
  metadata: {
    title: {
      fr: 'Assemblées',
      de: 'Versammlungen',
      en: 'Assemblies',
    },
    description: {
      fr: 'Rejoignez les assemblées citoyennes et participez aux décisions collectives de votre territoire',
      de: 'Treten Sie Bürgerversammlungen bei und nehmen Sie an kollektiven Entscheidungen Ihres Gebiets teil',
      en: 'Join citizen assemblies and participate in collective decisions of your territory',
    },
    shortDescription: {
      fr: 'Assemblées et conseils citoyens',
      de: 'Bürgerversammlungen und -räte',
      en: 'Citizen assemblies and councils',
    },
    keywords: {
      fr: 'assemblée, conseil citoyen, démocratie participative, délibération',
      de: 'Versammlung, Bürgerrat, partizipative Demokratie, Beratung',
      en: 'assembly, citizen council, participatory democracy, deliberation',
    },
    helpUrl: {
      fr: '/aide/assemblees',
      de: '/hilfe/versammlungen',
      en: '/help/assemblies',
    },
    tutorialUrl: {
      fr: '/tutoriel/assemblees',
      de: '/tutorial/versammlungen',
      en: '/tutorial/assemblies',
    },
  },
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-02-05T10:00:00Z',
  updatedBy: 'admin-001',
};

/**
 * Petitions Section Configuration
 */
export const mockPetitionsConfig: SectionConfigDTO = {
  id: 'section-config-petitions',
  key: 'petitions',
  status: 'active',
  visibility: {
    showInHeader: true,
    showInFooter: true,
    showInHomepage: true,
    showInSearch: true,
    requiresAuth: false,
  },
  display: {
    icon: 'FileText',
    iconColor: 'text-orange-600',
    backgroundColor: 'bg-orange-50',
    order: 3,
    featured: true,
  },
  accessControl: {
    allowedRoles: ['citizen', 'moderator', 'admin', 'super_admin'],
    allowedAgeGroups: ['16+', '18+'],
    geoRestricted: false,
    allowedTerritories: [],
  },
  features: {
    enableComments: true,
    enableVoting: false,
    enableSharing: true,
    enableNotifications: true,
    enableAnalytics: true,
    enableModeration: true,
    enableExport: true,
  },
  metadata: {
    title: {
      fr: 'Pétitions',
      de: 'Petitionen',
      en: 'Petitions',
    },
    description: {
      fr: 'Signez et créez des pétitions pour faire entendre votre voix et mobiliser les citoyens',
      de: 'Unterzeichnen und erstellen Sie Petitionen, um Ihre Stimme zu erheben und Bürger zu mobilisieren',
      en: 'Sign and create petitions to make your voice heard and mobilize citizens',
    },
    shortDescription: {
      fr: 'Pétitions citoyennes',
      de: 'Bürgerpetitionen',
      en: 'Citizen petitions',
    },
    keywords: {
      fr: 'pétition, signature, mobilisation, revendication',
      de: 'Petition, Unterschrift, Mobilisierung, Forderung',
      en: 'petition, signature, mobilization, claim',
    },
    helpUrl: {
      fr: '/aide/petitions',
      de: '/hilfe/petitionen',
      en: '/help/petitions',
    },
    tutorialUrl: {
      fr: '/tutoriel/petitions',
      de: '/tutorial/petitionen',
      en: '/tutorial/petitions',
    },
  },
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-02-05T10:00:00Z',
  updatedBy: 'admin-001',
};

/**
 * Conferences Section Configuration
 */
export const mockConferencesConfig: SectionConfigDTO = {
  id: 'section-config-conferences',
  key: 'conferences',
  status: 'active',
  visibility: {
    showInHeader: true,
    showInFooter: true,
    showInHomepage: true,
    showInSearch: true,
    requiresAuth: false,
  },
  display: {
    icon: 'Video',
    iconColor: 'text-pink-600',
    backgroundColor: 'bg-pink-50',
    order: 4,
    featured: false,
  },
  accessControl: {
    allowedRoles: ['citizen', 'moderator', 'admin', 'super_admin'],
    allowedAgeGroups: ['all'],
    geoRestricted: false,
    allowedTerritories: [],
  },
  features: {
    enableComments: true,
    enableVoting: false,
    enableSharing: true,
    enableNotifications: true,
    enableAnalytics: true,
    enableModeration: false,
    enableExport: true,
  },
  metadata: {
    title: {
      fr: 'Conférences',
      de: 'Konferenzen',
      en: 'Conferences',
    },
    description: {
      fr: 'Assistez aux conférences publiques, webinaires et événements organisés par votre collectivité',
      de: 'Nehmen Sie an öffentlichen Konferenzen, Webinaren und Veranstaltungen Ihrer Gemeinde teil',
      en: 'Attend public conferences, webinars and events organized by your community',
    },
    shortDescription: {
      fr: 'Conférences et événements',
      de: 'Konferenzen und Veranstaltungen',
      en: 'Conferences and events',
    },
    keywords: {
      fr: 'conférence, webinaire, événement, rencontre publique',
      de: 'Konferenz, Webinar, Veranstaltung, öffentliches Treffen',
      en: 'conference, webinar, event, public meeting',
    },
    helpUrl: {
      fr: '/aide/conferences',
      de: '/hilfe/konferenzen',
      en: '/help/conferences',
    },
    tutorialUrl: {
      fr: '/tutoriel/conferences',
      de: '/tutorial/konferenzen',
      en: '/tutorial/conferences',
    },
  },
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-02-05T10:00:00Z',
  updatedBy: 'admin-001',
};

/**
 * Votes Section Configuration
 */
export const mockVotesConfig: SectionConfigDTO = {
  id: 'section-config-votes',
  key: 'votes',
  status: 'active',
  visibility: {
    showInHeader: true,
    showInFooter: true,
    showInHomepage: true,
    showInSearch: true,
    requiresAuth: true,
  },
  display: {
    icon: 'Vote',
    iconColor: 'text-red-600',
    backgroundColor: 'bg-red-50',
    order: 5,
    featured: true,
  },
  accessControl: {
    allowedRoles: ['citizen', 'moderator', 'admin', 'super_admin'],
    allowedAgeGroups: ['18+'],
    geoRestricted: true,
    allowedTerritories: ['territory-001', 'territory-002'],
  },
  features: {
    enableComments: false,
    enableVoting: true,
    enableSharing: false,
    enableNotifications: true,
    enableAnalytics: true,
    enableModeration: false,
    enableExport: true,
  },
  metadata: {
    title: {
      fr: 'Votes',
      de: 'Abstimmungen',
      en: 'Votes',
    },
    description: {
      fr: 'Votez sur les référendums, sondages et décisions importantes de votre collectivité',
      de: 'Stimmen Sie über Referenden, Umfragen und wichtige Entscheidungen Ihrer Gemeinde ab',
      en: 'Vote on referendums, polls and important decisions of your community',
    },
    shortDescription: {
      fr: 'Référendums et sondages',
      de: 'Referenden und Umfragen',
      en: 'Referendums and polls',
    },
    keywords: {
      fr: 'vote, référendum, sondage, scrutin, élection',
      de: 'Abstimmung, Referendum, Umfrage, Wahl',
      en: 'vote, referendum, poll, ballot, election',
    },
    helpUrl: {
      fr: '/aide/votes',
      de: '/hilfe/abstimmungen',
      en: '/help/votes',
    },
    tutorialUrl: {
      fr: '/tutoriel/votes',
      de: '/tutorial/abstimmungen',
      en: '/tutorial/votes',
    },
  },
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-02-05T10:00:00Z',
  updatedBy: 'admin-001',
};

/**
 * Signalements Section Configuration
 */
export const mockSignalementsConfig: SectionConfigDTO = {
  id: 'section-config-signalements',
  key: 'signalements',
  status: 'active',
  visibility: {
    showInHeader: true,
    showInFooter: true,
    showInHomepage: true,
    showInSearch: true,
    requiresAuth: false,
  },
  display: {
    icon: 'AlertCircle',
    iconColor: 'text-yellow-600',
    backgroundColor: 'bg-yellow-50',
    order: 6,
    featured: false,
  },
  accessControl: {
    allowedRoles: ['citizen', 'moderator', 'admin', 'super_admin'],
    allowedAgeGroups: ['all'],
    geoRestricted: false,
    allowedTerritories: [],
  },
  features: {
    enableComments: true,
    enableVoting: true,
    enableSharing: true,
    enableNotifications: true,
    enableAnalytics: true,
    enableModeration: true,
    enableExport: true,
  },
  metadata: {
    title: {
      fr: 'Signalements',
      de: 'Meldungen',
      en: 'Reports',
    },
    description: {
      fr: 'Signalez un problème dans votre ville : infrastructure, propreté, sécurité, environnement',
      de: 'Melden Sie ein Problem in Ihrer Stadt: Infrastruktur, Sauberkeit, Sicherheit, Umwelt',
      en: 'Report an issue in your city: infrastructure, cleanliness, safety, environment',
    },
    shortDescription: {
      fr: 'Signalements citoyens',
      de: 'Bürgermeldungen',
      en: 'Citizen reports',
    },
    keywords: {
      fr: 'signalement, problème, infrastructure, propreté, sécurité',
      de: 'Meldung, Problem, Infrastruktur, Sauberkeit, Sicherheit',
      en: 'report, issue, infrastructure, cleanliness, safety',
    },
    helpUrl: {
      fr: '/aide/signalements',
      de: '/hilfe/meldungen',
      en: '/help/reports',
    },
    tutorialUrl: {
      fr: '/tutoriel/signalements',
      de: '/tutorial/meldungen',
      en: '/tutorial/reports',
    },
  },
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-02-05T10:00:00Z',
  updatedBy: 'admin-001',
};

/**
 * Youth Section Configuration
 */
export const mockYouthConfig: SectionConfigDTO = {
  id: 'section-config-youth',
  key: 'youth',
  status: 'active',
  visibility: {
    showInHeader: true,
    showInFooter: true,
    showInHomepage: true,
    showInSearch: true,
    requiresAuth: false,
  },
  display: {
    icon: 'Sparkles',
    iconColor: 'text-pink-600',
    backgroundColor: 'bg-pink-50',
    order: 7,
    featured: true,
  },
  accessControl: {
    allowedRoles: ['citizen', 'moderator', 'admin', 'super_admin'],
    allowedAgeGroups: ['12-15', '16-18', '19-25'],
    geoRestricted: false,
    allowedTerritories: [],
  },
  features: {
    enableComments: true,
    enableVoting: true,
    enableSharing: true,
    enableNotifications: true,
    enableAnalytics: true,
    enableModeration: true,
    enableExport: false,
  },
  metadata: {
    title: {
      fr: 'Jeunesse',
      de: 'Jugend',
      en: 'Youth',
    },
    description: {
      fr: 'Espace dédié aux jeunes citoyens : sondages, débats et projets pour les 12-25 ans',
      de: 'Bereich für junge Bürger: Umfragen, Debatten und Projekte für 12- bis 25-Jährige',
      en: 'Space for young citizens: polls, debates and projects for 12-25 year olds',
    },
    shortDescription: {
      fr: 'Participation jeunesse',
      de: 'Jugendbeteiligung',
      en: 'Youth participation',
    },
    keywords: {
      fr: 'jeunesse, jeunes, ado, étudiant, participation jeune',
      de: 'Jugend, Jugendliche, Teenager, Student, Jugendbeteiligung',
      en: 'youth, young people, teenager, student, youth participation',
    },
    helpUrl: {
      fr: '/aide/jeunesse',
      de: '/hilfe/jugend',
      en: '/help/youth',
    },
    tutorialUrl: {
      fr: '/tutoriel/jeunesse',
      de: '/tutorial/jugend',
      en: '/tutorial/youth',
    },
  },
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-02-05T10:00:00Z',
  updatedBy: 'admin-001',
};

/**
 * Themes Section Configuration
 */
export const mockThemesConfig: SectionConfigDTO = {
  id: 'section-config-themes',
  key: 'themes',
  status: 'active',
  visibility: {
    showInHeader: true,
    showInFooter: true,
    showInHomepage: true,
    showInSearch: true,
    requiresAuth: false,
  },
  display: {
    icon: 'Tag',
    iconColor: 'text-indigo-600',
    backgroundColor: 'bg-indigo-50',
    order: 8,
    featured: false,
  },
  accessControl: {
    allowedRoles: ['citizen', 'moderator', 'admin', 'super_admin'],
    allowedAgeGroups: ['all'],
    geoRestricted: false,
    allowedTerritories: [],
  },
  features: {
    enableComments: false,
    enableVoting: false,
    enableSharing: true,
    enableNotifications: true,
    enableAnalytics: true,
    enableModeration: false,
    enableExport: false,
  },
  metadata: {
    title: {
      fr: 'Thèmes',
      de: 'Themen',
      en: 'Themes',
    },
    description: {
      fr: 'Explorez les thèmes de participation : éducation, environnement, transport, culture et plus',
      de: 'Erkunden Sie Beteiligungsthemen: Bildung, Umwelt, Verkehr, Kultur und mehr',
      en: 'Explore participation themes: education, environment, transport, culture and more',
    },
    shortDescription: {
      fr: 'Thèmes transversaux',
      de: 'Übergreifende Themen',
      en: 'Cross-cutting themes',
    },
    keywords: {
      fr: 'thème, catégorie, sujet, domaine, filtrage',
      de: 'Thema, Kategorie, Thema, Bereich, Filterung',
      en: 'theme, category, subject, domain, filtering',
    },
    helpUrl: {
      fr: '/aide/themes',
      de: '/hilfe/themen',
      en: '/help/themes',
    },
    tutorialUrl: {
      fr: '/tutoriel/themes',
      de: '/tutorial/themen',
      en: '/tutorial/themes',
    },
  },
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-02-05T10:00:00Z',
  updatedBy: 'admin-001',
};

// ==================== Mock Sections Data with Statistics ====================

/**
 * All Sections with Statistics
 */
export const mockSections: SectionDTO[] = [
  {
    config: mockConsultationsConfig,
    stats: {
      totalItems: 45,
      activeItems: 12,
      totalParticipants: 3542,
      totalViews: 25678,
      totalInteractions: 8934,
      last7Days: {
        views: 2345,
        interactions: 876,
        newItems: 3,
      },
      last30Days: {
        views: 9876,
        interactions: 3421,
        newItems: 8,
      },
    },
  },
  {
    config: mockAssembliesConfig,
    stats: {
      totalItems: 18,
      activeItems: 8,
      totalParticipants: 1245,
      totalViews: 8932,
      totalInteractions: 2134,
      last7Days: {
        views: 892,
        interactions: 245,
        newItems: 1,
      },
      last30Days: {
        views: 3456,
        interactions: 987,
        newItems: 3,
      },
    },
  },
  {
    config: mockPetitionsConfig,
    stats: {
      totalItems: 67,
      activeItems: 23,
      totalParticipants: 8934,
      totalViews: 45678,
      totalInteractions: 15234,
      last7Days: {
        views: 4567,
        interactions: 1876,
        newItems: 5,
      },
      last30Days: {
        views: 18765,
        interactions: 7234,
        newItems: 12,
      },
    },
  },
  {
    config: mockConferencesConfig,
    stats: {
      totalItems: 28,
      activeItems: 6,
      totalParticipants: 2134,
      totalViews: 12345,
      totalInteractions: 3456,
      last7Days: {
        views: 1234,
        interactions: 345,
        newItems: 2,
      },
      last30Days: {
        views: 5678,
        interactions: 1567,
        newItems: 4,
      },
    },
  },
  {
    config: mockVotesConfig,
    stats: {
      totalItems: 34,
      activeItems: 5,
      totalParticipants: 5678,
      totalViews: 23456,
      totalInteractions: 11234,
      last7Days: {
        views: 2345,
        interactions: 1123,
        newItems: 1,
      },
      last30Days: {
        views: 9876,
        interactions: 4567,
        newItems: 3,
      },
    },
  },
  {
    config: mockSignalementsConfig,
    stats: {
      totalItems: 142,
      activeItems: 45,
      totalParticipants: 4567,
      totalViews: 34567,
      totalInteractions: 12345,
      last7Days: {
        views: 3456,
        interactions: 1234,
        newItems: 12,
      },
      last30Days: {
        views: 14567,
        interactions: 5678,
        newItems: 38,
      },
    },
  },
  {
    config: mockYouthConfig,
    stats: {
      totalItems: 56,
      activeItems: 18,
      totalParticipants: 2345,
      totalViews: 18765,
      totalInteractions: 6789,
      last7Days: {
        views: 1876,
        interactions: 678,
        newItems: 4,
      },
      last30Days: {
        views: 7654,
        interactions: 2765,
        newItems: 10,
      },
    },
  },
  {
    config: mockThemesConfig,
    stats: {
      totalItems: 12,
      activeItems: 12,
      totalParticipants: 12456,
      totalViews: 56789,
      totalInteractions: 34567,
      last7Days: {
        views: 5678,
        interactions: 3456,
        newItems: 0,
      },
      last30Days: {
        views: 23456,
        interactions: 14567,
        newItems: 1,
      },
    },
  },
];

/**
 * Sections Summary
 */
export const mockSectionsSummary: SectionsSummaryDTO = {
  sections: mockSections,
  totalSections: mockSections.length,
  activeSections: mockSections.filter(s => s.config.status === 'active').length,
  inactiveSections: mockSections.filter(s => s.config.status === 'inactive').length,
  totalParticipants: mockSections.reduce((sum, s) => sum + s.stats.totalParticipants, 0),
  totalInteractions: mockSections.reduce((sum, s) => sum + s.stats.totalInteractions, 0),
  updatedAt: '2026-02-05T10:00:00Z',
};

// ==================== Helper Functions ====================

/**
 * Get section by key
 */
export function getSectionByKey(key: SectionKey): SectionDTO | undefined {
  return mockSections.find(s => s.config.key === key);
}

/**
 * Get active sections
 */
export function getActiveSections(): SectionDTO[] {
  return mockSections.filter(s => s.config.status === 'active');
}

/**
 * Get sections sorted by order
 */
export function getSectionsSortedByOrder(): SectionDTO[] {
  return [...mockSections].sort((a, b) => a.config.display.order - b.config.display.order);
}

/**
 * Get featured sections
 */
export function getFeaturedSections(): SectionDTO[] {
  return mockSections.filter(s => s.config.display.featured);
}

/**
 * Get sections visible in header
 */
export function getSectionsVisibleInHeader(): SectionDTO[] {
  return mockSections.filter(s => s.config.visibility.showInHeader);
}

/**
 * Get sections visible in footer
 */
export function getSectionsVisibleInFooter(): SectionDTO[] {
  return mockSections.filter(s => s.config.visibility.showInFooter);
}
