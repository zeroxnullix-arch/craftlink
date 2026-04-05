import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import AhmedElSayed from "../assets/ourTeam/Ahmed-El-Sayed.png";
import AhmedTarek from "../assets/ourTeam/Ahmed-Tarek.png";
import AlaaSaafan from "../assets/ourTeam/Alaa-Saafan.png";
import AmiraAmir from "../assets/ourTeam/Amira-Amir.png";
import AmrAzazi from "../assets/ourTeam/Amr-Azazi.png";
import AyaAli from "../assets/ourTeam/Aya-Ali.png";
import AyatMahmoud from "../assets/ourTeam/Ayat-Mahmoud.png";

import FouadAlWakil from "../assets/ourTeam/Fouad-Al-Wakil.png";
import GhadaMustafa from "../assets/ourTeam/Ghada-Mustafa.png";
import MahmoudAhmed from "../assets/ourTeam/Mahmoud-Ahmed.png";
import MohamedAhmed from "../assets/ourTeam/Mohamed-Ahmed.png";
import MohamedAlaa from "../assets/ourTeam/Mohamed-Alaa.png";
import MohamedEssam from "../assets/ourTeam/Mohamed-Essam.png";
import MohamedNasser from "../assets/ourTeam/Mohamed-Nasser.png";
import MohamedTalaat from "../assets/ourTeam/Mohamed-Talaat.png";
import NadaIbrahim from "../assets/ourTeam/Nada-Ibrahim.png";
import NourAhmed from "../assets/ourTeam/Nour-Ahmed.png";
import RadwaAlaa from "../assets/ourTeam/Radwa-Alaa.png";
import RodinaSamy from "../assets/ourTeam/Rodina-Samy.png";
import SanaaAmr from "../assets/ourTeam/Sanaa-Amr.png";
import ShahdMahmoud from "../assets/ourTeam/Shahd-Mahmoud.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const team = [
    {
    name: "Rodina Samy",
    role: "UI/UX Designer",
    img: RodinaSamy,
  },
  {
    name: "Amr Azazi",
    role: "UI/UX Designer",
    img: AmrAzazi,
  },
  {
    name: "Amira Amir",
    role: "Front-end Developer",
    img: AmiraAmir,
  },
  {
    name: "Mohamed Ahmed",
    role: "Front-end Developer",
    img: MohamedAhmed,
  },
  {
    name: "Ahmed Tarek",
    role: "Front-end Developer",
    img: AhmedTarek,
  },
  {
    name: "Mohamed Talaat",
    role: "Front-end Developer",
    img: MohamedTalaat,
  },
  {
    name: "Mohamed Nasser",
    role: "Back-end Developer",
    img: MohamedNasser,
  },
  {
    name: "Ayat Mahmoud",
    role: "Back-end Developer",
    img: AyatMahmoud,
  },
  {
    name: "Mohamed Essam",
    role: "Back-end Developer",
    img: MohamedEssam,
  },
  {
    name: "Sanaa Amr",
    role: "Back-end Developer",
    img: SanaaAmr,
  },
  {
    name: "Shahd Mahmoud",
    role: "Back-end Developer",
    img: ShahdMahmoud,
  },
 {
    name: "Radwa Alaa",
    role: "Back-end Developer",
    img: RadwaAlaa,
  },
  {
    name: "Ghada Mustafa",
    role: "Diagrams",
    img: GhadaMustafa,
  },
  {
    name: "Nada Ibrahim",
    role: "Diagrams",
    img: NadaIbrahim,
  },
  {
    name: "Ahmed El-Sayed",
    role: "Diagrams",
    img: AhmedElSayed,
  },
  {
    name: "Mahmoud Ahmed",
    role: "Diagrams",
    img: MahmoudAhmed,
  },
  {
    name: "Fouad Al-Wakil",
    role: "AI Developer",
    img: FouadAlWakil,
  },
  {
    name: "Alaa Saafan",
    role: "AI Developer",
    img: AlaaSaafan,
  },
  {
    name: "Mohamed Alaa",
    role: "AI Developer",
    img: MohamedAlaa,
  },
  {
    name: "Aya Ali",
    role: "AI Developer",
    img: AyaAli,
  },
  {
    name: "Nour Ahmed",
    role: "AI Developer",
    img: NourAhmed,
  },
];

export default function OurTeam() {
  return (
    <section className="team-section">

      <h3>Our Team</h3>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={25}
        slidesPerView={1}
        // autoplay={{ delay: 3000 }}
        loop={true}
breakpoints={{
  0: { slidesPerView: 1 },
  320: { slidesPerView: 1.2 },
  480: { slidesPerView: 1.5 },
  640: { slidesPerView: 2 },
  768: { slidesPerView: 2.5 },
  1024: { slidesPerView: 4 },
}}
      >
        {team.map((member, i) => (
          <SwiperSlide key={i}>
            <div className="team-card">
              <img src={member.img} alt={member.name} />
              <div className="team-info">
                <h3 className="shine">{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}