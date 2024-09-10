import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { useState } from 'react';
import Layout from '../../../Components/layout/Layout'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert2';


const firebaseConfig = {
    apiKey: "AIzaSyCKwDkJ7Ajk4-EmgWiZp5mnwUgctO14x-4",
    authDomain: "scpl-87eda.firebaseapp.com",
    projectId: "scpl-87eda",
    storageBucket: "scpl-87eda.appspot.com",
    messagingSenderId: "3962701564",
    appId: "1:3962701564:web:be983b0329db39b0087979",
    measurementId: "G-PK61QSCE6Q"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth(); // Use auth directly
console.log(auth)

const LoginUser = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();


    const emailRegex = /^[^\s@]+@rmc\.in$/;
    if (!emailRegex.test(email)) {
      swal.fire('Error', 'Please enter a valid RMC email address', 'error');
      return;
    }

    try {
      const userCredential = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
      // Access the signed-in user via userCredential.user
      console.log(userCredential)
      swal.fire('Success', 'Login Successfully', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      window.location.href = '/compliance'; 
    } catch (error) {
      console.error('Error during login:', error.message);
      swal.fire('Error', 'Invalid email or password', 'error');
      window.location.reload();
    }
  };
  return (
    <Layout>
      <div className="container_signup">
        <div className="card_signup">
          <div className="card_title_signup">
            <h1>Login in Compliances</h1>
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
              <button type="submit" className='signin_btn'>Sign In</button>
            </form>
          </div>
        </div>
      </div>
      {/* <ToastContainer/> */}
    </Layout>
  )
}

export default LoginUser
