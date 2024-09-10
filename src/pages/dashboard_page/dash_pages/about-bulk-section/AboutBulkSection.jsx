import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import DashboardPage from '../../DashboardPage';
import BulkDrugsHome from './BulkDrugsHome';
import CertificatesHome from './CertificatesHome';
import NewCertificateHome from '../new-certificate/NewCertificateHome';
import firebaseConfig from '../../../firebase/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const storage = firebase.storage(app);

const AboutBulkSection = () => {
  const [aboutData, setAboutData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [mainTitle, setMainTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('about-bulk').get();
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
    setSectionTitle(item.sectionTitle);
    setCompanyName(item.companyName);
    setMainTitle(item.mainTitle);
    setDescription(item.description);
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
        const fileRef = storageRef.child('www.scpl.biz/upload/about-bulk/about/' + imageFile.name);
        await fileRef.put(imageFile);
        imageUrlToUpdate = await fileRef.getDownloadURL();
      }

      // Update other fields without changing imageUrl unless a new image file is selected
      const updatedData = {
        sectionTitle: sectionTitle,
        companyName: companyName,
        mainTitle: mainTitle,
        description: description,
      };

      if (imageFile) {
        updatedData.url = imageUrlToUpdate;
      }

      await db.collection('about-bulk').doc(isEditing.id).update(updatedData);

      alert("Home Page About Section is Updated");
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
        await db.collection('about-bulk').doc(id).delete();
        setAboutData(prevData => prevData.filter(item => item.id !== id));
        console.log('Document successfully deleted!');
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  return (
    <div>
      <DashboardPage />
      <div>
        <h2>Home Page About Section</h2>
        {aboutData && (
          <table>
            <thead>
              <tr>
                <th>Section Title</th>
                <th>Company Name</th>
                <th>Main Title</th>
                <th>Description</th>
                <th>Image</th> {/* Changed from Image URL to Image */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {aboutData.map(item => (
                <tr key={item.id}>
                  <td>{item.sectionTitle}</td>
                  <td>{item.companyName}</td>
                  <td>{item.mainTitle}</td>
                  <td>{item.description}</td>
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
              <h3>Edit About Data</h3>
              <label>Section Title:</label>
              <input type="text" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
              <label>Company Name:</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              <label>Main Title:</label>
              <input type="text" value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} />
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              <label>Image:</label>
              <input type="file" onChange={handleFileChange} />
              {imageUrl && <img src={imageUrl} alt="Preview" className='image-preview' />}
              <button className="save" onClick={handleSave}>Save</button>
              <button className="cancel" onClick={handleClose}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      <BulkDrugsHome/>
      <CertificatesHome/>
      <NewCertificateHome/>
    </div>
  )
}
export default AboutBulkSection;
