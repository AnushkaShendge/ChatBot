import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Fetch initial chat messages or setup here
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      return;
    }

    try {
      const newMessage = { userInput: inputText, sender: 'user' };
      setMessages([...messages, newMessage]); // Update UI with user's message

      const response = await axios.post('http://localhost:3000/home/messages', { userInput: inputText });
      
      // Handle response data from the API
      const botResponse = response.data.response.candidates[0].content.parts[0].text;
      const botMessage = { userInput: botResponse, sender: 'bot' };

      setMessages([...messages, botMessage]); // Update UI with bot's response
      setInputText(''); // Clear input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logging out...');
    // Redirect to logout endpoint or clear session/storage
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Chatbot</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Chat Content */}
      <div className="flex flex-row flex-1">
        {/* Previous Chats Panel */}
        <div className="bg-gray-600 p-4 w-1/3">
          <h2 className="text-lg font-bold mb-2 mt-8">Previous Chats</h2>
          <ul>
            {messages.map((message, index) => (
              <li key={index} className={`bg-${message.sender === 'user' ? 'white' : 'gray-300'} rounded p-2 mb-2`}>
                <span className="font-bold">{message.sender === 'user' ? 'You:' : 'Bot:'}</span> {message.userInput}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-300">
          {/* Chat Messages */}
          <div className="messages flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`message p-2 rounded mb-2 ${message.sender === 'user' ? 'bg-white' : 'bg-gray-300'}`}>
                <span className="font-bold">{message.sender === 'user' ? 'You:' : 'Bot:'}</span> {message.userInput}
              </div>
            ))}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSubmit} className="p-4 flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 border border-gray-300 rounded mr-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
