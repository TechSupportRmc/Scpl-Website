import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Layout from '../../Components/layout/Layout'
import './ProductPage.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import MethylProduct1 from './prod-nav/sideBarproducts/product1/MethylProduct1';

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

const ProductPage = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(true);
  }, []);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
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
        {showText && <AnimatedText><h1 className='product-heading'>Our Product</h1></AnimatedText>}
        {/* {showText && (
          <AnimatedText>
            <p className='about-subheading'>HIGHEST QUALITY PRODUCTS</p>
          </AnimatedText>
        )} */}
        <div className="mid-line"></div>
        <MethylProduct1/>
    </Layout>
  )
}

export default ProductPage
