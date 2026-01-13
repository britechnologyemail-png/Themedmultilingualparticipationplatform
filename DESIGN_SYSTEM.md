# CiviAgora Design System

**Version**: 1.0  
**Date**: Janvier 2026  
**Type**: Documentation technique pour exploitation React

---

## 📐 Principes fondateurs

### Architecture visuelle
- **Identité**: Institutionnelle moderne GovTech/CivicTech
- **Langage**: Minimaliste, accessible, multilingue (FR/DE/EN)
- **Hiérarchie**: Clarté, lisibilité, guidage utilisateur
- **Responsive**: Desktop-first avec adaptation mobile fluide

### Philosophie des composants
- **Modularité**: Chaque composant est réutilisable et autonome
- **Cohérence**: Variantes normalisées, pas de variations ad-hoc
- **État explicite**: Loading, empty, error toujours définis
- **Accessibilité**: WCAG 2.1 AA minimum

---

## 🎨 Palette de couleurs

### Couleurs primaires (Institutionnelles)

```css
--primary: #030213           /* Noir institutionnel */
--primary-foreground: #ffffff

--background: #ffffff
--foreground: oklch(0.145 0 0)  /* Texte principal */
```

### Couleurs secondaires

```css
--secondary: oklch(0.95 0.0058 264.53)  /* Gris clair */
--secondary-foreground: #030213

--muted: #ececf0                        /* Gris moyen */
--muted-foreground: #717182             /* Texte secondaire */

--accent: #e9ebef                       /* Accent neutre */
--accent-foreground: #030213
```

### Couleurs sémantiques

```css
--destructive: #d4183d                  /* Rouge erreur */
--destructive-foreground: #ffffff

--border: rgba(0, 0, 0, 0.1)           /* Bordures */
--input-background: #f3f3f5            /* Champs de saisie */
--switch-background: #cbced4           /* Éléments interactifs */
```

### Palette thématique des modules

Couleurs associées aux 5 modules principaux et aux 13 thèmes transversaux :

| Module | Couleur primaire | Variantes |
|--------|-----------------|-----------|
| **Consultations** | `cyan-600` → `blue-600` | Gradient banner |
| **Assemblées** | `purple-600` → `pink-600` | Gradient banner |
| **Pétitions** | `green-600` → `emerald-600` | Gradient banner |
| **Conférences** | `orange-600` → `amber-600` | Gradient banner |
| **Votes** | `indigo-600` → `blue-600` | Gradient banner |

**Variantes KPI** : `blue`, `green`, `purple`, `orange`, `indigo`, `emerald`, `pink`, `cyan`

---

## 📝 Typographie

### Hiérarchie de texte

```css
/* Headings */
h1: font-size: var(--text-2xl), font-weight: 500, line-height: 1.5
h2: font-size: var(--text-xl),  font-weight: 500, line-height: 1.5
h3: font-size: var(--text-lg),  font-weight: 500, line-height: 1.5
h4: font-size: var(--text-base), font-weight: 500, line-height: 1.5

/* Body & UI */
p:     font-size: var(--text-base), font-weight: 400, line-height: 1.5
label: font-size: var(--text-base), font-weight: 500, line-height: 1.5
button: font-size: var(--text-base), font-weight: 500, line-height: 1.5
input: font-size: var(--text-base), font-weight: 400, line-height: 1.5
```

**Règle importante** : Ne jamais utiliser les classes Tailwind `text-{size}`, `font-{weight}` ou `leading-{value}` sauf demande explicite. Les styles par défaut suffisent.

### Échelle de taille

```
--text-xs:   12px
--text-sm:   14px
--text-base: 16px  (défaut)
--text-lg:   18px
--text-xl:   20px
--text-2xl:  24px
--text-3xl:  30px
```

### Poids de police

```
--font-weight-normal: 400  (texte courant)
--font-weight-medium: 500  (labels, titres, boutons)
```

---

## 📏 Espacements

### Système de spacing

Tailwind utilise une échelle 4px :

```
p-1  = 4px      gap-1  = 4px      mb-1  = 4px
p-2  = 8px      gap-2  = 8px      mb-2  = 8px
p-3  = 12px     gap-3  = 12px     mb-3  = 12px
p-4  = 16px     gap-4  = 16px     mb-4  = 16px
p-6  = 24px     gap-6  = 24px     mb-6  = 24px
p-8  = 32px     gap-8  = 32px     mb-8  = 32px
p-12 = 48px     gap-12 = 48px     mb-12 = 48px
p-16 = 64px     gap-16 = 64px     mb-16 = 64px
```

### Padding standards des composants

| Composant | Padding interne |
|-----------|----------------|
| `Card` | `p-6` (24px) |
| `Button` | `px-4 py-2` (16px horizontal, 8px vertical) |
| `Input` | `px-3 py-2` (12px horizontal, 8px vertical) |
| `Badge` | `px-3 py-1` (12px horizontal, 4px vertical) |
| `FilterBar` | `p-6` |
| `PageLayout` | `py-8` (32px vertical) |

### Layout spacing

- **Grille de contenu** : `gap-6` (24px) entre les cartes
- **Sections de page** : `mb-8` (32px) entre sections
- **KPI Cards** : `gap-6` en grille
- **Formulaires** : `gap-4` entre champs

---

## 🔘 Composants UI de base

### Button (`/src/app/components/ui/button.tsx`)

**Variantes** :
- `default` : Noir institutionnel, texte blanc
- `destructive` : Rouge (#d4183d), texte blanc
- `outline` : Bordure, fond transparent
- `secondary` : Gris clair
- `ghost` : Transparent, hover accent
- `link` : Texte souligné

**Tailles** :
- `sm` : `h-8 px-3`
- `default` : `h-9 px-4`
- `lg` : `h-10 px-6`
- `icon` : `size-9`

**États** :
- `disabled` : Opacité 50%, non-cliquable
- `hover` : Opacité 90% pour default/destructive
- `focus-visible` : Ring de focus visible

**Usage** :
```tsx
<Button variant="default" size="default">Action primaire</Button>
<Button variant="outline" size="sm">Action secondaire</Button>
<Button variant="destructive">Supprimer</Button>
<Button variant="ghost" size="icon"><Icon /></Button>
```

---

### Card (`/src/app/components/ui/card.tsx`)

**Structure** :
- `Card` : Conteneur principal (border, rounded-xl, bg-card)
- `CardHeader` : En-tête avec titre et action
- `CardTitle` : Titre principal
- `CardDescription` : Description secondaire
- `CardContent` : Contenu principal
- `CardFooter` : Pied avec actions
- `CardAction` : Bouton d'action top-right

**Padding** :
- Header/Content/Footer : `px-6` + `pt-6`/`pb-6`
- Gap interne : `gap-6`

**Usage** :
```tsx
<Card>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenu</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### Badge (`/src/app/components/ui/badge.tsx`)

**Variantes** :
- `default` : Noir institutionnel
- `secondary` : Gris clair
- `destructive` : Rouge
- `outline` : Bordure uniquement

**Usage** :
```tsx
<Badge variant="default">Nouveau</Badge>
<Badge variant="secondary">En attente</Badge>
```

---

### Input (`/src/app/components/ui/input.tsx`)

**Style** :
- Fond : `bg-input-background` (#f3f3f5)
- Bordure : Transparente par défaut
- Focus : Ring de focus

**Usage** :
```tsx
<Input type="text" placeholder="Rechercher..." />
```

---

### Select (`/src/app/components/ui/select.tsx`)

**Composants** :
- `Select` : Conteneur
- `SelectTrigger` : Déclencheur
- `SelectValue` : Valeur affichée
- `SelectContent` : Menu déroulant
- `SelectItem` : Élément de menu

**Usage** :
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Sélectionner..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

---

## 🎯 Composants applicatifs

### StatusBadge (`/src/app/components/StatusBadge.tsx`)

**Statuts supportés** :
- `open` / `active` : Vert (ouvert)
- `closed` : Gris (fermé)
- `upcoming` : Bleu (à venir)
- `pending` : Jaune (en attente)
- `accepted` / `threshold_reached` : Vert (accepté)
- `rejected` : Rouge (rejeté)
- `completed` : Violet (terminé)
- `inProgress` : Bleu (en cours)

**Style** :
- Fond coloré + texte coloré + bordure colorée
- Arrondi complet : `rounded-full`
- Padding : `px-3 py-1`

**Usage** :
```tsx
<StatusBadge status="open" />
<StatusBadge status="completed" />
```

**Variantes de couleur** :
```css
Vert   : bg-green-100  text-green-800  border-green-300
Gris   : bg-gray-100   text-gray-800   border-gray-300
Bleu   : bg-blue-100   text-blue-800   border-blue-300
Jaune  : bg-yellow-100 text-yellow-800 border-yellow-300
Rouge  : bg-red-100    text-red-800    border-red-300
Violet : bg-purple-100 text-purple-800 border-purple-300
```

---

### ThemeTag (`/src/app/components/ThemeTag.tsx`)

**Props** :
- `themeId` : Identifiant du thème
- `size` : `sm` | `md` | `lg`
- `showIcon` : Afficher l'icône (défaut: true)

**Style** :
- Couleur dynamique selon le thème
- Fond transparent coloré : `backgroundColor: ${theme.color}20`
- Texte : `color: theme.color`
- Bordure : `border: 1px solid ${theme.color}40`
- Arrondi complet : `rounded-full`

**Tailles** :
```
sm : text-xs  px-2  py-0.5
md : text-sm  px-3  py-1
lg : text-base px-4 py-2
```

**Usage** :
```tsx
<ThemeTag themeId="urbanisme" size="md" showIcon={true} />
```

---

### KPICard (`/src/app/components/layout/KPICard.tsx`)

**Props** :
- `label` : Titre de la métrique
- `value` : Valeur (nombre ou string)
- `icon` : Icône Lucide
- `variant` : Couleur (`blue` | `green` | `purple` | `orange` | `indigo` | `emerald` | `pink` | `cyan`)
- `type` : Type visuel (`primary` | `secondary` | `insight`)
- `subtitle` : Sous-titre optionnel

**Types visuels** :
- `primary` : Fond blanc, icône colorée (KPI principaux)
- `secondary` : Fond teinté subtil (métriques secondaires)
- `insight` : Bordure gauche colorée (informations contextuelles)

**Structure** :
```
┌─────────────────────────┐
│ Label         [Icon]    │
│ Value (3xl/2xl)         │
│ Subtitle (opt.)         │
└─────────────────────────┘
```

**Invariants** :
- Icône : `w-12 h-12` top-right
- Label : `text-sm text-gray-600`
- Value : `text-3xl font-bold` (primary/secondary), `text-2xl` (insight)
- Padding : `p-6`
- Hover : `hover:shadow-md`

**Usage** :
```tsx
<KPICard 
  label="Consultations actives" 
  value={24} 
  icon={MessageSquare}
  variant="blue"
  type="primary"
/>
```

---

### FilterBar (`/src/app/components/layout/FilterBar.tsx`)

**Structure** :
- Carte avec bordure grise
- Grille 2 colonnes (responsive : 1 col mobile)
- Padding : `p-6`
- Gap entre filtres : `gap-4`

**Usage** :
```tsx
<FilterBar>
  <FilterField label="Thème">
    <Select>...</Select>
  </FilterField>
  <FilterField label="Statut">
    <Select>...</Select>
  </FilterField>
</FilterBar>
```

---

### FilterField (`/src/app/components/layout/FilterField.tsx`)

**Props** :
- `label` : Label du filtre
- `children` : Composant de saisie (Select, Input, etc.)

**Structure** :
```tsx
<div className="flex flex-col gap-2">
  <label className="text-sm font-medium text-gray-700">{label}</label>
  {children}
</div>
```

---

### ContentGrid (`/src/app/components/layout/ContentGrid.tsx`)

**Structure** :
- Grille responsive : `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Gap : `gap-6`

**Usage** :
```tsx
<ContentGrid>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</ContentGrid>
```

---

### PageBanner (`/src/app/components/PageBanner.tsx`)

**Props** :
- `title` : Titre de la page
- `description` : Description
- `gradient` : Gradient de couleur (ex: `from-cyan-600 to-blue-600`)
- `icon` : Icône (composant React)

**Structure** :
- Fond dégradé institutionnel
- Texte blanc
- Icône large (12x12)
- Padding : `py-12 px-6`

**Usage** :
```tsx
<PageBanner 
  title="Consultations publiques"
  description="Donnez votre avis sur les projets de votre commune"
  gradient="from-cyan-600 to-blue-600"
  icon={<MessageSquare className="w-12 h-12 text-white" />}
/>
```

---

## 🔄 États UI standards

### LoadingSpinner (`/src/app/components/LoadingSpinner.tsx`)

**Props** :
- `message` : Message de chargement (optionnel)
- `fullPage` : Mode pleine page (défaut: false)

**Style** :
- Spinner : `Loader2` animé, bleu (`text-blue-600`)
- Taille : `w-8 h-8`
- Message : `text-sm text-gray-500`

**Usage** :
```tsx
// Dans le contenu
<LoadingSpinner message="Chargement des données..." />

// Pleine page
<LoadingSpinner fullPage message="Initialisation..." />
```

**Multilingue** :
- FR : "Chargement..."
- DE : "Laden..."
- EN : "Loading..."

---

### EmptyState (`/src/app/components/EmptyState.tsx`)

**Props** :
- `title` : Titre (optionnel)
- `description` : Description (optionnel)
- `icon` : Icône (défaut: `Inbox`)

**Style** :
- Centré verticalement
- Icône : `w-16 h-16 text-gray-400`
- Titre : `text-lg font-medium text-gray-900`
- Description : `text-sm text-gray-500`

**Usage** :
```tsx
<EmptyState 
  title="Aucune consultation"
  description="Il n'y a pas de consultation active pour le moment."
  icon={<MessageSquare className="w-16 h-16" />}
/>
```

**Messages par défaut (multilingue)** :
- FR : "Aucune donnée disponible" / "Il n'y a aucun élément à afficher..."
- DE : "Keine Daten verfügbar" / "Es gibt derzeit keine Elemente..."
- EN : "No data available" / "There are no items to display..."

---

### ErrorMessage (`/src/app/components/ErrorMessage.tsx`)

**Props** :
- `error` : Objet erreur avec `.message`
- `onRetry` : Callback pour réessayer (optionnel)
- `title` : Titre (optionnel)

**Style** :
- Alerte destructive (`Alert variant="destructive"`)
- Icône : `AlertCircle`
- Bouton retry : `outline` avec icône `RefreshCw`

**Usage** :
```tsx
<ErrorMessage 
  error={error}
  onRetry={() => refetch()}
  title="Erreur de chargement"
/>
```

**Multilingue** :
- FR : "Erreur de chargement" / "Réessayer"
- DE : "Ladefehler" / "Erneut versuchen"
- EN : "Loading Error" / "Retry"

---

## 🧩 Modèles de pages React Query

### Pattern standard (consultations, pétitions, etc.)

```tsx
export function ExamplePage() {
  const { t, language, tLocal } = useLanguage();
  const { data, isLoading, error, refetch } = useExampleData();

  // État loading
  if (isLoading) {
    return (
      <div>
        <PageBanner {...bannerProps} />
        <PageLayout className="py-8">
          <LoadingSpinner message="Chargement des données..." />
        </PageLayout>
      </div>
    );
  }

  // État erreur
  if (error) {
    return (
      <div>
        <PageBanner {...bannerProps} />
        <PageLayout className="py-8">
          <ErrorMessage error={error} onRetry={refetch} />
        </PageLayout>
      </div>
    );
  }

  // État vide
  if (!data || data.length === 0) {
    return (
      <div>
        <PageBanner {...bannerProps} />
        <PageLayout className="py-8">
          <EmptyState 
            title="Aucune donnée"
            description="Aucun élément disponible pour le moment."
          />
        </PageLayout>
      </div>
    );
  }

  // État normal avec données
  return (
    <div>
      <PageBanner {...bannerProps} />
      <PageLayout className="py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard label="Total" value={data.length} icon={Icon} variant="blue" />
        </div>

        {/* Filtres */}
        <FilterBar>
          <FilterField label="Filtre 1">
            <Select>...</Select>
          </FilterField>
        </FilterBar>

        {/* Contenu */}
        <ContentGrid>
          {filteredData.map(item => (
            <Card key={item.id}>...</Card>
          ))}
        </ContentGrid>
      </PageLayout>
    </div>
  );
}
```

---

## 🎬 Animations

### Animations disponibles

```css
/* Fade in */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Slide in left */
@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}
```

**Classes** :
- `.animate-fade-in` : Durée 0.4s
- `.animate-slide-in` : Durée 0.5s

**Usage** :
```tsx
<div className="animate-fade-in">
  {/* Contenu avec animation au montage */}
</div>
```

---

## 🌈 Gradients des modules

Pour les banners de page, utiliser ces gradients officiels :

```tsx
// Consultations
gradient="from-cyan-600 to-blue-600"

// Assemblées
gradient="from-purple-600 to-pink-600"

// Pétitions
gradient="from-green-600 to-emerald-600"

// Conférences
gradient="from-orange-600 to-amber-600"

// Votes
gradient="from-indigo-600 to-blue-600"
```

---

## 🔍 Audit des composants existants

### ✅ Composants normalisés

| Composant | Fichier | Variantes | États |
|-----------|---------|-----------|-------|
| `Button` | `/src/app/components/ui/button.tsx` | 6 variantes, 4 tailles | ✅ disabled, hover, focus |
| `Card` | `/src/app/components/ui/card.tsx` | Structure complète | ✅ |
| `Badge` | `/src/app/components/ui/badge.tsx` | 4 variantes | ✅ |
| `StatusBadge` | `/src/app/components/StatusBadge.tsx` | 10 statuts | ✅ |
| `ThemeTag` | `/src/app/components/ThemeTag.tsx` | 3 tailles, couleurs dynamiques | ✅ |
| `KPICard` | `/src/app/components/layout/KPICard.tsx` | 8 variantes, 3 types | ✅ hover |
| `FilterBar` | `/src/app/components/layout/FilterBar.tsx` | - | ✅ |
| `LoadingSpinner` | `/src/app/components/LoadingSpinner.tsx` | 2 modes | ✅ multilingue |
| `EmptyState` | `/src/app/components/EmptyState.tsx` | - | ✅ multilingue |
| `ErrorMessage` | `/src/app/components/ErrorMessage.tsx` | - | ✅ multilingue, retry |

### ⚠️ Composants à normaliser

- **Cartes de consultation/pétition/etc.** : Actuellement inline dans les pages, à extraire en composants réutilisables
- **Tabs** : Utilisé mais sans variantes documentées
- **Modal/Dialog** : Utilisé dans admin, à documenter

---

## 📋 Checklist d'implémentation React

### Pour chaque page
- [ ] Utiliser React Query hooks (`useConsultations`, `usePetitions`, etc.)
- [ ] Gérer les 3 états : `isLoading`, `error`, `!data || data.length === 0`
- [ ] Utiliser `LoadingSpinner` pour loading
- [ ] Utiliser `ErrorMessage` pour error avec `refetch`
- [ ] Utiliser `EmptyState` pour données vides
- [ ] Utiliser `tLocal()` pour les objets `LocalizedString`
- [ ] Utiliser `t()` pour les traductions statiques
- [ ] Ajouter `key={item.id}` sur tous les éléments de liste

### Pour chaque composant
- [ ] Props typées avec TypeScript
- [ ] Variantes définis avec `class-variance-authority` si applicable
- [ ] États UI (hover, focus, disabled) définis
- [ ] Responsive mobile-first
- [ ] Accessibilité clavier et screen-reader
- [ ] Animation subtile si pertinent (fade-in, slide-in)

### Pour les formulaires
- [ ] Utiliser `react-hook-form@7.55.0`
- [ ] Validation inline
- [ ] Messages d'erreur multilingues
- [ ] États disabled pendant soumission
- [ ] Feedback toast avec `sonner`

---

## 🚀 Prochaines étapes

1. **Extraire les cartes métier** : ConsultationCard, PetitionCard, VoteCard, etc.
2. **Documenter les modals** : Structure et usage
3. **Créer des variantes de Tabs** : Définir les styles officiels
4. **Optimiser les animations** : Standardiser les transitions
5. **Audit d'accessibilité** : Tests WCAG 2.1 AA

---

## 📚 Ressources

- **Tailwind CSS v4** : https://tailwindcss.com
- **Radix UI** : https://www.radix-ui.com (base des composants ui/)
- **Lucide React** : https://lucide.dev (icônes)
- **React Query** : https://tanstack.com/query (gestion d'état serveur)
- **Motion** : https://motion.dev (animations)

---

**Fin du Design System v1.0**  
_Ce document est évolutif et sera enrichi au fur et à mesure des développements._
