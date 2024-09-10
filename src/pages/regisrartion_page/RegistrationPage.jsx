import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import React, { useState } from 'react';
import Layout from '../../Components/layout/Layout';
import 'react-toastify/dist/ReactToastify.css';
import './RegistrationPage.css';
import swal from 'sweetalert2';
import firebaseConfig from '../firebase/firebaseConfig';
import './RegistrationPage.css'

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth(); 
const firestore = firebaseApp.firestore(); // Initialize Firestore

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@rmc\.in$/;
    if (!emailRegex.test(email)) {
      swal.fire('Error', 'Please enter a valid RMC email address', 'error');
      return;
    }

    try {
      // Sign in with email and password
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userRef = firestore.collection('users').doc(user.uid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error('User data not found');
      }

      const userData = userDoc.data();
      const userRole = userData.role;

      // Redirect based on role
      switch (userRole) {
        case 'admin':
          window.location.href = '/admin';
          break;
        case 'hr':
          window.location.href = '/contactform';
          break;
        case 'pratik':
          window.location.href = '/dataofcompliances';
          break;
        default:
          throw new Error('Unknown user role');
      }

      swal.fire('Success', 'Login Successfully', 'success');
    } catch (error) {
      console.error('Error during login:', error.message);
      swal.fire('Error', 'Invalid email or password', 'error');
    }
  };

  return (
    <Layout>
      <div className="container_signup">
        <div className="card_signup">
          <div className="card_title_signup">
            <h1>Login for Admin Only</h1>
          </div>
          <div className="form_sign">
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="signin_btn">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationPage;
