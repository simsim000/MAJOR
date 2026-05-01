'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from 'lucide-react'; // Wait, Badge is not in lucide-react. I need to make a component or use something else.
// I'll skip Badge for now or make a simple span.

export default function DashboardPage() {
    const { profile } = useAuth();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    Welcome back, {profile?.fullName?.split(' ')[0]}
                </h1>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    Post Opportunity
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">
                            Total Opportunities
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">124</div>
                        <p className="text-xs text-slate-400">+12 from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">
                            Network Connections
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">+573</div>
                        <p className="text-xs text-slate-400">+201 since last week</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">
                            Pending Applications
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">12</div>
                        <p className="text-xs text-slate-400">4 new updates</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">
                            Profile Views
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">1.2k</div>
                        <p className="text-xs text-slate-400">+14% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Activity</CardTitle>
                        <CardDescription>
                            Latest posts and updates from your network.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Placeholder activity items */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                                    <div className="h-9 w-9 rounded-full bg-slate-700 mx-2" />
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none text-white">
                                            Alumni Posted a new Job
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            Software Engineer at Google
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-slate-500">
                                        2h ago
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Suggested Mentors</CardTitle>
                        <CardDescription>
                            Alumni relevant to your field.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Placeholder mentors */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center space-x-4">
                                    <div className="h-10 w-10 rounded-full bg-slate-700" />
                                    <div>
                                        <p className="text-sm font-medium text-white">Sarah Wilson</p>
                                        <p className="text-xs text-slate-400">Product Manager @ Microsoft</p>
                                    </div>
                                    <Button size="sm" variant="outline" className="ml-auto border-slate-700 text-blue-400 hover:text-blue-300">
                                        Connect
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
