import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { supabase } from '../supabaseClient';

const BRAND_BLUE = '#008ECC';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', msg: 'Sending...' });
    const { error } = await supabase.from('messages').insert([formData]);
    if (error) {
      setStatus({ type: 'error', msg: 'Error sending message.' });
    } else {
      setStatus({ type: 'success', msg: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div style={pageContainer}>
      <div style={headerSection}>
        <h1 style={title}>Contact MegaMart Rwanda</h1>
        <p style={subtitle}>We usually respond within 24 hours.</p>
      </div>

      <div style={grid}>
        <div style={infoCol}>
          <div style={infoCard}>
            <h3 style={cardTitle}>Our Office</h3>
            <div style={item}><MapPin size={20} color={BRAND_BLUE} /> <p style={text}>Kigali Heights, 3rd Floor</p></div>
            <div style={item}><Phone size={20} color={BRAND_BLUE} /> <p style={text}>+250 796608954</p></div>
            <div style={item}><Mail size={20} color={BRAND_BLUE} /> <p style={text}>support@megamart.rw</p></div>
            <div style={item}><Clock size={20} color={BRAND_BLUE} /> <p style={text}>Mon-Sat: 8am - 7pm</p></div>
          </div>
        </div>

        <div style={formCol}>
          <form onSubmit={handleSubmit} style={formCard}>
            <div style={inputGroup}>
              <label style={formLabel}>Name</label>
              <input type="text" style={input} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div style={inputGroup}>
              <label style={formLabel}>Email</label>
              <input type="email" style={input} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div style={inputGroup}>
              <label style={formLabel}>Message</label>
              <textarea rows="4" style={input} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
            </div>
            <button type="submit" style={submitBtn}><Send size={18} /> Send</button>
            {status.msg && <p style={{color: status.type === 'success' ? 'green' : 'red', marginTop: '10px'}}>{status.msg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

const pageContainer = { padding: '40px 10%', backgroundColor: '#f8f9fa', minHeight: '80vh' };
const headerSection = { textAlign: 'center', marginBottom: '30px' };
const title = { fontSize: '28px', fontWeight: 'bold' };
const subtitle = { color: '#666' };
const grid = { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' };
const infoCol = { display: 'flex', flexDirection: 'column' };
const formCol = { display: 'flex', flexDirection: 'column' };
const infoCard = { backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' };
const cardTitle = { marginBottom: '20px', fontSize: '18px', borderBottom: `2px solid ${BRAND_BLUE}`, width: 'fit-content' };
const item = { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' };
const text = { margin: 0, fontSize: '14px' };
const formCard = { backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' };
const inputGroup = { display: 'flex', flexDirection: 'column', marginBottom: '15px' };
const formLabel = { fontSize: '13px', fontWeight: '600', marginBottom: '5px' };
const input = { padding: '10px', borderRadius: '4px', border: '1px solid #ddd' };
const submitBtn = { backgroundColor: BRAND_BLUE, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' };

export default ContactUs;