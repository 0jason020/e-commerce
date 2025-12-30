import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card" style={cardStyle}>
      {/* 1. Display AI-fetched Image */}
      <img 
        src={product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'} 
        alt={product.name} 
        style={imageStyle} 
      />
      
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 5px 0' }}>{product.name}</h3>
        <p style={{ color: '#666', fontSize: '13px' }}>{product.category}</p>
        
        <p style={{ fontWeight: 'bold', color: '#008ECC', fontSize: '16px' }}>
           RWF {product.price?.toLocaleString()}
        </p>

        {/* 2. Display AI-generated Description */}
        <p style={descriptionStyle}>
          {product.description}
        </p>
        
        <button style={btnStyle}>Add to Cart</button>
      </div>
    </div>
  );
};

// Recommended Styles
const cardStyle = {
  border: '1px solid #eee',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
};

const imageStyle = {
  width: '100%',
  height: '180px',
  objectFit: 'cover'
};

const descriptionStyle = {
  fontSize: '12px',
  color: '#555',
  height: '40px', // Limits height to keep cards uniform
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  lineHeight: '1.4'
};

const btnStyle = {
  width: '100%',
  padding: '8px',
  backgroundColor: '#008ECC',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: '10px'
};

export default ProductCard;