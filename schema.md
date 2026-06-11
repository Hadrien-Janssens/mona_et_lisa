# Schéma de la Base de Données : mona_et_lisa

## Table: users (Gérée par Laravel Auth)

- `id` (bigIncrements)
- `first_name` (string) - _Prénom du client_
- `last_name` (string) - _Nom de famille du client_
- `email` (string, unique)
- `password` (string, nullable) - _Null pour les comptes invités (guest checkout)_
- `phone` (string, nullable) - _Numéro de téléphone pour les rappels de sessions_
- `birthdate` (date, nullable) - _Date de naissance (obligatoire pour s'assurer de l'âge requis)_
- `is_admin` (boolean, default: false) - _Drapeau administrateur pour l'accès au back-office_
- `email_verified_at` (timestamp, nullable)
- `two_factor_secret` (text, nullable) - _Clé secrète pour la 2FA_
- `two_factor_recovery_codes` (text, nullable) - _Codes de récupération 2FA_
- `two_factor_confirmed_at` (timestamp, nullable) - _Date de confirmation de la 2FA_
- `remember_token` (string, nullable)
- `timestamps`

## Table: workshops (Les Ateliers Créatifs)

Contient les informations générales et descriptives de chaque atelier proposé.

- `id` (bigIncrements)
- `title` (string) - _Nom de l'atelier (ex: "Initiation à la poterie")_
- `slug` (string, unique) - _Pour des URLs propres côté React/Inertia_
- `description` (text) - _Description détaillée du contenu_
- `summary` (string, nullable) - _Accroche courte pour les cartes de la liste principale_
- `price` (integer) - _Prix en centimes (ex: 4500 pour 45.00€) pour éviter les soucis avec Stripe_
- `duration_minutes` (integer) - _Durée de l'atelier (ex: 120 pour 2h)_
- `is_active` (boolean, default: true) - _Pour masquer/afficher l'atelier sur le site_
- `timestamps`

## Table: workshop_images (La Galerie Photos)

Permet d'associer plusieurs photos d'illustration et de gérer leur ordre d'affichage.

- `id` (bigIncrements)
- `workshop_id` (foreignId, cascadeOnDelete) - _Lié à la table workshops_
- `path` (string) - _Le chemin du fichier stocké (ex: "workshops/images/photo1.jpg")_
- `sort_order` (integer, default: 0) - _Pour trier et réordonner les images (0, 1, 2...)_
- `is_cover` (boolean, default: false) - _True si c'est la photo principale de l'aperçu_
- `timestamps`

## Table: workshop_sessions (Les Créneaux / Dates)

Un atelier peut avoir lieu plusieurs fois (ex: le mardi à 14h, le samedi à 10h).

- `id` (bigIncrements)
- `workshop_id` (foreignId, cascadeOnDelete) - _Lié à la table workshops_
- `start_at` (dateTime) - _Date et heure de début_
- `max_participants` (integer, default: 10) - _Nombre maximum de places disponibles_
- `timestamps`

## Table: bookings (Les Réservations / Inscriptions)

Table qui lie un utilisateur à une session d'atelier spécifique après paiement.

- `id` (bigIncrements)
- `user_id` (foreignId, cascadeOnDelete) - _L'utilisateur qui a réservé_
- `workshop_session_id` (foreignId, cascadeOnDelete) - _Le créneau choisi_
- `seats` (integer, default: 1) - _Nombre de places réservées par cette personne_
- `total_price` (integer) - _Montant total payé en centimes_
- `payment_status` (string) - _'pending', 'paid', 'failed' (utile pour le webhook Stripe)_
- `stripe_session_id` (string, nullable) - _Référence de la session Stripe Checkout pour le suivi_
- `timestamps`

---

## Relations Éloquent à implémenter

### Workshop

- `hasMany(WorkshopImage::class)` -> Un atelier a plusieurs images (ordonnées par `sort_order`).
- `hasMany(WorkshopSession::class)` -> Un atelier a plusieurs sessions/dates.
- _Méthode utile :_ `coverImage()` -> Récupère l'image où `is_cover` est true (ou la première de la liste par défaut).

### WorkshopImage

- `belongsTo(Workshop::class)` -> Une image appartient à un seul atelier.

### WorkshopSession

- `belongsTo(Workshop::class)` -> Une session appartient à un seul atelier.
- `hasMany(Booking::class)` -> Une session peut avoir plusieurs réservations.
- _Méthode utile :_ `hasPlacesLeft(int $seats)` -> Vérifie s'il reste assez de places par rapport à `max_participants`.

### User

- `hasMany(Booking::class)` -> Un utilisateur peut faire plusieurs réservations.

### Booking

- `belongsTo(User::class)` -> Une réservation appartient à un utilisateur.
- `belongsTo(WorkshopSession::class)` -> Une réservation concerne une session précise.
