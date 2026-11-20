import { Head } from '@inertiajs/react';
import { Image, LayoutTemplate, MapPin, Palette, Settings } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { index as adminContentIndex } from '@/routes/admin/content';
import AboutSettings from './partials/AboutSettings';
import ContactSettings from './partials/ContactSettings';
import FooterSettings from './partials/FooterSettings';
import HeaderSettings from './partials/HeaderSettings';
import ScheduleSettings from './partials/ScheduleSettings';
import WorkshopSettings from './partials/WorkshopSettings';

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
            <div className="flex h-[calc(100svh-4rem)] flex-col gap-6 overflow-hidden p-6 md:h-[calc(100svh-5rem)]">
                <div className="shrink-0">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Gestion du Contenu
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Modifiez les textes et images des différentes sections
                        de votre site.
                    </p>
                </div>

                {/* Conteneur parent en ligne : items-stretch étire les deux colonnes à la même hauteur */}
                <div className="flex min-h-0 flex-1 flex-col items-stretch gap-6 overflow-hidden md:flex-row">
                    {/* Vertical Tabs Navigation */}
                    <Card className="flex shrink-0 flex-col gap-1 overflow-y-auto border-sidebar-border/70 p-2 shadow-sm">
                        <div className="flex flex-col gap-1">
                            {TABS.map((tab) => (
                                <Button
                                    key={tab.id}
                                    variant={
                                        activeTab === tab.id
                                            ? 'secondary'
                                            : 'ghost'
                                    }
                                    className={`w-full justify-start ${activeTab === tab.id ? 'bg-secondary font-medium' : 'font-normal'}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <tab.icon className="mr-2 h-4 w-4 shrink-0" />
                                    <span>{tab.label}</span>
                                </Button>
                            ))}
                        </div>
                    </Card>

                    {/* Tab Content Area */}
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto pr-2 [&>*]:flex-1">
                        {activeTab === 'header' && (
                            <HeaderSettings initialData={contents.header} />
                        )}
                        {activeTab === 'about' && (
                            <AboutSettings initialData={contents.about} />
                        )}
                        {activeTab === 'workshop' && (
                            <WorkshopSettings initialData={contents.workshop} />
                        )}
                        {activeTab === 'schedule' && (
                            <ScheduleSettings initialData={contents.schedule} />
                        )}
                        {activeTab === 'contact' && (
                            <ContactSettings initialData={contents.contact} />
                        )}
                        {activeTab === 'footer' && (
                            <FooterSettings initialData={contents.footer} />
                        )}
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
            href: adminContentIndex().url,
        },
    ],
};
