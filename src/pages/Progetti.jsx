// --- src/pages/Progetti.jsx ---
import { useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import '../css/Progetti.css';
import TextPressure from '../components/TextPressure';
// import RotatingText from '../components/RotatingText';

const useMedia = (queries, values, defaultValue) => {
    const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
    const [value, setValue] = useState(get);
    useEffect(() => {
        const handler = () => setValue(get);
        queries.forEach(q => matchMedia(q).addEventListener('change', handler));
        return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
    }, []);
    return value;
};

const useMeasure = () => {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    useLayoutEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            setSize({ width, height });
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);
    return [ref, size];
};

const preloadImages = urls => Promise.all(
    urls.map(src => new Promise(res => {
        const img = new Image(); img.src = src;
        img.onload = img.onerror = () => res();
    }))
);

export default function Progetti() {
    const [modal, setModal] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const titleContainer = useRef(null);
    const rotatingContainer = useRef(null);

    const items = [
        { id: 1, title: 'Cartolibreria Via Roma', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/d50ae9105306003.Y3JvcCw1MTE0LDQwMDAsMTQwNSww.jpg', desc: "Proposta Logo", h: 300 },
        { id: 2, title: 'Isola Verde', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/8f15b3105110409.Y3JvcCwzMjAxLDI1MDQsNjMzLDA.jpg', desc: 'Brand Identity', h: 220 },
        { id: 3, title: 'GLRGROUP', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/056571104262951.Y3JvcCw0MDg3LDMxOTYsOTYxLDE1MQ.jpg', desc: 'Brand Identity', h: 260 },
        { id: 4, title: 'Élever', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/d918d799532405.Y3JvcCw1NjcyLDQ0MzYsMCww.jpg', desc: 'Cocktail Bar & Food', h: 240 },
        { id: 5, title: 'Barberia Grazioso', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/ac919597835521.Y3JvcCw0NTExLDM1MjgsNTkxLDg5.png', desc: 'Brand Identity', h: 200 },
        { id: 6, title: 'Michele Abate Salesman', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/c78d2997696665.Y3JvcCw0MDg3LDMxOTYsNzg5LDA.png', desc: 'Personal Identity', h: 280 },
        { id: 7, title: 'Cantine Irpinia', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/8fadf459630589.Y3JvcCw2ODEsNTMzLDE1MSw1Mw.jpg', desc: 'Brand Identity, Winery', h: 320 }
    ];

    const cols = useMedia(
        ['(min-width:1800px)', '(min-width:1200px)', '(min-width:800px)', '(min-width:500px)'],
        [5, 4, 3, 2], 1
    );
    const [ref, { width }] = useMeasure();

    // preload immagini
    useEffect(() => { preloadImages(items.map(i => i.img)).then(() => setLoaded(true)); }, []);

    // animazione container testo
    useEffect(() => {
        if (titleContainer.current) {
            gsap.from(titleContainer.current, { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });
        }
        if (rotatingContainer.current) {
            gsap.from(rotatingContainer.current.children, { y: 50, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', delay: 0.5 });
        }
    }, []);

    // calcolo grid CON altezza dinamica del container
    const grid = useMemo(() => {
        if (!width) return { items: [], containerHeight: 0 };
        const heights = new Array(cols).fill(0);
        const colW = width / cols;

        const gridItems = items.map(item => {
            const col = heights.indexOf(Math.min(...heights));
            const x = col * colW;
            const y = heights[col];
            heights[col] += item.h + 40; // 40px di gap
            return { ...item, x, y, w: colW - 40, h: item.h };
        });

        // Calcola l'altezza totale del container
        const maxHeight = Math.max(...heights);

        return { items: gridItems, containerHeight: maxHeight };
    }, [cols, width]);

    // animazioni grid CON aggiornamento altezza container
    const mounted = useRef(false);
    useLayoutEffect(() => {
        if (!loaded || !grid.items.length) return;

        // Aggiorna l'altezza del container
        if (ref.current) {
            ref.current.style.height = `${grid.containerHeight + 40}px`; // +40px per padding bottom
        }

        grid.items.forEach((item, i) => {
            const sel = `[data-key="${item.id}"]`;
            const props = { x: item.x + 20, y: item.y + 20, width: item.w, height: item.h };
            if (!mounted.current) {
                gsap.fromTo(sel,
                    { opacity: 0, y: window.innerHeight + 200, filter: 'blur(10px)' },
                    { ...props, opacity: 1, filter: 'blur(0)', duration: 0.8, delay: i * 0.1, ease: 'power3.out' }
                );
            } else {
                gsap.to(sel, { ...props, duration: 0.6, ease: 'power3.out' });
            }
        });
        mounted.current = true;
    }, [grid, loaded]);

    // parallax hover
    const handleMove = e => {
        const img = e.currentTarget.querySelector('.item-img'); if (!img) return;
        const rect = img.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
        gsap.to(img, { backgroundPosition: `${50 + x}% ${50 + y}%`, duration: 0.3, ease: 'power2.out' });
    };
    const handleLeave = e => {
        const img = e.currentTarget.querySelector('.item-img'); if (!img) return;
        gsap.to(img, { backgroundPosition: '50% 50%', duration: 0.5, ease: 'power2.out' });
    };

    return (
        <div className="page-wrapper">
            <div className="progetti-page">
                <div ref={titleContainer} className="title-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginBottom: '20px' }}>
                    <TextPressure
                        text="I NOSTRI PROGETTI"
                        flex
                        alpha={false}
                        stroke={false}
                        width
                        weight
                        italic
                        textColor="#ffffff"
                        strokeColor="#ff0000"
                        minFontSize={36}
                    />
                </div>
                <div ref={ref} className="progetti-container">
                    {grid.items && grid.items.map(item => (
                        <div key={item.id} data-key={item.id} className="project-item"
                            onClick={() => setModal(item)}
                            onMouseMove={handleMove}
                            onMouseLeave={handleLeave}
                            style={{
                                position: 'absolute',
                                transform: `translate(${item.x + 20}px,${item.y + 20}px)`,
                                width: item.w,
                                height: item.h
                            }}>
                            <div className="item-img" style={{
                                backgroundImage: `url(${item.img})`,
                                backgroundPosition: '50% 50%'
                            }} />
                            <div className="overlay-card">
                                <h3>{item.title}</h3>
                            </div>
                        </div>
                    ))}
                    {modal && (
                        <div className="modal-overlay" onClick={() => setModal(null)}>
                            <div className="modal-content" onClick={e => e.stopPropagation()}>
                                <button className="close-button" onClick={() => setModal(null)}>✕</button>
                                <h2>{modal.title}</h2>
                                <img src={modal.img} alt={modal.title} />
                                <p>{modal.desc}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}