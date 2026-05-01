'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Opportunity } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import { MapPin, Building2, Calendar } from 'lucide-react';

interface PostListProps {
    type?: 'job' | 'internship' | 'mentorship';
}

export default function PostList({ type }: PostListProps) {
    const [posts, setPosts] = useState<Opportunity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let q = query(collection(db, 'opportunities'), orderBy('createdAt', 'desc'));

                if (type) {
                    q = query(collection(db, 'opportunities'), where('type', '==', type), orderBy('createdAt', 'desc'));
                }

                const querySnapshot = await getDocs(q);
                const fetchedPosts: Opportunity[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedPosts.push({ id: doc.id, ...doc.data() } as Opportunity);
                });
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [type]);

    if (loading) {
        return <div className="text-center py-10 text-slate-500">Loading opportunities...</div>;
    }

    if (posts.length === 0) {
        return <div className="text-center py-10 text-slate-500">No opportunities found. Be the first to post!</div>;
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <Card key={post.id} className="bg-slate-900 border-slate-800 flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-white text-lg line-clamp-1">{post.title}</CardTitle>
                                <CardDescription className="line-clamp-1">{post.organization}</CardDescription>
                            </div>
                            <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                                {post.type}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="flex items-center text-xs text-slate-400 mb-4 space-x-4">
                            {post.location && (
                                <span className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" /> {post.location}
                                </span>
                            )}
                            <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" /> {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <p className="text-sm text-slate-300 line-clamp-3 mb-4">
                            {post.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-blue-900/20 text-blue-300">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                        <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700" variant="outline">
                            View Details
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
