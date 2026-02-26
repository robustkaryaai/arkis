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

2. RK AI Home (Pi Client):
   - A hardware voice assistant optimized for Raspberry Pi Zero W (512MB RAM).
   - Features: Gemini LLM integration, Smart Intent Routing (intent_classifier.py), 50+ Offline Commands, Self-Diagnosis (self_diagnosis.py), and a Memory Engine.
   - Price: ₹4,999. Shipping Q3 2026.
   - Status: Hardware Pre-order Phase.
   - Upcoming: Smart Appliance Control (Matter/Tuya/Thread integration).

3. Lumina OS: 
   - A lightweight, AI-integrated operating system built for speed and privacy.
   - Features: AI-native architecture, Linux-based custom UI, and a system-level AI DISABLE SWITCH for total control.
   - Status: In development. Experience it in web at luminaos.vercel.app or join the waitlist.
   - Positioning: A Privacy-First, AI-Native Operating System.

4. Light Key: 
   - An intelligent input system that enhances typing with contextual suggestions and AI-powered assistance.
   - Status: Beta Testing Soon. Join the waitlist.
   - Positioning: Context-Aware Intelligence for Every Keystroke.

Pre-order & Waitlist Process:
- RK AI Home: Click "Pre-order Now" on its product page. Price is ₹4,999 with free shipping. It requires an ARKIS account.
- Lumina OS & Light Key: Click "Join the Waitlist" on their respective pages to secure your spot for the Alpha/Beta phases.
- Account: All actions require being logged into your ARKIS ecosystem account.

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
- If asked about RK AI Home, use the technical summary: It's optimized for Raspberry Pi Zero W (512MB RAM), features Gemini integration, Smart Intent Routing, 100+ Offline Commands, and a Self-Diagnosis engine. It is available for Pre-order at ₹4,999.
- Pre-order process: Users must go to the product page and click "Pre-order Now". They will be asked to login to their ARKIS account and then enter shipping details for payment.
- Waitlist process: For Lumina OS and Light Key, users should click "Join the Waitlist" on the respective product pages.
- Always be polite and representative of the ARKIS brand.
`;

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [modelLabel, setModelLabel] = useState('Gemma');
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

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
        if (!apiKey) {
            setMessages(prev => [...prev, { text: '⚠️ Gemini API Key not found.', role: 'bot' }]);
            setLoading(false);
            return;
        }

        const rawModels = (process.env.NEXT_PUBLIC_GEMINI_MODELS || '').trim();
        const fallbackModels = rawModels
            ? rawModels.split(',').map(s => s.trim()).filter(Boolean)
            : ['gemma-3-12b-it', 'gemini-1.5-flash', 'gemini-1.5-pro'];

        const genAI = new GoogleGenerativeAI(apiKey);

        const history = messages.map(m => `${m.role === 'user' ? 'User' : 'AI Assistant'}: ${m.text}`).join('\n');
        const prompt = `${SYSTEM_PROMPT}\n\n${history}\nUser: ${userMsg}\nAI Assistant:`;

        const isRetryable = (e) => {
            const msg = `${e?.message || ''}`.toLowerCase();
            return msg.includes('503') || msg.includes('429') || msg.includes('high demand') || msg.includes('timeout') || msg.includes('temporar');
        };

        const withTimeout = async (promise, ms) => {
            let timeoutId;
            const timeoutPromise = new Promise((_, reject) => {
                timeoutId = setTimeout(() => reject(new Error('timeout')), ms);
            });
            try {
                return await Promise.race([promise, timeoutPromise]);
            } finally {
                clearTimeout(timeoutId);
            }
        };

        const maxAttemptsPerModel = 2;
        const timeoutMs = Number(process.env.NEXT_PUBLIC_GEMINI_TIMEOUT_MS || 20000);

        let lastError = null;
        for (let modelIndex = 0; modelIndex < fallbackModels.length; modelIndex++) {
            const modelName = fallbackModels[modelIndex];
            setModelLabel(modelName.startsWith('gemma') ? 'Gemma' : 'Gemini');

            for (let attempt = 1; attempt <= maxAttemptsPerModel; attempt++) {
                try {
                    const model = genAI.getGenerativeModel({ model: modelName });
                    const result = await withTimeout(model.generateContent(prompt), timeoutMs);
                    const responseText = result.response.text();
                    setLoading(false);
                    await typewriter(responseText);
                    return;
                } catch (e) {
                    lastError = e;
                    const retryable = isRetryable(e);
                    if (!retryable) break;

                    const base = 1000 * Math.pow(2, attempt - 1);
                    const jitter = Math.floor(Math.random() * 400);
                    const waitTime = Math.min(8000, base + jitter);
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                }
            }
        }

        console.error('Gemini/Gemma request failed:', lastError);
        setMessages(prev => [...prev, { text: 'The chat model is busy right now. Please try again in a moment.', role: 'bot' }]);
        setLoading(false);
    };

    return (
        <div id="chat-widget">
            <div id="chat-panel" className={open ? 'open' : ''}>
                <div id="chat-header">
                    ARKIS Assistant
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
                        Powered by {modelLabel}
                    </div>
                </div>
            </div>
            <button id="chat-toggle" onClick={handleOpen} title="Chat with ARKIS">💬</button>
        </div>
    );
}
