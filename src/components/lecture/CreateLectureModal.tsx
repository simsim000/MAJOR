'use client';

import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface CreateLectureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function CreateLectureModal({ isOpen, onClose, onSuccess }: CreateLectureModalProps) {
    const { profile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [domain, setDomain] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [meetLink, setMeetLink] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;

        setLoading(true);
        try {
            // Combine date and time
            const DateTime = new Date(`${date}T${time}`).getTime();

            await addDoc(collection(db, 'lectures'), {
                title,
                domain,
                description,
                date: DateTime,
                meetLink,
                authorId: profile.uid,
                authorName: profile.fullName,
                createdAt: Date.now()
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error adding lecture: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg p-6 relative shadow-2xl">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    <X className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-bold text-white mb-6">Book a New Lecture</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Lecture Title</Label>
                        <Input 
                            id="title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="e.g. Introduction to System Design" 
                            required 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="domain">Domain / Topic</Label>
                        <Input 
                            id="domain" 
                            value={domain} 
                            onChange={(e) => setDomain(e.target.value)} 
                            placeholder="e.g. Software Engineering" 
                            required 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea 
                            id="description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder="What will you cover in this lecture?" 
                            className="flex min-h-[80px] w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm ring-offset-slate-950 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input 
                                id="date" 
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input 
                                id="time" 
                                type="time" 
                                value={time} 
                                onChange={(e) => setTime(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="meetLink">Google Meet Link</Label>
                        <Input 
                            id="meetLink" 
                            type="url" 
                            value={meetLink} 
                            onChange={(e) => setMeetLink(e.target.value)} 
                            placeholder="https://meet.google.com/..." 
                            required 
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose} className="border-slate-700 hover:bg-slate-800">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                            {loading ? 'Posting...' : 'Book Lecture'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
