import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { 
  ChevronRight, ShieldCheck, Truck, RotateCcw, 
  Star, Heart, Share2, Info, History, Sparkles, MessageCircle 
} from 'lucide-react';

const BRAND_BLUE = '#008ECC';

const ProductDetails = ({ cart, setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  // AI Assistant State
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (data) setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  // --- AI Logic ---
  const askGemini = async () => {
    if (!aiQuestion) return;
    setAiLoading(true);
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Customer asks about ${product.name}: ${aiQuestion}. Context: ${product.description}. Keep answer short.` }] }]
        })
      });
      const data = await res.json();
      setAiResponse(data.candidates[0].content.parts[0].text);
    } catch (e) {
      setAiResponse("I'm having trouble connecting to my brain right now!");
    } finally {
      setAiLoading(false);
    }
  };

  // --- Cart Logic ---
  const handleAddToCart = (isBuyNow = false) => {
    const itemToAdd = { ...product, quantity };
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      setCart([...cart, itemToAdd]);
    }

    if (isBuyNow) {
      navigate('/checkout');
    } else {
      alert(`${product.name} added to cart!`);
    }
  };

  if (loading) return <div style={loader}>Gathering product data...</div>;
  if (!product) return <div style={loader}>Product not found.</div>;

  return (
    <div style={pageWrapper}>
      {/* Breadcrumb */}
      <div style={breadcrumb}>
        <span onClick={() => navigate('/')} style={linkText}>Home</span> 
        <ChevronRight size={14} /> 
        <span style={linkText}>{product.category}</span> 
        <ChevronRight size={14} /> 
        <span style={{ color: '#333', fontWeight: '600' }}>{product.name}</span>
      </div>

      <div style={mainContent}>
        {/* Left: Image */}
        <div style={imageContainer}>
          <div style={mainImgWrapper}>
            <img src={product.image_url} alt={product.name} style={mainImg} />
          </div>
        </div>

        {/* Right: Info */}
        <div style={detailsContainer}>
          <h1 style={productTitle}>{product.name}</h1>
          <div style={ratingRow}>
            <div style={stars}>{[...Array(5)].map((_, i) => <Star key={i} size={16} fill={BRAND_BLUE} color={BRAND_BLUE} />)}</div>
            <span style={reviewCount}>(Verified Purchase)</span>
          </div>

          <div style={priceContainer}>
            <span style={currentPrice}>RWF {product.price?.toLocaleString()}</span>
            <span style={discountTag}>In Stock</span>
          </div>

          <hr style={divider} />

          {/* AI ASSISTANT BOX */}
          <div style={aiSection}>
             <div style={aiHeader}><Sparkles size={18} color={BRAND_BLUE}/> <span>Ask MegaMart AI Assistant</span></div>
             <div style={aiInputRow}>
                <input 
                  style={aiInput} 
                  placeholder="Is this good for gaming? Long battery?"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                />
                <button style={aiBtn} onClick={askGemini} disabled={aiLoading}>
                  {aiLoading ? "..." : <MessageCircle size={18}/>}
                </button>
             </div>
             {aiResponse && <div style={aiResponseBox}>{aiResponse}</div>}
          </div>

          <div style={actionBlock}>
            <div style={qtyPicker}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={qtyBtn}>-</button>
              <span style={{ width: '40px', textAlign: 'center' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={qtyBtn}>+</button>
            </div>
            <button style={buyBtn} onClick={() => handleAddToCart(true)}>Buy Now</button>
            <button style={cartBtn} onClick={() => handleAddToCart(false)}>Add to Cart</button>
          </div>

          <div style={perksGrid}>
            <div style={perkItem}><Truck size={18} color={BRAND_BLUE} /> <span>Kigali Express Delivery</span></div>
            <div style={perkItem}><ShieldCheck size={18} color={BRAND_BLUE} /> <span>Quality Guaranteed</span></div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div style={specSection}>
        <h2 style={specHeading}>Product Description</h2>
        <p style={{ lineHeight: '1.8', color: '#555' }}>{product.description}</p>
      </div>
    </div>
  );
};

// --- NEW STYLES ---
const aiSection = { 
  backgroundColor: '#F0F7FF', 
  padding: '20px', 
  borderRadius: '12px', 
  marginBottom: '25px', 
  border: '1px solid #D0E7FF' 
};
const aiHeader = { display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: BRAND_BLUE, marginBottom: '12px', fontSize: '14px' };
const aiInputRow = { display: 'flex', gap: '8px' };
const aiInput = { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #BBDDFF', outline: 'none' };
const aiBtn = { backgroundColor: BRAND_BLUE, color: 'white', border: 'none', padding: '0 15px', borderRadius: '8px', cursor: 'pointer' };
const aiResponseBox = { marginTop: '15px', backgroundColor: 'white', padding: '15px', borderRadius: '8px', fontSize: '14px', borderLeft: `4px solid ${BRAND_BLUE}`, color: '#444' };

// (Previous styles remain the same)
const pageWrapper = { padding: '40px 8%', backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' };
const loader = { padding: '100px', textAlign: 'center' };
const breadcrumb = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#888', marginBottom: '20px' };
const linkText = { cursor: 'pointer' };
const mainContent = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' };
const imageContainer = { display: 'flex', flexDirection: 'column' };
const mainImgWrapper = { border: '1px solid #eee', borderRadius: '12px', padding: '20px', textAlign: 'center' };
const mainImg = { width: '100%', maxHeight: '450px', objectFit: 'contain' };
const detailsContainer = { display: 'flex', flexDirection: 'column' };
const productTitle = { fontSize: '32px', fontWeight: '800', marginBottom: '10px' };
const ratingRow = { display: 'flex', gap: '10px', marginBottom: '15px' };
const stars = { display: 'flex' };
const reviewCount = { fontSize: '13px', color: '#888' };
const priceContainer = { display: 'flex', alignItems: 'center', gap: '15px' };
const currentPrice = { fontSize: '30px', fontWeight: '800', color: BRAND_BLUE };
const discountTag = { color: '#27ae60', fontWeight: 'bold' };
const divider = { border: 'none', borderTop: '1px solid #eee', margin: '20px 0' };
const actionBlock = { display: 'flex', gap: '15px' };
const qtyPicker = { display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px' };
const qtyBtn = { width: '40px', height: '50px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' };
const buyBtn = { flex: 2, height: '50px', background: BRAND_BLUE, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };
const cartBtn = { flex: 1, height: '50px', background: 'white', border: `1px solid ${BRAND_BLUE}`, color: BRAND_BLUE, borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };
const perksGrid = { display: 'flex', gap: '20px', marginTop: '30px' };
const perkItem = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#666' };
const specSection = { marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '30px' };
const specHeading = { fontSize: '22px', fontWeight: '700', marginBottom: '20px' };

export default ProductDetails;