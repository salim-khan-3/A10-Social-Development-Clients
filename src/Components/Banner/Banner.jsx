import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";

const slides = [
  {
    title: "Join Hands for a Better Community",
    desc: "Participate in cleanup drives, tree plantations, and donation events.",
    img: "https://images.unsplash.com/photo-1758599668178-d9716bbda9d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbW11bml0eSUyQ3ZvbHVudGVlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    btnText: "Explore Events",
    btnLink: "/upcoming",
  },
  {
    title: "Make a Difference in Your Area",
    desc: "Create or join social events near your locality to help society.",
    img: "https://plus.unsplash.com/premium_photo-1681140560925-a50f402b8525?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJlZS1wbGFudGF0aW9uJTJDdm9sdW50ZWVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    btnText: "Create Event",
    btnLink: "/create",
  },
  {
    title: "Be the Change You Want to See",
    desc: "Your small contribution can make a big impact on the community.",
    img: "https://plus.unsplash.com/premium_photo-1683121341746-defea7bfc148?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dm9sdW50ZWVyJTJDZG9uYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
    btnText: "Learn More",
    btnLink: "/about",
  },
];

const Banner = () => {
  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-[60vh] md:h-[80vh] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[60vh] mt-10 md:h-[80vh] flex items-center justify-center bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative text-center text-white max-w-2xl px-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-snug">
                  {slide.title}
                </h1>
                <p className="mb-6 text-base md:text-lg lg:text-xl font-light">
                  {slide.desc}
                </p>
                <a
                  href={slide.btnLink}
                  className="bg-white text-green-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
                >
                  {slide.btnText}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
