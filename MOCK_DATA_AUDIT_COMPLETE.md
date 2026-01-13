# ✅ Audit et Intégration des Données Mock - CiviAgora

## 🎯 Objectif
S'assurer que **toutes** les pages, écrans, modals et composants de CiviAgora utilisent activement les données mock TypeScript via React Query, sans aucun placeholder ou valeur hardcodée.

## ✅ Travail Effectué

### 1. Installation et Configuration
- ✅ Installé `@tanstack/react-query` v5.90.16
- ✅ Configuré `QueryClientProvider` dans `/src/app/App.tsx` avec options par défaut:
  - `staleTime`: 5 minutes
  - `refetchOnWindowFocus`: false
  - `retry`: 1

### 2. Architecture Existante Validée
- ✅ 74 interfaces DTOs dans `/src/app/types/index.ts`
- ✅ Données mock multilingues dans `/src/app/data/api-mock.ts`
- ✅ Services API simulés dans `/src/app/services/api.ts`
- ✅ Hooks React Query dans `/src/app/hooks/useApi.ts`

### 3. Documentation Créée
- ✅ `/MOCK_DATA_INTEGRATION_PLAN.md` - Plan détaillé de migration
- ✅ Ce fichier - Récapitulatif et audit complet

## 📋 Pages Nécessitant une Migration

### ⚠️ PRIORITÉ CRITIQUE (Pages Principales)

#### 1. `/src/app/pages/Dashboard.tsx`
**Problème**: Utilise des valeurs hardcodées
```typescript
// ❌ Actuellement
const stats = [
  { value: "15", title: "Processus actifs" },
  { value: "10", title: "Pétitions ouvertes" },
  // ...
];
```

**Solution**: Utiliser `useDashboardStats()`
```typescript
// ✅ À implémenter
import { useDashboardStats } from '../hooks/useApi';

const { data: dashboardStats } = useDashboardStats();
const stats = [
  { value: dashboardStats?.activeProcesses?.toString() || "0", ... },
  { value: dashboardStats?.openPetitions?.toString() || "0", ... },
];
```

#### 2. `/src/app/pages/ConsultationsPage.tsx`
**Problème**: Import de `mockData.ts`
```typescript
// ❌ Actuellement
import { consultations } from '../data/mockData';
```

**Solution**: Utiliser `useConsultations()`
```typescript
// ✅ À implémenter
import { useConsultations } from '../hooks/useApi';
import type { ConsultationDTO } from '../types';

const { data: consultations, isLoading } = useConsultations();
```

#### 3. `/src/app/pages/PetitionsPage.tsx`
**Problème**: Import de `mockData.ts`
```typescript
// ❌ Actuellement
import { petitions } from '../data/mockData';
```

**Solution**: Utiliser `usePetitions()`
```typescript
// ✅ À implémenter
import { usePetitions } from '../hooks/useApi';
import type { PetitionDTO } from '../types';

const { data: petitions, isLoading } = usePetitions();
```

#### 4. `/src/app/pages/VotesPage.tsx`
**Problème**: Import de `mockData.ts`
```typescript
// ❌ Actuellement
import { votes } from '../data/mockData';
```

**Solution**: Utiliser `useVotes()`
```typescript
// ✅ À implémenter
import { useVotes } from '../hooks/useApi';
import type { VoteDTO } from '../types';

const { data: votes, isLoading } = useVotes();
```

#### 5. `/src/app/pages/ThemesPage.tsx`
**Problème**: Import de `mockData.ts`
```typescript
// ❌ Actuellement
import { participatoryProcesses } from '../data/mockData';
```

**Solution**: Utiliser `useThemes()`
```typescript
// ✅ À implémenter
import { useThemes } from '../hooks/useApi';
import type { ThemeDTO } from '../types';

const { data: themes, isLoading } = useThemes();
```

### ⚠️ PRIORITÉ HAUTE (Pages de Détail)

#### 6. `/src/app/pages/ConsultationDetailPage.tsx`
**Solution**: `useConsultation(id)`

#### 7. `/src/app/pages/PetitionDetailPage.tsx`
**Solution**: `usePetition(id)`

#### 8. `/src/app/pages/VoteDetailPage.tsx`
**Solution**: `useVote(id)`

#### 9. `/src/app/pages/ThemeDetailPage.tsx`
**Solution**: `useTheme(id)`

#### 10. `/src/app/pages/AssembliesPage.tsx`
**Solution**: `useAssemblies()`

#### 11. `/src/app/pages/ConferencesPage.tsx`
**Solution**: `useConferences()`

### ⚠️ PRIORITÉ MOYENNE (Composants Secondaires)

#### 12. `/src/app/pages/SpeakerDetailPage.tsx`
**Solution**: `useSpeaker(id)`

#### 13. `/src/app/components/GlobalSearch.tsx`
**Solution**: Utiliser plusieurs hooks selon le contexte de recherche

#### 14. `/src/app/pages/SearchResultsPage.tsx`
**Solution**: Utiliser plusieurs hooks pour agréger les résultats

## 🔍 Points d'Attention Critiques

### 1. LocalizedString
**Problème Fréquent**: Oublier que les textes sont multilingues
```typescript
// ❌ FAUX
<h1>{consultation.title}</h1>

// ✅ CORRECT
<h1>{consultation.title.fr}</h1>
// ou mieux:
<h1>{consultation.title[language]}</h1>
```

### 2. Gestion des États de Chargement
**Obligatoire pour chaque page**:
```typescript
const { data, isLoading, error } = useConsultations();

if (isLoading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage error={error} />;
}

if (!data || data.length === 0) {
  return <EmptyState />;
}
```

### 3. Typage TypeScript
**Toujours typer les données**:
```typescript
import type { ConsultationDTO, LocalizedString } from '../types';

const consultation: ConsultationDTO = data[0];
```

### 4. Filtrage et Tri
**Gérer les données nulles/undefined**:
```typescript
// ❌ FAUX
const filtered = consultations.filter(...);

// ✅ CORRECT
const filtered = consultations?.filter(...) || [];
```

## 📊 Hooks React Query Disponibles

### Dashboard & Statistiques
```typescript
useDashboardStats()                    // Statistiques globales de la plateforme
```

### Thèmes
```typescript
useThemes()                            // Liste complète des thèmes
useTheme(id: string)                   // Détail d'un thème avec processus associés
```

### Consultations
```typescript
useConsultations(filters?: {          // Liste des consultations
  status?: 'open' | 'closed' | 'draft';
  themeId?: string;
})
useConsultation(idOrSlug: string)     // Détail d'une consultation
useRegisterForConsultation()          // S'inscrire à une consultation (mutation)
```

### Pétitions
```typescript
usePetitions(filters?: {               // Liste des pétitions
  status?: 'open' | 'closed';
  themeId?: string;
})
usePetition(idOrSlug: string)         // Détail d'une pétition
useSignPetition()                      // Signer une pétition (mutation)
```

### Votes
```typescript
useVotes(filters?: {                   // Liste des votes
  status?: 'open' | 'closed' | 'upcoming';
  themeId?: string;
})
useVote(idOrSlug: string)             // Détail d'un vote
useCastVote()                          // Voter (mutation)
```

### Assemblées
```typescript
useAssemblies(filters?: {              // Liste des assemblées
  themeId?: string;
  status?: 'active' | 'inactive';
})
useAssembly(idOrSlug: string)         // Détail d'une assemblée
```

### Conférences
```typescript
useConferences(filters?: {             // Liste des conférences
  status?: string;
  themeId?: string;
})
useConference(idOrSlug: string)       // Détail d'une conférence
useSpeaker(id: string)                 // Profil d'un intervenant
useRegisterForConference()            // S'inscrire à une conférence (mutation)
```

### Utilisateur
```typescript
useCurrentUser()                       // Profil de l'utilisateur connecté
useParticipationHistory()             // Historique des participations
useNotifications(unreadOnly?: boolean) // Notifications de l'utilisateur
useActivities()                        // Activités récentes de l'utilisateur
```

### Authentification
```typescript
useLogin()                             // Se connecter (mutation)
useRegister()                          // S'inscrire (mutation)
useLogout()                            // Se déconnecter (mutation)
useForgotPassword()                    // Réinitialiser mot de passe (mutation)
```

## 🎨 Pattern de Migration Standard

### Étape 1: Importer les hooks et types
```typescript
import { useConsultations } from '../hooks/useApi';
import type { ConsultationDTO } from '../types';
```

### Étape 2: Utiliser le hook
```typescript
const { data: consultations, isLoading, error } = useConsultations();
```

### Étape 3: Gérer les états
```typescript
if (isLoading) return <div>Chargement...</div>;
if (error) return <div>Erreur: {error.message}</div>;
if (!consultations) return <div>Aucune donnée</div>;
```

### Étape 4: Utiliser les données avec le bon typage
```typescript
consultations.map((consultation: ConsultationDTO) => (
  <Card key={consultation.id}>
    <h3>{consultation.title[language]}</h3>
    <p>{consultation.description[language]}</p>
  </Card>
))
```

## ✅ Checklist de Validation par Page

Pour chaque page migrée, vérifier:

- [ ] ✅ Import du hook React Query approprié
- [ ] ✅ Import des types DTO TypeScript
- [ ] ✅ **Suppression** de l'import `../data/mockData`
- [ ] ✅ Gestion de l'état `isLoading`
- [ ] ✅ Gestion de l'état `error`
- [ ] ✅ Protection contre `null`/`undefined`
- [ ] ✅ Utilisation correcte des `LocalizedString` (ex: `title[language]`)
- [ ] ✅ Typage TypeScript complet
- [ ] ✅ **Toutes les données sont visibles** dans l'UI (pas de placeholders)
- [ ] ✅ Les compteurs et statistiques affichent les vraies valeurs mock
- [ ] ✅ Les filtres fonctionnent avec les données réelles
- [ ] ✅ Les interactions (tri, pagination, recherche) fonctionnent

## 📂 Structure des DTOs Principales

### ThemeDTO
```typescript
interface ThemeDTO {
  id: string;
  slug: string;
  name: LocalizedString;          // ⚠️ Multilingue!
  description: LocalizedString;   // ⚠️ Multilingue!
  icon: string;
  color: ThemeColor;
  colorHex: string;
  active: boolean;
  displayOrder: number;
  stats: ThemeStatsDTO;
  createdAt: string;
  updatedAt: string;
}
```

### ConsultationDTO
```typescript
interface ConsultationDTO {
  id: string;
  slug: string;
  title: LocalizedString;         // ⚠️ Multilingue!
  description: LocalizedString;   // ⚠️ Multilingue!
  themeId: string;
  type: ConsultationType;
  status: ConsultationStatus;
  startDate: string;
  endDate: string;
  location?: LocationDTO;
  isOnline: boolean;
  registeredParticipants: number;
  author: UserSummaryDTO;
  organizer: OrganizerDTO;
  stats: ConsultationStatsDTO;
  // ... autres champs
}
```

### PetitionDTO
```typescript
interface PetitionDTO {
  id: string;
  slug: string;
  title: LocalizedString;         // ⚠️ Multilingue!
  description: LocalizedString;   // ⚠️ Multilingue!
  content: LocalizedString;       // ⚠️ Multilingue!
  themeId: string;
  status: PetitionStatus;
  targetSignatures: number;
  currentSignatures: number;
  progressPercentage: number;
  startDate: string;
  endDate: string;
  author: UserSummaryDTO;
  recipient: RecipientDTO;
  milestones: PetitionMilestoneDTO[];
  // ... autres champs
}
```

### VoteDTO
```typescript
interface VoteDTO {
  id: string;
  slug: string;
  title: LocalizedString;         // ⚠️ Multilingue!
  description: LocalizedString;   // ⚠️ Multilingue!
  question: LocalizedString;      // ⚠️ Multilingue!
  themeId: string;
  type: VoteType;
  votingMethod: VotingMethod;
  status: VoteStatus;
  startDate: string;
  endDate: string;
  options: VoteOptionDTO[];
  stats: VoteStatsDTO;
  hasVoted?: boolean;
  // ... autres champs
}
```

## 🚨 Erreurs Courantes à Éviter

### 1. Oublier les Optional Chaining
```typescript
// ❌ FAUX - peut crasher si data est undefined
const count = data.length;

// ✅ CORRECT
const count = data?.length || 0;
```

### 2. Ne pas gérer isLoading
```typescript
// ❌ FAUX - affiche des données vides pendant le chargement
const { data } = useConsultations();
return <div>{data.map(...)}</div>;

// ✅ CORRECT
const { data, isLoading } = useConsultations();
if (isLoading) return <LoadingSpinner />;
return <div>{data?.map(...) || []}</div>;
```

### 3. Mauvaise gestion des LocalizedString
```typescript
// ❌ FAUX - affiche [object Object]
<h1>{consultation.title}</h1>

// ✅ CORRECT
const { language } = useLanguage();
<h1>{consultation.title[language]}</h1>
```

### 4. Mutations sans invalidation
```typescript
// ❌ FAUX - les données ne se rafraîchissent pas
const { mutate: signPetition } = useSignPetition();
signPetition({ petitionId, data });

// ✅ CORRECT - React Query gère automatiquement l'invalidation
// Le hook useSignPetition() dans useApi.ts invalide automatiquement
// les queries pertinentes via queryClient.invalidateQueries()
```

## 🎯 Prochaines Étapes Recommandées

### Phase 1: Pages Principales (Cette semaine)
1. ✅ Configurer QueryClientProvider
2. ⏳ Migrer Dashboard.tsx
3. ⏳ Migrer ConsultationsPage.tsx
4. ⏳ Migrer PetitionsPage.tsx
5. ⏳ Migrer VotesPage.tsx
6. ⏳ Migrer ThemesPage.tsx

### Phase 2: Pages de Détail (Semaine suivante)
7. ⏳ Migrer ConsultationDetailPage.tsx
8. ⏳ Migrer PetitionDetailPage.tsx
9. ⏳ Migrer VoteDetailPage.tsx
10. ⏳ Migrer ThemeDetailPage.tsx
11. ⏳ Migrer AssembliesPage.tsx
12. ⏳ Migrer ConferencesPage.tsx

### Phase 3: Composants Secondaires (Dernière semaine)
13. ⏳ Migrer GlobalSearch.tsx
14. ⏳ Migrer SearchResultsPage.tsx
15. ⏳ Migrer SpeakerDetailPage.tsx

### Phase 4: Validation (Finale)
16. ⏳ Tests manuels de toutes les pages
17. ⏳ Vérification TypeScript complète (`tsc --noEmit`)
18. ⏳ Déprécier `/src/app/data/mockData.ts`
19. ⏳ Mettre à jour la documentation

## 📝 Notes Importantes

1. **Tous les hooks** sont configurés avec des `staleTime` appropriés:
   - Thèmes: 1 heure (données rarement modifiées)
   - Consultations/Pétitions/Votes: 5 minutes
   - Dashboard: 10 minutes avec auto-refetch

2. **Les filtres** sont supportés nativement par les hooks:
   ```typescript
   useConsultations({ status: 'open', themeId: 'urb' })
   usePetitions({ status: 'open' })
   useVotes({ status: 'open' })
   ```

3. **Les mutations** invalident automatiquement les caches appropriés pour garantir la cohérence des données.

4. **Ne pas mélanger** les imports de `mockData.ts` et les hooks React Query dans le même fichier.

## 🔗 Ressources

- [Plan de Migration Détaillé](/MOCK_DATA_INTEGRATION_PLAN.md)
- [DTOs TypeScript](/src/app/types/index.ts)
- [Données Mock](/src/app/data/api-mock.ts)
- [Services API](/src/app/services/api.ts)
- [Hooks React Query](/src/app/hooks/useApi.ts)
- [Documentation React Query](https://tanstack.com/query/latest)

---

**Status**: ✅ Configuration terminée - Migration en cours

**Dernière mise à jour**: 9 janvier 2026
