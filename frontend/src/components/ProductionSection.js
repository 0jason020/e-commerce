import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Added this
import { supabase } from '../supabaseClient';
import { ChevronRight } from 'lucide-react';

const ProductSection = ({ title, filterType, filterValue }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let query = supabase.from('products').select('*');
      
      if (filterType && filterValue) {
        query = query.eq(filterType, filterValue);
      }

      const { data, error } = await query.limit(6);
      if (!error) setProducts(data);
    };

    fetchProducts();
  }, [filterType, filterValue]);

  // Determine the "See All" URL
  const seeAllLink = filterType === 'deal_type' 
    ? `/deals/${filterValue}` 
    : `/category/${filterValue}`;

  return (
    <div style={{ padding: '20px 0', borderBottom: '1px solid #eee' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 15px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{title}</h2>
        <Link to={seeAllLink} style={{ textDecoration: 'none' }}>
          <span style={{ color: '#ff4d4f', fontSize: '14px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            See All <ChevronRight size={16} />
          </span>
        </Link>
      </div>

      <div style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        gap: '12px', 
        padding: '15px',
        scrollbarWidth: 'none'
      }}>
        {products.map((item) => (
          /* WRAP THE CARD IN A LINK */
          <Link 
            key={item.id} 
            to={`/product/${item.id}`} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ minWidth: '140px', maxWidth: '140px' }}>
              <div style={{ position: 'relative' }}>
                <img src={item.image_url} alt={item.name} style={{ width: '100%', borderRadius: '8px', height: '140px', objectFit: 'cover' }} />
                
                {item.old_price > item.price && (
                  <div style={{ position: 'absolute', top: 5, left: 5, backgroundColor: '#ff4d4f', color: 'white', padding: '2px 5px', borderRadius: '4px', fontSize: '10px' }}>
                    -{Math.round(((item.old_price - item.price) / item.old_price) * 100)}%
                  </div>
                )}
              </div>
              <p style={{ fontSize: '13px', margin: '8px 0 4px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.name}</p>
              <p style={{ color: '#ff4d4f', fontWeight: 'bold', fontSize: '14px' }}>RWF {item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;