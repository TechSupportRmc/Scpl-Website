import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import './Compliances.css';
import Layout from '../../Components/layout/Layout';
import firebaseConfig from '../firebase/firebaseConfig';


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const CompliancesPage = () => {
  useEffect(() => {
    const fetchCategoryData = (category, containerId) => {
      firestore.collection('dataofcompliances')
        .where('category', '==', category)
        .orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
          const container = document.getElementById(containerId);
          container.innerHTML = ''; // Clear previous content

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const complianceItem = document.createElement('div');
            complianceItem.classList.add('compliance-item');

            const title = document.createElement('h3');
            title.textContent = data.title;
            complianceItem.appendChild(title);

            const description = document.createElement('p');
            description.textContent = data.description;
            complianceItem.appendChild(description);

            const linkWrapper = document.createElement('p');
            linkWrapper.classList.add('text-normal');

            const link = document.createElement('a');
            link.href = data.pdfUrl;
            link.textContent = "Click Here!";
            link.target = "_blank";
            link.classList.add('click-here');

            linkWrapper.appendChild(link);
            linkWrapper.appendChild(document.createTextNode(' to view/download the report'));

            complianceItem.appendChild(linkWrapper);

            container.appendChild(complianceItem);
          });
        })
        .catch(error => {
          console.error('Error fetching compliance data:', error);
        });
    };

    // Fetch compliance data on component mount
    fetchCategoryData('environment-clearances', 'environment-clearances');
    fetchCategoryData('compliance-reports', 'compliance-reports');
    fetchCategoryData('environmental-statements', 'environmental-statements');
  }, []);


  const headingStyle = {
    textAlign: 'left',
    marginBottom: '10px',
  };


  return (
    <Layout>
      <div className="bg-complian">
        <div className="complian">
          <div className="complian-overlay">
            <h2>Compliances & Clearances</h2>
          </div>
        </div>
      </div>

      <div className="complian-container">
        <div className="compian-heading">
          <h1>Protected: Compliances & Clearances</h1>
          <p>By Rishabh | Jan 1, 2023 | Compliances</p>
        </div>

        <section className="compliance-section">

          <div>
            <h2 style={headingStyle}>Environment Clearances</h2>
            <div id="environment-clearances"></div>
          </div>

          <div>
            <h2 style={headingStyle}>Environment Clearance Compliance Reports</h2>
            <div id="compliance-reports"></div>
          </div>

          <div>
            <h2 style={headingStyle}>Environmental Statement (Form V)</h2>
            <div id="environmental-statements"></div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CompliancesPage;
