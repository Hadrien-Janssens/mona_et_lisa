import { Link } from '@inertiajs/react';

const Nav = () => {
    return (
        <nav className="flex justify-between p-10 font-titre-semibold">
            <img src="/logo.png" width={50} alt="Logo Mona et Lisa" />
            <div className="flex gap-10">
                <Link href={''}>Accueil</Link>
                <Link href={''}>A Propos</Link>
                <Link href={''}>Atelier</Link>
                <Link href={''}>Galerie</Link>
                <Link href={''}>Contact</Link>
                <Link href={''}>Réserver !</Link>
            </div>
        </nav>
    );
};

export default Nav;
