import { useLayoutEffect, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ children }) {
    const { pathname } = useLocation();
    const containerRef = useRef(null);

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    useLayoutEffect(() => {
        const scroller = containerRef.current ?? window;
        scroller.scrollTo(0, 0);
    }, [pathname]);

    // se scrolli un DIV, avvolgi qui dentro il tuo content container:
    return (
        <div ref={containerRef} style={{ overflow: 'auto', height: '100vh' }}>
            {children}
        </div>
    );
}