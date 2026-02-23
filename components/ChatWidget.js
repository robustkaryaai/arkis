'use client';
import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// ARKIS KNOWLEDGE BASE
const SYSTEM_PROMPT = `
You are the ARKIS AI Assistant, a helpful and professional representative of ARKIS.
Your goal is to assist users with information about the ARKIS Ecosystem.

ARKIS Products:
1. ARKIS Desktop: A flagship AI assistant for power users. Features local model execution, system-wide automation, and privacy-first intelligence.
2. ARKIS Home: Hardware-integrated ambient intelligence for physical spaces.
3. Lumina OS: A next-generation, AI-first decentralized operating system.
4. Light Key: Proprietary authentication and access layer for the ecosystem.
5. ARKIS Cloud: Subscription and resource management layer.

Key Philosophies:
- Privacy-First: All data remains local where possible.
- User Autonomy: AI is a tool that empowers, not controls.
- Local AI: Shifting power from the cloud to the edge.

Instructions:
- Be concise and premium in your tone.
- If asked about technical details, emphasize privacy and local execution.
- If the user asks for the desktop app, tell them it's available for macOS and Windows on the Products page.
- Always be polite and representative of the ARKIS brand.
`;

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Maintenance of Chat History for Gemini API
    const [chatSession, setChatSession] = useState(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const initGemini = async () => {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
            setMessages([{ text: '⚠️ Gemini API Key not found. Please add NEXT_PUBLIC_GEMINI_API_KEY to your env.', role: 'bot' }]);
            return null;
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemma-3-12b-it as requested
        const model = genAI.getGenerativeModel({
            model: "gemma-3-12b-it",
            systemInstruction: SYSTEM_PROMPT
        });

        const chat = model.startChat({
            history: [],
            generationConfig: { maxOutputTokens: 500 }
        });
        setChatSession(chat);
        return chat;
    };

    const handleOpen = async () => {
        setOpen(o => !o);
        if (!open && messages.length === 0) {
            setMessages([{ text: '👋 Hi! I\'m the ARKIS Assistant. How can I help you explore our ecosystem today?', role: 'bot' }]);
            if (!chatSession) await initGemini();
        }
    };

    const send = async () => {
        if (!input.trim() || loading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { text: userMsg, role: 'user' }]);
        setLoading(true);

        try {
            let session = chatSession;
            if (!session) session = await initGemini();
            if (!session) { setLoading(false); return; }

            const result = await session.sendMessage(userMsg);
            const responseText = result.response.text();

            setMessages(prev => [...prev, { text: responseText, role: 'bot' }]);
        } catch (error) {
            console.error("Gemini Error:", error);
            setMessages(prev => [...prev, { text: '🤖 I experienced a connection issue. Please ensure your API key is valid.', role: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="chat-widget">
            <div id="chat-panel" className={open ? 'open' : ''}>
                <div id="chat-header">
                    🤖 ARKIS Assistant
                    <button onClick={() => setOpen(false)}>✕</button>
                </div>
                <div id="chat-messages">
                    {messages.map((m, i) => (
                        <div key={i} className={`msg ${m.role}`}>{m.text}</div>
                    ))}
                    {loading && <div className="msg bot">...</div>}
                    <div ref={messagesEndRef} />
                </div>
                <div id="chat-input-row" style={{ flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', width: '100%', gap: '8px' }}>
                        <input id="chat-input" value={input} onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask ARKIS anything..." />
                        <button id="chat-send" onClick={send} disabled={loading}>↑</button>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)', textAlign: 'center', opacity: 0.6 }}>
                        Powered by Gemma
                    </div>
                </div>
            </div>
            <button id="chat-toggle" onClick={handleOpen} title="Chat with ARKIS">💬</button>
        </div>
    );
}
