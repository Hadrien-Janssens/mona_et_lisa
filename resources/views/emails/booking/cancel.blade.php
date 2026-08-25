<x-mail::message>
    # annulation OK

    Bonjour {{ $booking->user->first_name }},

    Votre annulation pour l'atelier **{{ $booking->session->workshop->title }}** a bien été confirmée.

    **Détails de votre session :**
    - Date et heure : {{ $booking->session->start_at->translatedFormat('l d F Y à H\hi') }}
    - Nombre de places : {{ $booking->seats }}



    Merci de votre confiance,<br>
    {{ config('app.name') }}
</x-mail::message>
