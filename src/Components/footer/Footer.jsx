import React, { useState, useEffect } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from '../../pages/firebase/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

const Footer = () => {
  const [contactEmail, setContactEmail] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: ''
  });
  const [newsletterContent, setNewsletterContent] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch contact info
        const contactSnapshot = await db.collection('contactInfonavbar').doc('contact').get();
        const FootercontactData = contactSnapshot.data();
        setContactEmail(FootercontactData.email);
        setPhonenumber(FootercontactData.phonenumber);

        const socialMediaSnapshot = await db.collection('socialMediaLinks').get();
        const socialMediaData = {};
        socialMediaSnapshot.docs.forEach(doc => {
          socialMediaData[doc.id] = doc.data().link;
        });
        setSocialMediaLinks(socialMediaData);

        // Fetch newsletter content
        const newsletterContentRef = await firebase.firestore().collection('newsletterContent').doc('content').get();
        if (newsletterContentRef.exists) {
          setNewsletterContent(newsletterContentRef.data());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load footer data.');
      }
    };

    fetchData();
  }, []);

  const handleNewsletterSubscribe = async () => {
    try {
      // Your subscribe logic here
      // For example, you might add the email to a Firestore collection
      await db.collection('newsletterSubscribers').add({ email: newsletterEmail });
      window.location.href = '/';
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setError('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="start-footer">
      <footer className="footer">
        <div className="container_footer">
          <div className="row">
            <div className="footer-col footer_side1">
              <img src="./logo.png" alt="" />
              <div className="inquiry">
                <div id='emailIcon'>
                  <FontAwesomeIcon icon={faEnvelope} className='email' />
                  <span className='icon-data'><b>Email</b> : {contactEmail}</span>
                </div>
                <div id='phoneIcon'>
                  <FontAwesomeIcon icon={faPhone} className='phone' />
                  <span className='icon-data'><b>Phone</b> : {phonenumber}</span>
                </div>
                <div id='mapIcon'>
                  <FontAwesomeIcon icon={faMapMarker} className='map' />
                  <span className='icon-data'><b>Location</b> : SCPL,<br /> 4th floor, Eros building,
                    <br />J. Tata Road Churchgate,
                    <br />Mumbai – 400 020, INDIA.</span>
                </div>
              </div>
            </div>
            <div className="footer-col footer_side3">
              <h4>{newsletterContent.heading}</h4>
              <p>{newsletterContent.description}</p>
              <div className="fixed_flex">
                <input
                  type="email"
                  name="newsletter"
                  placeholder={newsletterContent.placeholder}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button className="footer-btn" onClick={handleNewsletterSubscribe}>{newsletterContent.buttonText}</button>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className="footer-col footer_side4">
              <h4>follow us</h4>
              <div className="social-linksicons">
                <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a href={socialMediaLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
              <h4 className='links'>Links</h4>
              <ul className='direct-link'>
                <li><a href="/">home</a></li>
                <li><a href="/about">about</a></li>
                <li><a href="/product">product</a></li>
                <li><a href="/">news</a></li>
                <li><a href="/contact">contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright">
        © 2019 Siddharth Carbochem Products Ltd. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
