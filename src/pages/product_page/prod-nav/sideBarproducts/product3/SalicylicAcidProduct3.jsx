import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import './Product-3.css'
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

const SalicylicAcidProduct3 = () => {
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
          <div className="prod-3-right-content">
            <h1>Salicylic Acid (Technical)</h1>
            <p>2-HYDROXYBENZOIC ACID</p>
            <div className="product3-content">
            <h3>PROPERTIES</h3>
          <p><span>Appearance:</span> Colourless crystalline powder.</p>
          {/* <p><span>Assay:</span> 99.0% to 100.5% I.P./B.P., 99.5% to 101% U.S.P. <br /> of C7H6O3 with reference to substance dried over <br /> Silica Gel for three hours.</p> */}
          <p><span>Odour:</span> Almost Odourless</p>
          <p><span>Melting Range:</span> <br /> 158.5 0 C to 161.0 0 C</p>
          <p><span>Related Substance:</span>  <br />Complies with the B.P. test</p>
          <p><span>Loss of Drying:</span> <br /> 0.5% (max.) B.P.</p>
          <p><span>Iron:</span> 2 ppm (max.) I.P.</p>
            </div>
            <div className="product-3-image">
              <img src="../../product-black-svg/salicylic-acid-diagram.svg" alt="" />
            </div>
            <button className='product-3-btn'><a href="/techsalicylic">View Product</a></button>
          </div>
        </div>
    </Layout>
  )
}

export default SalicylicAcidProduct3
