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
            : ['gemma-4-26b-a4b-it', 'gemini-3.1-flash-lite-preview'];

        const genAI = new GoogleGenerativeAI(apiKey);
        const systemInstruction = SYSTEM_BEHAVIOR_PROMPT + "\n\nRelevant Context:\n" + getRelevantKnowledge(userMsg);
        
        // Map previous messages to Gemini history format
        const chatHistory = messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '10px',
                            background: 'linear-gradient(90deg, #7c3aed, #6366f1, #7c3aed)',
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
