import Link from 'next/link';
import { FaGraduationCap, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { FiMail, FiMapPin, FiUser } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-gradient-to-br from-brand-600 to-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/25">
                                <FaGraduationCap className="text-white text-sm" />
                            </div>
                            <span className="text-xl font-extrabold text-white">College Lover</span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            Your ultimate hub for high-quality study materials, notes, and academic resources. Empowering students to excel.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://github.com/ankitraj36" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-brand-600 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:-translate-y-1">
                                <FaGithub size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/ankit-raj-319201307/" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-brand-600 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:-translate-y-1">
                                <FaLinkedin size={18} />
                            </a>
                            <a href="https://x.com/Baby90Danger" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-brand-600 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:-translate-y-1">
                                <FaXTwitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-brand-400 transition-colors">Home</Link></li>
                            <li><Link href="/departments" className="hover:text-brand-400 transition-colors">Departments</Link></li>
                            <li><Link href="/about" className="hover:text-brand-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/materials" className="hover:text-brand-400 transition-colors">Study Materials</Link></li>
                            <li><Link href="/materials?search=notes" className="hover:text-brand-400 transition-colors">Lecture Notes</Link></li>
                            <li><Link href="/materials?search=syllabus" className="hover:text-brand-400 transition-colors">Latest Syllabus</Link></li>
                            <li><span className="opacity-50">Question Bank (Coming Soon)</span></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Get in Touch</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <FiUser className="text-brand-400 w-5 flex-shrink-0" />
                                <span>Ankit Raj</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiMail className="text-brand-400 w-5 flex-shrink-0" />
                                <a href="mailto:ankitraj3736@gmail.com" className="hover:text-brand-400 transition-colors">
                                    ankitraj3736@gmail.com
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <FiMapPin className="text-brand-400 w-5 flex-shrink-0 mt-0.5" />
                                <span>ITER, Siksha &apos;O&apos; Anusandhan University, Bhubaneswar, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-sm">
                    <p>© 2026 College Lover. Designed & Developed by <span className="text-white font-semibold">Ankit Raj</span>. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
