import React from 'react';
import { ShieldCheck, CreditCard, Truck, Store, CheckCircle, Users, Globe, Award } from 'lucide-react';

const AboutUs = () => {
  const BRAND_BLUE = '#008ECC';

  return (
    <div style={container}>
      {/* 1. PREMIUM HERO HEADER */}
      <section style={heroHeader}>
        <div style={heroOverlay}>
          <h1 style={heroTitle}>MegaMart Rwanda</h1>
          <p style={heroSubtitle}>Connecting Rwanda to the Global Tech Revolution</p>
        </div>
      </section>

      <div style={contentWrapper}>
        
        {/* 2. MISSION STATEMENT */}
        <section style={missionSection}>
          <div style={missionText}>
            <h2 style={sectionTitle}>Our Vision</h2>
            <p style={paragraph}>
              Founded in Kigali, MegaMart Rwanda was built to bridge the gap between global manufacturers and the local consumer. 
              We believe that everyone in Rwanda deserves access to authentic, high-quality electronics without the "middleman" markup.
            </p>
          </div>
          <div style={missionStats}>
            <div style={miniStat}><Award size={20} color={BRAND_BLUE}/> 100% Authentic</div>
            <div style={miniStat}><Globe size={20} color={BRAND_BLUE}/> Global Partners</div>
          </div>
        </section>

        {/* 3. THREE PILLARS */}
        <div style={pillarsGrid}>
          <div style={pillarCard}>
            <div style={iconCircle}><Store size={28} color={BRAND_BLUE} /></div>
            <h3 style={pillarHeader}>1. Direct Sourcing</h3>
            <p style={pillarBody}>We bypass distributors and work directly with factories to ensure wholesale pricing for you.</p>
          </div>

          <div style={pillarCard}>
            <div style={iconCircle}><CreditCard size={28} color={BRAND_BLUE} /></div>
            <h3 style={pillarHeader}>2. Secure Payments</h3>
            <p style={pillarBody}>Local integration with <b>MTN MoMo</b> and <b>Airtel Money</b> for safe, instant transactions.</p>
          </div>

          <div style={pillarCard}>
            <div style={iconCircle}><Truck size={28} color={BRAND_BLUE} /></div>
            <h3 style={pillarHeader}>3. Smart Logistics</h3>
            <p style={pillarBody}>Same-day arrival in Kigali and 48-hour delivery to all other provinces in Rwanda.</p>
          </div>
        </div>

        {/* 4. THE PROMISE BANNER */}
        <div style={promiseBanner}>
          <h2 style={{ color: '#fff', marginBottom: '20px' }}>The MegaMart Promise</h2>
          <div style={promiseGrid}>
            <div style={promiseItem}><CheckCircle size={18} color={BRAND_BLUE} /> 12-Month Warranty</div>
            <div style={promiseItem}><CheckCircle size={18} color={BRAND_BLUE} /> Quality Testing</div>
            <div style={promiseItem}><CheckCircle size={18} color={BRAND_BLUE} /> WhatsApp Support</div>
            <div style={promiseItem}><CheckCircle size={18} color={BRAND_BLUE} /> Secure Escrow</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLES (Fixed and Complete) ---
const container = { backgroundColor: '#fcfcfc', minHeight: '100vh' };

const heroHeader = {
  backgroundImage: 'linear-gradient(rgba(0, 142, 204, 0.8), rgba(19, 25, 33, 0.9)), url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  padding: '100px 20px',
  textAlign: 'center'
};

const heroOverlay = { maxWidth: '800px', margin: '0 auto' };
const heroTitle = { fontSize: '42px', fontWeight: '800', margin: '0 0 15px 0' };
const heroSubtitle = { fontSize: '20px', fontWeight: '300', opacity: 0.9 };

const contentWrapper = { maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' };

const missionSection = { marginBottom: '80px', textAlign: 'center' };
const missionText = { maxWidth: '800px', margin: '0 auto' };
const sectionTitle = { fontSize: '32px', color: '#131921', marginBottom: '20px' };
const paragraph = { color: '#555', lineHeight: '1.8', fontSize: '17px', marginBottom: '30px' };

const missionStats = { display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' };
const miniStat = { display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '14px', color: '#131921' };

const pillarsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '80px' };
const pillarCard = { backgroundColor: '#fff', padding: '40px 30px', borderRadius: '12px', border: '1px solid #eee', textAlign: 'center' };
const iconCircle = { backgroundColor: '#F0F8FF', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' };
const pillarHeader = { fontSize: '20px', fontWeight: '700', color: '#131921', marginBottom: '15px' };
const pillarBody = { color: '#666', fontSize: '15px', lineHeight: '1.6' };

const promiseBanner = { backgroundColor: '#131921', padding: '60px 40px', borderRadius: '20px', textAlign: 'center' };
const promiseGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' };
const promiseItem = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#BDC3C7', fontSize: '15px' };

export default AboutUs;