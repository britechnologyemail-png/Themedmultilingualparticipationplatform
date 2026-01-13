# Guide de nomenclature des composants - CiviAgora

**Objectif** : Garantir que les noms des composants React correspondent exactement aux intentions fonctionnelles et UX  
**Version** : 1.0  
**Date** : Janvier 2026

---

## 📋 Principes de nomenclature

### Conventions générales

1. **PascalCase** : Tous les composants React (`Button`, `ConsultationCard`, `KPICard`)
2. **Suffixes descriptifs** :
   - `Card` : Carte de contenu cliquable
   - `Badge` : Petit label coloré
   - `Tag` : Étiquette thématique
   - `Bar` : Barre horizontale de filtres/navigation
   - `Field` : Champ de formulaire
   - `Grid` : Grille de contenu
   - `Spinner` : Animation de chargement
   - `State` : Composant d'état (EmptyState, ErrorState)
   - `Message` : Message système

3. **Pas de raccourcis** : Noms complets et explicites
   - ✅ `ConsultationCard`
   - ❌ `ConsCard` ou `CCard`

4. **Contexte dans le nom** : Le nom doit être auto-descriptif
   - ✅ `StatusBadge` (badge de statut)
   - ✅ `ThemeTag` (tag de thème)
   - ❌ `Badge` (trop générique si usage spécifique)

---

## 🎨 Composants UI de base

### Boutons et actions

| Nom React | Fichier | Usage | Variantes |
|-----------|---------|-------|-----------|
| `Button` | `/src/app/components/ui/button.tsx` | Bouton générique | 6 variantes, 4 tailles |

### Conteneurs

| Nom React | Fichier | Usage | Sous-composants |
|-----------|---------|-------|-----------------|
| `Card` | `/src/app/components/ui/card.tsx` | Conteneur de contenu | `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction` |
| `Alert` | `/src/app/components/ui/alert.tsx` | Alerte système | `AlertTitle`, `AlertDescription` |
| `Dialog` | `/src/app/components/ui/dialog.tsx` | Modal | `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` |
| `Sheet` | `/src/app/components/ui/sheet.tsx` | Panneau latéral | `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter` |
| `Popover` | `/src/app/components/ui/popover.tsx` | Info-bulle riche | `PopoverTrigger`, `PopoverContent` |
| `Tooltip` | `/src/app/components/ui/tooltip.tsx` | Info-bulle simple | `TooltipTrigger`, `TooltipContent`, `TooltipProvider` |

### Formulaires

| Nom React | Fichier | Usage | Variantes |
|-----------|---------|-------|-----------|
| `Input` | `/src/app/components/ui/input.tsx` | Champ texte | - |
| `Textarea` | `/src/app/components/ui/textarea.tsx` | Texte multi-lignes | - |
| `Select` | `/src/app/components/ui/select.tsx` | Menu déroulant | `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem` |
| `Checkbox` | `/src/app/components/ui/checkbox.tsx` | Case à cocher | - |
| `RadioGroup` | `/src/app/components/ui/radio-group.tsx` | Boutons radio | `RadioGroupItem` |
| `Switch` | `/src/app/components/ui/switch.tsx` | Toggle binaire | - |
| `Slider` | `/src/app/components/ui/slider.tsx` | Curseur de valeur | - |
| `Label` | `/src/app/components/ui/label.tsx` | Label de champ | - |
| `Form` | `/src/app/components/ui/form.tsx` | Wrapper react-hook-form | `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage` |

### Navigation

| Nom React | Fichier | Usage | Sous-composants |
|-----------|---------|-------|-----------------|
| `Tabs` | `/src/app/components/ui/tabs.tsx` | Onglets | `TabsList`, `TabsTrigger`, `TabsContent` |
| `Accordion` | `/src/app/components/ui/accordion.tsx` | Sections repliables | `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| `DropdownMenu` | `/src/app/components/ui/dropdown-menu.tsx` | Menu contextuel | `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuLabel` |
| `NavigationMenu` | `/src/app/components/ui/navigation-menu.tsx` | Navigation principale | `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink` |
| `Breadcrumb` | `/src/app/components/ui/breadcrumb.tsx` | Fil d'Ariane | `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator` |
| `Pagination` | `/src/app/components/ui/pagination.tsx` | Pagination de liste | `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext` |

### Affichage de données

| Nom React | Fichier | Usage | Sous-composants |
|-----------|---------|-------|-----------------|
| `Table` | `/src/app/components/ui/table.tsx` | Tableau | `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableFooter` |
| `Badge` | `/src/app/components/ui/badge.tsx` | Tag générique | 4 variantes |
| `Avatar` | `/src/app/components/ui/avatar.tsx` | Photo de profil | `AvatarImage`, `AvatarFallback` |
| `Progress` | `/src/app/components/ui/progress.tsx` | Barre de progression | - |
| `Skeleton` | `/src/app/components/ui/skeleton.tsx` | Placeholder loading | - |

### Utilitaires

| Nom React | Fichier | Usage | Variantes |
|-----------|---------|-------|-----------|
| `Separator` | `/src/app/components/ui/separator.tsx` | Ligne de séparation | Horizontal / Vertical |
| `ScrollArea` | `/src/app/components/ui/scroll-area.tsx` | Zone scrollable custom | - |
| `AspectRatio` | `/src/app/components/ui/aspect-ratio.tsx` | Ratio d'image | - |
| `Collapsible` | `/src/app/components/ui/collapsible.tsx` | Contenu repliable simple | `CollapsibleTrigger`, `CollapsibleContent` |

---

## 🎯 Composants applicatifs

### États UI

| Nom React | Fichier | Usage | Props clés |
|-----------|---------|-------|-----------|
| `LoadingSpinner` | `/src/app/components/LoadingSpinner.tsx` | Chargement en cours | `message`, `fullPage` |
| `EmptyState` | `/src/app/components/EmptyState.tsx` | Aucune donnée | `title`, `description`, `icon` |
| `ErrorMessage` | `/src/app/components/ErrorMessage.tsx` | Erreur de chargement | `error`, `onRetry`, `title` |

### Navigation et structure

| Nom React | Fichier | Usage | Props clés |
|-----------|---------|-------|-----------|
| `Header` | `/src/app/components/Header.tsx` | En-tête de site | - |
| `Footer` | `/src/app/components/Footer.tsx` | Pied de page | - |
| `UserMenu` | `/src/app/components/UserMenu.tsx` | Menu utilisateur | - |
| `GlobalSearch` | `/src/app/components/GlobalSearch.tsx` | Recherche globale | - |
| `PageBanner` | `/src/app/components/PageBanner.tsx` | Bannière de page | `title`, `description`, `gradient`, `icon` |
| `PublicLayout` | `/src/app/components/PublicLayout.tsx` | Layout public | - |
| `ScrollToTop` | `/src/app/components/ScrollToTop.tsx` | Scroll auto en haut | - |

### Badges et tags

| Nom React | Fichier | Usage | Props clés |
|-----------|---------|-------|-----------|
| `StatusBadge` | `/src/app/components/StatusBadge.tsx` | Badge de statut | `status` (10 valeurs possibles) |
| `ThemeTag` | `/src/app/components/ThemeTag.tsx` | Tag de thème | `themeId`, `size`, `showIcon` |

### KPI et stats

| Nom React | Fichier | Usage | Props clés |
|-----------|---------|-------|-----------|
| `StatCard` | `/src/app/components/StatCard.tsx` | Carte de statistique (legacy) | `label`, `value`, `icon` |
| `KPICard` | `/src/app/components/layout/KPICard.tsx` | Carte KPI normalisée | `label`, `value`, `icon`, `variant`, `type`, `subtitle` |

**Note** : Préférer `KPICard` (normalisé) à `StatCard` (legacy)

---

## 🗂️ Composants Layout

| Nom React | Fichier | Usage | Structure |
|-----------|---------|-------|-----------|
| `PageLayout` | `/src/app/components/layout/PageLayout.tsx` | Conteneur de page | `max-w-7xl` centré |
| `FilterBar` | `/src/app/components/layout/FilterBar.tsx` | Barre de filtres | `Card` avec grille 2 cols |
| `FilterField` | `/src/app/components/layout/FilterField.tsx` | Champ de filtre | `label` + `children` |
| `ContentGrid` | `/src/app/components/layout/ContentGrid.tsx` | Grille de contenu | 1/2/3 cols responsive |

---

## 🃏 Cartes métier (Cards)

| Nom React | Fichier | Usage | Module |
|-----------|---------|-------|--------|
| `ConsultationCard` | `/src/app/components/cards/ConsultationCard.tsx` | Carte de consultation | Consultations |
| `PetitionCard` | `/src/app/components/cards/PetitionCard.tsx` | Carte de pétition | Pétitions |
| `VoteCard` | `/src/app/components/cards/VoteCard.tsx` | Carte de vote | Votes |
| `AssemblyCard` | `/src/app/components/cards/AssemblyCard.tsx` | Carte d'assemblée | Assemblées |
| `ConferenceCard` | `/src/app/components/cards/ConferenceCard.tsx` | Carte de conférence | Conférences |

**Structure commune** :
- Header : Titre + StatusBadge
- Content : Description + ThemeTag + Stats spécifiques
- Footer : Bouton CTA

---

## 📱 Composants Admin

| Nom React | Fichier | Usage |
|-----------|---------|-------|
| `AdminLayout` | `/src/app/admin/components/AdminLayout.tsx` | Layout admin |
| `StatCard` | `/src/app/admin/components/StatCard.tsx` | Carte stat admin |
| Dialogs | `/src/app/admin/components/dialogs/*.tsx` | Modals CRUD |

---

## 🎨 Modals et Dialogs

### Nomenclature des dialogs

**Pattern** : `[Action][Entity]Dialog.tsx`

Exemples :
- `DeleteUserDialog.tsx` : Supprimer un utilisateur
- `EditProcessDialog.tsx` : Éditer un processus
- `NewUserDialog.tsx` : Créer un utilisateur
- `ManagePhasesDialog.tsx` : Gérer des phases

**Composants** :
- `Dialog` : Composant racine
- `DialogTrigger` : Déclencheur (bouton)
- `DialogContent` : Contenu de la modal
- `DialogHeader` : En-tête
- `DialogTitle` : Titre
- `DialogDescription` : Description
- `DialogFooter` : Pied avec actions

---

## 🔤 Mapping Figma → React

### Si vous avez une maquette Figma

| Concept Figma | Nom React | Type |
|--------------|-----------|------|
| Frame "Consultation Item" | `ConsultationCard` | Component |
| Frame "Status" | `StatusBadge` | Component |
| Frame "Filter Section" | `FilterBar` | Component |
| Frame "Empty List" | `EmptyState` | Component |
| Frame "Loading" | `LoadingSpinner` | Component |
| Frame "Error Alert" | `ErrorMessage` | Component |
| Component "Primary Button" | `Button variant="default"` | Variant |
| Component "Icon Button" | `Button size="icon"` | Variant |
| Frame "KPI Metric" | `KPICard` | Component |
| Frame "Theme Badge" | `ThemeTag` | Component |

---

## 📦 Imports recommandés

### Import des composants UI

```tsx
// Boutons et actions
import { Button } from '@/app/components/ui/button';

// Conteneurs
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';

// Formulaires
import { Input } from '@/app/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/app/components/ui/select';
import { Label } from '@/app/components/ui/label';

// Navigation
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs';

// Affichage
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Skeleton } from '@/app/components/ui/skeleton';
```

### Import des composants applicatifs

```tsx
// États UI
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { EmptyState } from '@/app/components/EmptyState';
import { ErrorMessage } from '@/app/components/ErrorMessage';

// Structure
import { PageBanner } from '@/app/components/PageBanner';
import { PageLayout } from '@/app/components/layout/PageLayout';

// Badges et tags
import { StatusBadge } from '@/app/components/StatusBadge';
import { ThemeTag } from '@/app/components/ThemeTag';

// Layout
import { FilterBar } from '@/app/components/layout/FilterBar';
import { FilterField } from '@/app/components/layout/FilterField';
import { ContentGrid } from '@/app/components/layout/ContentGrid';
import { KPICard } from '@/app/components/layout/KPICard';
```

### Import des cartes métier

```tsx
// Import groupé
import { 
  ConsultationCard, 
  PetitionCard, 
  VoteCard, 
  AssemblyCard, 
  ConferenceCard 
} from '@/app/components/cards';

// OU import individuel
import { ConsultationCard } from '@/app/components/cards/ConsultationCard';
```

---

## 🎯 Règles de nommage pour nouveaux composants

### 1. Poser les bonnes questions

- **Quel est le rôle du composant ?** → Nom basé sur la fonction
- **Est-ce un conteneur ou un élément ?** → Suffixe `Card`, `Bar`, `Grid`, `Field`
- **Est-ce un état UI ?** → Suffixe `State`, `Message`, `Spinner`
- **Est-ce un badge/tag ?** → Suffixe `Badge`, `Tag`
- **Est-ce un formulaire ?** → Suffixe `Form`, `Field`, `Input`

### 2. Exemples de nomenclature

**❌ Mauvais exemples** :
- `Card1`, `Card2` (pas descriptif)
- `Comp`, `Btn`, `Txt` (raccourcis)
- `MyComponent` (pas de contexte)
- `Thing` (trop vague)

**✅ Bons exemples** :
- `SpeakerProfileCard` (carte de profil d'intervenant)
- `RegistrationForm` (formulaire d'inscription)
- `ParticipationStats` (statistiques de participation)
- `NotificationBadge` (badge de notification)

### 3. Template de création

```tsx
/**
 * [NomComposant]
 * 
 * Description : [Description brève du rôle]
 * 
 * Usage :
 * <NomComposant prop1="value" prop2={value} />
 * 
 * Props :
 * - prop1 : Type - Description
 * - prop2 : Type - Description
 * 
 * États :
 * - hover : [comportement]
 * - focus : [comportement]
 * - disabled : [comportement]
 */

import React from 'react';

interface NomComposantProps {
  prop1: string;
  prop2: number;
}

export function NomComposant({ prop1, prop2 }: NomComposantProps) {
  return (
    <div>
      {/* Contenu */}
    </div>
  );
}
```

---

## 📚 Index alphabétique des composants

### A-C
- `Accordion` - Sections repliables
- `Alert` - Alerte système
- `AlertDialog` - Confirmation critique
- `AssemblyCard` - Carte d'assemblée
- `Avatar` - Photo de profil
- `Badge` - Tag générique
- `Breadcrumb` - Fil d'Ariane
- `Button` - Bouton générique
- `Calendar` - Sélecteur de dates
- `Card` - Conteneur de contenu
- `Checkbox` - Case à cocher
- `Collapsible` - Contenu repliable
- `ConferenceCard` - Carte de conférence
- `ConsultationCard` - Carte de consultation
- `ContentGrid` - Grille de contenu

### D-L
- `Dialog` - Modal
- `DropdownMenu` - Menu contextuel
- `EmptyState` - État vide
- `ErrorMessage` - Message d'erreur
- `FilterBar` - Barre de filtres
- `FilterField` - Champ de filtre
- `Footer` - Pied de page
- `Form` - Wrapper formulaire
- `GlobalSearch` - Recherche globale
- `Header` - En-tête de site
- `Input` - Champ texte
- `KPICard` - Carte KPI
- `Label` - Label de champ
- `LoadingSpinner` - Chargement

### M-S
- `NavigationMenu` - Navigation principale
- `PageBanner` - Bannière de page
- `PageLayout` - Layout de page
- `Pagination` - Pagination
- `PetitionCard` - Carte de pétition
- `Popover` - Info-bulle riche
- `Progress` - Barre de progression
- `PublicLayout` - Layout public
- `RadioGroup` - Boutons radio
- `ScrollArea` - Zone scrollable
- `ScrollToTop` - Scroll auto
- `Select` - Menu déroulant
- `Separator` - Séparateur
- `Sheet` - Panneau latéral
- `Skeleton` - Placeholder loading
- `Slider` - Curseur de valeur
- `StatCard` - Carte stat (legacy)
- `StatusBadge` - Badge de statut
- `Switch` - Toggle binaire

### T-Z
- `Table` - Tableau de données
- `Tabs` - Onglets
- `Textarea` - Texte multi-lignes
- `ThemeTag` - Tag de thème
- `Tooltip` - Info-bulle simple
- `UserMenu` - Menu utilisateur
- `VoteCard` - Carte de vote

**Total** : 56 composants documentés

---

## 🔍 Comment trouver le bon composant ?

### Par fonctionnalité

| Je veux... | Utiliser... |
|-----------|-------------|
| Afficher un bouton | `Button` |
| Afficher une carte cliquable | `Card` |
| Afficher une consultation | `ConsultationCard` |
| Afficher un statut | `StatusBadge` |
| Afficher un thème | `ThemeTag` |
| Filtrer des données | `FilterBar` + `FilterField` |
| Afficher un état vide | `EmptyState` |
| Afficher une erreur | `ErrorMessage` |
| Afficher un chargement | `LoadingSpinner` |
| Afficher des KPI | `KPICard` |
| Créer un formulaire | `Form` + `Input` + `Label` |
| Ouvrir une modal | `Dialog` |
| Afficher un menu | `DropdownMenu` |
| Naviguer par onglets | `Tabs` |

---

**Fin du guide de nomenclature**  
_Tous les noms de composants correspondent exactement aux noms React implémentés._
