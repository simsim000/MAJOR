'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const { user, profile, loading } = useAuth();
    const [pendingUsers, setPendingUsers] = useState<UserProfile[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user || profile?.role !== 'admin') {
                router.push('/dashboard');
                return;
            }
            fetchPendingUsers();
        }
    }, [user, profile, loading, router]);

    const fetchPendingUsers = async () => {
        try {
            // Query users where isVerified is false AND collegeIdUrl exists
            // Note: Firestore requires a composite index for this query usually.
            // Or we can just query users and filter client-side for MVP if user base is small.
            // Let's try client-side filtering of 'users' collection for simplicity if rules allow read.
            // Better: query users where isVerified == false.

            const q = query(collection(db, 'users'), where('isVerified', '==', false));
            const querySnapshot = await getDocs(q);
            const users: UserProfile[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data() as UserProfile;
                if (data.collegeIdUrl) {
                    users.push(data);
                }
            });
            setPendingUsers(users);
        } catch (error) {
            console.error("Error fetching pending users:", error);
        }
    };

    const handleApprove = async (uid: string) => {
        try {
            await updateDoc(doc(db, 'users', uid), {
                isVerified: true
            });
            setPendingUsers(prev => prev.filter(u => u.uid !== uid));
        } catch (error) {
            console.error("Error approving user:", error);
        }
    };

    const handleReject = async (uid: string) => {
        try {
            // For now, rejection might just delete the ID URL so they can upload again,
            // or we could add a status field. Let's just clear the ID URL.
            await updateDoc(doc(db, 'users', uid), {
                collegeIdUrl: '' // Reset upload
            });
            setPendingUsers(prev => prev.filter(u => u.uid !== uid));
        } catch (error) {
            console.error("Error rejecting user:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent flex items-center gap-2">
                            <ShieldAlert className="text-red-500" /> Admin Dashboard
                        </h1>
                        <p className="text-slate-400 mt-2">Manage user verifications and platform content.</p>
                    </div>
                    <Button variant="outline" onClick={() => router.push('/dashboard')}>
                        Back to App
                    </Button>
                </div>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Pending Verifications ({pendingUsers.length})</CardTitle>
                        <CardDescription>Review ID cards and approve access.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pendingUsers.length === 0 ? (
                            <p className="text-slate-500 text-center py-8">No pending verifications.</p>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {pendingUsers.map((user) => (
                                    <Card key={user.uid} className="bg-slate-800 border-slate-700">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-white text-base">{user.fullName}</CardTitle>
                                                    <CardDescription>{user.email}</CardDescription>
                                                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-300 capitalize">
                                                        {user.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pb-2">
                                            <div className="aspect-video bg-slate-950 rounded-md overflow-hidden relative group">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={user.collegeIdUrl}
                                                    alt="ID Card"
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-105 cursor-pointer"
                                                    onClick={() => window.open(user.collegeIdUrl, '_blank')}
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white text-xs">Click to View</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <div className="p-4 pt-0 flex gap-2 mt-2">
                                            <Button
                                                className="flex-1 bg-green-600 hover:bg-green-700"
                                                size="sm"
                                                onClick={() => handleApprove(user.uid)}
                                            >
                                                <Check className="w-4 h-4 mr-1" /> Approve
                                            </Button>
                                            <Button
                                                className="flex-1 bg-red-600 hover:bg-red-700"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleReject(user.uid)}
                                            >
                                                <X className="w-4 h-4 mr-1" /> Reject
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
