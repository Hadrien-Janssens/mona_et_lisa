# Plan de Développement Global : mona_et_lisa

## Étape 1 : Initialisation & Configuration Initiale ✅

- [x] Configurer le fichier `.env` (Base de données, variables d'application).
- [x] Vérifier le bon fonctionnement du serveur de build (`npm run dev`) et de l'authentification native Laravel.

## Étape 2 : Architecture des Données ✅

- [x] Créer les modèles, les migrations et les relations définis dans `schema.md` (`Workshop`, `WorkshopImage`, `WorkshopSession`, `Booking`).
- [x] Mettre en place des Factories et un `DatabaseSeeder` complet pour générer de faux ateliers avec sessions et images de test.

## Étape 3 : Panel Administration (Back-Office) ⏳

_Cette section utilisera React + Shadcn/ui._

- [ ] Configurer un layout d'administration sécurisé (accessible uniquement aux administrateurs).
- [ ] Créer le CRUD des Ateliers (Liste, Ajout, Modification, Suppression).
- [ ] Intégrer le module de gestion de la galerie photos (Upload, suppression et gestion de l'ordre d'affichage `sort_order`).
- [ ] Créer l'interface de gestion des sessions (Ajouter/modifier des créneaux de dates pour un atelier).
- [ ] Créer un tableau de bord récapitulatif des réservations passées.

## Étape 4 : Catalogue Public (Front-Office) ⏳

_Cette section utilisera React + Tailwind CSS classique._

- [ ] Créer la page d'accueil et la liste des ateliers actifs (cartes avec image de couverture, résumé, prix).
- [ ] Créer la page de détail d'un atelier (affichage de la description, de la galerie d'images ordonnée et de la liste des sessions disponibles).

## Étape 5 : Système de Réservation & Tunnel d'Achat ⏳

- [ ] Créer le formulaire de réservation recueillant les coordonnées de l'acheteur (Prénom, Nom, Email, Téléphone, Date de naissance) sans forcer la connexion/inscription.
- [ ] Mettre en place le contrôleur Laravel pour initier une session Stripe Checkout en associant les informations saisies.
- [ ] Rediriger l'utilisateur vers Stripe pour le paiement sécurisé.

## Étape 6 : Webhook Stripe & Finalisation de la Commande ⏳

- [ ] Configurer et sécuriser la route du Webhook Stripe dans Laravel.
- [ ] Traiter l'événement `checkout.session.completed` : créer ou retrouver l'utilisateur (compte invité avec mot de passe null) et enregistrer le `Booking` au statut `'paid'`.
- [ ] Envoyer un e-mail de confirmation avec un lien sécurisé d'accès à la réservation.
- [ ] Créer la page de succès du paiement avec un bouton pour "Activer mon compte" en définissant simplement un mot de passe.
- [ ] Créer l'espace "Mes Réservations" accessible une fois le compte activé et connecté.
