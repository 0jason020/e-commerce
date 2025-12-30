import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient'; 

// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage'; 
import AdminDashboard from './pages/AdminDashboard';
import SuccessPage from './pages/SuccessPage'; 
import AuthPage from './pages/Authpage'; 
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import ProductDetails from './pages/ProductDetail';
import CheckoutPage from './pages/CheckoutPage'; 
import TrackOrder from './pages/TrackOrder';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs'; 
import Partnership from './pages/Partnership';
import CouponsPage from './pages/CouponsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; 
import WhatsAppButton from './components/WhatsAppButton'; // Added this

// --- Helper: Scroll to Top on Page Change ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('megaMartCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    localStorage.setItem('megaMartCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('products').select('category');
      if (!error && data) {
        const uniqueCategories = [...new Set(data.map(item => item.category))].filter(Boolean);
        setCategories(uniqueCategories);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleUserLogout = async () => {
    await supabase.auth.signOut();
    alert("Logged out successfully");
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif' }}>
        
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          user={user} 
          categories={categories}
        />

        <div style={topInfoBar}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>
            MEGAMART RWANDA - OFFICIAL GADGET STORE
          </Link>
          {user && (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span style={{ opacity: 0.8 }}><strong>{user.email}</strong></span>
              <button onClick={handleUserLogout} style={logoutBtn}>LOGOUT</button>
            </div>
          )}
        </div>

        <Navbar 
          cartCount={cart.length} 
          openSidebar={() => setIsSidebarOpen(true)} 
          user={user}
          categories={categories} 
        />
        
        <main style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/about" element={<AboutUs />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/contact-us" element={<ContactUs />} />
            
            <Route path="/info/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/info/terms" element={<TermsOfService />} />
            
            <Route path="/category/:categoryName" element={<CategoryPage addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} user={user} />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/success" element={<SuccessPage user={user} />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/coupons" element={<CouponsPage />} />
            
            <Route path="/admin-login" element={<LoginPage setIsAdmin={setIsAdmin} />} />
            <Route 
              path="/admin" 
              element={isAdmin ? <AdminDashboard setIsAdmin={setIsAdmin} /> : <Navigate to="/admin-login" />} 
            />
          </Routes>
        </main>

        <WhatsAppButton />
        <Footer />
      </div>
    </Router>
  );
}

// --- Footer Component ---
const Footer = () => (
  <footer style={footerStyle}>
    <div style={footerGrid}>
      <div style={footerCol}>
        <h3 style={footerHead}>MegaMart Rwanda</h3>
        <p style={footerText}>Your #1 destination for electronics and gadgets in Rwanda. Quality guaranteed.</p>
      </div>
      <div style={footerCol}>
        <h4 style={footerHead}>Support</h4>
        <Link to="/about" style={footerLink}>About Us</Link>
        <Link to="/contact-us" style={footerLink}>Contact Us</Link>
        <Link to="/partnership" style={footerLink}>Partnerships</Link>
      </div>
      <div style={footerCol}>
        <h4 style={footerHead}>Legal</h4>
        <Link to="/info/privacy-policy" style={footerLink}>Privacy Policy</Link>
        <Link to="/info/terms" style={footerLink}>Terms of Service</Link>
      </div>
      <div style={footerCol}>
        <h4 style={footerHead}>Account</h4>
        <Link to="/track-order" style={footerLink}>Track My Order</Link>
      </div>
    </div>
    <div style={bottomBar}>© 2025 MegaMart Rwanda. Built for the future of Rwandan E-commerce.</div>
  </footer>
);

// --- Styles ---
const topInfoBar = { backgroundColor: '#131921', color: 'white', padding: '8px 50px', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const logoutBtn = { background: 'none', border: 'none', color: '#FF4D4D', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold' };
const footerStyle = { backgroundColor: '#232f3e', color: 'white', padding: '40px 10% 20px', marginTop: 'auto' };
const footerGrid = { display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'space-between' };
const footerCol = { flex: '1 1 200px' };
const footerHead = { fontSize: '16px', color: '#febd69', marginBottom: '15px', fontWeight: 'bold' };
const footerText = { fontSize: '13px', lineHeight: '1.6', opacity: 0.8 };
const footerLink = { display: 'block', color: 'white', textDecoration: 'none', marginBottom: '10px', fontSize: '13px', opacity: 0.8 };
const bottomBar = { borderTop: '1px solid #3a4553', marginTop: '30px', paddingTop: '20px', textAlign: 'center', fontSize: '11px', opacity: 0.6 };

export default App;