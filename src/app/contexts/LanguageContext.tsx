import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'de' | 'en';

interface Translations {
  [key: string]: {
    fr: string;
    de: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { fr: 'Accueil', de: 'Startseite', en: 'Home' },
  'nav.consultations': { fr: 'Concertations', de: 'Konsultationen', en: 'Consultations' },
  'nav.assemblies': { fr: 'Assemblées', de: 'Versammlungen', en: 'Assemblies' },
  'nav.petitions': { fr: 'Pétitions', de: 'Petitionen', en: 'Petitions' },
  'nav.conferences': { fr: 'Conférences', de: 'Konferenzen', en: 'Conferences' },
  'nav.votes': { fr: 'Votes & Référendum', de: 'Abstimmungen & Referendum', en: 'Votes & Referendum' },
  'nav.themes': { fr: 'Thèmes', de: 'Themen', en: 'Themes' },
  'nav.resources': { fr: 'Ressources', de: 'Ressourcen', en: 'Resources' },
  'nav.help': { fr: 'Aide', de: 'Hilfe', en: 'Help' },
  'nav.profile': { fr: 'Mon Profil', de: 'Mein Profil', en: 'My Profile' },
  
  // Common
  'common.filter': { fr: 'Filtrer', de: 'Filtern', en: 'Filter' },
  'common.search': { fr: 'Rechercher', de: 'Suchen', en: 'Search' },
  'common.all': { fr: 'Tous', de: 'Alle', en: 'All' },
  'common.active': { fr: 'Actif', de: 'Aktiv', en: 'Active' },
  'common.closed': { fr: 'Fermé', de: 'Geschlossen', en: 'Closed' },
  'common.upcoming': { fr: 'À venir', de: 'Kommend', en: 'Upcoming' },
  'common.participate': { fr: 'Participer', de: 'Teilnehmen', en: 'Participate' },
  'common.viewDetails': { fr: 'Voir les détails', de: 'Details ansehen', en: 'View details' },
  'common.signatures': { fr: 'signatures', de: 'Unterschriften', en: 'signatures' },
  'common.participants': { fr: 'participants', de: 'Teilnehmer', en: 'participants' },
  
  // Themes
  'theme.environment': { fr: 'Environnement & climat', de: 'Umwelt & Klima', en: 'Environment & climate' },
  'theme.urban': { fr: 'Urbanisme & logement', de: 'Städtebau & Wohnen', en: 'Urban planning & housing' },
  'theme.mobility': { fr: 'Mobilité & transport', de: 'Mobilität & Verkehr', en: 'Mobility & transport' },
  'theme.education': { fr: 'Éducation & jeunesse', de: 'Bildung & Jugend', en: 'Education & youth' },
  'theme.health': { fr: 'Santé', de: 'Gesundheit', en: 'Health' },
  'theme.culture': { fr: 'Culture', de: 'Kultur', en: 'Culture' },
  'theme.governance': { fr: 'Gouvernance locale', de: 'Lokale Governance', en: 'Local governance' },
  'theme.economy': { fr: 'Économie & emploi', de: 'Wirtschaft & Beschäftigung', en: 'Economy & employment' },
  
  // Dashboard
  'dashboard.welcome': { fr: 'Bienvenue sur la plateforme', de: 'Willkommen auf der Plattform', en: 'Welcome to the platform' },
  'dashboard.myParticipations': { fr: 'Mes participations', de: 'Meine Teilnahmen', en: 'My participations' },
  'dashboard.activeProcesses': { fr: 'Processus en cours', de: 'Laufende Prozesse', en: 'Active processes' },
  
  // Status
  'status.open': { fr: 'Ouvert', de: 'Offen', en: 'Open' },
  'status.closed': { fr: 'Fermé', de: 'Geschlossen', en: 'Closed' },
  'status.pending': { fr: 'En attente', de: 'Ausstehend', en: 'Pending' },
  'status.accepted': { fr: 'Accepté', de: 'Akzeptiert', en: 'Accepted' },
  'status.rejected': { fr: 'Rejeté', de: 'Abgelehnt', en: 'Rejected' },
  'status.inProgress': { fr: 'En cours', de: 'In Bearbeitung', en: 'In progress' },
  'status.completed': { fr: 'Terminé', de: 'Abgeschlossen', en: 'Completed' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
