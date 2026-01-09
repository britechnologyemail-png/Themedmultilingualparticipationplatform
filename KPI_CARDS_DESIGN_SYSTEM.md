# KPI Cards Design System - CiviAgora

## Vue d'ensemble

Le système de KPI Cards de CiviAgora fournit un composant unifié et professionnel pour afficher les indicateurs clés de performance à travers toute la plateforme. Ce système garantit la cohérence visuelle, la lisibilité et une hiérarchie d'information claire.

## Composant principal : KPICard

**Emplacement** : `/src/app/components/layout/KPICard.tsx`

### Structure invariante

Chaque KPI Card suit une structure fixe et identique :

```
┌─────────────────────────────────────┐
│ Label (top-left)          Icon      │
│                          [12x12]    │
│ Value (large, bold)                 │
│ Subtitle (optional)                 │
└─────────────────────────────────────┘
```

### Éléments de design

| Élément | Style | Position |
|---------|-------|----------|
| **Label** | `text-sm text-gray-600` | Top-left |
| **Value** | `text-3xl font-bold text-gray-900` | Center-left |
| **Icon Container** | `w-12 h-12 rounded-lg` | Top-right |
| **Icon** | `w-6 h-6` | Inside container |
| **Subtitle** | `text-xs` | Below value (optional) |
| **Padding** | `p-6` | Uniform |
| **Card Height** | `h-full` | Responsive |

## Types de cartes

Le système définit 3 types de KPI Cards pour créer une hiérarchie visuelle claire :

### 1. Primary KPI Card (`type="primary"`)
**Usage** : Indicateurs clés principaux (métriques essentielles)

- **Background** : Blanc (`bg-white`)
- **Border** : Gris neutre (`border-gray-200`)
- **Hover** : Élévation d'ombre (`hover:shadow-md`)
- **Utilisation** : Nombres absolus, compteurs principaux

**Exemple** :
```tsx
<KPICard
  label="Total Consultations"
  value={42}
  icon={FileText}
  variant="blue"
  type="primary"
/>
```

### 2. Secondary KPI Card (`type="secondary"`)
**Usage** : Métriques de support (ratios, pourcentages, tendances)

- **Background** : Teinte subtile de la couleur variant (`bg-{color}-50/50`)
- **Border** : Gris neutre (`border-gray-200`)
- **Hover** : Élévation d'ombre (`hover:shadow-md`)
- **Utilisation** : Pourcentages, taux de complétion, métriques secondaires

**Exemple** :
```tsx
<KPICard
  label="Taux de participation"
  value="67%"
  icon={TrendingUp}
  variant="green"
  type="secondary"
/>
```

### 3. Insight KPI Card (`type="insight"`)
**Usage** : Informations contextuelles (tendances dominantes, insights)

- **Background** : Blanc (`bg-white`)
- **Border Left** : Accent de couleur 4px (`border-l-4 border-l-{color}-500`)
- **Border Other** : Gris neutre (`border-y border-r border-gray-200`)
- **Hover** : Élévation d'ombre (`hover:shadow-md`)
- **Subtitle** : Couleur accentuée (`text-{color}-700`)
- **Utilisation** : Tendances, insights, informations qualitatives

**Exemple** :
```tsx
<KPICard
  label="Thème tendance"
  value="Environnement"
  icon={TrendingUp}
  variant="emerald"
  type="insight"
  subtitle="15 activités en cours"
/>
```

## Variantes de couleurs

Le système propose 8 variantes de couleurs institutionnelles :

| Variant | Palette | Usage recommandé |
|---------|---------|------------------|
| `blue` | Bleu principal | Processus, général |
| `green` | Vert | Succès, actif, ouvert |
| `purple` | Violet | Votes, assemblées |
| `orange` | Orange | Participants, engagement |
| `indigo` | Indigo | Experts, conférences |
| `emerald` | Émeraude | Environnement, croissance |
| `pink` | Rose | Événements, forums |
| `cyan` | Cyan | Statistiques, analytique |

### Structure des couleurs

Chaque variante définit :
- `iconBg` : Fond de l'icône (ex: `bg-blue-100`)
- `iconColor` : Couleur de l'icône (ex: `text-blue-600`)
- `accentBorder` : Bordure accentuée pour type insight (ex: `border-l-blue-500`)
- `subtleBg` : Fond subtil pour type secondary (ex: `bg-blue-50/50`)
- `textAccent` : Couleur de texte accentué (ex: `text-blue-700`)

## Principes de design institutionnel

### 1. Sobriété et professionnalisme
- ❌ **Éviter** : Dégradés saturés, animations flashy, backgrounds colorés pleins
- ✅ **Privilégier** : Blanc/gris neutre, accents de couleur subtils, icônes colorées

### 2. Hiérarchie visuelle claire
- **Valeur** : Élément le plus important (text-3xl, bold)
- **Label** : Contexte (text-sm, medium contrast)
- **Icône** : Support visuel (position fixe, taille constante)

### 3. Espacement constant
- **Padding** : 24px (p-6) sur toutes les cartes
- **Gap** : 24px (gap-6) entre les cartes en grille
- **Icon Container** : 48x48px toujours

### 4. Grille standardisée
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
  {/* 4 KPI Cards par ligne sur desktop */}
</div>
```

## Usage à travers la plateforme

### Pages utilisant KPICard

| Page | KPI Cards |
|------|-----------|
| **Dashboard** | 4 primary cards (processus actifs, pétitions, votes, participants) |
| **Consultations** | 4 primary cards (total, ouvertes, participants, contributions) |
| **Assemblées** | 4 primary cards (total, membres, réunions, décisions) |
| **Pétitions** | 4 primary cards (actives, seuil atteint, total, signatures) |
| **Conférences** | 3 primary + 1 secondary (événements, experts, places réservées %, sessions) |
| **Votes** | 4 primary cards (ouverts, à venir, total, participants) |
| **Thèmes** | 3 primary + 1 insight (actifs, contributions, propositions, tendance) |

## Exemples de code

### Carte Primary basique
```tsx
<KPICard
  label="Processus actifs"
  value={15}
  icon={MessageSquare}
  variant="blue"
  type="primary"
/>
```

### Carte Secondary avec pourcentage
```tsx
<KPICard
  label="Places réservées"
  value="67%"
  icon={TrendingUp}
  variant="cyan"
  type="secondary"
/>
```

### Carte Insight avec subtitle
```tsx
<KPICard
  label="Tendance"
  value="Environnement"
  icon={TrendingUp}
  variant="emerald"
  type="insight"
  subtitle={
    <span className="flex items-center gap-1">
      <span>🌱</span>
      <span>15 activités</span>
    </span>
  }
/>
```

## Migration depuis l'ancien système

### Avant (gradients colorés)
```tsx
<Card className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
  <CardContent className="pt-6">
    <div className="flex items-center gap-2 mb-1">
      <FileText className="w-4 h-4 text-purple-600" />
      <span className="text-xs text-purple-700">Total Événements</span>
    </div>
    <p className="text-2xl text-purple-900">{totalEvents}</p>
  </CardContent>
</Card>
```

### Après (KPICard unifié)
```tsx
<KPICard
  label="Total Événements"
  value={totalEvents}
  icon={FileText}
  variant="purple"
  type="primary"
/>
```

## Responsive Design

Le système s'adapte automatiquement :

- **Mobile** (`<md`) : 1 colonne
- **Tablet** (`md`) : 2 colonnes
- **Desktop** (`lg+`) : 4 colonnes

```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
```

## Accessibilité

- **Contraste** : Respect WCAG AA (text-gray-900 sur bg-white)
- **Focus** : States de hover visibles
- **Semantic HTML** : Utilisation de Card component
- **Screen readers** : Labels descriptifs

## Maintenance

### Ajouter une nouvelle variante de couleur

1. Ouvrir `/src/app/components/layout/KPICard.tsx`
2. Ajouter la couleur dans l'union type `variant`
3. Ajouter l'objet de styles dans `variantStyles`

```tsx
variant?: 'blue' | 'green' | ... | 'newcolor';

const variantStyles = {
  // ... existing
  newcolor: {
    iconBg: 'bg-newcolor-100',
    iconColor: 'text-newcolor-600',
    accentBorder: 'border-l-newcolor-500',
    subtleBg: 'bg-newcolor-50/50',
    textAccent: 'text-newcolor-700',
  },
};
```

## Checklist de qualité

Avant de créer une nouvelle page avec KPI Cards, vérifier :

- [ ] Utilisation du composant `KPICard` (pas de cartes custom)
- [ ] Grille 4 colonnes responsive (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`)
- [ ] Gap de 24px entre les cartes (`gap-6`)
- [ ] Type de carte approprié (primary/secondary/insight)
- [ ] Variante de couleur cohérente avec le contenu
- [ ] Labels courts et descriptifs
- [ ] Valeurs formatées (nombres avec séparateurs de milliers)
- [ ] Icônes appropriées depuis `lucide-react`

## Ressources

- **Composant** : `/src/app/components/layout/KPICard.tsx`
- **Examples** : Voir pages Dashboard, Consultations, Pétitions, etc.
- **Icons** : [Lucide React](https://lucide.dev/)
- **Tailwind** : [Documentation v4](https://tailwindcss.com/)
