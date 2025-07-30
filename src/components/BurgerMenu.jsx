import '../css/BurgerMenu.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { label: 'HOME', to: '/' },
        { label: 'PROGETTI', to: '/progetti' },
    ];

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    return (
        <>
            {/* Mobile Burger Menu */}
            <button
                className={`burger-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        className="burger-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: '0%' }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                        <ul className="burger-links">
                            {links.map((link, i) => (
                                <li key={i}>
                                    <NavLink
                                        to={link.to}
                                        onClick={() => setIsOpen(false)}
                                        className="burger-link"
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <div className="burger-social">
                            <a href="https://www.instagram.com/lava24.studio/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://l.instagram.com/?u=https%3A%2F%2Fwww.tiktok.com%2F%40lava24studio%3F_t%3D8rkYxZoaKpC%26_r%3D1&e=AT1xYd3xMcGvdPu6__ixzntMlGUmbLd7ea1k6MEbUEcfk3quvsElIU15NY6BKWU7_a6wfc1j0XtCjilyYJEfU05-XwNomK9O" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-tiktok"></i>
                            </a>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}