'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { FiBookOpen, FiFileText, FiLayers, FiDownload, FiArrowRight, FiStar } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa6';
import { materialsAPI } from '@/lib/api';

function Counter({ target, suffix = '+' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                let current = 0;
                const step = Math.max(1, Math.ceil(target / 100));
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        setCount(target);
                        clearInterval(interval);
                    } else {
                        setCount(current);
                    }
                }, 20);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const features = [
    { icon: <FiBookOpen size={24} />, title: 'Free Study Materials', desc: 'Access thousands of curated notes, textbooks, and reference materials at zero cost.', gradient: 'from-blue-500 to-blue-600' },
    { icon: <FiFileText size={24} />, title: 'Previous Year Questions', desc: 'Practice with real exam papers from previous years to boost your confidence.', gradient: 'from-amber-500 to-orange-500' },
    { icon: <FiLayers size={24} />, title: 'Organized by Subject', desc: 'Materials neatly organized by department, semester, and subject for easy navigation.', gradient: 'from-emerald-500 to-green-500' },
    { icon: <FiDownload size={24} />, title: 'Easy Downloads', desc: 'One-click downloads via Google Drive — fast, reliable, and hassle-free.', gradient: 'from-purple-500 to-violet-500' },
];

const testimonials = [
    { name: 'Rahul Sharma', dept: 'CSE, 6th Sem', initial: 'R', gradient: 'from-blue-500 to-purple-500', text: '"College Lover is a game changer! Found all my 6th semester notes in one place. The organized layout makes it so easy to find what I need."', stars: 5 },
    { name: 'Priya Verma', dept: 'AI & ML, 6th Sem', initial: 'P', gradient: 'from-emerald-500 to-teal-500', text: '"Best platform for college study materials! The PYQs helped me prepare better for exams. Love the dark mode too — easy on the eyes at night."', stars: 5 },
    { name: 'Amit Kumar', dept: 'CSIT, 6th Sem', initial: 'A', gradient: 'from-amber-500 to-orange-500', text: '"Such a great community! The download process is quick and hassle-free. Highly recommend for every college student."', stars: 5 },
];

export default function HomePage() {
    const [stats, setStats] = useState({ totalMaterials: 500, totalDownloads: 1000, totalDepartments: 5 });

    useEffect(() => {
        materialsAPI.getStats().then(r => setStats(r.data)).catch(() => { });
    }, []);

    return (
        <>
            {/* HERO */}
            <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-brand-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="hero-blob blob-1" />
                <div className="hero-blob blob-2" />
                <div className="hero-blob blob-3" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={0}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/80 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 text-sm font-semibold mb-6 backdrop-blur-sm border border-brand-200/50 dark:border-brand-500/30">
                            ✨ Free Study Resources for Every Student
                        </span>
                    </motion.div>

                    <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} custom={1}
                        className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">
                        Your Ultimate<br />
                        <span className="bg-gradient-to-r from-brand-600 via-red-500 to-brand-400 bg-clip-text text-transparent">
                            College Study Hub
                        </span>
                    </motion.h1>

                    <motion.p initial="hidden" animate="visible" variants={fadeInUp} custom={2}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Access high-quality notes, previous year questions, syllabi, and study materials — all organized by department and semester, completely free.
                    </motion.p>

                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={3}
                        className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/materials"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-2xl font-semibold shadow-xl shadow-brand-500/25 hover:shadow-2xl hover:shadow-brand-500/40 hover:-translate-y-1 transition-all duration-300">
                            <FiBookOpen className="group-hover:rotate-12 transition-transform" /> Browse Notes
                        </Link>
                        <Link href="/departments"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl font-semibold border-2 border-slate-200 dark:border-slate-700 hover:border-brand-400 hover:-translate-y-1 shadow-lg hover:shadow-xl transition-all duration-300">
                            Explore Departments <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={4}
                        className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400">
                                <Counter target={stats.totalMaterials} />
                            </div>
                            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Study Materials</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400">
                                <Counter target={stats.totalDepartments} />
                            </div>
                            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Departments</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400">
                                <Counter target={stats.totalDownloads || 1000} />
                            </div>
                            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Downloads</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-20 lg:py-28 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                        className="text-center mb-16">
                        <span className="text-brand-600 dark:text-brand-400 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
                        <h2 className="text-3xl lg:text-5xl font-extrabold mt-3">
                            Everything You Need to <span className="bg-gradient-to-r from-brand-600 to-red-500 bg-clip-text text-transparent">Ace Your Exams</span>
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {features.map((f, i) => (
                            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i}
                                className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 hover:border-brand-400/50 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-2 transition-all duration-300">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-6 shadow-lg text-white group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                                    {f.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-20 lg:py-28 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                        className="text-center mb-16">
                        <span className="text-brand-600 dark:text-brand-400 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
                        <h2 className="text-3xl lg:text-5xl font-extrabold mt-3">
                            What Students <span className="bg-gradient-to-r from-brand-600 to-red-500 bg-clip-text text-transparent">Say</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i}
                                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 hover:-translate-y-2 transition-all duration-300">
                                <div className="flex items-center gap-1 text-amber-400 mb-4">
                                    {Array.from({ length: t.stars }).map((_, j) => <FiStar key={j} className="fill-current" />)}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{t.text}</p>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                                        {t.initial}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{t.name}</div>
                                        <div className="text-xs text-slate-500">{t.dept}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-red-800" />
                <div className="hero-blob blob-1 opacity-20" />
                <div className="hero-blob blob-2 opacity-20" />
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                    className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6">
                        Start Studying<br />Smarter Today
                    </h2>
                    <p className="text-brand-200 text-lg mb-10 leading-relaxed">
                        Join thousands of students already using College Lover to ace their exams. All resources, completely free.
                    </p>
                    <Link href="/materials"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 rounded-2xl font-bold shadow-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                        <FaGraduationCap /> Explore Resources
                    </Link>
                </motion.div>
            </section>

            {/* ABOUT PREVIEW */}
            <section className="py-20 lg:py-28 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                            <span className="text-brand-600 dark:text-brand-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
                            <h2 className="text-3xl lg:text-5xl font-extrabold mt-3 mb-6">
                                Empowering Students <span className="bg-gradient-to-r from-brand-600 to-red-500 bg-clip-text text-transparent">Everywhere</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                College Lover is dedicated to providing students with the best study materials, notes, and resources to excel in their academic journey. We believe education should be accessible and free for everyone.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { icon: '⚡', title: 'Fast Access', desc: 'Quick download links via Google Drive for all resources.', color: 'bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400' },
                                    { icon: '🛡️', title: 'Verified Materials', desc: 'Study materials verified and curated by top-performing students.', color: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' },
                                    { icon: '❤️', title: 'Free Forever', desc: 'No hidden costs. Built by students, purely for students.', color: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 text-lg`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">{item.title}</h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={2}>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-red-500/20 rounded-3xl blur-3xl" />
                                <div className="relative bg-gradient-to-br from-brand-50 to-red-50 dark:from-brand-500/10 dark:to-red-500/10 rounded-3xl p-10 border border-brand-200/30 dark:border-brand-500/20">
                                    <div className="text-center space-y-8">
                                        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-brand-600 to-red-500 flex items-center justify-center shadow-2xl shadow-brand-500/30">
                                            <FaGraduationCap className="text-white text-4xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-extrabold">College Lover</h3>
                                            <p className="text-slate-500 dark:text-slate-400">Your Academic Companion</p>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 pt-4">
                                            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80">
                                                <div className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">5+</div>
                                                <div className="text-xs text-slate-500 mt-1">Depts</div>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80">
                                                <div className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">500+</div>
                                                <div className="text-xs text-slate-500 mt-1">Notes</div>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80">
                                                <div className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">1K+</div>
                                                <div className="text-xs text-slate-500 mt-1">Users</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
