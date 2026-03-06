import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Bookmark from '@/lib/models/Bookmark';
import { requireAuth } from '@/lib/authHelper';

export async function GET(request) {
    try {
        await connectDB();
        const { user, error } = await requireAuth(request);
        if (error) return error;

        const bookmarks = await Bookmark.find({ userId: user._id })
            .populate('materialId')
            .sort({ createdAt: -1 });

        return NextResponse.json({ bookmarks });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const { user, error } = await requireAuth(request);
        if (error) return error;

        const { materialId } = await request.json();

        const existing = await Bookmark.findOne({ userId: user._id, materialId });
        if (existing) {
            return NextResponse.json({ message: 'Already bookmarked' }, { status: 400 });
        }

        const bookmark = await Bookmark.create({ userId: user._id, materialId });
        return NextResponse.json(bookmark, { status: 201 });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
