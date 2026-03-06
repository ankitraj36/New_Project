import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { requireAuth } from '@/lib/authHelper';

export async function PUT(request) {
    try {
        await connectDB();
        const { user, error } = await requireAuth(request);
        if (error) return error;

        const { name, avatar } = await request.json();

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { name, avatar },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user: updatedUser });
    } catch (err) {
        console.error('Update profile error:', err);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
