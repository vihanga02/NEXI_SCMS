// import React from 'react';
// import { Carousel } from 'react-bootstrap';


// const MyCarousel = () => {
//   return (
//     <Carousel>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="https://via.placeholder.com/800x400"
//           alt="First slide"
//         />
//         <Carousel.Caption>
//           <h3>First Slide</h3>
//           <p>Description for the first slide</p>
//         </Carousel.Caption>
//       </Carousel.Item>

//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="https://via.placeholder.com/800x400"
//           alt="Second slide"
//         />
//         <Carousel.Caption>
//           <h3>Second Slide</h3>
//           <p>Description for the second slide</p>
//         </Carousel.Caption>
//       </Carousel.Item>

//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="https://via.placeholder.com/800x400"
//           alt="Third slide"
//         />
//         <Carousel.Caption>
//           <h3>Third Slide</h3>
//           <p>Description for the third slide</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// };

// export default MyCarousel;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    const slides = [
        "https://img.freepik.com/free-photo/interior-design-with-photoframes-couch_23-2149385435.jpg",
        "https://img.freepik.com/free-photo/chic-modern-luxury-aesthetics-style-living-room-gray-tone_53876-132806.jpg",
        "https://img.freepik.com/free-photo/chic-modern-luxury-aesthetics-style-living-room-blue-tone_53876-125839.jpg",
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
        <div style={styles.carouselContainer}>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index}>
                        <img src={slide} alt={`Slide ${index}`} style={styles.imageStyle} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

const styles = {
    carouselContainer: {
        width: '80%',
        margin: 'auto',
    },
    imageStyle: {
        borderRadius: '15px',
        width: '100%',
    },
};

export default Carousel;
