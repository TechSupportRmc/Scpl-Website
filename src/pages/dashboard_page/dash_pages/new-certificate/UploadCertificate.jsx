import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const UploadCertificate = ({ setShowPopup }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);

    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyCKwDkJ7Ajk4-EmgWiZp5mnwUgctO14x-4",
      authDomain: "scpl-87eda.firebaseapp.com",
      projectId: "scpl-87eda",
      storageBucket: "scpl-87eda.appspot.com",
      messagingSenderId: "3962701564",
      appId: "1:3962701564:web:be983b0329db39b0087979",
      measurementId: "G-PK61QSCE6Q"
    };
  
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  
    const storage = firebase.storage();
  const firestore = firebase.firestore();
  const imagesCollection = firestore.collection('Newcertificates');

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handlePdfChange = (e) => {
    setSelectedPdf(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedImage || !selectedPdf) {
      alert('Please select both an image and a PDF to upload.');
      return;
    }

    const title = e.target.title.value; // Extract the title from the form

    const imageStorageRef = storage.ref('www.scpl.biz/upload/Newcertificate/images/' + selectedImage.name);
    const pdfStorageRef = storage.ref('www.scpl.biz/upload/PDFs/' + selectedPdf.name);

    // Upload image file
    imageStorageRef.put(selectedImage).then((imageSnapshot) => {
      console.log('Uploaded image successfully!');

      // Get image download URL
      imageSnapshot.ref.getDownloadURL().then((imageDownloadURL) => {
        console.log('Image available at', imageDownloadURL);

        // Upload PDF file
        pdfStorageRef.put(selectedPdf).then((pdfSnapshot) => {
          console.log('Uploaded PDF successfully!');

          // Get PDF download URL
          pdfSnapshot.ref.getDownloadURL().then((pdfDownloadURL) => {
            console.log('PDF available at', pdfDownloadURL);

            // Add data to Firestore
            imagesCollection
              .add({
                title: title,
                imageUrl: imageDownloadURL,
                pdfUrl: pdfDownloadURL,
              })
              .then((docRef) => {
                console.log('Document written with ID: ', docRef.id);
                alert('Image and PDF uploaded successfully!');
                window.location.reload()
                // Close the popup form after successful upload
                setShowPopup(false);
              })
              .catch((error) => {
                console.error('Error adding document: ', error);
                alert('Error uploading image and PDF. Please try again.');
              });
          });
        });
      });
    }).catch((error) => {
      console.error('Error uploading image: ', error);
      alert('Error uploading image. Please try again.');
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='edit-popup'>
        <h2>Upload Image and PDF</h2>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" required />
        <label htmlFor="imageFile">Select Image:</label>
        <input type="file" id="imageFile" accept="image/*" required onChange={handleImageChange} />
        <label htmlFor="pdfFile">Select PDF:</label>
        <input type="file" id="pdfFile" accept=".pdf" required onChange={handlePdfChange} />
        <button className='editButton' type="submit">Upload</button>
        {/* Add a button to cancel and close the popup form */}
        <button className='deleteButton' type="button" onClick={() => setShowPopup(false)}>Cancel</button>
      </form>
    </div>
    );
}

export default UploadCertificate
