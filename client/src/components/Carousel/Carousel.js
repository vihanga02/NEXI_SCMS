import React, {useState} from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css';

const Carousel = () => {
    const [slides, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const result = await axios.get('/customer/products');
            setProducts(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    getProducts();

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dotsClass: "slick-dots",
        centerMode: true,
        centerPadding: "0px",
    };

    return (
        <div>
            <div className="carousel-container">
                <p>Explore Our Latest Collection of Smartphones!</p>
                <Slider {...settings} className='slider'>
                    {slides.map((slide, index) => (
                        <div key={index} className="image-div">
                            <img src={slide.Image_Link} alt={`Slide ${index}`} className="image-style" />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
        
    );
};

export default Carousel;
