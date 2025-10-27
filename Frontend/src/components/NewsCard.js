import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import "./NewsCard.css";

export default function NewsSection() {
  const bgRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper carousel
    const swiper = new Swiper(".news-slider", {
      effect: "coverflow",
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 30,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 3,
        slideShadows: false,
      },
      navigation: {
        nextEl: ".news-slider-next",
        prevEl: ".news-slider-prev",
      },
      pagination: {
        el: ".news-slider__pagination",
        clickable: true,
      },
    });
  }, []);

  const handleHover = (e) => {
    const bg = bgRef.current;
    if (!bg) return;

    const rect = e.currentTarget.getBoundingClientRect();
    bg.style.width = `${rect.width}px`;
    bg.style.height = `${rect.height}px`;
    bg.style.transform = `translate(${rect.left}px, ${rect.top + window.scrollY}px)`;
    bg.classList.add("active");
  };

  const handleLeave = () => {
    if (bgRef.current) bgRef.current.classList.remove("active");
  };

  const news = [
    {
      date: { day: "24", month: "May" },
      title: "AccelNet AI System Released",
      text: "Our new neural accelerator boosts compute performance for AI workloads.",
      img: "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1537132205/news-slider/item-2.webp",
    },
    {
      date: { day: "25", month: "May" },
      title: "New Partnership",
      text: "AccelNet partners with universities to advance AI education and research.",
      img: "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1537132205/news-slider/item-3.webp",
    },
    {
      date: { day: "26", month: "May" },
      title: "Data Center Upgrade",
      text: "Next-gen hardware rollout increases efficiency by 35% in our data centers.",
      img: "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1537132205/news-slider/item-4.webp",
    },
  ];

  return (
    <section className="news-section">
      <h2 className="news-heading">Latest News</h2>

      {/* Highlight background */}
      <div className="item-bg" ref={bgRef}></div>

      <div className="news-slider">
        <div className="news-slider__wrp swiper-wrapper">
          {news.map((item, i) => (
            <div className="news-slider__item swiper-slide" key={i}>
              <a
                href="#"
                className="news__item"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                <div className="news-date">
                  <span className="news-date__title">{item.date.day}</span>
                  <span className="news-date__txt">{item.date.month}</span>
                </div>
                <div className="news__title">{item.title}</div>
                <p className="news__txt">{item.text}</p>
                <div className="news__img">
                  <img src={item.img} alt={item.title} />
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="news-slider__ctr">
          <button className="news-slider__arrow news-slider-prev">←</button>
          <button className="news-slider__arrow news-slider-next">→</button>
          <div className="news-slider__pagination"></div>
        </div>
      </div>
    </section>
  );
}
