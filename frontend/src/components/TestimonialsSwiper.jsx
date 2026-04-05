import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
const testimonials = [
  {
    name: "Mona Eyad",
    image: "https://i.pinimg.com/1200x/4a/ae/e1/4aaee1ea420824e8e0f5d70a2ae61d42.jpg",
    rating: 5,
    text: "CraftLink helped me learn carpentry professionally, and now I’m getting real clients and working on actual projects.",
  },
  {
    name: "Maram Salah",
    image: "https://i.pinimg.com/736x/40/ce/18/40ce18fd174bd1eab429035a57b3efb0.jpg",
    rating: 4,
    text: "I started as a beginner on CraftLink, learned barbering skills, and now I have clients booking me every week.",
  },
  {
    name: "Nourhan Elsayed",
    image: "https://i.pinimg.com/736x/85/a5/0d/85a50ddf916b9f536f9cb7bc55fbafdf.jpg",
    rating: 5,
    text: "Through CraftLink, I improved my photography skills and started earning from real client projects.",
  },
  {
    name: "Youssef Gamal",
    image: "https://i.pinimg.com/736x/9b/c7/e3/9bc7e30bc74714102e5bcf35ee8f97c5.jpg",
    rating: 5,
    text: "I learned mechanics on CraftLink, and the best part is that I now get clients who actually need my work.",
  },
  {
    name: "Marawan Youssef",
    image: "https://i.pinimg.com/736x/35/f9/3f/35f93f482312011ec563bf6be3822123.jpg",
    rating: 5,
    text: "CraftLink didn’t just teach me tailoring, it connected me with customers who trust my work.",
  },
  {
    name: "Ziad Nour",
    image: "https://i.pinimg.com/736x/88/08/f9/8808f9a777eaa33627c197458017eb2e.jpg",
    rating: 5,
    text: "I went from learning welding on CraftLink to working on real projects with paying clients.",
  },
  {
    name: "Eman Gamal",
    image: "https://i.pinimg.com/736x/e8/07/45/e807457f0cb6262b4e3a4d3f0b332fc0.jpg",
    rating: 5,
    text: "As a makeup artist, CraftLink helped me learn, grow, and build a real client base.",
  },
  {
    name: "Sara Hassan",
    image: "https://i.pinimg.com/736x/0d/45/37/0d4537cd9eca7f177b150b6e231b645e.jpg",
    rating: 5,
    text: "CraftLink gave me the skills and the opportunities, I learned the craft and started working immediately.",
  },
];

const TestimonialsSwiper = () => {
  return (
    <section className="testimonials">
      <h2>
        What Our Users Say<span>?</span>
      </h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1100: { slidesPerView: 3 },
        }}
        className="testimonials-swiper"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <div className="user-info">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <div className="stars">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text">"{item.text}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialsSwiper;
