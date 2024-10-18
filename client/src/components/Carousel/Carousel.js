import React, {useState} from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css';

const Carousel = () => {
    const [slidess, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const result = await axios.get('/customer/products');
            setProducts(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    const slides = [
        '/assets/galaxy-s23.jpeg',
        '/assets/iphone-se.jpg',
        '/assets/iphone-12.jpeg',
        '/assets/pixel-7.jpg',
        '/assets/galaxy-s23-ultra.jpg',
    ]

    getProducts();

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dotsClass: "slick-dots",
        centerMode: true,
        centerPadding: "10px",
        
    };

    return (
        <div>
            <div className="carousel-container">
                <p>Explore Our Latest Collection of Smartphones!</p>
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
