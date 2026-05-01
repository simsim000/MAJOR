'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';
import Link from 'next/link';

const registerSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email address').refine(
        (email) => email.endsWith('@aiktc.ac.in'),
        'Email must be a valid @aiktc.ac.in address'
    ),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['student', 'alumni'] as const),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: 'student',
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setLoading(true);
        setError(null);

        try {
            // 1. Create User in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            // 2. Create User Profile in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: data.email,
                fullName: data.fullName,
                role: data.role,
                isVerified: false, // Default to false
                createdAt: Date.now(),
            });

            // 3. Redirect to Dashboard (or Verification Pending)
            router.push('/dashboard');
        } catch (err: any) {
            if (err.code !== 'auth/email-already-in-use') {
                console.error(err);
            }
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already registered.');
            } else {
                setError(`Error: ${err.message || 'Unknown error occurred.'}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto border-slate-800 bg-slate-950/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                    Create Account
                </CardTitle>
                <CardDescription className="text-center">
                    Join the exclusive generic college network
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            placeholder="John Doe"
                            {...register('fullName')}
                            className={errors.fullName ? 'border-red-500' : ''}
                        />
                        {errors.fullName && (
                            <p className="text-xs text-red-500">{errors.fullName.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">College Email</Label>
                        <Input
                            id="email"
                            placeholder="your.name@aiktc.ac.in"
                            type="email"
                            {...register('email')}
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password')}
                            className={errors.password ? 'border-red-500' : ''}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">I am a...</Label>
                        <select
                            id="role"
                            {...register('role')}
                            className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="student">Student</option>
                            <option value="alumni">Alumni</option>
                        </select>
                        {errors.role && (
                            <p className="text-xs text-red-500">{errors.role.message}</p>
                        )}
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="justify-center">
                <p className="text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-400 hover:underline">
                        Login
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
