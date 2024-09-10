import React, { useEffect, useState } from 'react'
import DashboardPage from '../../DashboardPage'
import './AdminNavbar.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import firebaseConfig from '../../../firebase/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

const AdminNavbar = () => {
    const [userData, setUserData] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State for controlling the popup form

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRef = firebase.firestore().collection('contactInfonavbar');
                const snapshot = await userRef.get();
                const userDataArray = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    userDataArray.push({
                        id: doc.id,
                        email: data.email,
                        phoneNumber: data.phonenumber,
                    });
                });
                setUserData(userDataArray);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
        setEditedEmail(user.email);
        setEditedPhoneNumber(user.phoneNumber);
    };

    const handleSaveChanges = async () => {
        try {
            await db.collection('contactInfonavbar').doc(editingUser.id).update({
                email: editedEmail,
                phonenumber: editedPhoneNumber,
            });
            // Refresh user data after saving changes
            const updatedUserData = userData.map(user => {
                if (user.id === editingUser.id) {
                    return {
                        ...user,
                        email: editedEmail,
                        phoneNumber: editedPhoneNumber
                    };
                }
                return user;
            });
            setUserData(updatedUserData);
            setEditingUser(null);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await db.collection('contactInfonavbar').doc(id).delete();
                // Remove the deleted user from the user data array
                const updatedUserData = userData.filter(user => user.id !== id);
                setUserData(updatedUserData);
            } catch (error) {
                console.error('Error deleting user data:', error);
            }
        }
    };

    //Social Media 
    const [socialMediaData, setSocialMediaData] = useState([]);
    const [editingSocialMedia, setEditingSocialMedia] = useState(null);
    const [editedPlatform, setEditedPlatform] = useState('');
    const [editedLink, setEditedLink] = useState('');
    const [platform, setPlatform] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        const fetchSocialMediaData = async () => {
            try {
                const socialMediaRef = firebase.firestore().collection('socialMediaLinks');
                const snapshot = await socialMediaRef.get();
                const socialMediaDataArray = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    socialMediaDataArray.push({
                        id: doc.id,
                        platform: data.platform,
                        link: data.link
                    });
                });
                setSocialMediaData(socialMediaDataArray);
            } catch (error) {
                console.error('Error fetching social media data:', error);
            }
        };

        fetchSocialMediaData();
    }, []);

    const handleEditSocial = socialMedia => {
        setEditingSocialMedia(socialMedia);
        setEditedPlatform(socialMedia.platform);
        setEditedLink(socialMedia.link);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Access your Firestore collection
            const socialMediaRef = firebase.firestore().collection('socialMediaLinks');

            // Add the submitted data to the collection
            await socialMediaRef.add({
                platform: platform,
                link: link
            });

            // Clear the form fields after successful submission
            setPlatform('');
            setLink('');

            alert('New social media icon added successfully!');
            window.location.reload()
        } catch (error) {
            console.error('Error adding social media icon:', error);
        }
    };

    const handleCancelsubmit = () => {
        setPlatform('');
        setLink('');
        setShowPopup(false); // Close the popup form
    };

    const handleSaveChangesSocial = async () => {
        try {
            await db.collection('socialMediaLinks').doc(editingSocialMedia.id).update({
                platform: editedPlatform,
                link: editedLink
            });
            const updatedSocialMediaData = socialMediaData.map(item => {
                if (item.id === editingSocialMedia.id) {
                    return {
                        ...item,
                        platform: editedPlatform,
                        link: editedLink
                    };
                }
                return item;
            });
            setSocialMediaData(updatedSocialMediaData);
            setEditingSocialMedia(null);
        } catch (error) {
            console.error('Error updating social media data:', error);
        }
    };

    const handleCancelEditSocial = () => {
        setEditingSocialMedia(null);
    };

    const handleDeleteSocial = async id => {
        const confirmDelete = window.confirm('Are you sure you want to delete this social media entry?');
        if (confirmDelete) {
            try {
                await db.collection('socialMediaLinks').doc(id).delete();
                const updatedSocialMediaData = socialMediaData.filter(item => item.id !== id);
                setSocialMediaData(updatedSocialMediaData);
            } catch (error) {
                console.error('Error deleting social media data:', error);
            }
        }
    };

    //  footer newsletter
    const [newsletterContent, setNewsletterContent] = useState({});
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState({});
    const [editedValue, setEditedValue] = useState({});

    useEffect(() => {
        const fetchNewsletterContent = async () => {
            try {
                const newsletterContentRef = await firebase.firestore()
                    .collection('newsletterContent')
                    .doc('content')
                    .get();
                if (newsletterContentRef.exists) {
                    setNewsletterContent(newsletterContentRef.data());
                }
            } catch (error) {
                console.error('Error fetching newsletter content:', error);
                setError('Error fetching content. Please try again later.');
            }
        };

        fetchNewsletterContent();
    }, []);

    const handleEditNew = (field) => {
        setEditMode(prev => ({ ...prev, [field]: true }));
        setEditedValue(prev => ({ ...prev, [field]: newsletterContent[field] }));
    };

    const handleSave = async (field) => {
        try {
            const updates = { [field]: editedValue[field] };
            await firebase.firestore().collection('newsletterContent').doc('content').update(updates);
            setEditMode(prev => ({ ...prev, [field]: false }));
            window.location.reload()
        } catch (error) {
            console.error('Error saving content:', error);
            setError('Error saving content. Please try again later.');
        }
    };

    const handleCancel = (field) => {
        setEditMode(prev => ({ ...prev, [field]: false }));
    };

    const handleChange = (e, field) => {
        const { value } = e.target;
        setEditedValue(prev => ({ ...prev, [field]: value }));
    };

    const handleDeleteField = async (field) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this social media entry?');
        if (confirmDelete) {
            try {
                await firebase.firestore().collection('newsletterContent').doc('content').update({
                    [field]: firebase.firestore.FieldValue.delete()
                });
            } catch (error) {
                console.error('Error deleting field:', error);
                setError('Error deleting field. Please try again later.');
            }
        }
    };

    return (
        <div>
            <DashboardPage />
            <h2>Email And Phone Number</h2>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>
                                <button onClick={() => handleEdit(user)} className='editButton'>Edit</button>
                                <button onClick={() => handleDelete(user.id)} className='deleteButton'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingUser && (
                <div className="editForm">
                    <h2>Edit User</h2>
                    <label>Email:</label>
                    <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                    <label>Phone Number:</label>
                    <input type="text" value={editedPhoneNumber} onChange={(e) => setEditedPhoneNumber(e.target.value)} />
                    <button onClick={handleSaveChanges}>Save Changes</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            )}
            <div>
                <h2>Social Media Icons</h2>
                {/* <button className="addButtonSocial" onClick={() => setShowPopup(true)}>Add New Icon</button> */}
                <table>
                    <thead>
                        <tr>
                            <th>Platform</th>
                            <th>Link</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {socialMediaData.map(socialMedia => (
                            <tr key={socialMedia.id}>
                                <td>{socialMedia.platform}</td>
                                <td>{socialMedia.link}</td>
                                <td>
                                    <button onClick={() => handleEditSocial(socialMedia)} className="editButtonsocial">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteSocial(socialMedia.id)} className="deleteButtonsocial">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingSocialMedia && (
                    <div className="editForm">
                        <h2>Edit Social Media Entry</h2>
                        <label>Platform:</label>
                        <input type="text" value={editedPlatform} onChange={e => setEditedPlatform(e.target.value)} />
                        <label>Link:</label>
                        <input type="text" value={editedLink} onChange={e => setEditedLink(e.target.value)} />
                        <button onClick={handleSaveChangesSocial}>Save Changes</button>
                        <button onClick={handleCancelEditSocial}>Cancel</button>
                    </div>
                )}
                {showPopup && (
                    <div className="popupForm">
                        <h2>Add New Social Media Icon</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Platform:</label>
                            <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} />
                            <label>Link:</label>
                            <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
                            <button type="submit">Add</button>
                            <button type="button" onClick={handleCancelsubmit}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
            <div>
                <h2>Newsletter of Footer</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(newsletterContent).map(([field, value]) => (
                            <tr key={field}>
                                <td>{field}</td>
                                <td>
                                    {editMode[field] ? (
                                        <input type="text" value={editedValue[field]} onChange={(e) => handleChange(e, field)} />
                                    ) : (
                                        <span>{value}</span>
                                    )}
                                </td>
                                <td>
                                    {editMode[field] ? (
                                        <>
                                            <button className='editButton' onClick={() => handleSave(field)}>Save</button>
                                            <button className='deleteButton' onClick={() => handleCancel(field)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='editButton' onClick={() => handleEditNew(field)}>Edit</button>
                                            <button className='deleteButton' onClick={() => handleDeleteField(field)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminNavbar;