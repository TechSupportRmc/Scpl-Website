import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/context/AuthContext'; // Import useAuth
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DashboardPage.css';

const DashboardPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // Use user and logout from context

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate('/adminlogin', { replace: true });
      toast.success('Logout successful');
    } catch (error) {
      console.error('Error during logout: ', error.message);
      toast.error('Error during logout: ' + error.message);
    }
  };

  const createUser = () => {
    navigate('/createuser');
  };

  // Ensure user is defined before accessing its properties
  const isUserDefined = user && user.role;

  return (
    <div>
      <header className='header-dash'>
        <img src='/logo.png' alt='Logo' className='logo' />
        <nav className='dash-nav'>
          {isUserDefined && (user.role === 'admin' || user.role === 'editor') && (
            <a href="/adminnavbar">Navbar & Footer</a>
          )}
          {isUserDefined && (user.role === 'admin' || user.role === 'editor') && (
            <div className='dropdown'>
              <button className='dropbtn' onClick={() => setDropdownOpen(!dropdownOpen)}>
                Home & About Items
              </button>
              <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                <a href="/herohome">HomePage Hero-Section</a>
                <a href="/homecards">HomePage Cards Section</a>
                <a href="/homeaboutbulk">About-Bulk-Certificates Section</a>
                <a href="/product-cards">Slider Cards_Product</a>
              </div>
            </div>
          )}
          {isUserDefined && (user.role === 'admin' || user.role === 'pratik') && (
            <a href="/dataofcompliances">Compliance</a>
          )}
          {isUserDefined && (user.role === 'admin' || user.role === 'hr') && (
            <a href="/contactform">Contact Forms Data</a>
          )}
          <button className='logout' onClick={handleLogout}>
            Logout <i className="fa-solid fa-right-from-bracket"></i>
          </button>
          {isUserDefined && (user.role === 'admin') && (
          <button className='user' onClick={createUser}>
            Create User <i className="fa-solid fa-right-from-bracket"></i>
          </button>
          )}
        </nav>
      </header>
      <ToastContainer />
    </div>
  );
};

export default DashboardPage;
