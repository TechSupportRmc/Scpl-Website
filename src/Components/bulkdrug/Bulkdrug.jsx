  import React, { useEffect, useState } from 'react';
import './Bulkdrug.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import AOS from 'aos';
import 'aos/dist/aos.css';


import firebaseConfig from '../../pages/firebase/firebaseConfig'

const app = firebase.initializeApp(firebaseConfig);
console.log(app);


const Bulkdrug = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Initialize Firebase if not already initialized
    if (!firebase.apps.length) {
      const firebaseConfig = {
        // Your Firebase configuration
      };
      firebase.initializeApp(firebaseConfig);
    }

    // Fetch data from Firestore
    const fetchData = async () => {
      const db = firebase.firestore();
      const bulkDrugsRef = db.collection('bluk');
      try {
        const snapshot = await bulkDrugsRef.get();
        const bulkDrugsData = snapshot.docs.map(doc => doc.data());
        setData(bulkDrugsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  const onProduct = () => {
    window.location.href = '/product';
  };



  return (
    <>
      {data && data.map((item, index) => (
        <div key={index} className="responsive-container-block bigContainer" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
          <h1 className='bulk-heading'>{item.sectionTitle}</h1>
          <div className="responsive-container-block Container">
            <div className="image-side">
              <div className="text-contain">
                B <br /> U <br /> L <br /> K <br /> D <br />R <br />U <br />G <br />S
              </div>
            </div>
            <img className="mainImg" src={item.url} alt="bulkimage" data-aos="flip-left" />
            <div className="allText aboveText">
              <p className="text-blk description">
                {item.description}
              </p>
              <button className="explore" onClick={onProduct}>Explore</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Bulkdrug;
