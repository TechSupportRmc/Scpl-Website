import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import './Product-5.css'
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
const SalicylamideNFProduct5 = () => {
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
          <div className="prod-5-right-content">
            <h1>Salicylamide NF</h1>
            <p>O-HYDROXY BENZAMIDE</p>
            <div className="product5-content">
            <h3>PROPERTIES</h3>
            <p><span>Appearance:</span> Flakes, Colourless Crystalline Flake,<br /> Powder – White powder.</p>
          <p><span>Assay:</span> <br /> 99.5% – 100.5%</p>
          <p><span>Odour:</span> <br /> Odorless</p>
          <p><span>Melting Point/Range: </span> <br />200°C</p>
          <p><span>Specific Gravity:</span> 1.180 – 1.185</p>
          <p><span>Loss on drying:</span> Max 0.5%</p>
            </div>
            <div className="product-5-image">
              <img src="../../product-black-svg/Salicylamide (1).svg" alt="" />
            </div>
            <button className='product-5-btn'><a href="/salicylamide">View Product</a></button>
          </div>
        </div>
    </Layout>
  )
}

export default SalicylamideNFProduct5
