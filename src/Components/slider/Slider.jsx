import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Slider.css';
// Import Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from '../../pages/firebase/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

const SliderCard = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [errorImages, setErrorImages] = useState([]);
  const [dataDigitalBestSeller, setDataDigitalBestSeller] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleErrorImage = (data) => {
    setErrorImages((prev) => [...prev, data.target.alt]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await db.collection('product').orderBy('sliderId').get();
        const data = querySnapshot.docs.map((doc) => doc.data());
        setDataDigitalBestSeller(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Removed 'db' from dependencies

  return (
    <div className="slider-bg">
      <h2>Our Product</h2>
      <div
        className="start"
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
      >
        <Slider {...settings}>
          {dataDigitalBestSeller.map((item) => (
            <div className="card" key={item.title}>
              <div className="card-top">
                <img
                  src={errorImages.includes(item.title) ? '' : item.linkImg}
                  alt={item.title}
                  onError={handleErrorImage}
                />
              </div>
              <div className="card-bottom">
                <h3>{item.title}</h3>
                <span className="category">{item.category}</span>
                <button className="product-btn">
                  <a href={item.button_link} className='slider_btn'>{item.button_name}</a>
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderCard;
