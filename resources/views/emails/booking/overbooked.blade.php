<x-mail::message>
# Information concernant votre réservation

Bonjour {{ $booking->user->first_name }},

Nous vous informons qu'en raison d'une forte affluence, les dernières places pour l'atelier **{{ $booking->session->workshop->title }}** ont été réservées par un autre participant juste avant la validation de votre paiement.

Votre réservation n'a donc pas pu être confirmée.

**Un remboursement complet a été automatiquement déclenché** et apparaîtra sur votre compte bancaire sous quelques jours.

Nous sommes sincèrement désolés pour ce désagrément et espérons vous accueillir lors d'une prochaine session.

Merci de votre compréhension,<br>
{{ config('app.name') }}
</x-mail::message>
