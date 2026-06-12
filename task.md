# Gestion globale des événements (Workshop Sessions)

## Objectif

Créer une interface dédiée pour gérer les sessions d'ateliers (événements) de manière globale, indépendamment de la page d'édition d'un atelier spécifique. Cela inclut un CRUD complet, le support du Soft Delete, et un tableau de bord listant les événements à venir et passés avec possibilité de filtrage par atelier.

## Micro-étapes

- [x] Mettre à jour `plan.md` pour refléter l'ajout de cette fonctionnalité majeure.
- [x] Vérifier que le modèle `WorkshopSession` utilise bien le trait `SoftDeletes` et que la table contient la colonne `deleted_at` (créer une migration si nécessaire).
- [x] Créer le contrôleur `App\Http\Controllers\Admin\EventController` pour gérer le CRUD des événements (index, create, store, edit, update, destroy).
- [x] Ajouter les routes de ressources pour `admin/events` dans `routes/web.php` et régénérer le routeur Wayfinder.
- [x] Mettre à jour `resources/js/components/app-sidebar.tsx` pour que l'item "Evènement" pointe vers l'index des événements.
- [x] Créer la page `resources/js/pages/admin/events/index.tsx` :
    - Intégrer les onglets (Tabs) pour "À venir" et "Passés".
    - Intégrer un filtre (Select) pour trier/filtrer par Atelier.
    - Ajouter un bouton pour créer un nouvel événement.
- [x] Créer la page `resources/js/pages/admin/events/create.tsx` : Formulaire permettant de sélectionner un Atelier, une date/heure de début, et un nombre de places.
- [x] Créer la page `resources/js/pages/admin/events/edit.tsx` : Formulaire pour modifier un événement existant.
- [x] (Optionnel) Adapter le code de suppression pour gérer le Soft Delete depuis l'interface (restauration possible à l'avenir).
