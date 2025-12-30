import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User, Headphones, ChevronDown } from 'lucide-react';

const Navbar = ({ cartCount, openSidebar }) => {
  const [searchInput, setSearchInput] = useState('');
  // 1. Add state to track screen width for responsiveness
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);
  
  const navigate = useNavigate();
  const BRAND_BLUE = '#008ECC';

  // 2. Listen for window resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/category/search?q=${searchInput}`);
    }
  };

  return (
    <nav style={navContainer}>
      {/* Top Row: Logo, Search (on PC), and Icons */}
      <div style={{...topRow, padding: isMobile ? '10px 15px' : '12px 8%'}}>
        <div style={logoSection}>
          <Menu 
            size={isMobile ? 24 : 28} 
            onClick={openSidebar} 
            style={{ cursor: 'pointer', color: '#333' }} 
          />
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={logoWrapper}>
               <Headphones size={isMobile ? 20 : 24} color={BRAND_BLUE} />
               <h1 style={{...logoText, fontSize: isMobile ? '20px' : '24px', color: BRAND_BLUE}}>MegaMart</h1>
            </div>
          </Link>
        </div>

        {/* Hide search bar on top row if mobile to move it below */}
        {!isMobile && (
          <form onSubmit={handleSearch} style={searchBarContainer}>
            <input 
              type="text" 
              placeholder="Search for electronics..." 
              style={searchInputStyle}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" style={{...searchBtn, backgroundColor: BRAND_BLUE}}>
              <Search size={20} color="white" />
            </button>
          </form>
        )}

        <div style={{...navLinks, gap: isMobile ? '15px' : '25px'}}>
          <Link to="/profile" style={navItem}>
            <User size={isMobile ? 24 : 22} color="#444" />
            {!isTablet && ( // Hide text labels on tablets and mobile
              <div style={textGroup}>
                <span style={navTinyText}>Sign in</span>
                <span style={navBoldText}>Account</span>
              </div>
            )}
          </Link>
          
          <div style={navItem} onClick={() => navigate('/checkout')}>
            <div style={cartIconContainer}>
              <ShoppingCart size={isMobile ? 24 : 26} color="#444" />
              <span style={{...cartBadge, backgroundColor: BRAND_BLUE}}>{cartCount}</span>
            </div>
            {!isTablet && <span style={navBoldText}>Cart</span>}
          </div>
        </div>
      </div>

      {/* 3. Mobile Search Row (Only visible on small screens) */}
      {isMobile && (
        <div style={mobileSearchRow}>
          <form onSubmit={handleSearch} style={{...searchBarContainer, maxWidth: '100%'}}>
            <input 
              type="text" 
              placeholder="Search items..." 
              style={searchInputStyle}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" style={{...searchBtn, backgroundColor: BRAND_BLUE}}>
              <Search size={18} color="white" />
            </button>
          </form>
        </div>
      )}

      {/* Secondary Sub-Navbar */}
      <div style={subNavbar}>
        <div style={{...subNavbarContent, padding: isMobile ? '0 15px' : '0 8%', gap: isMobile ? '10px' : '40px'}}>
          <div style={{...categoryTrigger, padding: isMobile ? '10px 15px' : '12px 25px'}} onClick={openSidebar}>
            <Menu size={18} />
            <span style={{fontWeight: '700', fontSize: isMobile ? '13px' : '14px'}}>
                {isMobile ? 'Categories' : 'Shop by Category'}
            </span>
            {!isMobile && <ChevronDown size={16} />}
          </div>
          
          {/* Hide secondary links on mobile to keep it clean, or keep them if they fit */}
          {!isMobile && (
            <div style={navLinksGroup}>
                <Link to="/about" style={subNavLink}>About us</Link>
                <Link to="/partnership" style={subNavLink}>Partnership</Link>
                <Link to="/contact-us" style={subNavLink}>Contact</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- STYLES ---
const navContainer = { display: 'flex', flexDirection: 'column', width: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#fff' };
const topRow = { display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between' };
const logoSection = { display: 'flex', alignItems: 'center', gap: '10px' };
const logoWrapper = { display: 'flex', alignItems: 'center', gap: '5px' };
const logoText = { fontWeight: '900', margin: 0 };
const searchBarContainer = { flex: 1, display: 'flex', maxWidth: '600px', height: '40px', border: '2px solid #008ECC', borderRadius: '25px', overflow: 'hidden' };
const searchInputStyle = { flex: 1, padding: '0 15px', border: 'none', outline: 'none', fontSize: '14px' };
const searchBtn = { border: 'none', width: '50px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const navLinks = { display: 'flex', alignItems: 'center' };
const navItem = { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textDecoration: 'none', color: '#333' };
const textGroup = { display: 'flex', flexDirection: 'column' };
const navTinyText = { fontSize: '10px', color: '#777' };
const navBoldText = { fontSize: '13px', fontWeight: '700' };
const cartIconContainer = { position: 'relative' };
const cartBadge = { position: 'absolute', top: '-8px', right: '-10px', color: 'white', borderRadius: '12px', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold' };

const mobileSearchRow = { padding: '0 15px 10px 15px' };

const subNavbar = { borderTop: '1px solid #eee', borderBottom: '2px solid #008ECC' };
const subNavbarContent = { display: 'flex', alignItems: 'center' };
const categoryTrigger = { backgroundColor: '#008ECC', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' };
const navLinksGroup = { display: 'flex', gap: '20px' };
const subNavLink = { textDecoration: 'none', color: '#444', fontSize: '13px', fontWeight: '500' };

export default Navbar;