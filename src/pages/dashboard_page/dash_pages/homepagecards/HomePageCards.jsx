import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import DashboardPage from '../../DashboardPage';
// import NewCertificateHome from '../new-certificate/NewCertificateHome';
import firebaseConfig from '../../../firebase/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

const HomePageCards = () => {
    const [data, setData] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newText, setNewText] = useState('');
    const [newLink, setNewLink] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await db.collection('cardsData').get();
            const fetchedData = response.docs.map(doc => ({
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
        setNewText(item.text);
        setNewLink(item.link);
    };

    const handleSaveEdit = async () => {
        await db.collection('cardsData').doc(editingItem.id).update({
            title: newTitle,
            text: newText,
            link: newLink,
        });

        // Refresh data after edit
        const response = await db.collection('cardsData').get();
        const fetchedData = response.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        alert("Data is Updated")
        setData(fetchedData);

        // Close edit popup
        setEditingItem(null);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            try {
                await db.collection('cardsData').doc(id).delete();
                setData(data.filter(item => item.id !== id));
                console.log("Item deleted:", id);
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    return (
        <div>
            <DashboardPage />
            <h2>Home Page Cards Section</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Text</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.text}</td>
                            <td>
                                <button className='editButton' onClick={() => handleEdit(item)}>Edit</button>
                                <button className='deleteButton' onClick={() => handleDelete(item.id)}>Delete</button>
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
                    <input type='text' value={newText} onChange={(e) => setNewText(e.target.value)} />
                    <input type='text' value={newLink} onChange={(e) => setNewLink(e.target.value)} />
                    <button className="save" onClick={handleSaveEdit}>Save</button>
                    <button className="cancel" onClick={() => setEditingItem(null)}>Cancel</button>
                </div>
            )}
        </div>
    )
}

export default HomePageCards
