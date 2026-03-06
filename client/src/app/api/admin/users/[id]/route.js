import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { requireAdmin } from '@/lib/authHelper';

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { user, error } = await requireAdmin(request);
        if (error) return error;

        const { id } = await params;
        if (user._id.toString() === id) {
            return NextResponse.json({ message: 'Cannot delete yourself' }, { status: 400 });
        }

        await User.findByIdAndDelete(id);
        return NextResponse.json({ message: 'User deleted' });
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
        const { role } = await request.json();
        const updated = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
