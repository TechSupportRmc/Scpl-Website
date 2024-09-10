import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faAddressCard, faBuilding, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Cards.css';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


import firebaseConfig from '../../pages/firebase/firebaseConfig'

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

const Cards = () => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const snapshot = await db.collection('cardsData').orderBy('cardId').get();
        const fetchedData = snapshot.docs.map(doc => doc.data());
        setCardsData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchCardsData();
  }, []);

  const cardsIcons = [faFlask, faAddressCard, faBuilding];

  return (
    <div className='cards-container'>
      {cardsData.map((card, index) => (
        <div className='cards' key={index}>
          <div className='cards-icon' data-aos="fade-right">
            {/* Convert SVG string to JSX element */}
            <FontAwesomeIcon icon={cardsIcons[index]} size='2x' />
          </div>
          <div className='cards-content' data-aos="fade-left">
            <h2 className='cards-title'>{card.title}</h2>
            <p className='cards-text'>{card.text}</p>
            <button className='cards-btn'>
              <Link to={card.link}>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;