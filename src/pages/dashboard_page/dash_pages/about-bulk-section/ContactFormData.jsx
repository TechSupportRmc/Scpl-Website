import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import DashboardPage from '../../DashboardPage';
import firebaseConfig from '../../../firebase/firebaseConfig';
import ContactForm2 from './ContactForm2';

// Initialize Firebase only if it hasn't been initialized already
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const ContactFormData = () => {
  const [data, setData] = useState([]);
  const headers = ['Name', 'Email', 'Mobile No', 'Message', 'Timestamp'];

  useEffect(() => {
    const fetchData = async () => {
      const firestore = firebase.firestore();
      const collectionRef = firestore.collection('contacts'); // Replace with your collection name
      const snapshot = await collectionRef.orderBy('name').get();

      const dataArray = snapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id, // Add document ID to each item
          ...docData,
          timestamp: docData.timestamp ? docData.timestamp.toDate().toLocaleString() : 'N/A' // Convert Firestore timestamp to readable format
        };
      });
      setData(dataArray);
    };

    fetchData();
  }, []);

  // const handleDelete = async (id) => {
  //   const firestore = firebase.firestore();
  //   try {
  //     await firestore.collection('contacts').doc(id).delete();
  //     // Remove the deleted item from the state
  //     setData(data.filter(item => item.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting document: ', error);
  //   }
  // };

  return (
    <div>
      <DashboardPage />
      <h2>Home Page Contact Section</h2>
      <table className="contact-table">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobileNo}</td>
              <td>{item.message}</td>
              <td>{item.timestamp}</td>
              {/* <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <ContactForm2 />
    </div>
  );
};

export default ContactFormData;
