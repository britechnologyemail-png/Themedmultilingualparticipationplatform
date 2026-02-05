# 🚀 GUIDE DE TEST RAPIDE - Filtres Consultations Législatives

## ⏱️ Test en 2 minutes

Suivez ces étapes pour vérifier que les filtres fonctionnent :

---

## 📍 Étape 1 : Accéder à la page (10 secondes)

1. Ouvrez votre application
2. Allez sur `/legislative-consultations`  
   *(ou cliquez sur "Consultations Législatives" dans le footer)*

**Vous devriez voir :**
```
┌────────────────────────────────────────────────────┐
│         ⚖️ Consultations Législatives              │
│    Participez à l'élaboration des textes...        │
└────────────────────────────────────────────────────┘

Textes législatifs ouverts à la consultation
Annotez les articles, votez sur les commentaires...

┌────────────────────────────────────────────────────┐
│ [Filtrer         ▼]  [Type de texte  ▼]  [Thème ▼]│
└────────────────────────────────────────────────────┘

[4 consultations]

[Carte 1] Transition Énergétique 2026
[Carte 2] Mobilité Urbaine Durable
[Carte 3] Protection des Espaces Verts
[Carte 4] Accessibilité Numérique
```

✅ **Si vous voyez 3 selects avec une flèche ▼, c'est bon !**

---

## 🔍 Étape 2 : Tester le premier select (20 secondes)

1. **Cliquez** sur le select **"Type de texte"**
2. Le select devrait s'ouvrir et afficher :
   ```
   Tous
   Projet de loi
   Règlement
   Décret
   Ordonnance
   Amendement
   ```

3. **Sélectionnez** "Règlement"

**Résultat attendu immédiat :**
```
[1 consultation]  [Type: Règlement ×]  [× Réinitialiser]

[Carte] Mobilité Urbaine Durable
```

✅ **Si vous voyez 1 carte au lieu de 4, ça fonctionne !**

---

## 🎯 Étape 3 : Tester la combinaison de filtres (30 secondes)

1. **Cliquez** sur le select **"Filtrer"** (le premier)
2. **Sélectionnez** "Ouvertes"

**Résultat attendu :**
```
[1 consultation]  [Statut: Ouvertes ×]  [Type: Règlement ×]  [× Réinitialiser]

[Carte] Mobilité Urbaine Durable
```

3. **Cliquez** maintenant sur le select **"Thème"**
4. **Sélectionnez** "Transport"

**Résultat attendu :**
```
[1 consultation]  [Statut: Ouvertes ×]  [Type: Règlement ×]  [Thème: Transport ×]  [× Réinitialiser]

[Carte] Mobilité Urbaine Durable
```

✅ **Si vous voyez 3 badges de filtres actifs, ça fonctionne !**

---

## 🔄 Étape 4 : Tester la réinitialisation (10 secondes)

1. **Cliquez** sur le bouton **"Réinitialiser"**

**Résultat attendu :**
```
[4 consultations]

[Carte 1] Transition Énergétique 2026
[Carte 2] Mobilité Urbaine Durable
[Carte 3] Protection des Espaces Verts
[Carte 4] Accessibilité Numérique
```

✅ **Si vous voyez à nouveau 4 cartes et aucun badge, ça fonctionne !**

---

## ✅ Checklist de validation (30 secondes)

Cochez mentalement :

- [ ] Les 3 selects sont visibles avec une flèche ▼
- [ ] Cliquer sur un select l'ouvre et affiche les options
- [ ] Sélectionner une option filtre les résultats
- [ ] Le compteur de résultats se met à jour (ex: "1 consultation")
- [ ] Des badges de filtres actifs apparaissent (ex: "Type: Règlement ×")
- [ ] Cliquer sur × d'un badge retire ce filtre
- [ ] Le bouton "Réinitialiser" apparaît quand des filtres sont actifs
- [ ] Cliquer sur "Réinitialiser" supprime tous les filtres

**Si tous les points sont cochés → Les filtres fonctionnent parfaitement ! ✅**

---

## 🎨 Ce que vous devez voir visuellement

### **Selects au repos**
```
┌─────────────────────────────────────────────────┐
│ 🔍 Filtrer                                   ▼  │  ← Icône filtre + flèche
├─────────────────────────────────────────────────┤
│ Tous                                            │  ← Valeur actuelle
└─────────────────────────────────────────────────┘
```

### **Select ouvert**
```
┌─────────────────────────────────────────────────┐
│ 🔍 Filtrer                                   ▼  │
├─────────────────────────────────────────────────┤
│ Tous                                         ✓  │  ← Option sélectionnée
│ Ouvertes                                        │
│ À venir                                         │
│ Fermées                                         │
└─────────────────────────────────────────────────┘
```

### **Avec filtres actifs**
```
[2 consultations]  [Statut: Ouvertes ×]  [Thème: Environnement ×]  [× Réinitialiser]
     ↑                    ↑                        ↑                        ↑
  Compteur         Badge cliquable         Badge cliquable            Bouton
```

---

## 🐛 Dépannage rapide

### **Problème : Je ne vois pas les selects**
**Solution :** Actualisez la page (F5 ou Cmd+R)

### **Problème : Les selects ne s'ouvrent pas**
**Solution :** 
1. Vérifiez que JavaScript est activé
2. Ouvrez la console (F12) et vérifiez qu'il n'y a pas d'erreurs
3. Essayez dans un autre navigateur

### **Problème : Les résultats ne changent pas quand je filtre**
**Solution :** 
1. Vérifiez la console (F12) pour les erreurs
2. Actualisez la page
3. Essayez un autre filtre

### **Problème : Je vois du texte au lieu de selects**
**Solution :** 
1. Le fichier n'a peut-être pas été mis à jour
2. Vérifiez que `/src/app/pages/LegislativeConsultationsPage.tsx` contient bien des `<select>` (lignes 117-179)
3. Redémarrez le serveur de développement

---

## 📊 Résultats attendus par filtre

### **Filtre : Type de texte → "Règlement"**
- ✅ 1 résultat : Mobilité Urbaine Durable

### **Filtre : Statut → "Ouvertes"**
- ✅ 2 résultats : Transition Énergétique + Mobilité Urbaine

### **Filtre : Thème → "Environnement"**
- ✅ 2 résultats : Transition Énergétique + Espaces Verts

### **Filtre : Statut "Ouvertes" + Thème "Environnement"**
- ✅ 1 résultat : Transition Énergétique

### **Filtre : Type "Décret" + Thème "Environnement"**
- ✅ 1 résultat : Espaces Verts

---

## 🎥 Scénario de démonstration (1 minute)

**Pour impressionner quelqu'un :**

1. Montrez la page avec 4 consultations
2. Dites : "Je vais filtrer par type Règlement"
3. Cliquez sur "Type de texte" → "Règlement"
4. Montrez que seule 1 consultation reste
5. Pointez le badge "Type: Règlement ×"
6. Cliquez sur le × pour le retirer
7. Montrez que les 4 consultations reviennent
8. Appliquez 2-3 filtres en même temps
9. Montrez les badges multiples
10. Cliquez sur "Réinitialiser"
11. Concluez : "Les filtres fonctionnent parfaitement !"

**Effet garanti ! 🎉**

---

## 📱 Test sur différents appareils

### **Mobile**
```
┌─────────────────┐
│ [Filtrer     ▼] │
│                 │
│ [Type        ▼] │
│                 │
│ [Thème       ▼] │
└─────────────────┘
```
Filtres empilés verticalement

### **Tablette/Desktop**
```
┌──────────────────────────────────┐
│ [Filtrer ▼] [Type ▼] [Thème ▼]  │
└──────────────────────────────────┘
```
Filtres côte à côte

✅ **Testez sur les 2 formats !**

---

## ⏱️ Temps total du test

- Étape 1 (Accès) : 10 secondes
- Étape 2 (Premier select) : 20 secondes
- Étape 3 (Combinaison) : 30 secondes
- Étape 4 (Réinitialisation) : 10 secondes
- Validation : 30 secondes

**TOTAL : ~2 minutes ⏱️**

---

## 🎯 Conclusion

**Si vous avez suivi toutes les étapes et que tout fonctionne → Les filtres sont opérationnels ! ✅**

**Prochaines étapes suggérées :**
1. ✅ Testez avec différentes combinaisons de filtres
2. ✅ Testez sur mobile et desktop
3. ✅ Testez dans différents navigateurs (Chrome, Firefox, Safari)
4. ✅ Changez la langue (FR/DE/EN) et vérifiez que les labels sont traduits

**Besoin d'aide ?**
- Documentation complète : `/CORRECTION_FINALE.md`
- Détails techniques : `/FILTRES_CORRIGES.md`
- Guide d'utilisation : `/README_FILTRES_CONSULTATIONS.md`

---

**Les filtres sont prêts pour la production ! 🚀**

*Guide de test rapide - Version 1.0*  
*Temps estimé : 2 minutes*
