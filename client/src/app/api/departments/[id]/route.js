import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Department from '@/lib/models/Department';
import StudyMaterial from '@/lib/models/StudyMaterial';
import { requireAdmin } from '@/lib/authHelper';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const department = await Department.findById(id);

        if (!department) {
            return NextResponse.json({ message: 'Department not found' }, { status: 404 });
        }

        const materials = await StudyMaterial.find({ department: department.name });
        return NextResponse.json({ department, materials });
    } catch (err) {
        console.error('Get department error:', err);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { error } = await requireAdmin(request);
        if (error) return error;

        const { id } = await params;
        const body = await request.json();

        const department = await Department.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!department) {
            return NextResponse.json({ message: 'Department not found' }, { status: 404 });
        }

        return NextResponse.json({ department });
    } catch (err) {
        console.error('Update department error:', err);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { error } = await requireAdmin(request);
        if (error) return error;

        const { id } = await params;
        const department = await Department.findByIdAndDelete(id);

        if (!department) {
            return NextResponse.json({ message: 'Department not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Department deleted' });
    } catch (err) {
        console.error('Delete department error:', err);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
