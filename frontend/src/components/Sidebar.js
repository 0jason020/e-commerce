import React from 'react';
import { Link } from 'react-router-dom';
import { X, User, ChevronRight, LogIn, ShoppingBag, Settings, HelpCircle, Smartphone, Monitor, Watch, Headphones, Gamepad2, Camera, MousePointer2, Briefcase, Mail } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, user }) => {
  const kikuuCategories = [
    { name: "Electronics", icon: <Monitor size={18} /> },
    { name: "Smartphones", icon: <Smartphone size={18} /> },
    { name: "Laptops", icon: <Monitor size={18} /> },
    { name: "Watches", icon: <Watch size={18} /> },
    { name: "Audio & Headphones", icon: <Headphones size={18} /> },
    { name: "Gaming", icon: <Gamepad2 size={18} /> },
    { name: "Cameras", icon: <Camera size={18} /> },
    { name: "Accessories", icon: <MousePointer2 size={18} /> }
  ];

  const BRAND_BLUE = '#008ECC';

  return (
    <>
      {isOpen && <div onClick={onClose} style={overlayStyle} />}

      <div style={{ ...sidebarPanel, left: isOpen ? '0' : '-350px' }}>
        <div style={{...sidebarHeader, backgroundColor: BRAND_BLUE}}>
          <div style={userProfileInfo}>
            <div style={avatarCircle}><User size={24} color={BRAND_BLUE} /></div>
            <span style={greetingText}>{user ? `Hello, ${user.email.split('@')[0]}` : 'Hello, Guest'}</span>
          </div>
          <X size={24} onClick={onClose} style={{ cursor: 'pointer', opacity: 0.8 }} />
        </div>

        <div style={sidebarScrollArea}>
          {/* Shop Categories */}
          <div style={sectionWrapper}>
            <h3 style={sectionTitle}>Shop By Category</h3>
            <ul style={listContainer}>
              {kikuuCategories.map((cat) => (
                <li key={cat.name} style={listItem}>
                  <Link to={`/category/${cat.name.toLowerCase()}`} onClick={onClose} style={navLink}>
                    <div style={iconLabelGroup}>{cat.icon} <span>{cat.name}</span></div>
                    <ChevronRight size={18} color="#ccc" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div style={divider} />

          {/* Quick Support Links */}
          <div style={sectionWrapper}>
            <h3 style={sectionTitle}>Support & Business</h3>
            <ul style={listContainer}>
              <li style={listItem}>
                <Link to="/contact-us" onClick={onClose} style={navLink}>
                  <div style={iconLabelGroup}><Mail size={18} /> <span>Contact us</span></div>
                </Link>
              </li>
              <li style={listItem}>
                <Link to="/partnership" onClick={onClose} style={navLink}>
                  <div style={iconLabelGroup}><Briefcase size={18} /> <span>Business Partnership</span></div>
                </Link>
              </li>
              <li style={listItem}>
                <Link to="/about" onClick={onClose} style={navLink}>
                  <div style={iconLabelGroup}><HelpCircle size={18} /> <span>About us</span></div>
                </Link>
              </li>
            </ul>
          </div>

          <div style={divider} />

          {/* Account Settings */}
          <div style={sectionWrapper}>
            <h3 style={sectionTitle}>Account</h3>
            <ul style={listContainer}>
              <li style={listItem}>
                <Link to="/profile" onClick={onClose} style={navLink}>
                  <div style={iconLabelGroup}><Settings size={18} /> <span>Your Account</span></div>
                </Link>
              </li>
              {!user ? (
                <li style={listItem}>
                  <Link to="/login" onClick={onClose} style={navLink}>
                    <div style={iconLabelGroup}><LogIn size={18} /> <span>Sign In</span></div>
                  </Link>
                </li>
              ) : (
                <li style={listItem}>
                  <button onClick={onClose} style={logoutActionBtn}>Sign Out</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

// Styles remain the same as your provided code
const overlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(2px)', zIndex: 1000 };
const sidebarPanel = { position: 'fixed', top: 0, width: '320px', height: '100%', backgroundColor: '#fff', zIndex: 1001, transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column', boxShadow: '10px 0 25px rgba(0,0,0,0.1)' };
const sidebarHeader = { color: 'white', padding: '25px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
const userProfileInfo = { display: 'flex', alignItems: 'center', gap: '12px' };
const avatarCircle = { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const greetingText = { fontSize: '18px', fontWeight: '700', letterSpacing: '0.5px' };
const sidebarScrollArea = { flex: 1, overflowY: 'auto', paddingBottom: '40px' };
const sectionWrapper = { padding: '10px 0' };
const sectionTitle = { fontSize: '15px', fontWeight: '800', padding: '15px 25px 10px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' };
const listContainer = { listStyle: 'none', padding: 0, margin: 0 };
const listItem = { borderBottom: '1px solid #f8f8f8' };
const navLink = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', textDecoration: 'none', color: '#333', fontSize: '15px', fontWeight: '500' };
const iconLabelGroup = { display: 'flex', alignItems: 'center', gap: '15px' };
const divider = { height: '8px', backgroundColor: '#f4f4f4', borderTop: '1px solid #eee' };
const logoutActionBtn = { width: '100%', textAlign: 'left', padding: '15px 25px', background: 'none', border: 'none', color: '#d9534f', fontSize: '15px', cursor: 'pointer', fontWeight: '600' };

export default Sidebar;