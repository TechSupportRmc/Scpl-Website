import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import UploadImageComponent from './UploadImageComponent';
import firebaseConfig from '../../../firebase/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const storage = firebase.storage(app);

const CertificatesHome = () => {
  const [aboutData, setAboutData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('certificates').orderBy('name').get();
      const fetchedData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAboutData(fetchedData);
    };

    fetchData();
  }, []);

  const handleEdit = (item) => {
    setIsEditing(item);
    setSectionTitle(item.name);
    setImageUrl(item.url); // Set imageUrl here
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      let imageUrlToUpdate = imageUrl || ''; // Default to current imageUrl or an empty string

      if (imageFile) {
        // If image file is selected, upload to Firebase Storage
        const storageRef = storage.ref();
        const fileRef = storageRef.child('www.scpl.biz/upload/about-bulk/bulk/' + imageFile.name);
        await fileRef.put(imageFile);
        imageUrlToUpdate = await fileRef.getDownloadURL();
      }

      // Update other fields without changing imageUrl unless a new image file is selected
      const updatedData = {
        name: sectionTitle,
      };

      if (imageFile) {
        updatedData.url = imageUrlToUpdate;
      }

      await db.collection('certificates').doc(isEditing.id).update(updatedData);

      alert("Home Page Certificates Section is Updated");
      // Reload the page after save
      window.location.reload();
      setIsEditing(null);
    } catch (error) {
      console.error('Error updating document:', error);
      // Handle error here, maybe show a user-friendly message
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    if (confirmDelete) {
      try {
        await db.collection('certificates').doc(id).delete();
        setAboutData(prevData => prevData.filter(item => item.id !== id));
        console.log('Document successfully deleted!');
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  return (
    <div>
      <div>
        <h2>Home Page Certificates Section</h2>
        <button type='button' className='createuser-btn' onClick={() => setShowPopup(true)}>Add Certificate</button>
        {showPopup && <UploadImageComponent setShowPopup={setShowPopup} />}
        {aboutData && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th> {/* Changed from Image URL to Image */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {aboutData.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    {/* Display image preview if available */}
                    {item.url ? (
                      <img src={item.url} alt="Preview" className='image-preview' />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>
                    <button className='editbutton' onClick={() => handleEdit(item)}>Edit</button>
                    <button className='deletebutton' onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {isEditing && (
          <div className="edit-popup">
            <div className="popup-content">
              <h3>Edit Certificates Data</h3>
              <label>Section Title:</label>
              <input type="text" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
              <label>Image:</label>
              <input type="file" onChange={handleFileChange} />
              {imageUrl && <img src={imageUrl} alt="Preview" className='image-preview' />}
              <button className="save" onClick={handleSave}>Save</button>
              <button className="cancel" onClick={handleClose}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CertificatesHome;
