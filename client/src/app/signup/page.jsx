'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa6';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignupPage() {
    const { register } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        try {
            await register(name, email, password);
            toast.success('Account created!');
            router.push('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-slate-50 via-brand-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center shadow-xl shadow-brand-500/25 mb-4">
                        <FaGraduationCap className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl font-extrabold">Create Account</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Join College Lover for free</p>
                </div>

                <div className="bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-200/60 dark:border-slate-700/60 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Full Name</label>
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                                    placeholder="John Doe"
                                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Email</label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                                    placeholder="you@example.com"
                                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                                    placeholder="At least 6 characters" minLength={6}
                                    className="w-full pl-12 pr-12 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all" />
                                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showPw ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" disabled={loading}
                            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold shadow-lg shadow-brand-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'Creating...' : 'Create Account'}
                        </button>
                    </form>
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                        Already have an account?{' '}
                        <Link href="/login" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">Login</Link>
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
