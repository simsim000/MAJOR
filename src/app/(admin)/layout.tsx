'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, profile, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.push('/login');
            return;
        }

        if (profile && profile.role !== 'admin') {
            router.push('/dashboard');
        }
    }, [user, profile, loading, router]);

    if (loading || !profile || profile.role !== 'admin') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-100">
                <div className="animate-pulse">Loading Admin Panel...</div>
            </div>
        );
    }

    return <>{children}</>;
}
