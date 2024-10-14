import React from 'react'
import './AboutUs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function AboutUs() {
  return (
    <div className='aboutus'>
        <h1>Welcome to Nexi!</h1>
        <p style={{marginBottom: '3vh'}}> 
        Established in 2002, Nexi is a trusted name in the mobile phone industry. Over the past two decades, we have been dedicated to providing the latest and most reliable mobile phones to customers across Sri Lanka. Based in Kandy, our company prides itself on delivering high-quality products and exceptional service to wholesalers, retailers, and end customers alike.

At Nexi, we prioritize customer satisfaction by offering a wide range of mobile phones from top brands, ensuring that you have access to the best technology at competitive prices. Our mission is to connect people with the tools they need to stay in touch, informed, and empowered in today’s digital world.

We are committed to excellence and are constantly evolving to meet the needs of our customers. Whether you’re looking for the latest smartphone or seeking expert advice, Nexi is here to serve you.
        </p>
        <h2>Our mission</h2>

        <p className='Mission'>
      
        Our mission is to deliver the latest mobile technology to customers across Sri Lanka with unparalleled service. We strive to empower individuals and businesses by keeping them connected and informed through innovative and reliable mobile phones. At Nexi, we are dedicated to creating long-lasting relationships by consistently exceeding our customers’ expectations.
        </p>
        <div className='future-goals'>
      <h2>Future Goals</h2>
      <ul>
        <li><strong>Expansion of Product Range</strong>: As part of our growth, Nexi plans to expand its offerings by introducing a wider range of mobile phones and accessories to cater to diverse customer needs.</li>

        <li><strong>Strengthening Supply Chain Efficiency</strong>: We aim to enhance our logistics and supply chain operations, ensuring faster, more reliable deliveries by optimizing our railway and truck-based distribution systems.</li>

        <li><strong>Digital Transformation</strong>: Nexi is investing in cutting-edge technology to further digitize our operations, providing customers with seamless online shopping experiences and improved customer support services.</li>

        <li><strong>Sustainability Initiatives</strong>: We are committed to implementing eco-friendly practices in our supply chain, such as reducing carbon emissions through more efficient transportation methods and sustainable packaging options.</li>

        <li><strong>Geographical Expansion</strong>: Looking ahead, Nexi aims to broaden its market reach by expanding into new regions across Sri Lanka, bringing our mobile products to more customers islandwide.</li>
      </ul>
    </div>
    <div className='contact-info'>
      <h2>Contact Information</h2>
      <p >If you have any inquiries, feedback, or are interested in collaboration, feel free to reach out to us:</p>
      
      <ul>
        <li><strong>Email:</strong> info@nexi.com</li>
        <li><strong>Phone:</strong> +94 123 456 789</li>
        <li><strong>Address:</strong> 123 Main Street, Kandy, Sri Lanka</li>
      </ul>

      <p style={{marginTop:'1.5vh'}}>Follow us on social media for updates</p>
      <ul className='social-media'>
        <li><a href='https://www.facebook.com/Nexi'> <FontAwesomeIcon icon={faFacebook} />Facebook</a></li>
        <li><a href='https://www.instagram.com/Nexi'> <FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
        <li><a href='https://www.twitter.com/Nexi'> <FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
      </ul>
    </div>
    </div>
  )
}
