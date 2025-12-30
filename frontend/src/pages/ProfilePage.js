import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Package, Clock, CheckCircle, Truck, ShoppingBag } from 'lucide-react';

const ProfilePage = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user) return;
      
      setLoading(true);
      // Fetch orders where the email matches the logged-in user
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('email', user.email) 
        .order('created_at', { ascending: false });

      if (!error) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchUserOrders();
  }, [user]);

  // If user is not logged in
  if (!user) {
    return (
      <div style={centeredContainer}>
        <ShoppingBag size={50} color="#ccc" />
        <h3>Please log in to view your profile and orders.</h3>
        <a href="/login" style={shopBtn}>Go to Login</a>
      </div>
    );
  }

  return (
    <div style={container}>
      {/* 1. USER INFO HEADER */}
      <div style={profileHeader}>
        <div style={avatar}>{user.email[0].toUpperCase()}</div>
        <div>
          <h2 style={{ margin: 0 }}>Your Account</h2>
          <p style={{ color: '#666', margin: '5px 0 0' }}>{user.email}</p>
        </div>
      </div>

      <hr style={divider} />

      {/* 2. ORDER HISTORY SECTION */}
      <h3 style={sectionTitle}><Package size={22} /> My Orders</h3>
      
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div style={emptyOrders}>
          <p>You haven't placed any orders yet.</p>
          <a href="/" style={shopBtn}>Start Shopping</a>
        </div>
      ) : (
        <div style={orderList}>
          {orders.map((order) => (
            <div key={order.id} style={orderCard}>
              {/* Order Header (Amazon Style) */}
              <div style={orderHeader}>
                <div style={headerItem}>
                  <p style={label}>ORDER PLACED</p>
                  <p style={val}>{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div style={headerItem}>
                  <p style={label}>TOTAL</p>
                  <p style={val}>RWF {order.total_amount?.toLocaleString()}</p>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <p style={label}>ORDER # {order.id.toString().slice(0, 8)}</p>
                  <span style={getStatusStyle(order.status)}>{order.status?.toUpperCase()}</span>
                </div>
              </div>

              {/* Order Content */}
              <div style={orderBody}>
                {order.items && order.items.map((item, idx) => (
                  <div key={idx} style={productRow}>
                    <img src={item.image_url} alt="" style={prodImg} />
                    <div>
                      <p style={prodName}>{item.name}</p>
                      <p style={prodPrice}>RWF {item.price?.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- HELPER FOR STATUS COLORS ---
const getStatusStyle = (status) => {
  const base = { padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' };
  if (status === 'pending') return { ...base, backgroundColor: '#fff3cd', color: '#856404' };
  if (status === 'shipped') return { ...base, backgroundColor: '#d1ecf1', color: '#0c5460' };
  if (status === 'delivered') return { ...base, backgroundColor: '#d4edda', color: '#155724' };
  return base;
};

// --- STYLES SECTION (Fixes all ESLint Errors) ---
const container = { maxWidth: '900px', margin: '40px auto', padding: '0 20px', minHeight: '70vh' };
const centeredContainer = { textAlign: 'center', padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' };
const profileHeader = { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' };
const avatar = { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#232f3e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' };
const divider = { border: 'none', borderTop: '1px solid #ddd', margin: '20px 0' };
const sectionTitle = { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '20px' };
const emptyOrders = { textAlign: 'center', padding: '60px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ddd' };
const shopBtn = { color: '#007185', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #ddd', padding: '8px 15px', borderRadius: '4px', marginTop: '10px' };

const orderList = { display: 'flex', flexDirection: 'column', gap: '20px' };
const orderCard = { backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' };
const orderHeader = { display: 'flex', gap: '40px', padding: '15px 20px', backgroundColor: '#f0f2f2', borderBottom: '1px solid #ddd', flexWrap: 'wrap' };
const headerItem = { minWidth: '100px' };
const label = { fontSize: '11px', color: '#565959', margin: 0, textTransform: 'uppercase' };
const val = { fontSize: '13px', margin: 0, fontWeight: '500' };

const orderBody = { padding: '20px' };
const productRow = { display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' };
const prodImg = { width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' };
const prodName = { fontSize: '15px', margin: 0, fontWeight: 'bold', color: '#007185' };
const prodPrice = { fontSize: '14px', color: '#B12704', margin: '5px 0 0', fontWeight: 'bold' };

export default ProfilePage;