import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Search, Truck, Package, CheckCircle, Clock } from 'lucide-react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.from('orders').select('*').eq('id', orderId).single();
    if (error) {
      alert("Order not found.");
      setOrder(null);
    } else { setOrder(data); }
    setLoading(false);
  };

  const stepStyle = (active) => ({ color: active ? '#28a745' : '#ccc', textAlign: 'center', flex: 1 });

  return (
    <div style={{ padding: '60px 10%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>Track Order</h2>
        <form onSubmit={handleTrack} style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <input style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="Enter Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
          <button type="submit" style={{ padding: '12px 20px', backgroundColor: '#008ECC', color: 'white', border: 'none', borderRadius: '8px' }}>{loading ? "..." : <Search size={20}/>}</button>
        </form>
      </div>

      {order && (
        <div style={{ marginTop: '30px', width: '100%', maxWidth: '500px', backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <div style={stepStyle(true)}><CheckCircle /> <br/> Paid</div>
            <div style={stepStyle(order.order_status !== 'processing')}><Truck /> <br/> Shipped</div>
            <div style={stepStyle(order.order_status === 'delivered')}><Package /> <br/> Delivered</div>
          </div>
          <div style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '8px', fontSize: '14px' }}>
            <p><strong>Address:</strong> {order.delivery_address}</p>
            <p><strong>Amount:</strong> RWF {order.total_amount.toLocaleString()}</p>
            <p><strong>Status:</strong> {order.order_status.toUpperCase()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;