import React from 'react';
import { Briefcase, Truck, Award } from 'lucide-react';

const Partnership = () => {
  return (
    <div style={{ padding: '50px 10%', backgroundColor: '#fff', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#131921' }}>Wholesale & Business Partnerships</h1>
        <p style={{ color: '#666' }}>Scale your retail business with MegaMart's supply chain.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={partnerCard}>
          <Briefcase size={40} color="#008ECC" />
          <h3 style={{ margin: '15px 0' }}>Corporate Sales</h3>
          <p style={{ fontSize: '14px', color: '#555' }}>Equip your office with the latest laptops and networking gear at special B2B rates.</p>
        </div>
        <div style={partnerCard}>
          <Truck size={40} color="#008ECC" />
          <h3 style={{ margin: '15px 0' }}>Wholesale Supply</h3>
          <p style={{ fontSize: '14px', color: '#555' }}>We supply retailers across Rwanda with bulk orders of smartphones and accessories.</p>
        </div>
        <div style={partnerCard}>
          <Award size={40} color="#008ECC" />
          <h3 style={{ margin: '15px 0' }}>Authorized Reseller</h3>
          <p style={{ fontSize: '14px', color: '#555' }}>Join our network of authorized resellers and grow your brand with our support.</p>
        </div>
      </div>
    </div>
  );
};

const partnerCard = { 
  padding: '40px', 
  backgroundColor: '#f8f9fa', 
  borderRadius: '12px', 
  textAlign: 'center', 
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  border: '1px solid #eee'
};

export default Partnership;