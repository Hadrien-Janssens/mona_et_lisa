import { Link } from '@inertiajs/react';
import { Paperclip } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Button from './Button';

const NavItem = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const checkActive = () => {
            // Par défaut si pas de hash, on considère que c'est #accueil
            const currentHash = window.location.hash || '#accueil';
            setIsActive(currentHash === href);
        };

        checkActive();

        window.addEventListener('hashchange', checkActive);
        window.addEventListener('popstate', checkActive);

        return () => {
            window.removeEventListener('hashchange', checkActive);
            window.removeEventListener('popstate', checkActive);
        };
    }, [href]);

    return (
        <a href={href} className="group relative inline-block">
            {children}
            <img
                src="/img/ligne.svg"
                alt=""
                className={`pointer-events-none absolute -bottom-2 left-0 w-full transition-opacity duration-300 ${
                    isActive
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100'
                }`}
            />
        </a>
    );
};

const Nav = () => {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Si on défile vers le bas et qu'on a dépassé 100px, on cache
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                // Si on défile vers le haut (ou tout en haut), on affiche
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className={`fixed top-0 z-90 flex w-full items-center justify-between border-b border-dashed border-primary bg-background p-10 pb-5 font-titre-semibold text-lg transition-transform duration-300 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            {' '}
            <img src="/img/logo.svg" width={50} alt="ligne" />
            <div className="flex items-center gap-12">
                <NavItem href={'#accueil'}>Accueil</NavItem>
                <NavItem href={'#about'}>A Propos</NavItem>
                <NavItem href={'#workshop'}>Atelier</NavItem>
                <NavItem href={'#gallery'}>Galerie</NavItem>
                <NavItem href={'#horaire'}>Horaire</NavItem>
                <NavItem href={'#contact'}>Contact</NavItem>
                <Link href={''}>
                    <Button size={'sm'}>Réserver !</Button>
                </Link>
            </div>
            <Paperclip
                className={`absolute right-0 bottom-0 translate-y-1/2 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            />
        </nav>
    );
};

export default Nav;
