import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, ShieldCheck, RefreshCw, PhoneCall, HelpCircle } from 'lucide-react';

const InfoPage = () => {
  const { slug } = useParams();

  const content = {
    'shipping-policy': {
      title: 'Shipping Policy',
      icon: <Truck size={40} color="#005efd" />,
      text: 'We deliver globally. Local orders in Rwanda are delivered within 24 hours. International shipping via DHL/FedEx takes 5-7 business days.'
    },
    'return-policy': {
      title: 'Returns & Refunds',
      icon: <RefreshCw size={40} color="#005efd" />,
      text: 'Not satisfied? Return any item within 30 days for a full refund. Items must be in original packaging with tags.'
    },
    'privacy-policy': {
      title: 'Privacy Policy',
      icon: <ShieldCheck size={40} color="#005efd" />,
      text: 'Your data is secure with us. We use industry-standard encryption to protect your payment details and personal information.'
    },
    'contact-us': {
      title: 'Contact Support',
      icon: <PhoneCall size={40} color="#005efd" />,
      text: 'Need help? Email us at support@megamart.com or call +250 788 000 000. Our team is available 24/7.'
    }
  };

  const page = content[slug] || { title: 'Not Found', text: 'Page does not exist.', icon: <HelpCircle /> };

  return (
    <div style={container}>
      <div style={card}>
        <div style={iconHeader}>{page.icon}</div>
        <h1 style={titleStyle}>{page.title}</h1>
        <p style={textStyle}>{page.text}</p>
        <hr style={divider} />
        <Link to="/" style={backBtn}>Back to Shopping</Link>
      </div>
    </div>
  );
};

// --- STYLES ---
const container = { padding: '60px 10%', backgroundColor: '#f4f7f6', minHeight: '80vh', display: 'flex', justifyContent: 'center' };
const card = { backgroundColor: 'white', padding: '40px', borderRadius: '15px', maxWidth: '800px', width: '100%', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
const iconHeader = { marginBottom: '20px' };
const titleStyle = { fontSize: '28px', color: '#333', marginBottom: '20px' };
const textStyle = { fontSize: '16px', lineHeight: '1.6', color: '#666', marginBottom: '30px' };
const divider = { border: 'none', borderTop: '1px solid #eee', marginBottom: '20px' };
const backBtn = { textDecoration: 'none', color: '#005efd', fontWeight: 'bold' };

export default InfoPage;