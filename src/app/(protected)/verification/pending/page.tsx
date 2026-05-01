'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthProvider';

export default function VerificationPendingPage() {
    const { logout } = useAuth();

    return (
        <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-center">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <Clock className="w-16 h-16 text-yellow-500 animate-pulse" />
                </div>
                <CardTitle className="text-white text-2xl">Verification Pending</CardTitle>
                <CardDescription className="text-lg">
                    Thanks for submitting your ID!
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-slate-300">
                    <p>Our admin team is currently reviewing your documents to verify your affiliation with AIKTC.</p>
                    <p className="mt-2">This process usually takes 24-48 hours. You will receive an email once approved.</p>
                </div>

                <Button variant="outline" onClick={() => logout()} className="w-full border-slate-700 hover:bg-slate-800 text-slate-300">
                    Sign Out
                </Button>
            </CardContent>
        </Card>
    );
}
