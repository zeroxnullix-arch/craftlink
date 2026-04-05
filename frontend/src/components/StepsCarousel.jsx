import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const stepsData = [
  {
    id: 1,
    title: "Plan Ahead",
    desc: "Write down 3 key tasks you want to accomplish today before checking your phone.",
    img: "https://arman-borkhani.github.io/codepen-cpc-css-shape/assets/plan.jpg",
  },
  {
    id: 2,
    title: "Get Moving",
    desc: "Do a short workout, stretch, or walk to activate your energy and improve your focus.",
    img: "https://arman-borkhani.github.io/codepen-cpc-css-shape/assets/moving.jpg",
  },
  {
    id: 3,
    title: "Find Calm",
    desc: "Spend a few quiet minutes meditating, journaling, or just breathing mindfully before diving into work.",
    img: "https://arman-borkhani.github.io/codepen-cpc-css-shape/assets/calm.jpg",
  },
];

const StepsCarousel = () => {
  return (
    <div className="wrapper">
      <section className="section">
        <h2 className="section-title">
          3 Simple Steps to Start Your Day Productively
        </h2>
        <p className="section-desc">
          Boost your focus and energy from the moment you wake up with these easy daily habits.
        </p>
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          autoHeight={true}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {stepsData.map((step) => (
            <SwiperSlide key={step.id}>
              <article className="card-wrapper">
                <div className="card-circle">{step.id}</div>
                <div className="card">
                  <h3 className="card-title">{step.title}</h3>
                  <p className="card-desc">{step.desc}</p>
                  <figure className="card-figure">
                    <img className="card-img" src={step.img} alt={step.title} />
                  </figure>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default StepsCarousel;
