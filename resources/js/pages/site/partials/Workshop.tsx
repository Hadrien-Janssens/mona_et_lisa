import React from 'react';
import WorkshopCard from '../components/WorkshopCard';

const Workshop = () => {
    return (
        <div className="h-screen bg-amber-50">
            Atelier
            <div className="grid grid-cols-3 gap-10">
                <WorkshopCard />
                <WorkshopCard />
                <WorkshopCard />
                <WorkshopCard />
                <WorkshopCard />
            </div>
        </div>
    );
};

export default Workshop;
