import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductCards.css';
import Dashboard from '../../DashboardPage';
import AddProductForm from './AddProductForm';
import firebaseConfig from '../../../firebase/firebaseConfig';

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(firebaseApp);

const ProductCards = () => {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newButtonName, setNewButtonName] = useState('');
  const [newButtonLink, setNewButtonLink] = useState('');
  const [newLinkImg, setNewLinkImg] = useState('');
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('product').orderBy('sliderId').get();
      const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(fetchedData);
    };

    fetchData();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewTitle(item.title);
    setNewCategory(item.category);
    setNewButtonName(item.button_name);
    setNewButtonLink(item.button_link);
    setNewLinkImg(item.linkImg);
  };

  const handleSaveEdit = async () => {
    await db.collection('product').doc(editingItem.id).update({
      title: newTitle,
      category: newCategory,
      button_name: newButtonName,
      button_link: newButtonLink,
      linkImg: newLinkImg,
    });
    const response = await db.collection('product').get();
    const fetchedData = response.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    alert("Data is Updated");
    setData(fetchedData);
    setEditingItem(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    if (confirmDelete) {
      try {
        await db.collection('product').doc(id).delete();
        setData(prevData => prevData.filter(item => item.id !== id));
        alert('Document successfully deleted!');
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  return (
    <div>
      <Dashboard />
      <h2>Slider Products</h2>
      <button type='button' className='createuser-btn' onClick={() => setShowAddProductPopup(true)}>Add Product</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Button Name</th>
            <th>Button Link</th>
            <th>Image</th> {/* Updated column header */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.button_name}</td>
              <td>{item.button_link}</td>
              <td>
                <img 
                  src={item.linkImg} 
                  alt={item.title} 
                  style={{ width: '100px', height: 'auto' }} // Adjust width and height as needed
                />
              </td>
              <td>
                <button className='editbutton' onClick={() => handleEdit(item)}>Edit</button>
                <button className='deletebutton' onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingItem && (
        <div className="edit-popup">
          <h2>Edit Item</h2>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          <input type="text" value={newButtonName} onChange={(e) => setNewButtonName(e.target.value)} />
          <input type="text" value={newButtonLink} onChange={(e) => setNewButtonLink(e.target.value)} />
          <input type="text" value={newLinkImg} onChange={(e) => setNewLinkImg(e.target.value)} />
          <button className="save" onClick={handleSaveEdit}>Save</button>
          <button className="cancel" onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
      {showAddProductPopup && <AddProductForm setShowAddProductPopup={setShowAddProductPopup} />}
      <ToastContainer />
    </div>
  );
};

export default ProductCards;
