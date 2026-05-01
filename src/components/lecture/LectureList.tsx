'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Lecture } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Calendar, Clock, User } from 'lucide-react';

interface LectureListProps {
    refreshTrigger: number;
}

export function LectureList({ refreshTrigger }: LectureListProps) {
    const [lectures, setLectures] = useState<Lecture[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const q = query(
                    collection(db, 'lectures'),
                    orderBy('date', 'asc')
                );
                
                const querySnapshot = await getDocs(q);
                const fetchedLectures = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Lecture[];
                
                // TEMPORARY: Removed the past-lecture filter so you can easily test!
                const upcomingLectures = fetchedLectures;
                
                setLectures(upcomingLectures);
            } catch (error) {
                console.error("Error fetching lectures: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLectures();
    }, [refreshTrigger]);

    if (loading) {
        return <div className="animate-pulse text-slate-400">Loading scheduled lectures...</div>;
    }

    if (lectures.length === 0) {
        return (
            <div className="text-center py-12 border border-slate-800 rounded-xl bg-slate-900/50">
                <Video className="mx-auto h-12 w-12 text-slate-500 mb-4" />
                <h3 className="text-lg font-medium text-slate-200">No Upcoming Lectures</h3>
                <p className="text-slate-400 mt-2">Check back later for new sessions scheduled by our Alumni.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lectures.map((lecture) => {
                const isHappeningNow = Math.abs(lecture.date - Date.now()) < 3600000; // Within 1 hour
                
                return (
                    <Card key={lecture.id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all flex flex-col">
                        <CardHeader className="pb-3 border-b border-slate-800">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <div className="text-xs font-semibold text-blue-400 mb-2 px-2 py-1 rounded bg-blue-500/10 inline-block">
                                        {lecture.domain}
                                    </div>
                                    <CardTitle className="text-xl text-white line-clamp-2 leading-tight">
                                        {lecture.title}
                                    </CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 flex-1 flex flex-col">
                            <p className="text-sm text-slate-300 mb-6 line-clamp-3">
                                {lecture.description}
                            </p>
                            
                            <div className="mt-auto space-y-3">
                                <div className="flex items-center text-sm text-slate-400">
                                    <User className="mr-2 h-4 w-4 text-slate-500" />
                                    By {lecture.authorName}
                                </div>
                                <div className="flex items-center text-sm text-slate-400">
                                    <Calendar className="mr-2 h-4 w-4 text-slate-500" />
                                    {new Date(lecture.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                </div>
                                <div className="flex items-center text-sm text-slate-400">
                                    <Clock className="mr-2 h-4 w-4 text-slate-500" />
                                    {new Date(lecture.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                
                                <div className="pt-4 mt-2 border-t border-slate-800">
                                    <a href={lecture.meetLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                                        <Button 
                                            className="w-full" 
                                            variant={isHappeningNow ? "default" : "secondary"}
                                            style={isHappeningNow ? { backgroundColor: '#10b981', color: '#fff' } : {}}
                                        >
                                            <Video className="mr-2 h-4 w-4" />
                                            {isHappeningNow ? "Join Meeting Now" : "View Link"}
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
