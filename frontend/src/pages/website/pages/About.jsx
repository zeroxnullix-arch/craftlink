import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CraftLinkCompany from "../../../assets/CraftLinkCompany.png";
import Craftswoman from "../../../assets/img/craftswoman.jpg";
import {HiSparkles} from "@icons"
import OurTeam from "../../../components/ourTeam";
import FeatureCard from "../../../components/FeatureCard";
import { FaUsersViewfinder } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { HiLightningBolt } from "react-icons/hi";
import { SiVisa } from "react-icons/si";
import { Swiper, SwiperSlide } from "swiper/react";
import useIsMobile from "../../../hooks/useIsMobile";
import TestimonialsSwiper from "../../../components/TestimonialsSwiper";
import { useNavigate } from "react-router-dom";
const features = [
    { icon: FaUsersViewfinder, text: "Trusted Instructors" },
    { icon: RiVerifiedBadgeFill, text: "Verified Craftsmen" },
    { icon: HiLightningBolt, text: "Fast Hiring" },
    { icon: SiVisa, text: "Secure Payments" },
];
const Search = () => {
        const isMobile = useIsMobile(1000);
        const navigate = useNavigate();
    return (
        <div className="about-us">
            <div className="full-width">
                <Header />
            </div>

            <section className="about-hero">
                <img src={CraftLinkCompany} alt="" />
                <h2>About us</h2>
                <div className="wavy"></div>
            </section>

            <section className="about-skills">
                <h3>Connecting Skills</h3>
                <div className="skills-content">
                    <div className="d1">
                        <img src={Craftswoman} alt="" />
                        <div className="blob"></div>
                        <div className="blob-2"></div>
                    </div>

                    <div className="d2">
                        <h4>CraftLink – Connecting Skills with Opportunity</h4>
                        <p className="skills-p">
                            CraftLink is a platform that aims to connect skilled craftspeople
                            with those who need their services quickly and easily.
                        </p>
                        <p className="skills-p">
                            We believe that every skill deserves to reach those who need it,
                            and that technology can make finding the right craftsperson easier
                            than ever.
                        </p>
<button className="fancy" onClick={()=>navigate("/signup")}>
  <span className="top-key"></span>
  <span className="text">Join Now</span>
  <span className="bottom-key-1"></span>
  <span className="bottom-key-2"></span>
</button>
                    </div>
                </div>


            </section>
            <div className="our-purpose">
                <h3>our purpose</h3>
                <div className="purpose-content">
                    <div class="purpose-card">
                        <div className="main-content">
                            <p className="heading">Our Values</p>
                            <span>At CraftLink, we believe that the success of any platform depends not only on technology but also on the values ​​upon which it is built. Therefore, we ensure that every experience on the platform is based on a set of principles that guide our work and define our vision for the future.</span>
                        </div>
                        <HiSparkles className='icon'/>
                    </div>
                    <div class="purpose-card">
                        <div class="main-content">
                            <p class="heading">Our Vision</p>
                            <span>We aspire to make CraftLink the leading platform that connects craft skills with real opportunities in the community, and we seek to build a digital community that brings together talented craftspeople with customers looking for reliable, high-quality services.</span>
                        </div>
                        <HiSparkles className='icon'/>
                    </div>
                    <div className="purpose-card">
                        <div className="main-content">
                            <p className="heading">Our Mission</p>
                            <span>Our mission at CraftLink is to empower craftspeople to showcase their skills and expertise in a professional manner that helps them access new job opportunities and suitable clients, and we strive to provide an easy-to-use digital environment.</span>
                        </div>
                        <HiSparkles className='icon'/>
                    </div>
                </div>
            </div>
<section className="features why-choose">
                    <h2>
                        Why Choose CraftLink<span>?</span>
                    </h2>
                    <p>
                        A platform built to simplify learning, teaching, and getting work
                        done.
                    </p>
                    {isMobile ? (
                        <Swiper
                            slidesPerView="auto"
                            spaceBetween={16}
                            className="features-swiper"
                        >
                            {features.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <FeatureCard {...item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="features-grid">
                            {features.map((item, index) => (
                                <FeatureCard key={index} {...item} />
                            ))}
                        </div>
                    )}
                </section>
                <OurTeam/>
                <TestimonialsSwiper/>
            <Footer />
        </div>
    );
};

export default Search;
