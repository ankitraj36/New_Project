import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'College Lover — Your Ultimate College Study Hub',
    description: 'Access free notes, PYQs, syllabus and study materials organized by department and semester. The best EdTech platform for college students.',
    keywords: 'college notes, study materials, PYQs, previous year questions, syllabus, free notes, CSE, CSIT, AI ML, IoT',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <head>
                <link rel="icon" type="image/png" sizes="32x32" href="/graduate-cap.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </head>
            <body className="font-sans bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200 antialiased transition-colors duration-300">
                <Providers>
                    <Navbar />
                    <main className="min-h-screen pt-16">
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
