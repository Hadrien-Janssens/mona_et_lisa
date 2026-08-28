<x-mail::message>
# Bonjour {{ $booking->user->name ?? 'Client' }},

Nous sommes au regret de vous informer que la session de l'atelier **"{{ $session->workshop->title ?? 'Atelier' }}"** prévue le **{{ $session->start_at->translatedFormat('l j F Y à H\hi') }}** a dû être annulée.

@if($booking->payment_status === 'refunded')
Votre remboursement a été initié et devrait apparaître sur votre compte d'ici 5 à 10 jours ouvrés.
@else
Votre réservation a bien été annulée.
@endif

Nous nous excusons pour ce désagrément et espérons vous revoir très bientôt pour un autre atelier créatif !

<x-mail::button :url="url('/')">
Voir nos prochains ateliers
</x-mail::button>

L'équipe {{ config('app.name') }}
</x-mail::message>
