# Index du Design System - CiviAgora

**Version** : 1.0  
**Date** : Janvier 2026  
**Statut** : ✅ Maquette sécurisée à 100% pour exploitation React

---

## 🎯 Objectif de cette documentation

Cette suite de documents garantit que **tous les composants React de CiviAgora sont normalisés, documentés et prêts pour l'exploitation en production**, sans aucune variation ad-hoc. Chaque élément visuel suit le design system institutionnel moderne GovTech/CivicTech.

---

## 📚 Documents disponibles

### 1. 🎨 [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

**Rôle** : Documentation technique complète du design system  
**Contenu** :
- Palette de couleurs (primaires, secondaires, sémantiques, thématiques)
- Typographie (hiérarchie, échelle, poids)
- Espacements (padding, margins, gaps)
- Composants UI de base (Button, Card, Badge, Input, Select, etc.)
- Composants applicatifs (StatusBadge, ThemeTag, KPICard, FilterBar, etc.)
- États UI (LoadingSpinner, EmptyState, ErrorMessage)
- Modèles de pages React Query
- Animations et transitions
- Gradients par module

**Public** : Développeurs, designers  
**Usage** : Référence technique pour implémenter ou modifier des composants

---

### 2. 🔄 [UI_STATES_PATTERNS.md](./UI_STATES_PATTERNS.md)

**Rôle** : Patterns standardisés pour gérer les états UI dans toutes les pages  
**Contenu** :
- Les 4 états obligatoires : Loading, Error, Empty, Success
- Pattern complet React Query
- Variantes d'états vides (après filtrage, avec action)
- États de chargement partiels (skeleton, optimistic updates)
- États des formulaires
- États responsive
- Animations d'entrée
- Erreurs courantes à éviter
- Checklist de validation
- Exemples réels (ConsultationsPage)

**Public** : Développeurs React  
**Usage** : Guide d'implémentation pour chaque nouvelle page

---

### 3. 🧩 [COMPONENTS_AUDIT.md](./COMPONENTS_AUDIT.md)

**Rôle** : Audit visuel et UX complet de tous les composants existants  
**Contenu** :
- Vue d'ensemble (56 composants normalisés)
- Audit détaillé de chaque composant UI
- Commentaires UX pour chaque composant
- Points forts et points d'attention
- Mapping des couleurs par module
- Invariants de structure (cartes, KPI)
- Verdict final : ✅ 100% exploitable

**Public** : UX designers, développeurs, product managers  
**Usage** : Validation de la cohérence visuelle et fonctionnelle

---

### 4. 🔤 [COMPONENT_NAMING_GUIDE.md](./COMPONENT_NAMING_GUIDE.md)

**Rôle** : Guide de nomenclature pour garantir que les noms Figma = noms React  
**Contenu** :
- Principes de nomenclature (PascalCase, suffixes, pas de raccourcis)
- Liste complète des composants UI de base (28)
- Liste complète des composants applicatifs (15)
- Liste complète des composants Layout (4)
- Liste complète des cartes métier (5)
- Mapping Figma → React
- Imports recommandés
- Règles pour créer de nouveaux composants
- Index alphabétique de tous les composants
- Tableau "Comment trouver le bon composant ?"

**Public** : Développeurs, designers  
**Usage** : Référence rapide pour nommer et importer des composants

---

## 🗂️ Structure de la documentation

```
/
├── DESIGN_SYSTEM.md              # 📐 Design system complet
├── UI_STATES_PATTERNS.md         # 🔄 Patterns d'états UI
├── COMPONENTS_AUDIT.md           # 🧩 Audit UX des composants
├── COMPONENT_NAMING_GUIDE.md     # 🔤 Guide de nomenclature
└── DESIGN_SYSTEM_INDEX.md        # 📚 Ce fichier (index)
```

---

## 🚀 Par où commencer ?

### Nouveau développeur sur le projet

1. Lire [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) (sections "Palette de couleurs", "Typographie", "Espacements")
2. Parcourir [COMPONENT_NAMING_GUIDE.md](./COMPONENT_NAMING_GUIDE.md) (tableau "Comment trouver le bon composant ?")
3. Lire [UI_STATES_PATTERNS.md](./UI_STATES_PATTERNS.md) (section "Pattern complet React Query")
4. Référencer [COMPONENTS_AUDIT.md](./COMPONENTS_AUDIT.md) pour validation UX

### Designer qui rejoint le projet

1. Lire [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) (toutes les sections)
2. Consulter [COMPONENTS_AUDIT.md](./COMPONENTS_AUDIT.md) (commentaires UX)
3. Utiliser [COMPONENT_NAMING_GUIDE.md](./COMPONENT_NAMING_GUIDE.md) (mapping Figma → React)

### Product Manager / QA

1. Lire [COMPONENTS_AUDIT.md](./COMPONENTS_AUDIT.md) (vue d'ensemble + verdict)
2. Consulter [UI_STATES_PATTERNS.md](./UI_STATES_PATTERNS.md) (checklist de validation)
3. Référencer [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) (gradients, couleurs)

---

## 📊 Récapitulatif des composants

### Composants créés/normalisés

| Catégorie | Nombre | Statut |
|-----------|--------|--------|
| **UI de base** (Radix UI) | 28 | ✅ |
| **Applicatifs** | 15 | ✅ |
| **Cartes métier** | 5 | ✅ Nouveaux |
| **Layout** | 5 | ✅ |
| **États UI** | 3 | ✅ |
| **TOTAL** | **56** | ✅ |

### Nouveaux composants créés (5)

1. **ConsultationCard** (`/src/app/components/cards/ConsultationCard.tsx`)
   - Carte normalisée pour les consultations
   - Structure : Header (titre + statut) → Content (description, tags, stats) → Footer (CTA)

2. **PetitionCard** (`/src/app/components/cards/PetitionCard.tsx`)
   - Carte normalisée pour les pétitions
   - Spécificités : Barre de progression, signatures, bouton Sign/Unsign

3. **VoteCard** (`/src/app/components/cards/VoteCard.tsx`)
   - Carte normalisée pour les votes
   - Spécificités : Type de scrutin, taux de participation, CTA adapté

4. **AssemblyCard** (`/src/app/components/cards/AssemblyCard.tsx`)
   - Carte normalisée pour les assemblées
   - Spécificités : Prochaine réunion en évidence, lieu, date/heure

5. **ConferenceCard** (`/src/app/components/cards/ConferenceCard.tsx`)
   - Carte normalisée pour les conférences
   - Spécificités : Type (online/in-person/hybrid), date/heure, places

**Import groupé** :
```tsx
import { 
  ConsultationCard, 
  PetitionCard, 
  VoteCard, 
  AssemblyCard, 
  ConferenceCard 
} from '@/app/components/cards';
```

---

## 🎨 Design System en bref

### Couleurs institutionnelles

- **Primaire** : `#030213` (noir institutionnel)
- **Secondaire** : `oklch(0.95 0.0058 264.53)` (gris clair)
- **Destructive** : `#d4183d` (rouge)
- **Border** : `rgba(0, 0, 0, 0.1)`
- **Input background** : `#f3f3f5`

### Gradients des modules

| Module | Gradient |
|--------|----------|
| Consultations | `from-cyan-600 to-blue-600` |
| Pétitions | `from-green-600 to-emerald-600` |
| Votes | `from-indigo-600 to-blue-600` |
| Assemblées | `from-purple-600 to-pink-600` |
| Conférences | `from-orange-600 to-amber-600` |

### Espacements standards

- **Card padding** : `p-6` (24px)
- **Button padding** : `px-4 py-2`
- **Grid gap** : `gap-6`
- **Section spacing** : `mb-8` (32px)

### Animations

- **Fade in** : `animate-fade-in` (0.4s)
- **Slide in** : `animate-slide-in` (0.5s)
- **Hover** : `transition-all duration-300`

---

## 🎯 Checklist de validation d'une page

### États UI (obligatoire)

- [ ] État **Loading** : `LoadingSpinner` affiché pendant `isLoading`
- [ ] État **Error** : `ErrorMessage` avec bouton retry pendant `error`
- [ ] État **Empty** : `EmptyState` si `!data || data.length === 0`
- [ ] État **Success** : Données affichées avec filtres et KPI

### Structure (recommandé)

- [ ] `PageBanner` avec gradient du module
- [ ] `PageLayout` pour le contenu
- [ ] KPI Cards en grille responsive (4 cols desktop, 2 cols tablet, 1 col mobile)
- [ ] `FilterBar` avec filtres pertinents
- [ ] `ContentGrid` pour les cartes métier

### Bonnes pratiques

- [ ] Toutes les listes ont `key={item.id}`
- [ ] Tous les `LocalizedString` utilisent `tLocal()`
- [ ] Tous les textes UI sont traduits (FR/DE/EN)
- [ ] Animations fade-in sur les grilles
- [ ] Boutons avec états hover/focus/disabled
- [ ] Responsive vérifié (mobile/tablet/desktop)

---

## 📋 Templates de code

### Template de page standard

```tsx
import React, { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { PageBanner } from '@/app/components/PageBanner';
import { PageLayout } from '@/app/components/layout/PageLayout';
import { KPICard } from '@/app/components/layout/KPICard';
import { FilterBar } from '@/app/components/layout/FilterBar';
import { FilterField } from '@/app/components/layout/FilterField';
import { ContentGrid } from '@/app/components/layout/ContentGrid';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { ErrorMessage } from '@/app/components/ErrorMessage';
import { EmptyState } from '@/app/components/EmptyState';
import { ExampleCard } from '@/app/components/cards';
import { useExampleData } from '@/app/hooks/useApi';
import { Icon } from 'lucide-react';

export function ExamplePage() {
  const { t, language, tLocal } = useLanguage();
  const { data, isLoading, error, refetch } = useExampleData();
  const [filters, setFilters] = useState({});

  // 1. Loading
  if (isLoading) {
    return (
      <div>
        <PageBanner 
          title="Titre"
          description="Description"
          gradient="from-blue-600 to-indigo-600"
          icon={<Icon className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <LoadingSpinner />
        </PageLayout>
      </div>
    );
  }

  // 2. Error
  if (error) {
    return (
      <div>
        <PageBanner {...} />
        <PageLayout className="py-8">
          <ErrorMessage error={error} onRetry={refetch} />
        </PageLayout>
      </div>
    );
  }

  // 3. Empty
  if (!data || data.length === 0) {
    return (
      <div>
        <PageBanner {...} />
        <PageLayout className="py-8">
          <EmptyState 
            title="Aucune donnée"
            icon={<Icon className="w-16 h-16" />}
          />
        </PageLayout>
      </div>
    );
  }

  // 4. Success
  const filteredData = applyFilters(data, filters);

  return (
    <div>
      <PageBanner {...} />
      <PageLayout className="py-8">
        {/* KPI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <KPICard label="Total" value={data.length} icon={Icon} variant="blue" />
        </div>

        {/* Filtres */}
        <FilterBar>
          <FilterField label="Filtre">
            {/* Select ou Input */}
          </FilterField>
        </FilterBar>

        {/* Contenu */}
        <ContentGrid>
          {filteredData.map(item => (
            <ExampleCard key={item.id} item={item} />
          ))}
        </ContentGrid>
      </PageLayout>
    </div>
  );
}
```

### Template de carte métier

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { StatusBadge } from '@/app/components/StatusBadge';
import { ThemeTag } from '@/app/components/ThemeTag';
import { useLanguage } from '@/app/contexts/LanguageContext';
import type { ExampleDTO } from '@/app/types';

interface ExampleCardProps {
  item: ExampleDTO;
}

export function ExampleCard({ item }: ExampleCardProps) {
  const { t, language, tLocal } = useLanguage();

  return (
    <Link to={`/examples/${item.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-gray-200">
        <CardHeader>
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
              {tLocal(item.title)}
            </CardTitle>
            <StatusBadge status={item.status} />
          </div>
          <CardDescription className="line-clamp-3">
            {tLocal(item.description)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tags thème */}
          {item.themeId && (
            <div className="flex flex-wrap gap-2">
              <ThemeTag themeId={item.themeId} size="sm" />
            </div>
          )}

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Icon className="w-4 h-4" />
              <span>{item.stat}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700 transition-all"
            >
              {language === 'fr' ? 'Action' : language === 'de' ? 'Aktion' : 'Action'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

---

## 🔗 Ressources externes

### Technologies utilisées

- **React** : v18+ (Framework frontend)
- **TypeScript** : v5+ (Typage statique)
- **Tailwind CSS** : v4 (Styling)
- **Radix UI** : Composants accessibles (base des composants ui/)
- **React Query** : Gestion d'état serveur (@tanstack/react-query)
- **React Router** : Navigation (react-router-dom)
- **Motion** : Animations (motion/react)
- **Lucide** : Icônes (lucide-react)
- **Sonner** : Toasts (sonner)
- **React Hook Form** : Formulaires (react-hook-form@7.55.0)
- **CVA** : Variantes (class-variance-authority)

### Documentation officielle

- **Tailwind CSS v4** : https://tailwindcss.com
- **Radix UI** : https://www.radix-ui.com
- **React Query** : https://tanstack.com/query
- **Motion** : https://motion.dev
- **Lucide Icons** : https://lucide.dev

---

## 📊 Statistiques du projet

### Composants

- **56 composants React** normalisés et documentés
- **5 cartes métier** extraites et réutilisables
- **4 états UI** standardisés (Loading, Error, Empty, Success)
- **3 types de KPI** (primary, secondary, insight)
- **10 statuts** supportés (open, closed, upcoming, etc.)
- **13 thèmes** transversaux avec couleurs/icônes

### Pages principales

- Dashboard (accueil)
- Consultations
- Pétitions
- Votes
- Assemblées
- Conférences
- Thèmes
- Profil utilisateur
- Recherche globale
- Admin (9 sous-pages)
- SaaS Backoffice (7 sous-pages)
- Légales (5 pages)

**Total** : ~40 pages fonctionnelles

### Multilingue

- **3 langues** : Français, Allemand, Anglais
- **100% des composants** traduits
- Helper `tLocal()` pour objets `LocalizedString`
- Helper `t()` pour traductions statiques

---

## 🎯 Prochaines étapes (recommandations)

### Phase 1 : Tests et validation (priorité haute)

- [ ] Tests d'accessibilité WCAG 2.1 AA complets
- [ ] Tests responsive sur devices réels (iOS, Android)
- [ ] Tests navigateurs (Chrome, Firefox, Safari, Edge)
- [ ] Tests de performance (Lighthouse, Core Web Vitals)

### Phase 2 : Optimisations (priorité moyenne)

- [ ] Lazy loading des images (react-lazy-load-image-component)
- [ ] Code splitting des pages (React.lazy + Suspense)
- [ ] Optimisation des bundles (vite-plugin-compression)
- [ ] PWA (service worker, manifest.json)

### Phase 3 : Enrichissements (priorité basse)

- [ ] Dark mode complet (déjà préparé dans theme.css)
- [ ] Animations avancées (Motion, framer-motion)
- [ ] Graphiques interactifs (Recharts, Chart.js)
- [ ] Export PDF (jsPDF, html2canvas)

---

## 💡 Conseils pour l'exploitation

### 1. Toujours utiliser les composants normalisés

❌ **Ne pas faire** :
```tsx
<div className="bg-white rounded-lg border p-6">
  <h3 className="text-lg font-medium">{title}</h3>
  <p className="text-sm text-gray-500">{description}</p>
</div>
```

✅ **Faire** :
```tsx
<Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </CardHeader>
</Card>
```

### 2. Toujours gérer les 4 états UI

❌ **Ne pas faire** :
```tsx
export function BadPage() {
  const { data } = useData();
  return <div>{data.map(...)}</div>; // Crash si data undefined
}
```

✅ **Faire** :
```tsx
export function GoodPage() {
  const { data, isLoading, error, refetch } = useData();
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  if (!data || data.length === 0) return <EmptyState />;
  
  return <div>{data.map(...)}</div>;
}
```

### 3. Toujours utiliser tLocal() pour LocalizedString

❌ **Ne pas faire** :
```tsx
<h1>{consultation.title}</h1> // Erreur : "Objects are not valid as React child"
```

✅ **Faire** :
```tsx
const { tLocal } = useLanguage();
<h1>{tLocal(consultation.title)}</h1>
```

### 4. Toujours ajouter des keys sur les listes

❌ **Ne pas faire** :
```tsx
{data.map(item => <Card />)} // Warning React
```

✅ **Faire** :
```tsx
{data.map(item => <Card key={item.id} />)}
```

---

## 📞 Support

### Questions fréquentes

**Q : Quel composant utiliser pour afficher un statut ?**  
R : `StatusBadge` pour les statuts système (open, closed, etc.), `Badge` pour les labels génériques

**Q : Comment créer une nouvelle carte métier ?**  
R : Copier le template dans [DESIGN_SYSTEM_INDEX.md](./DESIGN_SYSTEM_INDEX.md) section "Template de carte métier"

**Q : Où trouver la liste complète des icônes ?**  
R : https://lucide.dev (package lucide-react)

**Q : Comment ajouter une nouvelle langue ?**  
R : Modifier `/src/app/contexts/LanguageContext.tsx` et ajouter les traductions

**Q : Pourquoi mes styles Tailwind ne s'appliquent pas ?**  
R : Vérifier que le fichier est dans `/src/` et que la classe est valide en Tailwind v4

---

## 🏁 Conclusion

Cette documentation garantit que **CiviAgora dispose d'un design system complet, normalisé et exploitable à 100% en React**. Tous les composants sont documentés, tous les états UI sont définis, et toutes les pages suivent les mêmes patterns.

**Statut final** : ✅ **Maquette sécurisée et prête pour production**

---

**Dernière mise à jour** : Janvier 2026  
**Mainteneur** : Équipe CiviAgora  
**Licence** : Propriétaire
