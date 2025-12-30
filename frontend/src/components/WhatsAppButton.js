import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "250796608954"; // Replace with your number
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hello MegaMart! I need help with an order.`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{
      position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#25D366',
      color: 'white', width: '60px', height: '60px', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 1000
    }}>
      <MessageCircle size={30} />
    </a>
  );
};

export default WhatsAppButton;