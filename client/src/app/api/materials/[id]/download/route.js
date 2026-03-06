import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import StudyMaterial from '@/lib/models/StudyMaterial';

export async function POST(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const material = await StudyMaterial.findByIdAndUpdate(
            id,
            { $inc: { downloadCount: 1 } },
            { new: true }
        );
        if (!material) {
            return NextResponse.json({ message: 'Material not found' }, { status: 404 });
        }
        return NextResponse.json({ downloadCount: material.downloadCount });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
