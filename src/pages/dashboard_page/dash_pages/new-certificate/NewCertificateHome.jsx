import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import UploadCertificate from './UploadCertificate';
import firebaseConfig from '../../../firebase/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const storage = firebase.storage(app);

const NewCertificateHome = () => {
  const [aboutData, setAboutData] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('Newcertificates').orderBy('title').get();
      const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAboutData(fetchedData);
    };

    fetchData();
  }, []);

  const handleEdit = (item) => {
    setIsEditing(item);
    setSectionTitle(item.title);
    setImageUrl(item.imageUrl || '');
    setPdfUrl(item.pdfUrl || '');
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      let imageUrlToUpdate = imageUrl || '';
      let pdfUrlToUpdate = pdfUrl || '';

      if (imageFile) {
        const imageStorageRef = storage.ref();
        const imageFileRef = imageStorageRef.child('www.scpl.biz/upload/Newcertificate/images/' + imageFile.name);
        await imageFileRef.put(imageFile);
        imageUrlToUpdate = await imageFileRef.getDownloadURL();
      }

      if (pdfFile) {
        const pdfStorageRef = storage.ref();
        const pdfFileRef = pdfStorageRef.child('www.scpl.biz/upload/PDFs/' + pdfFile.name);
        await pdfFileRef.put(pdfFile);
        pdfUrlToUpdate = await pdfFileRef.getDownloadURL();
      }

      const updatedData = {
        title: sectionTitle,
        imageUrl: imageUrlToUpdate,
        pdfUrl: pdfUrlToUpdate
      };

      await db.collection('Newcertificates').doc(isEditing.id).update(updatedData);

      alert("Home Page Certificates Section is Updated");
      window.location.reload();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    if (confirmDelete) {
      await db.collection('Newcertificates').doc(id).delete();
      setAboutData(aboutData.filter(item => item.id !== id));
    }
  };

  return (
    <div>
      <h2>New Certificates</h2>
      <button type='button' className='createuser-btn' onClick={() => setShowPopup(true)}>Add Certificate</button>
      {showPopup && <UploadCertificate setShowPopup={setShowPopup} />}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>PDF</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {aboutData.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt="Preview" className='image-preview' />
                ) : (
                  'No Image'
                )}
              </td>
              <td>
                {item.pdfUrl ? (
                  <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
                ) : (
                  'No PDF'
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

      {isEditing && (
        <div className="edit-form">
          <h3>Edit Certificate</h3>
          <label>Section Title:</label>
          <input type="text" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />
          {imageUrl && <img src={imageUrl} alt="Preview" className='image-preview' />}
          <label>PDF:</label>
          <input type="file" onChange={handlePdfChange} />
          {pdfUrl && (
            <div>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
            </div>
          )}
          <button className='editButton' onClick={handleSave}>Submit</button>
          <button className='deleteButton' onClick={handleClose}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default NewCertificateHome;
