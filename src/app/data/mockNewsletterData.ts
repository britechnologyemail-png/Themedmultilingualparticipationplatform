import type {
  NewsletterSubscriptionDTO,
  NewsletterCampaignDTO,
  NewsletterStatsDTO,
  NewsletterTopicType,
  LocalizedString,
} from '../types';

/**
 * Mock Newsletter Subscriptions Data
 */
export const mockNewsletterSubscriptions: NewsletterSubscriptionDTO[] = [
  {
    id: 'sub-001',
    email: 'marie.dupont@example.com',
    firstName: 'Marie',
    lastName: 'Dupont',
    userId: 'user-001',
    status: 'active',
    frequency: 'weekly',
    language: 'fr',
    topics: ['consultations', 'votes', 'results'],
    subscribedAt: '2025-11-15T10:30:00Z',
    lastEmailSentAt: '2026-02-01T08:00:00Z',
    emailsSent: 12,
    emailsOpened: 10,
    emailsClicked: 7,
    openRate: 83.3,
    clickRate: 58.3,
    source: 'website',
    metadata: {
      referrer: 'https://civiagora.ch/consultations'
    },
    createdAt: '2025-11-15T10:30:00Z',
    updatedAt: '2026-02-01T08:00:00Z'
  },
  {
    id: 'sub-002',
    email: 'jean.martin@example.com',
    firstName: 'Jean',
    lastName: 'Martin',
    userId: 'user-002',
    status: 'active',
    frequency: 'monthly',
    language: 'fr',
    topics: ['petitions', 'conferences', 'assemblies'],
    subscribedAt: '2025-12-01T14:20:00Z',
    lastEmailSentAt: '2026-01-01T08:00:00Z',
    emailsSent: 2,
    emailsOpened: 2,
    emailsClicked: 1,
    openRate: 100,
    clickRate: 50,
    source: 'website',
    createdAt: '2025-12-01T14:20:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    id: 'sub-003',
    email: 'anna.mueller@example.ch',
    firstName: 'Anna',
    lastName: 'Müller',
    status: 'active',
    frequency: 'weekly',
    language: 'de',
    topics: ['consultations', 'votes', 'assemblies', 'conferences'],
    subscribedAt: '2025-10-20T09:15:00Z',
    lastEmailSentAt: '2026-02-01T08:00:00Z',
    emailsSent: 15,
    emailsOpened: 13,
    emailsClicked: 9,
    openRate: 86.7,
    clickRate: 60,
    source: 'website',
    createdAt: '2025-10-20T09:15:00Z',
    updatedAt: '2026-02-01T08:00:00Z'
  },
  {
    id: 'sub-004',
    email: 'sarah.johnson@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    status: 'active',
    frequency: 'daily',
    language: 'en',
    topics: ['consultations', 'votes', 'petitions', 'results'],
    subscribedAt: '2025-11-30T16:45:00Z',
    lastEmailSentAt: '2026-02-03T08:00:00Z',
    emailsSent: 65,
    emailsOpened: 48,
    emailsClicked: 31,
    openRate: 73.8,
    clickRate: 47.7,
    source: 'admin',
    createdAt: '2025-11-30T16:45:00Z',
    updatedAt: '2026-02-03T08:00:00Z'
  },
  {
    id: 'sub-005',
    email: 'pierre.bernard@example.fr',
    firstName: 'Pierre',
    lastName: 'Bernard',
    userId: 'user-005',
    status: 'paused',
    frequency: 'weekly',
    language: 'fr',
    topics: ['votes', 'results'],
    subscribedAt: '2025-09-10T11:00:00Z',
    lastEmailSentAt: '2026-01-15T08:00:00Z',
    emailsSent: 18,
    emailsOpened: 12,
    emailsClicked: 5,
    openRate: 66.7,
    clickRate: 27.8,
    source: 'website',
    createdAt: '2025-09-10T11:00:00Z',
    updatedAt: '2026-01-20T10:30:00Z'
  },
  {
    id: 'sub-006',
    email: 'lukas.schmidt@example.de',
    firstName: 'Lukas',
    lastName: 'Schmidt',
    status: 'active',
    frequency: 'monthly',
    language: 'de',
    topics: ['consultations', 'petitions'],
    subscribedAt: '2025-12-15T13:30:00Z',
    lastEmailSentAt: '2026-01-01T08:00:00Z',
    emailsSent: 1,
    emailsOpened: 1,
    emailsClicked: 0,
    openRate: 100,
    clickRate: 0,
    source: 'website',
    createdAt: '2025-12-15T13:30:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    id: 'sub-007',
    email: 'clara.rossi@example.it',
    firstName: 'Clara',
    lastName: 'Rossi',
    status: 'active',
    frequency: 'weekly',
    language: 'fr',
    topics: ['consultations', 'assemblies', 'conferences', 'results'],
    subscribedAt: '2025-11-05T10:00:00Z',
    lastEmailSentAt: '2026-02-01T08:00:00Z',
    emailsSent: 13,
    emailsOpened: 11,
    emailsClicked: 8,
    openRate: 84.6,
    clickRate: 61.5,
    source: 'website',
    createdAt: '2025-11-05T10:00:00Z',
    updatedAt: '2026-02-01T08:00:00Z'
  },
  {
    id: 'sub-008',
    email: 'michael.brown@example.com',
    firstName: 'Michael',
    lastName: 'Brown',
    status: 'unsubscribed',
    frequency: 'weekly',
    language: 'en',
    topics: ['consultations'],
    subscribedAt: '2025-08-20T09:00:00Z',
    unsubscribedAt: '2026-01-10T14:20:00Z',
    lastEmailSentAt: '2026-01-08T08:00:00Z',
    emailsSent: 20,
    emailsOpened: 8,
    emailsClicked: 2,
    openRate: 40,
    clickRate: 10,
    source: 'import',
    createdAt: '2025-08-20T09:00:00Z',
    updatedAt: '2026-01-10T14:20:00Z'
  },
  {
    id: 'sub-009',
    email: 'sophie.laurent@example.fr',
    firstName: 'Sophie',
    lastName: 'Laurent',
    userId: 'user-009',
    status: 'active',
    frequency: 'daily',
    language: 'fr',
    topics: ['consultations', 'votes', 'petitions', 'assemblies', 'conferences', 'results', 'signalements', 'youth'],
    subscribedAt: '2025-10-01T08:30:00Z',
    lastEmailSentAt: '2026-02-03T08:00:00Z',
    emailsSent: 125,
    emailsOpened: 98,
    emailsClicked: 72,
    openRate: 78.4,
    clickRate: 57.6,
    source: 'website',
    createdAt: '2025-10-01T08:30:00Z',
    updatedAt: '2026-02-03T08:00:00Z'
  },
  {
    id: 'sub-010',
    email: 'thomas.weber@example.ch',
    firstName: 'Thomas',
    lastName: 'Weber',
    status: 'active',
    frequency: 'weekly',
    language: 'de',
    topics: ['votes', 'petitions', 'results'],
    subscribedAt: '2025-11-20T12:00:00Z',
    lastEmailSentAt: '2026-02-01T08:00:00Z',
    emailsSent: 11,
    emailsOpened: 9,
    emailsClicked: 6,
    openRate: 81.8,
    clickRate: 54.5,
    source: 'website',
    createdAt: '2025-11-20T12:00:00Z',
    updatedAt: '2026-02-01T08:00:00Z'
  },
  {
    id: 'sub-011',
    email: 'emma.taylor@example.uk',
    firstName: 'Emma',
    lastName: 'Taylor',
    status: 'active',
    frequency: 'monthly',
    language: 'en',
    topics: ['consultations', 'conferences'],
    subscribedAt: '2025-12-10T15:45:00Z',
    lastEmailSentAt: '2026-01-01T08:00:00Z',
    emailsSent: 1,
    emailsOpened: 0,
    emailsClicked: 0,
    openRate: 0,
    clickRate: 0,
    source: 'api',
    createdAt: '2025-12-10T15:45:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    id: 'sub-012',
    email: 'francois.dubois@example.fr',
    firstName: 'François',
    lastName: 'Dubois',
    userId: 'user-012',
    status: 'active',
    frequency: 'weekly',
    language: 'fr',
    topics: ['consultations', 'votes', 'assemblies'],
    subscribedAt: '2025-09-25T10:15:00Z',
    lastEmailSentAt: '2026-02-01T08:00:00Z',
    emailsSent: 19,
    emailsOpened: 16,
    emailsClicked: 11,
    openRate: 84.2,
    clickRate: 57.9,
    source: 'website',
    createdAt: '2025-09-25T10:15:00Z',
    updatedAt: '2026-02-01T08:00:00Z'
  }
];

/**
 * Mock Newsletter Campaigns Data
 */
export const mockNewsletterCampaigns: NewsletterCampaignDTO[] = [
  {
    id: 'camp-001',
    name: {
      fr: 'Newsletter Hebdomadaire - Semaine 5',
      de: 'Wöchentlicher Newsletter - Woche 5',
      en: 'Weekly Newsletter - Week 5'
    },
    subject: {
      fr: '🗳️ Nouvelles consultations & votes à venir cette semaine',
      de: '🗳️ Neue Konsultationen & Abstimmungen diese Woche',
      en: '🗳️ New consultations & votes this week'
    },
    preheader: {
      fr: 'Découvrez les 3 nouvelles consultations publiques et le référendum sur l\'aménagement urbain',
      de: 'Entdecken Sie die 3 neuen öffentlichen Konsultationen und das Referendum zur Stadtplanung',
      en: 'Discover 3 new public consultations and the referendum on urban planning'
    },
    content: {
      html: {
        fr: '<html><body><h1>Votre Newsletter Hebdomadaire</h1><p>Contenu HTML...</p></body></html>',
        de: '<html><body><h1>Ihr wöchentlicher Newsletter</h1><p>HTML-Inhalt...</p></body></html>',
        en: '<html><body><h1>Your Weekly Newsletter</h1><p>HTML content...</p></body></html>'
      },
      text: {
        fr: 'Votre Newsletter Hebdomadaire\n\nContenu texte...',
        de: 'Ihr wöchentlicher Newsletter\n\nTextinhalt...',
        en: 'Your Weekly Newsletter\n\nText content...'
      }
    },
    status: 'sent',
    scheduledFor: '2026-02-03T08:00:00Z',
    sentAt: '2026-02-03T08:00:12Z',
    targetAudience: {
      frequency: ['weekly'],
      status: ['active'],
      languages: ['fr', 'de', 'en']
    },
    stats: {
      totalRecipients: 8,
      totalSent: 8,
      totalDelivered: 8,
      totalBounced: 0,
      totalOpened: 6,
      totalClicked: 4,
      totalUnsubscribed: 0,
      openRate: 75,
      clickRate: 50,
      bounceRate: 0,
      unsubscribeRate: 0,
      topLinks: [
        { url: 'https://civiagora.ch/consultations/amenagement-urbain', clicks: 3 },
        { url: 'https://civiagora.ch/votes/referendum-2026', clicks: 2 }
      ],
      deviceStats: {
        desktop: 4,
        mobile: 3,
        tablet: 1
      }
    },
    template: 'tpl-weekly',
    themeIds: ['theme-001', 'theme-002'],
    createdBy: 'admin-001',
    createdAt: '2026-02-01T14:00:00Z',
    updatedAt: '2026-02-03T08:00:12Z'
  },
  {
    id: 'camp-002',
    name: {
      fr: 'Newsletter Mensuelle - Février 2026',
      de: 'Monatlicher Newsletter - Februar 2026',
      en: 'Monthly Newsletter - February 2026'
    },
    subject: {
      fr: '📊 Résultats de janvier & nouveaux projets participatifs',
      de: '📊 Ergebnisse vom Januar & neue partizipative Projekte',
      en: '📊 January results & new participatory projects'
    },
    content: {
      html: {
        fr: '<html><body><h1>Newsletter Mensuelle</h1><p>Contenu HTML...</p></body></html>',
        de: '<html><body><h1>Monatlicher Newsletter</h1><p>HTML-Inhalt...</p></body></html>',
        en: '<html><body><h1>Monthly Newsletter</h1><p>HTML content...</p></body></html>'
      },
      text: {
        fr: 'Newsletter Mensuelle\n\nContenu texte...',
        de: 'Monatlicher Newsletter\n\nTextinhalt...',
        en: 'Monthly Newsletter\n\nText content...'
      }
    },
    status: 'sent',
    scheduledFor: '2026-02-01T08:00:00Z',
    sentAt: '2026-02-01T08:00:08Z',
    targetAudience: {
      frequency: ['monthly'],
      status: ['active']
    },
    stats: {
      totalRecipients: 3,
      totalSent: 3,
      totalDelivered: 3,
      totalBounced: 0,
      totalOpened: 2,
      totalClicked: 1,
      totalUnsubscribed: 0,
      openRate: 66.7,
      clickRate: 33.3,
      bounceRate: 0,
      unsubscribeRate: 0
    },
    template: 'tpl-monthly',
    createdBy: 'admin-001',
    createdAt: '2026-01-28T10:00:00Z',
    updatedAt: '2026-02-01T08:00:08Z'
  },
  {
    id: 'camp-003',
    name: {
      fr: 'Campagne Spéciale - Référendum Climat',
      de: 'Sonderkampagne - Klima-Referendum',
      en: 'Special Campaign - Climate Referendum'
    },
    subject: {
      fr: '🌍 Votez pour le futur climatique de notre ville',
      de: '🌍 Stimmen Sie für die Klimazukunft unserer Stadt',
      en: '🌍 Vote for our city\'s climate future'
    },
    content: {
      html: {
        fr: '<html><body><h1>Référendum Climat</h1><p>Contenu HTML...</p></body></html>',
        de: '<html><body><h1>Klima-Referendum</h1><p>HTML-Inhalt...</p></body></html>',
        en: '<html><body><h1>Climate Referendum</h1><p>HTML content...</p></body></html>'
      },
      text: {
        fr: 'Référendum Climat\n\nContenu texte...',
        de: 'Klima-Referendum\n\nTextinhalt...',
        en: 'Climate Referendum\n\nText content...'
      }
    },
    status: 'scheduled',
    scheduledFor: '2026-02-10T08:00:00Z',
    targetAudience: {
      topics: ['votes'],
      status: ['active'],
      languages: ['fr', 'de', 'en']
    },
    stats: {
      totalRecipients: 10,
      totalSent: 0,
      totalDelivered: 0,
      totalBounced: 0,
      totalOpened: 0,
      totalClicked: 0,
      totalUnsubscribed: 0,
      openRate: 0,
      clickRate: 0,
      bounceRate: 0,
      unsubscribeRate: 0
    },
    template: 'tpl-special',
    themeIds: ['theme-003'],
    createdBy: 'admin-001',
    createdAt: '2026-02-02T16:30:00Z',
    updatedAt: '2026-02-02T16:30:00Z'
  },
  {
    id: 'camp-004',
    name: {
      fr: 'Newsletter Quotidienne - 3 Février',
      de: 'Täglicher Newsletter - 3. Februar',
      en: 'Daily Newsletter - February 3rd'
    },
    subject: {
      fr: '📰 Aujourd\'hui sur CiviAgora : 2 nouveaux projets',
      de: '📰 Heute auf CiviAgora: 2 neue Projekte',
      en: '📰 Today on CiviAgora: 2 new projects'
    },
    content: {
      html: {
        fr: '<html><body><h1>Newsletter Quotidienne</h1><p>Contenu HTML...</p></body></html>',
        de: '<html><body><h1>Täglicher Newsletter</h1><p>HTML-Inhalt...</p></body></html>',
        en: '<html><body><h1>Daily Newsletter</h1><p>HTML content...</p></body></html>'
      },
      text: {
        fr: 'Newsletter Quotidienne\n\nContenu texte...',
        de: 'Täglicher Newsletter\n\nTextinhalt...',
        en: 'Daily Newsletter\n\nText content...'
      }
    },
    status: 'sent',
    scheduledFor: '2026-02-03T08:00:00Z',
    sentAt: '2026-02-03T08:00:05Z',
    targetAudience: {
      frequency: ['daily'],
      status: ['active']
    },
    stats: {
      totalRecipients: 2,
      totalSent: 2,
      totalDelivered: 2,
      totalBounced: 0,
      totalOpened: 1,
      totalClicked: 1,
      totalUnsubscribed: 0,
      openRate: 50,
      clickRate: 50,
      bounceRate: 0,
      unsubscribeRate: 0
    },
    template: 'tpl-daily',
    createdBy: 'admin-001',
    createdAt: '2026-02-02T18:00:00Z',
    updatedAt: '2026-02-03T08:00:05Z'
  },
  {
    id: 'camp-005',
    name: {
      fr: 'Annonce - Nouvelle Conférence Climat',
      de: 'Ankündigung - Neue Klimakonferenz',
      en: 'Announcement - New Climate Conference'
    },
    subject: {
      fr: '🎤 Conférence sur l\'adaptation climatique - Inscrivez-vous',
      de: '🎤 Konferenz zur Klimaanpassung - Jetzt anmelden',
      en: '🎤 Climate Adaptation Conference - Register now'
    },
    content: {
      html: {
        fr: '<html><body><h1>Conférence Climat</h1><p>Contenu HTML...</p></body></html>',
        de: '<html><body><h1>Klimakonferenz</h1><p>HTML-Inhalt...</p></body></html>',
        en: '<html><body><h1>Climate Conference</h1><p>HTML content...</p></body></html>'
      },
      text: {
        fr: 'Conférence Climat\n\nContenu texte...',
        de: 'Klimakonferenz\n\nTextinhalt...',
        en: 'Climate Conference\n\nText content...'
      }
    },
    status: 'draft',
    targetAudience: {
      topics: ['conferences'],
      status: ['active']
    },
    stats: {
      totalRecipients: 0,
      totalSent: 0,
      totalDelivered: 0,
      totalBounced: 0,
      totalOpened: 0,
      totalClicked: 0,
      totalUnsubscribed: 0,
      openRate: 0,
      clickRate: 0,
      bounceRate: 0,
      unsubscribeRate: 0
    },
    template: 'tpl-announcement',
    themeIds: ['theme-003'],
    testRecipients: ['test@civiagora.ch'],
    createdBy: 'admin-001',
    createdAt: '2026-02-03T10:00:00Z',
    updatedAt: '2026-02-03T10:00:00Z'
  }
];

/**
 * Mock Newsletter Statistics Data
 */
export const mockNewsletterStats: NewsletterStatsDTO = {
  overview: {
    totalSubscribers: 12,
    activeSubscribers: 10,
    pausedSubscribers: 1,
    unsubscribedCount: 1,
    totalCampaigns: 5,
    campaignsSent: 3
  },
  growth: [
    { date: '2026-01-01', newSubscribers: 0, unsubscribers: 0, netGrowth: 0 },
    { date: '2026-01-08', newSubscribers: 1, unsubscribers: 0, netGrowth: 1 },
    { date: '2026-01-15', newSubscribers: 2, unsubscribers: 0, netGrowth: 2 },
    { date: '2026-01-22', newSubscribers: 0, unsubscribers: 1, netGrowth: -1 },
    { date: '2026-01-29', newSubscribers: 1, unsubscribers: 0, netGrowth: 1 }
  ],
  byFrequency: {
    daily: 2,
    weekly: 7,
    monthly: 3
  },
  byLanguage: {
    fr: 7,
    de: 3,
    en: 2
  },
  byTopic: [
    { topic: 'consultations', subscribers: 10 },
    { topic: 'votes', subscribers: 8 },
    { topic: 'results', subscribers: 6 },
    { topic: 'petitions', subscribers: 5 },
    { topic: 'assemblies', subscribers: 5 },
    { topic: 'conferences', subscribers: 4 },
    { topic: 'signalements', subscribers: 2 },
    { topic: 'youth', subscribers: 2 }
  ],
  engagement: {
    averageOpenRate: 72.5,
    averageClickRate: 48.3,
    mostEngagedSubscribers: [
      { email: 'marie.dupont@example.com', openRate: 83.3, clickRate: 58.3 },
      { email: 'anna.mueller@example.ch', openRate: 86.7, clickRate: 60 },
      { email: 'francois.dubois@example.fr', openRate: 84.2, clickRate: 57.9 }
    ]
  },
  recentCampaigns: [
    {
      id: 'camp-001',
      name: {
        fr: 'Newsletter Hebdomadaire - Semaine 5',
        de: 'Wöchentlicher Newsletter - Woche 5',
        en: 'Weekly Newsletter - Week 5'
      },
      sentAt: '2026-02-03T08:00:12Z',
      recipients: 8,
      openRate: 75,
      clickRate: 50
    },
    {
      id: 'camp-002',
      name: {
        fr: 'Newsletter Mensuelle - Février 2026',
        de: 'Monatlicher Newsletter - Februar 2026',
        en: 'Monthly Newsletter - February 2026'
      },
      sentAt: '2026-02-01T08:00:08Z',
      recipients: 3,
      openRate: 66.7,
      clickRate: 33.3
    },
    {
      id: 'camp-004',
      name: {
        fr: 'Newsletter Quotidienne - 3 Février',
        de: 'Täglicher Newsletter - 3. Februar',
        en: 'Daily Newsletter - February 3rd'
      },
      sentAt: '2026-02-03T08:00:05Z',
      recipients: 2,
      openRate: 50,
      clickRate: 50
    }
  ]
};

/**
 * Helper functions for newsletter topic labels
 */
export const getNewsletterTopicLabel = (topic: NewsletterTopicType): LocalizedString => {
  const labels: Record<NewsletterTopicType, LocalizedString> = {
    consultations: {
      fr: 'Concertations',
      de: 'Konsultationen',
      en: 'Consultations'
    },
    votes: {
      fr: 'Votes & Référendum',
      de: 'Abstimmungen & Referendum',
      en: 'Votes & Referendum'
    },
    petitions: {
      fr: 'Pétitions',
      de: 'Petitionen',
      en: 'Petitions'
    },
    assemblies: {
      fr: 'Assemblées',
      de: 'Versammlungen',
      en: 'Assemblies'
    },
    conferences: {
      fr: 'Conférences',
      de: 'Konferenzen',
      en: 'Conferences'
    },
    results: {
      fr: 'Résultats',
      de: 'Ergebnisse',
      en: 'Results'
    },
    signalements: {
      fr: 'Signalements',
      de: 'Meldungen',
      en: 'Reports'
    },
    youth: {
      fr: 'Jeunesse',
      de: 'Jugend',
      en: 'Youth'
    }
  };
  return labels[topic];
};