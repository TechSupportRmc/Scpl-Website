import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './About.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

import firebaseConfig from '../../pages/firebase/firebaseConfig'

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchData = async () => {
      try {
        // Check if data exists in localStorage
        const cachedData = localStorage.getItem('aboutData');
        if (cachedData) {
          setAboutData(JSON.parse(cachedData));
        } else {
          const aboutRef = db.collection('about-bulk').doc('Jt8cESK53zsyqvVDLTJM');
          const doc = await aboutRef.get();
          if (doc.exists) {
            const data = doc.data();
            setAboutData(data);
            // Store fetched data in localStorage
            localStorage.setItem('aboutData', JSON.stringify(data));
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchData();
  }, []);

  const onAbout = () => {
    window.location.href = '/about';
  }

  return (
    <div className="responsive-section">
      <div className="text-content" data-aos="fade-right">
        {aboutData && (
          <>
            <h3>{aboutData.sectionTitle}</h3>
            <h2>{aboutData.companyName}</h2><br />
            <h1>{aboutData.mainTitle}</h1><br />
            <p>{aboutData.description}</p>
            <br />
            <button className='about-btn' onClick={onAbout}>Learn more about us</button>
          </>
        )}
      </div>

      <div className="image-content" data-aos="flip-right">
        {aboutData && (
          <img src={aboutData.url} alt='aboutimage' />
        )}
      </div>
    </div>
  );
}

export default About;