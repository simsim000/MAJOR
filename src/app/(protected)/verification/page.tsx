'use client';

import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VerificationPage() {
    const { user, refreshProfile } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file || !user) return;

        setUploading(true);
        try {
            // 1. Upload to Firebase Storage
            const storageRef = ref(storage, `id-cards/${user.uid}/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);

            // 2. Update User Profile
            await updateDoc(doc(db, 'users', user.uid), {
                collegeIdUrl: url,
            });

            // 3. Refresh profile to trigger layout redirect
            await refreshProfile();

            // Router push just in case, though layout effect should catch it
            router.push('/verification/pending');
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload ID. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Card className="w-full max-w-md bg-slate-900 border-slate-800">
            <CardHeader>
                <CardTitle className="text-white">Verify Your Identity</CardTitle>
                <CardDescription>
                    To ensure the safety of our community, please upload your Valid College ID Card.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 mb-3 text-slate-400" />
                            <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-slate-500">PNG, JPG or PDF</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*,application/pdf" />
                    </label>
                </div>

                {file && (
                    <div className="flex items-center p-2 text-sm text-blue-400 bg-blue-900/20 rounded">
                        <FileText className="w-4 h-4 mr-2" />
                        {file.name}
                    </div>
                )}

                <Button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                >
                    {uploading ? 'Uploading...' : 'Submit for Verification'}
                </Button>
            </CardContent>
        </Card>
    );
}
