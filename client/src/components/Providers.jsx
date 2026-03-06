'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider } from '@/lib/auth';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                retry: 1,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            borderRadius: '16px',
                            background: '#1e293b',
                            color: '#fff',
                        },
                    }}
                />
            </AuthProvider>
        </QueryClientProvider>
    );
}
