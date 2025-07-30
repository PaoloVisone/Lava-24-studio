import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../css/Projects.css';
import CircularGallery from './CircularGallery'

export default function Projects() {
    return (
        <section id="progetti" className="projects-section">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="section-title"
            >
                I NOSTRI <span>PROGETTI™</span>
            </motion.h2>
            <div style={{ height: '600px', position: 'relative' }}>
                <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
            </div>

            <Link to="/progetti" className="view-all-link">
                GUARDA TUTTI I NOSTRI PROGETTI
            </Link>
        </section>
    );
}