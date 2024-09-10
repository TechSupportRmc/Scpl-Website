import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Layout from '../../Components/layout/Layout';
import './ContactPage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from '../firebase/firebaseConfig';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const slideInFromTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const AnimatedText = styled.div`
  font-size: 24px;
  animation: ${slideInFromTop} 1s ease-in-out; /* Adjust the animation duration and timing function as needed */
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    compnyname: '',
    country: '',
    subject: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Show loading message
    Swal.fire({
      title: 'Sending message...',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });

    const dataWithTimestamp = {
      ...formData,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      // Send data to Firestore
      await db.collection('second_contact_form').add(dataWithTimestamp);

      // Send data to email endpoint
      const response = await fetch('https://scpl.onrender.com/mainContactForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithTimestamp),
      });

      if (response.ok) {
        // If message sent successfully
        Swal.fire({
          icon: 'success',
          title: 'Message sent successfully!',
          showConfirmButton: false,
          timer: 2000,
        });

        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          number: '',
          compnyname: '',
          country: '',
          subject: '',
        });

        // Wait for 2 seconds before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        // If there was an error sending the message
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // If there was a network error or any other unexpected error
      Swal.fire({
        icon: 'error',
        title: 'Error sending message',
        text: 'Please try again later.',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(true);
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      <div className="slides-about">
        <div className="slide_about slide-1">
          <div className="content-overlay"></div>
          <img src="./chemists.jpg" alt="" />
        </div>
        <div className="slide_about slide-2">
          <div className="content-overlay"></div>
          <img
            src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </div>
        <div className="slide_about slide-3">
          <div className="content-overlay"></div>
          <img
            src="https://images.pexels.com/photos/3735780/pexels-photo-3735780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </div>
      </div>
      {showText && (
        <AnimatedText>
          <h1 className="contact-heading">Contact Us</h1>
        </AnimatedText>
      )}
      {showText && (
        <AnimatedText>
          <p className="contact-subheading">Get In Touch</p>
        </AnimatedText>
      )}
      <div className="contact_mid-line"></div>
      <div className="contact_container">
        <div className="contact-box">
          <div className="left" data-aos="zoom-in">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15095.957602103605!2d72.8266686!3d18.9318633!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1e740000007%3A0x9d6a431b87f7e0aa!2sSiddharth%20Carbochem%20Products%20Ltd.!5e0!3m2!1sen!2sin!4v1707217256172!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="right" data-aos="fade-down-left">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="field"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="field"
                placeholder="Your Email"
                required
              />
              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="field"
                placeholder="Your Mobile No"
                pattern="[0-9]{10}"
                title="Please enter a 10-digit mobile number"
                minLength="10"
                maxLength="10"
                required
              />
              <input
                type="text"
                name="compnyname"
                value={formData.compnyname}
                onChange={handleChange}
                className="field"
                placeholder="Company Name"
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="field"
                placeholder="Country"
              />
              <textarea
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="field"
                placeholder="Subject"
                style={{ marginBottom: '10px' }}
              ></textarea>
              <button type="submit" className="contact_btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
