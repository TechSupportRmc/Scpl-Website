import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelopeOpen, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookF, faLinkedinIn, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import firebaseConfig from '../../pages/firebase/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const socialMediaIcons = {
  twitter: faTwitter,
  facebook: faFacebookF,
  linkedin: faLinkedinIn,
  instagram: faInstagram,
  youtube: faYoutube
};

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [phonenumber, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch contact info
        const contactSnapshot = await db.collection('contactInfonavbar').doc('contact').get();
        const contactData = contactSnapshot.data();
        setPhonenumber(contactData.phonenumber);
        setEmail(contactData.email);

        // Fetch social media links
        const socialMediaSnapshot = await db.collection('socialMediaLinks').get();
        const socialMediaData = {};
        socialMediaSnapshot.docs.forEach(doc => {
          socialMediaData[doc.id] = doc.data().link;
        });
        setSocialMediaLinks(socialMediaData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function adminLogin() {
    window.location.href = '/adminlogin';
  }

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleProductMouseEnter = () => {
    setProductDropdownOpen(true);
  };

  const handleProductMouseLeave = () => {
    setProductDropdownOpen(false);
  };

  return (
    <div className="fixed-top">
      <div className="top-line">
        <div style={{ padding: '2px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
            <div style={{ textAlign: 'left' }}>
              <div id="small-icons">
                <small style={{ marginRight: '10px' }}>
                  <FontAwesomeIcon icon={faPhoneAlt} style={{ marginRight: '5px', fontSize: '16px' }} id='co-phone' />
                  {phonenumber}
                </small>
                <small>
                  <FontAwesomeIcon icon={faEnvelopeOpen} id="co-email" />
                  <a href={`mailto:${email}`} style={{ textDecoration: 'none', color: 'aliceblue', fontSize: '16px' }}>{email}</a>
                </small>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>
                {Object.entries(socialMediaLinks).map(([platform, link], index) => (
                  link && (
                    <a
                      key={index}
                      className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={socialMediaIcons[platform]} className="fw-normal" />
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className='container-fluid position-relative p-0'>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container py-2">
            <img className='log-img' src="./logo.png" alt="Company Logo" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse align-middle" id="navbarNav">
              <ul className="navbar-nav ms-auto nav_ul align-items-center">
                <li className="nav-item">
                  <Link className="nav-link" id='nav-link' to="/">Home</Link>
                </li>
                <li
                  className="nav-item dropdown"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    className={`nav-link ${dropdownOpen ? 'active' : ''}`}
                    to="/about"
                    id="navbarDropdown"
                  >
                    About <FontAwesomeIcon icon={faAngleDown} />
                  </Link>
                  <ul
                    className={`dropdown-menu ${dropdownOpen ? 'show' : ''} custom-dropdown`}
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" id='nav-link' to="/userlogin">
                        Compliances & Clearances
                      </Link>
                    </li>
                  </ul>
                </li>
                <li
                  className="nav-item dropdown"
                  onMouseEnter={handleProductMouseEnter}
                  onMouseLeave={handleProductMouseLeave}
                >
                  <Link
                    className={`nav-link ${productDropdownOpen ? 'active' : ''}`}
                    to="/product"
                    id="navbarDropdown"
                  >
                    Products <FontAwesomeIcon icon={faAngleDown} />
                  </Link>
                  <ul
                    className={`dropdown-menu ${productDropdownOpen ? 'show' : ''} custom-dropdown`}
                    aria-labelledby="productDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" id='nav-link' to="/methyl">
                        Methyl Salicylate
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" id='nav-link' to="/octyl">
                        Octyl Salicylate
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" id='nav-link' to="/salicylic">
                        Salicylic Acid (IP/BP/USP)
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" id='nav-link' to="/techsalicylic">
                        Salicylic Acid (Technical)
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" id='nav-link' to="/sodium">
                        Sodium Salicylate
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" id='nav-link' to="/salicylamide">
                        Salicylamide NF
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" id='nav-link' to="/aspirin">
                        Aspirin
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" id='nav-link' to="/homosalate">
                        Homosalate
                      </Link>
                    </li>
                    {/* Add more categories as needed */}
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" id='nav-link' to="#">News & Update</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" id='nav-link' to="/contact">Contact Us</Link>
                </li>
                <div className="mx-3">
                  <button type="button" className="btn1 mx-2" onClick={adminLogin}>Login</button>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
