import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from '../../../../../Components/layout/Layout';
import './Product-8.css'
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


const HomoSalate = () => {
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
                <div className="prod-8-right-content">
                    <h1>Homosalate</h1>
                    <p>
                        3,3,5-TRIMETHYLCYCLOHEXYL 2-HYDROXYBENZOATE</p>
                    <div className="product8-content">
                        <h3>PROPERTIES</h3>
                        <p><span>Chemical Formula:</span> C16H22O3</p>
                        <p><span>Molecular Weight: </span>262.35 g/mol</p>
                        <p><span>Identification:</span> A: IR absorption</p>
                        <p><span>Specific Gravity:</span> 1.049 to 1.053</p>
                        <p><span>Refractive Index:</span> 1.516 to 1.519</p>
                        <p><span>Assay (GC):</span> Not less than 90 % & Not more than 110 % on as-is basis.</p>
                        <p><span>UV specific extinction:</span> 170 to 180@305±2nm</p>
                        <p><span>Uses:</span> It is a highly effective oil soluble UV-B filter. It is an excellent
                            solubilizer for crystalline UV filters.</p>
                    </div>
                    <div className="product-8-image">
                        <img src="../../product-black-svg/Homosalate.svg" alt="" />
                    </div>
                    <button className='product-8-btn'><a href="/homosalate">View Product</a></button>
                </div>
            </div>
        </Layout>
    )
}

export default HomoSalate
