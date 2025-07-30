import '../css/Hero.css';
import { motion } from 'framer-motion';
import ProjectCarousel from './ProjectCarousel';

export default function Hero() {
    const heroText = "WE THINK.\nWE DO.\nYOU WIN.";
    const lines = heroText.split('\n');

    return (
        <section id='home' className="hero">
            <video autoPlay loop muted playsInline>
                <source src="/video/lava-24-studio-video.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 3 }}
                    className="hero-title-container"
                >
                    {lines.map((line, lineIndex) => (
                        <div key={lineIndex} className="hero-title-line">
                            {line.split('').map((char, charIndex) => (
                                <motion.span
                                    key={`${lineIndex}-${charIndex}`}
                                    className="hero-title-char"
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
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 3.5 }}
                    className="hero-subtitle"
                >
                    Non tutti i brand meritano attenzione. <br />
                    Solo quelli che hanno qualcosa da dire. <br />
                    Noi li aiutiamo a farlo. <br />
                    Visivamente, Strategicamente, Potentemente.
                </motion.p>
            </div>
            {/* Separatore */}
            <div className="hero-separator">
                <ProjectCarousel />
            </div>
        </section>
    );
}