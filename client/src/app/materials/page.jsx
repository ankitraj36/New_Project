'use client';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState, Suspense } from 'react';
import { materialsAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { bookmarksAPI } from '@/lib/api';
import { fallbackMaterials } from '@/lib/fallbackData';
import { FiDownload, FiBookmark, FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { FaLaptopCode, FaNetworkWired, FaBrain, FaChartPie, FaMicrochip, FaBook } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }) };

const iconMap = { 'Computer Science': FaLaptopCode, 'CSIT': FaNetworkWired, 'AI & ML': FaBrain, 'Data Analytics': FaChartPie, 'IoT': FaMicrochip };
const gradientMap = { 'Computer Science': 'from-blue-500 to-blue-600', 'CSIT': 'from-cyan-500 to-teal-500', 'AI & ML': 'from-rose-500 to-pink-500', 'Data Analytics': 'from-emerald-500 to-green-500', 'IoT': 'from-amber-500 to-orange-500' };
const typeColorMap = { 'PDF': 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400', 'PPT': 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400', 'DOCX': 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400', 'Textbook': 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400', 'Lab Manual': 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' };

function MaterialsContent() {
    const searchParams = useSearchParams();
    const { isAuthenticated } = useAuth();
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [deptFilter, setDeptFilter] = useState(searchParams.get('department') || '');
    const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
    const [usingFallback, setUsingFallback] = useState(false);

    const departments = ['Computer Science', 'CSIT', 'AI & ML', 'Data Analytics', 'IoT'];

    useEffect(() => {
        fetchMaterials();
    }, [deptFilter]);

    useEffect(() => {
        if (isAuthenticated) {
            bookmarksAPI.getAll().then(r => {
                const ids = new Set(r.data.bookmarks.map(b => b.materialId?._id));
                setBookmarkedIds(ids);
            }).catch(() => { });
        }
    }, [isAuthenticated]);

    const fetchMaterials = async () => {
        setLoading(true);
        try {
            const params = {};
            if (search) params.search = search;
            if (deptFilter) params.department = deptFilter;
            const r = await materialsAPI.getAll(params);
            setMaterials(r.data.materials);
            setUsingFallback(false);
        } catch {
            // Backend not running — use fallback data from data.js
            let data = [...fallbackMaterials];
            if (search) {
                const q = search.toLowerCase();
                data = data.filter(m => m.title.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q));
            }
            if (deptFilter) {
                data = data.filter(m => m.department === deptFilter);
            }
            setMaterials(data);
            setUsingFallback(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMaterials();
    };

    const handleDownload = async (material) => {
        try {
            await materialsAPI.download(material._id);
        } catch { }
        window.open(material.fileURL, '_blank');
    };

    const toggleBookmark = async (id) => {
        if (!isAuthenticated) {
            toast.error('Please login to bookmark resources');
            return;
        }
        try {
            if (bookmarkedIds.has(id)) {
                await bookmarksAPI.remove(id);
                setBookmarkedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
                toast.success('Bookmark removed');
            } else {
                await bookmarksAPI.add(id);
                setBookmarkedIds(prev => new Set(prev).add(id));
                toast.success('Bookmarked!');
            }
        } catch {
            toast.error('Failed to update bookmark');
        }
    };

    return (
        <section className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-12">
                    <span className="text-brand-600 dark:text-brand-400 font-semibold text-sm uppercase tracking-wider">Study Resources</span>
                    <h1 className="text-3xl lg:text-5xl font-extrabold mt-3">
                        Available <span className="bg-gradient-to-r from-brand-600 to-red-500 bg-clip-text text-transparent">Resources</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Explore high-quality study materials for your semester.</p>
                </motion.div>

                {/* Search & Filter */}
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={1} className="mb-8 space-y-4">
                    <form onSubmit={handleSearch} className="flex items-center gap-3 flex-wrap">
                        <div className="relative flex-1 min-w-[250px]">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                                placeholder="Search notes, subjects..."
                                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all" />
                        </div>
                        <button type="submit" className="px-6 py-3 rounded-2xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 shadow-md shadow-brand-500/20 transition-all">
                            Search
                        </button>
                        {(search || deptFilter) && (
                            <button type="button" onClick={() => { setSearch(''); setDeptFilter(''); }} className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-sm border border-slate-200 dark:border-slate-700 hover:bg-brand-50 transition-all">
                                <FiX className="inline mr-1" /> Clear
                            </button>
                        )}
                    </form>

                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => setDeptFilter('')}
                            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${!deptFilter ? 'bg-brand-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-400'}`}>
                            All
                        </button>
                        {departments.map(d => (
                            <button key={d} onClick={() => setDeptFilter(d)}
                                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${deptFilter === d ? 'bg-brand-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-400'}`}>
                                {d}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Materials Grid */}
                {loading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-72 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
                        ))}
                    </div>
                ) : materials.length === 0 ? (
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 mb-6">
                            <FiSearch className="text-3xl text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No materials found</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">Try adjusting your search or filters.</p>
                        <button onClick={() => { setSearch(''); setDeptFilter(''); }}
                            className="px-6 py-3 rounded-2xl bg-brand-600 text-white font-semibold hover:bg-brand-700 shadow-lg shadow-brand-500/25 transition-all">
                            Clear Filters
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {materials.map((item, i) => {
                            const IconComp = iconMap[item.department] || FaBook;
                            const gradient = gradientMap[item.department] || 'from-slate-500 to-slate-600';
                            const typeColor = typeColorMap[item.type] || 'bg-slate-100 text-slate-600';
                            return (
                                <motion.div key={item._id} initial="hidden" animate="visible" variants={fadeInUp} custom={i}
                                    className="h-full p-6 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 hover:border-brand-400/50 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                                            <IconComp className="text-white" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold">{item.semester}</span>
                                            <button onClick={() => toggleBookmark(item._id)}
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${bookmarkedIds.has(item._id) ? 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-brand-600'}`}>
                                                <FiBookmark size={14} className={bookmarkedIds.has(item._id) ? 'fill-current' : ''} />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-base mb-3 leading-snug">{item.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className={`px-2.5 py-1 rounded-lg ${typeColor} text-xs font-semibold`}>{item.type}</span>
                                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-semibold">{item.size || 'N/A'}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{item.subject}</p>
                                    <div className="mt-auto">
                                        <button onClick={() => handleDownload(item)}
                                            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold shadow-md shadow-brand-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                            <FiDownload /> Download
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

export default function MaterialsPage() {
    return (
        <Suspense fallback={<div className="py-20 text-center"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full mx-auto" /></div>}>
            <MaterialsContent />
        </Suspense>
    );
}
