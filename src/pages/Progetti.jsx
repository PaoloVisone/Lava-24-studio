import { useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { HashLink as Link } from 'react-router-hash-link'
import { gsap } from 'gsap';
import TextPressure from '../components/TextPressure';
import '../css/Progetti.css';

// Responsive media hook
const useMedia = (queries, values, defaultValue) => {
    const getValue = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
    const [value, setValue] = useState(getValue);

    useEffect(() => {
        const handler = () => setValue(getValue);
        queries.forEach(q => matchMedia(q).addEventListener('change', handler));
        return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
    }, []);

    return value;
};

// Measure container size
const useMeasure = () => {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;
        const observer = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            setSize({ width, height });
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, size];
};

// Project items
const items = [
    { id: 1, title: 'Cartolibreria Via Roma', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/d50ae9105306003.Y3JvcCw1MTE0LDQwMDAsMTQwNSww.jpg', desc: 'Proposta Logo', height: 300 },
    { id: 2, title: 'Isola Verde', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/8f15b3105110409.Y3JvcCwzMjAxLDI1MDQsNjMzLDA.jpg', desc: 'Brand Identity', height: 220 },
    { id: 3, title: 'GLRGROUP', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/056571104262951.Y3JvcCw0MDg3LDMxOTYsOTYxLDE1MQ.jpg', desc: 'Brand Identity', height: 260 },
    { id: 4, title: 'Élever', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/d918d799532405.Y3JvcCw1NjcyLDQ0MzYsMCww.jpg', desc: 'Cocktail Bar & Food', height: 240 },
    { id: 5, title: 'Barberia Grazioso', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/ac919597835521.Y3JvcCw0NTExLDM1MjgsNTkxLDg5.png', desc: 'Brand Identity', height: 200 },
    { id: 6, title: 'Michele Abate Salesman', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/c78d2997696665.Y3JvcCw0MDg3LDMxOTYsNzg5LDA.png', desc: 'Personal Identity', height: 280 },
    { id: 7, title: 'Cantine Irpinia', img: 'https://mir-s3-cdn-cf.behance.net/projects/404/8fadf459630589.Y3JvcCw2ODEsNTMzLDE1MSw1Mw.jpg', desc: 'Brand Identity, Winery', height: 320 }
];

export default function Progetti() {
    const [modal, setModal] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const [containerRef, { width }] = useMeasure();

    const cols = useMedia(
        ['(min-width:1800px)', '(min-width:1200px)', '(min-width:800px)', '(min-width:500px)'],
        [5, 4, 3, 2],
        1
    );

    // Preload images
    useEffect(() => {
        Promise.all(items.map(i => new Image().src = i.img))
            .finally(() => setLoaded(true));
    }, []);

    // Entrance animations
    useEffect(() => {
        gsap.from(titleRef.current, { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });
        gsap.from(textRef.current, { y: 20, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' });
    }, []);

    // Layout and grid calculations
    const grid = useMemo(() => {
        if (!width) return { items: [], height: 0 };

        const heights = Array(cols).fill(0);
        const colWidth = width / cols;

        const arranged = items.map(item => {
            const colIndex = heights.indexOf(Math.min(...heights));
            const x = colIndex * colWidth;
            const y = heights[colIndex];
            heights[colIndex] += item.height + 40;
            return { ...item, x, y, w: colWidth - 40, h: item.height };
        });

        return { items: arranged, height: Math.max(...heights) };
    }, [cols, width]);

    // Grid animations
    const isFirstMount = useRef(false);
    useLayoutEffect(() => {
        if (!loaded || !grid.items.length) return;
        containerRef.current.style.height = `${grid.height + 40}px`;

        grid.items.forEach((itm, idx) => {
            const selector = `[data-key=\"${itm.id}\"]`;
            const animProps = { x: itm.x + 20, y: itm.y + 20, width: itm.w, height: itm.h };

            if (!isFirstMount.current) {
                gsap.fromTo(selector,
                    { opacity: 0, y: window.innerHeight + 200, filter: 'blur(10px)' },
                    { ...animProps, opacity: 1, filter: 'blur(0)', duration: 0.8, delay: idx * 0.1, ease: 'power3.out' }
                );
            } else {
                gsap.to(selector, { ...animProps, duration: 0.6, ease: 'power3.out' });
            }
        });

        isFirstMount.current = true;
    }, [grid, loaded]);

    // Parallax hover
    const handleMove = e => {
        const img = e.currentTarget.querySelector('.item-img');
        const rect = img.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
        gsap.to(img, { backgroundPosition: `${50 + x}% ${50 + y}%`, duration: 0.3, ease: 'power2.out' });
    };
    const handleLeave = e => {
        gsap.to(e.currentTarget.querySelector('.item-img'), { backgroundPosition: '50% 50%', duration: 0.5, ease: 'power2.out' });
    };

    return (
        <div className="page-wrapper progetti-page">
            <div ref={titleRef} className="title-container">
                <TextPressure text="I NOSTRI PROGETTI" flex alpha={false} stroke={false} width weight italic textColor="#fff" strokeColor="#f00" minFontSize={36} />
            </div>

            <div ref={textRef} className="paragraph-container">
                <p className="main-paragraph">
                    <strong>Questo è il nostro modo di pensare.</strong><br />Quando diventa visibile.
                </p>
            </div>

            <div ref={containerRef} className="progetti-container">
                {grid.items.map(item => (
                    <div key={item.id} data-key={item.id} className="project-item"
                        onClick={() => setModal(item)}
                        onMouseMove={handleMove}
                        onMouseLeave={handleLeave}
                        style={{ position: 'absolute', transform: `translate(${item.x + 20}px,${item.y + 20}px)`, width: item.w, height: item.h }}>
                        <div className="item-img" style={{ backgroundImage: `url(${item.img})`, backgroundPosition: '50% 50%' }} />
                        <div className="overlay-card"><h3>{item.title}</h3></div>
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


            <div className="cta-section">
                <div className="cta-text">
                    <p>
                        Ogni brand ha una storia.<br />
                        Pochi sanno davvero come raccontarla.<br />
                        Noi lo facciamo con immagini, ritmo e precisione.
                    </p>
                </div>
                <Link
                    className="booking-button"
                    smooth
                    to="/#contatti"
                >
                    Prenota una Consulenza
                </Link>
            </div>

        </div>
    );
}
