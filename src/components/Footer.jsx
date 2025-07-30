import { motion } from 'framer-motion';
import '../css/Footer.css';

export default function Footer() {
    const footerText = "WE THINK.\nWE DO.\nYOU WIN.";
    const lines = footerText.split('\n');

    return (
        <footer className="footer-section">
            <div className="footer-container">
                {/* Logo e slogan */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="footer-brand"
                >
                    <div className='footer-logo'>
                        <img src="/Logo-LAVA24_DeF2024_PITTOGRAMMA-PNG-White.png" alt="Logo" />
                    </div>
                    <div className="footer-slogan-container">
                        {lines.map((line, lineIndex) => (
                            <div key={lineIndex} className="footer-slogan-line">
                                {line.split('').map((char, charIndex) => (
                                    <motion.span
                                        key={`${lineIndex}-${charIndex}`}
                                        className="footer-slogan-char"
                                        whileHover={{
                                            fontWeight: 900,
                                            scale: 1.1,
                                            color: '#cd3407'
                                        }}
                                        transition={{
                                            duration: 0.15,
                                            ease: "easeOut"
                                        }}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Link rapidi */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="footer-links"
                >
                    <ul>
                        <li><a href="#team">CHI SIAMO</a></li>
                        <li><a href="#faq">COSA FACCIAMO</a></li>
                        <li><a href="#progetti">PORTFOLIO</a></li>
                        <li><a href="#contatti">PRENOTA UNA CALL</a></li>
                    </ul>
                </motion.div> */}

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="footer-bottom"
                >
                    <img src="/lava24studio-cropped.png" alt="" />
                    <p>© {new Date().getFullYear()} BY.LAVA24™ STUDIO. Tutti i diritti riservati.</p>
                    <div className="legal-links">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Termini di Servizio</a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}