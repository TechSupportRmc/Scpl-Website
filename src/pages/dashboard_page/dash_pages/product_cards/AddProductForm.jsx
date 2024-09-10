import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import firebaseConfig from '../../../firebase/firebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AddProductForm = ({ setShowAddProductPopup }) => {
    const [sliderId, setId] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [button_name, setButtonName] = useState('');
    const [button_link, setButtonLink] = useState('');
    const [linkImg, setLinkImg] = useState(null); // State to hold the image URL
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!linkImg) {
        alert('Please select an image');
        return;
      }
  
      try {
        setIsSubmitting(true); // Set submitting state to true during form submission
  
        // Store product data in Firestore
        await firebase.firestore().collection('product').add({
          sliderId,
          title,
          category,
          button_name,
          button_link,
          linkImg, // Store the image URL
        });
  
        // Reset form fields and close the popup form
        setId('');
        setTitle('');
        setCategory('');
        setButtonName('');
        setButtonLink('');
        setLinkImg(null);
        setShowAddProductPopup(false);
        alert("Product Added");
      } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
      } finally {
        setIsSubmitting(false); // Reset submitting state after form submission
      }
    };
  
    const handleCancel = () => {
      setShowAddProductPopup(false);
    };
  
    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      setLinkImg(null); // Reset image URL when a new image is selected
  
      try {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`www.scpl.biz/upload/product_images/${file.name}`);
        await imageRef.put(file);
        const imageUrl = await imageRef.getDownloadURL();
  
        // Store the image URL in the state
        setLinkImg(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    };
  
    return (
      <div className="edit-popup">
        <div className="popup-content">
          <h2>Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="SliderId" value={sliderId} onChange={(e) => setId(e.target.value)} />
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input type="text" placeholder="Button Name" value={button_name} onChange={(e) => setButtonName(e.target.value)} />
            <input type="text" placeholder="Button Link" value={button_link} onChange={(e) => setButtonLink(e.target.value)} />
            {/* Add input for image selection */}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button className='editbutton' type="submit" disabled={!linkImg || isSubmitting}>Add</button>
            <button className='deletebutton' type="button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddProductForm;
