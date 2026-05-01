export type UserRole = 'student' | 'alumni' | 'admin';

export interface UserProfile {
    uid: string;
    email: string;
    role: UserRole;
    fullName: string;
    photoURL?: string;
    collegeIdUrl?: string; // URL to the uploaded ID card image
    isVerified: boolean;
    createdAt: number;
    department?: string;
    batch?: string; // For students/alumni
    headline?: string;
    bio?: string;
    linkedinUrl?: string;
    githubUrl?: string;
}

export interface VerificationRequest {
    id: string;
    uid: string;
    email: string;
    fullName: string;
    collegeIdUrl: string;
    role: UserRole;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: number;
    reviewedAt?: number;
    reviewedBy?: string; // Admin UID
    rejectionReason?: string;
}

export interface Opportunity {
    id: string;
    title: string;
    description: string;
    type: 'job' | 'internship' | 'mentorship';
    authorId: string;
    authorName: string;
    authorRole: UserRole;
    organization?: string;
    location?: string;
    link?: string; // External application link
    createdAt: number;
    tags: string[];
}

export interface Lecture {
    id: string;
    title: string;
    domain: string;
    description: string;
    date: number; // Scheduled time timestamp
    meetLink: string;
    authorId: string;
    authorName: string;
    createdAt: number;
}
