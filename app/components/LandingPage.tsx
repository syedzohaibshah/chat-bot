"use client";
import React, { useState } from 'react';
import { GrokMessage } from '@/app/types/grok';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useRouter } from 'next/navigation';


const LandingPage: React.FC = () => {
  const [messages, setMessages] = useState<GrokMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
    <div className="container">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="logoutButton"
      >
        Logout
      </button>
      
      <div className="title">
        Welcome to Our AI Chat Bot
      </div>
      <div className="chatContainer">
        <div className="messagesContainer">
          {messages.map((message, index) => (
            <div key={index} className="message" style={{
              color: message.role === 'user' ? '#ffffff' : '#a0a0a0',
            }}>
              <strong>{message.role === 'user' ? 'You: ' : 'AI: '}</strong>
              {message.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="chatForm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Chat to AI Bot"
            className="input"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="sendButton"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
