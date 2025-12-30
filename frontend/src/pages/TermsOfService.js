import React from 'react';
import { ShoppingBag, RotateCcw, Truck, AlertTriangle } from 'lucide-react';

// 1. Move the color definition here (Global scope)
const BRAND_BLUE = '#008ECC';

const TermsOfService = () => {
  return (
    <div style={container}>
      <section style={header}>
        <h1 style={title}>Terms of Service</h1>
        <p style={subtitle}>Clear rules for a better shopping experience in Rwanda.</p>
      </section>

      <div style={content}>
        <section style={section}>
          <div style={iconHeader}><ShoppingBag color={BRAND_BLUE} /> <h2>Order Acceptance</h2></div>
          <p style={text}>
            When you place an order on MegaMart, we send an automated receipt to your email. 
            Please ensure your <b>Phone Number</b> is active so our delivery team can reach you 
            to confirm your location in Kigali or other provinces.
          </p>
        </section>

        <section style={section}>
          <div style={iconHeader}><RotateCcw color={BRAND_BLUE} /> <h2>Warranty & Returns</h2></div>
          <p style={text}>
            Most electronics come with a <b>12-month manufacturer warranty</b>. If a device is 
            defective upon arrival, you have 7 days to notify us for a replacement or a full 
            refund to your MoMo account.
          </p>
        </section>

        <section style={section}>
          <div style={iconHeader}><Truck color={BRAND_BLUE} /> <h2>Delivery Logistics</h2></div>
          <p style={text}>
            We pride ourselves on <b>Same-Day Delivery</b> within Kigali. For orders outside the city, 
            please allow 24-48 hours. MegaMart is not responsible for delays caused by incorrect 
            address details provided during checkout.
          </p>
        </section>

        <section style={{...section, border: 'none'}}>
          <div style={iconHeader}><AlertTriangle color={BRAND_BLUE} /> <h2>Fair Use</h2></div>
          <p style={text}>
            Users are prohibited from using false identities or fraudulent payment methods. 
            We reserve the right to block accounts that engage in suspicious activity.
          </p>
        </section>
      </div>
    </div>
  );
};

// --- STYLES ---
const container = { backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '60px' };

// 2. Now the styles can use BRAND_BLUE without an error
const header = { backgroundColor: BRAND_BLUE, color: '#fff', padding: '80px 20px', textAlign: 'center' };

const title = { fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' };
const subtitle = { fontSize: '18px', opacity: 0.9 };
const content = { maxWidth: '850px', margin: '0 auto', padding: '50px 20px' };
const section = { marginBottom: '50px', borderBottom: '1px solid #f0f0f0', paddingBottom: '30px' };
const iconHeader = { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' };
const text = { color: '#444', lineHeight: '1.8', fontSize: '16px' };

export default TermsOfService;