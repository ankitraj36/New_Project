'use client';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiUser, FiSend } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { useState } from 'react';
import toast from 'react-hot-toast';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }) };

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Thank you! Your message has been sent.');
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <section className="py-20 lg:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-16">
                    <span className="text-brand-600 dark:text-brand-400 font-semibold text-sm uppercase tracking-wider">Contact</span>
                    <h1 className="text-3xl lg:text-5xl font-extrabold mt-3">
                        Get in <span className="bg-gradient-to-r from-brand-600 to-red-500 bg-clip-text text-transparent">Touch</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto">Have questions or suggestions? We&apos;d love to hear from you.</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={1}>
                        <div className="bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-200/60 dark:border-slate-700/60 p-8 lg:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Your Name</label>
                                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Email</label>
                                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Message</label>
                                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={5}
                                        placeholder="Your message..."
                                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none" />
                                </div>
                                <button type="submit"
                                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold shadow-lg shadow-brand-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                                    <FiSend /> Send Message
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={2} className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400">
                                        <FiUser size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Name</h4>
                                        <p className="text-slate-500 text-sm">Ankit Raj</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400">
                                        <FiMail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Email</h4>
                                        <a href="mailto:ankitraj3736@gmail.com" className="text-slate-500 text-sm hover:text-brand-600 transition-colors">ankitraj3736@gmail.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400">
                                        <FiMapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Location</h4>
                                        <p className="text-slate-500 text-sm">ITER, Siksha &apos;O&apos; Anusandhan University, Bhubaneswar, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                            <div className="flex gap-3">
                                <a href="https://github.com/ankitraj36" target="_blank" rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-100 dark:hover:bg-brand-500/20 flex items-center justify-center text-slate-500 hover:text-brand-600 transition-all hover:-translate-y-1">
                                    <FaGithub size={22} />
                                </a>
                                <a href="https://www.linkedin.com/in/ankit-raj-319201307/" target="_blank" rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-100 dark:hover:bg-brand-500/20 flex items-center justify-center text-slate-500 hover:text-brand-600 transition-all hover:-translate-y-1">
                                    <FaLinkedin size={22} />
                                </a>
                                <a href="https://x.com/Baby90Danger" target="_blank" rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-100 dark:hover:bg-brand-500/20 flex items-center justify-center text-slate-500 hover:text-brand-600 transition-all hover:-translate-y-1">
                                    <FaXTwitter size={22} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
