import { motion } from 'framer-motion';
// import Card from './Card';
import '../css/Team.css';
import ProfileCard from '../components/ProfileCard'

// const teamData = [
//     {
//         name: "Salvatore E. Giaquinto",
//         role: "Co Founder / Filmmaker",
//         img: "/mixdaily.jpeg"
//     }
// ];

export default function Team() {
    return (
        <section id="team" className="team-section">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="section-title"
            >
                TEAM <span>STUDIO™</span>
            </motion.h2>
            <div className="team-members">
                {/* {teamData.map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: index * 0.15,
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1]
                            }
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                        whileHover={{ y: -10 }}
                    > */}
                <ProfileCard
                    name="VINCENZO LA PIETRA"
                    title="CO-FOUNDER"
                    handle="Vincenzolp"
                    status=""
                    contactText="Contact Me"
                    avatarUrl="../edfa4075-2208-4877-ad2f-c5b78b8bb8e0.jpg"
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => window.open("https://www.instagram.com/imnotzeno/?hl=it", "_blank")}
                />
                <ProfileCard
                    name="SALVATORE GIAQUINTO"
                    title="CO-FOUNDER"
                    handle="lvatoresa.film"
                    status=""
                    contactText="Contact Me"
                    avatarUrl="../489772315_1401517491285829_145773664167914asf23451248_n.jpg"
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => window.open("https://www.instagram.com/lvatoresa.film/", "_blank")}
                />
                {/* </motion.div> */}
                {/* ))} */}
            </div>
        </section>
    );
}