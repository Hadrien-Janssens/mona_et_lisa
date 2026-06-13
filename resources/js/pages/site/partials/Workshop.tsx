import React from 'react';
import WorkshopCard from '../components/WorkshopCard';

const Workshop = ({ workshops = [] }: { workshops?: any[] }) => {
    return (
        <div className="h-screen bg-amber-50">
            Atelier
            <div className="grid grid-cols-3 gap-10">
                {workshops.map((workshop) => (
                    <WorkshopCard key={workshop.id} workshop={workshop} />
                ))}
            </div>
        </div>
    );
};

export default Workshop;
