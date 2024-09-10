import React, { useState, useEffect } from 'react';
import swal from 'sweetalert2';
import './ContactFrom.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from '../../pages/firebase/firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(firebaseApp);

const ContactForm = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading message
    swal.fire({
      title: 'Sending message...',
      didOpen: () => {
        swal.showLoading();
      },
      allowOutsideClick: false,
    });

    if (!isEmailValid(formData.email)) {
      // Show an error message for invalid email
      swal.fire('Error', 'Please enter a valid email address', 'error');
      return;
    }

    const dataWithTimestamp = {
      ...formData,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      // Send data to Firestore
      await db.collection('second_contact_form').add(dataWithTimestamp);

      // Send data to email endpoint
      const response = await fetch('https://scpl.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithTimestamp),
      });

      if (response.ok) {
        // If message sent successfully
        swal.fire({
          icon: 'success',
          title: 'Message sent successfully!',
          showConfirmButton: false,
          timer: 2000,
        });

        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          mobileNo: '',
          message: '',
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
      swal.fire({
        icon: 'error',
        title: 'Error sending message',
        text: 'Please try again later.',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="section-contact">
      <div className="overlay-image-contact"></div>
      <div className="content1">
        <div className="left-contact" data-aos="fade-right">
          <h1>For inquiries, <br /> Reach out to us at <br /> <span>Siddharth Carbochem <br /> Products Limited</span></h1>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='icon'><path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V205.3L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160H384z" /></svg>
        </div>
        <div className="right-contact" data-aos="fade-left">
          <form className='form-contact' onSubmit={handleSubmit}>
            <h3 className='conatct-heading1'>Contact Us</h3>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" onChange={handleChange} name="name" value={formData.name} placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" onChange={handleChange} name="email" value={formData.email} placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNo">Mobile No:</label>
              <input
                type="tel"
                id="mobileNo"
                onChange={handleChange}
                name="mobileNo"
                value={formData.mobileNo}
                placeholder="Your Mobile No"
                pattern="[0-9]{10}"
                title="Please enter a 10-digit mobile number"
                minLength="10"
                maxLength="10"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" onChange={handleChange} value={formData.message} placeholder="Your Message"></textarea>
            </div>
            <button type="submit" id='submitBtn'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
