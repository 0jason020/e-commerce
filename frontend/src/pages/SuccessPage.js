import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, Package, Truck, ArrowRight, 
  ShoppingBag, Headphones, ClipboardList 
} from 'lucide-react';

const SuccessPage = () => {
  const navigate = useNavigate();
  
  // Generate a random order number
  const orderNumber = Math.floor(Math.random() * 900000) + 100000;

  return (
    <div style={container}>
      <div style={card}>
        {/* Success Icon */}
        <div style={iconCircle}>
          <CheckCircle size={44} color="#fff" />
        </div>

        <h1 style={title}>Order Successful!</h1>
        <p style={subtitle}>
          Thank you for shopping with MegaMart Rwanda. <br />
          Order <span style={orderHighlight}>#{orderNumber}</span> is now confirmed.
        </p>

        <div style={timelineContainer}>
          {/* Vertical Line Connector */}
          <div style={verticalLine}></div>

          <div style={step}>
            <div style={activeStepIcon}><Package size={18} /></div>
            <div style={stepText}>
              <p style={stepTitle}>Order Confirmed</p>
              <p style={stepDesc}>Your items are being packed for delivery.</p>
            </div>
          </div>
          
          <div style={step}>
            <div style={stepIcon}><Truck size={18} /></div>
            <div style={stepText}>
              <p style={stepTitle}>Out for Delivery</p>
              <p style={stepDesc}>Expected arrival within 24 hours.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={buttonGroup}>
          <button onClick={() => navigate('/profile')} style={primaryBtn}>
            <ClipboardList size={18} style={{ marginRight: '10px' }} />
            Track Order 
            <ArrowRight size={18} style={{ marginLeft: 'auto' }} />
          </button>
          
          <button onClick={() => navigate('/')} style={secondaryBtn}>
            <ShoppingBag size={18} /> Continue Shopping
          </button>
        </div>

        <div style={divider} />
        
        <div style={helpSection}>
          <Headphones size={16} color="#008ECC" />
          <span style={footerNote}>Need help? support@megamart.rw</span>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const container = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#0f1111', // Dark background matching Checkout
  padding: '20px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const card = {
  backgroundColor: 'white',
  padding: '40px 30px',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  maxWidth: '440px',
  width: '100%',
  textAlign: 'center',
  position: 'relative'
};

const iconCircle = {
  width: '70px',
  height: '70px',
  backgroundColor: '#28a745',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px auto',
  boxShadow: '0 8px 20px rgba(40, 167, 69, 0.3)'
};

const title = { fontSize: '26px', fontWeight: '800', color: '#111', margin: '0 0 12px 0' };
const subtitle = { fontSize: '15px', color: '#666', lineHeight: '1.6', margin: '0 0 32px 0' };
const orderHighlight = { color: '#008ECC', fontWeight: 'bold' };

const timelineContainer = { 
  textAlign: 'left', 
  marginBottom: '32px', 
  position: 'relative',
  paddingLeft: '10px'
};

const verticalLine = {
  position: 'absolute',
  left: '27px',
  top: '20px',
  bottom: '20px',
  width: '2px',
  backgroundColor: '#f0f0f0',
  zIndex: 1
};

const step = { 
  display: 'flex', 
  gap: '16px', 
  marginBottom: '24px', 
  position: 'relative', 
  zIndex: 2 
};

const stepText = { display: 'flex', flexDirection: 'column', justifyContent: 'center' };

const stepIcon = { 
  width: '36px', height: '36px', borderRadius: '50%', 
  backgroundColor: '#fff', border: '2px solid #f0f0f0', display: 'flex', 
  alignItems: 'center', justifyContent: 'center', color: '#ccc' 
};

const activeStepIcon = { 
  ...stepIcon, 
  backgroundColor: '#fff', 
  borderColor: '#28a745', 
  color: '#28a745' 
};

const stepTitle = { margin: 0, fontWeight: '700', fontSize: '15px', color: '#111' };
const stepDesc = { margin: '2px 0 0 0', fontSize: '13px', color: '#888' };

const buttonGroup = { display: 'flex', flexDirection: 'column', gap: '12px' };

const primaryBtn = {
  padding: '16px 20px', 
  backgroundColor: '#111', 
  color: 'white', 
  border: 'none', 
  borderRadius: '14px', 
  fontWeight: '700', 
  fontSize: '15px',
  cursor: 'pointer', 
  display: 'flex', 
  alignItems: 'center'
};

const secondaryBtn = {
  padding: '16px', 
  backgroundColor: '#f9f9f9', 
  color: '#111', 
  border: '1px solid #eee', 
  borderRadius: '14px', 
  fontWeight: '700', 
  fontSize: '15px',
  cursor: 'pointer', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  gap: '10px'
};

const divider = { border: 'none', borderTop: '1px solid #f0f0f0', margin: '24px 0' };

const helpSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px'
};

const footerNote = { fontSize: '13px', color: '#666', fontWeight: '500' };

export default SuccessPage;