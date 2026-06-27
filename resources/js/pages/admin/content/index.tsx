import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, LayoutTemplate, MapPin, Palette, Settings } from 'lucide-react';
import HeaderSettings from './partials/HeaderSettings';
import AboutSettings from './partials/AboutSettings';
import WorkshopSettings from './partials/WorkshopSettings';
import ScheduleSettings from './partials/ScheduleSettings';
import ContactSettings from './partials/ContactSettings';
import FooterSettings from './partials/FooterSettings';
import { index as adminContentIndex } from '@/routes/admin/content';

interface IndexProps {
    contents: {
        header: any;
        about: any;
        workshop: any;
        schedule: any;
        contact: any;
        footer: any;
    };
}

const TABS = [
    { id: 'header', label: 'En-tête', icon: LayoutTemplate },
    { id: 'about', label: 'À propos', icon: Image },
    { id: 'workshop', label: 'Atelier', icon: Palette },
    { id: 'schedule', label: 'Horaires & Accès', icon: MapPin },
    { id: 'contact', label: 'Contact', icon: Settings },
    { id: 'footer', label: 'Pied de page', icon: Settings },
];

export default function Index({ contents }: IndexProps) {
    const [activeTab, setActiveTab] = useState('header');

    return (
        <>
            <Head title="Gestion du Contenu" />
            <div className="flex flex-col gap-6 p-6 h-full flex-1">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Gestion du Contenu</h1>
                    <p className="text-sm text-muted-foreground">
                        Modifiez les textes et images des différentes sections de votre site.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Vertical Tabs Navigation */}
                    <Card className="w-full md:w-64 shrink-0 h-fit border-sidebar-border/70 shadow-sm p-2 flex flex-col gap-1">
                        {TABS.map((tab) => (
                            <Button
                                key={tab.id}
                                variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                                className={`w-full justify-start ${activeTab === tab.id ? 'bg-secondary font-medium' : 'font-normal'}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <tab.icon className="mr-2 h-4 w-4" />
                                {tab.label}
                            </Button>
                        ))}
                    </Card>

                    {/* Tab Content Area */}
                    <div className="flex-1">
                        {activeTab === 'header' && <HeaderSettings initialData={contents.header} />}
                        {activeTab === 'about' && <AboutSettings initialData={contents.about} />}
                        {activeTab === 'workshop' && <WorkshopSettings initialData={contents.workshop} />}
                        {activeTab === 'schedule' && <ScheduleSettings initialData={contents.schedule} />}
                        {activeTab === 'contact' && <ContactSettings initialData={contents.contact} />}
                        {activeTab === 'footer' && <FooterSettings initialData={contents.footer} />}
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Contenu',
            href: '/admin/content', // Will be replaced by route helper in breadcrumbs if configured
        },
    ],
};
