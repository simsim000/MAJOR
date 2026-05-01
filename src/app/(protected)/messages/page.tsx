'use client';

import { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical, Smile, Paperclip } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Mock Data
const MOCK_CHATS = [
    {
        id: '1',
        user: {
            name: 'Alex Johnson',
            role: 'alumni',
            avatar: 'https://i.pravatar.cc/150?u=alex',
            status: 'online'
        },
        unread: 2,
        messages: [
            { id: '1', text: 'Hey there! Saw your profile.', sender: 'them', time: '10:00 AM' },
            { id: '2', text: 'Hi Alex! Thanks for connecting.', sender: 'me', time: '10:05 AM' },
            { id: '3', text: 'Are you still looking for a referral?', sender: 'them', time: '10:06 AM' },
            { id: '4', text: 'I can help you out with the Google SWE position.', sender: 'them', time: '10:06 AM' }
        ]
    },
    {
        id: '2',
        user: {
            name: 'Sarah Chen',
            role: 'student',
            avatar: 'https://i.pravatar.cc/150?u=sarah',
            status: 'offline'
        },
        unread: 0,
        messages: [
            { id: '1', text: 'Could you review my resume?', sender: 'them', time: 'Yesterday' },
            { id: '2', text: 'Sure, send it over.', sender: 'me', time: 'Yesterday' },
            { id: '3', text: 'Thanks! I will send it tonight.', sender: 'them', time: 'Yesterday' }
        ]
    },
    {
        id: '3',
        user: {
            name: 'Michael Rodriguez',
            role: 'alumni',
            avatar: 'https://i.pravatar.cc/150?u=michael',
            status: 'online'
        },
        unread: 0,
        messages: [
            { id: '1', text: 'Great chat today!', sender: 'me', time: 'Monday' },
            { id: '2', text: 'Likewise! Keep me updated on your progress.', sender: 'them', time: 'Monday' }
        ]
    }
];

export default function MessagesPage() {
    const [chats, setChats] = useState(MOCK_CHATS);
    const [activeChatId, setActiveChatId] = useState(MOCK_CHATS[0].id);
    const [newMessage, setNewMessage] = useState('');

    const activeChat = chats.find(c => c.id === activeChatId);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !activeChat) return;

        const updatedChats = chats.map(chat => {
            if (chat.id === activeChatId) {
                return {
                    ...chat,
                    messages: [
                        ...chat.messages,
                        {
                            id: Date.now().toString(),
                            text: newMessage,
                            sender: 'me',
                            time: 'Just now'
                        }
                    ]
                };
            }
            return chat;
        });

        setChats(updatedChats);
        setNewMessage('');
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 flex flex-col border-r border-slate-800 bg-slate-950/50">
                <div className="p-4 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input 
                            placeholder="Search messages..." 
                            className="pl-10 bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500 h-9 text-sm"
                        />
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    {chats.map(chat => {
                        const lastMessage = chat.messages[chat.messages.length - 1];
                        const isActive = chat.id === activeChatId;
                        
                        return (
                            <button
                                key={chat.id}
                                onClick={() => setActiveChatId(chat.id)}
                                className={`w-full text-left p-4 flex items-center gap-3 hover:bg-slate-800/50 transition-colors border-l-2 ${
                                    isActive ? 'border-blue-500 bg-slate-800/50' : 'border-transparent'
                                }`}
                            >
                                <div className="relative shrink-0">
                                    <img 
                                        src={chat.user.avatar} 
                                        alt={chat.user.name} 
                                        className="w-10 h-10 rounded-full border border-slate-700"
                                    />
                                    {chat.user.status === 'online' && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="font-medium text-slate-200 truncate">{chat.user.name}</h3>
                                        <span className="text-[10px] text-slate-500 shrink-0 ml-2">{lastMessage?.time}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 truncate">
                                        {lastMessage?.sender === 'me' ? 'You: ' : ''}{lastMessage?.text}
                                    </p>
                                </div>
                                {chat.unread > 0 && !isActive && (
                                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 ml-2">
                                        {chat.unread}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Chat Area */}
            {activeChat ? (
                <div className="flex-1 flex flex-col bg-slate-950 min-w-0">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3 min-w-0">
                            <img 
                                src={activeChat.user.avatar} 
                                alt={activeChat.user.name} 
                                className="w-10 h-10 rounded-full border border-slate-700 shrink-0"
                            />
                            <div className="min-w-0">
                                <h2 className="font-semibold text-slate-100 truncate">{activeChat.user.name}</h2>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full inline-block ${
                                    activeChat.user.role === 'alumni' 
                                        ? 'bg-violet-500/10 text-violet-400' 
                                        : 'bg-emerald-500/10 text-emerald-400'
                                }`}>
                                    {activeChat.user.role}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                                <Phone className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                                <Video className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                                <MoreVertical className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {activeChat.messages.map((msg) => {
                            const isMe = msg.sender === 'me';
                            return (
                                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                                        isMe 
                                            ? 'bg-blue-600 text-white rounded-br-none' 
                                            : 'bg-slate-800 text-slate-200 rounded-bl-none'
                                    }`}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-slate-500 mt-1 mx-1">{msg.time}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-slate-900 border-t border-slate-800">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800 shrink-0">
                                <Paperclip className="w-5 h-5" />
                            </Button>
                            <div className="relative flex-1">
                                <Input 
                                    placeholder="Type a message..." 
                                    className="bg-slate-950 border-slate-800 text-slate-200 pr-10 focus-visible:ring-blue-500"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSendMessage();
                                    }}
                                />
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white hover:bg-transparent h-8 w-8"
                                >
                                    <Smile className="w-5 h-5" />
                                </Button>
                            </div>
                            <Button 
                                className="bg-blue-600 hover:bg-blue-700 shrink-0" 
                                size="icon"
                                onClick={handleSendMessage}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center bg-slate-950 text-slate-500">
                    Select a conversation to start messaging
                </div>
            )}
        </div>
    );
}
