'use client';
import { useState, useEffect, useRef } from 'react';

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [ws, setWs] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const addMsg = (text, role) => setMessages(prev => [...prev, { text, role }]);

    const connect = () => {
        try {
            const socket = new WebSocket('ws://localhost:8765');
            socket.onopen = () => { addMsg('✅ Connected to RK AI! Ask me anything.', 'bot'); setWs(socket); };
            socket.onmessage = (e) => {
                try { const d = JSON.parse(e.data); if (d.text) addMsg(d.text, 'bot'); }
                catch { addMsg(e.data, 'bot'); }
            };
            socket.onclose = () => addMsg('Disconnected from RK AI.', 'bot');
            socket.onerror = () => addMsg('RK AI desktop app isn\'t running. Download it to get started!', 'bot');
        } catch { addMsg('WebSocket not supported.', 'bot'); }
    };

    const handleOpen = () => {
        setOpen(o => !o);
        if (!open && messages.length === 0) {
            addMsg('👋 Hi! I\'m RK AI by ARKIS. Run the desktop app to chat with me live — or download it below!', 'bot');
        }
        if (!open && !ws) connect();
    };

    const send = () => {
        if (!input.trim()) return;
        addMsg(input, 'user');
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ command: 'chat', prompt: input }));
        } else {
            setTimeout(() => addMsg('🤖 Run the RK AI desktop app to get live responses!', 'bot'), 300);
        }
        setInput('');
    };

    return (
        <div id="chat-widget">
            <div id="chat-panel" className={open ? 'open' : ''}>
                <div id="chat-header">
                    🤖 RK AI Assistant
                    <button onClick={() => setOpen(false)}>✕</button>
                </div>
                <div id="chat-messages">
                    {messages.map((m, i) => (
                        <div key={i} className={`msg ${m.role}`}>{m.text}</div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div id="chat-input-row">
                    <input id="chat-input" value={input} onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask RK AI anything..." />
                    <button id="chat-send" onClick={send}>↑</button>
                </div>
            </div>
            <button id="chat-toggle" onClick={handleOpen} title="Chat with RK AI">💬</button>
        </div>
    );
}
