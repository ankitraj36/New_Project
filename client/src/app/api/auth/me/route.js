import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/authHelper';
import connectDB from '@/lib/db';

export async function GET(request) {
    try {
        await connectDB();
        const { user, error } = await requireAuth(request);
        if (error) return error;
        return NextResponse.json({ user: user.toJSON() });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
