import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from '../../Layout';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
        
    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/chat/messages');
            setMessages(response.data.data); // Assuming the messages are in a 'data' array
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    useEffect(() => {
        const username = localStorage.getItem('name');
        if(username === null){
          navigate('/');
        }
        fetchMessages();
        const interval = setInterval(fetchMessages, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = async () => {
        const sender = localStorage.getItem('name') || 'Unknown';
        try {
            await axios.post('http://localhost:8080/api/v1/chat/sendMessage', {
                sender: sender,
                message: newMessage
            });
            setNewMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <div className="flex flex-col gap-[1rem] mt-[2rem] max-w-[40rem] mx-auto">
                    {Array.isArray(messages) && messages.map(message => (
                        <div key={message.id} className={`flex ${message.sender === localStorage.getItem('name') ? 'justify-end' : 'justify-start'}`}>
                            <div className={`bg-gray-200 p-2 rounded-md ${message.sender === localStorage.getItem('name') ? 'ml-auto' : 'mr-auto'}`}>
                                <p className="text-sm">{message.sender}</p>
                                <p>{message.message}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex flex-col gap-[1rem] mt-[2rem] max-w-[40rem] mx-auto">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        className="flex-1 p-2 rounded-l-md border border-gray-300 focus:outline-none"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white m-2 p-2 rounded-r-md hover:bg-blue-700 focus:outline-none"
                    >
                        Send
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default ChatPage;
