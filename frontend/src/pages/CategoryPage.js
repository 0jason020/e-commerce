import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Filter, ChevronRight } from 'lucide-react';

const BRAND_BLUE = '#008ECC';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      let query = supabase.from('products').select('*');
      
      if (categoryName && categoryName !== 'search' && categoryName !== 'all') {
        query = query.eq('category', categoryName);
      }

      const { data, error } = await query;
      if (!error) setProducts(data);
      setLoading(false);
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div style={container}>
      <div style={header}>
        <div style={breadcrumb}>
          <Link to="/" style={link}>Home</Link> <ChevronRight size={14} /> 
          <span style={{fontWeight: '600'}}>{categoryName}</span>
        </div>
        <h1 style={title}>{categoryName} Market</h1>
      </div>

      <div style={layout}>
        {/* Simple Filter Sidebar */}
        <aside style={filterSidebar}>
          <div style={filterGroup}>
            <h4 style={filterTitle}><Filter size={16} /> Filters</h4>
            <div style={divider} />
            <p style={label}>Price Range</p>
            <input type="range" style={{width: '100%'}} />
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px'}}>
              <span>0</span>
              <span>2M+</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div style={mainContent}>
          {loading ? (
            <p>Loading {categoryName}...</p>
          ) : products.length > 0 ? (
            <div style={productGrid}>
              {products.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={productCard}>
                    <div style={imgBox}>
                      <img src={p.image_url} alt={p.name} style={prodImg} />
                    </div>
                    <div style={infoBox}>
                      <p style={prodName}>{p.name}</p>
                      <p style={prodPrice}>RWF {p.price?.toLocaleString()}</p>
                      <div style={tag}>Official Store</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={emptyState}>No products found in this category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- STYLES (Fixed all undefined variables) ---
const container = { padding: '20px 8%', backgroundColor: '#f9f9f9', minHeight: '100vh' };
const header = { marginBottom: '30px' };
const breadcrumb = { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#888', marginBottom: '10px' };
const link = { textDecoration: 'none', color: '#888' };
const title = { fontSize: '24px', fontWeight: '800', textTransform: 'capitalize', color: '#333' };

const layout = { display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' };
const filterSidebar = { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee', height: 'fit-content' };
const filterGroup = { display: 'flex', flexDirection: 'column' }; // Fixed the missing style
const filterTitle = { display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 15px 0', fontSize: '16px', color: '#333' };
const divider = { height: '1px', backgroundColor: '#eee', margin: '15px 0' };
const label = { fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#555' };

const mainContent = { flex: 1 };
const productGrid = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' };
const productCard = { backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee', overflow: 'hidden', transition: 'transform 0.2s', cursor: 'pointer' };
const imgBox = { height: '200px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const prodImg = { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' };
const infoBox = { padding: '15px', borderTop: '1px solid #f9f9f9' };
const prodName = { fontSize: '14px', fontWeight: '500', marginBottom: '8px', height: '40px', overflow: 'hidden', color: '#333' };
const prodPrice = { fontSize: '16px', fontWeight: '800', color: BRAND_BLUE, marginBottom: '10px' };
const tag = { display: 'inline-block', padding: '2px 8px', backgroundColor: '#e6f4ff', color: BRAND_BLUE, fontSize: '10px', borderRadius: '4px', fontWeight: '700' };
const emptyState = { padding: '100px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee', color: '#888' };

export default CategoryPage;