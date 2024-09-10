import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Certification.css'

import firebaseConfig from '../../pages/firebase/firebaseConfig'

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

const Certification = () => {
  const [certificates, setCertificates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certificatesCollection = await db.collection('certificates').get();
        const certificatesData = certificatesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCertificates(certificatesData);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % certificates.length);
    }, 500); // Change 3000 to adjust the interval time in milliseconds

    return () => clearInterval(interval);
  }, [certificates.length]); // Update the effect when the length of certificates changes

  return (
    <div className="section_certificate">
      <h1>Our Certification</h1>
      <div className="main_certi">
        <div className="contain_certi">
          <div className="slide-contain-certi">
            {certificates.map((certificate, index) => (
              <div className={`slide-image-certi ${index === currentIndex ? 'active' : ''}`} key={certificate.id}>
                <img src={certificate.url} alt={`Certificate ${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Certification;