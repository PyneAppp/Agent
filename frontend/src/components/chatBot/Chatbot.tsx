import React, { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import "./Chatbot.scss";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm here to help you find the perfect accommodation. What are you looking for?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const predefinedResponses = {
    hello: "Hi there! How can I help you find accommodation today?",
    hi: "Hello! I'm here to assist you with finding the perfect place to stay.",
    price:
      "Our accommodations range from $800 to $1400 per month. Would you like to see properties in a specific price range?",
    location:
      "We have properties available in Chitungwiza Unit A, B, C, and L. Which area interests you?",
    rooms:
      "We offer accommodations from 3 to 8 rooms. How many bedrooms do you need?",
    amenities:
      "Our properties feature Wi-Fi, carpark, borehole water, and modern furnishings. What amenities are most important to you?",
    booking:
      "To book an accommodation, you can contact the property owner directly using the contact information provided on each listing.",
    help: "I can help you with information about our accommodations, pricing, locations, amenities, and booking process. What would you like to know?",
    default:
      "I'd be happy to help you find accommodation! You can ask me about prices, locations, room numbers, amenities, or the booking process.",
  };

  const getBotResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('http://localhost:5000/openrouter/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.reply || "I'm sorry, I couldn't process your request right now.";
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback to predefined responses
      const lowerMessage = userMessage.toLowerCase();
      for (const [key, response] of Object.entries(predefinedResponses)) {
        if (key !== "default" && lowerMessage.includes(key)) {
          return response;
        }
      }
      return predefinedResponses.default;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    const currentInputText = inputText;
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "Thinking...",
      isBot: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, loadingMessage]);

    // Get AI response
    try {
      const responseText = await getBotResponse(currentInputText);
      
      // Replace loading message with actual response
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === loadingMessage.id 
            ? { ...msg, text: responseText }
            : msg
        )
      );
    } catch (error) {
      // Replace loading message with error message
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === loadingMessage.id 
            ? { ...msg, text: "I'm sorry, I encountered an error. Please try again." }
            : msg
        )
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
          className="chatbot-open-button"
          aria-label="Open chat"
        >
          <MessageCircle className="icon icon-message-circle" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="chatbot-window"
          role="dialog"
          aria-modal="true"
          aria-label="Accommodation Assistant Chatbot"
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-title">
              <Bot className="icon icon-bot" />
              <span>Accommodation Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="chatbot-close-button"
              aria-label="Close chat"
            >
              <X className="icon icon-close" />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message-wrapper ${
                  message.isBot ? "message-bot" : "message-user"
                }`}
              >
                <div className="chatbot-message">
                  <div className="chatbot-message-content">
                    {message.isBot ? (
                      <Bot className="icon icon-bot-small" />
                    ) : (
                      <User className="icon icon-user-small" />
                    )}
                    <p>{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="chatbot-input-area">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="chatbot-input"
              aria-label="Type your message"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="chatbot-send-button"
              aria-label="Send message"
            >
              <Send className="icon icon-send" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
