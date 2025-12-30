import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutModal = ({ cartCount, closeModal }) => {
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate MoMo API Delay
    setTimeout(() => {
      setIsProcessing(false);
      closeModal();
      navigate('/success'); // Redirect to your success page
    }, 2500);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={closeModal} style={closeButtonStyle}>×</button>
        <h2 style={{ color: '#333', marginBottom: '10px' }}>Checkout</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          You are paying for <strong>{cartCount} items</strong> via Mobile Money.
        </p>

        <form onSubmit={handlePayment}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>
            MTN/Airtel MoMo Number
          </label>
          <input 
            type="text" 
            placeholder="078X XXX XXX" 
            required 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle} 
          />
          
          <button 
            type="submit" 
            disabled={isProcessing || cartCount === 0}
            style={{ 
              ...payButtonStyle, 
              backgroundColor: isProcessing ? '#ccc' : '#4BB543' 
            }}
          >
            {isProcessing ? 'Processing MoMo...' : 'Pay with MoMo'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
const overlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 };
const modalStyle = { backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '350px', position: 'relative', textAlign: 'center' };
const inputStyle = { width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' };
const payButtonStyle = { width: '100%', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };
const closeButtonStyle = { position: 'absolute', top: '10px', right: '15px', border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer', color: '#999' };

export default CheckoutModal;