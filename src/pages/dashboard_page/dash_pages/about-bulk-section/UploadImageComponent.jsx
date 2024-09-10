import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const UploadImageComponent = ({ setShowPopup }) => { // Accept setShowPopup prop
  const [selectedImage, setSelectedImage] = useState(null);

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
  const imagesCollection = firestore.collection('certificates');

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert('Please select an image to upload.');
      return;
    }

    const storageRef = storage.ref('www.scpl.biz/upload/certificate/images/' + selectedImage.name);

    storageRef.put(selectedImage).then((snapshot) => {
      console.log('Uploaded a blob or file!');

      snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);

        imagesCollection
          .add({
            name: selectedImage.name,
            url: downloadURL,
          })
          .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
            alert('Image uploaded successfully!');
            window.location.reload()
            // Close the popup form after successful upload
            setShowPopup(false);
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
            alert('Error uploading image. Please try again.');
          });
      });
    }).catch((error) => {
      console.error('Error uploading file: ', error);
      alert('Error uploading image. Please try again.');
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='edit-popup'>
      <h2>Upload Image</h2>
        <input type="file" id="imageFile" accept="image/*" required onChange={handleFileChange} />
        <button className='editButton' type="submit">Upload</button>
        {/* Add a button to cancel and close the popup form */}
        <button className='deleteButton' type="button" onClick={() => setShowPopup(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default UploadImageComponent;
