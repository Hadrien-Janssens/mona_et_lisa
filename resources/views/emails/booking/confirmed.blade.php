<x-mail::message>
# Confirmation de votre réservation

Bonjour {{ $booking->user->first_name }},

Votre réservation pour l'atelier **{{ $booking->session->workshop->title }}** a bien été confirmée.

**Détails de votre session :**
- Date et heure : {{ $booking->session->start_at->translatedFormat('l d F Y à H\hi') }}
- Nombre de places : {{ $booking->seats }}

<x-mail::button :url="route('dashboard')">
Accéder à mon espace
</x-mail::button>

Merci de votre confiance,<br>
{{ config('app.name') }}
</x-mail::message>
