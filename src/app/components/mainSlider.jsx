import "./mainSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
// import { useMediaQuery } from "react-responsive";

const MainSlider = () => {
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: "(min-width: 1224px)"
  // });
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    appendDots: (dots) => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: (i) => <div>{"0" + (i + 1)}</div>
  };
  return (
    <section className="main-slider">
      {/* {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
      {isTabletOrMobile && <p>You are a tablet or mobile phone</p>} */}
      <Slider {...settings}>
        <div className="first-slide">
          <div className="first-slide-wrapper">
            <div className="offer first-slide__offer">
              <p>Бренд</p>
              <h2>American vintage</h2>
              <a href="/">Смотреть коллекцию</a>
            </div>
          </div>
        </div>
        <div className="second-slide">
          <div className="media-slide-wrapper">
            <div className="container">
              <div className="second-slide__offer offer">
                <p>Бренд</p>
                <h2>George Gina Lucy</h2>
                <a href="/">Смотреть коллекцию</a>
              </div>
            </div>
          </div>
        </div>
        <div className="third-slide">
          <div className="media-slide-wrapper">
            <div className="container">
              <div className="third-slide__offer offer">
                <p>Бренд</p>
                <h2>Deha</h2>
                <a href="/">Смотреть коллекцию</a>
              </div>
            </div>
          </div>
        </div>
        <div className="fouth-slide">
          <div className="media-slide-wrapper">
            <div className="container">
              <div className="fouth-slide__offer offer">
                <p>Бренд</p>
                <h2>Birkenstock</h2>
                <a href="/">Смотреть коллекцию</a>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default MainSlider;
