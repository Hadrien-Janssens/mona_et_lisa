import { Link, usePage } from '@inertiajs/react';
import { Paperclip, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Button from './Button';

const NavItem = ({
    href,
    children,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
}) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const checkActive = () => {
            // Par défaut si pas de hash, on considère que c'est #accueil
            const currentHash = window.location.hash || '#accueil';
            const expectedHash = href.replace('/', ''); // Transforme /#about en #about

            // Si on est sur la page d'accueil, on vérifie le hash
            if (window.location.pathname === '/') {
                setIsActive(currentHash === expectedHash);
            } else if (
                href.startsWith('/#') &&
                window.location.pathname.startsWith('/ateliers')
            ) {
                // Pas actif sur la page atelier si c'est un lien vers l'accueil
                setIsActive(false);
            } else {
                setIsActive(window.location.pathname === href);
            }
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
        <a
            href={href}
            onClick={onClick}
            className="group/item relative inline-block"
        >
            {children}
            <img
                src="/img/ligne.svg"
                alt=""
                className={`pointer-events-none absolute -bottom-2 left-0 w-full transition-opacity duration-300 ${
                    isActive
                        ? 'opacity-100'
                        : 'opacity-0 group-hover/item:opacity-100'
                }`}
            />
        </a>
    );
};

const Nav = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    // On récupère les ateliers partagés depuis HandleInertiaRequests
    const { globalWorkshops } = usePage().props as any;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Ne pas cacher si le menu mobile est ouvert
            if (isMobileMenuOpen) {
                return;
            }

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
    }, [isMobileMenuOpen]);

    // Bloquer le scroll du body quand le menu mobile est ouvert
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    // L'ajout de "/" devant le hash permet de rediriger vers l'accueil si on est sur la page atelier
    const navLinks = [
        { href: '/#accueil', label: 'Accueil' },
        { href: '/#about', label: 'A Propos' },
        { href: '/#workshop', label: 'Atelier', hasDropdown: true },
        { href: '/#gallery', label: 'Galerie' },
        { href: '/#horaire', label: 'Horaire' },
        { href: '/#contact', label: 'Contact' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 z-100 flex w-full items-center justify-between border-b border-dashed border-primary bg-background p-2 font-titre-semibold text-lg transition-transform duration-300 md:p-10 md:pb-5 ${
                    isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <Link href="/" className="z-50">
                    <img src="/img/logo.svg" width={50} alt="Logo" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-4 md:flex lg:gap-12">
                    {navLinks.map((link) => (
                        <div
                            key={link.href}
                            className={link.hasDropdown ? 'group relative' : ''}
                        >
                            <NavItem href={link.href}>
                                <div className="flex items-center gap-1">
                                    {link.label}
                                    {link.hasDropdown && (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </div>
                            </NavItem>

                            {/* Menu Déroulant Ateliers (Desktop) */}
                            {link.hasDropdown &&
                                globalWorkshops &&
                                globalWorkshops.length > 0 && (
                                    <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 pt-6 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                                        <div className="relative flex min-w-[200px] flex-col gap-1 rounded-xl border border-primary bg-background p-2 shadow-lg before:absolute before:-top-2 before:left-1/2 before:h-4 before:w-4 before:-translate-x-1/2 before:rotate-45 before:border-t before:border-l before:border-primary before:bg-background">
                                            {globalWorkshops.map(
                                                (workshop: any) => (
                                                    <Link
                                                        key={workshop.id}
                                                        href={`/ateliers/${workshop.slug}`}
                                                        className="relative z-10 rounded-lg px-4 py-2 whitespace-nowrap transition-colors hover:bg-primary/10 hover:text-primary"
                                                    >
                                                        {workshop.title}
                                                    </Link>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>
                    ))}
                    <Link href={'/#horaire'}>
                        <Button size={'sm'}>Réserver !</Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="z-50 p-2 text-primary focus:outline-none md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                <Paperclip
                    className={`absolute right-0 bottom-0 hidden translate-y-1/2 md:block ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-90 flex flex-col items-center justify-center bg-background transition-all duration-300 ${
                    isMobileMenuOpen
                        ? 'visible opacity-100'
                        : 'pointer-events-none invisible opacity-0'
                }`}
            >
                <div className="flex max-h-[80vh] w-full flex-col items-center gap-6 overflow-y-auto px-6 pb-10 font-titre-semibold text-2xl">
                    {navLinks.map((link) => (
                        <div
                            key={link.href}
                            className="flex w-full flex-col items-center"
                        >
                            <NavItem
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </NavItem>

                            {/* Sous-menu mobile pour les ateliers */}
                            {link.hasDropdown &&
                                globalWorkshops &&
                                globalWorkshops.length > 0 && (
                                    <div className="mt-4 mb-2 flex w-full flex-col items-center border-l-2 border-primary/20 pl-4">
                                        {globalWorkshops.map(
                                            (workshop: any) => (
                                                <Link
                                                    key={workshop.id}
                                                    href={`/ateliers/${workshop.slug}`}
                                                    className="w-full text-center text-lg opacity-70 transition-opacity hover:opacity-100"
                                                    onClick={() =>
                                                        setIsMobileMenuOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    {workshop.title}
                                                </Link>
                                            ),
                                        )}
                                    </div>
                                )}
                        </div>
                    ))}
                    <Link
                        href={'/#horaire'}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-8"
                    >
                        <Button size={'lg'}>Réserver !</Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Nav;
