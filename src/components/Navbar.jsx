import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import '../css/Navbar.css';

const links = [
    { label: 'HOME', to: '/' },
    { label: 'PROGETTI', to: '/progetti' },
];

export default function Navbar() {
    const location = useLocation();

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="navbar-container">
                <NavLink to="/" className="logo">
                    <img src="/lava24studio-cropped.png" alt="Logo LavaStudio" />
                </NavLink>
                <nav className="nav-links">
                    {links.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
                <BurgerMenu />
            </div>
        </motion.nav>
    );
}
