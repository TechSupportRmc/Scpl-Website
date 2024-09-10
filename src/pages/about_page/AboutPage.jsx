import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import './AboutPage.css';
import Layout from '../../Components/layout/Layout';
import AOS from 'aos';
import 'aos/dist/aos.css';

const slideInFromTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const AnimatedText = styled.div`
  font-size: 24px;
  animation: ${slideInFromTop} 1s ease-in-out; /* Adjust the animation duration and timing function as needed */
`;

const AboutPage = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(true);
  }, []);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
    <div className="start_about">
      <div className="slides-about">
        <div className="slide_about slide-1">
          <div className="content-overlay">
            {/* <h2>About Us</h2>
            <p>
              SIDDHARTH CARBOCHEM PRODUCTS LTD.
            </p> */}
          </div>
          <img
            src="https://images.pexels.com/photos/8539999/pexels-photo-8539999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </div>
        <div className="slide_about slide-2">
          <div className="content-overlay">
            {/* <h2>About Us</h2>
            <p>
              SIDDHARTH CARBOCHEM PRODUCTS LTD.
            </p> */}
          </div>
          <img
            src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </div>
        <div className="slide_about slide-3">
          <div className="content-overlay">
            {/* <h2>About Us</h2>
            <p>
              SIDDHARTH CARBOCHEM PRODUCTS LTD.
            </p> */}
          </div>
          <img
            src="https://images.pexels.com/photos/248152/pexels-photo-248152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </div>
      </div>
      {showText && <AnimatedText><h1 className='about-heading'>About Us</h1></AnimatedText>}
      {showText && (
        <AnimatedText>
          <p className='about-subheading'>SIDDHARTH CARBOCHEM PRODUCTS LTD.</p>
        </AnimatedText>
      )}
      <div className="mid-line"></div>
      <div className="dual-text-section">
        <div className="left-text"  data-aos="fade-right">
          <h2>OUR HISTORY</h2>
          <p>Siddharth Carbochem Products Limited (SCPL) has been in business over 30 years and is the largest manufacturer of Methyl Salicylate & Salicylic Acid derivatives in India. We strategically focus on developing long term business relationships that will prove mutually beneficial to our customers, suppliers, employees and shareholders.</p>
          <p>Our products are used extensively in Pharmaceuticals, Food, Beverage, Flavour & Fragrance, Tobacco, Cosmetics, Homecare and Personal Care industry. We offer a broad range of salicylates in a variety of grades. SCPL is recognized as a reliable supplier of quality products with a proven track record of customer satisfaction, service, technical support and partnering with both supplier and customer for continuous product improvement.</p>
          <p>With a corporate spirit of being practical, innovative and pursuing excellence, SCPL persists on self innovation. We focus on the need of our customers and are committed to becoming a top-class supplier and establishing our self as the most preferred service provider for our range of products across the world.</p>
          <p>SCPL takes pride in its commitment to use new technology to positively impact people’s lives through the production of useful chemical products. These chemicals are the key ingredients in many items you use every day, including pharmaceuticals, food, beverages flavour and fragrance, homecare personal care, etc.</p>
        </div>
        <div className="right-text" data-aos="fade-left">
          <h2>WHY CHOOSE US</h2>
          <p><i class="fa-solid fa-circle-check"></i>EMERGING GLOBAL PLAYER IN ITS SEGMENT.</p>
          <p><i class="fa-solid fa-circle-check"></i>QUALITY PRODUCTS AND SERVICES AT COMPETITIVE RATES.</p>
          <p><i class="fa-solid fa-circle-check"></i>DEDICATED, EXPERIENCED PROFESSIONALS WITH DECADES OF EXPERIENCE.</p>
          <p><i class="fa-solid fa-circle-check"></i>FAIR, HONEST & CONSISTENT BUSINESS PRACTICES.</p>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default AboutPage
