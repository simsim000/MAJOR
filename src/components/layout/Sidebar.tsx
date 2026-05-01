'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, GraduationCap, Users, MessageSquare, LogOut, Settings, ShieldCheck, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';

const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Briefcase, label: 'Jobs', href: '/dashboard/jobs' },
    { icon: GraduationCap, label: 'Mentorship', href: '/dashboard/mentorship' },
    { icon: Video, label: 'Lectures', href: '/lectures' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: Users, label: 'Network', href: '/network' },
];

export function Sidebar() {
    const pathname = usePathname();
    const { logout, profile } = useAuth();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl">
            <div className="flex h-full flex-col px-3 py-4">
                <div className="mb-10 flex items-center gap-2 pl-3">
                    <span className="self-center whitespace-nowrap text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                        Alumni+
                    </span>
                    {profile ? (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            {profile.role}
                        </span>
                    ) : (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-600 text-white">
                            DATABASE OFFLINE
                        </span>
                    )}
                </div>

                <div className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white",
                                    isActive && "bg-slate-800 text-white"
                                )}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                <span className="ml-3 font-medium">{item.label}</span>
                            </Link>
                        );
                    })}

                    {profile?.role === 'admin' && (
                        <Link
                            href="/admin"
                            className={cn(
                                "flex items-center rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white",
                                pathname.startsWith('/admin') && "bg-slate-800 text-white"
                            )}
                        >
                            <ShieldCheck className="h-5 w-5 flex-shrink-0 text-red-400" />
                            <span className="ml-3 font-medium text-red-400">Admin Panel</span>
                        </Link>
                    )}
                </div>

                <div className="mt-auto border-t border-slate-800 pt-4 space-y-2">
                    <Link
                        href="/profile"
                        className="flex items-center rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                    >
                        <Settings className="h-5 w-5 flex-shrink-0" />
                        <span className="ml-3 font-medium">Settings</span>
                    </Link>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white px-3"
                        onClick={() => logout()}
                    >
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </aside>
    );
}
