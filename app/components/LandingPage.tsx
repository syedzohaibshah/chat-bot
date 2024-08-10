"use client";
import React, { useState } from 'react';
import { GrokMessage } from '@/app/types/grok';

const LandingPage: React.FC = () => {
  const [messages, setMessages] = useState<GrokMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: GrokMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: GrokMessage = data.choices[0].message;
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      height: '700px',
      backgroundColor: '#2c2c2c',
      color: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <div style={{ margin: '20px 0px', textAlign: 'center', fontSize: '24px' }}>
        Welcome to Our AI Chat Bot
      </div>
      <div style={{
        width: '70%',
        height: '700px',
        backgroundColor: '#3e3e3e',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          marginBottom: '20px',
        }}>
          {messages.map((message, index) => (
            <div key={index} style={{
              marginBottom: '10px',
              color: message.role === 'user' ? '#ffffff' : '#a0a0a0',
            }}>
              <strong>{message.role === 'user' ? 'You: ' : 'AI: '}</strong>
              {message.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ 
          display: 'flex',
          position: 'relative',
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Chat to AI Bot"
            style={{
              padding: '10px',
              fontSize:'18px',
              paddingRight: '100px', // Make room for the button
              borderRadius: '5px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              position: 'absolute',
              right: '2px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '6px 10px',
              fontSize:'16px',
              marginRight:5,
              borderRadius: '5px',
              backgroundColor: '#4a4a4a',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;