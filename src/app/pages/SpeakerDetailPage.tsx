import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { 
  ArrowLeft, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  Twitter, 
  Globe,
  Calendar,
  MapPin,
  FileText,
  Quote,
  Users,
  BookOpen
} from 'lucide-react';
import { conferences } from '../data/mockData';

// Speaker profile interface
interface SpeakerProfile {
  id: string;
  name: string;
  title: string;
  organization: string;
  bio: string;
  expertise: string[];
  education: string;
  achievements: string[];
  email?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  publications?: Publication[];
  testimonials?: Testimonial[];
  experience?: Experience[];
}

interface Publication {
  title: string;
  type: string;
  year: number;
  description: string;
}

interface Testimonial {
  author: string;
  role: string;
  text: string;
}

interface Experience {
  position: string;
  organization: string;
  period: string;
  description: string;
}

// Mock speaker profiles data with extended information
const speakerProfiles: { [key: string]: SpeakerProfile } = {
  'Dr. Marie Dupont': {
    id: 'marie-dupont',
    name: 'Dr. Marie Dupont',
    title: 'Experte en développement durable',
    organization: 'Institut Fédéral de l\'Environnement',
    bio: 'Dr. Marie Dupont est une experte reconnue internationalement en développement durable avec plus de 15 ans d\'expérience dans la recherche et la mise en œuvre de politiques environnementales. Elle conseille les gouvernements et organisations sur les stratégies de transition écologique. Passionnée par la sensibilisation climatique, elle participe régulièrement à des conférences internationales et contribue à l\'élaboration de politiques publiques durables.',
    expertise: ['Développement durable', 'Politiques environnementales', 'Transition énergétique', 'Économie circulaire'],
    education: 'Doctorat en Sciences de l\'Environnement, EPFL',
    achievements: [
      'Auteure de 3 livres sur la transition écologique',
      'Conseillère auprès de l\'ONU pour le climat',
      'Prix de l\'Innovation Environnementale 2023',
      'Membre du Conseil National du Développement Durable'
    ],
    email: 'marie.dupont@ife.ch',
    linkedin: 'https://linkedin.com/in/mariedupont',
    twitter: '@marie_dupont',
    publications: [
      {
        title: 'La Transition Écologique : Guide Pratique pour les Collectivités',
        type: 'Livre',
        year: 2023,
        description: 'Un guide complet pour aider les collectivités locales à mettre en œuvre des stratégies de développement durable.'
      },
      {
        title: 'Économie Circulaire et Innovation Sociale',
        type: 'Article scientifique',
        year: 2024,
        description: 'Étude sur l\'impact de l\'économie circulaire dans les communautés urbaines.'
      },
      {
        title: 'Politiques Climatiques Locales : Retours d\'Expérience',
        type: 'Rapport',
        year: 2024,
        description: 'Analyse comparative des politiques climatiques dans 50 villes européennes.'
      }
    ],
    testimonials: [
      {
        author: 'Jean-Marc Blanc',
        role: 'Maire de Lausanne',
        text: 'Dr. Dupont a été déterminante dans l\'élaboration de notre stratégie environnementale. Son expertise et sa capacité à vulgariser des concepts complexes sont remarquables.'
      },
      {
        author: 'Sophie Martin',
        role: 'Directrice ONG EcoFuture',
        text: 'Une référence dans le domaine du développement durable. Ses interventions inspirent et motivent les acteurs du changement.'
      }
    ],
    experience: [
      {
        position: 'Directrice Recherche',
        organization: 'Institut Fédéral de l\'Environnement',
        period: '2018 - Présent',
        description: 'Direction des programmes de recherche sur la transition énergétique et l\'économie circulaire.'
      },
      {
        position: 'Consultante Senior',
        organization: 'Programme des Nations Unies pour l\'Environnement',
        period: '2015 - 2018',
        description: 'Conseil aux gouvernements sur les politiques climatiques et le développement durable.'
      },
      {
        position: 'Chercheuse Post-Doctorale',
        organization: 'EPFL',
        period: '2012 - 2015',
        description: 'Recherche sur les stratégies de décarbonation et les énergies renouvelables.'
      }
    ]
  },
  'Prof. Jean Martin': {
    id: 'jean-martin',
    name: 'Prof. Jean Martin',
    title: 'Professeur d\'Urbanisme',
    organization: 'Université Libre de Bruxelles',
    bio: 'Prof. Jean Martin est spécialiste de l\'urbanisme durable et de l\'aménagement du territoire. Ses recherches portent sur les villes intelligentes et la mobilité urbaine. Il a participé à de nombreux projets de réaménagement urbain en Belgique et en Europe.',
    expertise: ['Urbanisme durable', 'Villes intelligentes', 'Mobilité urbaine', 'Aménagement du territoire'],
    education: 'Professeur titulaire, Université Libre de Bruxelles',
    achievements: [
      'Directeur du Centre de Recherche en Urbanisme',
      '20+ publications scientifiques internationales',
      'Consultant pour 15 villes européennes',
      'Prix d\'Excellence en Enseignement 2022'
    ],
    linkedin: 'https://linkedin.com/in/jeanmartin',
    website: 'https://urbanisme.ulb.be/jmartin',
    publications: [
      {
        title: 'Villes Intelligentes : Mythe ou Réalité ?',
        type: 'Livre',
        year: 2023,
        description: 'Analyse critique des projets de smart cities en Europe.'
      },
      {
        title: 'Mobilité Urbaine et Qualité de Vie',
        type: 'Article scientifique',
        year: 2024,
        description: 'Étude sur l\'impact des systèmes de mobilité sur le bien-être urbain.'
      }
    ],
    testimonials: [
      {
        author: 'Marie Leclerc',
        role: 'Urbaniste, Ville de Bruxelles',
        text: 'Les cours du Prof. Martin m\'ont ouvert les yeux sur les enjeux de l\'urbanisme moderne. Un enseignant passionné et visionnaire.'
      }
    ],
    experience: [
      {
        position: 'Professeur Titulaire',
        organization: 'Université Libre de Bruxelles',
        period: '2015 - Présent',
        description: 'Enseignement et recherche en urbanisme durable et aménagement du territoire.'
      },
      {
        position: 'Maître d\'Enseignement',
        organization: 'ULB',
        period: '2010 - 2015',
        description: 'Enseignement en architecture et urbanisme.'
      }
    ]
  },
  'Sophie Bernard': {
    id: 'sophie-bernard',
    name: 'Sophie Bernard',
    title: 'Directrice Innovation Mobilité',
    organization: 'STIB-MIVB Bruxelles',
    bio: 'Sophie Bernard dirige le département innovation de la STIB-MIVB. Elle pilote des projets de mobilité douce et de transport intelligent. Passionnée par l\'amélioration de l\'expérience usager et la réduction de l\'empreinte carbone des transports.',
    expertise: ['Mobilité douce', 'Transport public', 'Innovation transport', 'Expérience utilisateur'],
    education: 'Master en Gestion de Projets, Solvay Brussels School',
    achievements: [
      'Lancement du système de vélos en libre-service',
      'Réduction de 30% des émissions de CO2',
      'Prix de la Mobilité Durable 2022',
      'Innovation de l\'Année dans le secteur des transports'
    ],
    email: 's.bernard@stib.be',
    linkedin: 'https://linkedin.com/in/sophiebernard',
    publications: [
      {
        title: 'La Mobilité du Futur : Vers un Transport 100% Durable',
        type: 'Rapport',
        year: 2024,
        description: 'Stratégie pour une mobilité urbaine zéro carbone à l\'horizon 2040.'
      }
    ],
    testimonials: [
      {
        author: 'Marc Dubois',
        role: 'Usager régulier',
        text: 'Grâce aux innovations portées par Sophie Bernard, mes déplacements quotidiens sont devenus plus fluides et écologiques.'
      }
    ],
    experience: [
      {
        position: 'Directrice Innovation',
        organization: 'STIB-MIVB Bruxelles',
        period: '2019 - Présent',
        description: 'Pilotage de projets d\'innovation en mobilité durable.'
      }
    ]
  },
  'Marc Lehmann': {
    id: 'marc-lehmann',
    name: 'Marc Lehmann',
    title: 'Architecte en Chef',
    organization: 'Ville de Bruxelles',
    bio: 'Marc Lehmann est architecte en chef de la Ville de Bruxelles. Il supervise les projets d\'aménagement urbain et veille à l\'intégration harmonieuse des nouveaux développements dans le tissu urbain existant.',
    expertise: ['Architecture durable', 'Aménagement urbain', 'Patrimoine', 'Conception bioclimatique'],
    education: 'Architecte ULB, Master en Architecture Durable',
    achievements: [
      'Responsable de 50+ projets urbains',
      'Prix d\'Excellence en Architecture 2021',
      'Membre de l\'Ordre des Architectes de Belgique'
    ],
    website: 'https://bruxelles.be/architecture',
    experience: [
      {
        position: 'Architecte en Chef',
        organization: 'Ville de Bruxelles',
        period: '2016 - Présent',
        description: 'Supervision des grands projets d\'aménagement urbain.'
      }
    ]
  },
  'Dr. Claire Rossier': {
    id: 'claire-rossier',
    name: 'Dr. Claire Rossier',
    title: 'Experte en Éducation',
    organization: 'Département de l\'Instruction Publique',
    bio: 'Dr. Claire Rossier est une experte en pédagogie et innovation éducative. Elle travaille sur l\'intégration des technologies numériques dans l\'enseignement et le développement de méthodes pédagogiques inclusives.',
    expertise: ['Pédagogie innovante', 'Éducation numérique', 'Inclusion scolaire', 'Formation continue'],
    education: 'Doctorat en Sciences de l\'Éducation',
    achievements: [
      'Développement de 10 programmes pédagogiques',
      'Formatrice de 500+ enseignants',
      'Publication: "L\'école de demain"'
    ],
    email: 'c.rossier@vd.ch',
    experience: [
      {
        position: 'Experte en Innovation Pédagogique',
        organization: 'Département de l\'Instruction Publique',
        period: '2017 - Présent',
        description: 'Développement de programmes éducatifs innovants.'
      }
    ]
  },
  'Thomas Müller': {
    id: 'thomas-muller',
    name: 'Thomas Müller',
    title: 'Chef de Service Santé Publique',
    organization: 'Région de Bruxelles-Capitale',
    bio: 'Thomas Müller dirige le service de santé publique de la Région de Bruxelles-Capitale. Il coordonne les politiques de prévention et de promotion de la santé.',
    expertise: ['Santé publique', 'Prévention', 'Épidémiologie', 'Politiques de santé'],
    education: 'Master en Santé Publique, Université Libre de Bruxelles',
    achievements: [
      'Gestion de campagnes de vaccination',
      'Coordination COVID-19 pour la région',
      'Programme de prévention primé'
    ],
    linkedin: 'https://linkedin.com/in/thomasmuller',
    experience: [
      {
        position: 'Chef de Service',
        organization: 'Région de Bruxelles-Capitale',
        period: '2018 - Présent',
        description: 'Direction des politiques de santé publique.'
      }
    ]
  },
  'Laura Fontaine': {
    id: 'laura-fontaine',
    name: 'Laura Fontaine',
    title: 'Directrice Culturelle',
    organization: 'Fondation pour la Culture',
    bio: 'Laura Fontaine est directrice de la Fondation pour la Culture. Elle développe des programmes culturels innovants et promeut l\'accès à la culture pour tous.',
    expertise: ['Médiation culturelle', 'Programmation événementielle', 'Politiques culturelles', 'Mécénat'],
    education: 'Master en Management Culturel, Université Libre de Bruxelles',
    achievements: [
      'Organisation de 100+ événements culturels',
      'Augmentation de 40% de la fréquentation',
      'Prix de la Médiation Culturelle 2023'
    ],
    email: 'l.fontaine@culture.ch',
    website: 'https://fondationculture.ch',
    experience: [
      {
        position: 'Directrice',
        organization: 'Fondation pour la Culture',
        period: '2016 - Présent',
        description: 'Direction artistique et stratégie culturelle.'
      }
    ]
  },
  'Pierre Dubois': {
    id: 'pierre-dubois',
    name: 'Pierre Dubois',
    title: 'Expert en Gouvernance',
    organization: 'Institut de Recherche en Administration Publique',
    bio: 'Pierre Dubois est chercheur spécialisé en gouvernance et participation citoyenne. Ses travaux portent sur les nouvelles formes de démocratie participative.',
    expertise: ['Gouvernance', 'Démocratie participative', 'Transparence', 'Administration publique'],
    education: 'Doctorat en Sciences Politiques',
    achievements: [
      'Auteur de "Démocratie 2.0"',
      'Consultant pour 20+ communes',
      'Expert ONU en gouvernance locale'
    ],
    linkedin: 'https://linkedin.com/in/pierredubois',
    twitter: '@p_dubois',
    experience: [
      {
        position: 'Chercheur Senior',
        organization: 'Institut de Recherche en Administration Publique',
        period: '2014 - Présent',
        description: 'Recherche en gouvernance et démocratie participative.'
      }
    ]
  },
  'Isabelle Wagner': {
    id: 'isabelle-wagner',
    name: 'Isabelle Wagner',
    title: 'Économiste',
    organization: 'Chambre de Commerce',
    bio: 'Isabelle Wagner est économiste à la Chambre de Commerce. Elle analyse les tendances économiques locales et conseille les entreprises sur leur développement.',
    expertise: ['Économie régionale', 'Entrepreneuriat', 'Développement économique', 'Innovation'],
    education: 'Doctorat en Sciences Économiques, Université de Zurich',
    achievements: [
      'Conseil à 200+ entreprises',
      'Rapports économiques trimestriels',
      'Programme de soutien aux PME'
    ],
    email: 'i.wagner@ccvd.ch',
    linkedin: 'https://linkedin.com/in/isabellewagner',
    experience: [
      {
        position: 'Économiste en Chef',
        organization: 'Chambre de Commerce',
        period: '2017 - Présent',
        description: 'Analyse économique et conseil aux entreprises.'
      }
    ]
  },
  'Dr. Marie Dubois': {
    id: 'marie-dubois',
    name: 'Dr. Marie Dubois',
    title: 'Experte en Économie Circulaire',
    organization: 'Institut d\'Économie Durable',
    bio: 'Dr. Marie Dubois est une pionnière reconnue de l\'économie circulaire en Europe francophone. Avec plus de 20 ans d\'expérience, elle accompagne les entreprises et collectivités dans leur transformation vers des modèles économiques durables. Ses recherches portent sur l\'optimisation des flux de matières et la création de valeur à partir de déchets. Elle est régulièrement consultée par les instances européennes sur les politiques d\'économie circulaire.',
    expertise: ['Économie circulaire', 'Gestion des déchets', 'Écoconception', 'Durabilité d\'entreprise', 'Symbiose industrielle'],
    education: 'Doctorat en Sciences Économiques et Environnementales, Université de Genève',
    achievements: [
      'Auteure du bestseller "L\'Économie Circulaire : Manuel Pratique"',
      'Conseillère auprès de la Commission Européenne',
      'Prix de l\'Innovation Durable 2024',
      'Fondatrice du Réseau Francophone d\'Économie Circulaire',
      'Accompagnement de 150+ entreprises dans leur transition'
    ],
    email: 'marie.dubois@ied-institute.org',
    linkedin: 'https://linkedin.com/in/mariedubois',
    twitter: '@dr_dubois_eco',
    website: 'https://mariedubois-research.com',
    publications: [
      {
        title: 'L\'Économie Circulaire : Manuel Pratique pour les Entreprises',
        type: 'Livre',
        year: 2024,
        description: 'Guide complet pour intégrer les principes de l\'économie circulaire dans la stratégie d\'entreprise.'
      },
      {
        title: 'Symbiose Industrielle et Territoires : Nouvelles Approches',
        type: 'Article scientifique',
        year: 2024,
        description: 'Étude sur les écosystèmes industriels collaboratifs et leur impact sur le développement territorial.'
      },
      {
        title: 'Valorisation des Biodéchets en Milieu Urbain',
        type: 'Rapport',
        year: 2023,
        description: 'Analyse des meilleures pratiques européennes en matière de gestion des biodéchets.'
      },
      {
        title: 'Indicateurs de Performance en Économie Circulaire',
        type: 'Guide méthodologique',
        year: 2023,
        description: 'Outil de mesure pour évaluer la circularité des modèles économiques.'
      }
    ],
    testimonials: [
      {
        author: 'François Mercier',
        role: 'Directeur Général, EcoIndustries SA',
        text: 'Dr. Dubois a transformé notre approche de la production. Grâce à ses conseils, nous avons réduit nos déchets de 60% et créé de nouvelles sources de revenus.'
      },
      {
        author: 'Anne-Sophie Bertrand',
        role: 'Maire de Vevey',
        text: 'Son expertise en économie circulaire a été cruciale pour développer notre stratégie zéro déchet. Une vraie visionnaire.'
      }
    ],
    experience: [
      {
        position: 'Directrice de Recherche',
        organization: 'Institut d\'Économie Durable',
        period: '2019 - Présent',
        description: 'Direction des programmes de recherche sur l\'économie circulaire et accompagnement stratégique des entreprises et collectivités.'
      },
      {
        position: 'Consultante Senior',
        organization: 'Commission Européenne - DG Environnement',
        period: '2016 - 2019',
        description: 'Conseil sur les politiques européennes d\'économie circulaire et élaboration de recommandations pour les États membres.'
      },
      {
        position: 'Chercheuse Associée',
        organization: 'École Polytechnique Fédérale de Lausanne (EPFL)',
        period: '2012 - 2016',
        description: 'Recherche sur les modèles d\'affaires circulaires et l\'écologie industrielle.'
      }
    ]
  },
  'Jean Martin - Entrepreneur': {
    id: 'jean-martin-entrepreneur',
    name: 'Jean Martin',
    title: 'Entrepreneur & Fondateur',
    organization: 'GreenLoop Solutions',
    bio: 'Jean Martin est un entrepreneur social reconnu pour avoir créé plusieurs entreprises pionnières dans le domaine de l\'économie circulaire. Fondateur de GreenLoop Solutions, une plateforme qui connecte les entreprises pour faciliter le réemploi de matériaux et ressources, il est devenu un acteur incontournable de l\'innovation durable. Son parcours atypique, passant de l\'ingénierie à l\'entrepreneuriat vert, inspire de nombreux jeunes créateurs d\'entreprises.',
    expertise: ['Entrepreneuriat social', 'Innovation durable', 'Économie collaborative', 'Modèles d\'affaires circulaires', 'Upcycling industriel'],
    education: 'Ingénieur EPFL, MBA HEC Lausanne',
    achievements: [
      'Fondateur de 4 startups à impact positif',
      'GreenLoop : 500+ entreprises membres, 10 000 tonnes de matériaux réutilisés',
      'Prix Entrepreneur Social de l\'Année 2023',
      'Mentor dans 3 incubateurs de startups durables',
      'Levée de fonds : 5M€ pour le développement de GreenLoop'
    ],
    email: 'jean.martin@greenloop.ch',
    linkedin: 'https://linkedin.com/in/jeanmartin',
    twitter: '@jmartin_green',
    website: 'https://greenloop.ch',
    publications: [
      {
        title: 'Entreprendre en Économie Circulaire : Guide du Débutant',
        type: 'E-book',
        year: 2024,
        description: 'Manuel pratique pour lancer une entreprise basée sur les principes de l\'économie circulaire.'
      },
      {
        title: 'De l\'Idée à l\'Impact : Mon Parcours d\'Entrepreneur Social',
        type: 'Livre',
        year: 2023,
        description: 'Récit inspirant du parcours entrepreneurial avec conseils pratiques et leçons apprises.'
      },
      {
        title: 'Plateforme Collaborative et Économie Circulaire',
        type: 'Case study',
        year: 2024,
        description: 'Étude de cas sur le modèle GreenLoop et son impact sur l\'écosystème entrepreneurial.'
      }
    ],
    testimonials: [
      {
        author: 'Dr. Marie Dubois',
        role: 'Institut d\'Économie Durable',
        text: 'Jean a su transformer la théorie de l\'économie circulaire en solutions concrètes et rentables. Son approche pragmatique est un exemple pour tous.'
      },
      {
        author: 'Caroline Dupuis',
        role: 'Directrice Innovation, Nestlé Suisse',
        text: 'GreenLoop a révolutionné notre gestion des ressources. Jean est un visionnaire qui sait allier business et impact positif.'
      }
    ],
    experience: [
      {
        position: 'Fondateur & CEO',
        organization: 'GreenLoop Solutions',
        period: '2020 - Présent',
        description: 'Création et développement d\'une plateforme B2B facilitant l\'économie circulaire entre entreprises.'
      },
      {
        position: 'Co-fondateur',
        organization: 'UpCycle Lab',
        period: '2017 - 2020',
        description: 'Startup spécialisée dans la valorisation de déchets industriels en nouveaux produits.'
      },
      {
        position: 'Ingénieur R&D',
        organization: 'Sulzer AG',
        period: '2013 - 2017',
        description: 'Développement de solutions techniques pour l\'efficacité énergétique industrielle.'
      }
    ]
  },
  'Prof. Sophie Laurent': {
    id: 'sophie-laurent',
    name: 'Prof. Sophie Laurent',
    title: 'Professeure en Écologie Industrielle',
    organization: 'Université de Lausanne',
    bio: 'Prof. Sophie Laurent est titulaire de la Chaire d\'Écologie Industrielle à l\'Université de Lausanne. Ses recherches portent sur l\'analyse de cycle de vie, l\'écoconception et les stratégies de décarbonation industrielle. Elle collabore étroitement avec l\'industrie pour développer des solutions concrètes de transition écologique. Pédagogue reconnue, elle forme la nouvelle génération d\'ingénieurs et managers responsables.',
    expertise: ['Écologie industrielle', 'Analyse de cycle de vie (ACV)', 'Écoconception', 'Décarbonation', 'Métabolisme urbain'],
    education: 'Doctorat en Sciences de l\'Environnement, ETH Zürich',
    achievements: [
      'Titulaire de la Chaire d\'Écologie Industrielle UNIL',
      '50+ publications scientifiques dans des revues internationales',
      'Membre du Comité Scientifique National sur la Transition Écologique',
      'Responsable de 15 projets de recherche européens',
      'Prix d\'Excellence en Recherche Environnementale 2022'
    ],
    email: 'sophie.laurent@unil.ch',
    linkedin: 'https://linkedin.com/in/sophielaurent',
    twitter: '@prof_slaurent',
    website: 'https://unil.ch/ecologie-industrielle',
    publications: [
      {
        title: 'Écologie Industrielle : Théories et Applications',
        type: 'Livre académique',
        year: 2024,
        description: 'Ouvrage de référence sur les fondements scientifiques et applications pratiques de l\'écologie industrielle.'
      },
      {
        title: 'Méthodologies ACV pour l\'Économie Circulaire',
        type: 'Article scientifique',
        year: 2024,
        description: 'Nouvelles approches méthodologiques pour évaluer les bénéfices environnementaux de l\'économie circulaire.'
      },
      {
        title: 'Décarbonation Industrielle : Stratégies et Outils',
        type: 'Rapport de recherche',
        year: 2023,
        description: 'Analyse des solutions technologiques et organisationnelles pour réduire les émissions industrielles.'
      },
      {
        title: 'Symbiose Industrielle : Modélisation et Optimisation',
        type: 'Article scientifique',
        year: 2023,
        description: 'Modèles mathématiques pour optimiser les échanges de ressources entre industries.'
      }
    ],
    testimonials: [
      {
        author: 'Marc Leroy',
        role: 'Doctorant UNIL',
        text: 'Prof. Laurent est une mentor exceptionnelle qui allie rigueur scientifique et vision pratique. Ses cours sont passionnants.'
      },
      {
        author: 'Philippe Dubois',
        role: 'Directeur Développement Durable, Groupe Holcim',
        text: 'Nos collaborations avec le laboratoire de Prof. Laurent nous ont permis de réduire significativement notre empreinte carbone.'
      }
    ],
    experience: [
      {
        position: 'Professeure Ordinaire',
        organization: 'Université de Lausanne - Faculté des Géosciences',
        period: '2018 - Présent',
        description: 'Enseignement et recherche en écologie industrielle, direction de thèses doctorales et projets de recherche.'
      },
      {
        position: 'Professeure Associée',
        organization: 'UNIL',
        period: '2014 - 2018',
        description: 'Développement de cours et programmes en développement durable et écologie industrielle.'
      },
      {
        position: 'Chercheuse Senior',
        organization: 'ETH Zürich - Institut des Sciences Environnementales',
        period: '2010 - 2014',
        description: 'Recherche post-doctorale sur l\'analyse de cycle de vie et l\'écoconception.'
      }
    ]
  },
  'Dr. Pierre Renaud': {
    id: 'pierre-renaud',
    name: 'Dr. Pierre Renaud',
    title: 'Médecin & Expert en Santé Publique',
    organization: 'Centre Hospitalier Universitaire Vaudois (CHUV)',
    bio: 'Dr. Pierre Renaud est médecin infectiologue et expert en santé publique au CHUV. Il dirige le département de médecine préventive et coordonne les programmes de vaccination et de prévention des maladies infectieuses. Pendant la pandémie COVID-19, il a joué un rôle clé dans la stratégie sanitaire cantonale. Ses recherches portent sur l\'épidémiologie des maladies infectieuses et les stratégies de prévention en milieu hospitalier et communautaire.',
    expertise: ['Infectiologie', 'Épidémiologie', 'Médecine préventive', 'Santé publique', 'Gestion de crise sanitaire', 'Vaccination'],
    education: 'Doctorat en Médecine UNIL, Spécialisation en Infectiologie et Santé Publique',
    achievements: [
      'Chef du Département de Médecine Préventive CHUV',
      'Coordinateur cantonal de la stratégie COVID-19',
      '30+ publications dans des revues médicales internationales',
      'Membre du Conseil Scientifique National de Santé Publique',
      'Prix d\'Excellence en Innovation Sanitaire 2023'
    ],
    email: 'pierre.renaud@chuv.ch',
    linkedin: 'https://linkedin.com/in/pierrerenaud',
    publications: [
      {
        title: 'Stratégies Innovantes en Médecine Préventive Hospitalière',
        type: 'Article scientifique',
        year: 2024,
        description: 'Nouvelles approches pour réduire les infections nosocomiales et améliorer la prévention en milieu hospitalier.'
      },
      {
        title: 'Gestion des Épidémies : Leçons de la COVID-19',
        type: 'Livre',
        year: 2024,
        description: 'Analyse approfondie de la gestion sanitaire de la pandémie et recommandations pour les futures crises.'
      },
      {
        title: 'Vaccination et Adhésion Populaire : Approches Comportementales',
        type: 'Rapport de recherche',
        year: 2023,
        description: 'Étude sur les facteurs psychosociaux influençant l\'adhésion aux programmes de vaccination.'
      },
      {
        title: 'Prévention des Maladies Infectieuses en Milieu Urbain',
        type: 'Article scientifique',
        year: 2023,
        description: 'Analyse des stratégies de prévention adaptées aux contextes urbains denses.'
      }
    ],
    testimonials: [
      {
        author: 'Dr. Anne Bertrand',
        role: 'Directrice Médicale CHUV',
        text: 'Dr. Renaud a été un pilier durant la crise COVID. Son expertise et son leadership ont été déterminants pour notre réponse sanitaire.'
      },
      {
        author: 'Marc Dubois',
        role: 'Conseiller d\'État, Canton de Vaud',
        text: 'Un expert de premier plan qui sait allier rigueur scientifique et communication accessible au grand public.'
      }
    ],
    experience: [
      {
        position: 'Chef de Département',
        organization: 'CHUV - Médecine Préventive et Hospitalière',
        period: '2019 - Présent',
        description: 'Direction stratégique de la médecine préventive, coordination des programmes de vaccination et gestion des risques infectieux.'
      },
      {
        position: 'Médecin Adjoint',
        organization: 'CHUV - Service des Maladies Infectieuses',
        period: '2015 - 2019',
        description: 'Prise en charge clinique des patients et développement de protocoles de prévention.'
      },
      {
        position: 'Médecin Assistant',
        organization: 'Hôpitaux Universitaires de Genève (HUG)',
        period: '2011 - 2015',
        description: 'Formation spécialisée en infectiologie et épidémiologie hospitalière.'
      }
    ]
  },
  'Dr. Isabelle Chen': {
    id: 'isabelle-chen',
    name: 'Dr. Isabelle Chen',
    title: 'Chercheuse en Neurosciences & Santé Mentale',
    organization: 'Institut des Neurosciences de Genève',
    bio: 'Dr. Isabelle Chen est une chercheuse de renommée internationale spécialisée en neurosciences cognitives et santé mentale. Ses travaux portent sur les mécanismes cérébraux du stress et de l\'anxiété, ainsi que sur le développement de nouvelles approches thérapeutiques non médicamenteuses. Elle dirige un laboratoire de recherche qui combine neurosciences fondamentales et applications cliniques. Passionnée par la vulgarisation scientifique, elle intervient régulièrement dans les médias pour sensibiliser le public aux enjeux de santé mentale.',
    expertise: ['Neurosciences cognitives', 'Santé mentale', 'Gestion du stress', 'Psychologie clinique', 'Thérapies innovantes', 'Neuroplasticité'],
    education: 'Doctorat en Neurosciences, Université de Genève, Post-doc MIT (USA)',
    achievements: [
      'Directrice du Laboratoire de Neurosciences Cognitives',
      '60+ publications scientifiques internationales',
      'Prix de la Recherche Médicale Suisse 2023',
      'Développement de 3 protocoles thérapeutiques innovants',
      'Membre de l\'Académie Européenne des Neurosciences'
    ],
    email: 'isabelle.chen@unige.ch',
    linkedin: 'https://linkedin.com/in/isabellechen',
    twitter: '@dr_ichen',
    website: 'https://neurosciences.unige.ch/chen-lab',
    publications: [
      {
        title: 'Neuroplasticité et Résilience : Nouvelles Perspectives Thérapeutiques',
        type: 'Livre scientifique',
        year: 2024,
        description: 'Synthèse des recherches récentes sur la capacité du cerveau à se réorganiser et applications en santé mentale.'
      },
      {
        title: 'Mécanismes Neuronaux du Stress Chronique',
        type: 'Article scientifique - Nature Neuroscience',
        year: 2024,
        description: 'Découverte de nouveaux circuits neuronaux impliqués dans la réponse au stress prolongé.'
      },
      {
        title: 'Interventions Non-Médicamenteuses en Santé Mentale',
        type: 'Rapport de recherche',
        year: 2023,
        description: 'Évaluation de l\'efficacité de thérapies alternatives basées sur les neurosciences.'
      },
      {
        title: 'Mindfulness et Modifications Cérébrales : Étude d\'Imagerie',
        type: 'Article scientifique',
        year: 2023,
        description: 'Analyse par IRM des changements structurels et fonctionnels induits par la méditation de pleine conscience.'
      }
    ],
    testimonials: [
      {
        author: 'Prof. Jean Bertrand',
        role: 'Doyen de la Faculté de Médecine, UNIGE',
        text: 'Dr. Chen est une scientifique brillante dont les travaux ont un impact majeur sur notre compréhension et traitement de la santé mentale.'
      },
      {
        author: 'Sophie Martin',
        role: 'Patiente - Programme de recherche',
        text: 'Grâce aux protocoles développés par Dr. Chen, j\'ai pu surmonter des années d\'anxiété. Son approche est à la fois scientifique et humaine.'
      }
    ],
    experience: [
      {
        position: 'Directrice de Laboratoire',
        organization: 'Institut des Neurosciences de Genève',
        period: '2020 - Présent',
        description: 'Direction d\'une équipe de 15 chercheurs, coordination de projets de recherche internationaux sur le stress et la santé mentale.'
      },
      {
        position: 'Chercheuse Senior',
        organization: 'Université de Genève - Département de Neurosciences',
        period: '2016 - 2020',
        description: 'Recherche sur les bases neurologiques des troubles anxieux et développement de protocoles thérapeutiques.'
      },
      {
        position: 'Post-Doctorante',
        organization: 'Massachusetts Institute of Technology (MIT)',
        period: '2013 - 2016',
        description: 'Recherche avancée sur la neuroplasticité et les mécanismes de résilience cérébrale.'
      }
    ]
  }
};

export function SpeakerDetailPage() {
  const { speakerId } = useParams<{ speakerId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Find speaker by id
  const speaker = Object.values(speakerProfiles).find(s => s.id === speakerId);

  // Find conferences where this speaker is presenting
  const speakerConferences = conferences.filter(conf => 
    speaker && conf.speakers.includes(speaker.name)
  );

  if (!speaker) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-600">
          {language === 'fr' && 'Intervenant non trouvé'}
          {language === 'de' && 'Referent nicht gefunden'}
          {language === 'en' && 'Speaker not found'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/conferences')}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {language === 'fr' && 'Retour aux conférences'}
        {language === 'de' && 'Zurück zu den Konferenzen'}
        {language === 'en' && 'Back to conferences'}
      </Button>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold">
              {speaker.name.charAt(0)}
            </div>
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl mb-2">{speaker.name}</h1>
            <p className="text-xl mb-1 text-blue-100">{speaker.title}</p>
            <p className="text-lg text-blue-200 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              {speaker.organization}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Biography */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                {language === 'fr' && 'Biographie'}
                {language === 'de' && 'Biografie'}
                {language === 'en' && 'Biography'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{speaker.bio}</p>
            </CardContent>
          </Card>

          {/* Experience */}
          {speaker.experience && speaker.experience.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-orange-600" />
                  {language === 'fr' && 'Parcours professionnel'}
                  {language === 'de' && 'Beruflicher Werdegang'}
                  {language === 'en' && 'Professional experience'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {speaker.experience.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-orange-200">
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-orange-600"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                        <p className="text-sm text-gray-600 mb-1">{exp.organization}</p>
                        <p className="text-xs text-gray-500 mb-2">{exp.period}</p>
                        <p className="text-sm text-gray-700">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Publications */}
          {speaker.publications && speaker.publications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  {language === 'fr' && 'Publications récentes'}
                  {language === 'de' && 'Neueste Veröffentlichungen'}
                  {language === 'en' && 'Recent publications'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {speaker.publications.map((pub, idx) => (
                    <div key={idx} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{pub.title}</h4>
                          <p className="text-sm text-gray-700 mb-2">{pub.description}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <span className="px-2 py-1 bg-purple-100 rounded">{pub.type}</span>
                            <span>{pub.year}</span>
                          </div>
                        </div>
                        <FileText className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Testimonials */}
          {speaker.testimonials && speaker.testimonials.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Quote className="w-5 h-5 text-green-600" />
                  {language === 'fr' && 'Témoignages'}
                  {language === 'de' && 'Testimonials'}
                  {language === 'en' && 'Testimonials'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {speaker.testimonials.map((testimonial, idx) => (
                    <div key={idx} className="p-4 bg-green-50 border-l-4 border-green-600">
                      <p className="text-gray-700 italic mb-3">"{testimonial.text}"</p>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-semibold">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{testimonial.author}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Conferences */}
          {speakerConferences.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  {language === 'fr' && 'Conférences à venir'}
                  {language === 'de' && 'Kommende Konferenzen'}
                  {language === 'en' && 'Upcoming conferences'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {speakerConferences.map((conf) => (
                    <div key={conf.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                      <h4 className="font-semibold text-gray-900 mb-2">{conf.title}</h4>
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(conf.date).toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{conf.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Expertise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="w-5 h-5 text-purple-600" />
                {language === 'fr' && 'Expertise'}
                {language === 'de' && 'Fachgebiete'}
                {language === 'en' && 'Expertise'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {speaker.expertise.map((exp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full border border-purple-200"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="w-5 h-5 text-green-600" />
                {language === 'fr' && 'Formation'}
                {language === 'de' && 'Ausbildung'}
                {language === 'en' && 'Education'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{speaker.education}</p>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="w-5 h-5 text-yellow-600" />
                {language === 'fr' && 'Réalisations'}
                {language === 'de' && 'Leistungen'}
                {language === 'en' && 'Achievements'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {speaker.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {language === 'fr' && 'Contact & Réseaux'}
                {language === 'de' && 'Kontakt & Netzwerke'}
                {language === 'en' && 'Contact & Networks'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {speaker.email && (
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Mail className="w-4 h-4" />
                    Email
                  </Button>
                )}
                {speaker.linkedin && (
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    LinkedIn
                  </Button>
                )}
                {speaker.twitter && (
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Twitter className="w-4 h-4 text-blue-400" />
                    {speaker.twitter}
                  </Button>
                )}
                {speaker.website && (
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Globe className="w-4 h-4 text-gray-600" />
                    Website
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}