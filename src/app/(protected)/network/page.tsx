'use client';

import { useState } from 'react';
import { Search, MapPin, Building, GraduationCap, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

// Mock Data
const MOCK_USERS = [
    {
        id: '1',
        name: 'Alex Johnson',
        role: 'alumni',
        headline: 'Software Engineer at Google',
        department: 'Computer Science',
        batch: '2021',
        location: 'San Francisco, CA',
        company: 'Google',
        avatar: 'https://i.pravatar.cc/150?u=alex'
    },
    {
        id: '2',
        name: 'Sarah Chen',
        role: 'student',
        headline: 'CS Senior | Looking for SDE Internships',
        department: 'Computer Science',
        batch: '2025',
        location: 'New York, NY',
        company: null,
        avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
        id: '3',
        name: 'Michael Rodriguez',
        role: 'alumni',
        headline: 'Product Manager at Microsoft',
        department: 'Information Technology',
        batch: '2019',
        location: 'Seattle, WA',
        company: 'Microsoft',
        avatar: 'https://i.pravatar.cc/150?u=michael'
    },
    {
        id: '4',
        name: 'Emma Watson',
        role: 'student',
        headline: 'AI/ML Enthusiast | Hackathon Winner',
        department: 'Electronics',
        batch: '2026',
        location: 'Boston, MA',
        company: null,
        avatar: 'https://i.pravatar.cc/150?u=emma'
    },
    {
        id: '5',
        name: 'David Kim',
        role: 'alumni',
        headline: 'Founding Engineer at Stealth Startup',
        department: 'Computer Science',
        batch: '2020',
        location: 'Austin, TX',
        company: 'Stealth Startup',
        avatar: 'https://i.pravatar.cc/150?u=david'
    },
    {
        id: '6',
        name: 'Shah Bilal',
        role: 'student',
        headline: 'Frontend Developer | React Native',
        department: 'Computer Science',
        batch: '2025',
        location: 'Chicago, IL',
        company: null,
        avatar: 'https://i.pravatar.cc/150?u=priya'
    }
];

export default function NetworkPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState<'all' | 'alumni' | 'student'>('all');

    const filteredUsers = MOCK_USERS.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                    Alumni Network
                </h1>
                <p className="text-slate-400 mt-2">
                    Connect with fellow students and experienced alumni from your college.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search by name, headline, or department..."
                        className="pl-10 bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={filterRole === 'all' ? 'default' : 'outline'}
                        className={filterRole === 'all' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-800 text-slate-400 hover:bg-slate-800'}
                        onClick={() => setFilterRole('all')}
                    >
                        All
                    </Button>
                    <Button
                        variant={filterRole === 'alumni' ? 'default' : 'outline'}
                        className={filterRole === 'alumni' ? 'bg-violet-600 hover:bg-violet-700' : 'border-slate-800 text-slate-400 hover:bg-slate-800'}
                        onClick={() => setFilterRole('alumni')}
                    >
                        Alumni
                    </Button>
                    <Button
                        variant={filterRole === 'student' ? 'default' : 'outline'}
                        className={filterRole === 'student' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-slate-800 text-slate-400 hover:bg-slate-800'}
                        onClick={() => setFilterRole('student')}
                    >
                        Students
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map((user) => (
                    <Card key={user.id} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-colors flex flex-col">
                        <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full border-2 border-slate-800"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-slate-100">{user.name}</h3>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${user.role === 'alumni'
                                                ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 pb-4">
                            <p className="text-sm font-medium text-slate-300 line-clamp-2 mb-3">
                                {user.headline}
                            </p>
                            <div className="space-y-2 text-xs text-slate-500">
                                <div className="flex items-center">
                                    <GraduationCap className="w-3.5 h-3.5 mr-2 text-slate-400" />
                                    {user.department} • Class of {user.batch}
                                </div>
                                {user.company && (
                                    <div className="flex items-center">
                                        <Building className="w-3.5 h-3.5 mr-2 text-slate-400" />
                                        {user.company}
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <MapPin className="w-3.5 h-3.5 mr-2 text-slate-400" />
                                    {user.location}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0 gap-2">
                            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white" size="sm">
                                Connect
                            </Button>
                            <Button variant="outline" size="icon" className="shrink-0 border-slate-700 text-slate-300 hover:bg-slate-800">
                                <MessageSquare className="w-4 h-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                    <p className="text-slate-400">No users found matching your filters.</p>
                </div>
            )}
        </div>
    );
}
