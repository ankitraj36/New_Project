'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { departmentsAPI } from '@/lib/api';
import { fallbackDepartments } from '@/lib/fallbackData';
import { FiArrowRight } from 'react-icons/fi';
import { FaLaptopCode, FaNetworkWired, FaBrain, FaChartPie, FaMicrochip, FaGraduationCap } from 'react-icons/fa6';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }) };

const iconMap = {
    'Computer Science': <FaLaptopCode size={28} />,
    'CSIT': <FaNetworkWired size={28} />,
    'AI & ML': <FaBrain size={28} />,
    'Data Analytics': <FaChartPie size={28} />,
    'IoT': <FaMicrochip size={28} />,
};
const colorMap = {
    'Computer Science': 'from-blue-500 to-blue-600',
    'CSIT': 'from-cyan-500 to-teal-500',
    'AI & ML': 'from-rose-500 to-pink-500',
    'Data Analytics': 'from-emerald-500 to-green-500',
    'IoT': 'from-amber-500 to-orange-500',
};

export default function DepartmentsPage() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        departmentsAPI.getAll()
            .then(r => setDepartments(r.data.departments))
            .catch(() => {
                setDepartments(fallbackDepartments);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-16">
                    <span className="text-brand-600 dark:text-brand-400 font-semibold text-sm uppercase tracking-wider">Browse</span>
                    <h1 className="text-3xl lg:text-5xl font-extrabold mt-3">
                        Find Your <span className="bg-gradient-to-r from-brand-600 to-red-500 bg-clip-text text-transparent">Department</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
                        Explore study materials organized by department. Select your department to browse available resources.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {departments.map((dept, i) => (
                            <motion.div key={dept._id} initial="hidden" animate="visible" variants={fadeInUp} custom={i}>
                                <Link href={`/materials?department=${encodeURIComponent(dept.name)}`}
                                    className="group block p-8 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 hover:border-brand-400/50 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-2 transition-all duration-300">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[dept.name] || 'from-brand-500 to-brand-600'} flex items-center justify-center mb-6 shadow-lg text-white group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                                        {iconMap[dept.name] || <FaGraduationCap size={28} />}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{dept.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-brand-600 dark:text-brand-400 font-semibold">{dept.materialCount || 0} Resources</span>
                                        <FiArrowRight className="text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
