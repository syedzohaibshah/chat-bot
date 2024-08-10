import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#2c2c2c',
      color: '#ffffff',            
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px' }}>
        Welcome to Our AI Chat Bot
      </div>
      <div style={{
        width: '1000px',
        height: '700px',
        backgroundColor: '#3e3e3e',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        <input
          id="chatInput"
          type="text"
          placeholder="Chat to AI Bot"
          style={{
            padding: '10px',
            borderRadius: '5px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      </div>
    </div>
  );
}

export default LandingPage;
