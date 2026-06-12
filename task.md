# Création d'un tableau de bord récapitulatif des réservations passées

## Objectif

Ajouter un tableau de bord dans le panel d'administration (Back-Office) pour visualiser et gérer les réservations passées (les utilisateurs, les ateliers concernés, le statut de paiement, et le nombre de places).

## Micro-étapes

- [x] Créer (ou mettre à jour) un Controller pour le Dashboard de l'administration (ex: `Admin\DashboardController`).
- [x] Ajouter une méthode pour récupérer les statistiques des réservations (réservations récentes, total, etc.) et les passer à la vue Inertia.
- [x] Ajouter la route `/admin/dashboard` (ou équivalent) si elle n'existe pas déjà.
- [x] Mettre à jour le menu de navigation de l'administration pour inclure un lien vers le tableau de bord des réservations.
- [x] Créer le composant React `resources/js/pages/admin/dashboard/index.tsx` (ou `resources/js/pages/admin/bookings/index.tsx` selon la convention).
- [x] Afficher un tableau avec Shadcn/ui récapitulant les réservations (Utilisateur, Atelier, Session, Places, Prix total, Statut).
