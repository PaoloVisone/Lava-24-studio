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
                            <a href="https://www.tiktok.com/@lava24studio?_t=ZN-8ySRwh6FVP4&_r=1" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-tiktok"></i>
                            </a>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}