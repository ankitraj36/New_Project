import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Bookmark from '@/lib/models/Bookmark';
import { requireAuth } from '@/lib/authHelper';

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { user, error } = await requireAuth(request);
        if (error) return error;

        const { materialId } = await params;
        await Bookmark.findOneAndDelete({ userId: user._id, materialId });
        return NextResponse.json({ message: 'Bookmark removed' });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { user, error } = await requireAuth(request);
        if (error) return error;

        const { materialId } = await params;
        const bookmark = await Bookmark.findOne({ userId: user._id, materialId });
        return NextResponse.json({ bookmarked: !!bookmark });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
