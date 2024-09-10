import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import Dashboard from '../../DashboardPage';
import './DataOfCompliances.css';
import firebaseConfig from '../../../firebase/firebaseConfig';

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

const AddComplianceForm = ({ onClose, fetchCategoryData }) => {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('environment-clearances');
    const [pdfFile, setPdfFile] = useState(null);

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pdfFile) {
            const storageRef = firebase.storage().ref();
            const pdfRef = storageRef.child(`www.scpl.biz/upload/NewCompliances/pdfs/${pdfFile.name}`);
            try {
                const snapshot = await pdfRef.put(pdfFile);
                const url = await snapshot.ref.getDownloadURL();
                await firestore.collection('dataofcompliances').add({
                    description,
                    category,
                    pdfUrl: url,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                fetchCategoryData('environment-clearances');
                fetchCategoryData('compliance-reports');
                fetchCategoryData('environmental-statements');
                setDescription('');
                setCategory('environment-clearances');
                setPdfFile(null);
                onClose();
                alert('Compliance added successfully!');
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };

    return (
        <div className="edit-popup">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Add Compliance</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="environment-clearances">Environment Clearances</option>
                        <option value="compliance-reports">Environment Clearance Compliance Reports</option>
                        <option value="environmental-statements">Environmental Statement (Form V)</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="pdfFile">PDF File</label>
                    <input type="file" id="pdfFile" accept=".pdf" onChange={handleFileChange} />
                </div>
                <div>
                    <button className='save' type="submit">Add Compliance</button>
                </div>
            </form>
        </div>
    );
};

const DataOfCompliances = () => {
    const [complianceItems, setComplianceItems] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [addingCompliance, setAddingCompliance] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await firestore.collection('dataofcompliances')
                    .orderBy('createdAt', 'desc')
                    .get();

                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }

                const items = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt instanceof firebase.firestore.Timestamp ? data.createdAt.toDate() : data.createdAt
                    };
                });
                setComplianceItems(items);
            } catch (error) {
                console.error('Error fetching compliance data:', error);
            }
        };

        fetchData();
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setPdfFile(selectedFile);
            setError(null);
        } else {
            setPdfFile(null);
            setError('Please select a valid PDF file');
        }
    };

    const handleEdit = (item) => {
        console.log('Edit button clicked', item); // Debugging line
        setEditingItem(item);
        setDescription(item.description || '');
        setModalVisible(true);
    };

    const handleUpdate = async () => {
        try {
            let downloadURL = editingItem.pdfUrl;

            if (pdfFile) {
                const storageRef = firebase.storage().ref(`www.scpl.biz/upload/NewCompliances/pdfs/${pdfFile.name}`);
                const uploadTask = storageRef.put(pdfFile);

                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setProgress(progress);
                        },
                        (error) => {
                            setError('Error uploading file: ' + error.message);
                            reject(error);
                        },
                        async () => {
                            downloadURL = await storageRef.getDownloadURL();
                            resolve();
                        }
                    );
                });
            }

            // Ensure description is not undefined or empty
            const updatedDescription = description || editingItem.description;

            if (!updatedDescription) {
                setError('Description cannot be empty.');
                return;
            }

            const updatedData = {
                description: updatedDescription,
                pdfUrl: downloadURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            };

            await firestore.collection('dataofcompliances').doc(editingItem.id).update(updatedData);

            setEditingItem(null);
            setPdfFile(null);
            setProgress(0);
            setError(null);
            alert('Compliance updated successfully!');
            setModalVisible(false);
            window.location.reload();
        } catch (error) {
            setError('Error updating compliance: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this compliance entry?');
        if (confirmDelete) {
            try {
                await firestore.collection('dataofcompliances').doc(id).delete();
                setComplianceItems(complianceItems.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting compliance entry:', error);
            }
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp instanceof Date ? timestamp : timestamp.toDate();
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditingItem(null);
        setPdfFile(null);
        setDescription('');
    };

    const openAddComplianceForm = () => {
        setAddingCompliance(true);
    };

    const closeAddComplianceForm = () => {
        setAddingCompliance(false);
    };

    const fetchCategoryData = async (category) => {
        try {
            const snapshot = await firestore.collection('dataofcompliances')
                .where('category', '==', category)
                .orderBy('createdAt', 'desc')
                .get();

            const items = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt instanceof firebase.firestore.Timestamp ? data.createdAt.toDate() : data.createdAt
                };
            });
            setComplianceItems(items);
        } catch (error) {
            console.error('Error fetching compliance data:', error);
        }
    };

    const handelStyle = {
        float: 'right',
        marginRight: '2rem',
    };

    return (
        <div>
            <Dashboard />

            <div className="compliance-table-container">
                <button style={handelStyle} className='editbutton' onClick={openAddComplianceForm}>Add Compliance</button>
                <h2>Compliances & Clearances Table</h2>

                <table className="compliance-table">
                    <thead>
                        <tr>
                            <th>Time Stamp</th>
                            <th>Description</th>
                            <th>PDF</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complianceItems.map(item => (
                            <tr key={item.id}>
                                <td>{formatDate(item.createdAt)}</td>
                                <td>{item.description}</td>
                                <td>
                                    {item.pdfUrl ? (
                                        <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
                                    ) : (
                                        <span>No PDF available</span>
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

                {modalVisible && (
                    <div className="edit-popup">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h3>Edit Compliance</h3>
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf"
                        />
                        <button className="save" onClick={handleUpdate}>Update</button>
                        <button className="cancel" onClick={closeModal}>Cancel</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {progress > 0 && <progress value={progress} max="100" />}
                    </div>
                )}

                {addingCompliance && (
                    <AddComplianceForm
                        onClose={closeAddComplianceForm}
                        fetchCategoryData={fetchCategoryData}
                    />
                )}
            </div>
        </div>
    );   
};

export default DataOfCompliances;
