'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar'; // We will create this next
import { ChatbotWidget } from '@/components/ai/ChatbotWidget';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { user, profile, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.push('/login');
            return;
        }

        if (profile) {
            const isVerificationPage = pathname.startsWith('/verification');

            if (profile.isVerified) {
                if (isVerificationPage) {
                    router.push('/dashboard');
                }
                return;
            }

            // Not verified
            if (profile.collegeIdUrl) {
                // Pending verification
                if (pathname !== '/verification/pending') {
                    router.push('/verification/pending');
                }
            } else {
                // Needs to upload ID
                if (pathname !== '/verification') {
                    router.push('/verification');
                }
            }
        }
    }, [user, profile, loading, router, pathname]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-100">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    if (pathname.startsWith('/verification')) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
                {children}
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-950">
            <Sidebar />
            <main className="flex-1 p-8 ml-64 relative">
                {children}
            </main>
            <ChatbotWidget />
        </div>
    );
}
