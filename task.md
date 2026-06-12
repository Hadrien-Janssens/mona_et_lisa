# Tâche en cours : Implémentation du Soft Delete sur Workshops et WorkshopSessions

## Micro-étapes
- [x] Mettre à jour `schema.md`
- [x] Créer la migration Laravel pour ajouter le champ `deleted_at` aux tables `workshops` et `workshop_sessions`
- [x] Exécuter la migration (`php artisan migrate`)
- [x] Activer le trait `SoftDeletes` dans le modèle `Workshop.php`
- [x] Activer le trait `SoftDeletes` dans le modèle `WorkshopSession.php`
- [x] Écrire/mettre à jour les tests unitaires et d'intégration pour valider le comportement du Soft Delete
- [x] Formater le code avec Pint (`vendor/bin/pint --dirty --format agent`)
- [x] Lancer tous les tests pour s'assurer que rien n'est cassé
