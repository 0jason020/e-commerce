import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, KeyRound, ArrowRight, ShieldCheck, Loader2, RefreshCw, AlertCircle } from 'lucide-react';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  // Timer logic for Resend Code button
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.error("Login Error:", error.status, error.message);
      alert("Login Error: " + error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);
    console.log("Attempting signup for:", email);

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: window.location.origin 
      }
    });
    
    if (error) {
      // THIS LOGS THE EXACT REASON FOR THE 422 ERROR IN YOUR CONSOLE
      console.error("SIGNUP FAIL -> Status:", error.status, "Message:", error.message);
      alert("Registration Error: " + error.message);
    } else {
      console.log("Signup success, showing OTP screen");
      setShowOtpScreen(true);
      setResendTimer(60); 
    }
    setLoading(false);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otpToken,
      type: 'signup',
    });

    if (error) {
      console.error("Verification Error:", error.message);
      alert('Verification Failed: ' + error.message);
    } else {
      alert('Success! Welcome to MegaMart Rwanda.');
      navigate('/');
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setLoading(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });
    if (error) {
      console.error("Resend Error:", error.message);
      alert(error.message);
    } else {
      alert('A new code has been sent!');
      setResendTimer(60);
    }
    setLoading(false);
  };

  if (showOtpScreen) {
    return (
      <div style={container}>
        <div style={authCard}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <ShieldCheck size={54} color="#008ECC" />
          </div>
          <h2 style={title}>Verify Your Email</h2>
          <p style={subtitle}>We sent a 6-digit code to <br/><strong>{email}</strong></p>
          
          <form onSubmit={handleVerifyCode} style={form}>
            <div style={inputWrapper}>
              <KeyRound size={18} color="#888" />
              <input 
                type="text" 
                placeholder="000000" 
                style={input} 
                value={otpToken} 
                onChange={(e) => setOtpToken(e.target.value)}
                maxLength="6"
                autoFocus
                required 
              />
            </div>
            <button type="submit" style={submitBtn} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Confirm Code'}
            </button>
          </form>

          <button 
            onClick={handleResendOtp} 
            disabled={resendTimer > 0 || loading}
            style={{...resendBtn, color: resendTimer > 0 ? '#ccc' : '#008ECC'}}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> 
            {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Verification Code'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <div style={authCard}>
        <h2 style={title}>{isSignUp ? 'Join MegaMart' : 'Welcome Back'}</h2>
        <p style={subtitle}>Rwanda's Premier Wholesale Electronics Store</p>
        
        <form onSubmit={isSignUp ? handleSignUp : handleLogin} style={form}>
          <div style={inputGroup}>
            <label style={labelStyle}>Email Address</label>
            <div style={inputWrapper}>
              <Mail size={18} color="#888" />
              <input 
                type="email" 
                placeholder="you@example.com" 
                style={input} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Password</label>
            <div style={inputWrapper}>
              <Lock size={18} color="#888" />
              <input 
                type="password" 
                placeholder="••••••••" 
                style={input} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            {isSignUp && (
              <p style={{...passHint, color: password.length >= 6 ? '#2e7d32' : '#d32f2f'}}>
                <AlertCircle size={12} /> Must be at least 6 characters
              </p>
            )}
          </div>

          <button type="submit" style={submitBtn} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? 'Create Account' : 'Sign In')} 
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p style={toggleText}>
          {isSignUp ? 'Already a member?' : "New to our store?"}
          <span style={toggleLink} onClick={() => {
            setIsSignUp(!isSignUp);
            setPassword(''); // Clear password when switching
          }}>
            {isSignUp ? ' Login' : ' Sign Up Free'}
          </span>
        </p>
      </div>
    </div>
  );
};

// --- STYLES ---
const container = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh', backgroundColor: '#f4f7f9', padding: '20px' };
const authCard = { backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.07)', width: '100%', maxWidth: '420px' };
const title = { fontSize: '26px', fontWeight: '800', marginBottom: '8px', textAlign: 'center', color: '#1a1a1a' };
const subtitle = { fontSize: '15px', color: '#666', textAlign: 'center', marginBottom: '32px' };
const form = { display: 'flex', flexDirection: 'column', gap: '18px' };
const inputGroup = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '12px', fontWeight: '700', color: '#333', textTransform: 'uppercase' };
const inputWrapper = { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', border: '2px solid #f0f0f0', borderRadius: '12px' };
const input = { border: 'none', outline: 'none', width: '100%', fontSize: '16px' };
const passHint = { fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: '600' };
const submitBtn = { backgroundColor: '#008ECC', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '16px', marginTop: '10px' };
const toggleText = { textAlign: 'center', marginTop: '28px', fontSize: '14px', color: '#666' };
const toggleLink = { color: '#008ECC', cursor: 'pointer', fontWeight: '800', marginLeft: '6px' };
const resendBtn = { background: 'none', border: 'none', marginTop: '20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%' };

export default AuthPage;