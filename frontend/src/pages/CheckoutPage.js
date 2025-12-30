import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { ShieldCheck, Lock, Mail, MapPin } from 'lucide-react';

const CheckoutPage = ({ cart, setCart, user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: 'Kigali'
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0), 0);
  const delivery = 2000; 
  const total = subtotal + delivery;

  // --- Flutterwave Configuration ---
  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: `MEGAMART-${Date.now()}`,
    amount: total,
    currency: 'RWF',
    payment_options: 'card,mobilemoneyrwanda',
    customer: {
      email: formData.email,
      phone_number: formData.phone,
      name: `${formData.firstName} ${formData.lastName}`,
    },
    customizations: {
      title: 'MegaMart Rwanda',
      description: 'Payment for gadgets',
      logo: 'https://your-site.com/logo.png', // Add your logo URL here
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleProcessOrder = () => {
    // Basic validation
    if (!formData.email || !formData.phone || !formData.firstName) {
      alert("Please fill in your contact and shipping details first.");
      return;
    }

    handleFlutterPayment({
      callback: async (response) => {
        if (response.status === "successful" || response.status === "completed") {
          await saveOrderToSupabase(response.transaction_id);
          closePaymentModal();
        } else {
          alert("Payment failed. Please try again.");
        }
      },
      onClose: () => {
        console.log("Payment window closed");
      },
    });
  };

  const saveOrderToSupabase = async (txId) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('orders').insert([{
        customer_email: formData.email,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        phone_number: formData.phone,
        delivery_address: `${formData.address}, ${formData.city}`,
        total_amount: total,
        payment_status: 'paid',
        payment_ref: txId, // Flutterwave transaction ID
        order_status: 'processing',
        cart_items: cart
      }]).select();

      if (error) throw error;

      // Clear Cart and Redirect
      setCart([]);
      localStorage.removeItem('megaMartCart');
      navigate('/success', { state: { orderId: data[0].id } });
    } catch (err) {
      alert("Error saving order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={boltWrapper}>
      <div style={mainCard}>
        <div style={leftForm}>
          <h2 style={{fontStyle: 'italic', fontWeight: '900'}}>MegaMart</h2>
          
          <div style={inputStack}>
            <label style={fieldLabel}><Mail size={14}/> Contact & Delivery</label>
            <input style={input} placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}/>
            <input style={input} placeholder="Phone (MTN/Airtel)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}/>
            
            <div style={{display: 'flex', gap: '10px'}}>
              <input style={{...input, flex: 1}} placeholder="First name" onChange={e => setFormData({...formData, firstName: e.target.value})}/>
              <input style={{...input, flex: 1}} placeholder="Last name" onChange={e => setFormData({...formData, lastName: e.target.value})}/>
            </div>
            <input style={input} placeholder="Street Address / Neighborhood" onChange={e => setFormData({...formData, address: e.target.value})}/>
          </div>

          <button style={payBtn} onClick={handleProcessOrder} disabled={loading}>
            {loading ? "Processing..." : `Pay RWF ${total.toLocaleString()}`}
          </button>
          
          <p style={footerSecure}><Lock size={12}/> Secure Payment via Flutterwave</p>
        </div>

        <div style={rightSummary}>
           <h4>Summary</h4>
           {cart.map((item, i) => (
             <div key={i} style={itemRow}>
               <div style={{flex: 1, fontSize: '13px'}}><b>{item.name}</b></div>
               <div style={{fontSize: '13px'}}>RWF {item.price.toLocaleString()}</div>
             </div>
           ))}
           <div style={divider}></div>
           <div style={totalRow}><span>Total</span><span>RWF {total.toLocaleString()}</span></div>
        </div>
      </div>
    </div>
  );
};

// --- Copy the styles from your previous CheckoutPage here ---
const boltWrapper = { backgroundColor: '#0a0b0b', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' };
const mainCard = { width: '850px', backgroundColor: 'white', borderRadius: '24px', display: 'flex', overflow: 'hidden' };
const leftForm = { flex: 1.2, padding: '40px' };
const rightSummary = { flex: 0.8, backgroundColor: '#f9f9f9', padding: '40px' };
const inputStack = { display: 'flex', flexDirection: 'column', gap: '10px' };
const fieldLabel = { fontSize: '12px', fontWeight: 'bold', color: '#666', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' };
const input = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' };
const payBtn = { width: '100%', padding: '16px', backgroundColor: '#111', color: 'white', border: 'none', borderRadius: '30px', fontWeight: 'bold', fontSize: '16px', marginTop: '25px', cursor: 'pointer' };
const footerSecure = { textAlign: 'center', fontSize: '11px', color: '#999', marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' };
const itemRow = { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' };
const divider = { height: '1px', backgroundColor: '#eee', margin: '15px 0' };
const totalRow = { display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' };

export default CheckoutPage;