# Patterns d'états UI - CiviAgora

**Documentation technique pour exploitation React**  
**Version**: 1.0  
**Date**: Janvier 2026

---

## 🎯 Objectif

Ce document définit les patterns standards pour gérer les états UI dans toutes les pages de CiviAgora. Chaque page doit implémenter ces 4 états de manière cohérente.

---

## 📊 Les 4 états obligatoires

### 1. État Loading (isLoading)

**Quand** : Pendant le chargement initial des données via React Query

**Composant** : `LoadingSpinner`

**Implémentation** :
```tsx
if (isLoading) {
  return (
    <div>
      <PageBanner {...bannerProps} />
      <PageLayout className="py-8">
        <LoadingSpinner message={
          language === 'fr' ? 'Chargement des données...' :
          language === 'de' ? 'Daten werden geladen...' :
          'Loading data...'
        } />
      </PageLayout>
    </div>
  );
}
```

**Variantes** :
- `fullPage={false}` (défaut) : Pour le contenu de page
- `fullPage={true}` : Pour les pages de chargement complet (rare)

---

### 2. État Error (error)

**Quand** : En cas d'échec de chargement des données

**Composant** : `ErrorMessage`

**Implémentation** :
```tsx
if (error) {
  return (
    <div>
      <PageBanner {...bannerProps} />
      <PageLayout className="py-8">
        <ErrorMessage 
          error={error} 
          onRetry={() => refetch()}
          title={
            language === 'fr' ? 'Erreur de chargement' :
            language === 'de' ? 'Ladefehler' :
            'Loading Error'
          }
        />
      </PageLayout>
    </div>
  );
}
```

**Fonctionnalités** :
- Affiche le message d'erreur de l'API
- Bouton "Réessayer" qui appelle `refetch()` de React Query
- Traduction automatique du bouton

---

### 3. État Empty (pas de données)

**Quand** : Données chargées avec succès mais vide (`!data || data.length === 0`)

**Composant** : `EmptyState`

**Implémentation** :
```tsx
if (!data || data.length === 0) {
  return (
    <div>
      <PageBanner {...bannerProps} />
      <PageLayout className="py-8">
        <EmptyState 
          title={
            language === 'fr' ? 'Aucune consultation disponible' :
            language === 'de' ? 'Keine Konsultationen verfügbar' :
            'No consultations available'
          }
          description={
            language === 'fr' ? 'Il n\'y a aucune consultation pour le moment.' :
            language === 'de' ? 'Es gibt derzeit keine Konsultationen.' :
            'There are no consultations at this time.'
          }
          icon={<MessageSquare className="w-16 h-16" />}
        />
      </PageLayout>
    </div>
  );
}
```

**Personnalisation** :
- Icône spécifique au module (MessageSquare, FileText, Vote, etc.)
- Messages multilingues adaptés au contexte

---

### 4. État Success (données disponibles)

**Quand** : Données chargées avec succès et non vides

**Structure** :
```tsx
return (
  <div>
    <PageBanner {...bannerProps} />
    <PageLayout className="py-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Cartes de statistiques */}
      </div>

      {/* Filtres */}
      <FilterBar>
        {/* Champs de filtrage */}
      </FilterBar>

      {/* Contenu principal */}
      <ContentGrid>
        {filteredData.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ContentGrid>
    </PageLayout>
  </div>
);
```

---

## 🔄 Pattern complet React Query

### Template de page standard

```tsx
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageBanner } from '../components/PageBanner';
import { PageLayout } from '../components/layout/PageLayout';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { EmptyState } from '../components/EmptyState';
import { useExampleData } from '../hooks/useApi';
import { Icon } from 'lucide-react';

export function ExamplePage() {
  const { t, language, tLocal } = useLanguage();
  const { data, isLoading, error, refetch } = useExampleData();
  const [filters, setFilters] = useState({});

  const bannerProps = {
    title: language === 'fr' ? 'Titre FR' : language === 'de' ? 'Titel DE' : 'Title EN',
    description: language === 'fr' ? 'Desc FR' : language === 'de' ? 'Desc DE' : 'Desc EN',
    gradient: 'from-blue-600 to-indigo-600',
    icon: <Icon className="w-12 h-12 text-white" />
  };

  // 1. État Loading
  if (isLoading) {
    return (
      <div>
        <PageBanner {...bannerProps} />
        <PageLayout className="py-8">
          <LoadingSpinner />
        </PageLayout>
      </div>
    );
  }

  // 2. État Error
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

  // 3. État Empty
  if (!data || data.length === 0) {
    return (
      <div>
        <PageBanner {...bannerProps} />
        <PageLayout className="py-8">
          <EmptyState 
            title="Aucune donnée"
            icon={<Icon className="w-16 h-16" />}
          />
        </PageLayout>
      </div>
    );
  }

  // 4. État Success avec données
  const filteredData = applyFilters(data, filters);

  return (
    <div>
      <PageBanner {...bannerProps} />
      <PageLayout className="py-8">
        {/* KPIs, Filtres, Contenu */}
      </PageLayout>
    </div>
  );
}
```

---

## 🎨 Variantes d'états vides

### Empty state après filtrage

**Quand** : Données disponibles mais aucun résultat après filtrage

```tsx
{filteredData.length === 0 ? (
  <EmptyState 
    title={
      language === 'fr' ? 'Aucun résultat' :
      language === 'de' ? 'Keine Ergebnisse' :
      'No results'
    }
    description={
      language === 'fr' ? 'Aucun élément ne correspond à vos critères de recherche.' :
      language === 'de' ? 'Keine Elemente entsprechen Ihren Suchkriterien.' :
      'No items match your search criteria.'
    }
    icon={<Filter className="w-16 h-16" />}
  />
) : (
  <ContentGrid>
    {filteredData.map(item => (
      <ItemCard key={item.id} item={item} />
    ))}
  </ContentGrid>
)}
```

### Empty state avec action

**Quand** : Inviter l'utilisateur à créer du contenu

```tsx
<EmptyState 
  title="Aucune pétition"
  description="Soyez le premier à lancer une pétition citoyenne."
/>
<div className="mt-6 flex justify-center">
  <Button onClick={() => navigate('/petitions/new')}>
    Créer une pétition
  </Button>
</div>
```

---

## 🔄 États de chargement partiels

### Skeleton loading (pour les updates)

**Quand** : Rechargement de données sans bloquer l'UI

```tsx
import { Skeleton } from '../components/ui/skeleton';

{isRefetching ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map(i => (
      <Card key={i}>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    ))}
  </div>
) : (
  <ContentGrid>
    {data.map(item => <ItemCard key={item.id} item={item} />)}
  </ContentGrid>
)}
```

### Optimistic updates

**Quand** : Mise à jour instantanée avant confirmation serveur

```tsx
const { mutate } = useMutation({
  mutationFn: signPetition,
  onMutate: async (petitionId) => {
    // Update UI immédiatement
    setSignedPetitions(prev => [...prev, petitionId]);
  },
  onError: (err, petitionId) => {
    // Rollback en cas d'erreur
    setSignedPetitions(prev => prev.filter(id => id !== petitionId));
    toast.error('Erreur lors de la signature');
  }
});
```

---

## 🎯 États des formulaires

### Pattern standard de formulaire

```tsx
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export function ExampleForm() {
  const { language } = useLanguage();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await submitData(data);
      toast.success(
        language === 'fr' ? 'Formulaire soumis avec succès' :
        language === 'de' ? 'Formular erfolgreich gesendet' :
        'Form submitted successfully'
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de la soumission' :
        language === 'de' ? 'Fehler beim Senden' :
        'Error submitting form'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input 
          {...register('field', { required: true })}
          placeholder="Champ requis"
          aria-invalid={errors.field ? 'true' : 'false'}
        />
        {errors.field && (
          <p className="text-sm text-red-600 mt-1">
            {language === 'fr' ? 'Ce champ est requis' :
             language === 'de' ? 'Dieses Feld ist erforderlich' :
             'This field is required'}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            {language === 'fr' ? 'Envoi...' : 
             language === 'de' ? 'Senden...' : 
             'Submitting...'}
          </>
        ) : (
          language === 'fr' ? 'Envoyer' :
          language === 'de' ? 'Senden' :
          'Submit'
        )}
      </Button>
    </form>
  );
}
```

---

## 📱 États responsive

### Mobile vs Desktop

**Pattern** : Adapter la densité d'information selon l'écran

```tsx
import { useIsMobile } from '../components/ui/use-mobile';

export function ResponsivePage() {
  const isMobile = useIsMobile();

  return (
    <div>
      {/* KPI Grid responsive */}
      <div className={`grid gap-6 mb-8 ${
        isMobile 
          ? 'grid-cols-1' 
          : 'grid-cols-2 lg:grid-cols-4'
      }`}>
        {/* KPI Cards */}
      </div>

      {/* Content Grid responsive */}
      <div className={`grid gap-6 ${
        isMobile 
          ? 'grid-cols-1' 
          : 'grid-cols-2 lg:grid-cols-3'
      }`}>
        {/* Cards */}
      </div>
    </div>
  );
}
```

---

## 🎬 États d'animation

### Transitions d'entrée

**Utiliser les classes CSS prédéfinies** :

```tsx
// Fade in pour les listes
<div className="animate-fade-in">
  <ContentGrid>
    {data.map(item => <Card key={item.id} />)}
  </ContentGrid>
</div>

// Slide in pour les éléments individuels
<div className="animate-slide-in">
  <KPICard />
</div>
```

### Motion pour les interactions avancées

```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  <Card />
</motion.div>
```

---

## ⚠️ Erreurs courantes à éviter

### ❌ NE PAS FAIRE

```tsx
// 1. Pas de gestion d'états
export function BadPage() {
  const { data } = useData();
  // Pas de vérification isLoading, error, empty
  return <div>{data.map(...)}</div>; // ❌ Erreur si data undefined
}

// 2. Texte codé en dur
<EmptyState title="No data" /> // ❌ Pas de traduction

// 3. Pas de key sur les listes
{data.map(item => <Card />)} // ❌ Manque key={item.id}

// 4. Utilisation directe de LocalizedString
<h1>{consultation.title}</h1> // ❌ Erreur "Objects are not valid as React child"
```

### ✅ FAIRE

```tsx
// 1. Gestion complète des états
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} onRetry={refetch} />;
if (!data || data.length === 0) return <EmptyState />;

// 2. Traduction multilingue
<EmptyState title={
  language === 'fr' ? 'Aucune donnée' :
  language === 'de' ? 'Keine Daten' :
  'No data'
} />

// 3. Key unique sur chaque élément
{data.map(item => <Card key={item.id} />)}

// 4. Utilisation de tLocal() pour LocalizedString
<h1>{tLocal(consultation.title)}</h1>
```

---

## 📋 Checklist de validation

### Pour chaque page

- [ ] État **Loading** implémenté avec `LoadingSpinner`
- [ ] État **Error** implémenté avec `ErrorMessage` + `onRetry`
- [ ] État **Empty** implémenté avec `EmptyState` personnalisé
- [ ] État **Success** avec données filtrées
- [ ] Toutes les listes ont des `key={item.id}`
- [ ] Tous les `LocalizedString` utilisent `tLocal()`
- [ ] Tous les textes UI sont traduits (FR/DE/EN)
- [ ] Responsive mobile vérifié
- [ ] Animations subtiles ajoutées

### Pour chaque formulaire

- [ ] Utilise `react-hook-form@7.55.0`
- [ ] Validation inline des champs
- [ ] Messages d'erreur multilingues
- [ ] État `isSubmitting` affiché (bouton disabled + spinner)
- [ ] Toast de confirmation/erreur
- [ ] Accessibilité clavier

---

## 🚀 Exemples réels

### Consultations Page (référence)

```tsx
// /src/app/pages/ConsultationsPage.tsx
export function ConsultationsPage() {
  const { t, language, tLocal } = useLanguage();
  const { data: consultations, isLoading, error, refetch } = useConsultations();

  if (isLoading) {
    return (
      <div>
        <PageBanner {...} />
        <PageLayout className="py-8">
          <LoadingSpinner />
        </PageLayout>
      </div>
    );
  }

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

  if (!consultations || consultations.length === 0) {
    return (
      <div>
        <PageBanner {...} />
        <PageLayout className="py-8">
          <EmptyState 
            title="Aucune consultation"
            icon={<MessageSquare className="w-16 h-16" />}
          />
        </PageLayout>
      </div>
    );
  }

  return (
    <div>
      <PageBanner {...} />
      <PageLayout className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <KPICard ... />
        </div>
        <FilterBar>...</FilterBar>
        <ContentGrid>
          {filteredConsultations.map(consultation => (
            <ConsultationCard 
              key={consultation.id} 
              consultation={consultation} 
            />
          ))}
        </ContentGrid>
      </PageLayout>
    </div>
  );
}
```

---

**Fin du document UI States & Patterns**  
_Ce document est la référence pour tous les développements d'interfaces dans CiviAgora._
