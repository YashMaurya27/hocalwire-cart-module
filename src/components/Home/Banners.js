import React, { useRef } from "react";
import BannerOne from "../../assets/images/BannerOne.jpg";
import BannerFour from "../../assets/images/BannerTwo.jpg";
import BannerThree from "../../assets/images/BannerThree.jpg";
import { Carousel } from "antd";
import "./Banners.css";
import { ArrowLeft, ArrowRight } from "react-feather";

export default function Banners() {
  const covers = [
    {
      img: BannerOne,
      title: "Captain America: Winter Soldier",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
      img: BannerFour,
      title: "Batman Origins",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
      img: BannerThree,
      title: "Oppenheimer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
  ];

  const carousel = useRef();

  const goToNextSlide = () => {
    carousel.current.next();
  };

  const goToPrevSlide = () => {
    carousel.current.prev();
  };

  return (
    <div className="carousel-container">
      <button type="text" className='carousel-nav' id="nav-left" onClick={goToPrevSlide}>
        <ArrowLeft size={20} />
      </button>
      <div className="carousel-div">
        <Carousel autoplay ref={carousel}>
          {covers.map((cover, index) => {
            return (
              <div
                className="carousel-img-container"
                key={`carousel-div-${index}`}
              >
                <img
                  src={cover?.img}
                  alt="Movie poster unavailable"
                  className="carousel-img"
                  key={`carousel-img-${index}`}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <button type="text" className='carousel-nav' id="nav-right" onClick={goToNextSlide}>
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
