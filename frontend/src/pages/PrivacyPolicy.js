import React from 'react';
import { ShieldCheck, Lock, EyeOff, Smartphone } from 'lucide-react';

const PrivacyPolicy = () => {
  const BRAND_BLUE = '#008ECC';

  return (
    <div style={container}>
      <section style={header}>
        <h1 style={title}>Privacy & Data Protection</h1>
        <p style={subtitle}>We value your trust. Here is how we handle your information.</p>
      </section>

      <div style={content}>
        <section style={section}>
          <div style={iconHeader}><Lock color={BRAND_BLUE} /> <h2>Your Security First</h2></div>
          <p style={text}>
            At MegaMart Rwanda, we collect only the essential information needed to get your gadgets to you. 
            This includes your <b>Name</b>, <b>Delivery Address</b>, and <b>Phone Number</b> for MoMo coordination. 
            We use industry-standard encryption to ensure your details never fall into the wrong hands.
          </p>
        </section>

        <section style={section}>
          <div style={iconHeader}><Smartphone color={BRAND_BLUE} /> <h2>Mobile Money Safety</h2></div>
          <p style={text}>
            We do not store your MoMo PIN or private bank details. Payments are handled through secure 
            gateways that communicate directly with MTN and Airtel. You only provide your number to 
            receive the payment prompt on your phone.
          </p>
        </section>

        <section style={section}>
          <div style={iconHeader}><EyeOff color={BRAND_BLUE} /> <h2>No Spam, Ever</h2></div>
          <p style={text}>
            Your email is used specifically for <b>Digital Receipts</b> (via our Supabase system) and 
            order updates. We will never sell your contact information to third-party advertisers. 
            That is our promise to every Rwandan shopper.
          </p>
        </section>
      </div>
    </div>
  );
};

// Styles
const container = { backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '60px' };
const header = { backgroundColor: '#131921', color: '#fff', padding: '80px 20px', textAlign: 'center' };
const title = { fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' };
const subtitle = { fontSize: '18px', opacity: 0.8 };
const content = { maxWidth: '850px', margin: '0 auto', padding: '50px 20px' };
const section = { marginBottom: '50px', borderBottom: '1px solid #f0f0f0', paddingBottom: '30px' };
const iconHeader = { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' };
const text = { color: '#444', lineHeight: '1.8', fontSize: '16px' };

export default PrivacyPolicy;