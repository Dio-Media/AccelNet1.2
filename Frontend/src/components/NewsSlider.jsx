import React, { useState, useEffect, useRef } from 'react';
import Swiper from 'swiper';
import axios from 'axios';

// Import Swiper's CSS bundle and the custom styles for the component
import 'swiper/swiper-bundle.css';
import './NewsSlider.css';

export default function NewsSlider() {
  const [news, setNews] = useState([]);
  const swiperRef = useRef(null);
  const bgRef = useRef(null);

  // 1. Fetch news from your backend API
  useEffect(() => {
    axios.get('/api/news')
      .then(response => {
        // Take the 5 most recent articles
        setNews(response.data.slice(0, 5));
      })
      .catch(error => {
        console.error("Could not fetch news:", error);
      });
  }, []);

  // 2. Initialize the Swiper carousel when news is loaded
  useEffect(() => {
    if (news.length > 0 && swiperRef.current) {
      new Swiper(swiperRef.current, {
        effect: 'coverflow',
        grabCursor: true,
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 3,
          slideShadows: false,
        },
        navigation: {
          nextEl: '.news-slider-next',
          prevEl: '.news-slider-prev',
        },
        pagination: {
          el: '.news-slider__pagination',
          clickable: true,
        },
      });
    }
  }, [news]); // Re-initialize if news data changes

  // 3. Handlers for the background hover effect
  const handleHover = (e) => {
    const bg = bgRef.current;
    if (!bg) return;
    const rect = e.currentTarget.getBoundingClientRect();
    bg.style.width = `${rect.width}px`;
    bg.style.height = `${rect.height}px`;
    bg.style.transform = `translate(${rect.left}px, ${rect.top + window.scrollY}px)`;
    bg.classList.add('active');
  };

  const handleLeave = () => {
    if (bgRef.current) {
      bgRef.current.classList.remove('active');
    }
  };

  return (
    <div className="news-slider-wrapper">
      <div className="item-bg" ref={bgRef}></div>

      <div className="news-slider" ref={swiperRef}>
        <div className="news-slider__wrp swiper-wrapper">
          {news.map((item) => (
            <div className="news-slider__item swiper-slide" key={item.id}>
              <a
                href="#"
                className="news__item"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                <div className="news-date">
                  <span className="news-date__title">{new Date(item.date).getDate()}</span>
                  <span className="news-date__txt">{new Date(item.date).toLocaleString('default', { month: 'short' })}</span>
                </div>
                <div className="news__title">{item.title}</div>
                <p className="news__txt">{item.content.replace(/<[^>]+>/g, '')}</p>
                <div className="news__img">
                  <img src={item.image} alt={item.title} />
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="news-slider__ctr">
          <div className="news-slider__arrows">
            <button className="news-slider__arrow news-slider-prev">←</button>
            <button className="news-slider__arrow news-slider-next">→</button>
          </div>
          <div className="news-slider__pagination"></div>
        </div>
      </div>
    </div>
  );
}