import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { signToken } from '@/lib/authHelper';

export async function POST(request) {
    try {
        await connectDB();
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
        }

        const user = await User.create({ name, email, password });
        const token = signToken(user._id);

        return NextResponse.json({ token, user: user.toJSON() }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
