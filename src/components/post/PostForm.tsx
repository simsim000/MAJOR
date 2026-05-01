'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Opportunity } from '@/types';

const postSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    type: z.enum(['job', 'internship', 'mentorship'] as const),
    organization: z.string().optional(),
    location: z.string().optional(),
    link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    tags: z.string().optional(), // Comma separated string for input
});

type PostFormValues = z.infer<typeof postSchema>;

export default function PostForm() {
    const { user, profile } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            type: 'job',
        },
    });

    const onSubmit = async (data: PostFormValues) => {
        if (!user || !profile) return;
        setLoading(true);

        try {
            const tagsArray = data.tags ? data.tags.split(',').map(t => t.trim()) : [];

            const newPost: Omit<Opportunity, 'id'> = {
                title: data.title,
                description: data.description,
                type: data.type,
                authorId: user.uid,
                authorName: profile.fullName,
                authorRole: profile.role,
                organization: data.organization || '',
                location: data.location || '',
                link: data.link || '',
                createdAt: Date.now(),
                tags: tagsArray,
            };

            await addDoc(collection(db, 'opportunities'), newPost);
            router.push('/dashboard/jobs'); // Redirect to jobs list for now
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-2xl mx-auto bg-slate-900 border-slate-800">
            <CardHeader>
                <CardTitle className="text-white">Post an Opportunity</CardTitle>
                <CardDescription>Share a job, internship, or mentorship opportunity with the network.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Software Engineer Intern" {...register('title')} className={errors.title ? 'border-red-500' : ''} />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <select
                            id="type"
                            {...register('type')}
                            className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                        >
                            <option value="job">Job</option>
                            <option value="internship">Internship</option>
                            <option value="mentorship">Mentorship</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            rows={5}
                            className="flex w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Describe the role and requirements..."
                            {...register('description')}
                        />
                        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="organization">Organization</Label>
                            <Input id="organization" placeholder="Google" {...register('organization')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="Remote / Mumbai" {...register('location')} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="link">Application Link (Optional)</Label>
                        <Input id="link" placeholder="https://..." {...register('link')} className={errors.link ? 'border-red-500' : ''} />
                        {errors.link && <p className="text-red-500 text-xs">{errors.link.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input id="tags" placeholder="react, typescript, frontend" {...register('tags')} />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                        {loading ? 'Posting...' : 'Create Post'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
