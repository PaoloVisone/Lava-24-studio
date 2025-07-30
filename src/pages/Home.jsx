import faq from '../data/faq';
import Hero from '../components/Hero';
import Signature from '../components/Signature';
import Accordion from '../components/Accordion';
import Team from '../components/Team';
import Projects from '../components/Projects';
import ContactForm from '../components/ContactForm';

const Home = () => (
    <>
        <Hero />
        <Signature />
        <Accordion data={faq} />
        <Team />
        <Projects />
        <ContactForm />
    </>
);

export default Home;
