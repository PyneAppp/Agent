import React, { useState } from "react";
import "./NavBar.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Shield, LogOut, User } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import AdminLogin from "../../components/Admin/AdminLogin";
import ProfessionalsRegistration from "../../components/ProfessionalsRegistration/professionalsRegistration";
import UserLogin from "../../components/Auth/UserLogin";
import AccommodationApp from "../accomodation/Accomodation";

export default function NavBar() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const { isAdmin, isUser, userRole, userCredentials, logout } = useAdmin();

  const handleAdminAction = () => {
    if (isAdmin) {
      logout();
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleUserAction = () => {
    if (isUser) {
      logout();
    } else {
      setShowUserLogin(true);
    }
  };

  return (
    <div className="nav">
      <div className="left">
        <img src={logo}></img>
        <h1 style={{ color: "#3b82f6", marginRight: "50px" }}>ToraBasa</h1>
        <ul>
          <Link to={"/"}>
            <li>HOME</li>
          </Link>
          <Link to={"/accomodation"}>
            <li>HOUSES</li>
          </Link>
          <Link to={"/hire"}>
            <li>HIRE</li>
          </Link>
          <Link to={"/jobs"}>
            <li>JOBS</li>
          </Link>
        </ul>
      </div>
      <div className="right">
        {" "}
        <ul>
          {!userRole ? (
            <>
              <li className="user-section">
                <button 
                  className="user-btn" 
                  onClick={handleUserAction}
                >
                  <User size={18} />
                  <span>Sign In</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="user-info">
                <span className={`role-badge ${userRole}`}>
                  {userRole === 'admin' ? '👑 Admin' : '👤 User'}
                </span>
                <span className="username">
                  {userCredentials?.username || 'User'}
                </span>
              </li>
              <li className="logout-section">
                <button 
                  className="logout-btn" 
                  onClick={logout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
          
          {!userRole && (
            <li className="admin-section">
              <button 
                className="admin-btn" 
                onClick={handleAdminAction}
              >
                <Shield size={18} />
                <span>Admin</span>
              </button>
            </li>
          )}
        </ul>
      </div>
      
      <AdminLogin 
        isOpen={showAdminLogin} 
        onClose={() => setShowAdminLogin(false)} 
      />
      
      <UserLogin 
        isOpen={showUserLogin} 
        onClose={() => setShowUserLogin(false)} 
      />
    </div>
  );
}
