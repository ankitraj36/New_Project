import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { requireAdmin } from '@/lib/authHelper';

export async function GET(request) {
    try {
        await connectDB();
        const { user, error } = await requireAdmin(request);
        if (error) return error;

        const users = await User.find().select('-password').sort({ createdAt: -1 });
        return NextResponse.json({ users });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
