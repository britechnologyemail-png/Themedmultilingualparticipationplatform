# Migration des Données Mock - Statut Complet ✅

## Date de dernière mise à jour
9 janvier 2026

## Résumé Exécutif
Migration réussie de toutes les pages front-office principales de l'ancien système `mockData.ts` vers les hooks React Query avec DTOs TypeScript complets.

---

## ✅ Pages Migrées (COMPLÈTES)

### 1. Dashboard.tsx ✅
**Statut**: Complètement migrée avant cette session  
**Hooks utilisés**: 
- `useDashboardStats()`
- `useConsultations({ status: 'open' })`
- `usePetitions({ status: 'open' })`
- `useVotes({ status: 'open' })`
- `useAssemblies()`
- `useThemes()`

**DTOs**: `DashboardStatsDTO`, `ConsultationDTO`, `PetitionDTO`, `VoteDTO`, `AssemblyDTO`, `ThemeDTO`

---

### 2. ConsultationsPage.tsx ✅
**Statut**: MIGRÉE (session actuelle)  
**Hooks utilisés**:
- `useConsultations()` - Liste complète des consultations
- `useThemes()` - Pour les filtres thématiques

**DTOs**: `ConsultationDTO`, `ThemeDTO`

**Changements effectués**:
- ❌ Suppression de `import { consultations } from '../data/mockData'`
- ✅ Ajout de `import { useConsultations, useThemes } from '../hooks/useApi'`
- ✅ Ajout de `import type { ConsultationDTO } from '../types'`
- ✅ Gestion des états `isLoading` et `error`
- ✅ Utilisation de `consultation.title[language]` pour LocalizedString
- ✅ Utilisation de `consultation.registeredParticipants` depuis le DTO
- ✅ Utilisation de `consultation.stats.totalComments` pour les statistiques
- ✅ Utilisation de `consultation.type` avec les types corrects (`online_debate`, `citizen_proposal`, `public_meeting`)
- ✅ Utilisation de `consultation.slug` pour les liens
- ✅ Utilisation de `theme.name[language]` dans les filtres

**Statistiques affichées**:
- Total consultations: `consultations?.length || 0`
- Consultations ouvertes: `consultations?.filter(c => c.status === 'open').length || 0`
- Total participants: `consultations?.reduce((sum, c) => sum + (c.registeredParticipants || 0), 0) || 0`
- Total contributions: `consultations?.reduce((sum, c) => sum + (c.stats?.totalComments || 0), 0) || 0`

---

### 3. PetitionsPage.tsx ✅
**Statut**: MIGRÉE (session actuelle)  
**Hooks utilisés**:
- `usePetitions()` - Liste complète des pétitions
- `useThemes()` - Pour les filtres thématiques

**DTOs**: `PetitionDTO`, `ThemeDTO`

**Changements effectués**:
- ❌ Suppression de `import { petitions } from '../data/mockData'`
- ✅ Ajout de `import { usePetitions, useThemes } from '../hooks/useApi'`
- ✅ Ajout de `import type { PetitionDTO } from '../types'`
- ✅ Gestion des états `isLoading` et `error`
- ✅ Utilisation de `petition.currentSignatures` au lieu de `petition.current`
- ✅ Utilisation de `petition.targetSignatures` au lieu de `petition.target`
- ✅ Utilisation de `petition.status` avec types corrects (`open`, `closed`, `under_review`)
- ✅ Utilisation de `petition.endDate` pour calcul des jours restants
- ✅ Utilisation de `petition.title` et `petition.description` (LocalizedString implicite dans le DTO)
- ✅ Fonctionnalité de signature/désignature conservée (état local)

**Statistiques affichées**:
- Pétitions actives: `petitions?.filter((p) => p.status === 'open').length || 0`
- Seuil atteint: `petitions?.filter((p) => p.status === 'under_review').length || 0`
- Total pétitions: `petitions?.length || 0`
- Signatures totales: `petitions?.reduce((sum, p) => sum + (p.currentSignatures || 0), 0) || 0`

---

### 4. VotesPage.tsx ✅
**Statut**: MIGRÉE (session actuelle)  
**Hooks utilisés**:
- `useVotes()` - Liste complète des votes
- `useThemes()` - Pour les filtres thématiques

**DTOs**: `VoteDTO`, `ThemeDTO`

**Changements effectués**:
- ❌ Suppression de `import { votes } from '../data/mockData'`
- ✅ Ajout de `import { useVotes, useThemes } from '../hooks/useApi'`
- ✅ Ajout de `import type { VoteDTO } from '../types'`
- ✅ Gestion des états `isLoading` et `error`
- ✅ Utilisation de `vote.stats?.totalVoters` pour les participants
- ✅ Utilisation de `vote.title[language]` et `vote.question[language]` pour LocalizedString
- ✅ Utilisation de `vote.options` avec la structure DTO complète
- ✅ Utilisation de `vote.type` (referendum, consultation)
- ✅ Utilisation de `vote.startDate` et `vote.endDate`
- ✅ Affichage des résultats en temps réel pour votes ouverts
- ✅ Affichage des options simples pour votes à venir

**Statistiques affichées**:
- Votes ouverts: `votes?.filter((v) => v.status === 'open').length || 0`
- Votes à venir: `votes?.filter((v) => v.status === 'upcoming').length || 0`
- Total votes: `votes?.length || 0`
- Total participants: `votes?.reduce((sum, v) => sum + (v.stats?.totalVoters || 0), 0) || 0`

---

## ⏳ Pages À Migrer (RESTANTES)

### 5. ThemesPage.tsx
**Priorité**: HAUTE  
**Hooks nécessaires**: `useThemes()`, `useConsultations()`, `usePetitions()`, `useVotes()`  
**DTOs**: `ThemeDTO`, `ConsultationDTO`, `PetitionDTO`, `VoteDTO`

**À changer**:
```typescript
// ❌ Ancien
import { participatoryProcesses, consultations, petitions, votes } from '../data/mockData';

// ✅ Nouveau
import { useThemes, useConsultations, usePetitions, useVotes } from '../hooks/useApi';
import type { ThemeDTO } from '../types';

const { data: themes, isLoading } = useThemes();
const { data: consultations } = useConsultations();
const { data: petitions } = usePetitions();
const { data: votes } = useVotes();
```

---

### 6. ConsultationDetailPage.tsx
**Priorité**: MOYENNE  
**Hooks nécessaires**: `useConsultation(idOrSlug)`  
**DTOs**: `ConsultationDTO`

**À changer**:
```typescript
// ❌ Ancien
import { consultations } from '../data/mockData';
const consultation = consultations.find(c => c.id === id);

// ✅ Nouveau
import { useConsultation } from '../hooks/useApi';
import type { ConsultationDTO } from '../types';

const { id } = useParams();
const { data: consultation, isLoading, error } = useConsultation(id);
```

**Points d'attention**:
- Utiliser `consultation.title[language]` et `consultation.description[language]`
- Utiliser `consultation.phases` pour afficher les phases
- Utiliser `consultation.questions` pour afficher les questions
- Utiliser `consultation.documents` pour les documents joints
- Utiliser `consultation.author` et `consultation.organizer` pour les métadonnées

---

### 7. PetitionDetailPage.tsx
**Priorité**: MOYENNE  
**Hooks nécessaires**: `usePetition(idOrSlug)`, `useSignPetition()`  
**DTOs**: `PetitionDTO`

**À changer**:
```typescript
// ❌ Ancien
import { petitions } from '../data/mockData';
const petition = petitions.find(p => p.id === petitionId);

// ✅ Nouveau
import { usePetition, useSignPetition } from '../hooks/useApi';
import type { PetitionDTO } from '../types';

const { petitionId } = useParams();
const { data: petition, isLoading, error } = usePetition(petitionId);
const { mutate: signPetition } = useSignPetition();
```

**Points d'attention**:
- Utiliser `petition.title[language]`, `petition.description[language]`, `petition.content[language]`
- Utiliser `petition.currentSignatures` et `petition.targetSignatures`
- Utiliser `petition.progressPercentage` pour la barre de progression
- Utiliser `petition.milestones` pour les jalons
- Utiliser `petition.updates` pour les mises à jour
- Utiliser `petition.recipient` pour le destinataire

---

### 8. VoteDetailPage.tsx
**Priorité**: MOYENNE  
**Hooks nécessaires**: `useVote(idOrSlug)`, `useCastVote()`  
**DTOs**: `VoteDTO`, `VoteOptionDTO`

**À changer**:
```typescript
// ❌ Ancien
import { votes } from '../data/mockData';
const vote = votes.find(v => v.id === voteId);

// ✅ Nouveau
import { useVote, useCastVote } from '../hooks/useApi';
import type { VoteDTO } from '../types';

const { voteId } = useParams();
const { data: vote, isLoading, error } = useVote(voteId);
const { mutate: castVote } = useCastVote();
```

**Points d'attention**:
- Utiliser `vote.title[language]`, `vote.question[language]`, `vote.description[language]`
- Utiliser `vote.options` avec `option.text[language]`
- Utiliser `vote.stats` pour les statistiques complètes
- Utiliser `vote.hasVoted` pour afficher si l'utilisateur a déjà voté
- Utiliser `vote.votingMethod` pour déterminer le type de vote

---

### 9. ThemeDetailPage.tsx
**Priorité**: MOYENNE  
**Hooks nécessaires**: `useTheme(id)`  
**DTOs**: `ThemeWithProcessesDTO` (étend `ThemeDTO` avec processus liés)

**À changer**:
```typescript
// ❌ Ancien
import { participatoryProcesses, consultations, petitions, votes } from '../data/mockData';
import { getThemeById } from '../data/themes';

const theme = getThemeById(themeId);
const themeProcesses = participatoryProcesses.filter(p => p.themeId === themeId);
const themeConsultations = consultations.filter(c => c.themeId === themeId);
const themePetitions = petitions.filter(p => p.themeId === themeId);
const themeVotes = votes.filter(v => v.themeId === themeId);

// ✅ Nouveau
import { useTheme } from '../hooks/useApi';
import type { ThemeWithProcessesDTO } from '../types';

const { themeId } = useParams();
const { data: theme, isLoading, error } = useTheme(themeId);
// theme contient déjà:
// - theme.recentConsultations
// - theme.recentPetitions
// - theme.recentVotes
```

**Points d'attention**:
- Utiliser `theme.name[language]` et `theme.description[language]`
- Utiliser `theme.stats` pour les statistiques du thème
- Utiliser `theme.recentConsultations`, `theme.recentPetitions`, `theme.recentVotes`
- Tous ces champs sont déjà dans le DTO `ThemeWithProcessesDTO`

---

### 10. AssembliesPage.tsx
**Priorité**: MOYENNE  
**Hooks nécessaires**: `useAssemblies()`, `useThemes()`  
**DTOs**: `AssemblyDTO`, `ThemeDTO`

**À changer**:
```typescript
// ❌ Ancien
import { assemblies } from '../data/mockData';

// ✅ Nouveau
import { useAssemblies, useThemes } from '../hooks/useApi';
import type { AssemblyDTO } from '../types';

const { data: assemblies, isLoading, error } = useAssemblies();
const { data: themes } = useThemes();
```

**Points d'attention**:
- Utiliser `assembly.name[language]` et `assembly.description[language]`
- Utiliser `assembly.members` pour la liste des membres
- Utiliser `assembly.meetingSchedule` pour le calendrier
- Utiliser `assembly.decisionProcess` pour le processus de décision
- Utiliser `assembly.stats` pour les statistiques

---

### 11. ConferencesPage.tsx
**Priorité**: MOYENNE  
**Hooks nécessaires**: `useConferences()`, `useThemes()`  
**DTOs**: `ConferenceDTO`, `ThemeDTO`

**À changer**:
```typescript
// ❌ Ancien
import { conferences } from '../data/mockData';

// ✅ Nouveau
import { useConferences, useThemes } from '../hooks/useApi';
import type { ConferenceDTO } from '../types';

const { data: conferences, isLoading, error } = useConferences();
const { data: themes } = useThemes();
```

**Points d'attention**:
- Utiliser `conference.title[language]` et `conference.description[language]`
- Utiliser `conference.speakers` pour la liste des intervenants
- Utiliser `conference.sessions` pour les sessions
- Utiliser `conference.location` pour le lieu
- Utiliser `conference.registeredAttendees` pour le nombre de participants

---

### 12. SpeakerDetailPage.tsx
**Priorité**: BASSE  
**Hooks nécessaires**: `useSpeaker(id)`  
**DTOs**: `SpeakerDTO`

**À changer**:
```typescript
// ❌ Ancien
import { conferences } from '../data/mockData';
// Extraction manuelle du speaker depuis les conférences

// ✅ Nouveau
import { useSpeaker } from '../hooks/useApi';
import type { SpeakerDTO } from '../types';

const { speakerId } = useParams();
const { data: speaker, isLoading, error } = useSpeaker(speakerId);
```

**Points d'attention**:
- Utiliser `speaker.bio[language]` pour la biographie
- Utiliser `speaker.expertise` pour les domaines d'expertise
- Utiliser `speaker.upcomingConferences` pour les conférences à venir
- Utiliser `speaker.pastConferences` pour les conférences passées

---

### 13. GlobalSearch.tsx
**Priorité**: BASSE (Composant)  
**Hooks nécessaires**: Multiple hooks selon le contexte  
**DTOs**: Multiple DTOs

**À changer**:
```typescript
// ❌ Ancien
import { consultations, petitions, votes, conferences, participatoryProcesses } from '../data/mockData';

// ✅ Nouveau
import { useConsultations, usePetitions, useVotes, useConferences, useThemes } from '../hooks/useApi';

const { data: consultations } = useConsultations();
const { data: petitions } = usePetitions();
const { data: votes } = useVotes();
const { data: conferences } = useConferences();
const { data: themes } = useThemes();
```

**Points d'attention**:
- Implémenter une recherche côté client sur toutes les données
- Utiliser les champs `[language]` pour la recherche multilingue
- Gérer les états de chargement pour tous les hooks simultanément

---

### 14. SearchResultsPage.tsx
**Priorité**: BASSE  
**Hooks nécessaires**: Multiple hooks selon le contexte  
**DTOs**: Multiple DTOs

**À changer**:
```typescript
// ❌ Ancien
import { consultations, petitions, votes, conferences, participatoryProcesses } from '../data/mockData';

// ✅ Nouveau
import { useConsultations, usePetitions, useVotes, useConferences, useThemes } from '../hooks/useApi';

const { data: consultations } = useConsultations();
const { data: petitions } = usePetitions();
const { data: votes } = useVotes();
const { data: conferences } = useConferences();
const { data: themes } = useThemes();
```

**Points d'attention**:
- Utiliser le query param `?q=...` pour la recherche
- Filtrer les résultats sur tous les types de contenus
- Afficher les résultats par catégorie
- Gérer les états de chargement pour tous les hooks

---

## 📊 Statistiques de Migration

### Pages Front-Office Publiques
- **Total**: 14 pages identifiées
- **Migrées**: 4 pages (28.6%)
- **Restantes**: 10 pages (71.4%)

### Priorité
- **HAUTE (pages principales)**: 4 pages
  - ✅ Dashboard.tsx
  - ✅ ConsultationsPage.tsx
  - ✅ PetitionsPage.tsx
  - ✅ VotesPage.tsx
  - ⏳ ThemesPage.tsx (à migrer)

- **MOYENNE (pages de détail)**: 6 pages
  - Toutes à migrer

- **BASSE (composants secondaires)**: 3 pages/composants
  - Tous à migrer

---

## ⚠️ Points d'Attention Critiques

### 1. LocalizedString
**OBLIGATOIRE**: Tous les champs textuels multilingues dans les DTOs sont des objets `{ fr: string, de: string, en: string }`

```typescript
// ❌ FAUX
<h1>{consultation.title}</h1>  // Affiche [object Object]

// ✅ CORRECT
const { language } = useLanguage();
<h1>{consultation.title[language]}</h1>  // Affiche le texte correct
```

### 2. Optional Chaining
**OBLIGATOIRE**: Toujours utiliser l'optional chaining pour éviter les crashes

```typescript
// ❌ FAUX
const count = consultations.length;  // Crash si consultations est undefined

// ✅ CORRECT
const count = consultations?.length || 0;
```

### 3. États de Chargement
**OBLIGATOIRE**: Gérer `isLoading` et `error` pour chaque hook

```typescript
// ✅ PATTERN STANDARD
const { data, isLoading, error } = useConsultations();

if (isLoading) return <LoadingState />;
if (error) return <ErrorState />;
if (!data) return <EmptyState />;

// Utiliser les données
```

### 4. Nommage des Champs
**ATTENTION**: Les noms de champs ont changé entre l'ancien mockData et les DTOs

| Ancien mockData | Nouveau DTO | Type |
|----------------|-------------|------|
| `consultation.participants` | `consultation.registeredParticipants` | number |
| `consultation.supports` | `consultation.stats.totalComments` | number |
| `petition.current` | `petition.currentSignatures` | number |
| `petition.target` | `petition.targetSignatures` | number |
| `petition.status: 'threshold_reached'` | `petition.status: 'under_review'` | string |
| `vote.participants` | `vote.stats.totalVoters` | number |
| `consultation.type: 'debate'` | `consultation.type: 'online_debate'` | ConsultationType |
| `consultation.type: 'proposal'` | `consultation.type: 'citizen_proposal'` | ConsultationType |
| `consultation.type: 'meeting'` | `consultation.type: 'public_meeting'` | ConsultationType |

---

## 🎯 Checklist de Validation par Page

Pour chaque page migrée, vérifier:

- [ ] ✅ Import du/des hook(s) React Query approprié(s)
- [ ] ✅ Import des types DTO TypeScript
- [ ] ✅ **Suppression** complète de `import { ... } from '../data/mockData'`
- [ ] ✅ **Suppression** complète de `import { themes } from '../data/themes'` si utilise `useThemes()`
- [ ] ✅ Gestion de l'état `isLoading` avec UI appropriée
- [ ] ✅ Gestion de l'état `error` avec message d'erreur
- [ ] ✅ Protection contre `null`/`undefined` avec optional chaining
- [ ] ✅ Utilisation correcte des `LocalizedString` avec `[language]`
- [ ] ✅ Typage TypeScript complet (pas de `any`)
- [ ] ✅ **Toutes les données visibles** proviennent des DTOs
- [ ] ✅ Les compteurs et statistiques utilisent les vraies valeurs des DTOs
- [ ] ✅ Les filtres fonctionnent avec les données réelles
- [ ] ✅ Les liens utilisent les bons identifiants (id ou slug)
- [ ] ✅ Aucune valeur hardcodée ne reste dans l'UI

---

## 📝 Commandes de Vérification

### Vérifier qu'aucune page n'utilise encore mockData
```bash
grep -r "from '../data/mockData'" src/app/pages/
grep -r "from './data/mockData'" src/app/
```

### Vérifier que toutes les pages utilisent les hooks
```bash
grep -r "from '../hooks/useApi'" src/app/pages/
```

### Vérifier les imports de themes (devrait être remplacé par useThemes())
```bash
grep -r "from '../data/themes'" src/app/pages/
```

---

## 🚀 Prochaines Étapes

### Phase 1: Compléter les Pages Principales (Urgent)
1. ⏳ Migrer **ThemesPage.tsx**

### Phase 2: Migrer les Pages de Détail (Haute priorité)
2. ⏳ Migrer **ConsultationDetailPage.tsx**
3. ⏳ Migrer **PetitionDetailPage.tsx**
4. ⏳ Migrer **VoteDetailPage.tsx**
5. ⏳ Migrer **ThemeDetailPage.tsx**
6. ⏳ Migrer **AssembliesPage.tsx**
7. ⏳ Migrer **ConferencesPage.tsx**

### Phase 3: Migrer les Composants Secondaires (Moyenne priorité)
8. ⏳ Migrer **SpeakerDetailPage.tsx**
9. ⏳ Migrer **GlobalSearch.tsx**
10. ⏳ Migrer **SearchResultsPage.tsx**

### Phase 4: Back-Office Admin & SaaS (Futur)
11. ⏳ Auditer les pages admin (`/src/app/admin/pages/`)
12. ⏳ Auditer les pages saas (`/src/app/saas/pages/`)
13. ⏳ Créer des DTOs admin-spécifiques si nécessaire
14. ⏳ Créer des hooks admin-spécifiques si nécessaire

### Phase 5: Validation et Nettoyage (Final)
15. ⏳ Tests manuels de toutes les pages migrées
16. ⏳ Vérification TypeScript complète (`tsc --noEmit`)
17. ⏳ Ajouter `@deprecated` dans `/src/app/data/mockData.ts`
18. ⏳ Mettre à jour la documentation principale
19. ⏳ (Optionnel) Supprimer `mockData.ts` après validation complète

---

## 📚 Ressources

- **DTOs TypeScript**: `/src/app/types/index.ts`
- **Données Mock**: `/src/app/data/api-mock.ts`
- **Services API**: `/src/app/services/api.ts`
- **Hooks React Query**: `/src/app/hooks/useApi.ts`
- **Plan de Migration**: `/MOCK_DATA_INTEGRATION_PLAN.md`
- **Documentation React Query**: https://tanstack.com/query/latest

---

## ✅ Validation Finale

Une fois toutes les pages migrées, exécuter:

```bash
# 1. Vérifier qu'aucun import de mockData ne reste
grep -r "mockData" src/app/pages/ src/app/components/

# 2. Vérifier la compilation TypeScript
npx tsc --noEmit

# 3. Tester l'application
npm run dev
```

---

**Statut Global**: 🟡 Migration en cours - 28.6% complétée  
**Prochaine Action**: Continuer avec ThemesPage.tsx puis les pages de détail  
**Dernière Mise à Jour**: 9 janvier 2026
