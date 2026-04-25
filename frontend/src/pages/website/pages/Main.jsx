import React from "react";
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
import TestimonialsSwiper from "../../../components/TestimonialsSwiper";
import Footer from "../../../components/Footer";
import HeroImgSection from "../../../components/HeroImgSection";
import useGetPublishedCourse from "../../../customHooks/useGetPublishedCourse";
import { useSelector } from "react-redux";
import ChatBot from "../../../components/chatBot";
import PopularCourses from "../../../components/PopularCourses";

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

  useGetPublishedCourse();
  const courses = useSelector((state) =>
    Object.values(state.course.courseData)
  );

  return (
    <>
      <div className="full-width">
        <Header />
      </div>

      <main>
        <HeroImgSection />

        {/* Features */}
        <section className="features why-choose">
          <h2>Why Choose CraftLink<span>?</span></h2>
          <p>A platform built to simplify learning, teaching, and getting work done.</p>

          {isMobile ? (
            <Swiper slidesPerView="auto" spaceBetween={16}>
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

        {/* Top Categories */}
        <section className="container-wrapper section-layout TopCategories">
          <h2>Top Categories</h2>

          {isMobile ? (
            <Swiper slidesPerView="auto" spaceBetween={16}>
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

        {/* Popular Courses Component */}
        <PopularCourses courses={courses} />

        <TestimonialsSwiper />
        <ChatBot />
        <Footer />
      </main>
    </>
  );
};

export default Main;