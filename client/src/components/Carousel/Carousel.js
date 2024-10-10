import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css';

const Carousel = () => {
    const slides = [
        '/assets/iphone-14.jpg',
        '/assets/iphone-13.jpeg',
        '/assets/iphone-12.jpeg',
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dotsClass: "slick-dots",
        centerMode: true,
        centerPadding: "0px",
    };

    return (
        <div>
            <div className="carousel-container">
                <Slider {...settings} className='slider'>
                    {slides.map((slide, index) => (
                        <div key={index} className="image-div">
                            <img src={slide} alt={`Slide ${index}`} className="image-style" />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
        
    );
};

export default Carousel;
