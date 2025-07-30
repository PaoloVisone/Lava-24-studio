import '../css/Overlay.css';
import CircularText from './CircularText';

const Overlay = ({ isVisible }) => {
    return (
        <div className={`overlay ${isVisible ? 'overlay--visible' : 'overlay--hidden'}`}>
            <div className="overlay__content">
                <img src={'/Logo-LAVA24_DeF2024_PITTOGRAMMA-PNG-White.png'} alt="Logo Lava 24 Studio" className="overlay__logo" />
                <CircularText
                    text="LAVA*24*STUDIO*"
                    onHover="speedUp"
                    spinDuration={20}
                    className="custom-class"
                />
            </div>
        </div>
    );
};

export default Overlay;
