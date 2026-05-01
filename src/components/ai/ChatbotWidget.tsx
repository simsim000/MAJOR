'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

export function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hi there! I am your Alumni+ AI Assistant. How can I help you today?', sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: getSimulatedResponse(userMsg.text),
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    // Very basic simulated responses
    const getSimulatedResponse = (text: string) => {
        const lower = text.toLowerCase();
        if (lower.includes('mentor')) return "You can find mentors by navigating to the Mentorship Hub from the sidebar. There you can search by skill or company!";
        if (lower.includes('job') || lower.includes('internship')) return "Check out the Jobs section under the Dashboard to see the latest opportunities posted by alumni.";
        if (lower.includes('network') || lower.includes('connect')) return "The Network tab allows you to find and connect with fellow students and alumni. Try searching for specific departments or roles.";
        if (lower.includes('hello') || lower.includes('hi')) return "Hello! Feel free to ask me about finding mentors, jobs, or building your network.";
        return "That's a great question! As a simulated AI for this UI prototype, my knowledge is currently limited. (Note: You can connect a real API key like OpenAI/Gemini to make me truly smart!)";
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-[350px] h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-4 flex items-center justify-between shadow-md">
                        <div className="flex items-center gap-2 text-white">
                            <Bot className="w-5 h-5" />
                            <span className="font-semibold">Alumni+ AI</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-slate-700' : 'bg-blue-600'
                                    }`}>
                                    {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                                </div>
                                <div className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-tr-sm'
                                        : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-slate-800 rounded-2xl rounded-tl-sm p-4 flex gap-1.5 items-center border border-slate-700 shadow-sm">
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
                        <Input
                            placeholder="Ask me anything..."
                            className="flex-1 bg-slate-950 border-slate-800 focus-visible:ring-blue-500 text-slate-200"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 shrink-0"
                            size="icon"
                            onClick={handleSendMessage}
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-200"
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <Sparkles className="w-6 h-6 text-white" />
                )}
            </button>
        </div>
    );
}
