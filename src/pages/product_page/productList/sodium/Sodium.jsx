import React,{useEffect} from 'react'
import Layout from '../../../../Components/layout/Layout'
import './Sodium.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Sodium = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <Layout>
      <div className="bg-product_5">
        <div className="product_5">
          <div className="product_5-overlay">
            <p>SODIUM 2-HYDROXYBENZOATE</p>
            <h2>Sodium Salicylate</h2>
            <img src="../../product-svg/sodium.svg" alt="" />
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
          <p><span>Appearance:</span> Flakes, Colourless Crystalline Flake, Powder – White powder.</p>
          <p><span>Assay: </span>99.5% – 100.5%</p>
          <p><span>Odour: </span>Odorless</p>
          <p><span>Melting Point/Range:</span> 200°C</p>
          <p><span>Specific Gravity:</span> 1.180 – 1.185</p>
          <p><span>Loss on drying:</span> Max 0.5%</p>
        </div>
        <div className="right-side" data-aos="fade-down-left">
          <div>
            <h4>Heavy Metals:</h4>
            <p>
              Max 20 ppm
            </p>
          </div>
          <div>
            <h4>Grades:</h4>
            <p>
              Pharmaceutical Grade (IP/BP/USP-NF) <br />
              Technical Grade <br />
            </p>
          </div>
          <div>
            <h4>Uses:</h4>
            <p>
              Pharmaceuticals <br />
              Food, Flavours and Fragrances <br />
              Solvents and Intermediates <br />
              Tobacco Industry
            </p>
          </div>
        </div>
      </section>
      <p className='notes-product_1'><span>NOTE: </span>This product can be manufactured as per customer’s specification and requirements.</p>
    </Layout>
  )
}

export default Sodium
