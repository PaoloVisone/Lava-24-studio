import '../css/Accordion.css';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Accordion({ data }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id='faq' className="accordion">
            {data.map((item, index) => (
                <motion.div
                    key={index}
                    className={`accordion-item ${openIndex === index ? 'open' : ''}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
                >
                    <button className="accordion-header" onClick={() => toggle(index)}>
                        <div className="header-left">
                            <span className="number">{String(index + 1).padStart(2, '0')}</span>
                            <span className="title">{item.title}</span>
                        </div>
                        <span className="symbol">{openIndex === index ? '–' : '+'}</span>
                    </button>

                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                className="accordion-content"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                <div className="accordion-inner">{item.content}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}

        </div>
    );
}