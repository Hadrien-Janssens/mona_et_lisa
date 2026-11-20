export interface WorkshopImage {
    id: number;
    path: string;
    url: string;
    sort_order: number;
    tags: string[];
}

export interface WorkshopSession {
    id: number;
    start_at: string;
    max_participants: number;
    booked_seats_count: number;
    spots_left: number;
}

export interface Workshop {
    id: number;
    title: string;
    description: string;
    summary: string | null;
    card_thumbnail_path?: string | null;
    card_thumbnail_url?: string | null;
    card_thumbnail_display_path?: string | null;
    price: number;
    duration_minutes: number;
    is_active: boolean;
    images?: WorkshopImage[];
    sessions?: WorkshopSession[];
}
