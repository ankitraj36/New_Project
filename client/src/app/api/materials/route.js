import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import StudyMaterial from '@/lib/models/StudyMaterial';
import { requireAdmin } from '@/lib/authHelper';

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 20;
        const search = searchParams.get('search') || '';
        const department = searchParams.get('department') || '';
        const semester = searchParams.get('semester') || '';
        const type = searchParams.get('type') || '';

        const query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }
        if (department) query.department = department;
        if (semester) query.semester = semester;
        if (type) query.type = type;

        const total = await StudyMaterial.countDocuments(query);
        const materials = await StudyMaterial.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return NextResponse.json({
            materials,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
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
        const material = await StudyMaterial.create({ ...body, uploadedBy: user._id });
        return NextResponse.json(material, { status: 201 });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
