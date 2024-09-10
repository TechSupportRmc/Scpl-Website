import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from '../../dashboard_page/DashboardPage';
import firebaseConfig from '../../firebase/firebaseConfig';
import './CreateUser.css'
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Default role
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user with Firebase Authentication
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Store user role and email in Firestore
      const userRef = firestore.collection('users').doc(user.uid);
      await userRef.set({
        email: user.email,
        role: role
      });

      toast.success('User created successfully');
      navigate('/adminlogin', { replace: true }); // Redirect to user login
    } catch (error) {
      console.error('Error creating user: ', error.message);
      toast.error('Error creating user: ' + error.message);
    }
  };

  return (
    <div>
      <Dashboard />
      <div className="container-signup">
        <div className="user-signup">
          <div className="user-title-signup">
            <h1>Create User</h1>
          </div>
          <div className="user-sign">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="role">Role:</label>
              <select
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value='admin'>Admin</option>
                <option value='hr'>HR</option>
                <option value='pratik'>Pratik</option>
              </select>
              <button type="submit">Create User</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateUser;
