'use client';
import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FiMessageSquare, FiX, FiSend, FiZap } from 'react-icons/fi';

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

const QUICK_REPLIES = ['What is RK AI Desktop?', 'How much is the subscription?', 'When does RK AI Home ship?'];

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

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

    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [open]);

    const handleOpen = () => {
        setOpen(o => !o);
        if (!open && messages.length === 0) {
            typewriter('Hi! I\'m the Rexycore Assistant. Ask me anything about our products, subscriptions, or ecosystem.');
        }
    };

    const typewriter = async (text) => {
        setIsTyping(true);
        let currentText = '';
        setMessages(prev => [...prev, { text: '', role: 'bot' }]);
        for (let i = 0; i < text.length; i++) {
            currentText += text[i];
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { text: currentText, role: 'bot' };
                return newMessages;
            });
            await new Promise(resolve => setTimeout(resolve, 15));
        }
        setIsTyping(false);
    };

    const send = async (msgOverride) => {
        const userMsg = msgOverride || input;
        if (!userMsg.trim() || loading || isTyping) return;
        setInput('');
        setMessages(prev => [...prev, { text: userMsg, role: 'user' }]);
        setLoading(true);

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
        if (!apiKey) {
            setMessages(prev => [...prev, { text: 'API key not configured.', role: 'bot' }]);
            setLoading(false);
            return;
        }

        const rawModels = (process.env.NEXT_PUBLIC_GEMINI_MODELS || '').trim();
        const fallbackModels = rawModels
            ? rawModels.split(',').map(s => s.trim()).filter(Boolean)
            : ['gemma-3-12b-it', 'gemini-2.5-flash-lite'];

        const genAI = new GoogleGenerativeAI(apiKey);
        const history = messages.map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`).join('\n');
        const prompt = `${SYSTEM_PROMPT}\n\n${history}\nUser: ${userMsg}\nAI:`;

        const isRetryable = (e) => {
            const msg = `${e?.message || ''}`.toLowerCase();
            return msg.includes('503') || msg.includes('429') || msg.includes('timeout');
        };
        const withTimeout = async (promise, ms) => {
            let id;
            const t = new Promise((_, rej) => { id = setTimeout(() => rej(new Error('timeout')), ms); });
            try { return await Promise.race([promise, t]); } finally { clearTimeout(id); }
        };

        const timeoutMs = Number(process.env.NEXT_PUBLIC_GEMINI_TIMEOUT_MS || 20000);
        let lastError = null;
        for (const modelName of fallbackModels) {
            for (let attempt = 1; attempt <= 2; attempt++) {
                try {
                    const model = genAI.getGenerativeModel({ model: modelName });
                    const result = await withTimeout(model.generateContent(prompt), timeoutMs);
                    setLoading(false);
                    await typewriter(result.response.text());
                    return;
                } catch (e) {
                    lastError = e;
                    if (!isRetryable(e)) break;
                    const wait = Math.min(8000, 1000 * Math.pow(2, attempt - 1) + Math.random() * 400);
                    await new Promise(r => setTimeout(r, wait));
                }
            }
        }
        setMessages(prev => [...prev, { text: 'The assistant is busy. Please try again in a moment.', role: 'bot' }]);
        setLoading(false);
    };

    return (
        <div id="chat-widget">
            {/* Panel */}
            <div id="chat-panel" className={open ? 'open' : ''}>
                {/* Header */}
                <div id="chat-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '10px',
                            background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                            <FiZap size={16} color="#fff" />
                        </div>
                        <div>
                            <div style={{ fontWeight: '800', fontSize: '14px', lineHeight: 1.2 }}>Rexycore Assistant</div>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
                                Online
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setOpen(false)} aria-label="Close chat">
                        <FiX size={16} />
                    </button>
                </div>

                {/* Messages */}
                <div id="chat-messages">
                    {messages.map((m, i) => (
                        <div key={i} className={`msg ${m.role}`}>
                            {m.role === 'bot' && (
                                <div className="msg-avatar">RX</div>
                            )}
                            <div className="msg-bubble" dangerouslySetInnerHTML={formatMessage(m.text)} />
                        </div>
                    ))}
                    {loading && (
                        <div className="msg bot">
                            <div className="msg-avatar">RX</div>
                            <div className="msg-bubble">
                                <div className="typing-dots">
                                    <span /><span /><span />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick replies */}
                {messages.length <= 1 && !loading && (
                    <div id="chat-quick-replies">
                        {QUICK_REPLIES.map(q => (
                            <button key={q} className="quick-reply-btn" onClick={() => send(q)}>{q}</button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div id="chat-input-row">
                    <input
                        id="chat-input"
                        ref={inputRef}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && send()}
                        placeholder="Ask anything..."
                    />
                    <button id="chat-send" onClick={() => send()} disabled={loading || isTyping}>
                        <FiSend size={15} />
                    </button>
                </div>
            </div>

            {/* Toggle button */}
            <button id="chat-toggle" onClick={handleOpen} title="Chat with Rexycore" aria-label="Open chat">
                {open ? <FiX size={22} /> : <FiMessageSquare size={22} />}
            </button>
        </div>
    );
}
