# Tâches en cours : Étape 4 - Catalogue Public (Front-Office)

## Objectif du jour
Mettre en place le catalogue public (Front-Office) avec un design minimaliste (boilerplate) mais connecté aux vraies données de la base de données. L'utilisateur se chargera du design final lui-même.

## Étapes techniques
- [x] Analyser la structure existante dans `/resources/js/pages/site`.
- [x] Créer/Modifier le contrôleur (ex: `SiteController`) pour la page d'accueil afin d'y envoyer les ateliers actifs (avec l'image de couverture et les prix).
- [x] Mettre à jour `resources/js/pages/site/app.tsx` (ou le composant principal de la page d'accueil) pour afficher les ateliers depuis les `props` Inertia.
- [x] Créer une route et une méthode de contrôleur pour la page de détail d'un atelier (`/ateliers/{slug}`).
- [x] Créer la page de détail d'un atelier (ex: `resources/js/pages/site/atelier.tsx`) avec les informations détaillées (description, galerie d'images, sessions disponibles) sous forme de boilerplate.
- [x] S'assurer que le routage Laravel vers Inertia fonctionne pour ces deux vues.
