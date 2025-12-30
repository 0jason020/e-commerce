import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const BRAND_BLUE = '#008ECC';
  const DARK_BG = '#131921'; 

  return (
    <footer style={{ backgroundColor: DARK_BG, color: 'white', paddingTop: '60px' }}>
      <div style={footerGrid}>
        
        {/* Brand Mission */}
        <div style={sectionStack}>
          <h2 style={{ color: BRAND_BLUE, fontSize: '24px', fontWeight: '800', margin: 0 }}>MegaMart Rwanda</h2>
          <p style={description}>
            Rwanda's most trusted marketplace for quality electronics. Delivering excellence to your doorstep in Kigali and beyond.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Facebook size={20} style={iconStyle} />
            <Instagram size={20} style={iconStyle} />
            <MessageCircle size={20} style={iconStyle} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={headingStyle}>Quick Links</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}><Link to="/about" style={linkStyle}>About Us</Link></li>
            <li style={listItemStyle}><Link to="/track-order" style={linkStyle}>Track My Order</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 style={headingStyle}>Legal</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}><Link to="/privacy" style={linkStyle}>Privacy Policy</Link></li>
            <li style={listItemStyle}><Link to="/terms" style={linkStyle}>Terms of Service</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={headingStyle}>Contact Us</h4>
          <div style={sectionStack}>
            <div style={contactRow}><Phone size={16} color={BRAND_BLUE} /> +250 78X XXX XXX</div>
            <div style={contactRow}><Mail size={16} color={BRAND_BLUE} /> support@megamart.rw</div>
            <div style={contactRow}><MapPin size={16} color={BRAND_BLUE} /> Kigali, Rwanda</div>
          </div>
        </div>
      </div>

      {/* Trust & Payment Bar */}
      <div style={paymentBar}>
        <div style={paymentContent}>
           <span>MTN MOMO</span>
           <span>AIRTEL MONEY</span>
           <span>PAY ON DELIVERY</span>
        </div>
      </div>

      <div style={copyrightBar}>
        <p>© {new Date().getFullYear()} MegaMart Rwanda. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

// --- Styles ---
const footerGrid = { maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' };
const sectionStack = { display: 'flex', flexDirection: 'column', gap: '15px' };
const description = { fontSize: '14px', lineHeight: '1.6', color: '#BDC3C7' };
const headingStyle = { color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '20px' };
const listStyle = { listStyle: 'none', padding: 0 };
const listItemStyle = { marginBottom: '12px' };
const linkStyle = { color: '#BDC3C7', textDecoration: 'none', fontSize: '14px' };
const iconStyle = { cursor: 'pointer', color: '#BDC3C7' };
const contactRow = { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#BDC3C7' };
const paymentBar = { borderTop: '1px solid #232f3e', marginTop: '40px', padding: '20px 0', opacity: 0.6 };
const paymentContent = { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '12px', fontWeight: 'bold' };
const copyrightBar = { textAlign: 'center', padding: '20px', backgroundColor: '#0F1111', fontSize: '12px', color: '#888' };

export default Footer;