import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Package, Truck, CheckCircle, Tag, LogOut, 
  RefreshCcw, Trash2, Search, DollarSign, 
  ShoppingBag, Copy, ExternalLink, Sparkles, Ticket, Image as ImageIcon
} from 'lucide-react';

const AdminDashboard = ({ setIsAdmin }) => {
  const [activeTab, setActiveTab] = useState('orders'); 
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]); // Restored Coupons State
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({ 
    name: '', price: '', category: 'Smartphones', description: '', image_url: '' 
  });

  const [couponData, setCouponData] = useState({
    code: '', discount_percent: '', description: '', is_active: true
  });
  
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    fetchInventory();
    fetchOrders();
    fetchCoupons(); // Restored Fetch
  }, []);

  // --- MAGIC AI FILL: Text (Gemini) + Image (Unsplash) ---
  const generateProductDetails = async () => {
    if (!formData.name) return alert("Please enter a product name first!");
    setIsGenerating(true);
    try {
      const geminiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const unsplashKey = process.env.REACT_APP_UNSPLASH_KEY;

      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Write a professional tech description for: ${formData.name}. 2 sentences + 3 bullet specs.`;
      const result = await model.generateContent(prompt);

      const imageRes = await fetch(`https://api.unsplash.com/search/photos?query=${formData.name}&client_id=${unsplashKey}&per_page=1`);
      const imageData = await imageRes.json();

      setFormData({ 
        ...formData, 
        description: result.response.text(),
        image_url: imageData.results[0]?.urls?.regular || ''
      });
    } catch (e) { alert("AI Error. Check Keys."); }
    finally { setIsGenerating(false); }
  };

  const fetchInventory = async () => {
    const { data } = await supabase.from('products').select('*');
    if (data) setProducts(data);
  };

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) {
      setOrders(data);
      setTotalSales(data.reduce((sum, o) => sum + (o.total_amount || 0), 0));
    }
    setLoading(false);
  };

  const fetchCoupons = async () => {
    const { data } = await supabase.from('promotions').select('*').order('created_at', { ascending: false });
    if (data) setCoupons(data);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('products').insert([{ ...formData, price: parseFloat(formData.price) }]);
    if (!error) {
      alert("Saved!");
      setFormData({ name: '', price: '', category: 'Smartphones', description: '', image_url: '' });
      fetchInventory();
    }
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('promotions').insert([couponData]);
    if (!error) {
      alert("Coupon Created!");
      setCouponData({ code: '', discount_percent: '', description: '', is_active: true });
      fetchCoupons();
    }
  };

  const deleteProduct = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) fetchInventory();
    }
  };

  const deleteCoupon = async (id) => {
    if (window.confirm("Delete this coupon?")) {
      const { error } = await supabase.from('promotions').delete().eq('id', id);
      if (!error) fetchCoupons();
    }
  };

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px' }}>MegaMart Command Center</h1>
          <p style={{ color: '#666', fontSize: '13px' }}>Rwanda Operations</p>
        </div>
        <button onClick={() => setIsAdmin(false)} style={logoutBtn}><LogOut size={16} /> Logout</button>
      </div>

      <div style={statsContainer}>
        <div style={statCard}>
          <div style={statIconBox}><DollarSign size={20} color="#28a745" /></div>
          <div><p style={statLabel}>REVENUE</p><h2 style={statValue}>RWF {totalSales.toLocaleString()}</h2></div>
        </div>
      </div>

      <div style={tabBar}>
        <button onClick={() => setActiveTab('orders')} style={activeTab === 'orders' ? activeTabBtn : tabBtn}>
          <Package size={18} /> Orders
        </button>
        <button onClick={() => setActiveTab('inventory')} style={activeTab === 'inventory' ? activeTabBtn : tabBtn}>
          <Tag size={18} /> Inventory
        </button>
        <button onClick={() => setActiveTab('coupons')} style={activeTab === 'coupons' ? activeTabBtn : tabBtn}>
          <Ticket size={18} /> Coupons
        </button>
      </div>

      {activeTab === 'orders' && (
        <div style={panelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <h3 style={{margin:0}}>Recent Sales</h3>
            <button onClick={fetchOrders} style={refreshBtn}><RefreshCcw size={18} /></button>
          </div>
          <table style={tableStyle}>
            <thead>
              <tr style={thRow}>
                <th>ID / DATE</th>
                <th>CUSTOMER</th>
                <th>TOTAL</th>
                <th>COUPON</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={trStyle}>
                  <td>
                    <div style={{fontSize: '10px', color: '#888'}}>{o.id.slice(0,8)}</div>
                    <div style={{fontSize: '11px'}}>{new Date(o.created_at).toLocaleDateString()}</div>
                  </td>
                  <td style={{fontSize: '12px'}}>{o.user_email || 'Guest'}</td>
                  <td style={{fontWeight: 'bold'}}>RWF {o.total_amount?.toLocaleString()}</td>
                  <td>{o.coupon_used ? <span style={couponBadge}>{o.coupon_used}</span> : <span style={{color:'#ccc'}}>—</span>}</td>
                  <td><span style={statusBadge}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div style={inventoryGridStyle}>
          <div style={panelStyle}>
            <h3>Add Product</h3>
            <form onSubmit={handleAddProduct} style={formCol}>
              {formData.image_url && <img src={formData.image_url} alt="" style={imagePreviewImg} />}
              <div style={{display:'flex', gap:'8px'}}>
                <input style={inputStyle} placeholder="Product Name" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} required />
                <button type="button" onClick={generateProductDetails} style={magicBtn}>{isGenerating ? <RefreshCcw className="animate-spin" size={16}/> : <Sparkles size={16}/>}</button>
              </div>
              <input style={inputStyle} type="number" placeholder="Price (RWF)" value={formData.price} onChange={e=>setFormData({...formData, price:e.target.value})} required />
              <textarea style={{...inputStyle, minHeight: '100px'}} placeholder="AI Description..." value={formData.description} onChange={e=>setFormData({...formData, description:e.target.value})} />
              <button style={mainBtn}>Save Product</button>
            </form>
          </div>
          <div style={panelStyle}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px'}}>
              <h3 style={{margin:0}}>Stock</h3>
              <div style={searchContainer}><Search size={14} color="#888" /><input style={searchInput} placeholder="Search..." onChange={e=>setSearchTerm(e.target.value)} /></div>
            </div>
            {filteredProducts.map(p => (
              <div key={p.id} style={itemRow}>
                <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                  <img src={p.image_url} style={{width:'30px', height:'30px', borderRadius:'4px', objectFit:'cover'}} alt=""/>
                  <div><div style={{fontWeight:'bold', fontSize:'13px'}}>{p.name}</div><div style={{fontSize:'10px', color:'#888'}}>RWF {p.price?.toLocaleString()}</div></div>
                </div>
                <button onClick={() => deleteProduct(p.id, p.name)} style={deleteBtn}><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'coupons' && (
        <div style={inventoryGridStyle}>
          <div style={panelStyle}>
            <h3>Create Coupon</h3>
            <form onSubmit={handleAddCoupon} style={formCol}>
              <input style={inputStyle} placeholder="CODE (e.g. MEGA20)" value={couponData.code} onChange={e => setCouponData({...couponData, code: e.target.value.toUpperCase()})} required />
              <input style={inputStyle} type="number" placeholder="Discount %" value={couponData.discount_percent} onChange={e => setCouponData({...couponData, discount_percent: e.target.value})} required />
              <button style={{...mainBtn, backgroundColor: '#6200ea'}}>Activate Coupon</button>
            </form>
          </div>
          <div style={panelStyle}>
            <h3>Active Promotions</h3>
            <table style={tableStyle}>
              <thead><tr style={thRow}><th>CODE</th><th>OFF</th><th>ACTION</th></tr></thead>
              <tbody>
                {coupons.map(c => (
                  <tr key={c.id} style={trStyle}>
                    <td style={{fontWeight:'bold'}}>{c.code}</td>
                    <td>{c.discount_percent}%</td>
                    <td><button onClick={() => deleteCoupon(c.id)} style={deleteBtn}><Trash2 size={12} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// --- STYLES ---
const containerStyle = { padding: '15px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'sans-serif' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
const statsContainer = { display: 'flex', gap: '15px', marginBottom: '20px' };
const statCard = { flex: '1', backgroundColor: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' };
const statIconBox = { padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '8px' };
const statLabel = { margin: 0, fontSize: '10px', color: '#888', fontWeight: 'bold' };
const statValue = { margin: 0, fontSize: '16px', color: '#222' };
const tabBar = { display: 'flex', gap: '15px', marginBottom: '20px', borderBottom: '1px solid #ddd' };
const tabBtn = { background: 'none', border: 'none', padding: '10px 5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#666', borderBottom: '3px solid transparent' };
const activeTabBtn = { ...tabBtn, borderBottomColor: '#008ECC', color: '#008ECC', fontWeight: 'bold' };
const panelStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' };
const inventoryGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' };
const formCol = { display: 'flex', flexDirection: 'column', gap: '10px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', width: '100%', boxSizing: 'border-box' };
const mainBtn = { padding: '12px', backgroundColor: '#008ECC', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%' };
const magicBtn = { backgroundColor: '#6200ea', color: 'white', border: 'none', borderRadius: '8px', padding: '0 15px', cursor: 'pointer', display: 'flex', alignItems: 'center' };
const deleteBtn = { backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer' };
const logoutBtn = { display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#212121', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const thRow = { textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '11px', color: '#888', height: '30px' };
const trStyle = { borderBottom: '1px solid #f9f9f9', height: '45px' };
const statusBadge = { backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', textTransform: 'capitalize' };
const couponBadge = { backgroundColor: '#f0f9ff', color: '#008ECC', padding: '3px 7px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', border: '1px dashed #008ECC' };
const searchContainer = { display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: '#f0f2f5', padding: '5px 10px', borderRadius: '20px' };
const searchInput = { border: 'none', background: 'none', outline: 'none', fontSize: '12px' };
const itemRow = { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f9f9f9', alignItems: 'center' };
const imagePreviewImg = { width: '100%', maxHeight: '130px', objectFit: 'contain', borderRadius: '8px', marginBottom: '10px', border: '1px solid #eee' };
const refreshBtn = { background: 'none', border: 'none', cursor: 'pointer', color: '#888' };

export default AdminDashboard;