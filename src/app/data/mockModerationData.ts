/**
 * CiviAgora Platform - Mock Moderation Data
 * 
 * Mock data for the moderation system including moderation items,
 * statistics, rules, and user reports.
 */

import type {
  ModerationItemDTO,
  ModerationStatsDTO,
  ModerationRuleDTO,
  UserReportDTO
} from '../types';

// ==================== Mock Moderation Items ====================

export const mockModerationItems: ModerationItemDTO[] = [
  {
    id: 'mod_001',
    contentType: 'proposal',
    contentId: 'prop_001',
    processId: 'cons_004',
    processTitle: {
      fr: 'Plan climat 2030',
      de: 'Klimaplan 2030',
      en: 'Climate Plan 2030'
    },
    author: {
      id: 'user_001',
      name: 'Marie Dubois',
      email: 'marie.dubois@email.ch',
      avatar: 'https://i.pravatar.cc/150?img=5',
      reputation: 92,
      warningsCount: 0
    },
    content: {
      title: {
        fr: 'Amélioration des pistes cyclables',
        de: 'Verbesserung der Radwege',
        en: 'Improvement of bicycle lanes'
      },
      text: {
        fr: 'Je propose d\'améliorer les pistes cyclables en ajoutant des protections physiques sur les axes principaux. Cela permettrait de sécuriser les trajets quotidiens et d\'encourager davantage de citoyens à utiliser le vélo comme moyen de transport principal.',
        de: 'Ich schlage vor, die Radwege durch Hinzufügen physischer Schutzvorrichtungen auf den Hauptachsen zu verbessern. Dies würde tägliche Fahrten sicherer machen und mehr Bürger ermutigen, das Fahrrad als Hauptverkehrsmittel zu nutzen.',
        en: 'I propose improving bicycle lanes by adding physical protection on main routes. This would make daily commutes safer and encourage more citizens to use bicycles as their main mode of transportation.'
      }
    },
    status: 'pending',
    priority: 'high',
    themeId: 'theme_001',
    automatedFlags: [],
    reportsCount: 0,
    moderationHistory: [],
    createdAt: '2026-01-13T10:30:00Z',
    submittedAt: '2026-01-13T10:30:00Z',
    dueDate: '2026-01-14T10:30:00Z'
  },
  {
    id: 'mod_002',
    contentType: 'comment',
    contentId: 'comment_002',
    processId: 'cons_002',
    processTitle: {
      fr: 'Aménagement centre-ville',
      de: 'Stadtzentrum-Gestaltung',
      en: 'City center development'
    },
    author: {
      id: 'user_002',
      name: 'Pierre Leroy',
      email: 'pierre.leroy@email.ch',
      reputation: 78,
      warningsCount: 1
    },
    content: {
      text: {
        fr: 'Le projet de parc urbain est une excellente initiative. J\'aimerais suggérer d\'y inclure des espaces de jardinage partagé pour renforcer le lien social et permettre aux citoyens de cultiver leurs propres légumes.',
        de: 'Das Stadtparkprojekt ist eine hervorragende Initiative. Ich würde vorschlagen, Gemeinschaftsgartenbereiche einzubeziehen, um soziale Bindungen zu stärken und den Bürgern zu ermöglichen, ihr eigenes Gemüse anzubauen.',
        en: 'The urban park project is an excellent initiative. I would like to suggest including shared gardening spaces to strengthen social bonds and allow citizens to grow their own vegetables.'
      }
    },
    status: 'pending',
    priority: 'medium',
    themeId: 'theme_003',
    automatedFlags: [],
    reportsCount: 0,
    moderationHistory: [],
    createdAt: '2026-01-13T09:15:00Z',
    submittedAt: '2026-01-13T09:15:00Z',
    dueDate: '2026-01-14T09:15:00Z'
  },
  {
    id: 'mod_003',
    contentType: 'comment',
    contentId: 'comment_003',
    processId: 'pet_002',
    processTitle: {
      fr: 'Pétition pour plus d\'espaces verts',
      de: 'Petition für mehr Grünflächen',
      en: 'Petition for more green spaces'
    },
    author: {
      id: 'user_003',
      name: 'Jean Martin',
      email: 'jean.martin@email.ch',
      reputation: 45,
      warningsCount: 2
    },
    content: {
      text: {
        fr: 'Contenu inapproprié et non constructif avec des propos offensants.',
        de: 'Unangemessener und nicht konstruktiver Inhalt mit beleidigenden Äußerungen.',
        en: 'Inappropriate and non-constructive content with offensive statements.'
      }
    },
    status: 'flagged',
    priority: 'urgent',
    themeId: 'theme_003',
    automatedFlags: [
      {
        ruleId: 'rule_001',
        ruleName: {
          fr: 'Détection de langage offensant',
          de: 'Erkennung beleidigender Sprache',
          en: 'Offensive language detection'
        },
        confidence: 87,
        reason: {
          fr: 'Contient des termes potentiellement offensants',
          de: 'Enthält potenziell beleidigende Begriffe',
          en: 'Contains potentially offensive terms'
        }
      }
    ],
    reportsCount: 3,
    moderationHistory: [],
    createdAt: '2026-01-13T08:45:00Z',
    submittedAt: '2026-01-13T08:45:00Z',
    dueDate: '2026-01-13T14:45:00Z'
  },
  {
    id: 'mod_004',
    contentType: 'proposal',
    contentId: 'prop_004',
    processId: 'cons_005',
    processTitle: {
      fr: 'Budget participatif 2027',
      de: 'Partizipatives Budget 2027',
      en: 'Participatory budget 2027'
    },
    author: {
      id: 'user_004',
      name: 'Claire Bernard',
      email: 'claire.bernard@email.ch',
      reputation: 88,
      warningsCount: 0
    },
    content: {
      title: {
        fr: 'Extension des horaires des bibliothèques',
        de: 'Erweiterung der Bibliotheksöffnungszeiten',
        en: 'Extension of library hours'
      },
      text: {
        fr: 'Les horaires d\'ouverture des bibliothèques devraient être étendus le week-end pour mieux servir les familles et les étudiants. Je propose une ouverture de 9h à 20h le samedi et de 10h à 18h le dimanche.',
        de: 'Die Öffnungszeiten der Bibliotheken sollten am Wochenende erweitert werden, um Familien und Studenten besser zu bedienen. Ich schlage eine Öffnung von 9-20 Uhr samstags und 10-18 Uhr sonntags vor.',
        en: 'Library opening hours should be extended on weekends to better serve families and students. I propose opening from 9am to 8pm on Saturdays and 10am to 6pm on Sundays.'
      }
    },
    status: 'approved',
    priority: 'low',
    themeId: 'theme_006',
    automatedFlags: [],
    reportsCount: 0,
    moderationHistory: [
      {
        id: 'hist_001',
        moderatorId: 'mod_001',
        moderatorName: 'Sophie Martin',
        action: 'approve',
        previousStatus: 'pending',
        newStatus: 'approved',
        comment: 'Proposition constructive et bien argumentée',
        performedAt: '2026-01-12T14:20:00Z'
      }
    ],
    createdAt: '2026-01-12T11:45:00Z',
    submittedAt: '2026-01-12T11:45:00Z',
    moderatedAt: '2026-01-12T14:20:00Z'
  },
  {
    id: 'mod_005',
    contentType: 'comment',
    contentId: 'comment_005',
    processId: 'cons_003',
    processTitle: {
      fr: 'Mobilité douce',
      de: 'Sanfte Mobilität',
      en: 'Soft mobility'
    },
    author: {
      id: 'user_005',
      name: 'Sophie Petit',
      email: 'sophie.petit@email.ch',
      reputation: 34,
      warningsCount: 4
    },
    content: {
      text: {
        fr: 'C\'est n\'importe quoi ce projet !!! Personne n\'utilisera ces pistes cyclables inutiles',
        de: 'Dieses Projekt ist kompletter Unsinn!!! Niemand wird diese nutzlosen Radwege nutzen',
        en: 'This project is nonsense!!! Nobody will use these useless bike lanes'
      }
    },
    status: 'rejected',
    priority: 'high',
    themeId: 'theme_001',
    automatedFlags: [
      {
        ruleId: 'rule_002',
        ruleName: {
          fr: 'Contenu non constructif',
          de: 'Nicht konstruktiver Inhalt',
          en: 'Non-constructive content'
        },
        confidence: 92,
        reason: {
          fr: 'Ton agressif et absence d\'argumentation',
          de: 'Aggressiver Ton und fehlende Argumentation',
          en: 'Aggressive tone and lack of argumentation'
        }
      }
    ],
    reportsCount: 2,
    moderationHistory: [
      {
        id: 'hist_002',
        moderatorId: 'mod_002',
        moderatorName: 'Marc Dubois',
        action: 'reject',
        previousStatus: 'flagged',
        newStatus: 'rejected',
        reason: {
          fr: 'Contenu ne respectant pas la charte de participation citoyenne',
          de: 'Inhalt entspricht nicht der Bürgerbeteiligungscharta',
          en: 'Content does not comply with citizen participation charter'
        },
        comment: 'Ton non constructif et absence d\'argumentation factuelle',
        performedAt: '2026-01-12T15:30:00Z'
      }
    ],
    createdAt: '2026-01-12T13:00:00Z',
    submittedAt: '2026-01-12T13:00:00Z',
    moderatedAt: '2026-01-12T15:30:00Z'
  },
  {
    id: 'mod_006',
    contentType: 'petition',
    contentId: 'pet_006',
    author: {
      id: 'user_006',
      name: 'Lucas Moreau',
      email: 'lucas.moreau@email.ch',
      reputation: 95,
      warningsCount: 0
    },
    content: {
      title: {
        fr: 'Installation de bornes de recharge électrique',
        de: 'Installation von Elektroladestationen',
        en: 'Installation of electric charging stations'
      },
      text: {
        fr: 'Il faudrait installer plus de bornes de recharge électrique dans les parkings publics pour encourager la mobilité verte et faciliter la transition vers les véhicules électriques.',
        de: 'Es sollten mehr Elektroladestationen in öffentlichen Parkplätzen installiert werden, um grüne Mobilität zu fördern und den Übergang zu Elektrofahrzeugen zu erleichtern.',
        en: 'More electric charging stations should be installed in public parking lots to encourage green mobility and facilitate the transition to electric vehicles.'
      }
    },
    status: 'approved',
    priority: 'medium',
    themeId: 'theme_003',
    automatedFlags: [],
    reportsCount: 0,
    moderationHistory: [
      {
        id: 'hist_003',
        moderatorId: 'mod_001',
        moderatorName: 'Sophie Martin',
        action: 'approve',
        previousStatus: 'pending',
        newStatus: 'approved',
        performedAt: '2026-01-11T16:45:00Z'
      }
    ],
    createdAt: '2026-01-11T14:30:00Z',
    submittedAt: '2026-01-11T14:30:00Z',
    moderatedAt: '2026-01-11T16:45:00Z'
  },
  {
    id: 'mod_007',
    contentType: 'annotation',
    contentId: 'ann_007',
    processId: 'leg_cons_001',
    processTitle: {
      fr: 'Loi sur la protection des données - Consultation',
      de: 'Datenschutzgesetz - Konsultation',
      en: 'Data Protection Act - Consultation'
    },
    author: {
      id: 'user_007',
      name: 'Emma Rousseau',
      email: 'emma.rousseau@email.ch',
      reputation: 82,
      warningsCount: 0
    },
    content: {
      text: {
        fr: 'L\'article 3 devrait inclure une clause spécifique pour la protection des données des mineurs, avec des mécanismes de consentement parental renforcés.',
        de: 'Artikel 3 sollte eine spezifische Klausel zum Schutz der Daten von Minderjährigen enthalten, mit verstärkten Mechanismen für die elterliche Zustimmung.',
        en: 'Article 3 should include a specific clause for the protection of minors\' data, with reinforced parental consent mechanisms.'
      }
    },
    status: 'pending',
    priority: 'medium',
    themeId: 'theme_008',
    automatedFlags: [],
    reportsCount: 0,
    moderationHistory: [],
    createdAt: '2026-01-13T07:20:00Z',
    submittedAt: '2026-01-13T07:20:00Z',
    dueDate: '2026-01-14T07:20:00Z'
  },
  {
    id: 'mod_008',
    contentType: 'signalement',
    contentId: 'sig_008',
    author: {
      id: 'user_008',
      name: 'Thomas Blanc',
      email: 'thomas.blanc@email.ch',
      reputation: 91,
      warningsCount: 0
    },
    content: {
      title: {
        fr: 'Sécurité aux abords des écoles',
        de: 'Sicherheit in Schulnähe',
        en: 'Safety near schools'
      },
      text: {
        fr: 'La sécurité aux abords des écoles doit être renforcée avec des zones 30 et plus de passages piétons. J\'ai constaté plusieurs situations dangereuses le matin lors de la dépose des enfants.',
        de: 'Die Sicherheit in Schulnähe muss mit Tempo-30-Zonen und mehr Fußgängerüberwegen verstärkt werden. Ich habe mehrere gefährliche Situationen morgens beim Absetzen der Kinder beobachtet.',
        en: 'Safety near schools must be reinforced with 30 km/h zones and more pedestrian crossings. I have observed several dangerous situations in the morning during school drop-off.'
      }
    },
    status: 'escalated',
    priority: 'urgent',
    themeId: 'theme_001',
    automatedFlags: [
      {
        ruleId: 'rule_003',
        ruleName: {
          fr: 'Signalement prioritaire - sécurité',
          de: 'Prioritätsmeldung - Sicherheit',
          en: 'Priority report - safety'
        },
        confidence: 95,
        reason: {
          fr: 'Signalement concernant la sécurité des enfants',
          de: 'Meldung bezüglich Kindersicherheit',
          en: 'Report regarding children\'s safety'
        }
      }
    ],
    reportsCount: 0,
    moderationHistory: [
      {
        id: 'hist_004',
        moderatorId: 'mod_001',
        moderatorName: 'Sophie Martin',
        action: 'escalate',
        previousStatus: 'pending',
        newStatus: 'escalated',
        comment: 'Signalement urgent concernant la sécurité des enfants - transmission au service de la mobilité',
        performedAt: '2026-01-13T06:15:00Z'
      }
    ],
    assignedTo: {
      id: 'admin_001',
      name: 'Direction de la mobilité'
    },
    createdAt: '2026-01-13T05:45:00Z',
    submittedAt: '2026-01-13T05:45:00Z',
    moderatedAt: '2026-01-13T06:15:00Z',
    dueDate: '2026-01-13T11:45:00Z'
  },
  {
    id: 'mod_009',
    contentType: 'proposal',
    contentId: 'prop_009',
    processId: 'cons_007',
    processTitle: {
      fr: 'Développement culturel 2026',
      de: 'Kulturelle Entwicklung 2026',
      en: 'Cultural Development 2026'
    },
    author: {
      id: 'user_009',
      name: 'Antoine Leroux',
      email: 'antoine.leroux@email.ch',
      reputation: 76,
      warningsCount: 0
    },
    content: {
      title: {
        fr: 'Création d\'un festival de musique en plein air',
        de: 'Schaffung eines Freiluft-Musikfestivals',
        en: 'Creation of an outdoor music festival'
      },
      text: {
        fr: 'Je propose la création d\'un festival de musique en plein air annuel pour dynamiser la vie culturelle locale et attirer des visiteurs. Cela pourrait se tenir dans le parc central avec des scènes multiples.',
        de: 'Ich schlage die Schaffung eines jährlichen Freiluft-Musikfestivals vor, um das lokale Kulturleben zu beleben und Besucher anzuziehen. Es könnte im Zentralpark mit mehreren Bühnen stattfinden.',
        en: 'I propose the creation of an annual outdoor music festival to boost local cultural life and attract visitors. This could be held in the central park with multiple stages.'
      }
    },
    status: 'pending',
    priority: 'low',
    themeId: 'theme_006',
    automatedFlags: [],
    reportsCount: 0,
    moderationHistory: [],
    createdAt: '2026-01-13T06:10:00Z',
    submittedAt: '2026-01-13T06:10:00Z',
    dueDate: '2026-01-15T06:10:00Z'
  },
  {
    id: 'mod_010',
    contentType: 'comment',
    contentId: 'comment_010',
    processId: 'vote_003',
    processTitle: {
      fr: 'Vote sur le budget 2027',
      de: 'Abstimmung zum Budget 2027',
      en: 'Vote on 2027 budget'
    },
    author: {
      id: 'user_010',
      name: 'Isabelle Moreau',
      email: 'isabelle.moreau@email.ch',
      reputation: 91,
      warningsCount: 0
    },
    content: {
      text: {
        fr: 'Je suis favorable à l\'augmentation du budget pour l\'éducation, mais je pense qu\'il faudrait également prévoir des investissements dans la formation continue des enseignants.',
        de: 'Ich befürworte die Erhöhung des Bildungsbudgets, denke aber, dass auch Investitionen in die Weiterbildung der Lehrkräfte eingeplant werden sollten.',
        en: 'I am in favor of increasing the education budget, but I think investments in continuing teacher training should also be planned.'
      }
    },
    status: 'pending',
    priority: 'medium',
    themeId: 'theme_005',
    automatedFlags: [],
    reportsCount: 0,
    moderationHistory: [],
    createdAt: '2026-01-13T04:55:00Z',
    submittedAt: '2026-01-13T04:55:00Z',
    dueDate: '2026-01-14T04:55:00Z'
  }
];

// ==================== Mock Moderation Statistics ====================

export const mockModerationStats: ModerationStatsDTO = {
  overview: {
    totalPending: 6,
    totalApproved: 156,
    totalRejected: 23,
    totalFlagged: 2,
    averageProcessingTime: 47, // minutes
    slaCompliance: 94.5 // percentage
  },
  byPriority: {
    urgent: 2,
    high: 2,
    medium: 4,
    low: 2
  },
  byContentType: {
    proposals: 4,
    comments: 4,
    petitions: 1,
    signalements: 1,
    annotations: 1,
    pollResponses: 0,
    userProfiles: 0
  },
  byModerator: [
    {
      moderatorId: 'mod_001',
      moderatorName: 'Sophie Martin',
      approved: 89,
      rejected: 12,
      avgProcessingTime: 42
    },
    {
      moderatorId: 'mod_002',
      moderatorName: 'Marc Dubois',
      approved: 67,
      rejected: 11,
      avgProcessingTime: 51
    }
  ],
  trends: [
    {
      date: '2026-01-07',
      pending: 12,
      approved: 18,
      rejected: 3,
      flagged: 2
    },
    {
      date: '2026-01-08',
      pending: 15,
      approved: 22,
      rejected: 4,
      flagged: 1
    },
    {
      date: '2026-01-09',
      pending: 8,
      approved: 25,
      rejected: 2,
      flagged: 1
    },
    {
      date: '2026-01-10',
      pending: 11,
      approved: 19,
      rejected: 5,
      flagged: 0
    },
    {
      date: '2026-01-11',
      pending: 6,
      approved: 21,
      rejected: 3,
      flagged: 2
    },
    {
      date: '2026-01-12',
      pending: 9,
      approved: 23,
      rejected: 4,
      flagged: 1
    },
    {
      date: '2026-01-13',
      pending: 6,
      approved: 28,
      rejected: 2,
      flagged: 2
    }
  ],
  automatedDetection: {
    totalFlagged: 87,
    truePositives: 76,
    falsePositives: 11,
    accuracy: 87.4
  }
};

// ==================== Mock Moderation Rules ====================

export const mockModerationRules: ModerationRuleDTO[] = [
  {
    id: 'rule_001',
    name: {
      fr: 'Détection de langage offensant',
      de: 'Erkennung beleidigender Sprache',
      en: 'Offensive language detection'
    },
    description: {
      fr: 'Détecte automatiquement les propos offensants, injurieux ou discriminatoires',
      de: 'Erkennt automatisch beleidigende, verletzende oder diskriminierende Aussagen',
      en: 'Automatically detects offensive, insulting or discriminatory statements'
    },
    type: 'profanity',
    enabled: true,
    severity: 'high',
    action: 'flag',
    conditions: {
      keywords: ['offensant', 'injure', 'discrimination', 'haine'],
      threshold: 80
    },
    appliesTo: ['comment', 'proposal', 'annotation'],
    stats: {
      totalMatches: 45,
      truePositives: 38,
      falsePositives: 7,
      lastTriggered: '2026-01-13T08:45:00Z'
    },
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
    createdBy: 'admin_001'
  },
  {
    id: 'rule_002',
    name: {
      fr: 'Contenu non constructif',
      de: 'Nicht konstruktiver Inhalt',
      en: 'Non-constructive content'
    },
    description: {
      fr: 'Identifie les contenus sans argumentation ou purement négatifs',
      de: 'Identifiziert Inhalte ohne Argumentation oder rein negativen Inhalt',
      en: 'Identifies content without argumentation or purely negative'
    },
    type: 'custom',
    enabled: true,
    severity: 'medium',
    action: 'flag',
    conditions: {
      pattern: '(n\'importe quoi|inutile|ridicule)',
      threshold: 75
    },
    appliesTo: ['comment', 'annotation'],
    stats: {
      totalMatches: 32,
      truePositives: 28,
      falsePositives: 4,
      lastTriggered: '2026-01-12T13:00:00Z'
    },
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-08T14:30:00Z',
    createdBy: 'admin_001'
  },
  {
    id: 'rule_003',
    name: {
      fr: 'Signalement prioritaire - sécurité',
      de: 'Prioritätsmeldung - Sicherheit',
      en: 'Priority report - safety'
    },
    description: {
      fr: 'Priorise automatiquement les signalements concernant la sécurité publique',
      de: 'Priorisiert automatisch Meldungen zur öffentlichen Sicherheit',
      en: 'Automatically prioritizes reports concerning public safety'
    },
    type: 'keyword',
    enabled: true,
    severity: 'urgent',
    action: 'escalate',
    conditions: {
      keywords: ['sécurité', 'danger', 'urgent', 'accident', 'risque', 'enfant'],
      threshold: 70
    },
    appliesTo: ['signalement'],
    stats: {
      totalMatches: 18,
      truePositives: 17,
      falsePositives: 1,
      lastTriggered: '2026-01-13T05:45:00Z'
    },
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-05T09:00:00Z',
    createdBy: 'admin_001'
  },
  {
    id: 'rule_004',
    name: {
      fr: 'Détection de spam',
      de: 'Spam-Erkennung',
      en: 'Spam detection'
    },
    description: {
      fr: 'Détecte les contenus répétitifs ou comportant des liens suspects',
      de: 'Erkennt sich wiederholende Inhalte oder Inhalte mit verdächtigen Links',
      en: 'Detects repetitive content or content with suspicious links'
    },
    type: 'spam',
    enabled: true,
    severity: 'medium',
    action: 'auto_reject',
    conditions: {
      pattern: '(http://|www\\.|bitcoin|crypto|gagner de l\'argent)',
      threshold: 85
    },
    appliesTo: ['comment', 'proposal', 'petition', 'annotation'],
    stats: {
      totalMatches: 12,
      truePositives: 11,
      falsePositives: 1,
      lastTriggered: '2026-01-11T19:22:00Z'
    },
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-09T11:15:00Z',
    createdBy: 'admin_001'
  },
  {
    id: 'rule_005',
    name: {
      fr: 'Contenu trop court',
      de: 'Zu kurzer Inhalt',
      en: 'Content too short'
    },
    description: {
      fr: 'Signale les contenus trop courts pour être constructifs',
      de: 'Markiert zu kurze Inhalte, um konstruktiv zu sein',
      en: 'Flags content too short to be constructive'
    },
    type: 'length',
    enabled: true,
    severity: 'low',
    action: 'notify',
    conditions: {
      minLength: 20
    },
    appliesTo: ['comment', 'annotation'],
    stats: {
      totalMatches: 67,
      truePositives: 52,
      falsePositives: 15,
      lastTriggered: '2026-01-13T11:08:00Z'
    },
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-07T16:45:00Z',
    createdBy: 'admin_001'
  }
];

// ==================== Mock User Reports ====================

export const mockUserReports: UserReportDTO[] = [
  {
    id: 'report_001',
    reportedContentType: 'comment',
    reportedContentId: 'comment_003',
    reportedBy: {
      id: 'user_010',
      name: 'Alice Dupont'
    },
    reportedUser: {
      id: 'user_003',
      name: 'Jean Martin'
    },
    reason: 'offensive',
    description: 'Ce commentaire contient des propos offensants envers d\'autres participants',
    status: 'under_review',
    createdAt: '2026-01-13T09:00:00Z'
  },
  {
    id: 'report_002',
    reportedContentType: 'comment',
    reportedContentId: 'comment_003',
    reportedBy: {
      id: 'user_011',
      name: 'Bernard Lefevre'
    },
    reportedUser: {
      id: 'user_003',
      name: 'Jean Martin'
    },
    reason: 'inappropriate',
    description: 'Contenu inapproprié et non respect de la charte',
    status: 'resolved',
    resolution: {
      resolvedBy: 'mod_002',
      action: 'content_rejected',
      comment: 'Le contenu a été rejeté suite aux signalements',
      resolvedAt: '2026-01-12T15:30:00Z'
    },
    createdAt: '2026-01-13T09:15:00Z'
  },
  {
    id: 'report_003',
    reportedContentType: 'comment',
    reportedContentId: 'comment_005',
    reportedBy: {
      id: 'user_012',
      name: 'Catherine Moreau'
    },
    reportedUser: {
      id: 'user_005',
      name: 'Sophie Petit'
    },
    reason: 'spam',
    description: 'Commentaire non constructif et répétitif',
    status: 'resolved',
    resolution: {
      resolvedBy: 'mod_002',
      action: 'content_rejected',
      comment: 'Contenu rejeté pour non-respect de la charte de participation',
      resolvedAt: '2026-01-12T15:30:00Z'
    },
    createdAt: '2026-01-12T13:30:00Z'
  },
  {
    id: 'report_004',
    reportedContentType: 'proposal',
    reportedContentId: 'prop_015',
    reportedBy: {
      id: 'user_013',
      name: 'Daniel Rousseau'
    },
    reportedUser: {
      id: 'user_015',
      name: 'Patrick Legrand'
    },
    reason: 'misinformation',
    description: 'La proposition contient des informations erronées et non vérifiées',
    status: 'new',
    createdAt: '2026-01-13T10:45:00Z'
  },
  {
    id: 'report_005',
    reportedContentType: 'petition',
    reportedContentId: 'pet_008',
    reportedBy: {
      id: 'user_014',
      name: 'Marie Lambert'
    },
    reportedUser: {
      id: 'user_016',
      name: 'Nicolas Bertrand'
    },
    reason: 'other',
    description: 'La pétition pourrait être formulée de manière plus neutre pour être plus inclusive',
    status: 'dismissed',
    resolution: {
      resolvedBy: 'mod_001',
      action: 'no_action',
      comment: 'Le contenu respecte la charte bien qu\'il puisse être amélioré',
      resolvedAt: '2026-01-12T17:10:00Z'
    },
    createdAt: '2026-01-12T16:20:00Z'
  }
];
