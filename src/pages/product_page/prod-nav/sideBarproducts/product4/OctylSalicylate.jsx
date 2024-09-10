import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import './Product-4.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from '../../../../../Components/layout/Layout';
import ProdNav from '../../ProdNav';

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

const OctylSalicylate = () => {
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
            src="https://www.scpl.biz/wp-content/uploads/2018/12/chemists.jpg"
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
            src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
            src="https://images.pexels.com/photos/3735780/pexels-photo-3735780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </div>
      </div>
      {showText && <AnimatedText><h1 className='product-heading'>Our Product</h1></AnimatedText>}
      <div className="mid-line"></div>

      <div className="prod-container">
        <ProdNav />
        <div className="prod-4-right-content">
          <h1>Octyl Salicylate</h1>
          <p>2-ETHYLHEXYL SALICYLATE</p>
          <div className="product4-content">
            <h3>PROPERTIES</h3>
            <p><span>Appearance:</span> Colourless Aromatic Liquid having a strong, <br /> persistent and characteristic Odour.</p>
            <p><span>Assay:</span> 95.0% – 105.0%</p>
            <p><span>Specific Gravity:</span> <br /> 1.011 – 1.016</p>
            <p><span>Refractive Index:</span> <br /> 1.500 to 1.503</p>
            <p><span>Acidity:</span> <br /> 0.2 mgKOH/g maximum</p>
            <p><span>Purity (Content of Methyl Salicylate):</span> Minimum 99.0%</p>
          </div>
          <div className="product-4-image">
            <img src="../../product-black-svg/octyl.svg" alt="" />
          </div>
          <button className='product-4-btn'><a href="/octyl">View Product</a></button>
        </div>
      </div>
    </Layout>
  )
}

export default OctylSalicylate
