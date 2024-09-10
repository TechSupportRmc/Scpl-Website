import React, { useEffect } from 'react'
import Layout from '../../../../Components/layout/Layout'
import './Homosalate.css'
import AOS from 'aos';
import 'aos/dist/aos.css';


const Homosalate = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);


    return (
        <Layout>
            <div className="bg-product_8">
                <div className="product_8">
                    <div className="product_8-overlay">
                        <p>3,3,5-TRIMETHYLCYCLOHEXYL 2-HYDROXYBENZOATE</p>
                        <h2>Homosalate</h2>
                        <img src="../../product-svg/Homosalate.svg" alt="" />
                    </div>
                </div>
            </div>
            <section className="two-column-section">
                <div className='back-link'>
                    <a href="/product" style={{ color: 'blue', textDecoration: 'underline' }}>Product Section</a>
                    <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Home</a>
                </div>
                <div className="left-side" data-aos="fade-up-right">
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
                <div className="right-side" data-aos="fade-down-left">
                    <div>
                        <h4>Grades:</h4>
                        <p>
                            Fragrance Grade <br />
                            Pharmaceutical Grade (USP)<br />
                            Technical Grade
                        </p>
                    </div>
                    <div>
                        <h4>Functions :</h4>
                        <p>
                            Solubilizer, UV Filter, Protective Agent, UV Absorber, UV Filter<br />
                        </p>
                    </div>
                    <div>
                        <h4>Uses:</h4>
                        <p>
                            HMS (Homosalate) is an effective UV-B filter.<br />
                            HMS is oil soluble, facilitating easy
                            incorporation in wide range of skin care,<br />
                            personal care products,<br />
                            hair care and sunscreenproducts.
                        </p>
                    </div>
                </div>
            </section>
            <p className='notes-product_1'><span>NOTE: </span>This product can be manufactured as per customer’s specification and requirements</p>
        </Layout>
    )
}

export default Homosalate
