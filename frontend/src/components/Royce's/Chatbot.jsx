import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm here to help you find the perfect accommodation. What are you looking for?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const predefinedResponses = {
    'hello': "Hi there! How can I help you find accommodation today?",
    'hi': "Hello! I'm here to assist you with finding the perfect place to stay.",
    'price': "Our accommodations range from $600 to $1200 per month. Would you like to see properties in a specific price range?",
    'location': "We have properties available in Chitungwiza Unit A, B, C, and L. Which area interests you?",
    'rooms': "We offer accommodations from 2 to 5 rooms. How many bedrooms do you need?",
    'amenities': "Our properties feature Wi-Fi, carpark, borehole water, and modern furnishings. What amenities are most important to you?",
    'booking': "To book an accommodation, you can contact the property owner directly using the contact information provided on each listing.",
    'help': "I can help you with information about our accommodations, pricing, locations, amenities, and the booking process. What would you like to know?",
    'default': "I'd be happy to help you find accommodation! You can ask me about prices, locations, room numbers, amenities, or the booking process."
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return predefinedResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chat-toggle-button"
        >
          <MessageCircle className="chat-icon" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <Bot className="bot-icon" />
              <span className="chat-title">Accommodation Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="close-button"
            >
              <X className="close-icon" />
            </button>
          </div>

          {/* Messages */}
          <div className="messages-container">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.isBot ? 'message-bot' : 'message-user'}`}
              >
                <div className="message-content">
                  <div className="message-bubble">
                    <div className="message-text">
                      {message.isBot ? (
                        <Bot className="message-icon" />
                      ) : (
                        <User className="message-icon" />
                      )}
                      <p>{message.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="chat-input"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="send-button"
              >
                <Send className="send-icon" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;