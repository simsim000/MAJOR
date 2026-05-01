'use client';

import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { LectureList } from '@/components/lecture/LectureList';
import { CreateLectureModal } from '@/components/lecture/CreateLectureModal';
import { Button } from '@/components/ui/button';
import { Video, Plus } from 'lucide-react';

export default function LecturesPage() {
    const { profile } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleLectureCreated = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const canBookLecture = profile?.role === 'alumni' || profile?.role === 'admin';

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent flex items-center gap-3">
                        <Video className="h-8 w-8 text-blue-500" />
                        Lectures & Sessions
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Join live lectures, Q&A sessions, and workshops hosted by our alumni.
                    </p>
                </div>
                
                {canBookLecture && (
                    <Button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Book Lecture
                    </Button>
                )}
            </div>

            <div className="mt-8">
                <LectureList refreshTrigger={refreshTrigger} />
            </div>

            <CreateLectureModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={handleLectureCreated} 
            />
        </div>
    );
}
