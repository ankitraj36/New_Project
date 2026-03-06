import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import StudyMaterial from '@/lib/models/StudyMaterial';
import { requireAdmin } from '@/lib/authHelper';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const material = await StudyMaterial.findById(id);
        if (!material) {
            return NextResponse.json({ message: 'Material not found' }, { status: 404 });
        }
        return NextResponse.json(material);
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { user, error } = await requireAdmin(request);
        if (error) return error;
        const { id } = await params;
        const body = await request.json();
        const material = await StudyMaterial.findByIdAndUpdate(id, body, { new: true });
        if (!material) {
            return NextResponse.json({ message: 'Material not found' }, { status: 404 });
        }
        return NextResponse.json(material);
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { user, error } = await requireAdmin(request);
        if (error) return error;
        const { id } = await params;
        const material = await StudyMaterial.findByIdAndDelete(id);
        if (!material) {
            return NextResponse.json({ message: 'Material not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Material deleted' });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
