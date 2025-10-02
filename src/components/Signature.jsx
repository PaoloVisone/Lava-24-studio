import { motion } from 'framer-motion';
import '../css/Signature.css';
import ProjectCarousel from './ProjectCarousel';

export default function Singature() {
    return (
        <section className="signature">

            <div className="signature-block">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2 }}
                    className="signature-title"
                >
                    Dai forma alla <br />
                    tua identità. Racconta <br />
                    la tua Storia. <br />
                    Conquista il tuo <br />
                    pubblico.
                </motion.h1>

                <motion.div
                    className="signature-label"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 2 }}
                >

                    <p>
                        <span>BY.LAVA24™<br />
                            STUDIO</span> <br />
                        /FROM <br />
                        NAPLES
                    </p>
                </motion.div>
            </div>
            {/* Separatore */}
            <div className="signature-separator">
            </div>
            <ProjectCarousel />
        </section>
    );
}
