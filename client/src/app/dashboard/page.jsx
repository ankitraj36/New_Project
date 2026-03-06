'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { bookmarksAPI, materialsAPI } from '@/lib/api';
import { FiBookmark, FiDownload, FiUser, FiLogOut, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) };

export default function DashboardPage() {
    const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
            return;
        }
        if (isAuthenticated) {
            bookmarksAPI.getAll()
                .then(r => setBookmarks(r.data.bookmarks))
                .catch(() => { })
                .finally(() => setLoading(false));
        }
    }, [isAuthenticated, authLoading]);

    const removeBookmark = async (materialId) => {
        try {
            await bookmarksAPI.remove(materialId);
            setBookmarks(prev => prev.filter(b => b.materialId?._id !== materialId));
            toast.success('Bookmark removed');
        } catch {
            toast.error('Failed to remove bookmark');
        }
    };

    const handleDownload = async (material) => {
        try { await materialsAPI.download(material._id); } catch { }
        window.open(material.fileURL, '_blank');
    };

    if (authLoading || !isAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>;
    }

    return (
        <section className="py-20 lg:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-12">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-extrabold">
                                Welcome, <span className="bg-gradient-to-r from-brand-600 to-red-500 bg-clip-text text-transparent">{user?.name}</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">{user?.email}</p>
                        </div>
                        <button onClick={() => { logout(); router.push('/'); }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium hover:bg-red-100 hover:text-red-600 transition-all">
                            <FiLogOut /> Logout
                        </button>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={1}
                    className="grid sm:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400"><FiUser /></div>
                            <span className="text-sm font-medium text-slate-500">Role</span>
                        </div>
                        <p className="text-xl font-bold capitalize">{user?.role}</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400"><FiBookmark /></div>
                            <span className="text-sm font-medium text-slate-500">Bookmarks</span>
                        </div>
                        <p className="text-xl font-bold">{bookmarks.length}</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400"><FiDownload /></div>
                            <span className="text-sm font-medium text-slate-500">Joined</span>
                        </div>
                        <p className="text-xl font-bold">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                </motion.div>

                {/* Bookmarks */}
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={2}>
                    <h2 className="text-2xl font-bold mb-6">📚 My Bookmarks</h2>
                    {loading ? (
                        <div className="grid sm:grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />)}
                        </div>
                    ) : bookmarks.length === 0 ? (
                        <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-200/60 dark:border-slate-700/60">
                            <FiBookmark className="text-4xl text-slate-300 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">No bookmarks yet</h3>
                            <p className="text-slate-500 text-sm">Browse resources and bookmark your favorites!</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-4">
                            {bookmarks.map((b, i) => {
                                const m = b.materialId;
                                if (!m) return null;
                                return (
                                    <motion.div key={b._id} initial="hidden" animate="visible" variants={fadeInUp} custom={i}
                                        className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 hover:border-brand-400/50 transition-all">
                                        <div className="flex-1 min-w-0 mr-4">
                                            <h4 className="font-semibold text-sm truncate">{m.title}</h4>
                                            <p className="text-xs text-slate-500 mt-1">{m.department} • {m.semester} • {m.type}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleDownload(m)}
                                                className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400 hover:bg-brand-200 transition-all">
                                                <FiDownload size={16} />
                                            </button>
                                            <button onClick={() => removeBookmark(m._id)}
                                                className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-200 transition-all">
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
