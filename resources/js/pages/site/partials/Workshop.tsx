import WorkshopCard from '../components/WorkshopCard';

export default function Workshop({ workshops, content }: { workshops: any[], content: any }) {
    return (
        <div>
            <h2>{content?.title || 'Workshop Title'}</h2>
            
            <div style={{ display: 'flex', gap: '10px' }}>
                {workshops.map((workshop) => (
                    <WorkshopCard key={workshop.id} workshop={workshop} />
                ))}
            </div>

            {content?.button_label && <button>{content.button_label}</button>}
        </div>
    );
}
