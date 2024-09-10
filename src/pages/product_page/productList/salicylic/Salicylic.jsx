import React, {useEffect} from 'react'
import Layout from '../../../../Components/layout/Layout'
import './Salicylic.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
const Salicylic = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <Layout>
     <div className="bg-product_3">
        <div className="product_3">
          <div className="product_3-overlay">
            <p>2-HYDROXYBENZOIC ACID</p>
            <h2>Salicylic Acid <br />(IP/BP/USP)</h2>
            <img src="../../product-svg/salicylic-acid-diagram.svg" alt="" />
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
          <p><span>Appearance:</span> Colourless crystalline powder.</p>
          <p><span>Assay:</span> 99.0% to 100.5% I.P./B.P., 99.5% to 101% U.S.P. of C7H6O3 with reference to substance dried over Silica Gel for three hours.</p>
          <p><span>Odour:</span> Almost Odourless</p>
          <p><span>Melting Range:</span> 158.5 0 C to 161.0 0 C</p>
          <p><span>Appearance of Solution/Clarity & Colour of Solution:</span>
Passes test as per B.P./I.P</p>
          <p><span>Sulphated Ash/Residue on Ignition:</span> 0.1% w/w (I.P./B.P.Limit) / 0.05%w/w (U.S.P. Limit)</p>
          <p><span>Chloride:</span> 125 ppm (max.) I.P./100 ppm (max.) B.P.</p>
          <p><span>Sulphate:</span> 0.02% (max.) I.P./140 ppm U.S.P.</p>
          <p><span>Related Substance:</span> Complies with the B.P. test</p>
          <p><span>Loss of Drying:</span> 0.5% (max.) B.P.</p>
          <p><span>Iron:</span> 2 ppm (max.) I.P.</p>
        </div>
        <div className="right-side" data-aos="fade-down-left">
        <div>
            <h4>Readily Carbonisable Substance:</h4>
            <p>
            Passes test
            </p>
          </div>
        <div>
            <h4>Solubility:</h4>
            <p>
            Slightly soluble in water <br />
            Freely soluble in ethanol (96%)<br />
            Sparingly soluble in methylene chloride
            </p>
          </div>
          <div>
            <h4>Heavy Metals:</h4>
            <p>
            20 ppm (max.)
            </p>
          </div>
          <div>
            <h4>Grades :</h4>
            <p>
            Technical Grade <br />
            Purified Grade<br />
            Pharmaceutical Grade (IP/BP/JP/USP-NF)
            </p>
          </div>
          <div>
            <h4>Uses:</h4>
            <p>
            Pharmaceuticals <br />
            Intermediates of dyestuffs and pesticides
            </p>
          </div>
        </div>
      </section>
      <p className='notes-product_1'><span>NOTE: </span>This product can be manufactured as per customer’s specification and requirements.</p>
    </Layout>
  )
}

export default Salicylic
