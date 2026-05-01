import PostList from '@/components/post/PostList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function JobsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Jobs & Internships</h1>
                <Link href="/dashboard/post">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Post Opportunity
                    </Button>
                </Link>
            </div>
            <PostList type="job" />
            {/* Ideally we show both jobs and internships, but PostList takes single type. 
          For now, just jobs. We can enhance PostList later to accept array or no filter. */}
        </div>
    );
}
