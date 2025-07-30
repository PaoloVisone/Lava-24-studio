import '../css/ProjectCarousel.css';
import useEmblaCarousel from 'embla-carousel-react';
import { HashLink as Link } from 'react-router-hash-link'

export default function ProjectCarousel() {
    const [emblaRef] = useEmblaCarousel({
        loop: true,
        align: 'start',
        speed: 5,
        dragFree: true
    });

    const buttons = [
        { text: '· Chi Siamo', link: '#team' },
        { text: '· Cosa Facciamo', link: '#faq' },
        { text: '· Portfolio', link: '#progetti' },
        { text: '· Prenota una Call', link: '#contatti' }
    ];

    // Duplica i bottoni per creare l'effetto infinito
    const duplicatedButtons = [...buttons, ...buttons];

    return (
        <div className="embla-wrapper">
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {duplicatedButtons.map((button, i) => (
                        <div className="embla__slide" key={i}>
                            <Link to={button.link} className="carousel-button">
                                {button.text}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}