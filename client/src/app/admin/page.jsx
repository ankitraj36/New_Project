'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { adminAPI, materialsAPI, departmentsAPI } from '@/lib/api';
import { FiUsers, FiBookOpen, FiDownload, FiBookmark, FiPlus, FiTrash2, FiEdit, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) };

export default function AdminPage() {
    const { user, isAdmin, isAuthenticated, logout, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [users, setUsers] = useState([]);
    const [tab, setTab] = useState('overview');
    const [showAddForm, setShowAddForm] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', subject: '', semester: '6th Sem', department: 'Computer Science', type: 'PDF', size: '', fileURL: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && (!isAuthenticated || !isAdmin)) {
            router.push('/login');
            return;
        }
        if (isAuthenticated && isAdmin) {
            fetchData();
        }
    }, [isAuthenticated, isAdmin, authLoading]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsR, materialsR, usersR] = await Promise.all([
                adminAPI.getStats(),
                materialsAPI.getAll({ limit: 100 }),
                adminAPI.getUsers(),
            ]);
            setStats(statsR.data);
            setMaterials(materialsR.data.materials);
            setUsers(usersR.data.users);
        } catch {
            toast.error('Failed to load admin data');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await materialsAPI.create(form);
            toast.success('Material added!');
            setShowAddForm(false);
            setForm({ title: '', description: '', subject: '', semester: '6th Sem', department: 'Computer Science', type: 'PDF', size: '', fileURL: '' });
            fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add material');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this material?')) return;
        try {
            await materialsAPI.delete(id);
            toast.success('Material deleted');
            setMaterials(prev => prev.filter(m => m._id !== id));
        } catch {
            toast.error('Failed to delete');
        }
    };

    const handleDeleteUser = async (id) => {
        if (!confirm('Delete this user?')) return;
        try {
            await adminAPI.deleteUser(id);
            toast.success('User deleted');
            setUsers(prev => prev.filter(u => u._id !== id));
        } catch {
            toast.error('Failed to delete user');
        }
    };

    if (authLoading || !isAuthenticated || !isAdmin) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>;
    }

    const departments = ['Computer Science', 'CSIT', 'AI & ML', 'Data Analytics', 'IoT'];
    const types = ['PDF', 'PPT', 'DOCX', 'Textbook', 'Lab Manual'];

    return (
        <section className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex items-center justify-between flex-wrap gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-extrabold">
                            🛡️ Admin <span className="bg-gradient-to-r from-brand-600 to-red-500 bg-clip-text text-transparent">Dashboard</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your platform, {user?.name}</p>
                    </div>
                    <button onClick={() => { logout(); router.push('/'); }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium hover:bg-red-100 hover:text-red-600 transition-all">
                        <FiLogOut /> Logout
                    </button>
                </motion.div>

                {/* Stats */}
                {stats && (
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={1}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {[
                            { icon: <FiUsers />, label: 'Total Users', value: stats.totalUsers, color: 'brand' },
                            { icon: <FiBookOpen />, label: 'Materials', value: stats.totalMaterials, color: 'emerald' },
                            { icon: <FiDownload />, label: 'Downloads', value: stats.totalDownloads, color: 'amber' },
                            { icon: <FiBookmark />, label: 'Bookmarks', value: stats.totalBookmarks, color: 'purple' },
                        ].map((s, i) => (
                            <div key={i} className="p-6 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                                <div className={`w-10 h-10 rounded-xl bg-${s.color}-100 dark:bg-${s.color}-500/20 flex items-center justify-center text-${s.color}-600 dark:text-${s.color}-400 mb-3`}>
                                    {s.icon}
                                </div>
                                <p className="text-2xl font-extrabold">{s.value}</p>
                                <p className="text-sm text-slate-500">{s.label}</p>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
                    {['overview', 'materials', 'users'].map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${tab === t ? 'bg-brand-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Materials Tab */}
                {tab === 'materials' && (
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">📚 Study Materials ({materials.length})</h2>
                            <button onClick={() => setShowAddForm(!showAddForm)}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 shadow-md transition-all">
                                <FiPlus /> Add Material
                            </button>
                        </div>

                        {showAddForm && (
                            <form onSubmit={handleAdd} className="mb-8 p-6 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="Title"
                                        className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-brand-500/50" />
                                    <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required placeholder="Subject"
                                        className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-brand-500/50" />
                                </div>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}
                                        className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm">
                                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <input value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })} placeholder="Semester"
                                        className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm" />
                                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                                        className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm">
                                        {types.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} placeholder="Size (e.g. 5 MB)"
                                        className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm" />
                                    <input value={form.fileURL} onChange={e => setForm({ ...form, fileURL: e.target.value })} required placeholder="Google Drive URL"
                                        className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm" />
                                </div>
                                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description (optional)" rows={2}
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm" />
                                <button type="submit" className="px-8 py-3 rounded-2xl bg-brand-600 text-white font-semibold hover:bg-brand-700 shadow-md transition-all">Save Material</button>
                            </form>
                        )}

                        <div className="space-y-3">
                            {materials.map(m => (
                                <div key={m._id} className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                                    <div className="flex-1 min-w-0 mr-4">
                                        <h4 className="font-semibold text-sm truncate">{m.title}</h4>
                                        <p className="text-xs text-slate-500">{m.department} • {m.semester} • {m.type} • {m.downloadCount} downloads</p>
                                    </div>
                                    <button onClick={() => handleDelete(m._id)}
                                        className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 hover:bg-red-200 transition-all">
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Users Tab */}
                {tab === 'users' && (
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <h2 className="text-xl font-bold mb-6">👥 Users ({users.length})</h2>
                        <div className="space-y-3">
                            {users.map(u => (
                                <div key={u._id} className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                                            {u.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">{u.name}</h4>
                                            <p className="text-xs text-slate-500">{u.email} • <span className="capitalize">{u.role}</span></p>
                                        </div>
                                    </div>
                                    {u._id !== user?._id && (
                                        <button onClick={() => handleDeleteUser(u._id)}
                                            className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 hover:bg-red-200 transition-all">
                                            <FiTrash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Overview Tab */}
                {tab === 'overview' && (
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-200/60 dark:border-slate-700/60">
                            <div className="text-5xl mb-4">🎓</div>
                            <h3 className="text-xl font-bold mb-2">Welcome to Admin Panel</h3>
                            <p className="text-slate-500 text-sm mb-6">Manage materials, users, and track analytics from here.</p>
                            <div className="flex justify-center gap-4">
                                <button onClick={() => setTab('materials')} className="px-6 py-3 rounded-2xl bg-brand-600 text-white font-semibold text-sm">Manage Materials</button>
                                <button onClick={() => setTab('users')} className="px-6 py-3 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm">View Users</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
