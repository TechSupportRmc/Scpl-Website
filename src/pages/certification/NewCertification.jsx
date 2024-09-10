import React, { useState, useEffect } from 'react';
import Layout from '../../Components/layout/Layout'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Card from './New';

const firebaseConfig = {
    apiKey: "AIzaSyCKwDkJ7Ajk4-EmgWiZp5mnwUgctO14x-4",
    authDomain: "scpl-87eda.firebaseapp.com",
    projectId: "scpl-87eda",
    storageBucket: "scpl-87eda.appspot.com",
    messagingSenderId: "3962701564",
    appId: "1:3962701564:web:be983b0329db39b0087979",
    measurementId: "G-PK61QSCE6Q"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const NewCertification = () => {
    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await firestore.collection('Newcertificates').orderBy('name').get();
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCardsData(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();

        return () => {
            // Cleanup
        };
    }, []);

    const handleViewCertificate = (pdfUrl) => {
        window.open(pdfUrl, '_blank');
    };

    return (
        <Layout>
           <div className="bg-complian">
                <div className="complian">
                    <div className="complian-overlay">
                        <h2>Authorized Certificates</h2>
                    </div>
                </div>
            </div>
            <div className="cardcerti-container">
                {cardsData.map(card => (
                    <Card key={card.id} image={card.url} title={card.title} onViewCertificate={() => handleViewCertificate(card.pdfUrl)} />
                ))}
            </div>
        </Layout>
    );
};

export default NewCertification;
