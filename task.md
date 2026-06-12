# Tâche en cours : Module de gestion de la galerie photos (Upload, suppression, tri & tags)

## Micro-étapes
- [x] Créer la migration Laravel pour ajouter le champ `tags` à la table `workshop_images`
- [x] Exécuter la migration (`php artisan migrate`)
- [x] Mettre à jour le modèle `WorkshopImage.php` (attributs fillable, cast de `tags` en array)
- [x] Créer le contrôleur `WorkshopImageController.php` (méthodes store, update, destroy)
- [x] Déclarer les routes de gestion d'images dans `routes/web.php` (sécurisées par le middleware `admin`)
- [x] Passer les images associées dans la méthode `edit` de `WorkshopController.php`
- [x] Mettre à jour l'interface de modification de l'atelier (`edit.tsx`) pour inclure le gestionnaire de galerie (upload, drag & drop ou boutons de tri, tags, cover selection, suppression)
- [x] Créer le lien symbolique de stockage (`php artisan storage:link`) si nécessaire
- [x] Écrire les tests unitaires et d'intégration dans `WorkshopImageControllerTest.php`
- [x] Valider avec Pint (`vendor/bin/pint --dirty --format agent`) et s'assurer que tous les tests passent
