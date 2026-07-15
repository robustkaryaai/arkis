'use client';
import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';

// Rexycore KNOWLEDGE BASE
const SYSTEM_PROMPT = `
You are the Rexycore AI Assistant, a helpful and professional representative of Rexycore.
Your goal is to assist users with information about the Rexycore Ecosystem.

Rexycore Products:
1. RK AI Desktop:
   - A local-first AI system built for personal computing (Windows, macOS, Linux).
   - Features: Local model execution via Ollama (Spark Engine), system-wide automation, professional PPT/DOCX generation, offline voice command & chat, offline TTS & STT.
   - Status: Available NOW — downloadable for macOS, Windows & Linux.
   - Positioning: Your personal AI layer for everyday computing. Privacy-first, runs entirely on your machine.

2. RK AI Home (Pi Client):
   - A hardware voice assistant optimized for Raspberry Pi Zero W (512 MB RAM).
   - Features: Gemini LLM integration, Smart Intent Routing (intent_classifier.py), 100+ Offline Commands, Self-Diagnosis engine (self_diagnosis.py), Memory Engine, and upcoming Smart Appliance Control (Matter / Tuya / Thread).
   - Price: ₹4,999 with free shipping.
   - Status: Hardware Pre-order Phase. Shipping Q3 2026.
   - Positioning: Privacy-first AI that runs at home without the cloud.

3. Lumina OS:
   - A lightweight, AI-integrated operating system built for speed, privacy, and intelligent workflows.
   - Features: AI-native Linux-based architecture, custom UI, and a system-level AI DISABLE SWITCH for total user control.
   - Status: In active development. Web preview at luminaos.vercel.app. Join the notify list for early access.
   - Positioning: A Privacy-First, AI-Native Operating System. Built for the future of computing.

4. Light Key:
   - An intelligent input system that enhances typing with contextual AI-powered suggestions.
   - Status: Beta Testing Soon. Join the waitlist.
   - Positioning: Context-Aware Intelligence for Every Keystroke.

5. MALUS:
   - An AI Operating Companion that observes context and workflow on your computer (with permission).
   - Features: Context awareness, workflow intelligence, local AI first, resource-aware.
   - Status: Available for Windows (macOS & Linux coming later).
   - Positioning: It is NOT a feature of RK AI, and RK AI is NOT a feature of MALUS. They are independent but complementary ecosystem products.

Subscription — RK AI (Rexycore Cloud):
- Rexycore has ONE unified subscription plan. There are NO separate Pro, Elite, or Quantum tiers.
- A single RK AI subscription covers BOTH RK AI Desktop AND RK AI Home — full access to all features across both platforms.
- If a user asks about Pro, Elite, or any other tier — clarify clearly that those plans NO LONGER EXIST. There is only one subscription: RK AI.
- Subscription pricing details will be available soon. Users can contact rexycoreofficial@gmail.com for early access inquiries.

Waitlist & Pre-order Process:
- RK AI Home: Click "Pre-order Now" on the product page. Requires a Rexycore account. Price ₹4,999 + free shipping.
- Lumina OS & Light Key: Click "Join the Waitlist" / "Notify Me" on their respective pages to get priority access.
- All actions require being logged into your Rexycore account.

Key Philosophies:
- Privacy-First: All data remains local where possible. No surveillance, no data harvesting.
- User Autonomy: AI is a tool that empowers, not controls.
- Local AI: Shifting power from the cloud to the edge.
- Engineered in India: Building world-class technology for global users.

Instructions for responding:
- Give short, clear, and concise answers. Avoid long walls of text.
- Be premium and confident in tone — you represent a cutting-edge tech brand.
- Never mention Pro, Elite, or Quantum plans — they are discontinued. Only one plan exists: the unified RK AI subscription.
- If asked about RK AI Home technical details: Raspberry Pi Zero W (512 MB RAM), Gemini integration, Smart Intent Routing, 100+ Offline Commands, Self-Diagnosis engine. Pre-order at ₹4,999.
- For subscription questions: always direct to the single unified RK AI plan and clarify there are no tiers.
- Always be polite and representative of the Rexycore brand.
`;

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [modelLabel, setModelLabel] = useState('Gemma');
    const messagesEndRef = useRef(null);

    const formatMessage = (text) => {
        if (!text) return { __html: '' };
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
        formatted = formatted.replace(/\n/g, '<br/>');
        return { __html: formatted };
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleOpen = () => {
        setOpen(o => !o);
        if (!open && messages.length === 0) {
            typewriter('Hi! I\'m the Rexycore Assistant. How can I help you explore our ecosystem today?');
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
            setMessages(prev => [...prev, { text: 'Gemini API Key not found.', role: 'bot' }]);
            setLoading(false);
            return;
        }

        const rawModels = (process.env.NEXT_PUBLIC_GEMINI_MODELS || '').trim();
        const fallbackModels = rawModels
            ? rawModels.split(',').map(s => s.trim()).filter(Boolean)
            : ['gemma-3-12b-it', 'gemini-3.1-flash-lite', 'gemini-2.5-flash-lite'];

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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiMessageSquare size={18} />
                        <span>Rexycore Assistant</span>
                    </div>
                    <button onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiX size={18} />
                    </button>
                </div>
                <div id="chat-messages">
                    {messages.map((m, i) => (
                        <div key={i} className={`msg ${m.role}`} dangerouslySetInnerHTML={formatMessage(m.text)} />
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
                            onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask Rexycore anything..." />
                        <button id="chat-send" onClick={send} disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FiSend size={16} />
                        </button>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)', textAlign: 'center', opacity: 0.6 }}>
                        Powered by Google API
                    </div>
                </div>
            </div>
            <button id="chat-toggle" onClick={handleOpen} title="Chat with Rexycore" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <FiMessageSquare size={24} />
            </button>
        </div>
    );
}
