import { Link } from '@inertiajs/react';
import Button from './Button';

const Nav = () => {
    return (
        <nav className="flex items-center justify-between border-b border-dashed border-primary p-10 pb-5 font-titre-semibold text-lg">
            <img src="/logo.png" width={50} alt="Logo Mona et Lisa" />
            <div className="flex items-center gap-12">
                <Link href={''}>Accueil</Link>
                <Link href={''}>A Propos</Link>
                <Link href={''}>Atelier</Link>
                <Link href={''}>Galerie</Link>
                <Link href={''}>Contact</Link>
                <Link href={''}>
                    <Button size={'sm'}>Réserver !</Button>
                </Link>
            </div>
        </nav>
    );
};

export default Nav;
