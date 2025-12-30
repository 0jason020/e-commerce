import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { 
  ShoppingBag, 
  ChevronRight, 
  User, 
  Ticket, // Changed from CreditCard to Ticket for Coupons
  Package, 
  MessageCircle 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const BRAND_BLUE = '#008ECC';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Added navigate hook

  const categories = ["Electronics", "Smartphones", "Laptops", "Watches", "Audio", "Gaming", "Cameras", "Accessories"];

  useEffect(() => { 
    fetchProducts(); 
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').limit(10);
    if (!error) setProducts(data);
    setLoading(false);
  };

  // Function to handle WhatsApp Support
  const handleSupportClick = () => {
    const phoneNumber = "250780000000"; // Replace with your actual Rwanda number
    const message = "Hello MegaMart, I have a question regarding a product.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={heroGrid}>
        {/* Category Sidebar */}
        <aside style={sidebar}>
          {categories.map((cat, i) => (
            <Link key={i} to={`/category/${cat}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={sidebarItem}>
                {cat} <ChevronRight size={14} color="#ccc" />
              </div>
            </Link>
          ))}
        </aside>

        {/* Banner */}
        <div style={mainBanner}>
          <div style={bannerContent}>
            <h2 style={bannerTitle}>Wholesale Market</h2>
            <button style={bannerBtn} onClick={() => window.scrollTo({top: 500, behavior: 'smooth'})}>
              GO SHOPPING <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Profile Card - UPDATED WITH CLICK ACTIONS */}
        <div style={profileCard}>
          <div style={avatarSection}>
            <div style={avatarCircle}><User size={24} color="#666" /></div>
            <p style={{fontWeight: '700', fontSize: '14px', margin: 0}}>Hi, Guest</p>
          </div>

          <div style={userActions}>
             {/* Coupons Action */}
             <div style={actionItem} onClick={() => navigate('/coupons')}>
                <div style={iconCircle}><Ticket size={18} color={BRAND_BLUE} /></div>
                <span style={actionLabel}>Coupons</span>
             </div>

             {/* Orders Action */}
             <div style={actionItem} onClick={() => navigate('/track-order')}>
                <div style={iconCircle}><Package size={18} color={BRAND_BLUE} /></div>
                <span style={actionLabel}>Orders</span>
             </div>

             {/* Support Action */}
             <div style={actionItem} onClick={handleSupportClick}>
                <div style={iconCircle}><MessageCircle size={18} color={BRAND_BLUE} /></div>
                <span style={actionLabel}>Support</span>
             </div>
          </div>

          <div style={promoBox}>
            <p style={promoText}><strong>Great Value</strong><br/>Continuous promotions</p>
            <p style={promoText}><strong>Global Delivery</strong><br/>Shipping available</p>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div style={{ padding: '20px 8%' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Featured Products</h2>
        {loading ? <p>Loading products...</p> : (
          <div style={productGrid}>
            {products.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={productCard}>
                  <div style={imgBox}>
                    <img src={p.image_url} alt={p.name} style={prodImg} />
                  </div>
                  <div style={{ padding: '12px' }}>
                    <p style={prodName}>{p.name}</p>
                    <p style={prodPrice}>RWF {p.price?.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- STYLES ---
const heroGrid = { display: 'grid', gridTemplateColumns: '220px 1fr 240px', gap: '15px', padding: '15px 8%', height: '420px' };
const sidebar = { backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '4px', overflowY: 'auto' };
const sidebarItem = { padding: '12px 20px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f9f9f9', cursor: 'pointer', transition: 'background 0.2s' };

const mainBanner = { backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800")', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '4px', position: 'relative' };
const bannerContent = { position: 'absolute', bottom: '40px', left: '40px', color: '#fff' };
const bannerTitle = { fontSize: '36px', fontWeight: '900', margin: '0 0 15px 0', textShadow: '0 2px 4px rgba(0,0,0,0.3)' };
const bannerBtn = { backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '20px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' };

const profileCard = { backgroundColor: '#fff', padding: '20px', border: '1px solid #eee', borderRadius: '4px', display: 'flex', flexDirection: 'column' };
const avatarSection = { textAlign: 'center', marginBottom: '15px' };
const avatarCircle = { width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' };

const userActions = { 
  display: 'flex', 
  justifyContent: 'space-between', 
  margin: '10px 0 20px 0',
  paddingTop: '15px',
  borderTop: '1px solid #f5f5f5'
};

const actionItem = { 
  textAlign: 'center', 
  cursor: 'pointer', 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center',
  flex: 1
};

const iconCircle = {
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  backgroundColor: '#f0f9ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '5px',
  transition: 'transform 0.2s'
};

const actionLabel = { fontSize: '11px', color: '#666', fontWeight: '500' };
const promoBox = { borderTop: '1px solid #eee', paddingTop: '15px', textAlign: 'left', marginTop: 'auto' };
const promoText = { fontSize: '11px', color: '#888', marginBottom: '8px' };

const productGrid = { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' };
const productCard = { backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee', overflow: 'hidden', transition: 'transform 0.2s, boxShadow 0.2s', cursor: 'pointer' };
const imgBox = { height: '180px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' };
const prodImg = { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' };
const prodName = { fontSize: '14px', height: '40px', overflow: 'hidden', margin: '0 0 8px 0', color: '#333', lineHeight: '1.4' };
const prodPrice = { fontSize: '16px', fontWeight: '800', color: BRAND_BLUE };

export default HomePage;