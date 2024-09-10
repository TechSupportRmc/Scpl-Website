import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import DashboardPage from '../../DashboardPage';
import './HomeHero.css';
import firebaseConfig from '../../../firebase/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const storage = firebase.storage(app); // Initialize storage

const HomePageHero = () => {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newVideoSrc, setNewVideoSrc] = useState('');
  const [newVideoFile, setNewVideoFile] = useState(null); // State to hold the uploaded video file

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('homepageHerosection').get();
      const fetchedData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(fetchedData);
    };

    fetchData();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewTitle(item.title);
    setNewDescription(item.description);
    setNewVideoSrc(item.videoSrc);
  };

  const handleSaveEdit = async () => {
    // If a new video file is uploaded, upload it to Firebase storage first
    let newVideoUrl = newVideoSrc; // Default to current video URL

    if (newVideoFile) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`www.scpl.biz/upload/homepageHerosection/videos/${newVideoFile.name}`);
      await fileRef.put(newVideoFile);
      newVideoUrl = await fileRef.getDownloadURL();
    }

    await db.collection('homepageHerosection').doc(editingItem.id).update({
      title: newTitle,
      description: newDescription,
      videoSrc: newVideoUrl // Update with new video URL
    });

    alert("HomePage Hero Section is Updated");
    // Reload the page after save
    window.location.reload();
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    if (confirmDelete) {
      await db.collection('homepageHerosection').doc(id).delete();
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleFileChange = (e) => {
    // Set the selected file in state
    const file = e.target.files[0];
    setNewVideoFile(file);
  };

  return (
    <div>
      <DashboardPage />
      <h2>Hero Section of Home Page</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Video</th> {/* Updated column header */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                {item.videoSrc ? (
                  <video width="200" controls autoPlay muted>
                    <source src={item.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  'No Video'
                )}
              </td>
              <td>
                <button className="editButtonsocial" onClick={() => handleEdit(item)}>Edit</button>
                <button className="deleteButtonsocial" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Popup */}
      {editingItem && (
        <div className="edit-popup">
          <h2>Edit Item</h2>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
          <input type="file" accept="video/*" onChange={handleFileChange} /> {/* File upload input */}
          <button className="save" onClick={handleSaveEdit}>Save</button>
          <button className="cancel" onClick={() => setEditingItem(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default HomePageHero;
