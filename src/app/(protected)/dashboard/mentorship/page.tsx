'use client';

import { useState } from 'react';
import { Search, Star, Clock, Calendar, ChevronRight, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

// Mock Data
const MOCK_MENTORS = [
    {
        id: '1',
        name: 'David Kim',
        role: 'Sr. Software Engineer',
        company: 'Google',
        avatar: 'https://i.pravatar.cc/150?u=david',
        rating: 4.9,
        reviews: 42,
        skills: ['System Design', 'React', 'Career Advice'],
        availability: 'Next available: Tomorrow',
        bio: 'Helping students crack FAANG interviews and transition from academia to industry seamlessly.'
    },
    {
        id: '2',
        name: 'Priya Patel',
        role: 'Product Manager',
        company: 'Microsoft',
        avatar: 'https://i.pravatar.cc/150?u=priya',
        rating: 4.8,
        reviews: 28,
        skills: ['Product Strategy', 'Agile', 'Resume Review'],
        availability: 'Next available: This Friday',
        bio: 'Ex-SWE turned PM. I can help you understand the PM role and prepare for case interviews.'
    },
    {
        id: '3',
        name: 'Marcus Johnson',
        role: 'Data Scientist',
        company: 'Meta',
        avatar: 'https://i.pravatar.cc/150?u=marcus',
        rating: 5.0,
        reviews: 15,
        skills: ['Machine Learning', 'Python', 'Mock Interviews'],
        availability: 'Next available: Next Week',
        bio: 'Passionate about AI/ML. Let\'s review your portfolio and get you ready for data roles.'
    }
];

const MY_PROGRAMS = [
    {
        id: '101',
        mentorName: 'Sarah Chen',
        mentorAvatar: 'https://i.pravatar.cc/150?u=sarah2',
        type: '1-on-1 Mentorship',
        status: 'Active',
        nextSession: 'Oct 24, 2024 - 10:00 AM',
        progress: 60
    },
    {
        id: '102',
        mentorName: 'Alex Rodriguez',
        mentorAvatar: 'https://i.pravatar.cc/150?u=alex2',
        type: 'Resume Review',
        status: 'Pending',
        nextSession: 'Awaiting mentor approval',
        progress: 0
    }
];

export default function MentorshipPage() {
    const [activeTab, setActiveTab] = useState<'find' | 'my-programs'>('find');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMentors = MOCK_MENTORS.filter(mentor => 
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        mentor.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                    Mentorship Hub
                </h1>
                <p className="text-slate-400 mt-2">
                    Connect with experienced alumni for guidance, mock interviews, and career advice.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 border-b border-slate-800 pb-px">
                <button
                    className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'find' 
                            ? 'border-blue-500 text-blue-400' 
                            : 'border-transparent text-slate-400 hover:text-slate-300'
                    }`}
                    onClick={() => setActiveTab('find')}
                >
                    Find Mentors
                </button>
                <button
                    className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'my-programs' 
                            ? 'border-blue-500 text-blue-400' 
                            : 'border-transparent text-slate-400 hover:text-slate-300'
                    }`}
                    onClick={() => setActiveTab('my-programs')}
                >
                    My Programs
                </button>
            </div>

            {activeTab === 'find' && (
                <div className="space-y-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input 
                            placeholder="Search by name, company, or skill (e.g. React)..." 
                            className="pl-10 bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredMentors.map((mentor) => (
                            <Card key={mentor.id} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-colors flex flex-col">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start gap-4">
                                        <img 
                                            src={mentor.avatar} 
                                            alt={mentor.name} 
                                            className="w-14 h-14 rounded-full border-2 border-slate-800"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-100 truncate">{mentor.name}</h3>
                                            <p className="text-xs text-blue-400 font-medium truncate">{mentor.role}</p>
                                            <div className="flex items-center text-xs text-slate-400 mt-1">
                                                <Building className="w-3 h-3 mr-1" />
                                                {mentor.company}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 pb-4">
                                    <p className="text-sm text-slate-300 mb-4 line-clamp-2">
                                        {mentor.bio}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {mentor.skills.map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/50 pt-4">
                                        <div className="flex items-center">
                                            <Star className="w-3.5 h-3.5 mr-1 text-amber-400 fill-amber-400" />
                                            <span className="font-medium text-slate-300 mr-1">{mentor.rating}</span>
                                            <span>({mentor.reviews})</span>
                                        </div>
                                        <div className="flex items-center text-emerald-400">
                                            <Clock className="w-3.5 h-3.5 mr-1" />
                                            {mentor.availability.split(': ')[1]}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                        Request Mentorship
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {filteredMentors.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                            <p className="text-slate-400">No mentors found matching your search.</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'my-programs' && (
                <div className="grid gap-4 md:grid-cols-2">
                    {MY_PROGRAMS.map(program => (
                        <Card key={program.id} className="bg-slate-900 border-slate-800 flex flex-col">
                            <CardContent className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                        program.status === 'Active' 
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    }`}>
                                        {program.status}
                                    </span>
                                    <span className="text-xs font-medium text-slate-400">
                                        {program.type}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <img 
                                        src={program.mentorAvatar} 
                                        alt={program.mentorName} 
                                        className="w-12 h-12 rounded-full border border-slate-700 shrink-0"
                                    />
                                    <div>
                                        <p className="text-xs text-slate-500 mb-0.5">Mentor</p>
                                        <h3 className="font-semibold text-slate-100">{program.mentorName}</h3>
                                    </div>
                                </div>
                                <div className="space-y-4 mt-auto">
                                    <div className="flex items-center text-sm text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                        <Calendar className="w-4 h-4 mr-3 text-blue-400 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] text-slate-500 mb-0.5 uppercase tracking-wider">Next Session</p>
                                            <p className="font-medium truncate">{program.nextSession}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white shrink-0 ml-2">
                                            <ChevronRight className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    {program.status === 'Active' && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-medium text-slate-400">
                                                <span>Program Progress</span>
                                                <span className="text-slate-300">{program.progress}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                                                    style={{ width: `${program.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    
                    <Card className="bg-slate-900/50 border-slate-800 border-dashed flex flex-col items-center justify-center p-8 text-center min-h-[300px] hover:border-slate-700 transition-colors cursor-pointer group" onClick={() => setActiveTab('find')}>
                        <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Star className="w-7 h-7 text-blue-400" />
                        </div>
                        <h3 className="font-semibold text-slate-100 mb-2">Find a new Mentor</h3>
                        <p className="text-sm text-slate-400 max-w-[250px]">
                            Explore our network of alumni and request a new mentorship program.
                        </p>
                    </Card>
                </div>
            )}
        </div>
    );
}
