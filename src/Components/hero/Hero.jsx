import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Hero.css'

import firebaseConfig from '../../pages/firebase/firebaseConfig'

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const snapshot = await db.collection('homepageHerosection').get();
        const fetchedSlides = snapshot.docs.map(doc => doc.data());
        setSlides(fetchedSlides);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();

    return () => {
      // Cleanup function if necessary
    };
  }, []); // Empty dependency array to execute only once during component mount

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  if (videoEnded) {
    return null; // If video ended, don't render the hero section
  }

  return (
    <div className="slider-container">
      <div className="min-screen" data-aos="fade-up">
        {slides.map((slide, index) => (
          <div key={index} className={`screen-box active`}>
            <div className="screen">
              <div className="content">
                <h3 className='hero-sub_heading'>{slide.description}</h3>
                <h1 id="homesection">{slide.title}</h1>
                <i className="fa-solid fa-angle-down blink" style={{ fontSize: '2.5rem', color: 'rgb(6, 105, 255)' }}></i>
              </div>
              <video src={slide.videoSrc} muted autoPlay loop onEnded={handleVideoEnded}></video>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
