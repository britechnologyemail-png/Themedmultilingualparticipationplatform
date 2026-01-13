# Plan d'intégration des données mock avec React Query

## État actuel ✅

### Architecture existante
- ✅ 74 interfaces DTOs TypeScript dans `/src/app/types/index.ts`
- ✅ Données mock réalistes dans `/src/app/data/api-mock.ts`  
- ✅ Services API simulés dans `/src/app/services/api.ts`
- ✅ Hooks React Query dans `/src/app/hooks/useApi.ts`
- ✅ @tanstack/react-query v5.90.16 installé

### Problèmes identifiés ❌

1. **QueryClientProvider manquant** - App.tsx n'a pas de QueryClientProvider configuré
2. **Pages utilisant ancien mockData** - 13 fichiers utilisent `/src/app/data/mockData.ts` au lieu des hooks React Query:
   - `/src/app/components/GlobalSearch.tsx`
   - `/src/app/pages/AssembliesPage.tsx`
   - `/src/app/pages/ConferencesPage.tsx`
   - `/src/app/pages/ConsultationDetailPage.tsx`
   - `/src/app/pages/ConsultationsPage.tsx`
   - `/src/app/pages/PetitionDetailPage.tsx`
   - `/src/app/pages/PetitionsPage.tsx`
   - `/src/app/pages/SearchResultsPage.tsx`
   - `/src/app/pages/SpeakerDetailPage.tsx`
   - `/src/app/pages/ThemeDetailPage.tsx`
   - `/src/app/pages/ThemesPage.tsx`
   - `/src/app/pages/VoteDetailPage.tsx`
   - `/src/app/pages/VotesPage.tsx`

3. **Dashboard avec données hardcodées** - `/src/app/pages/Dashboard.tsx` utilise des valeurs hardcodées au lieu de `useDashboardStats()`

## Plan d'action 🎯

### Étape 1: Configurer React Query dans App.tsx
- Créer un QueryClient
- Wrapper l'application avec QueryClientProvider

### Étape 2: Migrer les pages vers React Query hooks
Pour chaque page, remplacer:
```typescript
// ❌ Ancien (à supprimer)
import { consultations } from '../data/mockData';

// ✅ Nouveau (à utiliser)
import { useConsultations } from '../hooks/useApi';
const { data: consultations, isLoading } = useConsultations();
```

### Étape 3: Utiliser les DTOs TypeScript
Assurer que chaque composant utilise les types corrects:
```typescript
import type { ConsultationDTO, PetitionDTO } from '../types';
```

### Étape 4: Gérer les états de chargement
Ajouter des états de chargement pour une meilleure UX:
```typescript
if (isLoading) return <div>Chargement...</div>;
if (!data) return <div>Aucune donnée</div>;
```

## Pages à migrer (par priorité)

### Priorité HAUTE (pages principales)
1. ✅ Dashboard.tsx - Déjà commencé
2. ConsultationsPage.tsx - Utilise `useConsultations()`
3. PetitionsPage.tsx - Utilise `usePetitions()`
4. VotesPage.tsx - Utilise `useVotes()`
5. ThemesPage.tsx - Utilise `useThemes()`

### Priorité MOYENNE (pages de détail)
6. ConsultationDetailPage.tsx - Utilise `useConsultation(id)`
7. PetitionDetailPage.tsx - Utilise `usePetition(id)`
8. VoteDetailPage.tsx - Utilise `useVote(id)`
9. ThemeDetailPage.tsx - Utilise `useTheme(id)`
10. AssembliesPage.tsx - Utilise `useAssemblies()`
11. ConferencesPage.tsx - Utilise `useConferences()`

### Priorité BASSE (composants secondaires)
12. SpeakerDetailPage.tsx - Utilise `useSpeaker(id)`
13. GlobalSearch.tsx - Utilise plusieurs hooks selon le contexte
14. SearchResultsPage.tsx - Utilise plusieurs hooks

## Structure des DTOs disponibles

### Modules principaux
- **Consultations**: `ConsultationDTO`, `ConsultationSummaryDTO`
- **Pétitions**: `PetitionDTO`, `PetitionSummaryDTO`
- **Votes**: `VoteDTO`, `VoteSummaryDTO`
- **Assemblées**: `AssemblyDTO`, `AssemblySummaryDTO`
- **Conférences**: `ConferenceDTO`, `ConferenceSummaryDTO`
- **Thèmes**: `ThemeDTO`, `ThemeWithProcessesDTO`

### Types communs
- `LocalizedString` - Contenu multilingue (fr/de/en)
- `PaginationMeta` - Métadonnées de pagination
- `ApiResponse<T>` - Wrapper de réponse API
- `UserDTO`, `DocumentDTO`, etc.

## Hooks disponibles

### Dashboard
```typescript
useDashboardStats() // Statistiques globales
```

### Données
```typescript
useThemes()
useTheme(id)
useConsultations(filters?)
useConsultation(idOrSlug)
usePetitions(filters?)
usePetition(idOrSlug)
useVotes(filters?)
useVote(idOrSlug)
useAssemblies(filters?)
useAssembly(idOrSlug)
useConferences(filters?)
useConference(idOrSlug)
useSpeaker(id)
```

### Utilisateur
```typescript
useCurrentUser()
useParticipationHistory()
useNotifications(unreadOnly?)
useActivities()
```

### Actions
```typescript
useRegisterForConsultation()
useSignPetition()
useCastVote()
useRegisterForConference()
```

## Exemple de migration complète

### Avant (❌)
```typescript
import { consultations } from '../data/mockData';

export function ConsultationsPage() {
  const filteredConsultations = consultations.filter(...);
  
  return (
    <div>
      {filteredConsultations.map(consultation => (
        <Card key={consultation.id}>
          {consultation.title}
        </Card>
      ))}
    </div>
  );
}
```

### Après (✅)
```typescript
import { useConsultations } from '../hooks/useApi';
import type { ConsultationDTO } from '../types';

export function ConsultationsPage() {
  const { data: consultations, isLoading, error } = useConsultations();
  const filteredConsultations = consultations?.filter(...) || [];
  
  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  
  return (
    <div>
      {filteredConsultations.map((consultation: ConsultationDTO) => (
        <Card key={consultation.id}>
          {consultation.title.fr}
        </Card>
      ))}
    </div>
  );
}
```

## Checklist de validation

Pour chaque page migrée, vérifier:
- [ ] Import du hook React Query approprié
- [ ] Import des types DTO TypeScript
- [ ] Suppression de l'import `mockData.ts`
- [ ] Gestion de l'état `isLoading`
- [ ] Gestion de l'état `error`  
- [ ] Utilisation correcte des `LocalizedString` (ex: `title.fr` au lieu de `title`)
- [ ] Typage TypeScript complet
- [ ] Données visibles dans l'UI (pas de placeholders)

## Notes importantes

1. **LocalizedString**: Toutes les chaînes multilingues dans les DTOs sont des objets `{ fr: string, de: string, en: string }`. Il faut utiliser `data.title[language]` ou `data.title.fr`.

2. **Stale Time**: Les hooks ont des `staleTime` configurés:
   - Thèmes: 1 heure (rarement changent)
   - Consultations/Pétitions/Votes: 5 minutes
   - Dashboard stats: 10 minutes (avec refetch automatique)

3. **Filtrage**: Les hooks acceptent des paramètres de filtrage:
   ```typescript
   useConsultations({ status: 'open', themeId: 'urb' })
   usePetitions({ status: 'open' })
   useVotes({ status: 'open' })
   ```

4. **Dépendances circulaires**: Éviter d'importer `mockData.ts` et les hooks en même temps.

## Dépréciation de l'ancien système

Une fois la migration terminée:
1. Ajouter un commentaire `@deprecated` dans `/src/app/data/mockData.ts`
2. Documenter la migration dans le README
3. (Optionnel) Supprimer `mockData.ts` après validation complète

## Prochaines étapes

1. ✅ Installer @tanstack/react-query
2. ⏳ Configurer QueryClientProvider dans App.tsx
3. ⏳ Migrer Dashboard.tsx
4. ⏳ Migrer ConsultationsPage.tsx
5. ⏳ Migrer PetitionsPage.tsx
6. ⏳ Migrer VotesPage.tsx
7. ⏳ Migrer ThemesPage.tsx
8. ⏳ Migrer les pages de détail
9. ⏳ Migrer les composants secondaires
10. ⏳ Tests de validation complète
