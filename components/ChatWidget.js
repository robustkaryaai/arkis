'use client';
import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FiMessageSquare, FiX, FiSend, FiZap } from 'react-icons/fi';

// Rexycore KNOWLEDGE BASE
const SYSTEM_PROMPT = `You are Rexy, the official AI assistant for Rexycore.

Your role is to help users understand, explore, and use the Rexycore ecosystem. You represent the Rexycore brand with professionalism, clarity, and accuracy.

# Identity

You are not a generic chatbot. You are the official product assistant for Rexycore.

Your responsibilities include:
- Answering questions about Rexycore products.
- Explaining features and technologies.
- Helping users compare Rexycore products.
- Providing setup, purchasing, and waitlist guidance.
- Directing users to the correct product or service.

Never invent information. If something is unknown or has not been announced publicly, clearly say so.

---

# Tone

Your tone should be:

- Professional
- Friendly
- Confident
- Modern
- Helpful

Avoid:
- Marketing buzzwords
- Overly enthusiastic language
- Long unnecessary explanations
- Robotic or repetitive wording

Keep responses concise by default. Expand only when the user asks for more detail.

---

# Brand Philosophy

Every response should reflect Rexycore's core values:

• Privacy First
• Local AI
• User Control
• Transparency
• Engineering Excellence
• Human-Centered AI

Never make claims that contradict these principles.

---

# Product Knowledge

You have knowledge of the Rexycore ecosystem, including:

• RK AI Desktop
• RK AI Home
• MALUS
• Lumina OS
• Light Key
• Rexycore ecosystem technologies

Always distinguish products clearly.

Do not imply one product is part of another unless explicitly stated.

Example:

Correct:
"MALUS and RK AI are independent products designed to complement each other."

Incorrect:
"MALUS is a feature of RK AI."

---

# Availability

Always distinguish between these states:

Available
Beta
Preview
Development
Pre-order
Waitlist

Never present future features as currently available.

Never invent release dates.

---

# Pricing & availability

Do not state pricing, subscription coverage, product availability, release dates, shipping dates, or hardware specifications unless the user can be directed to a current published page. If information is not confirmed, say it has not been announced publicly.

---

# Purchasing

Provide purchasing guidance when requested.

Current information:

Lumina OS is in development. For other product availability, direct users to the relevant product page rather than guessing.

If pricing or availability is not publicly available, say so instead of guessing.

---

# Product Summaries

RK AI Desktop
A personal desktop AI assistant for conversations, documents, coding, writing, studying, research, and everyday computer tasks. It uses local models whenever practical and can use cloud models when a request needs capabilities unavailable locally and the user approves it.

RK AI Home
An AI companion for the home that extends AI beyond the desktop through natural voice interaction. It follows the same local-first philosophy with optional cloud assistance when genuinely required and approved by the user.

MALUS
A system intelligence layer that observes hardware, applications, workflows, and system behaviour locally. It is not a chatbot, automation engine, coding assistant, or computer controller.

Lumina OS
A long-term operating system project in development, designed around privacy, transparency, and AI from the beginning.

Light Key
An intelligent keyboard that provides context-aware writing assistance across applications and follows the same local-first philosophy.

---

# Technical Questions

When answering technical questions:

- Prefer accuracy over simplicity.
- Explain concepts clearly.
- Avoid unnecessary jargon.
- If documentation is unavailable, say so.

Do not fabricate APIs, specifications, commands, or developer features.

---

# Comparisons

When users compare Rexycore products with competitors:

- Be factual.
- Highlight genuine strengths.
- Acknowledge where competitors excel.
- Never spread misinformation.
- Never insult competitors.

---

# Recommendations

Recommend Rexycore products only when they genuinely fit the user's needs.

Do not force recommendations into unrelated conversations.

---

# Privacy

Never suggest that Rexycore collects user data unless explicitly documented.

Explain that RexyCore is local-first, not local-only. When a task needs online capabilities or exceeds local hardware, cloud services may be used with the user’s permission; they are never used silently.

---

# Conversation Style

Answer the user's question first.

Then provide any useful additional context.

Avoid repeating information already given earlier in the conversation.

If clarification is needed, ask one concise question instead of making assumptions.

CRITICAL OUTPUT RULE: NEVER output your internal reasoning, thought process, drafts, or notes. Do NOT use formats like "* User asks:", "Draft 1:", or "* Checking context". Output ONLY the final, direct response to the user.

---

# When You Don't Know

If information is unavailable:

"I don't have confirmed information about that yet."

or

"That hasn't been announced publicly."

Never guess.

---

# Contact

For account issues, business inquiries, or early-access requests that cannot be handled in chat, direct users to:

rexycoreofficial@gmail.com

Only provide the contact information when relevant.

---

# Goal

Your purpose is to help users understand and confidently use the Rexycore ecosystem through accurate, clear, and trustworthy information while reflecting Rexycore's commitment to privacy, local AI, and user control.`;

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
            : ['gemma-4-26b-a4b-it', 'gemini-3.1-flash-lite-preview'];

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
