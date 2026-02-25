'use client';
import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// ARKIS KNOWLEDGE BASE
const SYSTEM_PROMPT = `
You are the ARKIS AI Assistant, a helpful and professional representative of ARKIS.
Your goal is to assist users with information about the ARKIS Ecosystem.

ARKIS Products:
1. RK AI Desktop: 
   - A local-first AI system built for personal computing (Windows/macOS).
   - Features: Local model execution (Ollama), system-wide automation, professional PPT/DOCX generation.
   - Status: Downloadable now for macOS & Windows.
   - Positioning: Your personal AI layer for everyday computing.

2. RK AI Home: 
   - An AI system designed for physical environments (Smart Home).
   - Features: Ambient voice control, smart home automation, and ecosystem coordination.
   - Status: Physical hardware product. Available for Pre-order (Shipping Q3 2026).
   - Positioning: AI infrastructure for modern living spaces.

3. Lumina OS: 
   - A lightweight, AI-integrated operating system built for speed and privacy.
   - Features: AI-native architecture, Linux-based custom UI.
   - Status: Downloadable Alpha. Also available to experience in web at lumina-os-web.vercel.app.
   - Positioning: An operating system built for the AI era.

4. Light Key: 
   - An intelligent input system (keyboard evolution).
   - Features: Contextual suggestions, smart commands, and AI typing assistance.
   - Status: Available for Purchase / Beta Access.
   - Positioning: The AI-powered evolution of the keyboard.

5. ARKIS Cloud: 
   - Subscription and resource management layer for syncing preferences and accessing premium hosted models.

Key Philosophies:
- Privacy-First: All data remains local where possible.
- User Autonomy: AI is a tool that empowers, not controls.
- Local AI: Shifting power from the cloud to the edge.
- Engineered in India: Building world-class technology for global users.

Instructions:
- Be concise and premium in your tone.
- If asked about technical details, emphasize privacy and local execution.
- If the user asks for the desktop app, tell them it's available for macOS and Windows on the Products page.
- If asked about RK AI Home, clarify that it is a physical hardware product currently in development and not yet for sale.
- Always be polite and representative of the ARKIS brand.
`;

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleOpen = () => {
        setOpen(o => !o);
        if (!open && messages.length === 0) {
            typewriter('👋 Hi! I\'m the ARKIS Assistant. How can I help you explore our ecosystem today?');
        }
    };

    const typewriter = async (text) => {
        setIsTyping(true);
        let currentText = '';
        const delay = 20; // ms per character

        // Add an empty bot message first
        setMessages(prev => [...prev, { text: '', role: 'bot' }]);

        for (let i = 0; i < text.length; i++) {
            currentText += text[i];
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { text: currentText, role: 'bot' };
                return newMessages;
            });
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        setIsTyping(false);
    };

    const send = async () => {
        if (!input.trim() || loading || isTyping) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { text: userMsg, role: 'user' }]);
        setLoading(true);

        const maxRetries = 3;
        let retryCount = 0;
        let success = false;

        while (retryCount < maxRetries && !success) {
            try {
                const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
                if (!apiKey) {
                    console.error("❌ Please set the GEMINI_KEY environment variable.");
                    setMessages(prev => [...prev, { text: '⚠️ Gemini API Key not found.', role: 'bot' }]);
                    setLoading(false);
                    return;
                }

                const genAI = new GoogleGenerativeAI(apiKey);
                // Using gemma-3-12b-it as corrected by the user
                const model = genAI.getGenerativeModel({ model: "gemma-3-12b-it" });

                const prompt = `${SYSTEM_PROMPT}\n\nUser: ${userMsg}\nAI Assistant:`;
                const result = await model.generateContent(prompt);
                const responseText = result.response.text();

                setLoading(false);
                await typewriter(responseText);
                success = true;
            } catch (error) {
                console.error(`❌ Gemini API Error (Attempt ${retryCount + 1}):`, error);
                
                if (error.message?.includes("503") || error.message?.includes("high demand")) {
                    retryCount++;
                    if (retryCount < maxRetries) {
                        const waitTime = Math.pow(2, retryCount) * 1000;
                        console.log(`⚠️ High demand. Retrying in ${waitTime}ms...`);
                        await new Promise(resolve => setTimeout(resolve, waitTime));
                        continue;
                    }
                }
                
                setMessages(prev => [...prev, { text: '🤖 I experienced a connection issue. Please try again in a moment.', role: 'bot' }]);
                setLoading(false);
                break;
            }
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
                    {loading && (
                        <div className="msg bot">
                            <div className="typing-dots">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div id="chat-input-row" style={{ flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', width: '100%', gap: '8px' }}>
                        <input id="chat-input" value={input} onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask ARKIS anything..." />
                        <button id="chat-send" onClick={send} disabled={loading}>↑</button>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)', textAlign: 'center', opacity: 0.6 }}>
                        Powered by Gemini
                    </div>
                </div>
            </div>
            <button id="chat-toggle" onClick={handleOpen} title="Chat with ARKIS">💬</button>
        </div>
    );
}
