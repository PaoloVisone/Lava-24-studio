import '../css/ProjectCarousel.css';
import useEmblaCarousel from 'embla-carousel-react';

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
                            <a href={button.link} className="carousel-button">
                                {button.text}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}