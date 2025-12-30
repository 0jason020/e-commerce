import React, { useState } from 'react';

const AIAssistant = ({ productName, productDescription }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question) return;
    setLoading(true);
    
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert sales assistant for MegaMart Rwanda. 
                     The product is ${productName}. Description: ${productDescription}. 
                     Answer this customer question: ${question}`
            }]
          }]
        })
      });

      const data = await response.json();
      setAnswer(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer("Sorry, I couldn't process that right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h4 style={{ marginBottom: '10px', color: '#008ECC' }}>MegaMart AI Assistant</h4>
      <input 
        style={inputStyle}
        placeholder={`Ask about the ${productName}...`}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button style={btnStyle} onClick={askAI} disabled={loading}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>
      {answer && <div style={answerBox}>{answer}</div>}
    </div>
  );
};

// --- STYLES ---
const containerStyle = { marginTop: '20px', padding: '20px', backgroundColor: '#f0faff', borderRadius: '12px', border: '1px solid #ccebff' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '10px' };
const btnStyle = { backgroundColor: '#008ECC', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' };
const answerBox = { marginTop: '15px', fontSize: '14px', lineHeight: '1.5', color: '#333', backgroundColor: 'white', padding: '15px', borderRadius: '8px' };

export default AIAssistant;