# Documentation du Système IVR - CiviAgora

## Vue d'ensemble

Le système IVR (Interactive Voice Response) de CiviAgora permet une **participation universelle** aux processus démocratiques par téléphone, SMS et appels automatisés. Ce système garantit l'accessibilité à tous les citoyens, indépendamment de leurs compétences numériques ou de leur accès à Internet.

## Objectifs

### 1. Accessibilité Universelle
- **Inclusion numérique** : Participation sans ordinateur ni smartphone
- **Seniors et personnes âgées** : Interface vocale simple et guidée
- **Personnes en situation de handicap** : Alternative accessible aux interfaces web
- **Zones rurales** : Participation sans connexion Internet stable
- **Multilinguisme** : Support FR/DE/EN automatique

### 2. Types de Participation IVR

#### Téléphone (Phone)
- Appel interactif avec serveur vocal
- Navigation par touches DTMF (1, 2, 3, etc.)
- Durée moyenne : 2-3 minutes
- Idéal pour : Consultations détaillées, votes avec explications

#### SMS
- Participation rapide par message texte
- Format : Code + Réponse (ex: "VOTE A")
- Durée moyenne : 30-60 secondes  
- Idéal pour : Votes simples, signatures de pétitions

#### Appels Automatisés (Automated Call)
- Appels sortants proactifs vers citoyens
- Sensibilisation et rappels
- Durée moyenne : 1-2 minutes
- Idéal pour : Campagnes de mobilisation ciblées

## Architecture Technique

### DTOs TypeScript

#### IVRResponseDTO
```typescript
interface IVRResponseDTO {
  id: string;
  channel: 'phone' | 'sms' | 'automated_call';
  phoneNumber: string; // anonymisé
  participationType: 'consultation' | 'vote' | 'petition' | 'poll' | 'survey';
  processId: string;
  processTitle: LocalizedString;
  responses: Array<{
    questionId: string;
    questionText: LocalizedString;
    answer: string;
    answeredAt: string;
  }>;
  status: 'completed' | 'partial' | 'abandoned';
  language: 'fr' | 'de' | 'en';
  duration: number; // secondes
  completedAt?: string;
  createdAt: string;
  region?: string;
  demographicData?: {
    ageRange?: '18-25' | '26-35' | '36-50' | '51-65' | '65+';
    accessibilityNeeds?: boolean;
  };
}
```

#### IVRStatsDTO
```typescript
interface IVRStatsDTO {
  totalResponses: number;
  completedResponses: number;
  partialResponses: number;
  abandonedResponses: number;
  byChannel: {
    phone: number;
    sms: number;
    automated_call: number;
  };
  byLanguage: {
    fr: number;
    de: number;
    en: number;
  };
  byParticipationType: {
    consultation: number;
    vote: number;
    petition: number;
    poll: number;
    survey: number;
  };
  averageDuration: number;
  peakHours: Array<{
    hour: number;
    responseCount: number;
  }>;
  geographicDistribution: Array<{
    region: string;
    count: number;
    percentage: number;
  }>;
  accessibilityImpact: {
    totalAccessibilityUsers: number;
    percentageOfTotal: number;
  };
  timeSeriesData: Array<{
    date: string;
    responses: number;
  }>;
}
```

#### IVRCampaignDTO
```typescript
interface IVRCampaignDTO {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  participationType: 'consultation' | 'vote' | 'petition' | 'poll' | 'survey';
  processId: string;
  channels: Array<'phone' | 'sms' | 'automated_call'>;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  targetAudience?: {
    regions?: string[];
    ageRanges?: string[];
    languages?: Language[];
  };
  script: Array<{
    language: Language;
    greeting: string;
    questions: Array<{
      id: string;
      text: string;
      type: 'yes_no' | 'numeric' | 'choice' | 'open';
      options?: string[];
    }>;
    closing: string;
  }>;
  stats: {
    totalCalls: number;
    completedCalls: number;
    responses: number;
  };
  createdAt: string;
  updatedAt: string;
}
```

## Services API

### ivrApi

Tous les endpoints IVR sont disponibles via `apiService.ivr.*` :

```typescript
// Récupérer les statistiques globales
const stats = await apiService.ivr.getStats();

// Récupérer toutes les réponses IVR avec filtres
const responses = await apiService.ivr.getResponses({
  channel?: 'phone' | 'sms' | 'automated_call',
  participationType?: 'consultation' | 'vote' | 'petition' | 'poll' | 'survey',
  status?: 'completed' | 'partial' | 'abandoned',
  region?: string
});

// Récupérer une réponse spécifique
const response = await apiService.ivr.getResponseById(id);

// Récupérer toutes les campagnes IVR
const campaigns = await apiService.ivr.getCampaigns({
  status?: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed',
  participationType?: string
});

// Récupérer une campagne spécifique
const campaign = await apiService.ivr.getCampaignById(id);

// Récupérer le résumé IVR d'un processus spécifique
const summary = await apiService.ivr.getProcessSummary(processId);

// Récupérer tous les résumés de processus
const allSummaries = await apiService.ivr.getAllProcessSummaries();
```

## Composants React

### IVRSynthesisPage
Page d'administration complète pour visualiser et analyser les participations IVR.

**Route** : `/admin/ivr`

**Fonctionnalités** :
- Vue d'ensemble avec KPIs clés
- Graphiques de distribution (canaux, langues, types)
- Timeline d'évolution
- Distribution géographique
- Liste filtrée des réponses
- Gestion des campagnes
- Synthèses par processus

**Utilisation** :
```tsx
import IVRSynthesisPage from '@/app/admin/pages/IVRSynthesisPage';

// Accessible via la navigation admin
<Route path="/admin/ivr" element={<IVRSynthesisPage />} />
```

### IVRAccessBanner
Bannière d'information pour promouvoir l'accès IVR sur le dashboard public.

**Utilisation** :
```tsx
import { IVRAccessBanner } from '@/app/components/IVRAccessBanner';

// Dans Dashboard.tsx
<IVRAccessBanner />
```

**Affiche** :
- Numéro de téléphone principal
- Numéro SMS
- Disponibilité des appels automatisés
- Langues supportées
- Bouton "En savoir plus"

## Données Mock

Le système inclut des données mock complètes pour démonstration :

### mockIVRResponses (5 exemples)
- Réponses variées par canal (phone, SMS, automated_call)
- Différents types de participation
- Statuts complets, partiels et abandonnés
- Données démographiques anonymisées
- Régions suisses (Genève, Lausanne, Zürich, Bern, Fribourg)

### mockIVRStats
- 347 réponses totales
- 90% taux de complétion (312/347)
- 40.9% utilisateurs avec besoins d'accessibilité
- Distribution par canal, langue et type
- Heures de pointe identifiées
- Évolution temporelle sur 8 jours

### mockIVRCampaigns (2 exemples)
- Campagne téléphonique pour consultation parc urbain
- Campagne SMS pour budget participatif
- Scripts multilingues (FR/DE)
- Ciblage géographique et démographique
- Statistiques de performance

### mockIVRProcessSummaries (2 exemples)
- Comparaison participation IVR vs en ligne
- Insights clés sur chaque processus
- Distribution par canal
- Principales régions participantes

## Métriques et KPIs

### Impact Accessibilité
- **40.9% des participants IVR** ont des besoins d'accessibilité
- **Taux de complétion IVR** : 92% (vs 78% en ligne)
- **Participation seniors (65+)** : Significativement plus élevée

### Performance par Canal
- **Téléphone** : 54.5% des réponses (189/347)
- **SMS** : 34.9% des réponses (121/347)
- **Appels automatisés** : 10.7% des réponses (37/347)

### Distribution Linguistique
- **Français** : 57.1% (198 réponses)
- **Allemand** : 32.3% (112 réponses)
- **Anglais** : 10.7% (37 réponses)

### Heures de Pointe
1. **18h-19h** : 47 réponses (pic absolu)
2. **9h-10h** : 42 réponses
3. **16h-17h** : 41 réponses

### Distribution Géographique
1. **Genève** : 28.2% (98 réponses)
2. **Lausanne** : 21.9% (76 réponses)
3. **Zürich** : 18.4% (64 réponses)
4. **Bern** : 15.0% (52 réponses)
5. **Fribourg** : 9.8% (34 réponses)

## Flows IVR

### Flow Téléphonique (Phone)

```
1. Appel entrant → Détection langue (FR/DE/EN)
2. Message d'accueil personnalisé
3. Menu principal :
   - Tapez 1 : Consultations actives
   - Tapez 2 : Votes en cours
   - Tapez 3 : Pétitions ouvertes
   - Tapez 9 : Aide
4. Sélection du processus spécifique
5. Questions interactives (DTMF)
6. Confirmation des réponses
7. Message de clôture
8. Enregistrement de la réponse
```

### Flow SMS

```
1. SMS reçu : "VOTE A" ou "PETITION OUI"
2. Parsing du message
3. Validation du format
4. Enregistrement de la réponse
5. SMS de confirmation envoyé
6. Log de la participation
```

### Flow Appel Automatisé (Automated Call)

```
1. Système déclenche l'appel sortant
2. Vérification disponibilité du destinataire
3. Message d'introduction
4. Question(s) ciblée(s)
5. Collecte réponse DTMF
6. Remerciement
7. Fin d'appel
8. Enregistrement
```

## Écrans de Restitution

### 1. Vue d'ensemble (Overview Tab)
- **4 KPI Cards** : Total réponses, Complétées, Durée moyenne, Utilisateurs accessibilité
- **6 Graphiques** :
  - Distribution par canal (Pie Chart)
  - Statut des réponses (Pie Chart)
  - Distribution par langue (Bar Chart)
  - Heures de pointe (Line Chart)
  - Distribution géographique (Bar Chart)
  - Timeline d'évolution (Line Chart)

### 2. Réponses (Responses Tab)
- **Filtres** : Par canal, par type de participation
- **Liste des réponses** avec :
  - Icône du canal (Phone/SMS/Voicemail)
  - Titre du processus
  - Badge de statut
  - Région
  - Nombre de réponses
  - Durée
  - Langue

### 3. Campagnes (Campaigns Tab)
- **Cartes de campagne** affichant :
  - Nom et description
  - Badge de statut
  - Statistiques (Total appels, Complétés, Réponses)
  - Canaux utilisés
  - Dates de début/fin

### 4. Synthèses par Processus (Process Tab)
- **Comparaison IVR vs Online** :
  - Nombre de participations IVR
  - Nombre de participations en ligne
  - Pourcentage IVR
- **Insights clés** :
  - Préférences de canal
  - Durées moyennes
  - Taux de complétion
  - Observations particulières

## Export des Données

Le système permet d'exporter les données IVR pour analyse externe :

- **Formats** : CSV, Excel, JSON
- **Données exportables** :
  - Réponses individuelles (anonymisées)
  - Statistiques agrégées
  - Rapports de campagnes
  - Synthèses par processus

## Conformité RGPD

### Anonymisation
- Numéros de téléphone masqués (`***-***-4521`)
- Pas de données personnelles identifiables
- Conservation limitée dans le temps

### Consentement
- Opt-in explicite pour appels automatisés
- Information claire sur l'usage des données
- Droit de retrait à tout moment

### Sécurité
- Chiffrement des données en transit
- Stockage sécurisé
- Accès restreint aux administrateurs

## Roadmap Future

### Phase 2 (Q2 2026)
- [ ] Reconnaissance vocale (Speech-to-Text)
- [ ] Synthèse vocale avancée (Text-to-Speech)
- [ ] Support de langues additionnelles (IT, ES, PT)
- [ ] Intégration avec WhatsApp

### Phase 3 (Q3 2026)
- [ ] IA conversationnelle pour assistance
- [ ] Personnalisation des scripts par commune
- [ ] Dashboard temps réel pour campagnes
- [ ] A/B testing des messages vocaux

### Phase 4 (Q4 2026)
- [ ] Analyse de sentiment vocal
- [ ] Prédiction de taux de complétion
- [ ] Recommandations automatiques de meilleurs horaires
- [ ] Intégration avec CRM municipal

## Conclusion

Le système IVR de CiviAgora garantit une **participation démocratique vraiment universelle**. En offrant des canaux alternatifs accessibles (téléphone, SMS, appels automatisés), la plateforme élimine les barrières numériques et permet à tous les citoyens de faire entendre leur voix, quel que soit leur niveau de confort avec la technologie.

**Impact clé** : 40% des participants IVR sont des personnes ayant des besoins d'accessibilité qui n'auraient probablement pas participé via les canaux numériques traditionnels.
