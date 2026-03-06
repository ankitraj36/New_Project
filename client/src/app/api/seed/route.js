import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import Department from '@/lib/models/Department';
import StudyMaterial from '@/lib/models/StudyMaterial';

const seedMaterials = [
    { title: "Game Programming with C++", subject: "Computer Science", department: "Computer Science", semester: "6th Sem", type: "PDF", size: "2.5 MB", fileURL: "https://drive.google.com/drive/folders/1nrpDd0MCEH4oe50VXgnhY5TfABKx8v-b?usp=sharing" },
    { title: "Introduction to Databases", subject: "Computer Science", department: "Computer Science", semester: "6th Sem", type: "PDF", size: "4.2 MB", fileURL: "https://drive.google.com/drive/folders/1n4JpDbAgJciTKwQRz-BbClVTerhcVwfj?usp=drive_link" },
    { title: "Computer Networking: Security", subject: "Computer Science", department: "Computer Science", semester: "6th Sem", type: "PPT", size: "5.5 MB", fileURL: "https://drive.google.com/file/d/1gaG1XVzmb0KU652aeDrob4DZCp31mxJ9/view?usp=sharing" },
    { title: "Python for Data Science 2", subject: "Computer Science", department: "Computer Science", semester: "6th Sem", type: "PPT", size: "3.1 MB", fileURL: "https://drive.google.com/drive/folders/1bmIb7mhjpvHe9Fy8htbmp8_7Zz0YQhAC?usp=sharing" },
    { title: "Compilers: Principles & Tools (Book)", subject: "Computer Science", department: "Computer Science", semester: "6th Sem", type: "PDF", size: "12.0 MB", fileURL: "https://drive.google.com/file/d/1xbtb0fBLdZF8gUOg2AMi5O2XT1pKIPL2/view?usp=drive_link" },
    { title: "Machine Learning Concepts 2", subject: "Computer Science", department: "Computer Science", semester: "6th Sem", type: "PDF", size: "3.8 MB", fileURL: "https://drive.google.com/file/d/1usXYJ_slN5XFI2m6_FUZFW_FhX_ALA8q/view?usp=sharing" },
    { title: "Robotics Programming Workshop 2", subject: "IoT", department: "IoT", semester: "6th Sem", type: "PDF", size: "10 MB", fileURL: "https://drive.google.com/file/d/1_h7wukHHa_i44__07ANkA_mX-PrCSDAX/view?usp=drive_link" },
    { title: "Introduction to Disaster Management", subject: "IoT", department: "IoT", semester: "6th Sem", type: "PDF", size: "4.2 MB", fileURL: "https://drive.google.com/file/d/1k93v1yeLhbh7JePLNhRASQ1bmpRUXygX/view?usp=drive_link" },
    { title: "Deep Learning with TensorFlow", subject: "AI & ML", department: "AI & ML", semester: "6th Sem", type: "Textbook", size: "12 MB", fileURL: "https://drive.google.com/file/d/1Gl65xb-ZdAXNUglbOsDLalddU_HwKYir/view?usp=drive_link" },
    { title: "Natural Language Processing", subject: "AI & ML", department: "AI & ML", semester: "6th Sem", type: "Textbook", size: "9 MB", fileURL: "https://drive.google.com/file/d/10n_h2cfv0t9KH9FVWz60sWo2gANCNB9k/view?usp=drive_link" },
    { title: "Database Implementation in JDBC", subject: "AI & ML", department: "AI & ML", semester: "6th Sem", type: "Textbook", size: "19 MB", fileURL: "https://drive.google.com/file/d/1ZdnrlXmAholRMIjQIePIFRbx8fASAe4l/view?usp=drive_link" },
    { title: "Web Development with Python and Django", subject: "IoT", department: "IoT", semester: "6th Sem", type: "Textbook", size: "15 MB", fileURL: "https://drive.google.com/file/d/1dogg4V-pgVBWy7v_K8NGegXig9ttvWIv/view?usp=drive_link" },
    { title: "Database Management System Design", subject: "AI & ML", department: "AI & ML", semester: "6th Sem", type: "Textbook", size: "21 MB", fileURL: "https://drive.google.com/file/d/14O_eJe3xI7_UBjyhURdtICAVgRCiYsIh/view?usp=drive_link" },
    { title: "Introduction to Macroeconomics", subject: "AI & ML", department: "AI & ML", semester: "6th Sem", type: "Textbook", size: "8 MB", fileURL: "https://drive.google.com/file/d/12b4FUS4HQ2AZGZIAK-Rh4eK4YmYVizMW/view?usp=drive_link" },
    { title: "Big Data Analytics with Apache Spark", subject: "Data Analytics", department: "Data Analytics", semester: "6th Sem", type: "Textbook", size: "14 MB", fileURL: "https://drive.google.com/file/d/1Lg5DJ1QtBlpWXdpi3eOtMq46gvRH4jIj/view?usp=sharing" },
    { title: "Server Side Web Development with Node JS", subject: "CSIT", department: "CSIT", semester: "6th Sem", type: "Textbook", size: "13 MB", fileURL: "https://drive.google.com/file/d/1-HfT32K2Xaid6I6qb2bPjtbFdXeDDfb1/view?usp=sharing" },
    { title: "Machine Learning Algorithms with C++", subject: "CSIT", department: "CSIT", semester: "6th Sem", type: "Textbook", size: "14 MB", fileURL: "https://drive.google.com/file/d/1VvwCO4kZ-x5bsUxaNI0gXbzHig7Sg9Dz/view?usp=sharing" },
    { title: "Full-Stack Web Development with MERN", subject: "CSIT", department: "CSIT", semester: "6th Sem", type: "Textbook", size: "15 MB", fileURL: "https://drive.google.com/file/d/16aTZDrvKEVm9xChsgcbyCMOlMAlIbazQ/view?usp=sharing" },
];

const seedDepartments = [
    { name: 'Computer Science', description: 'Computer Science & Engineering', icon: 'fa-laptop-code', color: 'from-blue-500 to-blue-600' },
    { name: 'CSIT', description: 'Computer Science & Information Technology', icon: 'fa-network-wired', color: 'from-cyan-500 to-teal-500' },
    { name: 'AI & ML', description: 'Artificial Intelligence & Machine Learning', icon: 'fa-brain', color: 'from-rose-500 to-pink-500' },
    { name: 'Data Analytics', description: 'Data Analytics & Data Science', icon: 'fa-chart-pie', color: 'from-emerald-500 to-green-500' },
    { name: 'IoT', description: 'Internet of Things', icon: 'fa-microchip', color: 'from-amber-500 to-orange-500' },
];

export async function POST(request) {
    try {
        // Protect with a secret key
        const { searchParams } = new URL(request.url);
        const key = searchParams.get('key');
        if (key !== (process.env.SEED_SECRET || 'seed-college-lover-2026')) {
            return NextResponse.json({ message: 'Invalid seed key' }, { status: 403 });
        }

        await connectDB();

        // Check if data already exists
        const existingMaterials = await StudyMaterial.countDocuments();
        if (existingMaterials > 0) {
            return NextResponse.json({ message: 'Database already seeded', count: existingMaterials });
        }

        // Create admin user
        const existingAdmin = await User.findOne({ email: 'admin@collegelover.com' });
        if (!existingAdmin) {
            await User.create({ name: 'Admin', email: 'admin@collegelover.com', password: 'admin123', role: 'admin' });
        }

        // Create departments
        for (const dept of seedDepartments) {
            await Department.findOneAndUpdate({ name: dept.name }, dept, { upsert: true });
        }

        // Create materials
        await StudyMaterial.insertMany(seedMaterials);

        return NextResponse.json({
            message: 'Database seeded successfully!',
            materials: seedMaterials.length,
            departments: seedDepartments.length,
        });
    } catch (error) {
        return NextResponse.json({ message: 'Seed error: ' + error.message }, { status: 500 });
    }
}
