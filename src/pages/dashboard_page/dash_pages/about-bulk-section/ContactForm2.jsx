import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import firebaseConfig from '../../../firebase/firebaseConfig';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const ContactForm2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const firestore = firebase.firestore();
      const collectionRef = firestore.collection('second_contact_form'); // Order by timestamp in descending order
      const snapshot = await collectionRef.get();

      const dataArray = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp ? data.timestamp.toDate().toLocaleString() : 'No Timestamp'
        };
      });
      setData(dataArray);
    };

    fetchData();
  }, []);

  // const handleDelete = async (id) => {
  //   const firestore = firebase.firestore();
  //   try {
  //     await firestore.collection('second_contact_form').doc(id).delete();
  //     // Remove the deleted item from the state
  //     setData(data.filter(item => item.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting document: ', error);
  //   }
  // };

  // Static headers
  const headers = ['Name', 'Email', 'Mobile No', 'Company Name', 'Country', 'Subject', 'Timestamp'];

  return (
    <div>
      <h2>Main Contact Form</h2>
      <table className="table">
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
              <td>{item.number}</td>
              <td>{item.compnyname}</td>
              <td>{item.country}</td>
              <td>{item.subject}</td>
              <td>{item.timestamp}</td>
              {/* <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .table {
          border-collapse: collapse;
          width: 100%;
        }
        .table th, .table td {
          border: 1.5px solid black;
          padding: 8px;
          text-align: left;
        }
        .table th {
          background-color: #0d9649;
          color: white;
        }
        .table tr:nth-child(even) {
          background-color: #f2f2f2;
        }
      `}</style>
    </div>
  );
}

export default ContactForm2;
