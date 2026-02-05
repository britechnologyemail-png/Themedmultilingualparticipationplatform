# 🚀 Menu Dynamique du Footer - Guide de Démarrage Rapide

## 🎯 Accès Rapide

### **FrontOffice** - Voir le menu en action
- **URL :** N'importe quelle page du site (le menu est dans le footer)
- **Position :** En haut du footer, barre horizontale avec icônes
- **Changement de langue :** Le menu s'adapte automatiquement (FR/DE/EN)

### **Backoffice** - Gérer le menu
- **URL :** `/admin/footer-menu`
- **Accès :** Menu admin → Footer Menu Management

---

## 📋 Menu Items Disponibles (9 items par défaut)

| # | Nom | Icône | Path | Badge |
|---|-----|-------|------|-------|
| 1 | Accueil | 🏠 Home | `/` | - |
| 2 | Concertations | 💬 MessageSquare | `/consultations` | 5 Nouveau |
| 3 | Assemblées | 👥 Users | `/assemblies` | - |
| 4 | Pétitions | 📄 FileText | `/petitions` | 12 Actif |
| 5 | Conférences | 🎥 Video | `/conferences` | - |
| 6 | Votes | 🗳️ Vote | `/votes` | 3 En cours |
| 7 | Signalements | ⚠️ AlertCircle | `/signalements` | - |
| 8 | Espace Jeunesse | ✨ Sparkles | `/youth-space` | 8 Populaire |
| 9 | Thèmes | 🏷️ Tag | `/themes` | - |

---

## 🎛️ Actions Rapides (Backoffice)

### **1. Désactiver un item**

```
1. Aller sur /admin/footer-menu
2. Onglet "Menu Items"
3. Trouver l'item (ex: "Conférences")
4. Cliquer sur le bouton Power (⚡)
5. ✅ L'item disparaît du footer FrontOffice
```

**Résultat :** L'item devient gris avec badge "Inactive" et n'apparaît plus dans le menu.

---

### **2. Masquer un item**

```
1. Aller sur /admin/footer-menu
2. Onglet "Menu Items"
3. Trouver l'item
4. Cliquer sur le bouton Eye (👁)
5. ✅ L'item est masqué du footer
```

**Résultat :** Badge "Hidden" s'affiche, l'item n'apparaît plus dans le menu.

---

### **3. Réorganiser le menu**

```
1. Onglet "Menu Items"
2. Utiliser les numéros d'ordre pour identifier la position
3. Utiliser drag & drop (icône ≡ GripVertical) pour déplacer
4. ✅ L'ordre change instantanément sur le FrontOffice
```

**Note :** Le drag & drop complet sera implémenté en Phase 2. Pour l'instant, modifier manuellement via l'API.

---

### **4. Voir les statistiques**

```
1. Onglet "Statistics"
2. Consulter :
   - Total Items, Active Items, Inactive Items
   - Most Popular Items (top 3 par clics)
```

**Données affichées :**
- Nombre total de clics
- Clics sur 7 derniers jours
- Clics sur 30 derniers jours

---

### **5. Modifier la configuration**

```
1. Onglet "Configuration"
2. Sections disponibles :
   - Logo Settings (affichage, taille)
   - Layout Settings (position, alignement, icônes/labels)
   - Behavior Settings (tooltips, animations)
3. Cliquer "Save Changes" pour appliquer
```

---

## 🌍 Support Multilingue

Le menu s'adapte automatiquement à la langue de l'interface :

| Langue | Exemple |
|--------|---------|
| 🇫🇷 **Français** | Accueil \| Concertations \| Assemblées \| Pétitions |
| 🇩🇪 **Allemand** | Startseite \| Beratungen \| Versammlungen \| Petitionen |
| 🇬🇧 **Anglais** | Home \| Consultations \| Assemblies \| Petitions |

**Changement :** Utiliser le sélecteur de langue dans le Header.

---

## 🎨 Personnalisation Visuelle

### **États des boutons**

| État | Apparence |
|------|-----------|
| **Normal** | Fond gris foncé, texte gris clair |
| **Actif** | Fond bleu, texte blanc, ombre |
| **Hover** | Fond gris clair, scale 1.05, y:-2px |
| **Tap** | Scale 0.98 |

### **Badges**

| Type | Couleur | Exemple |
|------|---------|---------|
| Nouveau | Vert | `bg-green-500` |
| Actif | Orange | `bg-orange-500` |
| En cours | Rouge | `bg-red-500` |
| Populaire | Turquoise | `bg-teal-500` |

---

## 📱 Responsive

### **Desktop (> 1024px)**
- Tous les items sur une ligne
- Espacement confortable (gap-3)
- Tooltips au survol

### **Tablette (768px - 1024px)**
- Items sur 1-2 lignes selon nombre
- Espacement réduit (gap-2)
- Tooltips au survol

### **Mobile (< 768px)**
- Items empilés sur plusieurs lignes
- Boutons adaptés à la taille tactile
- Tooltips au tap

---

## 🔧 API Hooks - Exemples d'utilisation

### **Récupérer les items actifs (FrontOffice)**

```typescript
import { useActiveFooterMenuItems } from '../hooks/useFooterMenuApi';

function MyComponent() {
  const { data: menuItems, isLoading } = useActiveFooterMenuItems();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {menuItems?.map(item => (
        <div key={item.id}>{item.label.en}</div>
      ))}
    </div>
  );
}
```

### **Toggle activation (Backoffice)**

```typescript
import { useToggleMenuItemActive } from '../../hooks/useFooterMenuApi';

function AdminPanel() {
  const toggleActive = useToggleMenuItemActive();
  
  const handleToggle = (id: string) => {
    toggleActive.mutate(id);
  };
  
  return (
    <button onClick={() => handleToggle('menu-item-001')}>
      Toggle Active
    </button>
  );
}
```

---

## 🐛 Troubleshooting

### **Le menu ne s'affiche pas**

**Causes possibles :**
1. Aucun item actif et visible
2. Erreur de chargement des données
3. Configuration `showInFooter: false` sur tous les items

**Solution :**
```typescript
// Vérifier dans la console
const { data, error } = useActiveFooterMenuItems();
console.log('Menu data:', data);
console.log('Error:', error);
```

---

### **Les badges ne s'affichent pas**

**Vérifications :**
1. Vérifier que `badge` est défini dans les données mock
2. Vérifier que `badge.count` ou `badge.label` existe
3. Vérifier la configuration `showLabels: true`

---

### **Les animations sont saccadées**

**Solution :**
1. Vérifier que `animationEnabled: true` dans la config
2. Réduire le nombre d'items si trop nombreux
3. Désactiver les animations sur mobile si nécessaire

---

## 📊 Données Mock - Localisation

**Fichier :** `/src/app/data/footerMenuMock.ts`

**Modifier un label :**
```typescript
{
  id: 'menu-item-001',
  key: 'home',
  label: {
    fr: 'Accueil',    // ← Modifier ici
    de: 'Startseite',
    en: 'Home',
  },
  // ...
}
```

**Ajouter un badge :**
```typescript
{
  // ...
  badge: {
    count: 5,
    label: {
      fr: 'Nouveau',
      de: 'Neu',
      en: 'New',
    },
    color: 'bg-green-500',
  },
}
```

---

## 🎯 Cas d'Usage Fréquents

### **Scénario 1 : Masquer temporairement "Conférences" pendant maintenance**

```
1. /admin/footer-menu → Menu Items
2. Trouver "Conférences"
3. Cliquer Eye (👁) pour masquer
4. ✅ Disparaît du footer
5. Une fois la maintenance terminée : recliquer Eye pour réafficher
```

---

### **Scénario 2 : Promouvoir "Votes" avec un badge "Urgent"**

```
1. /admin/footer-menu → Menu Items
2. Modifier "Votes"
3. Ajouter badge : { count: 3, label: 'Urgent', color: 'bg-red-500' }
4. ✅ Badge rouge "3 Urgent" apparaît sur le bouton
```

---

### **Scénario 3 : Réorganiser pour mettre "Pétitions" en premier**

```
1. /admin/footer-menu → Menu Items
2. Drag "Pétitions" vers le haut (ou modifier order: 0)
3. ✅ "Pétitions" apparaît en première position
```

---

## 📚 Documentation Complète

Pour plus de détails, consulter :
- **`/FOOTER_DYNAMIC_MENU.md`** - Documentation technique complète
- **`/FOOTER_SIMPLIFICATION.md`** - Historique simplification footer
- **`/FOOTER_LINKS_UPDATE.md`** - Mise à jour des liens (si disponible)

---

## ✅ Checklist Démarrage

- [ ] Ouvrir le FrontOffice et vérifier que le menu s'affiche
- [ ] Tester le changement de langue (FR/DE/EN)
- [ ] Accéder à `/admin/footer-menu`
- [ ] Tester toggle Active/Inactive sur un item
- [ ] Tester toggle Visible/Hidden sur un item
- [ ] Consulter les statistiques
- [ ] Vérifier la configuration (logo, layout, behavior)
- [ ] Tester le responsive (mobile/tablette/desktop)

---

**Guide créé le : 5 février 2026**  
**Statut : ✅ Prêt à l'emploi**

**Bon développement avec le menu dynamique du footer ! 🎉🚀**
