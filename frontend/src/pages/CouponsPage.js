import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Ticket, Copy, Check } from 'lucide-react';

const CouponsPage = () => {
  const [promos, setPromos] = useState([]);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const fetchPromos = async () => {
      const { data } = await supabase
        .from('promotions')
        .select('*')
        .eq('is_active', true); // Only show active deals
      if (data) setPromos(data);
    };
    fetchPromos();
  }, []);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div style={{ padding: '40px 8%', minHeight: '80vh' }}>
      <h1 style={{ color: '#008ECC', marginBottom: '30px' }}>Exclusive MegaMart Coupons</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {promos.map((promo) => (
          <div key={promo.id} style={couponCard}>
            <Ticket size={40} color="#008ECC" />
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>{promo.discount_percent}% OFF</h3>
              <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>{promo.description}</p>
              <div onClick={() => copyToClipboard(promo.code)} style={codeBox}>
                <span>{promo.code}</span>
                {copied === promo.code ? <Check size={16} color="green" /> : <Copy size={16} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const couponCard = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  padding: '20px',
  border: '2px dashed #008ECC',
  borderRadius: '12px',
  backgroundColor: '#f0f9ff'
};

const codeBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default CouponsPage;