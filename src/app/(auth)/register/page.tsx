import RegisterForm from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Register | Alumni+',
    description: 'Create your account',
};

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-grid-slate-900/[0.04] bg-[bottom_1px_center]">
            <div className="absolute inset-0 bg-slate-950 -z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            <RegisterForm />
        </div>
    );
}
