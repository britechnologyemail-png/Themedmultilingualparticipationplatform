# Implementation: Legislative Consultations Module

## Vue d'ensemble

Ce document décrit l'implémentation complète du module de **Consultations Législatives** dans la plateforme CiviAgora, permettant la participation législative avec lecture de textes, annotation article par article, votes sur commentaires et synthèse IA.

## Architecture Complète

### 1. Types et DTOs (déjà implémentés)

Fichier: `/src/app/types/index.ts`

- ✅ `LegislativeConsultationDTO` - Consultation législative complète avec articles, stats, résumé IA
- ✅ `ArticleDTO` - Article individuel avec numéro, contenu localisé, annotations
- ✅ `ArticleAnnotationDTO` - Annotation/commentaire avec position, votes, réponses
- ✅ `LegislativeSummaryDTO` - Résumé IA avec articles clés, insights, recommandations
- ✅ `LegislativeConsultationSummaryDTO` - Version résumée pour les listes
- ✅ `CreateArticleAnnotationDTO` - DTO pour créer une annotation
- ✅ `VoteOnAnnotationDTO` - DTO pour voter sur une annotation

Types auxiliaires:
- ✅ `LegislativeTextType` - 'law' | 'regulation' | 'decree' | 'ordinance' | 'amendment'
- ✅ `ArticleStatus` - 'draft' | 'published' | 'amended' | 'repealed'

### 2. Données Mock (déjà implémentées)

Fichier: `/src/app/data/api-mock.ts`

- ✅ `mockLegislativeConsultations` - 2 consultations complètes
- ✅ `mockArticles` - Articles détaillés avec contenu multilingue
- ✅ `mockArticleAnnotations` - Annotations avec votes et réponses
- ✅ `mockLegislativeSummaries` - Résumés IA avec analyses
- ✅ Relations correctement peuplées entre consultations, articles et annotations

### 3. Services API (déjà implémentés)

Fichier: `/src/app/services/api.ts`

```typescript
legislativeConsultation: {
  getLegislativeConsultations(filters) // Liste avec filtres
  getLegislativeConsultation(id)        // Détail complet
  getLegislativeConsultationSummaries(filters) // Summaries
  getArticles(consultationId)           // Articles d'une consultation
  getArticle(articleId)                 // Détail d'un article
  getArticleAnnotations(articleId)      // Annotations d'un article
  createAnnotation(data)                // Créer une annotation
  voteOnAnnotation(data)                // Voter sur annotation
  getLegislativeSummary(consultationId) // Résumé IA
}
```

### 4. Hooks React Query (déjà implémentés)

Fichier: `/src/app/hooks/useApi.ts`

**Queries:**
- ✅ `useLegislativeConsultations(filters)` - Liste avec filtres
- ✅ `useLegislativeConsultation(id)` - Détail d'une consultation
- ✅ `useLegislativeConsultationSummaries(filters)` - Summaries
- ✅ `useArticles(consultationId)` - Articles
- ✅ `useArticle(articleId)` - Détail article
- ✅ `useArticleAnnotations(articleId)` - Annotations

**Mutations:**
- ✅ `useCreateAnnotation()` - Créer annotation avec invalidation cache
- ✅ `useVoteOnAnnotation()` - Voter avec invalidation cache

### 5. Routes et Navigation (✅ NOUVEAU)

Fichier: `/src/app/constants/routes.ts`

```typescript
PUBLIC_ROUTES: {
  LEGISLATIVE_CONSULTATIONS: '/legislative-consultations',
  LEGISLATIVE_CONSULTATION_DETAIL: '/legislative-consultations/:id',
}

// Helper
getLegislativeConsultationDetailUrl(id: string | number)
```

Fichier: `/src/app/App.tsx` - Routes ajoutées

### 6. Composants UI (✅ NOUVEAU)

#### A. LegislativeConsultationCard

Fichier: `/src/app/components/cards/LegislativeConsultationCard.tsx`

**Description:** Carte d'affichage pour les listes de consultations législatives

**Props:**
- `consultation: LegislativeConsultationSummaryDTO`

**Features:**
- Badge de type de texte (loi, règlement, etc.)
- StatusBadge pour le statut
- Statistiques (articles, annotations, participants)
- Plage de dates
- ThemeTag
- Lien vers la page de détail

**Design:**
- Couleur distinctive indigo pour les consultations législatives
- Icône `Scale` pour le type de texte
- Hover effect avec shadow
- Grid responsive

#### B. LegislativeConsultationsPage

Fichier: `/src/app/pages/LegislativeConsultationsPage.tsx`

**Description:** Page de liste des consultations législatives

**Features:**
- FilterBar avec 3 filtres:
  - Statut (all, open, upcoming, closed)
  - Type de texte (all, law, regulation, decree, ordinance, amendment)
  - Thème
- Utilise `useLegislativeConsultationSummaries()` avec filtres
- ContentGrid responsive
- LoadingSpinner et ErrorMessage
- EmptyState si aucun résultat
- PageLayout avec titre et description multilingue

#### C. LegislativeConsultationDetailPage

Fichier: `/src/app/pages/LegislativeConsultationDetailPage.tsx`

**Description:** Page de détail d'une consultation législative avec annotation article par article

**Structure:**
1. **Header fixe** avec:
   - Bouton retour
   - Type de texte + numéro de référence
   - Titre et description
   - Meta info (dates, stats)
   - ThemeTag

2. **Tabs:**
   - **Articles:** Lecture et annotation
   - **Synthèse IA:** Résumé et insights

3. **Onglet Articles:**
   - **Sidebar (3 cols):** Table des matières avec:
     - Liste cliquable des articles
     - Numéro + titre
     - Badge avec nombre d'annotations
     - Article sélectionné en surbrillance
   
   - **Contenu principal (9 cols):**
     - **Carte Article:**
       - Numéro + titre
       - Contenu complet
       - Nombre d'annotations
     
     - **Formulaire d'ajout d'annotation** (si consultation ouverte):
       - Textarea pour le commentaire
       - Bouton Publier
       - Toast de confirmation
     
     - **Liste des annotations:**
       - Avatar + nom + date
       - Badge "Mise en avant" pour annotations highlighted
       - Contenu
       - Boutons upvote/downvote avec compteurs
       - Score
       - Réponses imbriquées (récursif)

4. **Onglet Synthèse IA:**
   - Vue d'ensemble
   - Insights de participation:
     - Icône de sentiment
     - Tendance
     - Thèmes récurrents
   - Articles clés:
     - Badge de niveau de controverse (low/medium/high)
     - Résumé
     - Principales préoccupations
   - Recommandations numérotées

**Composants internes:**
- `AnnotationItem` - Composant récursif pour afficher annotations et réponses
- `AISummaryView` - Vue complète du résumé IA

**Interactions:**
- Sélection d'article dans la sidebar
- Ajout d'annotation avec `useCreateAnnotation()`
- Vote sur annotation avec `useVoteOnAnnotation()`
- Navigation entre onglets
- Invalidation automatique du cache React Query

**States:**
- `selectedArticleId` - Article actuellement sélectionné
- `annotationContent` - Contenu du formulaire
- `activeTab` - Onglet actif (articles | summary)

#### D. Section Dashboard

Fichier: `/src/app/pages/Dashboard.tsx`

**Ajout:** Nouvelle section "Consultations Législatives" après "Processus en cours"

**Contenu:**
- Titre et description
- Lien "Voir toutes"
- 2 cartes promotionnelles:
  - Transition Énergétique 2026 (leg_001)
  - Protection des Données Numériques (leg_002)
- Stats par carte (articles, annotations, participants)

### 7. Traductions (✅ NOUVEAU)

Fichier: `/src/app/contexts/LanguageContext.tsx`

```typescript
'nav.legislativeConsultations': {
  fr: 'Consultations Législatives',
  de: 'Gesetzgebungsberatungen',
  en: 'Legislative Consultations'
}
```

Toutes les autres traductions sont inline dans les composants (labels de types de texte, messages, etc.)

## Flux Utilisateur

### 1. Découverte

**Dashboard → Section "Consultations Législatives"**
- L'utilisateur voit 2 consultations mise en avant
- Clic sur une carte → Page de détail
- Clic sur "Voir toutes" → Page de liste

### 2. Liste

**Page `/legislative-consultations`**
- Filtrage par statut, type de texte, thème
- Vue en grille des consultations
- Clic sur une carte → Page de détail

### 3. Lecture et Annotation

**Page `/legislative-consultations/:id`**

**Étape 1:** Lecture de l'article
- Sélection d'un article dans la table des matières
- Lecture du contenu complet
- Vue des statistiques d'annotation

**Étape 2:** Ajout d'annotation
- Saisie du commentaire
- Clic sur "Publier"
- Toast de confirmation
- Annotation apparaît dans la liste

**Étape 3:** Vote sur annotations
- Parcours des annotations existantes
- Upvote/downvote
- Mise à jour immédiate des compteurs

**Étape 4:** Consultation de la synthèse IA
- Clic sur onglet "Synthèse IA"
- Vue d'ensemble de la participation
- Articles les plus controversés
- Recommandations

## États UI

### LoadingSpinner
- Pendant le chargement de la consultation
- Pendant le chargement des annotations

### ErrorMessage
- Si la consultation n'existe pas
- Si erreur API

### EmptyState
- Si aucune consultation ne correspond aux filtres
- Si aucune annotation sur un article

### Toasts (sonner)
- Succès: "Annotation ajoutée avec succès"
- Erreur: "Erreur lors de l'ajout de l'annotation"
- Erreur: "Veuillez entrer un commentaire"

### Disabled States
- Bouton "Publier" désactivé si:
  - Contenu vide
  - Mutation en cours
- Formulaire d'annotation invisible si consultation fermée

## Design System

### Couleurs principales
- **Indigo:** Couleur principale pour les consultations législatives
- **Purple:** Couleur secondaire pour les règlements
- **Green:** Pour les badges de statut "open"
- **Red:** Pour les badges "se termine bientôt"
- **Amber:** Pour les annotations "highlighted"

### Icônes (lucide-react)
- `Scale` - Consultations législatives (justice/loi)
- `FileText` - Articles
- `MessageSquare` - Annotations
- `Users` - Participants
- `Calendar` - Dates
- `ThumbsUp` / `ThumbsDown` - Votes
- `Send` - Publier
- `Sparkles` - IA
- `TrendingUp` / `TrendingDown` / `Minus` - Sentiment

### Composants UI utilisés
- Card, CardContent, CardHeader, CardTitle, CardDescription
- Button (variants: default, outline, ghost)
- Badge (variants: default, outline)
- Textarea
- Tabs, TabsContent, TabsList, TabsTrigger
- Separator
- Alert, AlertDescription
- StatusBadge (custom)
- ThemeTag (custom)

## Patterns Techniques

### 1. React Query
- Cache automatique avec `staleTime`
- Invalidation sur mutation
- Optimistic updates possibles
- Error handling centralisé

### 2. Multilingue
- `tLocal()` pour LocalizedString
- `t()` pour clés de traduction
- Labels inline pour contenu spécifique

### 3. Routing
- Paramètres d'URL typés avec `useParams<{ id: string }>()`
- Helpers pour générer les URLs
- Navigation avec `Link` et `useNavigate`

### 4. Responsive
- Grid avec breakpoints (1 col mobile, 2 cols tablet, 3+ cols desktop)
- Sidebar sticky sur desktop
- Stack vertical sur mobile

## Points d'Extension

### Fonctionnalités futures possibles

1. **Annotation avec sélection de texte:**
   - Highlight d'une portion spécifique
   - Position start/end dans ArticleAnnotationDTO (déjà prévu)

2. **Filtres avancés sur annotations:**
   - Par score
   - Par date
   - Par statut (highlighted, etc.)

3. **Export de la synthèse IA:**
   - PDF
   - Document Word

4. **Notifications:**
   - Nouvelle annotation sur article suivi
   - Vote sur mon annotation
   - Réponse à mon annotation

5. **Gamification:**
   - Badges pour participation active
   - Classement des contributeurs

6. **Modération:**
   - Signalement d'annotations
   - Approbation avant publication

## Tests Recommandés

### Unit Tests
- [ ] Formatage des dates dans les cartes
- [ ] Labels de type de texte
- [ ] Calculs de progression (controversialité, score)

### Integration Tests
- [ ] Création d'annotation
- [ ] Vote sur annotation
- [ ] Filtrage de la liste
- [ ] Navigation entre articles

### E2E Tests
- [ ] Flux complet: Liste → Détail → Annotation → Vote
- [ ] Changement de langue
- [ ] Responsive mobile/desktop

## Conclusion

Le module de **Consultations Législatives** est maintenant complètement implémenté avec:

✅ Architecture backend complète (DTOs, mocks, API, hooks)
✅ 3 nouveaux composants UI (Card, ListPage, DetailPage)
✅ Routes et navigation
✅ Système d'annotation article par article
✅ Votes sur commentaires (upvote/downvote)
✅ Synthèse IA
✅ Design cohérent avec la plateforme
✅ Multilingue (FR/DE/EN)
✅ Responsive mobile/desktop
✅ Integration dans le Dashboard

La plateforme CiviAgora dispose maintenant d'un outil de participation législative moderne et complet!
