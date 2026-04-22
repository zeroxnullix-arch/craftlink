import React, { useState } from "react";
import Header from "../../../components/Header";
import FeatureCard from "../../../components/FeatureCard";
import { FaUsersViewfinder } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { HiLightningBolt } from "react-icons/hi";
import { SiVisa } from "react-icons/si";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Carpentry from "../../../assets/img/cat1.jpg";
import Electronics from "../../../assets/img/cat2.jpg";
import Blacksmithing from "../../../assets/img/cat3.jpg";
import Mechanics from "../../../assets/img/cat4.jpg";
import useIsMobile from "../../../hooks/useIsMobile";
import TopCategoriesCard from "../../../components/TopCategoriesCard";
import CourseCard from "../../../components/CourseCard";
import TestimonialsSwiper from "../../../components/TestimonialsSwiper";
import Footer from "../../../components/Footer";
import HeroImgSection from "../../../components/HeroImgSection";
import useGetPublishedCourse from "../../../customHooks/useGetPublishedCourse";
import { useSelector } from "react-redux";
import ChatBot from "../../../components/chatBot";
const features = [
    { icon: FaUsersViewfinder, text: "Trusted Instructors" },
    { icon: RiVerifiedBadgeFill, text: "Verified Craftsmen" },
    { icon: HiLightningBolt, text: "Fast Hiring" },
    { icon: SiVisa, text: "Secure Payments" },
];

const TopCategories = [
    { img: Carpentry, text: "Carpentry" },
    { img: Electronics, text: "Electronics" },
    { img: Blacksmithing, text: "Blacksmithing" },
    { img: Mechanics, text: "Mechanics" },
];

const Main = () => {
    const isMobile = useIsMobile(1000);
    const [visibleCount, setVisibleCount] = useState(12);

    useGetPublishedCourse();
    const courses = useSelector((state) =>
        Object.values(state.course.courseData)
    );
    const getTotalDuration = (lectures = []) => {
        const totalSeconds = lectures.reduce((acc, lec) => {
            return acc + (lec.duration || 0);
        }, 0);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        let result = "";

        if (hours > 0) result += `${hours}h `;
        if (minutes > 0) result += `${minutes}m `;
        if (seconds > 0) result += `${seconds}s`;

        return result.trim();
    };
    return (
        <>
            <div className="full-width">
                <Header />
            </div>
            <main>
                <HeroImgSection />
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
                <section className="container-wrapper section-layout TopCategories">
                    <h2>Top Categories</h2>
                    {isMobile ? (
                        <Swiper
                            slidesPerView="auto"
                            spaceBetween={16}
                            className="TopCategories-swiper"
                        >
                            {TopCategories.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <TopCategoriesCard {...item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="TopCategories-grid">
                            {TopCategories.map((item, index) => (
                                <TopCategoriesCard key={index} {...item} />
                            ))}
                        </div>
                    )}
                </section>
                <section className="container-wrapper section-layout popular-courses">
                    <h2>Popular Courses</h2>
                    <div className="course-grid">
                        {courses?.slice(0, visibleCount).map((course) => (
                            <CourseCard
                                key={course._id}
                                title={course.title}
                                image={course.thumbnail}
                                instructor={course.creator?.name}
                                hours={getTotalDuration(course.lectures)}
                                lectures={course.lectures?.length}
                                level={course.level}
                                price={course.price}
                                tag={course.category}
                                courseId={course._id}
                            />
                        ))}
                    </div>
                    {visibleCount < courses.length && (
                        <button className="see-more-btn">
                            See more
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15px" width="15px" className="icon">
                                <path strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.5" d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"></path>
                            </svg>
                        </button>
                    )}
                </section>
                <TestimonialsSwiper />
                <ChatBot/>
                <Footer />
            </main>
        </>
    );
};

export default Main;
