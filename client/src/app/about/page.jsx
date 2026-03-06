'use client';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa6';
import { FiZap, FiShield, FiHeart } from 'react-icons/fi';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }) };

export default function AboutPage() {
    return (
        <section className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <span className="text-brand-600 dark:text-brand-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
                        <h1 className="text-3xl lg:text-5xl font-extrabold mt-3 mb-6">
                            Empowering Students <span className="bg-gradient-to-r from-brand-600 to-red-500 bg-clip-text text-transparent">Everywhere</span>
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            College Lover is dedicated to providing students with the best study materials, notes, and resources to excel in their academic journey. We believe education should be accessible and free for everyone.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                            Founded by students at ITER, Siksha &apos;O&apos; Anusandhan University, our platform curates and organizes study materials covering Computer Science, CSIT, AI & ML, Data Analytics, IoT, and more. We are building a community where students help students succeed.
                        </p>

                        <div className="space-y-5">
                            {[
                                { icon: <FiZap />, title: 'Fast Access', desc: 'Quick download links via Google Drive for all resources.', color: 'bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400' },
                                { icon: <FiShield />, title: 'Verified Materials', desc: 'Study materials verified and curated by top-performing students.', color: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' },
                                { icon: <FiHeart />, title: 'Free Forever', desc: 'No hidden costs. Built by students, purely for students.', color: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
                            ].map((item, i) => (
                                <motion.div key={i} initial="hidden" animate="visible" variants={fadeInUp} custom={i + 2}
                                    className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 text-xl`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{item.title}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={3}>
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
    );
}
