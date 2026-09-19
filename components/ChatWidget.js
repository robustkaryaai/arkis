'use client';
import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FiMessageSquare, FiX, FiSend, FiZap } from 'react-icons/fi';

import { SYSTEM_BEHAVIOR_PROMPT, getRelevantKnowledge } from '@/lib/rexycore-knowledge';

const QUICK_REPLIES = [
  'What is Neytreya?', 
  'What can Neytreya remember?', 
  'What are the RK AI plans?', 
  'What is Venava?'
];

const STORAGE_KEY = 'rk_chat_history_v1';
const TYPING_TEXT = 'Hi! I\'m the Rexycore Assistant. Ask me anything about our products, subscriptions, or ecosystem.';

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const didLoad = useRef(false);

    const formatMessage = (text) => {
        if (!text) return { __html: '' };
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
        formatted = formatted.replace(/\n/g, '<br/>');
        return { __html: formatted };
    };

    useEffect(() => {
        if (didLoad.current) return;
        didLoad.current = true;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                }
            }
        } catch (_) {}
    }, []);

    useEffect(() => {
        if (!didLoad.current) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch (_) {}
    }, [messages]);

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
            typewriter(TYPING_TEXT);
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
            : ['gemini-3.1-flash-lite-preview', 'gemma-4-26b-a4b-it'];

        const genAI = new GoogleGenerativeAI(apiKey);
        const systemInstruction = SYSTEM_BEHAVIOR_PROMPT + "\n\nRelevant Context:\n" + getRelevantKnowledge(userMsg);
        
        // Map previous messages to Gemini history format
        // Gemini requires history to start with a 'user' message — drop any leading bot messages
        const allHistory = messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));
        const firstUserIdx = allHistory.findIndex(m => m.role === 'user');
        const chatHistory = firstUserIdx >= 0 ? allHistory.slice(firstUserIdx) : [];

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
                    const modelConfig = { model: modelName };
                    if (modelName.startsWith('gemini')) {
                        modelConfig.systemInstruction = systemInstruction;
                    }
                    const model = genAI.getGenerativeModel(modelConfig);
                    
                    const finalHistory = [...chatHistory];
                    let messageToSend = userMsg;
                    
                    // If model doesn't support systemInstruction natively
                    if (!modelName.startsWith('gemini')) {
                        if (finalHistory.length > 0) {
                            // Inject into the very first history message
                            finalHistory[0] = {
                                ...finalHistory[0],
                                parts: [{ text: `SYSTEM DIRECTIVE:\n${systemInstruction}\n\nUSER MESSAGE:\n${finalHistory[0].parts[0].text}` }]
                            };
                        } else {
                            // No history exists, inject directly into the new message being sent
                            messageToSend = `SYSTEM DIRECTIVE:\n${systemInstruction}\n\nUSER MESSAGE:\n${userMsg}`;
                        }
                    }

                    const chat = model.startChat({
                        history: finalHistory,
                        generationConfig: {
                            temperature: 0.3,
                            maxOutputTokens: 500,
                        }
                    });
                    const result = await withTimeout(chat.sendMessage(messageToSend), timeoutMs);
                    setLoading(false);
                    await typewriter(result.response.text());
                    return;
                } catch (e) {
                    lastError = e;
                    console.error(`[Rexy] Model "${modelName}" attempt ${attempt} failed:`, e?.message || e);
                    if (!isRetryable(e)) break;
                    const wait = Math.min(8000, 1000 * Math.pow(2, attempt - 1) + Math.random() * 400);
                    await new Promise(r => setTimeout(r, wait));
                }
            }
        }
        console.error('[Rexy] All models exhausted. Last error:', lastError?.message || lastError);
        setMessages(prev => [...prev, { text: 'The assistant is busy. Please try again in a moment.', role: 'bot' }]);
        setLoading(false);
    };

    return (
        <div id="chat-widget">
            {/* Panel */}
            <div id="chat-panel" className={open ? 'open' : ''}>
                {/* Header */}
                <div id="chat-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="cw-avatar-orb">
                            <FiZap size={15} color="#fff" />
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:'3px', minWidth: 0 }}>
                            <div style={{ fontWeight: 800, fontSize: '14px', lineHeight: 1.15, color:'#fff' }}>Rexycore Assistant</div>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.42)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span className="cw-dot-online" />
                                Online
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {messages.length > 0 && (
                            <button
                                onClick={() => { setMessages([]); try { localStorage.removeItem(STORAGE_KEY); } catch (_) {} }}
                                aria-label="Clear chat"
                                title="Clear history"
                                className="cw-icon-btn cw-clear-btn"
                            >
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                            </button>
                        )}
                        <button onClick={() => setOpen(false)} aria-label="Close chat" className="cw-icon-btn">
                            <FiX size={15} />
                        </button>
                    </div>
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

                {/* Attribution Row — subtle, on-brand */}
                <div className="cw-attribution">
                    <span className="cw-gem-pill" aria-hidden="true">
                        <span style={{ background:'#4285F4' }} />
                        <span style={{ background:'#EA4335' }} />
                        <span style={{ background:'#FBBC05' }} />
                        <span style={{ background:'#34A853' }} />
                    </span>
                    <span className="cw-attribution-text">Powered by Google Gemini</span>
                </div>

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
                    <button id="chat-send" onClick={() => send()} disabled={loading || isTyping} aria-label="Send message">
                        <FiSend size={14} />
                    </button>
                </div>
            </div>

            {/* Toggle button */}
            <button id="chat-toggle" onClick={handleOpen} title="Chat with Rexycore" aria-label="Open chat">
                {open ? <FiX size={21} /> : <FiMessageSquare size={21} />}
            </button>

            {/* Chat widget — refined inline overrides & animations */}
            <style>{`
                /* ═══════════════════════════════════════════
                   HEADER — clean icon buttons (match shapes)
                   ═══════════════════════════════════════════ */
                #chat-header {
                    padding: 14px 18px 13px;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    background:
                        radial-gradient(120% 80% at 0% 0%, rgba(124,58,237,0.18) 0%, transparent 60%),
                        radial-gradient(120% 80% at 100% 0%, rgba(236,72,153,0.10) 0%, transparent 55%),
                        linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%);
                }
                .cw-avatar-orb {
                    width: 34px; height: 34px;
                    border-radius: 11px;
                    position: relative;
                    background: linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #8b5cf6 100%);
                    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                    box-shadow:
                        0 0 0 1px rgba(196,181,253,0.18),
                        0 6px 18px rgba(124,58,237,0.45),
                        inset 0 1px 0 rgba(255,255,255,0.3),
                        inset 0 -2px 0 rgba(0,0,0,0.2);
                }
                .cw-avatar-orb::after {
                    content:'';
                    position:absolute; inset: -2px;
                    border-radius: 13px;
                    background: conic-gradient(from 0deg, transparent 0 55%, rgba(139,92,246,0.55) 70%, transparent 85% 100%);
                    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                    -webkit-mask-composite: xor; mask-composite: exclude;
                    padding: 1.5px;
                    animation: cw-orb-spin 4s linear infinite;
                    pointer-events: none;
                    opacity: 0.8;
                }
                @keyframes cw-orb-spin { to { transform: rotate(360deg); } }

                .cw-dot-online {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: #4ade80;
                    box-shadow: 0 0 0 2px rgba(74,222,128,0.14), 0 0 8px rgba(74,222,128,0.75);
                    animation: cw-dot-breathe 2s ease-in-out infinite;
                }
                @keyframes cw-dot-breathe {
                    0%,100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(0.78); opacity: 0.65; }
                }

                /* Icon buttons — uniform circle (same for Clear AND Close so they visually match) */
                #chat-header button {
                    all: unset;
                    box-sizing: border-box;
                    width: 30px; height: 30px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.045);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: rgba(255,255,255,0.48);
                    cursor: pointer;
                    display: inline-flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    backdrop-filter: blur(8px);
                    transition: all 0.18s cubic-bezier(0.2,0.8,0.2,1);
                }
                #chat-header button:hover {
                    background: rgba(255,255,255,0.09);
                    border-color: rgba(255,255,255,0.18);
                    color: #fff;
                    transform: translateY(-0.5px);
                }
                #chat-header button.cw-clear-btn:hover {
                    background: rgba(239,68,68,0.10);
                    border-color: rgba(239,68,68,0.35);
                    color: #fca5a5;
                    box-shadow: 0 0 0 3px rgba(239,68,68,0.08);
                }

                /* ═══════════════════════════════════════════
                   MESSAGES — tighten bubbles
                   ═══════════════════════════════════════════ */
                .msg-avatar {
                    width: 26px; height: 26px;
                    font-size: 8.5px;
                    box-shadow: 0 2px 10px rgba(109,40,217,0.4), inset 0 1px 0 rgba(255,255,255,0.22);
                    border: 1px solid rgba(196,181,253,0.25);
                }
                .msg-bubble { font-size: 13px; line-height: 1.55; padding: 9px 13px; border-radius: 16px; }
                .msg.bot .msg-bubble {
                    background: rgba(255,255,255,0.055);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-bottom-left-radius: 5px;
                    color: rgba(255,255,255,0.9);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
                }
                .msg.user .msg-bubble {
                    background: linear-gradient(135deg, rgba(91,33,182,0.92), rgba(124,58,237,0.96));
                    border: 1px solid rgba(167,139,250,0.32);
                    border-bottom-right-radius: 5px;
                    color: #fff;
                    box-shadow: 0 3px 14px rgba(109,40,217,0.38), inset 0 1px 0 rgba(255,255,255,0.18);
                }

                /* ═══════════════════════════════════════════
                   QUICK REPLIES — softer purple pills
                   ═══════════════════════════════════════════ */
                .quick-reply-btn {
                    padding: 6px 13px;
                    background: rgba(124,58,237,0.07);
                    border: 1px solid rgba(139,92,246,0.22);
                    color: rgba(221,214,254,0.88);
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.1px;
                    border-radius: 999px;
                    transition: all 0.18s ease;
                    backdrop-filter: blur(10px);
                }
                .quick-reply-btn:hover {
                    background: rgba(124,58,237,0.16);
                    border-color: rgba(167,139,250,0.5);
                    color: #ede9fe;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 14px rgba(124,58,237,0.22);
                }

                /* ═══════════════════════════════════════════
                   ATTRIBUTION — subtle 4-dot Google pill
                   ═══════════════════════════════════════════ */
                .cw-attribution {
                    display: flex; align-items: center; justify-content: center;
                    gap: 7px;
                    padding: 4px 12px 0;
                    opacity: 0.55;
                    flex-shrink: 0;
                }
                .cw-gem-pill {
                    display: inline-flex; align-items: center; gap: 2.5px;
                    padding: 2px 6px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.035);
                    border: 1px solid rgba(255,255,255,0.06);
                    height: 14px;
                }
                .cw-gem-pill span {
                    width: 4.5px; height: 4.5px; border-radius: 50%;
                    display: inline-block;
                    animation: cw-gem-dot 3.8s ease-in-out infinite;
                }
                .cw-gem-pill span:nth-child(1) { animation-delay: 0s; }
                .cw-gem-pill span:nth-child(2) { animation-delay: 0.25s; }
                .cw-gem-pill span:nth-child(3) { animation-delay: 0.5s; }
                .cw-gem-pill span:nth-child(4) { animation-delay: 0.75s; }
                @keyframes cw-gem-dot {
                    0%, 70%, 100% { transform: translateY(0); opacity: 0.85; }
                    78% { transform: translateY(-2.2px); opacity: 1; }
                    86% { transform: translateY(0.4px); opacity: 0.95; }
                }
                .cw-attribution-text {
                    font-size: 9.5px;
                    font-weight: 600;
                    letter-spacing: 0.7px;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.38);
                }

                /* ═══════════════════════════════════════════
                   INPUT ROW — soft glass, not glowing neon
                   ═══════════════════════════════════════════ */
                #chat-input-row {
                    padding: 10px 14px 13px;
                    border-top: 1px solid rgba(255,255,255,0.06);
                    background: linear-gradient(0deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.008) 100%);
                }
                #chat-input {
                    flex: 1;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 999px;
                    padding: 9px 15px;
                    color: #fff;
                    font-size: 12.5px;
                    outline: none;
                    font-family: inherit;
                    transition: all 0.2s ease;
                    backdrop-filter: blur(18px);
                }
                #chat-input:focus {
                    border-color: rgba(139,92,246,0.45);
                    background: rgba(124,58,237,0.08);
                    box-shadow: 0 0 0 3px rgba(124,58,237,0.08);
                }
                #chat-input::placeholder { color: rgba(255,255,255,0.22); }

                #chat-send {
                    all: unset;
                    box-sizing: border-box;
                    width: 35px; height: 35px;
                    border-radius: 50%;
                    display: inline-flex; align-items: center; justify-content: center;
                    background: linear-gradient(135deg, #6d28d9 0%, #7c3aed 55%, #8b5cf6 100%);
                    border: 1px solid rgba(167,139,250,0.38);
                    color: #fff;
                    cursor: pointer;
                    flex-shrink: 0;
                    box-shadow:
                        0 3px 12px rgba(109,40,217,0.45),
                        inset 0 1px 0 rgba(255,255,255,0.25),
                        inset 0 -2px 0 rgba(0,0,0,0.2);
                    transition: all 0.18s cubic-bezier(0.2,0.8,0.2,1);
                }
                #chat-send:hover:not(:disabled) {
                    transform: translateY(-1px) scale(1.03);
                    box-shadow:
                        0 5px 18px rgba(109,40,217,0.55),
                        inset 0 1px 0 rgba(255,255,255,0.3),
                        inset 0 -2px 0 rgba(0,0,0,0.2);
                }
                #chat-send:active:not(:disabled) { transform: translateY(0) scale(0.97); }
                #chat-send:disabled {
                    opacity: 0.45;
                    cursor: not-allowed;
                    filter: saturate(0.6);
                }

                /* ═══════════════════════════════════════════
                   FLOATING TOGGLE — premium orb ring
                   ═══════════════════════════════════════════ */
                #chat-toggle {
                    position: relative;
                    width: 56px; height: 56px;
                    border-radius: 50%;
                    background:
                        radial-gradient(circle at 30% 25%, rgba(255,255,255,0.2) 0%, transparent 40%),
                        linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #9333ea 100%);
                    border: 1px solid rgba(196,181,253,0.35);
                    color: #fff;
                    cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    box-shadow:
                        0 6px 24px rgba(0,0,0,0.5),
                        0 0 0 1px rgba(124,58,237,0.45),
                        0 0 28px rgba(124,58,237,0.55),
                        inset 0 1px 0 rgba(255,255,255,0.3),
                        inset 0 -2px 0 rgba(0,0,0,0.25);
                    transition: transform 0.25s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 0.25s;
                }
                #chat-toggle::before {
                    content:'';
                    position:absolute; inset:-4px;
                    border-radius:50%;
                    background: conic-gradient(from 0deg, transparent 0 60%, rgba(236,72,153,0.5) 75%, rgba(124,58,237,0.4) 88%, transparent);
                    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                    -webkit-mask-composite: xor; mask-composite: exclude;
                    padding: 1.8px;
                    animation: cw-orb-spin 5s linear infinite;
                    opacity: 0.7;
                }
                #chat-toggle:hover {
                    transform: scale(1.08) rotate(-4deg);
                    box-shadow:
                        0 10px 30px rgba(0,0,0,0.55),
                        0 0 0 1px rgba(167,139,250,0.55),
                        0 0 40px rgba(139,92,246,0.7),
                        inset 0 1px 0 rgba(255,255,255,0.35),
                        inset 0 -2px 0 rgba(0,0,0,0.25);
                }
                #chat-toggle:active { transform: scale(0.97); }

                /* Small screens */
                @media (max-width: 480px) {
                    #chat-panel { width: calc(100vw - 32px); max-height: 62vh; border-radius: 22px; }
                    #chat-widget { bottom: 16px; right: 16px; }
                    #chat-toggle { width: 52px; height: 52px; }
                }
            `}</style>
        </div>
    );
}
