# 🔍 Guide de Vérification - Système de Gestion des Sections

## 📍 Où Trouver le Système de Gestion des Sections ?

### **Accès BackOffice**

1. **Ouvrez votre navigateur** et allez sur :
   ```
   http://localhost:3000/admin
   ```

2. **Dans le menu latéral gauche**, cherchez l'entrée :
   ```
   📐 Gestion des Sections
   ```
   ou
   ```
   🔲 Sections Management  (en anglais)
   ```
   ou
   ```
   🔲 Abschnittsverwaltung  (en allemand)
   ```

3. **Position dans le menu** :
   - Après "Navigation & Menus"
   - Avant "Organisation"

4. **Icône** : Un icône de calques (Layers) ▣

---

## ✅ Checklist de Vérification

### **1. Vérifier que les fichiers existent**

Ouvrez votre terminal et exécutez :

```bash
# Vérifier les pages
ls -la src/app/admin/pages/SectionsManagement.tsx
ls -la src/app/admin/pages/SectionDetailConfig.tsx

# Vérifier les hooks
ls -la src/app/hooks/useSections.ts

# Vérifier les services
ls -la src/app/services/sectionsApi.ts

# Vérifier les données mock
ls -la src/app/data/sectionsMock.ts
```

**Résultat attendu** : Tous les fichiers doivent exister

### **2. Vérifier qu'il n'y a pas d'erreurs de compilation**

```bash
# Dans le terminal où votre app tourne
# Cherchez des erreurs TypeScript ou d'import
```

Si vous voyez des erreurs comme :
- `Cannot find module`
- `Type error`
- `Module not found`

→ Le système ne sera pas accessible

### **3. Vérifier la console du navigateur**

1. Ouvrez les **DevTools** (F12)
2. Allez dans l'onglet **Console**
3. Cherchez des erreurs en rouge

Erreurs possibles :
- `Failed to compile`
- `Module not found`
- `Unexpected token`

### **4. Vérifier que le menu est bien chargé**

1. Ouvrez `/admin` dans votre navigateur
2. Ouvrez les **DevTools** (F12)
3. Dans l'onglet **Elements**, cherchez :
   ```html
   <nav class="p-4 space-y-1">
   ```
4. Vérifiez qu'il y a un lien vers `/admin/sections`

---

## 🐛 Problèmes Courants et Solutions

### **Problème 1 : Le menu n'apparaît pas**

**Symptômes** :
- Le menu latéral ne contient pas "Gestion des Sections"

**Solutions** :

1. **Vérifier le rôle utilisateur**
   ```typescript
   // Le menu est réservé au rôle 'admin'
   roles: ['admin']
   ```
   → Assurez-vous que vous êtes connecté en tant qu'admin

2. **Recharger complètement la page**
   - Appuyez sur `Ctrl + Shift + R` (ou `Cmd + Shift + R` sur Mac)
   - Cela force le rechargement du cache

3. **Vider le cache du navigateur**
   - Chrome : `Ctrl + Shift + Delete`
   - Sélectionnez "Cached images and files"
   - Cliquez sur "Clear data"

### **Problème 2 : Erreur 404 quand je clique sur le menu**

**Symptômes** :
- Le lien existe mais affiche "Page not found"

**Solutions** :

1. **Vérifier que les routes sont bien configurées** dans `App.tsx` :
   ```typescript
   <Route path="sections" element={<SectionsManagement />} />
   <Route path="sections/:sectionKey" element={<SectionDetailConfig />} />
   ```

2. **Redémarrer le serveur de développement**
   ```bash
   # Arrêtez le serveur (Ctrl + C)
   # Puis relancez
   npm run dev
   ```

### **Problème 3 : Page blanche ou erreur au chargement**

**Symptômes** :
- La page charge mais affiche une erreur ou reste blanche

**Solutions** :

1. **Vérifier les imports** dans `App.tsx` :
   ```typescript
   import { SectionsManagement } from './admin/pages/SectionsManagement';
   import { SectionDetailConfig } from './admin/pages/SectionDetailConfig';
   ```

2. **Vérifier les dépendances** :
   ```bash
   npm install
   ```

3. **Regarder la console du navigateur** pour l'erreur exacte

### **Problème 4 : Le composant charge mais n'affiche rien**

**Symptômes** :
- La page `/admin/sections` charge
- Mais aucun contenu ne s'affiche

**Solutions** :

1. **Vérifier que React Query est bien configuré** dans `App.tsx` :
   ```typescript
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
   
   const queryClient = new QueryClient({...});
   ```

2. **Vérifier que les données mock sont bien importées** :
   ```bash
   # Vérifier le fichier
   cat src/app/data/sectionsMock.ts | grep "export const mockSections"
   ```

3. **Ouvrir la console** et chercher des erreurs de chargement de données

---

## 🔧 Test Rapide

### **Test 1 : Accès direct par URL**

Essayez d'accéder directement à :
```
http://localhost:3000/admin/sections
```

**Résultat attendu** :
- Page "Gestion des Sections" s'affiche
- 4 cartes de statistiques visibles
- Tableau avec 8 sections

**Si ça ne marche pas** :
→ Problème de routing ou de composant

### **Test 2 : Accès par le menu**

1. Allez sur `http://localhost:3000/admin`
2. Cherchez "Gestion des Sections" dans le menu
3. Cliquez dessus

**Résultat attendu** :
- URL change vers `/admin/sections`
- Même page que Test 1

**Si ça ne marche pas** :
→ Problème de menu ou de configuration AdminLayout

### **Test 3 : Vérifier les hooks**

Ouvrez la console et tapez :
```javascript
// Test si React Query fonctionne
window.__REACT_QUERY_DEVTOOLS_GLOBAL_HOOK__
```

**Résultat attendu** :
- Un objet est retourné (React Query est actif)

**Si undefined** :
→ React Query n'est pas correctement installé

---

## 📞 Commandes de Débogage

### **Vérifier la structure des fichiers**

```bash
# Liste complète des fichiers créés
find src/app -name "*section*" -o -name "*Section*"
```

### **Chercher les imports dans App.tsx**

```bash
grep -n "SectionsManagement\|SectionDetailConfig" src/app/App.tsx
```

### **Chercher les routes dans App.tsx**

```bash
grep -n "path=\"sections" src/app/App.tsx
```

### **Vérifier le menu dans AdminLayout**

```bash
grep -n "Gestion des Sections" src/app/admin/components/AdminLayout.tsx
```

---

## 🚀 Solution de Dernier Recours

Si rien ne fonctionne, essayez cette séquence complète :

```bash
# 1. Arrêter le serveur (Ctrl + C)

# 2. Nettoyer les caches
rm -rf node_modules/.vite
rm -rf dist

# 3. Redémarrer
npm run dev

# 4. Vider le cache du navigateur (Ctrl + Shift + Delete)

# 5. Recharger complètement (Ctrl + Shift + R)

# 6. Ouvrir http://localhost:3000/admin/sections directement
```

---

## 📸 À Quoi Ça Doit Ressembler

### **Menu Latéral**

```
┌─────────────────────────────────┐
│ 📊 Tableau de bord             │
│ 👥 Utilisateurs & Rôles         │
│ 🔲 Processus participatifs      │
│ 📄 Consultations Législatives   │
│ 🏷️  Gestion des thèmes           │
│ 📧 Modération                   │
│ 👥 Participations citoyennes    │
│ 📧 Newsletter                   │
│    ├─ Abonnés                   │
│    └─ Campagnes                 │
│ 📅 Calendrier & Phases          │
│ 📊 Indicateurs & Statistiques   │
│ ✅ Publication des résultats    │
│ 📥 Exports & Rapports           │
│ 📐 Navigation & Menus           │
│    ├─ Menu Header               │
│    └─ Menu Footer               │
│ ▣ Gestion des Sections ← ICI  │  <-- C'EST LÀ !
│ 🏢 Organisation                 │
│    ├─ Profil                    │
│    ├─ Périmètre géographique    │
│    └─ Gestion du territoire     │
│ ⚙️  Services & Paramètres        │
│    ├─ Paramètres généraux       │
│    └─ Notifications             │
└─────────────────────────────────┘
```

### **Page Principale (/admin/sections)**

```
┌────────────────────────────────────────────────────────────┐
│  Gestion des Sections                                      │
│  Configurez et gérez toutes les sections de la plateforme  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ │
│  │ Sections  │ │ Sections  │ │Participants│ │Interactions│ │
│  │ Totales   │ │  Actives  │ │   Totaux   │ │  Totales   │ │
│  │    8      │ │    8      │ │  40,901    │ │  94,434    │ │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘ │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  Vue d'ensemble des Sections                               │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Section         Statut    Visibilité    Stats   Actions  │
│  ──────────────────────────────────────────────────────── │
│  🗣️ Concertations  Active   H F Home    45/12   Configure │
│  👥 Assemblées     Active   H F Home    18/8    Configure │
│  📄 Pétitions      Active   H F Home    67/23   Configure │
│  🎥 Conférences    Active   H F Home    28/6    Configure │
│  ✅ Votes          Active   H F Home    34/5    Configure │
│  ⚠️  Signalements   Active   H F Home    142/45  Configure │
│  ✨ Jeunesse       Active   H F Home    56/18   Configure │
│  🏷️  Thèmes         Active   H F Home    12/12   Configure │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## ✉️ Contact Support

Si après toutes ces vérifications le système n'est toujours pas visible :

1. **Partagez les informations suivantes** :
   - Sortie de `ls -la src/app/admin/pages/`
   - Sortie de `grep -n "sections" src/app/App.tsx`
   - Screenshot du menu latéral
   - Messages d'erreur dans la console

2. **Vérifiez votre version de Node.js** :
   ```bash
   node --version
   npm --version
   ```

3. **Essayez de recréer les fichiers** si nécessaire

---

**Date** : 5 février 2026  
**Version** : 1.0.0  
**Status** : Guide de Débogage
