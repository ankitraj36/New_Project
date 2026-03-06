import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Department from '@/lib/models/Department';
import StudyMaterial from '@/lib/models/StudyMaterial';
import { requireAdmin } from '@/lib/authHelper';

export async function GET() {
    try {
        await connectDB();
        const departments = await Department.find().sort({ name: 1 });

        // Add material counts
        const deptData = await Promise.all(
            departments.map(async (dept) => {
                const materialCount = await StudyMaterial.countDocuments({ department: dept.name });
                return { ...dept.toObject(), materialCount };
            })
        );

        return NextResponse.json({ departments: deptData });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const { user, error } = await requireAdmin(request);
        if (error) return error;

        const body = await request.json();
        const department = await Department.create(body);
        return NextResponse.json(department, { status: 201 });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
