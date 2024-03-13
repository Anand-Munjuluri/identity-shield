import React, { useState } from 'react';
import '../App.css'

function ChatBot() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Shield AI', text: 'Hello! How can I assist you today?' },
  ]);
  const [showWhatIs, setShowWhatIs] = useState(true);
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [showContactSupport, setShowContactSupport] = useState(true);
  const [showStartKYC, setShowStartKYC] = useState(true);

  const handleOptionClick = (option) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'User',
      text: option,
    };
    setMessages([...messages, newMessage]);
    
    switch (option) {
      case 'What is Identity Shield?':
        setShowWhatIs(false);
        break;
      case 'Get started with Identity Shield':
        setShowGetStarted(false);
        break;
      case 'Contact support':
        setShowContactSupport(false);
        break;
      case 'Start KYC':
        setShowStartKYC(false);
        document.getElementById('fileInput').click();
        break;
      default:
        break;
    }

    if (option !== 'Start KYC') {
      generateResponse(option);
    }
  };

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const response = await fetch('/upload-image', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
        generateResponse('Analyzing the ID... ID recognized successfully!');
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  const generateResponse = async (input) => {
    let response;
    switch (input) {
      case 'What is Identity Shield?':
        response = "Identity Shield is an advanced identity protection system that safeguards your personal information from online threats.";
        break;
      case 'Get started with Identity Shield':
        response = "To get started with Identity Shield, simply visit our website and sign up for an account.";
        break;
      case 'Contact support':
        response = "You can contact our support team by emailing support@identityshield.com or calling 1-800-123-4567.";
        break;
      case 'Start KYC':
        response = "Please upload an image for KYC verification.";
        break;
      default:
        response = "Analyzing, please wait";
    }
    setTimeout(async () => {
      const newMessage = {
        id: messages.length + 1,
        sender: 'Shield AI',
        text: response,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Speak out the AI response
      speakText(response, 'en-IN');
    }, 1000);
  };

  const speakText = (text, lang) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = lang; // Set the language for speech synthesis
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Identity Shield</h1>
      </header>
      <div className="chat-container">
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender.toLowerCase()}`}>
              <span className="sender">{message.sender}</span>
              <p className="text">{message.text}</p>
            </div>
          ))}
        </div>
        <div className="options-container">
          {showWhatIs && (
            <button onClick={() => handleOptionClick('What is Identity Shield?')}>What is Identity Shield?</button>
          )}
          {showGetStarted && (
            <button onClick={() => handleOptionClick('Get started with Identity Shield')}>Get started with Identity Shield</button>
          )}
          {showContactSupport && (
            <button onClick={() => handleOptionClick('Contact support')}>Contact support</button>
          )}
          {showStartKYC && (
            <button onClick={() => handleOptionClick('Start KYC')}>Start KYC</button>
          )}
        </div>
      </div>
      <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageUpload} />
    </div>
  );
}

export default ChatBot;

